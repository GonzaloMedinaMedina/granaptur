import { MongoClient } from 'mongodb';
import { idto } from './idto';

const url = "mongodb://127.0.0.1:27017/";
const dbname = "tamdb";

export class DataBaseService
{
    static db: any;
    static client: any;

    constructor()
    {
    }

    static async connect()
    {
        if (this.client == undefined)
        {
            this.client = new MongoClient(url);
        }
    }

    static async accessToDB()
    {
        if (!this.client)
        {
            this.connect();
        }

        if(!this.db)
        {
            this.db = await this.client.db(dbname);
        }
    };

    static async getDtoCollection(dtoName: string)
    {
        if (!this.db)
            await this.accessToDB();

        return await this.db.collection(dtoName)
    }
    
    static async listColumns()
    {
        if(!this.db)
            await this.accessToDB();
        
        const collection = this.db.collection("ad");
    }

    static async addDefaultColumnsToDocument(collectionName: string)
    {
        if (!this.db)
            await this.accessToDB();

        const collection = this.db.collection(collectionName)
        await collection.updateMany({ property_type: { $exists: false } }, { $set: { property_type: "Unknown" } })

    }

    static async createDefaultCollection(collectionName: string, columns: Array<any>)
    {
        const collection = await this.db.createCollection(collectionName);
        if (columns !== undefined)
        {
            const result = await collection.createIndex(columns);
        }
    }

    // static async createCollections()
    // {
    //     if (!this.db)
    //         await DataBaseService.accessToDB();

    //     const currnentcollections = await this.db.collections();
    //     for (var i = 0; i < collections.length; i++) 
    //     {
    //         if (!currnentcollections.find(collection => collection.collectionName === collections[i].name))
    //         {
    //             await this.createDefaultCollection(collections[i].name, collections[i].columns);
    //         }
    //     }
    // }

    static async getAllDtos(dtoName: string, toJson = false)
    {
        var dtos = [];

        try
        {
            const dtoCollection = await this.getDtoCollection(dtoName);
            var cursor = await dtoCollection.find();
            dtos = await cursor.toArray();
            
        } catch (e)
        {
            console.error(e);
        }
        finally
        {
            if (toJson)
                return this.getJsonDto(dtos);
            return dtos;
        }
    }

    static async getDtoInfo(dtoId: string, dtoName: string, toJson = false)
    {
        var dto;

        try
        {
            const dtoCollection = await this.getDtoCollection(dtoName);
            const query = { id: dtoId};
            dto = await dtoCollection.findOne(query);
        } catch (e)
        {
            console.error(e);
        }
        finally
        {
            if (toJson)
                return this.getJsonDto(dto);
            return dto;
        }
    }

    static async checkDtoExists(dtoId: string, dtoName: string, toJson = false)
    {
        var dto = await this.getDtoInfo(dtoId, dtoName, toJson = false);
        return dto !== undefined && dto !== null;
    }

    static getJsonDto(dto: string)
    {
        return JSON.stringify(dto);
    }

    // static async createDto(dtoName, dtoObjects)
    // {
    //     await this.getDtoCollection(dtoName).insertMany(dtoObjects);
    // }

    static async saveDto(dtoName: string, dtoInfo: idto)
    {
        const dtoId = dtoInfo.id;
        const filter = {id: dtoId};
        const options = {upsert: true};
        const columnsToUpdate: Array<any> = dtoInfo.columns;

        const updateDoc = 
        {
            $set:{ ...columnsToUpdate }
        };
        
        const dtoCollection = await this.getDtoCollection(dtoName);
        return await dtoCollection.updateOne(filter, updateDoc, options);
    }
}