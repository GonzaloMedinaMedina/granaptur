'use client'
import { useState, useCallback, useEffect, useRef, ReactNode } from "react"

interface sliderStatus
{
    //The index of the picture to display.
    index:number;
    //The next index to perform the slide.
    nextIndex:number;
}

export default function AutomaticSlidePicture({headerInfo} : {headerInfo : Array<any>})
{
    const [sliderStatus, setSliderStatus] = useState<sliderStatus>({index: 0, nextIndex: 0 });
    const timeoutRef:any = useRef(null);

    const resetTimeout = useCallback(() => 
    {
        if (timeoutRef.current) 
          clearTimeout(timeoutRef.current);
    }, 
    []);

    const getPictures = useCallback((): ReactNode => 
    {
        if (sliderStatus.index === sliderStatus.nextIndex)
        {
            return <img id={'imagen' + sliderStatus.index} key={sliderStatus.index} className={ "relative min-w-full float-left	object-contain flex-1" } src={headerInfo[sliderStatus.index].picture}></img>;
        }
        else if (sliderStatus.index + 1 === sliderStatus.nextIndex ||  (sliderStatus.index === headerInfo.length-1 && sliderStatus.nextIndex === 0))
        {
            return (<>
                <img id={'imagen' + sliderStatus.index} key={sliderStatus.index} className={ "animate-slideLeft relative min-w-full float-left	object-contain flex-1" } src={headerInfo[sliderStatus.index].picture}></img>;
                <img onAnimationEnd={() => { setSliderStatus({index: sliderStatus.nextIndex, nextIndex: sliderStatus.nextIndex })}} id={'imagen' + sliderStatus.nextIndex} key={sliderStatus.nextIndex} className={"animate-slideLeft relative min-w-full float-left object-contain flex-1"} src={headerInfo[sliderStatus.nextIndex].picture}></img>
                </>)
        }
        else
        {
            return (<>
                <img onAnimationEnd={() => { setSliderStatus({index: sliderStatus.nextIndex, nextIndex: sliderStatus.nextIndex })}} id={'imagen' + sliderStatus.nextIndex} key={sliderStatus.nextIndex} className={"animate-slideRight -left-[100%] relative min-w-full float-left object-contain flex-1"} src={headerInfo[sliderStatus.nextIndex].picture}></img>
                <img id={'imagen' + sliderStatus.index} key={sliderStatus.index} className={ "animate-slideRight -left-[100%] relative min-w-full float-left object-contain flex-1" } src={headerInfo[sliderStatus.index].picture}></img>;
                </>)
        }        
    },[sliderStatus]);

    const changePictureIndex = useCallback((next: number) =>
    {
        if (sliderStatus.index + next == headerInfo.length)
        {
            setSliderStatus( { index: sliderStatus.index, nextIndex: 0 } );
        }
        else if (sliderStatus.index + next < 0)
        {
            setSliderStatus( { index: 0, nextIndex: headerInfo.length-1 } );
        }
        else
        {
            setSliderStatus({ index: sliderStatus.index, nextIndex: sliderStatus.index+next })            
        }
    },
    [sliderStatus])

    useEffect(() =>
    {
        if (timeoutRef.current)
            clearTimeout(timeoutRef.current);
    
        timeoutRef.current = setTimeout(() => changePictureIndex(+1), 2000);

        return () => {
            resetTimeout();
          }
    }, 
    [sliderStatus])

    return <div className="flex flex-col items-center bg-adblueback/40 m-10 p-5">
        <div className="relative group max-h-[600px] max-w-[300px] flex items-center">
            <button name="arrow" className="z-10 invisible absolute group-hover:visible flex items-center w-10 h-10 left-2 bg-white rounded-full" onClick={(e) => {changePictureIndex(-1)}}>
                <div id="arrow"  className="my-0 mx-auto">&#10094;</div>
            </button>
            <div className={"relative overflow-hidden bg-gray-500/20 flex h-[200px] w-[300px] duration-500"}>
                {getPictures()}
            </div>
            <button name="arrow" className="z-10 invisible absolute group-hover:visible flex items-center w-10 h-10 right-2 bg-white rounded-full" onClick={(e) => {changePictureIndex(+1)}}>
                <div id="arrow" className="my-0 mx-auto">&#10095;</div>
            </button>
        </div>
        <div className="p-5">{headerInfo[sliderStatus.index]?.title}</div>
    </div>
}