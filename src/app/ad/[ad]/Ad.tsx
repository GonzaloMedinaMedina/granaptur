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
      <div className='Box NavaJoWhite'>
        {'Máx. Persons: ' + MaxPersons}
      </div>
      <div className='Box NavaJoWhite'>
        {'Min. Nights: ' + MinNights}
      </div>
      <div className='Box NavaJoWhite'>
        {'Beds: ' + Beds}
      </div>
      <div className='Box NavaJoWhite'>
        {'Bathroom: ' + Bathrooms}
      </div>
    </div>  

    const title = <h1>{Title}</h1>;

    const editContainer = props.editable ? 
      <a className="editButton" href={editableAdUrl}>EDIT</a>
      : null;

    return (
      <Link href={url}>  
        <div className="Ad padding">
          <div className='split center'>
          <img className="picture" src={Pictures[0]}></img>
          </div> 
          <br className='clear'/>
          <div className="AdContainer">
            <div  className='split'>      
              {title}           
              <br></br>        
              {addAndApartmentInfo}
            </div>
          </div>
          {editContainer} 
        </div>
      </Link>
    );
}
export default Ad;