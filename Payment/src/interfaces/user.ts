import { ObjectId } from 'mongodb';
import item from '../interfaces/Item';

export interface user {
    _id: ObjectId;
    name: string;
    cart: {
        basket: item[];
        total: number;
    },
    location: {
        type: 'Point';
        formatted_address: string;
        coords: { lat: number; lng: number }
    }
}