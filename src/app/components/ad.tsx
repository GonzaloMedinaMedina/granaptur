'use client'
import AdProperty from './adProperty';
import AdTitle from './adTitle';
import SlidePicture from './slidePicture/slidePicture';
import { useRouter } from 'next/navigation';

const Ad = (props) =>
{
  const router = useRouter();
  const properties = props.adInfo.properties;
  const Id = props.adInfo.id ? props.adInfo.id : '';

  const pictures = props.adInfo.pictures;
  const url = "/ad/" + Id;
  const editableAdUrl = "/editableAd/" + Id;

  const addAndApartmentInfo = properties.map(property =>
  {
    return <AdProperty key={property.name + Id} adProperty={property}/>
  });
   
  const editContainer = props.editable ? 
    <a className=" m-5 p-2 border rounded-lg drop-shadow-lg transition ease-in-out hover:scale-150 bg-green-200 hover:bg-green-500 duration-300" href={editableAdUrl}>EDITAR</a>
    : null;

  const handleClick = (e) =>
  {
    e.preventDefault();
    if(!(e!.target!.name === 'arrow' || e!.target!.id === 'arrow'))
      router.push(url);
  }
    
  return (

    <div className=" flex my-20 mx-10 sm:mx-60 p-1 bg-[#89a6bf] rounded-xl">
      <div>
        <a href={url} onClick={handleClick}>
          <AdTitle title={props.adInfo.title} />
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