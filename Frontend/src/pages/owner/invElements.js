
import styled from 'styled-components'
export const  H1 = styled.h1`
box-shadow:1px 1px 1px 1px #fff;
font-weight:150;
font-size:5vw;
position:relative; 
text-align:left;
left:11vw;
top:3vw;
z-index:1;
width:21vw;
padding-left:1vw;
background-color:#fff;


`
export const H2 = styled.h2`
float:left;
margin:1vw 0vw 1vw 5.5vw;

font-size:1.5vw;
font-weight:100;
`
export const H3 = styled.h3`


font-weight:150;
font-size:2vw;
text-align:center;
width:20vw;
height:3.5vw;
z-index:1;
top:2.5%;
position:relative;
left:-8.3vw;
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
align-items:center;
height:auto;
width:48%;
border:1px solid;
position:relative;
left:15vw;
top:0vw;
`
export const InventoryColNames = styled.div`
width:23vw;
height:auto;
margin:2vw 2vw 3vw 15vw;
border:1px solid;
text-align:center;

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
top:1vw;
overflow:hidden;
left:-1.4rem;
padding:2vw;
padding-bottom:8vw;
width:100%;



`
export const  UpdateInventoryForm = styled.form`
align-items:center;
height:auto;
width:48%;
border:1px solid;
position:relative;

left:15vw;
top:5vw;
`