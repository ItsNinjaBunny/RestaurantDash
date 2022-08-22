import React from 'react'
import './dish.css'
import DishBoard from './dishBoard'
import Card from './card'
class Dishes extends React.Component {



  constructor() {
    super();
    this.inventory = [];
    this.restInv=[

      {id:'itemid1',
        name:"Cheese Slices",
        },  {id:'itemid2',
        name:"Potato Buns",
        },  {id:'itemid3',
        name:"Fries",
        }

    ]
    this.InventoryCards = [<Card item={this.restInv[0]} className="card" draggable="true"></Card>,
    <Card item={this.restInv[1]}   className="card" draggable="true"></Card>,<Card item={this.restInv[2]}   className="card" draggable="true"></Card>];

    this.objs = {};
    this.screen = '';
    this.state = {
      postName: "",
      postQty: "",
      changed: false,
      inventory: this.Inventory,
      screen: this.screen

    }


    this.handleStateChange = this.handleStateChange.bind(this);
    this.handlerIngredient = this.handlerIngredient.bind(this);
    this.handlerIngredients = this.handlerIngredients.bind(this);
    this.InventoryDel = this.InventoryDel.bind(this);
 

  };
 
  async handleStateChange(x1, x2,x3) {
    //console.log(obj);
    let obj = {
      name: x1,
      qty: x2,
      cuisine:x3
    }
    this.objs = obj;
    await this.setState({
      rawdata: this.objs
    })
    console.log(this.state.rawdata,this.inventory);

  }
  async handlerIngredients(obj) {
    if (obj.qty != undefined) {
      console.log(obj)
      if (this.inventory.length > 0) {
        const index = this.inventory.findIndex((emp) => emp.name === obj.name);
        console.log(this.inventory[index]);

        if (index !== -1) {

          this.inventory[index] = obj;
          await this.setState({
            inventory: this.inventory
          })
          console.log(this.inventory[index]);
        }


      }
    } else {
      console.log(obj);
    }


  }

  async handlerIngredient(obj) {


    this.inventory.push(obj);
    await this.setState({
      inventory: this.inventory
    })
    console.log(this.state.rawdata,this.state.inventory);


  }
  async InventoryDel(value) {

    this.inventory = this.inventory.filter(object => {
      return object.name !==  value;
    });
    await this.setState({
      inventory: this.inventory
    })
    console.log(this.state.inventory);

  }

  
  render() {

    return (
      <>
        
        <main className='flexbox'>
          <DishBoard active="items" id="board-1" className="board" InventoryDel={this.InventoryDel}>
            {this.InventoryCards}
          </DishBoard>
          <DishBoard active="add" id="board-2" className="board" handleStateChange={this.handleStateChange} handlerIngredients={this.handlerIngredients} handlerIngredient={this.handlerIngredient}>
          //button in this box that will create obj then will chnage state  to screen with 
          //succesfully created dish only leaving them with make anothe ritem or view dishes
          
          </DishBoard>
        </main>
      </>



    )
  }

}

export default Dishes