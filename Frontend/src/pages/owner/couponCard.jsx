import React from 'react'

function CouponCard(props) {
    const dragStart = e => {
        const target = e.target;
        e.dataTransfer.setData('card_id', target.id);
        var j = JSON.stringify(props.item);
        e.dataTransfer.setData("qty", j);
        
        //e.dataTransfer.setData('qty', props.item);
        setTimeout(()=>{
          
        },0);
    }
    const dragOver = e =>{
        e.stopPropagation();

    }

  return (
    <div item={props.item} id={props.id}
    
    draggable={props.draggable}
    className={props.className}
    onDragStart={dragStart}
    onDragOver={dragOver}>
      {props.children}
      
    </div>
  )
}

export default CouponCard