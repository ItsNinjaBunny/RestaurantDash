
import styled from 'styled-components'
export const  H1 = styled.h1`
box-shadow:1px 1px 1px 1px #ccc;
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
background-color:#fff;


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
top:4.5vw;
position:relative;
left:-7.8vw;
padding:.5vw;

`
export const RoundBox = styled.div`
border-right:1px solid;
height:100%;
position:absolute;
width:4.5vw;
left:0vw;
top:0vw;
border-top-left-radius: 1vw;
border-bottom-left-radius: 1vw;
overflow:hidden;
transition:1s;
transition-timing-function: ease-in-out;




${props => {
    if (props.toggle.changed===true) {
      return(`
      
      opacity:1;
      background-color:#fff;
        
      `)
     }else
    if (props.toggle.changed===false) {
     return(`
     background-color:#000;

     opacity:.9;
     `)
    }
    
  }}

`
export const AddInventoryForm = styled.form`

height:auto;
min-height:7vw;
width:80%;
transition:1s;
border:1px solid;
margin:0 auto;
margin-left:6vw;
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
margin-left:10vw;
padding:1vwl

`  

const Input = styled.input`
margin-left:1.4vw;
`
export const Content = styled.div`

position:relative;
border:1px solid;
border-radius:1vw;
min-height:18vw;
height:auto;
top:-4vw;
overflow:hidden;
left:-1.4rem;
padding-top:2vw;
padding-bottom:8vw;
width:105%;



`
export const  UpdateInventoryForm = styled.form`
height:auto;

width:80%;
transition:1s;
border:1px solid;
margin:2vw auto;
margin-left:6vw;
top:0vw;
padding:2vw;
border-radius:1.5vw;
background-color:#656565;
text-align:center;
`