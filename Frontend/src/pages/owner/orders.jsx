import React,{useState} from 'react'
import styled from 'styled-components';
import OrderItems from '../client/OrderItems';
import OrderCard from './orderCard';
const ButtonBox = styled.div`

    height:3vw;
    width:100%;
    background:#CCC;
    position:absolute;
    box-shadow:.1vw .1vw .1vw .1vw #656565;
    left:0vw;
   top:6%;
`
const ButtonOrders = styled.div`
    height:3vw;
    trasnsition:0.7s;
    width:33.33%;
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
const Orders = (props) => {
  const [active, setActive] = useState("Pending");
  //window alert
  function switchOrders(x) {
    setTimeout(() => {
      setActive(x);
    }, 400);
  };


  
  return (
    <>
      <ButtonBox>
      <ButtonOrders className={active === 'Pending' ? 'viewDish' : ''} onClick={() => { switchOrders("Pending") }}>Pending</ButtonOrders>
        <ButtonOrders className={active === 'Prep' ? 'viewDish' : ''} onClick={() => { switchOrders("Prep") }}>Preparing</ButtonOrders>
        <ButtonOrders className={active === 'Completed' ? 'viewDish' : ''} onClick={() => { switchOrders("Completed") }}>Completed</ButtonOrders>
      </ButtonBox>
      

    {active==="Pending" && <OrderCard  query="Pending" ></OrderCard>}
    {active==="Prep" && <OrderCard query="In-Progress"></OrderCard>}
    {/* {active==="Ready" && <div>Ready For Pick Up<br/><OrderCard query=""></OrderCard></div>} */}
    {active==="Completed" &&<OrderCard query="Completed"></OrderCard>}
    </>
  )
}

export default Orders