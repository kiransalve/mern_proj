import React from "react";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const { user } = useSelector((state) => state.user);

  return <div>UserProfile</div>;
};

export default UserProfile;
