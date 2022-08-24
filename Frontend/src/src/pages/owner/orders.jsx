import React,{useState} from 'react'
import OrderItems from '../client/OrderItems';
import OrderCard from './orderCard';

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
      <div id="navmini">
      <button onClick={() => { switchOrders("Pending") }}>Pending</button>
        <button onClick={() => { switchOrders("Prep") }}>Preparing</button>
        <button onClick={() => { switchOrders("Completed") }}>Completed</button>
      </div>
      

    {active==="Pending" && <div>Pending Pending Orders<br/><OrderCard  query="Pending" ></OrderCard></div>}
    {active==="Prep" && <div>Preparing Orders<br/><OrderCard query="In-Progress"></OrderCard></div>}
    {/* {active==="Ready" && <div>Ready For Pick Up<br/><OrderCard query=""></OrderCard></div>} */}
    {active==="Completed" &&<div>Completed Orders<br/><OrderCard query="Completed"></OrderCard></div>}
    </>
  )
}

export default Orders