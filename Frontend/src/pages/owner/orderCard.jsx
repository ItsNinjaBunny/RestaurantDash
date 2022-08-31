import React, { useState } from 'react'
import axios from 'axios';
import OrderItems from '../client/OrderItems';

class OrderCard extends React.Component {
  constructor(props) {
    super(props);

    this.array = [];

    this.state = {

      screen: this.array,

    }
    if (this.props.query == "Pending") {
      var interval = setInterval(() => {
        this.getData();
      }, 45000);
    }


    this.getData = this.getData.bind(this);
    this.getData();
  }

  checker() {

  }
  async getData() {
    this.array = [];
    var req = window.location.search.split("?id=");
  
    let res = await axios('http://localhost:8080/orders/orders/status/'+this.props.query+'/'+req[1], {
      method: "GET"
    });


    console.log(res);
    for (let j = 0; j < res.data.length; j++) {


      let orderItem = {
        id: res.data[j]._id,
        name: res.data[j].restaurant_name,
        items: res.data[j].items,
        total: res.data[j].total,
        status: res.data[j].order_status,
        date: res.data[j].date,
        user_id: res.data[j].user_id
      }
      console.log(orderItem);
      if (res.data[j].order_status === "Completed") {
        this.array.push(<OrderItems type="Business1" item={orderItem} updateOrder={this.props.updateOrder} ></OrderItems>);
      } else {
        this.array.push(<OrderItems type="Business" item={orderItem} updateOrder={this.props.updateOrder} ></OrderItems>);

      }



    }
    setTimeout(() => {
      this.setState({
        screen: this.array

      })
    }, 400);


  }

  render() {

    return (
      <div>
        {this.state.screen}
      </div>
    )
  }
}
// const OrderCard = (props) => {

//   const array = [];
//   const [displayActive, setDisplayActive] = useState({
//     array: array
//   });
//   async function getData() {
//     let res = await axios("http://192.168.1.6:4500/orders?status=" + props.query, {
//       method: "get"

//     });

//     //console.log(res.data);
//     for (let j = 0; j < res.data.length; j++) {


//       let orderItem = {
//         id: res.data[j].id,
//         name: res.data[j].restaurant,
//         items: res.data[j].items,
//         total: res.data[j].total,
//         status: res.data[j].order_status,
//         user_id: 'user_object_id'
//       }
//       console.log(orderItem);
//       if (res.data[j].order_status === "Completed") {
//         array.push(<OrderItems type="Business1" item={orderItem} updateOrder={props.updateOrder} ></OrderItems>);
//         // setTimeout(()=>{
//         //   setDisplayActive({ array: array });
//         // },4000);

//       } else {
//         array.push(<OrderItems type="Business" item={orderItem} updateOrder={props.updateOrder} ></OrderItems>);

//         // setTimeout(()=>{
//         //   setDisplayActive({ array: array });
//         // },4000);

//       }



//     }


//   }



//   setTimeout(()=>{
//     getData();
//   },400);



//   return (<div id="content5">
//     {displayActive.array}
//   </div>


//   )
// }

export default OrderCard