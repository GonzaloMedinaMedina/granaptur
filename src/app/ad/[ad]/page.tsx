import SlidePicture from '@/app/components/pictureSlider/pictureSlider';
import AdProperty from '@/app/components/adProperty';
import AdTitle from '@/app/components/adTitle';
import { iadProperty } from '@/app/interfaces/iadProperty';
// import { anuncios } from '@/app/anuncios';

export default async function AdPage({params}: {params: {ad: string}}) 
{
    // const adInfo: any = anuncios.find(a => a.id === params.ad)
    // const properties: Array<iadProperty> = adInfo?.properties;

    // const addAndApartmentInfo = properties.map(property => {
    //     return <AdProperty key={property.name + adInfo.id} adProperty={property} />
    // });

    // return (
    //     <div className="m-10 rounded-xl bg-[#7197b3] items-center flex-col flex">
    //         <AdTitle title={adInfo.title}/>
    //         <SlidePicture pictures={adInfo.pictures} width='1000' height='600' fullScreen={false} automaticSlider={false}/>
    //         <br></br>
    //         <div className="inline-flex">
    //             {addAndApartmentInfo}
    //         </div>
    //         <div className="bg-[#dbe8f5] rounded-xl p-5 m-20 shadow-container">
    //             <p>{adInfo.description}</p>
    //         </div>
    //     </div>
    // )
    return <div>hola paco</div>
}