import React, { Component, useState } from 'react'

class CouponBoard extends Component {
    constructor(props) {

        super(props);

        this.coupon = {
            item: '',
            type: ''
        }
        this.state = {
            name: '',
            qty: '',
            value: this.props,
            coupon: this.coupon
        };

        this.handleChange = this.handleChange.bind(this);
        this.drop = this.drop.bind(this);
        this.dragOver = this.dragOver.bind(this);

    }


    //prperty value this value will then update 
    async validation(e, x) {
        // this is the "context" for the function.  In this case
        // the element that changed.
       x.value=e.target.value;
        this.props.handlerCoupon(x);


    }
    //function repectiviely back on the main page 

    async drop(e, val) {
        const card_id = e.dataTransfer.getData('card_id');
        const card = document.getElementById(card_id);
       
        if (String(e.dataTransfer.getData('qty'))  !== 'undefined'){
            var obj = JSON.parse(e.dataTransfer.getData('qty'));
            
        }

        if (this.props.active === "coupon") {
            
            if (card_id.includes("item")) {
                e.stopPropagation();
            } else if (card_id.includes("coupon")) {
              
                console.log(obj);
                this.props.handlerDeleteIfExists(obj,2);
                if(obj.input===true){
                card.children[card.children.length - 1].remove();
                }
                e.target.appendChild(card);
               
            }
        } else if (this.props.active === "item") {
            if (card_id.includes("coupon")) {
                e.stopPropagation();
            } else if (card_id.includes("item")) {

                this.props.handlerDeleteIfExists(card_id,1);
                e.target.appendChild(card);
                

            }

        } else {
            e.preventDefault();
            //const obj =e.dataTransfer.getData('item');
            //this.props.handleStateChange(this.props.item.name, obj);
            //reformar for card to take in itemname that name then added or spliced from array 

            if (this.props.active !== "coupon" && this.props.active !== "item") {

                if (card_id.includes("item")) {
                    if (this.props.handlerCoupon1(1)) {
                        this.props.handlerCouponAdd(card_id, 1);
                        e.target.appendChild(card);
                    } else {
                        e.stopPropagation();
                    }
                }
                if (card_id.includes("coupon")) {
                        
                        this.props.handlerCouponAdd(obj, 2);
                        if(obj.input===true){
                            obj.value='';
                            const inputQty = document.createElement('input');
                            //send push of obj to the main array in dishes
                            // let obj ={name:'input'+card_id,qty:1};
                            // this.props.handlerIngredient(obj);
                            inputQty.value = '';
                            inputQty.placeholder='value';
                            inputQty.addEventListener('change', (e) => this.validation(e,obj));
                            card.appendChild(inputQty);
                        }
                   
                        e.target.appendChild(card);
                    

                }

                // if (String(e.dataTransfer.getData('qty')) !== 'undefined') {
                //     var obj = JSON.parse(e.dataTransfer.getData('qty'));
                //     console.log(obj);
                //     console.log(obj);
                //     card.style.display = 'block';
    
                //     if (obj.input === true && this.props.active !== "coupon" && this.props.active !== "item") {
    
               
                //         e.target.appendChild(card);
                //     } else if (obj.input === true && this.props.active === "coupon") {
                //         // let obj ={
                //         //     name:e.dataTransfer.getData('card_id')
                //         // }
                //         //this.props.InventoryDel(e.dataTransfer.getData('card_id'));
    
    
                //         card.children[card.children.length - 1].remove();
                //         e.target.appendChild(card);
    
                //     }
    
                //}
                //console.log(e.dataTransfer.getData('qty'));


            }
            //input box is appended b/c idk
           


        }



    }

    dragOver = e => {
        e.preventDefault();
    }
    async handleChange(e, x) {

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
        this.props.handleStateChange(this.state.name, this.state.qty);
    }


    render() {

        return (
            <div id={this.props.id}
                className={this.props.className}
                onDrop={(e) => this.drop(e, this.props.id)}
                onDragOver={this.dragOver} >


                {this.props.children}
            </div>
        )
    }
}

export default CouponBoard