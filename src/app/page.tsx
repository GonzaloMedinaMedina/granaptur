import Ad from "./components/ad";
import AutomaticSlidePicture from "./components/automaticSlidePicture/automaticSlidePicture";
import { anuncios } from '@/app/anuncios';
import { headerInfo } from "./headerInfo";

export default async function Home() 
{
  const ads = anuncios.map((adInfo: any) => {
    return <li className="no-dot" key={adInfo.id}>
      <Ad
        adInfo={adInfo}
      ></Ad>
    </li>
  })

  return (
    <>
      <AutomaticSlidePicture headerInfo={headerInfo}/>
      {ads === undefined ? '' : <ul>{ads}</ul>}
    </>
  )
}