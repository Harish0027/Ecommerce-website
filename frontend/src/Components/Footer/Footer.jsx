import React from "react";
import './Footer.css';

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and los phone</p>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWKUT7vtUsgnXCzhEtcMkWY7AuMuSJbYTd6g&s" />
      </div>

      <div className="midFooter">
        <h1>ECOMMERCE.</h1>
        <p>High Quality is our first priority</p>
        <p>Copyrights 2021 &copy; MeAbhiSingh</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="http://instagram.com/meabhisingh">Instagram</a>
        <a href="http://youtube.com/meabhisingh">Youtube</a>
        <a href="http://facebook.com/meabhisingh">Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;
