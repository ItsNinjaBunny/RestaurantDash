import React from 'react'
import styled from 'styled-components';
import RestItems from '../client/restItems'
import axios from 'axios';
const Main = styled.div`
  color:#f5fafa;
  height:auto;
  width:100%;
  margin-top:7%;
  padding-bottom:2vw;
  border-radius:1vw;
`
class DishView extends React.Component {
  //fetch for all dishes from restuarant 
  constructor(props) {
    super(props);
    this.getDishes();
    this.dishes=[];
    this.state = {
      displayDishes: []
    }
    this.getDishes = this.getDishes.bind(this);
    // for (var x = 0; x < res.data.length; x++) {
    //   const Dish = res.data[index];
    //   this.state.displayDishes.push(<RestItems menuItem={Dish} type="Business" handlecallBack={this.props.handlecallBack}></RestItems>);
    // }
    
    

  }
async getDishes(){
    var req = window.location.search.split("?id=");
    console.log(req[1]);
    let res = await axios("http://localhost:8080/restaurants/restaurants/dishes", {
        method: "GET",
        params: {id:req[1]},
    });
    console.log(res.data);
    for (let index = 0; index < res.data.menu_items.length; index++) {
      const Dish = res.data.menu_items[index];
      this.state.displayDishes.push(<RestItems menuItem={Dish} type="Business" handlecallBack={this.props.handlecallBack}></RestItems>);
    }
   
    this.setState({
     displayDishes: this.state.displayDishes
    })
}
  render() {
    return (<Main>
      {this.state.displayDishes}
    </Main>


    )
  }

}

export default DishView