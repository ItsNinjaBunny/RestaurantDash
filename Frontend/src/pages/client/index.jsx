import React from 'react'
import Navbar from '../../components/Navbar';

const Client = () => {
  var req =  new URLSearchParams(window.location.search).get('type');
  //get all items 
  
  return (
    <>
    <Navbar></Navbar>
    <div>
        client
    </div>
    </>
    
  )
}

export default Client