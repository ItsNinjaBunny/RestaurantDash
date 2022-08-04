import { ObjectId } from 'mongodb';
import item from './Item';
import coupon from './Coupon';
import license from './License';

export interface user {
    _id : ObjectId;
    name : string;
    email : string;
    password : string;
    license : license
    coupons : coupon[];
    cart : {
        basket : item[];
        total : number;
    }, 
    location : {
        formatted_address : string;
        coords : { lat : number, lng : number } | { }
    }
}

export const init = async(options?: Partial<user>) => {
    return { 
        _id : new ObjectId(),
        name : options?.name,
        email : options?.email,
        password : options?.password,
        license : {
            type : options?.license?.key === undefined ? 'personal' : 'business'
        },
        coupons : [],
        cart : {
            basket : [],
            total : 0
        },
        location : {
            formatted_address : options?.location?.formatted_address,
            coords : { }
        }
    } as user;
};
