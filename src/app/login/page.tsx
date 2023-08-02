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
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
  
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
        
        let credentials: any =
        {
            "id": user, 
            "password": hashHex,
            "token": document.cookie
        }
        
        const navigateToAdminPage = (data: any) =>
        {
            if (data.token !== undefined && data.token !== null)
            {
                document.cookie=`access_token=${data.token}`;
                location.replace("/admin");
            }
            else
            {
                alert('Error al iniciar sesión. Compruebe las credenciales')
            }
        }

        await RequestUtils.postRequest(url, credentials, navigateToAdminPage);
    };


    return (
        <div className="flex justify-center">
            <div className='m-5 rounded-lg flex flex-col p-5 border-2 border-black bg-sky-600 w-fit'>
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
        </div>
    )
}
