import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedUser, logOutUser ,} from "../../Actions/UserActions.jsx";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, loading, error } = useSelector(
    (state) => state.currentLoggedUser
  );
  const dispatch = useDispatch();

  const data = [
    {
      name: "Orders",
      path: "/me/orders",
    },
    {
      name: "Logout",
      path: "/logout",
    },
    {
      name: "my Account",
      path: "/myaccount",
    },
    {
      name: "cart",
      path: "/me/cart",
    },
  ];

  

  useEffect(() => {
    dispatch(getLoggedUser());
  }, []);
  return (
    <div>
      {data.map((ele, index) => (
        <div key={index}>
          <Link to={ele.path}>{ele.name}</Link>
        </div>
      ))}
      <button onClick={()=>dispatch(logOutUser())}>Log Out</button>
    </div>
  );
};

export default Profile;
