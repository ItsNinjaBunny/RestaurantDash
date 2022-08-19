import React from 'react'
import { H1 } from '../Login/LoginElements';
import './coupon.css'
import CouponBoard from './couponBoards';
import CouponCard from './couponCard';
class Coupons extends React.Component {
  constructor() {
    super();
    this.coupon = {
      item: '',
      type: []
  }
    this.state = {
      coupon: this.coupon
    };
  
    this.obj={
      name:'coupon1',
      input:true
    }
    this.obj2={
      name:'coupon2',
      input:false
    }
    this.ItemCards = [<CouponCard id="item-1" className="card" draggable="true">item 1</CouponCard>,
    <CouponCard  id="item-2" className="card" draggable="true" >item 2</CouponCard>];
    this.CouponCards = [<CouponCard item ={this.obj}id="coupon-1" className="card" draggable="true">coupon 1</CouponCard>,
    <CouponCard item ={this.obj2} id="coupon-2"  className="card"  draggable="true">coupon 2</CouponCard>];
    this.handlerCoupon = this.handlerCoupon.bind(this);
    this.handlerCoupon1 = this.handlerCoupon1.bind(this);
    this.handlerCouponAdd = this.handlerCouponAdd.bind(this);
    this.switchBusiness = this.switchBusiness.bind(this);
    this.handlerDeleteIfExists = this.handlerDeleteIfExists.bind(this);

  }
  async handlerCouponAdd(card_id,x){
    
    if(x===1){
      this.coupon.item = card_id;
      await this.setState({
          coupon: this.coupon
      });
      console.log(this.state.coupon);
    }
    if(x===2){
      this.coupon.type.push(card_id);
      await this.setState({
        coupon: this.coupon
    });
    console.log(this.state.coupon);
    }
    
    
  }
   handlerCoupon1(x){
    
    if(this.coupon.item==='' && x ===1){
      return true;
    }else if (this.coupon.type === '' && x ===2 ){
      return true;
    }else{
     
      return false;
    }
    
    
  }
  async handlerDeleteIfExists(obj,x){
    console.log(obj);
    console.log(this.state.coupon);
    if(this.coupon.item===obj && x===1){
      this.coupon.item='';
      await this.setState({
        coupon: this.coupon
    });
    }
    //
   
    if(x===2){
      this.coupon.type = this.coupon.type.filter(object => {
        return object.name !== obj.name;
      });
      await this.setState({
        coupon: this.coupon
    });
    }
    console.log(this.state.coupon);
  }
  async handlerCoupon(obj){
    if(obj.value!=undefined){
      console.log(obj)
      if(this.coupon.type.length>0){
        const index = this.coupon.type.findIndex((emp) => emp.name ===  obj.name);
        console.log(this.coupon.type[index]);
        
        if(index!==-1){
          this.coupon.type[index]=obj;
          await this.setState({
            coupon: this.coupon
        });
        console.log(this.state.coupon);
        }

      
    }
    }else{
      console.log(obj);
    }

    
  }
  switchBusiness(x) {
    console.log(x);
    setTimeout(() => {
      this.setState({
        screen:x
      }) ;
    }, 400);
  };
  render() {

    return (
<>
<button onClick={() => { this.switchBusiness("show") }}>Coupons</button>
        <button onClick={() => { this.switchBusiness("create") }}>Make Coupon</button>

        {this.state.screen=== 'create' && <main className='flexbox'>
        <CouponBoard active="item"  id="board-1" className="board"  handlerCoupon1={this.handlerCoupon1} handlerCoupon={this.handlerCoupon} handlerDeleteIfExists={this.handlerDeleteIfExists} handlerCouponAdd={this.handlerCouponAdd}>
          {this.ItemCards}
        </CouponBoard>
        <CouponBoard  active="coupon" id="board-2" className="board" handlerCoupon1={this.handlerCoupon1} handlerCoupon={this.handlerCoupon} handlerDeleteIfExists={this.handlerDeleteIfExists}  handlerCouponAdd={this.handlerCouponAdd}>
          {this.CouponCards}
        </CouponBoard>
        <CouponBoard id="board-3" className="board" handlerCoupon1={this.handlerCoupon1} handlerCoupon={this.handlerCoupon}  handlerCouponAdd={this.handlerCouponAdd}>
          <br></br>
          <H1>Coupon</H1>
        </CouponBoard>
      </main>}
        {this.state.screen === 'show' && <div>hello mate</div>}
        
</>
      


    )
  }
}
export default Coupons