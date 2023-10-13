import Ad from "./components/ad";
import { anuncios } from '@/app/anuncios';
import { headerInfo } from "./headerInfo";
import SlidePicture from "./components/pictureSlider/pictureSlider";
import Pictures from "./components/pictures/Pictures";

export default async function Home() 
{
  const ads = anuncios.map((adInfo: any) => {
    return <li className="no-dot max-w-full my-16" key={adInfo.id}>
      <Ad
        picturesComponents={<Pictures/>}
        adInfo={adInfo}
      ></Ad>
    </li>
  })

  return (
    <>
      <div className="flex justify-center">
        <div className="shadow-container flex-col items-center border-adblueback bg-adblueback/50 m-10 p-5 w-[1000px] rounded-xl">
          <SlidePicture width={'1000'} height={'600'} pictures={headerInfo.pictures} automaticSlider={true} text={headerInfo.title}></SlidePicture>
        </div>
    </div>

    <ul className="sm:grid sm:grid-cols-2 sm:flex-wrap block w-full justify-items-center">
      {ads}
    </ul>
    </>
  )
}