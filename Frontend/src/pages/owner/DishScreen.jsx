import React, { useState } from 'react'
import styled from 'styled-components';
import Dishes from './dishes';
import DishView from './DishView';
import './dish.css'
const Main = styled.div`
    height:auto;
    width:100%;

`
const ButtonBox = styled.div`

    height:3vw;
    width:100%;
    background:#CCC;
    position:absolute;
    left:0vw;
    transiton:1s;
    box-shadow:.1vw .1vw .1vw .1vw #656565;
   top:6%;
`
const ButtonDish = styled.div`
    height:3vw;
    trasnsition:1s;
    width:50%;
    padding-top:0.7vw;
    font-size:1vw;
    float:left;
    text-align:center;
    cursor:pointer;
    
    &:hover{
        background-color:#656565;
        color:#fff
    }
`
const DishScreen = () => {
    const [state, setState] = useState("view");
    const [editItem, setEditItem] = useState({ dish: {} });
    function switchBusiness(x) {
        console.log(x);
        setTimeout(() => {
            setState(x);
        }, 400);
    };
    //edit state will be triggered from a call back passed in through view
    function handlecallBack(obj) {

        console.log(obj);
        setEditItem({
            dish: obj
        });
        console.log(editItem.dish);
        switchBusiness("edit");
    }
    return (
        <Main>
            <ButtonBox>
                <ButtonDish className={state === 'view' ? 'viewDish' : ''} onClick={() => { switchBusiness("view") }}>Dishes</ButtonDish>
                <ButtonDish className={state === 'create' ? 'createDish' : ''} onClick={() => { switchBusiness("create") }}>Add Recipe</ButtonDish>
            </ButtonBox>

            {state === 'create' && <Dishes switchBusiness={switchBusiness}></Dishes>}
            {state === 'view' && <DishView handlecallBack={handlecallBack}></DishView>}
            {state === 'edit' && <Dishes switchBusiness={switchBusiness} item={editItem.dish}></Dishes>}
        </Main>

    )
}

export default DishScreen