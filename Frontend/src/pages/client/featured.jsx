//displaying restuarants by featured cards 
//featured of type will extend into card of component restaurants
//if restaurant compnent is clicked extends into restaurant 
import React ,{useState,useEffect}from 'react'
import styled from 'styled-components';
import CategoryCards from './categoryCards';
import RestType from './restType';
import Restuarant from './restuarant';

class Featured extends React.Component {
    //array of set featured compnents with there object passed in 

    //set state of a string that controlls the data rendered

    //the featured components show off the start will have an onclick that will send back element
    //this string will then be passed to create an element of resturants (boxes) with that type 

    constructor(props) {
        super(props);
        this.cuisinecategories = this.makeCategoryCards(['Chinese','Mexican','Italian','American','Greek','Indian','Japanese']);
        //
        this.state = {
            active: 'start',
            landing:this.cuisinecategories,
            page:''
        }
        this.state.page =this.state.landing;
        this.handleBackLanding = this.handleBackLanding.bind(this);
        this.createRestuarants =this.createRestuarants.bind(this);
        this.makeCategoryCards = this.makeCategoryCards.bind(this);
        this.RestTypes = this.RestTypes.bind(this);
    }
    
    handleBackLanding(){
        this.setState({
            page:this.state.landing
        })
    }
    
    RestTypes= (obj) =>{
        
        console.log("hello");
        this.setState({
            page:<RestType type={obj} handleBackLanding={this.handleBackLanding} createRestuarants={this.createRestuarants}></RestType>
        })
       
    }
    makeCategoryCards(cuisinecategories){
        const array = [];
        for (let index = 0; index < cuisinecategories.length; index++) {
            array.push(<CategoryCards category={cuisinecategories[index]} restTypes={this.RestTypes} ></CategoryCards>)
        }
       
        return array;
    }
    createRestuarants=(obj)=>{
        this.setState({
            page:<Restuarant AddToCart={this.props.AddToCart} rest={obj} restTypes={this.RestTypes}></Restuarant>
        })
    }
   
   
    render() {
       
       const Main = styled.div`
        height:auto;
 
        position:relative;
        top:-19.5vw;
        padding:3vw;
       `
        return(
            
            <Main>
                {this.state.page}
            </Main>
        )
    }
}
export default Featured
