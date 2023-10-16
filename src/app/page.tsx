import Ad from "./components/ad";
import { anuncios } from '@/app/anuncios';
import { headerInfo } from "./headerInfo";
import SlidePicture from "./components/pictureSlider/pictureSlider";

export default async function Home() 
{
  const ads = anuncios.map((adInfo: any) => 
  {
    return <li className="no-dot max-w-full my-16 flex justify-center" key={adInfo.id}>
      <Ad adInfo={adInfo}></Ad>
    </li>
  })

  return (
    <>
      <div className="flex justify-center">
        <div className="shadow-container flex flex-col items-center border-adblueback bg-adblueback/50 sm:m-10 m-1 sm:p-5 p-1 rounded-xl lg:w-[970px] w-full">
            {<SlidePicture pictures={headerInfo.pictures} automaticSlider={true} text={headerInfo.title} fullScreen={null}></SlidePicture> }
        </div>
    </div>

    <ul className="lg:grid lg:grid-cols-2 lg:flex-wrap block w-full justify-items-center">
      {ads}
    </ul>
    </>
  )
}