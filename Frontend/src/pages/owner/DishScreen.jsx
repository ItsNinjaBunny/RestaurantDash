import React,{useState} from 'react'
import Dishes from './dishes';
import DishView from './DishView';

const DishScreen = () => {
    const [state, setState] = useState("view");
    function switchBusiness(x) {
        console.log(x);
        setTimeout(() => {
            setState(x);
        }, 400);
    };
    return (
        <>
            <div>DishScreen</div>
        <button onClick={() => { switchBusiness("view") }}>Dishes</button>
        <button onClick={() => { switchBusiness("create") }}>Add Recipe</button>
        {state=== 'create' && <Dishes></Dishes>}
        {state=== 'view' && <DishView></DishView>}
        </>
    
    )
}

export default DishScreen