import { iadProperty } from "@/app/adProperty/iadProperty";
import { idto } from "@/app/databaseManager/idto";

export interface iad extends idto
{
    description: string,
    pictures: Array<any>,
    title: string
    properties: Array<iadProperty>
}