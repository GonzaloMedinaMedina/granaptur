import Link from 'next/link'

const Ad = (props) =>
{
  const Bathrooms = props.adInfo.bathrooms;
  const Beds = props.adInfo.beds;
  const MaxPersons = props.adInfo.maxPersons;
  const MinNights = props.adInfo.minNights;
  const Title = props.adInfo.title;
  const Id = props.adInfo.id ? props.adInfo.id : '';

  const Pictures = props.adInfo.pictures;
  const url = "/ad/" + Id;
  const editableAdUrl = "/editableAd/" + Id;

    const addAndApartmentInfo = 
    <div className="inline-flex" key={Id}>
      <div className='p-1.5 m-1 bg-amber-200 rounded-xl'>
        {'Máx. Persons: ' + MaxPersons}
      </div>
      <div className='p-1.5 m-1 bg-amber-200 rounded-xl'>
        {'Min. Nights: ' + MinNights}
      </div>
      <div className='p-1.5 m-1 bg-amber-200 rounded-xl'>
        {'Beds: ' + Beds}
      </div>
      <div className='p-1.5 m-1 bg-amber-200 rounded-xl'>
        {'Bathroom: ' + Bathrooms}
      </div>
    </div>  

    const editContainer = props.editable ? 
      <a className="editButton" href={editableAdUrl}>EDIT</a>
      : null;

    return (
      <Link href={url}>  
        <div className="m-1 p-1 bg-[#89a6bf] rounded-xl">
            <h1 className='text-center text-clamp'>{Title}</h1>         
            <div className='flex'>
                <div className='p-1'>
                    <img className="w-fit" src={Pictures[0]}></img>
                </div> 
                <br className='clear-both'/>
                <div className="flex p-1">
                    <div className='p-1'>      
                        <br></br>        
                        {addAndApartmentInfo}
                    </div>
                </div>
                {editContainer} 
            </div>
        </div>
      </Link>
    );
}
export default Ad;