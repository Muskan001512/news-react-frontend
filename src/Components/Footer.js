import React from 'react';
import logo from '../img/core-img/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPinterest, faFacebook, faTwitter, faDribbble, faBehance, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <>
      <footer className="footer-area">
        {/* Footer Logo */}
        <div className="footer-logo mb-100">
          <a href="index.html">
            <img src={logo} alt="" />
          </a>
        </div>
        {/* Footer Content */}
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="footer-content text-center">
                {/* Footer Nav */}
                <div className="footer-nav">
                  <ul>
                    <li>
                      <a href="#">Contact Us</a>
                    </li>
                    <li>
                      <a href="#">Closed Captioning</a>
                    </li>
                    <li>
                      <a href="#">Site Map</a>
                    </li>
                  </ul>
                </div>
                {/* Social Info */}
                <div className="footer-social-info">
                  <a href="#" data-toggle="tooltip" data-placement="top" title="pinterest">
                    <FontAwesomeIcon icon={faPinterest} />
                  </a>
                  <a href="#" data-toggle="tooltip" data-placement="top" title="facebook">
                    <FontAwesomeIcon icon={faFacebook} />
                  </a>
                  <a href="#" data-toggle="tooltip" data-placement="top" title="twitter">
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                  <a href="#" data-toggle="tooltip" data-placement="top" title="dribbble">
                    <FontAwesomeIcon icon={faDribbble} />
                  </a>
                  <a href="#" data-toggle="tooltip" data-placement="top" title="behance">
                    <FontAwesomeIcon icon={faBehance} />
                  </a>
                  <a href="#" data-toggle="tooltip" data-placement="top" title="linkedin">
                    <FontAwesomeIcon icon={faLinkedin} />
                  </a>
                </div>

                <p className="mb-15">
                  Nullam lacinia ex eleifend orci porttitor, suscipit interdum augue condimentum. Etiam pretium turpis
                  eget nibh laoreet iaculis. Proin ac urna at lectus volutpat lobortis. Vestibulum venenatis iaculis
                  diam vitae lobortis. Donec tincidunt viverra elit, sed consectetur est pr etium ac. Mauris nec mauris
                  tellus.
                </p>

                <p className="copywrite-text">
                  <a href="#">
                    Copyright &copy;
                    <script>document.write(new Date().getFullYear());</script> All rights reserved | This template is
                    made with 
                    
                    <a href="https://colorlib.com" target="_blank" rel="noopener noreferrer">
                      Colorlib
                    </a>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
