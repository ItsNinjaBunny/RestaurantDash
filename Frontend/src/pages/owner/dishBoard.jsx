import React, { Component, useState } from 'react'
import { H1 } from './invElements';

class DishBoard extends Component {
    constructor(props) {

        super(props);
        console.log(this.props);
        this.work={}
        if(this.props.active ==="add"&&this.props.edit2!==undefined){
           
            this.work={
            name: this.props.edit2.dish_name,
            quantity: this.props.edit2.price,
            cuisine: this.props.edit2.cuisine,
            }
            
        }else if(this.props.edit2===undefined){
            this.work={
                name:'',
                quantity: '',
                cuisine:'',
            }
        }
        this.inventory = [];
        this.state = {
            name: this.work.name,
            quantity: this.work.quantity,
            cuisine:this.work.cuisine,
            value: this.props,
            ingredients: this.inventory
        };
        
        if(this.props.edit1!==undefined){

        }
        this.invItem={};
        this.handleChange = this.handleChange.bind(this);
        this.drop = this.drop.bind(this);
        this.dragOver = this.dragOver.bind(this);
        this.validation = this.validation.bind(this);
        
        }

    
    //prperty value this value will then update 
    async validation(e, x) {
        // this is the "context" for the function.  In this case
        // the element that changed.
        let obj = {
            name: x,
            stock: e.target.value * 1
        }
        this.props.handlerIngredients(obj);


    }
    
    //function repectiviely back on the main page 

    async drop(e, val) {
        console.log(val);
        e.preventDefault();
        
        if (String(e.dataTransfer.getData('item'))  !== 'undefined'){
            this.invItem = JSON.parse(e.dataTransfer.getData('item')); 
        }
        console.log(this.invItem);
        const inv = document.getElementById(this.invItem.id);

        inv.style.display = 'block';
        //same card but with the input 
        if (this.props.active === "add" && this.props.edit1===undefined) {
            //make input a state that has its own attributes passed down from disheswhen deciding on board 
            // with  this.props.handlerIngredients(obj); 
            //this will then trigger on change of this input 
            //still removes the same as its the last children

           
            const inputquantity = document.createElement('input');
            inputquantity.setAttribute('id', 'input' + this.invItem.name);
            inputquantity.setAttribute('type', 'number' );
            let obj = { name: this.invItem.name, stock: 1 };
            this.props.handlerIngredient(obj);
            inputquantity.value = 1;
            inputquantity.addEventListener('change', (e) => this.validation(e, this.invItem.name));
            inv.appendChild(inputquantity);



        } else if (this.props.active === 'items') {
        
          
            this.props.InventoryDel(this.invItem);

            
            inv.children[inv.children.length - 1].remove();

        }
        e.target.appendChild(inv);



    }

    dragOver = e => {
        e.preventDefault();
    }
    async handleChange(e, x) {

        let getTextAreaValue = e.target.value;
        if (x == 1) {
            await this.setState({ name: getTextAreaValue });
        }else
        if (x == 2) {
            await this.setState({ cuisine: getTextAreaValue });
        }
        else if (x===0){
            await this.setState({ quantity: getTextAreaValue });
        }
        this.props.handleStateChange(this.state.name, this.state.quantity,this.state.cuisine);
    }

    
    render() {
        console.log(this.state);
        return (
            <div id={this.props.id}
                className={this.props.className}
                onDrop={(e) => this.drop(e, this.props.id)}
                onDragOver={this.dragOver} >

                {this.props.active === "add" &&
                <div id="labels">
                    <li>Dish Name: {this.props.edit2=== undefined  && <input className='dishInput' type="text" value={this.state.name} onChange={(e) => this.handleChange(e, 1)}></input>}  {this.props.edit2!== undefined  && <h1>{this.state.name}</h1> }</li>
                    <li>Price:   <input className='dishInput' type="number" value={this.state.quantity} onChange={(e) => this.handleChange(e, 0)}></input></li>
                    <li>Cuisine Type: <input  className='dishInput' type="text" value={this.state.cuisine} onChange={(e) => this.handleChange(e, 2)}></input></li>
                </div>
                    }
                {this.props.children}
                
            </div>
        )
    }
}

export default DishBoard