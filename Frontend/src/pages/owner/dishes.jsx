import React from 'react'
import './dish.css'
import DishBoard from './dishBoard'
import Card from './card'
import axios from 'axios';
class Dishes extends React.Component {



  constructor(props) {
    super(props);
    this.getInventory();
    this.restInv=[];
    console.log(this.props.item);
    
    this.EditCards=[];

    this.InventoryCards = [];
    
    this.objs = {};
    this.screen = '';
    this.state = {
      postName: "",
      postQty: "",
      changed: false,
      inventory: [],
      screen: this.screen,
      screen2:this.screen,
      editObj:{}

    }


    this.handleStateChange = this.handleStateChange.bind(this);
    this.handlerIngredient = this.handlerIngredient.bind(this);
    this.handlerIngredients = this.handlerIngredients.bind(this);
    this.InventoryDel = this.InventoryDel.bind(this);
    this.addItem = this.addItem.bind(this);
    this.getInventory = this.getInventory.bind(this);
    this.editItem = this.editItem.bind(this);
  
    
    // console.log(this.state.rawdata,this.state.inventory);
  };
  async getInventory(){
    var req = window.location.search.split("?id=");
    console.log(req[1]);
    let res = await axios("http://localhost:3500/inventory", {
        method: "GET",
        params: {id:req[1]},
    });
    this.restInv=res.data;
  
    if(this.props.item!==undefined){
      this.state.editObj = {
        name: this.props.item.dish_name,
        price: this.props.item.price,
        cuisine:this.props.item.cuisine
      };
      this.state.rawdata=this.state.editObj;
      this.state.inventory = this.props.item.ingredients

      const toRemove = this.props.item.ingredients;
      const difference= this.restInv.filter(ar => !toRemove.find(rm => (rm.name === ar.name) ))

    
      for (let index = 0; index < difference.length; index++) {
        const element = difference[index];
       
        this.InventoryCards.push(<Card item={element} className="card" draggable="true"></Card>);
      }
      for (let index = 0; index <this.props.item.ingredients.length; index++) {
        const element = this.props.item.ingredients[index];
        console.log(element)
        this.EditCards.push(<Card item={element} edit="yes" handlerIngredients={this.handlerIngredients} className="card" draggable="true"></Card>);
      }
      
   
      this.setState({
        screen: this.InventoryCards,
        screen2:this.EditCards
     })

    }else{
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
  async handleStateChange(x1, x2,x3) {
    //console.log(obj);
    let obj = {
      name: x1,
      price: x2*1,
      cuisine:x3
    }
    this.objs = obj;
    await this.setState({
      rawdata: this.objs
    })
    console.log(this.state.rawdata,this.state.inventory);

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
          console.log(this.state.inventory,this.state.rawdata);
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
    console.log(this.state.rawdata,this.state.inventory);


  }
  async InventoryDel(value) {
    var val = value;
    console.log(val);
    this.state.inventory = this.state.inventory.filter(object => {
      return object.name !==  val.name;
    });
    await this.setState({
      inventory: this.state.inventory
    })
    console.log(this.state.inventory,this.state.rawdata);

  }
  async addItem(){
    window.alert("dish has been created");
    this.props.switchBusiness("view");
        let recipe={
      dish_name: this.state.rawdata.name,
      price: this.state.rawdata.price,
      cuisine:this.state.rawdata.cuisine,
      ingredients:this.state.inventory
    }
    console.log("Sending this over now",recipe);
    var req =  window.location.search.split("?id=");
    console.log(req[1]);
   
    await axios("http://localhost:3500/addrecipe" , { 
      method: "POST",
      params: {
        id: req[1]
      },
      data: {recipe}
    });
  }
  async editItem(){
   
    let recipe={
      dish_name: this.state.rawdata.name,
      price: this.state.rawdata.price,
      cuisine:this.state.rawdata.cuisine,
      ingredients:this.state.inventory
    }
    console.log("Sending this over now",recipe);
    var req =  window.location.search.split("?id=");
    console.log(req[1]);
   
    await axios("http://localhost:3500/update/dish" , { 
      method: "PATCH",
      params: {
        id: req[1]
      },
      data: {recipe}
    });
    window.alert("dish has been edited");
    this.props.switchBusiness("view");
  }

  
  render() {
    
    return (
      <>
        
        <main className='flexbox'>
          <DishBoard  active="items" id="board-1" className="board" InventoryDel={this.InventoryDel}>
          <h1 id="payH1">Inventory Cards</h1>
          {this.state.screen}
            
          </DishBoard>
          <DishBoard edit2={this.props.item} active="add" id="board-2" className="board" handleStateChange={this.handleStateChange} handlerIngredients={this.handlerIngredients} handlerIngredient={this.handlerIngredient}>
            
            <br></br>
            <h1 id="payH1">Drag And Drop Cards</h1>
            {this.props.item===undefined && <button onClick={this.addItem}>Create Item</button>}
            
            {this.props.item!==undefined && <button onClick={this.editItem}>Edit Item</button>}
            
            {this.state.screen2}
          </DishBoard>
        </main>
      </>



    )
  }

}

export default Dishes