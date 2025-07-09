import React, { Fragment, useState, useEffect } from "react";
import "./UpdatePassword.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserPassword } from "../../Actions/UserActions.JSX";
import { UPDATE_PASSWORD_RESET } from "../../Constants/UserConstants";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, isUpdated, loading } = useSelector(
    (state) => state.updateUser
  );

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (error) {
      alert(error);
    }

    if (isUpdated) {
      navigate("/account");
      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [dispatch, error, isUpdated, navigate]);

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const userData = {
      oldPassword,
      newPassword,
      confirmPassword,
    };

    dispatch(updateUserPassword(userData));
  };

  return (
    <Fragment>
      <div className="updatePasswordContainer">
        <form className="updatePasswordForm" onSubmit={updatePasswordSubmit}>
          <h2>Update Password</h2>

          <input
            type="password"
            placeholder="Old Password"
            required
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="New Password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <input
            type="submit"
            value="Update Password"
            className="updateBtn"
            disabled={loading}
          />
        </form>
      </div>
    </Fragment>
  );
};

export default UpdatePassword;
