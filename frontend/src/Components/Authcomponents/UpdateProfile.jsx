import React, { Fragment, useEffect, useState } from "react";
import "./UpdateProfile.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../Actions/UserActions.jsx";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.currentLoggedUser);
  const { error, isUpdated, loading } = useSelector((state) => state.updateUser);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar?.url || "/Profile.png");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar?.url || "/Profile.png");
    }

    if (error) {
      alert(error);
    }

    
  }, [dispatch, error, isUpdated, navigate, user]);

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      avatar, // base64
    };

    dispatch(updateUser(userData));
    if (isUpdated) {
      navigate("/account");
    }
  };

  const updateDataChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setAvatarPreview(reader.result); // for preview
        setAvatar(reader.result);        // for dispatch
      };
    }
  };

  return (
    <Fragment>
      <div className="updateProfileContainer">
        <form className="updateProfileForm" onSubmit={updateProfileSubmit}>
          <h2>Update Profile</h2>

          <input
            type="text"
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="updateImage">
            <img src={avatarPreview} alt="Avatar Preview" />
            <input type="file" name="avatar" accept="image/*" onChange={updateDataChange} />
          </div>

          <input type="submit" value="Update" className="updateBtn" disabled={loading} />
        </form>
      </div>
    </Fragment>
  );
};

export default UpdateProfile;
