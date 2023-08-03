'use client'
import { useState } from 'react';
import TextInput from './textInput';
import { RequestUtils } from '../requestUtils';
import { iadProperty } from '../interfaces/iadProperty';
import AdProperty from './adProperty';

export default function EditableAd(adInfo: any)
{
    const [adTitle, setTitle] = useState(adInfo.title);
    const properties: Array<iadProperty> = adInfo.properties;

    const addAndApartmentInfo = properties.map(property => {
        return <AdProperty key={property.name + adInfo.id} adProperty={property} />
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
        id: adInfo.id,
        columns:
        { 
          title: adInfo.title, 
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
    </div>)
}