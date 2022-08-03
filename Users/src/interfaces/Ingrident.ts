import { ObjectId } from 'mongodb';

export default interface Ingrident {
    _id : ObjectId;
    name : string;
    stock : number;
}