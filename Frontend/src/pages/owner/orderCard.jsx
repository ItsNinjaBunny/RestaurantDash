import React, { useState } from 'react'
import axios from 'axios';
import OrderItems from '../client/OrderItems';
class OrderCard extends React.Component{
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.array=[];
    this.getData();
    this.state={
    
      screen:this.array,

    }
   
  }
  async  getData() {
        let res = await axios("http://192.168.1.6:4500/orders?status=" + this.props.query, {
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
            this.array.push(<OrderItems type="Business1" item={orderItem} updateOrder={this.props.updateOrder} ></OrderItems>);
            setTimeout(()=>{
              this.setState({screen: this.array });
            },4000);
    
    
          } else {
            this.array.push(<OrderItems type="Business" item={orderItem} updateOrder={this.props.updateOrder} ></OrderItems>);
          
            setTimeout(()=>{
              this.setState({screen: this.array });
            },4000);
    
          }
    
    
    
        }
        
    
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