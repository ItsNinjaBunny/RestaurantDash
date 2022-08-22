import React from 'react'
import styled from 'styled-components'

const RestTypeCard = (props) => {
    const ResturantBox = styled.div`
        position:relative;
        top:2vw;
        left:10%;
        background:#656565;
        margin:1vw;
        border:2px solid #fff;
        border-radius:5vw;
        width:80%;
        padding:4vw;
        cursor:pointer;
        transition:0.7s;
        &:hover{
          background-color:#000;
          color:#fff;
        }
    `
    const H1 = styled.h1`
      color:#fff;
      font-weight:100;

    `
    const IMG = styled.img`
    margin:0 auto;
    width:5vw;
    `
  return (
    <ResturantBox onClick={()=>props.createRestuarants(props.rest)}>
        <IMG src={props.rest.link} alt="restaurant logo"></IMG> <H1>{props.rest.name}</H1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique aliquam fugiat, sapiente cupiditate culpa ipsa, enim unde natus suscipit quasi soluta atque, voluptate magnam vel totam inventore tenetur deleniti facere.</p>
    </ResturantBox>
  )
}

export default RestTypeCard