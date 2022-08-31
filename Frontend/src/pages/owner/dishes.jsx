import React from 'react'
import './dish.css'
import DishBoard from './dishBoard'
import Card from './card'
import axios from 'axios';
import styled from 'styled-components';
const SubmitButton = styled.div`
margin-top:.1vw; 
 background-color:#17244d;
 position:relative;
 color:#f5fafa;
 left:-20%;
  height:3vw;
  cursor:pointer;
  width:140%;
  text-align:center;
  transition:0.7s;
  &:hover{
    background-color:#656565;
    color:#fff;
  }
`
const H1 = styled.h1`
 position:relative;
 left:4%;
`
class Dishes extends React.Component {



  constructor(props) {
    super(props);
    this.getInventory();
    this.restInv = [];
    console.log(this.props.item);

    this.EditCards = [];

    this.InventoryCards = [];

    this.objs = {};
    this.screen = '';
    this.state = {
      postName: "",
      postQty: "",
      changed: false,
      inventory: [],
      screen: this.screen,
      screen2: this.screen,
      editObj: {}

    }


    this.handleStateChange = this.handleStateChange.bind(this);
    this.handlerIngredient = this.handlerIngredient.bind(this);
    this.handlerIngredients = this.handlerIngredients.bind(this);
    this.InventoryDel = this.InventoryDel.bind(this);
    this.addItem = this.addItem.bind(this);
    this.getInventory = this.getInventory.bind(this);
    this.editItem = this.editItem.bind(this);
    this.capitalizeFirstLetter = this.capitalizeFirstLetter.bind(this);

    // console.log(this.state.rawdata,this.state.inventory);
  };
  async getInventory() {
    var req = window.location.search.split("?id=");
    console.log(req[1]);
    let res = await axios("http://localhost:8080/restaurants/inventory", {
      method: "GET",
      params: { id: req[1] },
    });
    this.restInv = res.data;

    if (this.props.item !== undefined) {
      this.state.editObj = {
        name: this.props.item.dish_name,
        price: this.props.item.price,
        cuisine: this.props.item.cuisine
      };
      this.state.rawdata = this.state.editObj;
      this.state.inventory = this.props.item.ingredients

      const toRemove = this.props.item.ingredients;
      const difference = this.restInv.filter(ar => !toRemove.find(rm => (rm.name === ar.name)))


      for (let index = 0; index < difference.length; index++) {
        const element = difference[index];

        this.InventoryCards.push(<Card item={element} className="card" draggable="true"></Card>);
      }
      for (let index = 0; index < this.props.item.ingredients.length; index++) {
        const element = this.props.item.ingredients[index];
        console.log(element)
        this.EditCards.push(<Card item={element} edit="yes" handlerIngredients={this.handlerIngredients} className="card" draggable="true"></Card>);
      }


      this.setState({
        screen: this.InventoryCards,
        screen2: this.EditCards
      })

    } else {
      console.log(this.restInv);
      for (let index = 0; index < this.restInv.length; index++) {
        const element = this.restInv[index];
        this.InventoryCards.push(<Card item={element} className="card" draggable="true"></Card>);
      }

      this.setState({
        screen: this.InventoryCards,
      })



    }



  }
  async handleStateChange(x1, x2, x3) {
    //console.log(obj);
    let obj = {
      name: x1,
      price: x2 * 1,
      cuisine: x3
    }
    this.objs = obj;
    await this.setState({
      rawdata: this.objs
    })
    console.log(this.state.rawdata, this.state.inventory);

  }
  async handlerIngredients(obj) {
    if (obj.stock != undefined) {
      console.log(obj)
      if (this.state.inventory.length > 0) {
        const index = this.state.inventory.findIndex((emp) => emp.name === obj.name);

        if (index !== -1) {

          this.state.inventory[index] = obj;
          await this.setState({
            inventory: this.state.inventory
          })
          console.log(this.state.inventory, this.state.rawdata);
        }


      }
    } else {
      console.log(obj);
    }


  }

  async handlerIngredient(obj) {


    this.state.inventory.push(obj);
    await this.setState({
      inventory: this.state.inventory
    })



  }
  async InventoryDel(value) {
    var val = value;

    this.state.inventory = this.state.inventory.filter(object => {
      return object.name !== val.name;
    });
    await this.setState({
      inventory: this.state.inventory
    })
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  async addItem() {


    let recipe = {
      dish_name: this.state.rawdata.name,
      price: this.state.rawdata.price,
      cuisine: this.state.rawdata.cuisine,
      ingredients: this.state.inventory
    }
    recipe.cuisine= this.capitalizeFirstLetter(recipe.cuisine.toLowerCase());

    if (recipe.dish_name === '' || recipe.price === 0 || recipe.cuisine === '' || recipe.ingredients.length == 0) {
      window.alert("One or more fields are blank");
    }else{
      var req = window.location.search.split("?id=");


      let res = await axios("http://localhost:8080/restaurants/addrecipe", {
        method: "POST",
        params: {
          id: req[1]
        },
        data: { recipe }
      });
      this.props.switchBusiness("view");
    }
    
  }
  async editItem() {

    let recipe = {
      dish_name: this.state.rawdata.name,
      price: this.state.rawdata.price,
      cuisine: this.state.rawdata.cuisine,
      ingredients: this.state.inventory
    }

    var req = window.location.search.split("?id=");


    let res = await axios("http://localhost:8080/restaurants/update/dish", {
      method: "PATCH",
      params: {
        id: req[1]
      },
      data: { recipe }
    });

    this.props.switchBusiness("view");
  }


  render() {

    return (
      <>

        <main className='flexbox'>
          <DishBoard active="items" id="board-1" className="board" InventoryDel={this.InventoryDel}>
            <h1 >Inventory Cards</h1>
            {this.state.screen}

          </DishBoard>
          <DishBoard edit2={this.props.item} active="add" id="board-2" className="board" handleStateChange={this.handleStateChange} handlerIngredients={this.handlerIngredients} handlerIngredient={this.handlerIngredient}>

            <br></br>
            <h1>Drag And Drop Cards</h1>
            <br></br>
            {this.props.item === undefined && <SubmitButton onClick={this.addItem}><H1>Create Item</H1></SubmitButton>}

            {this.props.item !== undefined && <SubmitButton onClick={this.editItem}><H1>Edit Item</H1></SubmitButton>}

            {this.state.screen2}
          </DishBoard>
        </main>
      </>



    )
  }

}

export default Dishes