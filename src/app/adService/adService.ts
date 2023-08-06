import { DataBaseService } from "../databaseManager/databaseService"

export class AdService
{
    constructor(){}

    createAd = async (): Promise<string> =>
    {
        const dtoName: string = 'ad';
        const adTemplate = 
        {
            title: '',
            location: '',
            description: '',
            pictures: [],
            properties: []
        };
        
        return await DataBaseService.createDto(dtoName, adTemplate);
    }
}