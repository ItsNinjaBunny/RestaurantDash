import React ,{useState,useRef}from 'react'
import styled from 'styled-components';
import Navbar from '../../components/Navbar';
import Cart from './cart';
import './client.css'
import Featured from './featured';
import Orders from './Orders';
const Client = () => {

  var req =  new URLSearchParams(window.location.search).get('type');
  //get all items 
  const myContainer = useRef(null);
  const [active, setActive] = useState("home");
  const total =[];
  const [activeTotal,setActiveTotal]=useState({name:'unchanged'});
  const [animation, setAnimation]= useState("move");
  const [user, setUser]= useState({
    //create function that will append and also delete by type 
    //token:URLSearchParams(window.location.search).get('token'),
    //figure out coupons 
    //mkae
    cart:{
      items:[],
      coupon:'',
      total:0
    }

  })
  //del from cart 
  function delFromCart(obj){
    console.log(user.cart.items);
    const index = user.cart.items.findIndex((emp) => emp.name === obj);
    console.log(obj);
    if(index!==-1){
    user.cart.items.splice(index,1);
  }
    
    return updateTotal();
    
    
  }
 function AddToCart(obj){

     //e.preventDefault();
     
    const index = user.cart.items.findIndex((emp) => emp.name === obj.name);
    
    console.log(obj);

    console.log(user.cart.items);
    if (index !== -1) {
      user.cart.items[index].quantity=user.cart.items[index].qty+1;
       
      console.log(user.cart.items[index]);
    }else{
      obj.quantity=1;
      user.cart.items.push(obj);
      console.log(user.cart.items);
    }
    updateTotal();
  }
  function EditItemQty(obj,qty){

    //e.preventDefault();
    console.log(obj);
   const index = user.cart.items.findIndex((emp) => emp.name === obj.name);
   
   

   console.log(user.cart.items);
   if (index !== -1) {
     user.cart.items[index].quantity=qty;
      
     console.log(user.cart.items[index]);
   }
    return updateTotal();
   
 
   
 }

  const updateTotal=()=>{
    if(user.cart.coupon!=''){

    }
    var x =0;
      for (let index = 0; index < user.cart.items.length; index++) {
        var element = user.cart.items[index].price * user.cart.items[index].quantity;
      
        x = x+element ;
        console.log(x)
        
      }
      user.cart.total= Number.parseFloat(x).toFixed(2);
      console.log(user.cart);
      return user.cart;
  }

  //window alert
  function switchClient(e,x){
    if(animation==="move"){
    
      setTimeout(() => {
        setAnimation("movedown");
      }, 400);
    }else{
      setTimeout(() => {
        setAnimation("move");
      }, 400);
     
      
    }
      
    
    
    e.preventDefault();
    setTimeout(() => {
      setActive(x);
    }, 400);
  };
  const Menu = styled.div`
  position:fixed;
  top:0;
  height:10vw;
  width:20vw;
  z-index: 10;
  `
  const BigBox = styled.div`
    height:auto;
    width:100%;
    overflow-x:hidden;
  `
  
  const Content = styled.div`
  position:absolute;
  height:auto;
  min-height:91.8%;
  width:100%;
  padding-top:20vw;
  text-align:center;
  background-color: #ccc;
  transition:1s;
  top:4vw; 
  overflow-y:unset;
  `
  const Total = styled.div`
    background:#000;
    color:$fff;
    height:5vw;
    width:5vw;
    margin:10vw auto;
  `
  
  return (
    
    <>
    
      <Navbar/> 
      <Menu>
      
          <button onClick={(e) => { switchClient(e,"home") }}>Home</button>
          <button onClick={(e) => { switchClient(e,"orders") }}>Orders</button>
          <button onClick={(e) => { switchClient(e,"cart") }}>Cart</button>
      </Menu>
      <Content className={active==='home'||'orders'||'cart'||'coupons' ? animation : ''} >
        {/* {active==="home" && <Featured></Featured>} */}
        {active==="home" && <Featured AddToCart={AddToCart}></Featured>}
        {active==="orders"&& <Orders></Orders>}
        {active==="cart" && 
        <>
         <Cart delFromCart={delFromCart} EditItemQty={EditItemQty} switchClient={switchClient}cart={user.cart}></Cart>
       
        </>
       
        }
        
        {active==="coupons" && <div>Coupons</div>}
      </Content>
    </>
   
    
    
  )
}

export default Client