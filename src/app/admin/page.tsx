import Ad from "../components/ad";
import { DataBaseService } from "../databaseManager/databaseService";

async function getAds()
{
  const dtoName = 'ad';
  const dtos = await DataBaseService.getAllDtos(dtoName, true);
  return JSON.parse(dtos);
}

export default async function Admin() 
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
          editable={true}
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