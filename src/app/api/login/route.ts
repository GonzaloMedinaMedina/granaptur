import { NextResponse } from 'next/server'
import { UserService } from '@/app/userService/userService';

export async function POST(req: Request) 
{
    const data = await req.json();
    let userService: UserService = new UserService();

    const accessToken = await userService.checkUserCredentials(data);

    return NextResponse.json({ token: accessToken })
}
