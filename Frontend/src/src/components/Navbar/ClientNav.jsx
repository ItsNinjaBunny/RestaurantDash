import React ,{useState}from 'react'
import { FaUserLock } from 'react-icons/fa'
import styled from 'styled-components'
import { BoldLink, User } from '../../pages/Login/LoginElements'
const CLientDiv = styled.div`
    text-align:center;
`
const ClientNav = () => {
  const [active, setActive] = useState("");
    var req =  window.location.href;
   if(req.includes("/client?type=businessclient")){
    setTimeout(() => {
        setActive("business");
      }, 400);
   }
   else if(req.includes("/client?type=client")  ){
    setTimeout(() => {
        setActive("client");
      }, 400);
   }
  return (
    <>
    
    <h1 style={{position: 'absolute',left:80+'%',top:25+'%'}} >UserName</h1>
    {active==="business" &&  <FaUserLock style={{position: 'absolute',left:90+'%',top:20+'%', fontSize:3+'rem'}}></FaUserLock>}
    {active==="business"&& <BoldLink href="http://localhost:5000/business?type=business">Business View</BoldLink>}
    {active ==="client" && <User style={{position: 'absolute',left:90+'%',top:23+'%', fontSize:2.8+'rem'}}></User> }
   
    </>
    
    
  )
}

export default ClientNav