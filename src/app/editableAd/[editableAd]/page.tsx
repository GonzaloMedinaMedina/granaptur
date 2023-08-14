import EditableAd from "@/app/components/editableAd";
import { DataBaseService } from "@/app/databaseManager/databaseService";

async function getAd(id:string)
{
    const dtoName = 'ad';
    const dto = await DataBaseService.getDtoById(id, dtoName, true);
    return JSON.parse(dto);
}

export default async function EditableAdPage({params}: {params: {editableAd: string}})
{
    const adInfo = await getAd(params.editableAd);

    return ( <EditableAd adInfo={adInfo}></EditableAd>)
}