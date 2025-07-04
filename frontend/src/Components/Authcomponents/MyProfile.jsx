import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Metadata from "../Header/MetaData";
import "./Profile.css";

const MyProfile = () => {
  const { currentLoginUser, isAuthenticated } = useSelector(
    (state) => state.currentLoggedUser
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) navigate("/login");
  }, [navigate, isAuthenticated]);

  return (
    <Fragment>
      <Metadata title={`${currentLoginUser.name}'s Profile`} />
      <div className="profileContainer">
        {/* Left Section */}
        <div className="leftSection">
          <h1>My Profile</h1>
          <img src={currentLoginUser.avatar.url} alt={currentLoginUser.name} />
          <Link to="/me/update">Edit Profile</Link>
        </div>

        {/* Right Section */}
        <div className="rightSection">
          <div className="profileDetails">
            <h4>Full Name</h4>
            <p>{currentLoginUser.name}</p>

            <h4>Email</h4>
            <p>{currentLoginUser.email}</p>

            <h4>Joined On</h4>
            <p>{String(currentLoginUser.createdAt).slice(0, 10)}</p>
          </div>

          <div className="profileActions">
            <Link to="/orders">My Orders</Link>
            <Link to="/me/updatePass">Change Password also</Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default MyProfile;
