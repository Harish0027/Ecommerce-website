import React, { useState, Fragment } from "react";
import "./Shipping.css";
import { Country, State } from "country-state-city";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_SHIPPING_INFO } from "../../Constants/CartConstants";
import CheckOutStep from "./CheckOutStep";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
  const { shippingInfo } = useSelector((state) => state.shipping);
  const usedispatch=useDispatch();
  const navigate=useNavigate();

  const [address, setAddress] = useState(shippingInfo.address || "");
  const [city, setCity] = useState(shippingInfo.city || "");
  const [pincode, setPincode] = useState(shippingInfo.pincode || "");
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo || "");
  const [country, setCountry] = useState(shippingInfo.country || "");
  const [state, setState] = useState(shippingInfo.state || "");

  const shippingSubmit = (e) => {
    e.preventDefault();

    // Placeholder: dispatch an action to store shipping info
    console.log({
      address,
      city,
      pincode,
      phoneNo,
      country,
      state,
    });
  };

  const handleSubmit=()=>{
      const shippingData={
        address,
      city,
      pincode,
      phoneNo,
      country,
      state,
      }

      usedispatch({type:SAVE_SHIPPING_INFO,payload:shippingData})
      navigate("/order/confirm")
  }

  return (
    <Fragment>
        <CheckOutStep activeStep={0} />
      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>

          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            {/* Address */}
            <div className="inputGroup">
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            {/* City */}
            <div className="inputGroup">
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            {/* Pincode */}
            <div className="inputGroup">
              <input
                type="text"
                placeholder="Pincode"
                required
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
            </div>

            {/* Phone Number */}
            <div className="inputGroup">
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </div>

            {/* Country */}
            <div className="inputGroup">
              <select
                required
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                  setState("");
                }}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* State (Only if Country is selected) */}
            {country && (
              <div className="inputGroup">
                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <button
              type="submit"
              className="shippingBtn"
              disabled={!state}
              onClick={handleSubmit}
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
