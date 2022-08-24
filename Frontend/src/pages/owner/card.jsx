import React,{useState} from 'react'

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
   

    async function validation(e, x) {
      // this is the "context" for the function.  In this case
      // the element that changed.
      let obj = {
          name: x,
         stock: e.target.value*1
      }
      props.handlerIngredients(obj);
      if(obj.stock===0){
        setstate("");
      }else{
        setstate(obj.stock);
      }
      

  }
;
 
  const [state, setstate] = useState(props.item.stock)
 
  console.log(props.item.stock);
  return (
    <div id={props.item.id}
    draggable={props.draggable}
    className={props.className}
    onDragStart={dragStart}
    onDragOver={dragOver}>
      {props.children}
      <h1> {props.item.name}</h1>
      {props.edit==="yes"&&<input id={"input"+props.item.name} type="numbertext"  value={state} onChange={(e) => validation(e, props.item.name)}></input>}
    </div>
  )
}

export default Card