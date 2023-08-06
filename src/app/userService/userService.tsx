import cache from "memory-cache";
import { iuser } from "../interfaces/iuser";
import { DataBaseService } from "../databaseManager/databaseService";

const jwt = require('jsonwebtoken');
const ONE_HOUR_IN_MS = 3600000;

export class UserService
{
    static userCache: any = null;

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

    validUserToken = (user:any):boolean =>
    {
        if (typeof(user.token) === 'string' && user.token.includes('access_token'))
        {
            let token:string = user.token.replace('access_token=','');
            let verification = jwt.verify(token,'credentials');
            let result:boolean =  verification?.id !== undefined && verification?.password !== undefined;

            return result;
        }

        return false;
    }

    generateUserToken = (user:any):any =>
    {
        let result: any;

        try
        {
            result = jwt.sign({id: user.id, password: user.password}, 'credentials', { expiresIn: '1h' })
        }
        catch(exception)
        {
            console.error(exception);
            result = false;
        }
        finally
        {
            return result;
        }
    }

    checktUserCredentials = async (user: any): Promise<boolean> =>
    {
        const cachedUserCredentials = this.getCachedUserCredentials(user);

        if (cachedUserCredentials === null || cachedUserCredentials === undefined)
        {
            const query = { id: user.id };
            const userDto: iuser = await DataBaseService.getDtoInfo(query, 'user') as unknown as iuser;

            if (userDto?.password === user?.password)
            {
                this.setCachedUserCredentials(user);
                return true;
            }
        }       

        return false;
    }
}