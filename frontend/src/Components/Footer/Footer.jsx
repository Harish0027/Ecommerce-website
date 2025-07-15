import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  const socialLinks = [
    { label: "Discord", iconClass: "fa-brands fa-discord" },
    { label: "Instagram", iconClass: "fa-brands fa-instagram" },
    { label: "Twitter", iconClass: "fa-brands fa-twitter" },
    { label: "Facebook", iconClass: "fa-brands fa-facebook" },
  ];

  return (
    <footer className="footer">
      {/* UPPER SECTION */}
      <div className="footer-upper">
        {/* Logo and Description */}
        <div className="footer-logo-section">
          <img src="/logo.svg" alt="footer-logo" />
          <div className="footer-logo-text">
            <p>Ecommerce © 2025</p>
            <p>All rights reserved.</p>
          </div>
        </div>

        {/* Footer Links */}
        {[
          {
            title: "About",
            links: ["How it works", "Featured", "Partnership", "Business Relation"],
          },
          {
            title: "Company",
            links: ["Events", "Blogs", "Podcast", "Invite a Friend"],
          },
        ].map((section, index) => (
          <div key={index} className="footer-links-section">
            <p>{section.title}</p>
            <ul>
              {section.links.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact Section */}
        <div className="footer-links-section">
          <p>Contact</p>
          <ul>
            <li>Email: support@ecommerce.com</li>
            <li>Phone: +91 9876543210</li>
          </ul>
        </div>

        {/* Social Icons Section */}
        <div className="footer-links-section">
          <p>Socials</p>
          <ul>
            {socialLinks.map((item, index) => (
              <li key={index}>
                <i className={item.iconClass} style={{ marginRight: "8px" }}></i>
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* LOWER SECTION */}
      <div className="footer-lower">
        <div>@2025 Ecommerce. All Rights Reserved.</div>
        <div className="footer-lower-links">
          <Link to="/policy">Policy & Privacy</Link>
          <Link to="/terms">Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
