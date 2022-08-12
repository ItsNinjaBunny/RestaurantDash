import React, { Component,useState } from 'react'

class DishBoard extends Component {
    constructor(props) {

        super(props);
        this.inventory=[];
        this.state = {
           name:'',
           qty:'',
           value:this.props,
           ingredients:this.inventory
        };

        this.handleChange = this.handleChange.bind(this);
        this.drop = this.drop.bind(this);
        this.dragOver= this.dragOver.bind(this);

    }

   
    //prperty value this value will then update 
     async validation(e,x) {
        // this is the "context" for the function.  In this case
        // the element that changed.
        let obj ={
            name:x,
            qty:e.target.value
        }
        this.props.handlerIngredients(obj);
       
      
    }
    //function repectiviely back on the main page 
  
  async  drop  (e,val)  {
        console.log(val);
        e.preventDefault();
        //const obj =e.dataTransfer.getData('item');
        //this.props.handleStateChange(this.props.item.name, obj);
        //reformar for card to take in itemname that name then added or spliced from array 
        const card_id = e.dataTransfer.getData('card_id');
        const card = document.getElementById(card_id);
        console.log(card);
        card.style.display = 'block';
      
        if (this.props.active === "add") {
            const inputQty = document.createElement('input');
            inputQty.setAttribute('id','input'+card_id);
             //send push of obj to the main array in dishes
            let obj ={name:'input'+card_id,qty:1};
            this.props.handlerIngredient(obj);
            inputQty.value = 1;
            inputQty.addEventListener('change', (e) => this.validation(e,'input'+card_id));
            card.appendChild(inputQty);
           


        }else if(this.props.active==='items'){
            // let obj ={
            //     name:e.dataTransfer.getData('card_id')
            // }
            this.props.InventoryDel(e.dataTransfer.getData('card_id'));
           
            
            card.children[card.children.length - 1].remove();
            
        }
        e.target.appendChild(card);
        
        

    }
        
     dragOver = e => {
        e.preventDefault();
    }
    async  handleChange(e, x) {

        let getTextAreaValue = e.target.value;
        if (x == 1) {
            await this.setState({ name: getTextAreaValue });
        } else {
            await this.setState({ qty: getTextAreaValue });
        }
      
        //  let obj = {
        //     name:this.state.name ,
        //     qty:this.state.qty 
        // }
        //console.log(this.state.name,this.state.qty);
        this.props.handleStateChange(this.state.name,this.state.qty);
    }
    
   
    render(){
       
    return (
        <div id={this.props.id}
            className={this.props.className}
            onDrop={(e) => this.drop(e,this.props.id)}
            onDragOver={this.dragOver} >

            {this.props.active === "add" && <div>  <label>User Name</label>
                <input type="text" value={this.state.name} onChange={(e) => this.handleChange(e, 1)}></input>
                <label>Email address</label>
                <input type="text" value={this.state.qty} onChange={(e) =>  this.handleChange(e, 0)}></input></div>}
            {this.props.children}
        </div>
    )}
}

export default DishBoard