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

  //add 3 sections tabs all will take in an order object and format it into items showing qty
  //each page will display a diffrent state of a element fetched and a button 
  //(this will delete it from the screen update the backend so it can display on the needed state page )
  const updateOrder=(orderId,status)=>{
    console.log(document.getElementById(orderId));
    document.getElementById(orderId).remove();
    // var interval = setInterval(()=>{ 
    //     console.log(document.getElementById("orderBox"+orderId));
    //     document.getElementById("orderBox"+orderId).remove();
    //        clearInterval(interval);
        
    //  }, 400);
}
  
  
  return (
    <>
      <div id="navmini">
      <button onClick={() => { switchOrders("Pending") }}>Pending</button>
        <button onClick={() => { switchOrders("Prep") }}>Preparing</button>
        <button onClick={() => { switchOrders("Completed") }}>Completed</button>
      </div>
      

    {active==="Pending" && <div>Pending Pending Orders<br/><OrderCard  query="Pending" updateOrder={updateOrder}></OrderCard></div>}
    {active==="Prep" && <div>Preparing Orders<br/><OrderCard query="In-Progress"></OrderCard></div>}
    {/* {active==="Ready" && <div>Ready For Pick Up<br/><OrderCard query=""></OrderCard></div>} */}
    {active==="Completed" &&<div>Completed Orders<br/><OrderCard query="Completed"></OrderCard></div>}
    </>
  )
}

export default Orders