import AdProperty from "@/app/components/adProperty";
import TextInput from "@/app/components/textInput"
import { DataBaseService } from "@/app/databaseManager/databaseService";
import { RequestUtils } from "@/app/requestUtils";

async function getAd(id:string)
{
    const dtoName = 'ad';
    const dto = await DataBaseService.getDtoInfo(id, dtoName, true);
    return JSON.parse(dto);
}

export default async function EditableAdPage({params}: {params: {ad: string}})
{
    const adInfo = await getAd(params.ad);
    const properties = adInfo.properties;

    const addAndApartmentInfo = properties.map(property => {
        return <AdProperty key={property.name + adInfo.id} adProperty={property} />
    }); 

    const onSaveFunc = async () =>
    {
      const adController = 'adController';
  
      const success = (data) => 
      {
        console.log(data);
      };
  
      await RequestUtils.postRequest(adController, getAdInfo(), success);    
    };

    const getAdInfo = () => 
    {
      return {
        id: adInfo.id,
        columns:
        { 
          title: adInfo.title, 
          pictures: getPicturesData() 
        }      
      };
    };
  

    return (
        <div className="m-10 rounded-xl bg-[#7197b3] items-center flex-col flex">
            <button id="saveChanges" className='saveChanges' onClick={() => {onSaveFunc()}}>Save</button>
            <TextInput setText={setTitle} initValue={adTitle} width='100%'/>
        </div>)
}