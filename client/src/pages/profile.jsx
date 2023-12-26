import React from 'react'
import { useUserContext } from "../context/userContext";

const Profile = () => {
    const { currentUser } = useUserContext();
console.log(currentUser)
  return (
    <div style={{ backgroundColor: "white" }}>
      {currentUser.fullname}
      {currentUser.age}
      {currentUser.role}
      {currentUser.email}
      {currentUser._id}
    </div>
  )
}

export default Profile
