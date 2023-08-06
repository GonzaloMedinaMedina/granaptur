import { NextResponse } from 'next/server'
import { UserService } from '@/app/userService/userService';

export async function POST(req: Request) 
{
    return NextResponse.json({status: 200});
    const data = await req.json();
    let userService: UserService = new UserService();
    let result: any;
    let validUserToken = userService.validUserToken(data);

    if (validUserToken)
    {
        result = { success: validUserToken , status: validUserToken ? 200 : 500 }        
    }
    else if (await userService.checktUserCredentials(data))
    {
        result = { token: userService.generateUserToken(data), status: 200 };
    }
    else
    {
        result = { error: 'Invalid credentials.', status: 500 };
    }

    return NextResponse.json(result)
}
