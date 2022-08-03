import { ObjectId } from 'mongodb';

export default interface ingredient {
    _id : ObjectId;
    name : string;
    stock : number;
}