import React, { Component, useState } from 'react'

class DishBoard extends Component {
    constructor(props) {

        super(props);
        this.inventory = [];
        this.state = {
            name: '',
            qty: '',
            cuisine:'',
            value: this.props,
            ingredients: this.inventory
        };
        this.invItem={};
        this.handleChange = this.handleChange.bind(this);
        this.drop = this.drop.bind(this);
        this.dragOver = this.dragOver.bind(this);

    }


    //prperty value this value will then update 
    async validation(e, x) {
        // this is the "context" for the function.  In this case
        // the element that changed.
        let obj = {
            name: x,
            qty: e.target.value
        }
        this.props.handlerIngredients(obj);


    }
    //function repectiviely back on the main page 

    async drop(e, val) {
        console.log(val);
        e.preventDefault();
        //const obj =e.dataTransfer.getData('item');
        //this.props.handleStateChange(this.props.item.name, obj);
        //reformar for card to take in itemname that name then added or spliced from array 
        
        if (String(e.dataTransfer.getData('item'))  !== 'undefined'){
            this.invItem = JSON.parse(e.dataTransfer.getData('item'));
            
        }
        console.log(this.invItem);
        const inv = document.getElementById(this.invItem.id);

        inv.style.display = 'block';

        if (this.props.active === "add") {
            const inputQty = document.createElement('input');
            inputQty.setAttribute('id', 'input' + this.invItem.name);
            //send push of obj to the main array in dishes
            let obj = { name: this.invItem.name, qty: 1 };
            this.props.handlerIngredient(obj);
            inputQty.value = 1;
            inputQty.addEventListener('change', (e) => this.validation(e, this.invItem.name));
            inv.appendChild(inputQty);



        } else if (this.props.active === 'items') {
            // let obj ={
            //     name:e.dataTransfer.getData('card_id')
            // }
            this.props.InventoryDel(e.dataTransfer.getData('card_id'));


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
            await this.setState({ qty: getTextAreaValue });
        }

        //  let obj = {
        //     name:this.state.name ,
        //     qty:this.state.qty 
        // }
        //console.log(this.state.name,this.state.qty);
        this.props.handleStateChange(this.state.name, this.state.qty,this.state.cuisine);
    }


    render() {

        return (
            <div id={this.props.id}
                className={this.props.className}
                onDrop={(e) => this.drop(e, this.props.id)}
                onDragOver={this.dragOver} >

                {this.props.active === "add" && <div>  <label>Dish Name: </label>
                    <input type="text" value={this.state.name} onChange={(e) => this.handleChange(e, 1)}></input>
                    <label>Price: </label>
                    <input type="text" value={this.state.qty} onChange={(e) => this.handleChange(e, 0)}></input>
                    <label>Cuisine Type: </label>
                    <input type="text" value={this.state.cuisine} onChange={(e) => this.handleChange(e, 2)}></input></div>}
                {this.props.children}
                
            </div>
        )
    }
}

export default DishBoard