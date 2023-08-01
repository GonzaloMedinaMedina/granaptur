import { iadProperty } from "@/app/interfaces/iadProperty";
import { idto } from "@/app/interfaces/idto";

export interface iad extends idto
{
    description: string,
    pictures: Array<any>,
    title: string
    properties: Array<iadProperty>
}