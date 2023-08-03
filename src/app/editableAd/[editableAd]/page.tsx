import EditableAd from "@/app/components/editableAd";
import { DataBaseService } from "@/app/databaseManager/databaseService";

async function getAd(id:string)
{
    const dtoName = 'ad';
    const dto = await DataBaseService.getDtoInfo(id, dtoName, true);
    return JSON.parse(dto);
}

export default async function EditableAdPage({params}: {params: {ad: string}})
{
    const adInfo = await getAd(params.ad);

    return ( <EditableAd adInfo={adInfo}></EditableAd>)
}