import React from 'react'
import styled from 'styled-components';
import RestItems from '../client/restItems';
import OrderItems from './OrderItems';

const Orders = () => {
    //fetch every 5 minutes for new objects but 
    //it did have issues so if it does not work out on fetching for new pbjects we will see

    //user id with orders 
    //order state is fetched
    const displayActive = [];
    const displayCompleted = [];
    const orderTemplate = [
        {
            order_number: '1',
            order_status: 'Completed',
            date: 'date object',
            user_id: 'user_object_id',
            restaurant: 'Panda Express',
            restuarant_name: 'restaurant_name',
            item: [{ name: '1 Entre and 2 Side', price: 12.99,qty:2, cuisine: 'Chinese', restuarant: 'Panda Express' },{ name: 'Egg Rolls', price: 1.99,qty:2, cuisine: 'Chinese', restuarant: 'Panda Express' }], 
            total:29.96
        }, {
            order_number: '2',
            order_status: 'Completed',
            date: 'date object',
            user_id: 'user_object_id',
            restaurant: 'Panda Express',
            restuarant_name: 'restaurant_name',
            item: [{ name: '1 Entre and 2 Side', price: 12.99,qty:1, cuisine: 'Chinese', restuarant: 'Panda Express' }], 
            total:12.99
        },{
            order_number: '3',
            order_status: 'Waiting Confirmation',
            date: 'date object',
            user_id: 'user_object_id',
            restaurant: 'Panda Express',
            restuarant_name: 'restaurant_name',
            item: [{ name: '1 Entre and 2 Side', price: 12.99,qty:2, cuisine: 'Chinese', restuarant: 'Panda Express' },{ name: 'Egg Rolls', price: 1.99,qty:2, cuisine: 'Chinese', restuarant: 'Panda Express' }], 
            total:29.96
        }, {
            order_number: '4',
            order_status: 'Completed',
            date: 'date object',
            user_id: 'user_object_id',
            restaurant: 'Panda Express',
            restuarant_name: 'restaurant_name',
            item: [{ name: '1 Entre and 2 Side', price: 12.99,qty:1, cuisine: 'Chinese', restuarant: 'Panda Express' }], 
            total:12.99
        }
    ]
    
    //previous orders will have a timer function for a word that will chnage the states
    // approxiamlety by atime given of restuarant
    //if stat eis ready for pick up i will then show a button as well in the object 
    for (let index = 0; index < orderTemplate.length; index++) {
        let orderItem={
            id:orderTemplate[index].order_number,
            name : orderTemplate[index].restaurant,
            items:orderTemplate[index].item,
            total:orderTemplate[index].total,
            status: orderTemplate[index].order_status
        }
        if ( orderTemplate[index].order_status=== "Completed") {
            displayCompleted.push(<OrderItems type="Client" item={orderItem}></OrderItems>);
            } else {
                
                displayActive.push(<OrderItems type="Client"  item={orderItem} ></OrderItems>);
            }

        
        

    }
    const Main = styled.div`
    height:auto;

    position:relative;
    top:-19.5vw;
    padding:3vw;
   `
    return (
        <Main>
            <div>
            <h1 id="payH1">Active</h1>
                <br></br>
                {displayActive}

            </div>
            <br />
            <br />
            <br />
            <br />
            <div id="completed">
                <br></br>
                <h1 id="payH1">Completed</h1>
                {displayCompleted}
            </div>
        </Main>
    )
}

export default Orders