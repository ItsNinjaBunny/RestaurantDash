import React ,{useState}from 'react'
import styled from 'styled-components'

const RestItems = (props) => {
    const Item = styled.div`
    position:relative;
    top:2vw;

    height:auto;
    border:1px solid #fff;
    padding:1vw;
    width:80%;
    font-weight:100!important;
    margin:0 auto;
    margin-bottom:2vw;
    border-radius:1vw;  
    transition:0.7s;

    `
  return (
   
        <Item className={props.menuItem.state==='Complete' ? completed : ''  } id={props.menuItem.name}>
            
            <h1>{props.menuItem.name}</h1>
            <br></br>
            <h1>{props.menuItem.price}</h1> 
            <br></br>
            {props.menuItem.order===true && <> 
            <h1 id="payH1">Qty: {props.menuItem.quantity}</h1></>}

            {props.type==="cart" &&  <h1> Qty<input type='number'  min="1" defaultValue={props.menuItem.quantity} onChange={(e)=>{if(e.target.value===''){e.target.value=1;props.EditItemQty(e,props.menuItem,e.target.value)}else{
                props.EditItemQty(props.menuItem,e.target.value);
            }}}></input> </h1>}
            {props.type==="cart" && <button onClick={(e)=>props.delItems(props.menuItem.name)}>Remove</button>}
            
            {/* //add a proerty defining if it is resturant or cart 
            //one will show regular as seen below other will have 
            //qty displaying and update quantity */}
            {props.type==="restaurant" && <button onClick={(e)=>props.AddToCart(props.menuItem)}>Add To Cart</button>}
            
        </Item>
  
  )
}

export default RestItems