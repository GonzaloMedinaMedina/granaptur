'use client'
import Link from 'next/link'
import AdProperty from '@/app/adProperty/adProperty';
import SlidePicture from '@/app/slidePicture/slidePicture';
import { useRouter } from 'next/navigation';

const Ad = (props) =>
{
  const router = useRouter();
  const properties = props.adInfo.properties;
  const Title = props.adInfo.title;
  const Id = props.adInfo.id ? props.adInfo.id : '';

  const Pictures = props.adInfo.pictures;
  const url = "/ad/" + Id;
  const editableAdUrl = "/editableAd/" + Id;

  const addAndApartmentInfo = properties.map(property =>
  {
    return <AdProperty key={property.name + Id} adProperty={property}/>
  });
   
  const editContainer = props.editable ? 
    <a className="editButton" href={editableAdUrl}>EDIT</a>
    : null;

  const handleClick = (e) =>
  {
      e.preventDefault();
    if(!(e!.target!.name === 'arrow' || e!.target!.id === 'arrow'))
      router.push(url);
  }
    
  return (
    <a href={url} onClick={handleClick}>  
      <div className="m-5 p-1 bg-[#89a6bf] rounded-xl">
          <h1 className='text-center text-clamp'>{Title}</h1>         
          <div className='block sm:inline-flex'>
              <SlidePicture pictures={Pictures}/>
              <br className='clear-both'/>
              <div className="flex p-1">
                  <div className='p-1'>      
                      <br></br>        
                      <div className="grid grid-cols-3 grid-rows-3 sm:inline-flex" key={Id}>
                      {addAndApartmentInfo}
                      </div>
                  </div>
              </div>
              {editContainer} 
          </div>
      </div>
    </a>
  );
}
export default Ad;