'use client'
import { useState, useCallback, useEffect, useRef } from "react"

export default function SlidePicture({pictures} : {pictures : Array<any>})
{
    const [pictureIndex, setPictureIndex] = useState(0)

    const changePictureIndex = useCallback((next: number) =>
    {
        if (pictureIndex + next == pictures.length)
        {
            setPictureIndex(0)
        }
        else if (pictureIndex + next < 0)
        {
            setPictureIndex(pictures.length - 1)
        }
        else
        {
            setPictureIndex(pictureIndex + next)
        }
    },
    [pictureIndex])

    return <div className="relative group p-1 flex items-center max-w-[420px] max-h-[420px]">
        <button name="arrow" className="invisible absolute group-hover:visible flex items-center w-10 h-10 left-2 bg-white rounded-full" onClick={(e) => {changePictureIndex(-1)}}>
            <div id="arrow"  className="my-0 mx-auto">&#10094;</div>
        </button>
        <div className="flex h-[200px] w-[300px]">
            <img className="object-contain flex-1" src={pictures[pictureIndex]}></img>
        </div>
        <button name="arrow" className="invisible absolute group-hover:visible flex items-center w-10 h-10 right-2 bg-white rounded-full" onClick={(e) => {changePictureIndex(+1)}}>
            <div id="arrow" className="my-0 mx-auto">&#10095;</div>
        </button>
    </div>
}