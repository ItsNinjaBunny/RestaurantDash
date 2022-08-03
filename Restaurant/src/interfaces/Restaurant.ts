import item from './item';

export default interface Restaurant {
    _id : number,
    name : string,
    menu_items : item[]
}