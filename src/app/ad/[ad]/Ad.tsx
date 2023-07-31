import Link from 'next/link'
import AdProperty from '@/app/adProperty/adProperty';

const Ad = (props) =>
{
  const properties = props.adInfo.properties;
  const Title = props.adInfo.title;
  const Id = props.adInfo.id ? props.adInfo.id : '';

  const Pictures = props.adInfo.pictures;
  const url = "/ad/" + Id;
  const editableAdUrl = "/editableAd/" + Id;

    const addAndApartmentInfo = properties.map(property =>
      {
        return <AdProperty adProperty={property}/>
      });
   
    const editContainer = props.editable ? 
      <a className="editButton" href={editableAdUrl}>EDIT</a>
      : null;

    return (
      <Link href={url}>  
        <div className="m-5 p-1 bg-[#89a6bf] rounded-xl">
            <h1 className='text-center text-clamp'>{Title}</h1>         
            <div className='block sm:inline-flex'>
                <div className='p-1'>
                    <img className="w-fit my-0 mx-auto" src={Pictures[0]}></img>
                </div> 
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
      </Link>
    );
}
export default Ad;