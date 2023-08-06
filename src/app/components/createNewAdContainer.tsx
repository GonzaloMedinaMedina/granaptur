'use client'
import { useCallback } from "react"
import { useRouter } from 'next/navigation';
import { RequestUtils } from "../requestUtils";

export default function CreateNewAdContainer()
{
    const router = useRouter();

    const navigateToNewAd = (data: any): void => 
    {
        if (data.status === 200)
        {
            location.replace("/editableAd/" + data['_id']);
        }
    }

    const createNewAd = useCallback((e:any) => 
    {
        if (document?.cookie.includes('access_token'))
        {
            let credentials: any =
            {
                token: document.cookie
            }

            RequestUtils.postRequest('ad', credentials, navigateToNewAd);
        }
    },[])

    return(
    <div className="group relative h-[200px] flex my-20 mx-10 sm:mx-60 p-1 bg-[#89a6bf] rounded-xl items-center justify-center cursor-pointer" onClick={(e) => {createNewAd(e)}}>
        <div className="text-6xl  text-[#213f59] group-hover:text-white">Crear anuncio +</div>
    </div>
    )
}