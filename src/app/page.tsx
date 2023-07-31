import Ad from "./ad/[ad]/Ad";
import { DataBaseService } from "./databaseManager/databaseService";

async function getAds()
{
  const dtoName = 'ad';
  const dtos = await DataBaseService.getAllDtos(dtoName, true);
  return JSON.parse(dtos);
}

export default async function Home() 
{
  const adsInfo = await getAds();
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
    {ads === undefined ? '' : <ul>{ads}</ul>}
    </>
  )
}