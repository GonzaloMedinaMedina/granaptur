'use client'
import { useState, useCallback, ReactNode } from "react"

interface sliderStatus
{
    //The index of the picture to display.
    index:number;
    //The next index to perform the slide.
    nextIndex:number;
}

export default function SlidePicture({pictures} : {pictures : Array<any>})
{
    
    const [sliderStatus, setSliderStatus] = useState<sliderStatus>({index: 0, nextIndex: 0 });

    const getPictures = useCallback((): ReactNode => 
    {
        if (sliderStatus.index === sliderStatus.nextIndex)
        {
            return <img id={'imagen' + sliderStatus.index} key={sliderStatus.index} className={ "relative min-w-full float-left	object-contain flex-1" } src={pictures[sliderStatus.index]}></img>;
        }
        else if (sliderStatus.index + 1 === sliderStatus.nextIndex ||  (sliderStatus.index === pictures.length-1 && sliderStatus.nextIndex === 0))
        {
            return (<>
                <img id={'imagen' + sliderStatus.index} key={sliderStatus.index} className={ "animate-slideLeft relative min-w-full float-left	object-contain flex-1" } src={pictures[sliderStatus.index]}></img>;
                <img onAnimationEnd={() => { setSliderStatus({index: sliderStatus.nextIndex, nextIndex: sliderStatus.nextIndex })}} id={'imagen' + sliderStatus.nextIndex} key={sliderStatus.nextIndex} className={"animate-slideLeft relative min-w-full float-left object-contain flex-1"} src={pictures[sliderStatus.nextIndex]}></img>
                </>)
        }
        else
        {
            return (<>
                <img onAnimationEnd={() => { setSliderStatus({index: sliderStatus.nextIndex, nextIndex: sliderStatus.nextIndex })}} id={'imagen' + sliderStatus.nextIndex} key={sliderStatus.nextIndex} className={"animate-slideRight -left-[100%] relative min-w-full float-left object-contain flex-1"} src={pictures[sliderStatus.nextIndex]}></img>
                <img id={'imagen' + sliderStatus.index} key={sliderStatus.index} className={ "animate-slideRight -left-[100%] relative min-w-full float-left object-contain flex-1" } src={pictures[sliderStatus.index]}></img>;
                </>)
        }        
    },[sliderStatus]);

    const changePictureIndex = useCallback((next: number) =>
    {
        if (sliderStatus.index + next == pictures.length)
        {
            setSliderStatus( { index: sliderStatus.index, nextIndex: 0 } );
        }
        else if (sliderStatus.index + next < 0)
        {
            setSliderStatus( { index: 0, nextIndex: pictures.length-1 } );
        }
        else
        {
            setSliderStatus({ index: sliderStatus.index, nextIndex: sliderStatus.index+next })            
        }
    },
    [sliderStatus])

    return <div className="relative group p-1 flex items-center">
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
}