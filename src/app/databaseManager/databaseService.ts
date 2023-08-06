import { MongoClient, ObjectId } from 'mongodb';
import { idto } from '../interfaces/idto';

const url = "mongodb://127.0.0.1:27017/";
const dbname = "tamdb";

export class DataBaseService
{
    static db: any;
    static client: any;

    constructor(){}

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
            return this.returnDto(toJson, dtos)
        }
    }

    static async getDtoById(dtoId: string, dtoName: string, toJson: boolean = false)
    {
        const query = { _id: new ObjectId(dtoId) };
        return await this.getDtoInfo(query, dtoName, toJson);
    }

    static async getDtoByQuery(query: object, dtoName: string, toJson: boolean = false)
    {    
        return await this.getDtoInfo(query, dtoName, toJson);
    }

    static async getDtoInfo(query: object, dtoName: string, toJson: boolean = false)
    {
        var dto;

        try
        {
            const dtoCollection = await this.getDtoCollection(dtoName);
            dto = await dtoCollection.findOne(query);
        } catch (e)
        {
            console.error(e);
        }
        finally
        {
            return this.returnDto(toJson, dto);
        }
    }

    // static async checkDtoExists(dtoId: string, dtoName: string)
    // {
    //     var dto = await this.getDtoInfo(dtoId, dtoName);
    //     return dto !== undefined && dto !== null;
    // }

    static returnDto(toString: boolean, dto: string)
    {
        if (toString)
            return JSON.stringify(dto);
        return dto;
    }

    static async createDto(dtoName: string, dtoObject: object)
    {
        const dtoCollection = await this.getDtoCollection(dtoName);
        const result = await dtoCollection.insertOne(dtoObject);
        return result.insertedId;
    }

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