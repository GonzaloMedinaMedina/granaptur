'use client'
import { iadProperty } from '../interfaces/iadProperty';
import AdProperty from './adProperty';
import AdTitle from './adTitle';
import SlidePicture from './slidePicture/slidePicture';
import { useRouter } from 'next/navigation';
import { useCallback } from "react"

interface iAd
{
  adInfo: any,
  editable: boolean
}

const Ad: React.FC<iAd> = ({adInfo, editable}) =>
{
  const router = useRouter();
  const properties: Array<iadProperty> = adInfo.properties;
  const Id = adInfo!['_id'] ? adInfo!['_id'] : '';

  const pictures = adInfo.pictures;
  const url = "/ad/" + Id;
  const editableAdUrl = "/editableAd/" + Id;

  const addAndApartmentInfo = properties.map(property =>
  {
    return <AdProperty key={property.name + Id} adProperty={property}/>
  });

  const removeAdFn = useCallback((e: any) => 
  {

  }, [])

  const editContainer = editable ? 
    <div className='flex self-center float-right'>
      <a className=" m-5 p-2 border rounded-lg drop-shadow-lg transition ease-in-out hover:scale-150 bg-green-200 hover:bg-green-500 duration-300" href={editableAdUrl}>EDITAR</a>
    </div>
    : null;

  const removeAd = editable ?
    <div className='cursor-pointer absolute h-10 w-10 -right-2 -top-2 rounded-full bg-black flex justify-center items-center' onClick={(e) => {removeAdFn(e)}}>
      <div className='relative text-3xl text-white'>X</div>
    </div>
    : null;

  const handleClick = (e: any) =>
  {
    e.preventDefault();
    if(!(e!.target!.name === 'arrow' || e!.target!.id === 'arrow'))
      router.push(url);
  }
    
  return (

    <div className="relative flex my-20 mx-10 sm:mx-60 p-1 bg-adblueback/40 rounded-xl">
      {removeAd}
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
      {editContainer}
    </div>
  );
}
export default Ad;