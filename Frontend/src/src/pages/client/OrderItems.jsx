import React from 'react'
import styled from 'styled-components';
import RestItems from './restItems';

const OrderItems = (props) => {
    const Order = [];
    for (let index = 0; index < props.item.items.length; index++) {
        const element = props.item.items[index];
        element.order = true;
        Order.push(<RestItems menuItem={element}></RestItems>);
    }
    const OrderBox = styled.div`
        margin:5vw auto;
        height:auto;
        padding:2vw;
        width:80%;
        background-color:#ccc;
        border-radius:3vw;
    `
    var states = ['Confirmed', 'Preparing Order', 'Ready For Pick Up', 'Completed'];
    var stateCounter = 0;
    if (props.item.status === "Completed" || props.type === "Business" || props.type === "Business1") {
        console.log("hello");

    } else {
        var interval = setInterval(() => {
            if (stateCounter < states.length) {
                document.getElementById(props.item.id).innerHTML = "Order from  " + props.item.name + "  Status: " + states[stateCounter];
                stateCounter++;
            }
            else {
                clearInterval(interval);
            }
        }, 10000);

    }
    var buttonvalue = '';
   
    if (props.item.status === "Pending") {
        buttonvalue = 'In-Progress'
    } else if (props.item.status === "Preparing") {
        buttonvalue = 'Completed'
    } 
    const updateOrder = () => {
       
        //document.getElementById(orderId).remove();
        var interval = setInterval(() => {
            console.log(document.getElementById("orderBox" + props.item.id).remove());
            // props.updateOrder(("orderBox"+props.item.id));
            clearInterval(interval);

        }, 400);
    }




    return (
        <div id={"orderBox" + props.item.id}>
            <OrderBox >
            {props.type === "Business" && <h1>Order For:{props.item.user_id}</h1>}
            {props.type === "Business1" &&  <h1>Order For:{props.item.user_id}</h1>}
                {props.type === "Client" && <div id={props.item.id} class="payH1">Order from {props.item.name} Status:  {props.item.status} </div>}
                {Order}
                <br></br>
                <div class="payH1">Total: {props.item.total}</div>
                {props.type === "Business" && <button  onClick={(e) => updateOrder()}>Move To {buttonvalue}</button>}
            </OrderBox>
        </div>


    )
}

export default OrderItems