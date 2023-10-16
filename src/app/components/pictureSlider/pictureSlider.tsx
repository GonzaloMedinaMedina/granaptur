'use client'
import { useEffect, useRef, useState, useCallback, ReactNode, FunctionComponent, useMemo } from "react"
import Image from "next/image"

interface iSlidePicture
{
    pictures : Array<any>,
    fullScreen? : boolean | null,
    automaticSlider: boolean,
    text?: Array<any>,
}

const SlidePicture: FunctionComponent<iSlidePicture> = ({pictures, fullScreen = null, automaticSlider, text = []}) =>
{
    const sliderIndex = useRef(0);
    const [isFullSCreen, setFullScreen] = useState<boolean|null>(fullScreen);
    const [direction, setDirection] = useState<number>(0);
    const timeoutRef:any = useRef(null);

    const resetTimeout = useCallback(() => 
    {
        if (timeoutRef.current) 
          clearTimeout(timeoutRef.current);
    }, 
    []);

    useEffect(() =>
    {
        if (automaticSlider)
        {
            if (timeoutRef.current)   
                clearTimeout(timeoutRef.current);
        
            timeoutRef.current = setTimeout(() => setDirection(+1), 2000);

            return () => { resetTimeout(); }
        }
    }, 
    [direction]);

    const incrementSliderIndex = useCallback((next: number) => 
    {
        sliderIndex.current = sliderIndex.current + next < 0 ? pictures.length-1 : (sliderIndex.current+next) % pictures.length;
    }, [])

    const getExitButton = useCallback((): ReactNode => 
    {
        return isFullSCreen ? <button onClick={(e) => {changeVisibility(e, false)}} className="z-10 absolute top-5 right-10 w-[64px] h-[64px] bg-white rounded-full"><div className="-z-2 relative text-4xl text-center align-middle">&#10005;</div></button> : ''; 
    }, [isFullSCreen])

    const getPictures = useCallback((): ReactNode => 
    {
        const objectFit = isFullSCreen ? ' object-contain ' : ' object-cover '
        const imageCss = 'relative min-w-full float-left flex-1 -left-[100%] ' + objectFit;

        let previousPicture = sliderIndex.current - 1 < 0 ? pictures.length-1 : sliderIndex.current - 1,
            currentPicture = sliderIndex.current,
            nextPicture = sliderIndex.current + 1 == pictures.length ? 0 : sliderIndex.current + 1,
            picturesComponents = [],
            rightAnimation = direction == -1 ? " animate-slideRight" : " ",
            leftAnimation = direction == 1 ? " animate-slideLeft" : " ";

        picturesComponents.push(<img key={0} onAnimationEnd={() => {if (direction == -1) incrementSliderIndex(-1); setDirection(0)}} src={pictures[previousPicture]} alt="" className={imageCss + rightAnimation} style={{zIndex:1}}></img>);
        picturesComponents.push(<img key={1} src={pictures[currentPicture]} alt="" className={imageCss} style={{zIndex:0}}></img>);
        picturesComponents.push(<img key={2} onAnimationEnd={() => {if (direction == 1) incrementSliderIndex(1); setDirection(0)}} src={pictures[nextPicture]} alt="" className={imageCss + leftAnimation}></img>);

        return picturesComponents;
    }, [direction, isFullSCreen]);

    const cachedPictures: any|ReactNode[] = useMemo(() => { return getPictures() }, [direction, isFullSCreen]);

    const changeVisibility = useCallback((e: any, mode: boolean) => 
    {
        if (isFullSCreen !== null)
        {
            e.stopPropagation();
            console.log('dentro if');
            setFullScreen(mode);
        }
        }, [isFullSCreen])

    const getFooterText = useCallback(() => 
    {
        if (text.length > 0)
        {
            const footerTextCss = 'text-center font-semibold text-2xl relative min-w-full float-left object-cover flex-1 -left-[100%]';

            let previousPicture = sliderIndex.current - 1 < 0 ? pictures.length-1 : sliderIndex.current - 1,
            currentPicture = sliderIndex.current,
            nextPicture = sliderIndex.current + 1 == pictures.length ? 0 : sliderIndex.current + 1,
            footerTextComponents = [],
            rightOn = direction == -1,
            leftOn = direction == 1,
            rightAnimation = rightOn ? " animate-slideRight" : " ",
            leftAnimation = leftOn ? " animate-slideLeft" : " ",
            centerAnimation = rightOn ? " animate-slideRight" : leftOn ? " animate-slideLeft" : " ";

            footerTextComponents.push(<div key={0} className={footerTextCss + rightAnimation}> {text[previousPicture]} </div>);
            footerTextComponents.push(<div key={1} className={footerTextCss + centerAnimation}> {text[currentPicture]} </div>);
            footerTextComponents.push(<div key={2} className={footerTextCss + leftAnimation}> {text[nextPicture]} </div>);
            return <div className="relative overflow-hidden flex">{footerTextComponents}</div>;
        }

        return '';
    },
    [direction])

    const footerText: any|ReactNode[] = useMemo(() => { return getFooterText() }, [direction]);
    const exitButton: any|ReactNode = useMemo(() => { return getExitButton() }, [isFullSCreen])
    
    var cssStyle = isFullSCreen === true ? 'left-0 top-0 absolute w-full flex justify-center bg-gray-500 ' : 'sm:p-5 p-1';

    return <div className={cssStyle} onClick={(e) => { changeVisibility(e, true) }}>
        <div className='relative group p-1 flex items-center'>
            <button name="arrow" className="z-10 invisible absolute group-hover:visible flex items-center w-10 h-10 left-2 bg-white rounded-full" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setDirection(-1)}}>
                <div id="arrow"  className="my-0 mx-auto">&#10094;</div>
            </button>
            <div className={"relative overflow-hidden bg-gray-500/20 flex duration-500 rounded-xl "}>
                {exitButton}
                {cachedPictures}
            </div>
            <button name="arrow" className="z-10 invisible absolute group-hover:visible flex items-center w-10 h-10 right-2 bg-white rounded-full" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setDirection(+1)}}>
                <div id="arrow" className="my-0 mx-auto">&#10095;</div>
            </button>
        </div>
        {footerText}
    </div>
}

export default SlidePicture;