import { AdService } from '@/app/adService/adService';
import { UserService } from '@/app/userService/userService';
import { NextResponse } from 'next/server'

export async function POST(req: Request)
{
    const data = await req.json();
    let adService: AdService = new AdService();
    let userService: UserService = new UserService();
    let result: any;

    if (userService.validUserToken(data))
    {
        const adId = await adService.createAd();
        result = { _id: adId, status: 200};
    }
    else
    {
        result = { error: 'Invalid credentials.', status: 500 };
    }

    return NextResponse.json(result);    
}