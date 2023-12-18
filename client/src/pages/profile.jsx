import React from 'react'
import { useUserContext } from "../context/userContext";

const Profile = () => {
    const { currentUser } = useUserContext();

  return (
    <div style={{ backgroundColor: "white" }}>
      {currentUser.fullname}
      {currentUser.age}
      {currentUser.role}
      {currentUser.email}
    </div>
  )
}

export default Profile
