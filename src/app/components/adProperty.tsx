import { iadProperty } from "../interfaces/iadProperty";

export default function AdProperty({adProperty} : {adProperty: iadProperty})
{
    return (<div className='text-black p-1.5 m-1 bg-amber-200 rounded-xl'>
        {adProperty.name + ': ' + adProperty.value}
    </div>);
}