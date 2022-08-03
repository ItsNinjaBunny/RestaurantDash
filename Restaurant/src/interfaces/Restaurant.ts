import item from './item'
import coupon from './Coupon';

export default interface Restaurant {
    _id : number,
    name : string,
    menu_items : item[],
    coupon : coupon[],
    location : {
        formatted_address : string,
        coords : number[]
    }
}