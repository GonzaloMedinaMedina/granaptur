'use client'
import { useState, useCallback, useEffect, useRef } from "react"

export default function AutomaticSlidePicture({pictures} : {pictures : Array<any>})
{
    const [pictureIndex, setPictureIndex] = useState(0)
    const timeoutRef = useRef(null);

    const resetTimeout = useCallback(() => 
    {
        if (timeoutRef.current) 
          clearTimeout(timeoutRef.current);
    }, 
    []);

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

    useEffect(() =>
    {
        if (timeoutRef.current)
            clearTimeout(timeoutRef.current);
    
        timeoutRef.current = setTimeout(() => changePictureIndex(+1), 2000);

        return () => {
            resetTimeout();
          }
    }, 
    [pictureIndex])

    return <div className="relative group p-1 flex items-center max-w-[420px] max-h-[420px]">
        <button name="arrow" className="invisible absolute group-hover:visible flex items-center w-10 h-10 left-2 bg-white rounded-full" onClick={(e) => {changePictureIndex(-1)}}>
            <div id="arrow"  className="my-0 mx-auto">&#10094;</div>
        </button>
        <img className="w-fit flex-1 object-contain	max-w-[320px]" src={pictures[pictureIndex]}></img>
        <button name="arrow" className="invisible absolute group-hover:visible flex items-center w-10 h-10 right-2 bg-white rounded-full" onClick={(e) => {changePictureIndex(+1)}}>
            <div id="arrow" className="my-0 mx-auto">&#10095;</div>
        </button>
    </div>
}