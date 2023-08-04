'use client'
import { useCallback } from "react"
import { useRouter } from 'next/navigation';

export default function createNewAdContainer({})
{
    const router = useRouter();
    const createNewAd = useCallback((e:any) => 
    {
        router.push('/editableAd/new')
    },[])

    return(
    <div className="group relative h-[200px] flex my-20 mx-10 sm:mx-60 p-1 bg-[#89a6bf] rounded-xl items-center justify-center cursor-pointer" onClick={(e) => {createNewAd(e)}}>
        <div className="text-6xl  text-[#213f59] group-hover:text-white">Crear anuncio +</div>
    </div>
    )
}