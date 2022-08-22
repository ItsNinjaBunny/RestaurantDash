import React from 'react'
import RestTypeCard from './restTypeCard';

function RestType(props) {
   //fetches forth how many by type then return a list of object then i slap then into it
   const displayData=[]
   const dummyData = [
    {
      name:'Panda Express',
      type:'Chinese',
      link:'https://cblproperty.blob.core.windows.net/production/assets/blt2cdb66fcae2f05ae-1004px-Panda_Express.svg.png'
    },
    {
      name:'Chinese Wall Buffet',
      type:'Chinese'
    },
    {
      name:'Fried Rice Express',
      type:'Chinese'
    },
    {
      name:'Jiro Chinese Cuisine',
      type:'Chinese'
    },
   ]
    //reccieve names of resturants and bukld cards for all resturants link to the clicked type
   for (let index = 0; index < dummyData.length; index++) {
    const element = dummyData[index];
    console.log(element)
    displayData.push(<RestTypeCard rest={element} createRestuarants={props.createRestuarants}></RestTypeCard>);
   }
   
   
  return (
    <>
    <button onClick={()=>props.handleBackLanding()}>back to landing</button>
    {displayData}
    </>
    
  )
}

export default RestType