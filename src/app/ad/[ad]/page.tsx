import SlidePicture from '@/app/components/pictureSlider/pictureSlider';
import AdProperty from '@/app/components/adProperty';
import AdTitle from '@/app/components/adTitle';
import { iadProperty } from '@/app/interfaces/iadProperty';
import { anuncios } from '@/app/anuncios';

export default async function AdPage({params}: {params: {ad: string}}) 
{
    const adInfo: any = anuncios.find(a => a.id === params.ad)
    const properties: Array<iadProperty> = adInfo?.properties;

    const addAndApartmentInfo = properties.map(property => {
        return <AdProperty key={property.name + adInfo.id} adProperty={property} />
    });

    return (
        <div className="m-10 rounded-xl bg-[#7197b3] items-center flex-col flex">
            <AdTitle title={adInfo.title}/>
            <div className='lg:w-[80%]'>
                <SlidePicture pictures={adInfo.pictures} fullScreen={false} automaticSlider={false}/>
            </div>
            <br></br>
            <div className="inline-flex">
                {addAndApartmentInfo}
            </div>
            <div className="bg-[#dbe8f5] rounded-xl sm:p-5 p-1 sm:m-20 m-5 shadow-container">
                {adInfo.description.map((d: string) => { return <><p className='text-black '>{d}</p><br></br></>})}
            </div>
        </div>
    )
}