import ingredient from './Ingredient';

export default interface Item_Menu {
    dish_name : string;
    ethnicity: string;
    ingridents : ingredient[],
    price: number;
    image_links: string[]
}