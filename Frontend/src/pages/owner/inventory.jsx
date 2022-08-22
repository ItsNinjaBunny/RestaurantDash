import React, { useState } from 'react'
import styled from 'styled-components'
import { Email, EmailBox } from '../Login/LoginElements'
import MyForm from './inputUpdate';

import './inv.css';
import { Content, H1, RoundBox ,H3,H2, InventoryColNames, AddInventoryForm, UpdateInventoryForm} from './invElements';


class Inventory extends React.Component {


    constructor() {
        super();

        this.displayData = [];
        this.objs =[];
        this.state = {
            showdata: this.displayData,
            rawdata:this.obj,
            postName: "",
            postQty:"",
            changed:false
        }

        this.appendData = this.appendData.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
        this.handleChange = this.handleChange.bind(this);

    };
    handleStateChange(userName,obj) {
    const index = this.objs.findIndex((emp) => emp.name ===  userName);
    console.log(this.objs[index]);
    console.log(obj);
    this.objs[index] = obj;
   
        this.setState({
            showdata: this.displayData,
            rawdata: this.objs,
            changed:true
   })
   console.log(this.objs[index]);
    }
    appendData(e) {
        e.preventDefault();
        let obj = {
            name:this.state.postName,
            qty:this.state.postQty
        }
        this.objs.push(obj);
        var index = this.objs.length*1;
        index === index--;
        this.displayData.push(<MyForm item={this.objs[index]} index={index}  handleStateChange = {this.handleStateChange}/>);
        this.setState({
            showdata: this.displayData,
            rawdata:this.obj,
            postName: "",
            postQty: ""
        });
    }

    

    handleChange(e,x) {
    
        e.preventDefault();
        let getTextAreaValue = e.target.value;
        if(x==1){
        this.setState({
            postQty: getTextAreaValue
        });
    }else{
        this.setState({
            postName: getTextAreaValue
        });
    }
    }
   
    render() {
        
        return (
            <>
            <H1>Inventory</H1>
            <Content>
               
                <RoundBox toggle={this.state}>
                    <H3>S</H3>
                    <H3>U</H3>
                    <H3>B</H3>
                    <H3>M</H3>
                    <H3>I</H3>
                    <H3>T</H3>
                </RoundBox>
                <InventoryColNames>
                    <H2>Name</H2>
                    <H2>Qty</H2>
                </InventoryColNames>
                <AddInventoryForm>
                <label>Name</label>
                <input rows="4" cols="50" value={this.state.postName} onChange={(e)=>this.handleChange(e,0)} ></input>
                <br></br>
                <label>Qty</label>
                <input rows="4" cols="50" value={this.state.postQty} onChange={(e)=>this.handleChange(e,1)} ></input>
                <br></br>
                <button className="button" onClick={(e)=> this.appendData(e)}>Append</button>
                </AddInventoryForm>
                <UpdateInventoryForm>
                     {this.displayData}
                </UpdateInventoryForm>
            </Content>
           
            
            </>
            
            
        );
    }

};

export default Inventory