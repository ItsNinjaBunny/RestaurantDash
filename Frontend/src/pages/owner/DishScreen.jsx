import React,{useState} from 'react'
import styled from 'styled-components';
import Dishes from './dishes';
import DishView from './DishView';
const Main= styled.div`
    height:auto;
    width:100%;
`
const DishScreen = () => {
    const [state, setState] = useState("view");
    const [editItem,setEditItem] = useState({dish:{}});
    function switchBusiness(x) {
        console.log(x);
        setTimeout(() => {
            setState(x);
        }, 400);
    };
    //edit state will be triggered from a call back passed in through view
    function handlecallBack(obj){
        
        console.log(obj);
        setEditItem({
            dish:obj
        });
        console.log(editItem.dish);
        switchBusiness("edit");
    }
    return (
        <Main>
            <div>DishScreen</div>
        <button onClick={() => { switchBusiness("view") }}>Dishes</button>
        <button onClick={() => { switchBusiness("create") }}>Add Recipe</button>
        {state=== 'create' && <Dishes switchBusiness={switchBusiness}></Dishes>}
        {state=== 'view' && <DishView handlecallBack={handlecallBack}></DishView>}
        {state==='edit' && <Dishes  switchBusiness={switchBusiness} item ={editItem.dish}></Dishes>}
        </Main>
    
    )
}

export default DishScreen