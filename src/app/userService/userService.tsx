import cache from "memory-cache";
import { iuser } from "../interfaces/iuser";
import { DataBaseService } from "../databaseManager/databaseService";

const jwt = require('jsonwebtoken');
const ONE_HOUR_IN_MS = 3600000;

export class UserService
{
    static userCache: cache.Cache = null;

    constructor()
    {
        if (UserService.userCache === null)
        {
            UserService.userCache = new cache.Cache();
        }
    }

    getCachedUserCredentials = (user: iuser) =>
    {
        return UserService.userCache.get(user.id);
    }

    setCachedUserCredentials = (user: iuser) =>
    {
        UserService.userCache.put(user.id, user, ONE_HOUR_IN_MS);
    }

    checkUserCredentials = async (user: any): Promise<any> =>
    {
        if (typeof(user.token) === 'string' && user.token.includes('access_token'))
        {
            let token:string = user.token.replace('access_token=','');
            return jwt.verify(token,'credentials');
        }

        let validCredentials: boolean = true;
        const cachedUserCredentials = this.getCachedUserCredentials(user);

        if (cachedUserCredentials === null || cachedUserCredentials === undefined)
        {
            validCredentials = false;
            const userDto: iuser = await DataBaseService.getDtoInfo(user.id, 'user') as unknown as iuser;
            if (userDto?.password === user?.password)
            {
                validCredentials = true;
                this.setCachedUserCredentials(user);
            }
        }       

        if (validCredentials)
        {
            return jwt.sign({id: user.id, password: user.password}, 'credentials', { expiresIn: '1h' });
        }

        return null;
    }
}