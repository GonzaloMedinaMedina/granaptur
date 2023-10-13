import Ad from "./components/ad";
import { anuncios } from '@/app/anuncios';
import { headerInfo } from "./headerInfo";
import SlidePicture from "./components/pictureSlider/pictureSlider";
import Image from "next/image";
import { readdirSync } from "fs";

export default async function Home() 
{
  const ads = anuncios.map((adInfo: any) => {
    return <li className="no-dot max-w-full my-16" key={adInfo.id}>
      <Ad
        adInfo={adInfo}
      ></Ad>
    </li>
  })
  const atico1 = require('public/atico/atico1.webp')

  function compareNumbers(a: any, b: any) 
  {
      let an = a.match(/(\d+)/)[0],
          bn = b.match(/(\d+)/)[0];
          return an - bn;
  }
  const path = process.env.NODE_ENV === 'development' ? `./public/atico/` : `./atico`
  let i=0;
  let result = readdirSync(path).map(p => `/atico/` + p).sort(compareNumbers)
  const imageComponents = result.map(r => {return <Image key={i++} alt="" src={r} width={100} height={100}></Image>})

  return (
    <>
      <div className="flex justify-center">
        <div className="shadow-container flex-col items-center border-adblueback bg-adblueback/50 m-10 p-5 w-[1000px] rounded-xl">
            <SlidePicture components={imageComponents} width={'1000'} height={'600'} pictures={headerInfo.pictures} automaticSlider={true} text={headerInfo.title}></SlidePicture>
            <div className={"text-center relative overflow-hidden flex duration-500"}>
            </div>
        </div>
    </div>

    <ul className="sm:grid sm:grid-cols-2 sm:flex-wrap block w-full justify-items-center">
      {ads}
    </ul>
    </>
  )
}