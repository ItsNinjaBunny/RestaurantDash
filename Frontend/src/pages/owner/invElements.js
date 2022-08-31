
import styled from 'styled-components'
export const  H1 = styled.h1`

font-weight:150;
font-size:5vw;
position:relative; 
text-align:left;
left:9vw;
top:-1.5vw;
z-index:1;
border-radius:1vw;
width:21vw;
padding-left:1vw;
padding-bottom:0.5vw;
background-color:#f5fafa;
color:#007fff;


`
export const H2 = styled.h2`
margin-left:5vw;
float:left;
font-size:1.5vw;
font-weight:100;
width:30%;
`
export const H3 = styled.h3`


font-weight:150;
font-size:4vw;
text-align:center;
width:20vw;
height:5vw;
z-index:1;
top:7.8vw;
position:relative;
left:-7.79vw;
padding:.5vw;
color:#007fff;

`
export const RoundBox = styled.div`

height:100%;
position:absolute;
width:4.5vw;

top:0vw;
border-top-left-radius: .8vw;
border-bottom-left-radius: .8vw;
overflow:hidden;
transition:1s;
transition-timing-function: ease-in-out;




${props => {
    if (props.toggle.changed===true) {
      return(`
      
      opacity:1;
      background-color:#000;
      color:#007fff;
        
      `)
     }else
    if (props.toggle.changed===false) {
     return(`
     background-color:#007fff;

     opacity:.9;
     `)
    }
    
  }}

`
export const AddInventoryForm = styled.form`
background-color:#17244d;
height:auto;
min-height:7vw;
width:80%;
transition:1s;
border:1px solid;
margin:0 auto;
margin-left:15%;

top:0vw;

padding-top:2vw;
padding:1vw;
border-radius:1.5vw;
text-align:center;

`
export const InventoryColNames = styled.div`
width:60%;
height:auto;
margin:2vw auto;
border-bottom:1px solid;
text-align:center;
margin-left:25%;

padding:1vwl

`  

const Input = styled.input`
margin-left:1.4vw;
`
export const Content = styled.div`
background-color:#ccc;
position:relative;

border-radius:1vw;
min-height:20vw;
height:auto;
top:-4vw;
overflow:hidden;
left:-1.4rem;
padding-top:2vw;
padding-bottom:8vw;
width:105%;
transition:0.7s;


`
export const  UpdateInventoryForm = styled.form`
height:auto;

width:80%;
transition:1s;
border:1px solid;
margin:2vw auto;
margin-left:15%;
top:0vw;
padding:2vw;
border-radius:1.5vw;
background-color:#17244d;
text-align:center;
`