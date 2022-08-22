import React from 'react'
import RestItems from '../client/restItems'

const DishView = () => {
    let Dish ={
        name:'Pasta',
        price:12.99,
        cuisine:'Italian',
        restInv:[

            {id:'itemid1',
              name:"Cheese Slices", qty:2,
              },  {id:'itemid2',
              name:"Potato Buns",
              qty:2
              }
      
          ]
    }
  return (
    <RestItems menuItem={Dish}></RestItems>
  )
}

export default DishView