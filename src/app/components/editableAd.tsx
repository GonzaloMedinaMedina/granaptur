'use client'
import { useState } from 'react';
import TextInput from './textInput';
import { RequestUtils } from '../requestUtils';
import { iadProperty } from '../interfaces/iadProperty';
import AdProperty from './adProperty';

export default function EditableAd({adInfo} : {adInfo: any})
{
    var title: string = '',
      properties: Array<iadProperty> = [],
      id: string = '';

    if (adInfo?.id !== undefined && adInfo?.id !== 'new')
    {
      title = adInfo.id;
      properties = adInfo.properties;
      id = adInfo.id;
    }

    const [adTitle, setTitle] = useState(title);

    const AdProperties = properties.map(property => {
        return <AdProperty key={property.name + id} adProperty={property} />
    }); 

    const onSaveFunc = async () =>
    {
      const adController = 'adController';
  
      const success = (data: any) => 
      {
        console.log(data);
      };
      
  
      await RequestUtils.postRequest(adController, getAdInfo(), success);    
    };
    
    const getAdInfo = (): any => 
    {
      return {
        id: id,
        columns:
        { 
          title: title, 
          pictures: getPicturesData() 
        }      
      };
    };
  
    
    const getPicturesData = () =>
    {
        return [];
    }


    return ( <div className="m-10 rounded-xl bg-[#7197b3] items-center flex-col flex">
        <button id="saveChanges" className='saveChanges' onClick={() => {onSaveFunc()}}>Save</button>
        <TextInput setText={setTitle} initValue={adTitle} width='100%'/>
        {AdProperties}
    </div>)
}