import { DataBaseService } from '@/app/databaseManager/databaseService';
import { NextResponse } from 'next/server'

export async function POST(req: Request) 
{
    const data = await req.json();

    var result = await DataBaseService.checkDtoExists(data.user, 'user', data.pass);
    var accessToken;

    if (result)
    {
        accessToken = 'success';
    }

    return NextResponse.json({ token: accessToken })
}
