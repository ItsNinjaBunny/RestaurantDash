import React, { useState } from 'react'
import axios from 'axios';
import OrderItems from '../client/OrderItems';

const OrderCard = (props) => {

  const array = [];
  const [displayActive, setDisplayActive] = useState({
    array: array
  });
  async function getData() {
    let res = await axios("http://192.168.1.6:4500/orders?status=" + props.query, {
      method: "get"

    });

    //console.log(res.data);
    for (let j = 0; j < res.data.length; j++) {


      let orderItem = {
        id: res.data[j].id,
        name: res.data[j].restaurant,
        items: res.data[j].items,
        total: res.data[j].total,
        status: res.data[j].order_status,
        user_id: 'user_object_id'
      }
      console.log(orderItem);
      if (res.data[j].order_status === "Completed") {
        array.push(<OrderItems type="Business1" item={orderItem} updateOrder={props.updateOrder} ></OrderItems>);
        // setTimeout(()=>{
        //   setDisplayActive({ array: array });
        // },4000);

      } else {
        array.push(<OrderItems type="Business" item={orderItem} updateOrder={props.updateOrder} ></OrderItems>);
      
        // setTimeout(()=>{
        //   setDisplayActive({ array: array });
        // },4000);

      }



    }
    

  }
  // const res.data = [
  //     {
  //       order_number: '1',
  //       order_status: props.query,
  //       date: 'date object',
  //       user_id: 'user_object_id',
  //       restaurant: 'Panda Express',
  //       restuarant_name: 'restaurant_name',
  //       item: [{ name: '1 Entre and 2 Side', price: 12.99, qty: 2, cuisine: 'Chinese', restuarant: 'Panda Express' }, { name: 'Egg Rolls', price: 1.99, qty: 2, cuisine: 'Chinese', restuarant: 'Panda Express' }],
  //       total: 29.96
  //     },{
  //       order_number: '2',
  //       order_status: props.query,
  //       date: 'date object',
  //       user_id: 'user_object_id',
  //       restaurant: 'Panda Express',
  //       restuarant_name: 'restaurant_name',
  //       item: [{ name: '1 Entre and 2 Side', price: 12.99, qty: 2, cuisine: 'Chinese', restuarant: 'Panda Express' }, { name: 'Egg Rolls', price: 1.99, qty: 2, cuisine: 'Chinese', restuarant: 'Panda Express' }],
  //       total: 29.96
  //     }
  //   ];


  setTimeout(()=>{
    getData();
  },400);



  return (<div id="content5">
    {displayActive.array}
  </div>


  )
}

export default OrderCard