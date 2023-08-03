'use client'
import { iadProperty } from '../interfaces/iadProperty';
import AdProperty from './adProperty';
import AdTitle from './adTitle';
import SlidePicture from './slidePicture/slidePicture';
import { useRouter } from 'next/navigation';

interface iAd
{
  adInfo: any,
  editable: boolean
}

const Ad: React.FC<iAd> = ({adInfo, editable}) =>
{
  const router = useRouter();
  const properties: Array<iadProperty> = adInfo.properties;
  const Id = adInfo.id ? adInfo.id : '';

  const pictures = adInfo.pictures;
  const url = "/ad/" + Id;
  const editableAdUrl = "/editableAd/" + Id;

  const addAndApartmentInfo = properties.map(property =>
  {
    return <AdProperty key={property.name + Id} adProperty={property}/>
  });
   
  const editContainer = editable ? 
    <a className=" m-5 p-2 border rounded-lg drop-shadow-lg transition ease-in-out hover:scale-150 bg-green-200 hover:bg-green-500 duration-300" href={editableAdUrl}>EDITAR</a>
    : null;

  const handleClick = (e: any) =>
  {
    e.preventDefault();
    if(!(e!.target!.name === 'arrow' || e!.target!.id === 'arrow'))
      router.push(url);
  }
    
  return (

    <div className=" flex my-20 mx-10 sm:mx-60 p-1 bg-[#89a6bf] rounded-xl">
      <div>
        <a href={url} onClick={handleClick}>
          <AdTitle title={adInfo.title} />
          <div className='block sm:inline-flex'>
            <SlidePicture pictures={pictures} />
            <br className='clear-both' />
            <div className="flex p-1">
              <div className='p-1'>
                <br></br>
                <div className="grid grid-cols-3 grid-rows-3 sm:inline-flex" key={Id}>
                  {addAndApartmentInfo}
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
      <div className='flex self-center float-right'>
        {editContainer}
      </div>
    </div>
  );
}
export default Ad;