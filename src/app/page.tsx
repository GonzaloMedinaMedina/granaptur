import Ad from "./components/ad";
import AutomaticSlidePicture from "./components/automaticSlidePicture/automaticSlidePicture";
import { anuncios } from '@/app/anuncios';
import { headerInfo } from "./headerInfo";

export default async function Home() 
{
  // const adsInfo: Array<any> = await getDtos('ad');
  // const headerInfo: Array<any> = await getDtos('headerInformation');
    
  var ads = undefined;
  
  if (anuncios)
  {
    const adsObject = anuncios;

    ads = adsObject.map((adInfo: any) => {
      return <li className="no-dot" key={adInfo.id}>
        <Ad
          adInfo={adInfo}
          editable={false}
        ></Ad>
      </li>
    })
  }

  return (
    <>
      <AutomaticSlidePicture headerInfo={headerInfo}/>
      {ads === undefined ? '' : <ul>{ads}</ul>}
    </>
  )
}