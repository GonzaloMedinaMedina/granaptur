'use client'
import TextInput from "../components/textInput";
import { useState } from "react";
import { RequestUtils } from "../requestUtils";

export default function LogIn() 
{
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    async function login()
    {
        const url = 'login';

        let credentials: any = 
        {
            "user": user,
            "pass": password
        };

        const navigateToAdminPage = (data: any) =>
        {
            document.cookie=`access_token=${data.token}`;
            location.replace("/admin");
        }

        await RequestUtils.postRequest(url, credentials, navigateToAdminPage);
    };


    return (
        <div className='rounded-lg flex flex-col p-5 border-2 border-black bg-sky-600 w-fit'>
            <TextInput 
                setText={setUser}
                label="User"
            />
            <TextInput 
                setText={setPassword}
                hideInput = {true}
                label="Password"
            />
            <button className='rounded-lg p-1 self-center w-fit h-fit bg-sky-200 justify-center' onClick={() => {login()}}>Log in</button>
        </div>
    )
}
