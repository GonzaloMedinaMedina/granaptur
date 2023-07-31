import SlidePicture from '@/app/slidePicture/slidePicture';
import AdProperty from '@/app/adProperty/adProperty';
import { DataBaseService } from '@/app/databaseManager/databaseService';

async function getAd(id:string)
{
    const dtoName = 'ad';
    const dto = await DataBaseService.getDtoInfo(id, dtoName, true);
    return JSON.parse(dto);
}

export default async function AdPage() {

    const adInfo = await getAd('mercao');
    const properties = adInfo.properties;

    const addAndApartmentInfo = properties.map(property => {
        return <AdProperty key={property.name + adInfo.id} adProperty={property} />
    });

    return (
        <div className="m-10 rounded-xl bg-[#89a6bf] items-center flex-col flex">
            <h1 className='text-center text-clamp'>{adInfo.title}</h1>
            <br></br>
            <SlidePicture pictures={adInfo.pictures}/>
            <br></br>
            <div className="inline-flex">
                {addAndApartmentInfo}
            </div>
            <br></br>
            <div className="Section padding Icon">
                <p>{adInfo.description}</p>
            </div>
        </div>
    )
}