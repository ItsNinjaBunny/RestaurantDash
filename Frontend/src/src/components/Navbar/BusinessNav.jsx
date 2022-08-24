import React from 'react'
import { FaUserLock } from 'react-icons/fa'
import { BoldLink, User } from '../../pages/Login/LoginElements'
import { H1 } from './NavbarElements'

const BusinessNav = () => {
  return (
  < >
  <div  style={{position: 'absolute',left:80+'%',top:25+'%'} }>

  </div>
  <h1 style={{position: 'absolute',left:80+'%',top:25+'%'}} >UserName</h1>
  <FaUserLock style={{position: 'absolute',left:90+'%',top:20+'%', fontSize:3+'rem'}}></FaUserLock>
  <BoldLink href="http://localhost:5000/client?type=businessclient">Client View</BoldLink>
  </>
   

    
  )
}

export default BusinessNav