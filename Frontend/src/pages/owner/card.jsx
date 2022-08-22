import React from 'react'

function Card(props) {
    const dragStart = e => {
        const target = e.target;
        var j = JSON.stringify(props.item);
        e.dataTransfer.setData('item', j);
        
        setTimeout(()=>{
          
        },0);
    }
    const dragOver = e =>{
        e.stopPropagation();
    }

  return (
    <div id={props.item.id}
    draggable={props.draggable}
    className={props.className}
    onDragStart={dragStart}
    onDragOver={dragOver}>
      {props.children}
      <h1> {props.item.name}</h1>

    </div>
  )
}

export default Card