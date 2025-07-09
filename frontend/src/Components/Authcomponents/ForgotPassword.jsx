import React, { Fragment, useState, useEffect } from "react";
import "./ForgotPassword.css";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../Header/MetaData";
import { forgotUserPassword } from "../../Actions/UserActions.JSX";
import { toast } from "react-toastify";
import Loading from "../../Loader/Loading";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotUserPassword({email}));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    if (message) {
      toast.success(message);
    }
  }, [dispatch, error, message]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <MetaData title="Forgot Password" />
          <div className="forgotProfileContainer">
            <div className="forgotProfileBox">
              <h2 className="forgotProfileHeading">Forgot Password</h2>

              <form
                className="forgotProfileForm"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="forgotProfileEmail">
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Send"
                  className="forgotProfileBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </>
  );
};

export default ForgotPassword;
