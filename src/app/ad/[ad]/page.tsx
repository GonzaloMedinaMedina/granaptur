import SlidePicture from '@/app/components/slidePicture/slidePicture';
import AdProperty from '@/app/components/adProperty';
import AdTitle from '@/app/components/adTitle';
import { DataBaseService } from '@/app/databaseManager/databaseService';

async function getAd(id:string)
{
    const dtoName = 'ad';
    const dto = await DataBaseService.getDtoInfo(id, dtoName, true);
    return JSON.parse(dto);
}

export default async function AdPage({params}: {params: {ad: string}}) 
{
    const adInfo = await getAd(params.ad);
    const properties = adInfo.properties;

    const addAndApartmentInfo = properties.map(property => {
        return <AdProperty key={property.name + adInfo.id} adProperty={property} />
    });

    return (
        <div className="m-10 rounded-xl bg-[#7197b3] items-center flex-col flex">
            <AdTitle title={adInfo.title}/>
            <br></br>
            <SlidePicture pictures={adInfo.pictures}/>
            <br></br>
            <div className="inline-flex">
                {addAndApartmentInfo}
            </div>
            <br></br>
            <div className=" bg-[#dbe8f5] rounded-xl p-5 m-5 shadow-description">
                <p>{adInfo.description}</p>
            </div>
        </div>
    )
}