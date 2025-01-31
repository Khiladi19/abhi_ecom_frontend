import React, { useContext } from 'react'
import AppContext from '../../context/AppContext'
function Profile() {
  const {user} = useContext(AppContext)
  // console.log("user", user)
  
  return (
    <>
    <div className="container text-center my-5">
      <h2>welcome , {user?.name}</h2>
      <h3>{user?.email}</h3>
    </div>
    </>
  )
}

export default Profile