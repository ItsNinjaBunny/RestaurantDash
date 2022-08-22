import React,{useState} from 'react'
import styled from 'styled-components';
import RestItems from './restItems';

const Cart = (props) => {

    const displayItems = [];
    const passThrough = (obj, qty) => {
        var cart = props.EditItemQty(obj, qty);
        document.getElementById("total").innerHTML = "Total: " + cart.total;
    }
    const delItems = (obj) => {
      
        
        let newCart = props.delFromCart(obj);
        
        console.log(newCart)
        document.getElementById("total").innerHTML = "Total: " + newCart.total;
    
        document.getElementById(obj).remove();
        console.log( document.getElementById(obj));
        console.log( document.getElementById('content'));
        //now ereases it in backend and update the total

    }
   
    function run(array,stack){
        
    for (let index = 0; index <array.length; index++) {
        const element = array[index];
        stack.push(<RestItems type="cart" index={index} delItems={delItems} EditItemQty={passThrough} menuItem={element}></RestItems>);
        
    }
   
    }
    run(props.cart.items,displayItems);
    //remove item by index when they decide to
    const Main = styled.div`
        height:auto;
 
        position:relative;
        top:-19.5vw;
        padding:3vw;
       `
       let today = new Date().toISOString().slice(0, 10)


    const [view,setView]=useState("cart");
    return (
        
        <Main>
            {view==="cart" && <>
            <div id="total">Total: {props.cart.total}</div>
            <div id="content">{displayItems}</div>
            //this place order prompt for payment screen 
            <button onClick={()=>setView("Pay")}>Place Order</button>
            </>}
           {view==="Pay"&& <>
            <div id ="payForm">
                <h1 id ="payH1">Payment</h1>
                <form id="pay">
                <input placeholder="Card owner Name"></input>
                <input placeholder="Card Number"></input>
                <input  min={today}  type="date"></input>
                <input placeholder="CVV"></input>
                <br></br>
                <button onClick={()=>{
                    console.log("Get this data sent or not sent but then trigger //complete order on payment screen will then trigger sending the cart to an endpoint awaiting confirmation to be forwarded to the orders page trigger the switch in mainpage duh")}}> Complete Order</button>
          
                </form>
                 </div>
           </>}
            
           

        </Main>

    )
}

export default Cart