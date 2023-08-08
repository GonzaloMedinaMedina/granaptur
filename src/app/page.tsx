import Ad from "./components/ad";
import AutomaticSlidePicture from "./components/automaticSlidePicture/automaticSlidePicture";
import { DataBaseService } from "./databaseManager/databaseService";

const getDtos = async (dtoName: string) =>
{
  const dtos = await DataBaseService.getAllDtos(dtoName, true);
  return JSON.parse(dtos);
}

export default async function Home() 
{
  const adsInfo: Array<any> = await getDtos('ad');
  const headerInfo: Array<any> = await getDtos('headerInformation');
    
  var ads = undefined;
  
  if (adsInfo)
  {
    const adsObject = adsInfo;

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