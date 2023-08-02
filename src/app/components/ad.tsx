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
    <a className=" bg-green-500 p-5 rounded-xl" href={editableAdUrl}>EDIT</a>
    : null;

  const handleClick = (e) =>
  {
    e.preventDefault();
    if(!(e!.target!.name === 'arrow' || e!.target!.id === 'arrow'))
      router.push(url);
  }
    
  return (
    <div className="my-20 mx-60 p-1 bg-[#89a6bf] rounded-xl">
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
      {editContainer}
    </div>
  );
}
export default Ad;