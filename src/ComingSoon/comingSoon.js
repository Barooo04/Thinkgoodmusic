import React from 'react'
import './comingSoon.css'
import { useNavigate } from 'react-router-dom'
import ScrittaBianca from '../LoghiTGM/ScrittaBianca2.png'

function ComingSoon() {

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  }

  return (
    <div className="main-container">
      <div class="container">
          <div class="flashing-border">
              <img onClick={handleLogin} src={ScrittaBianca} alt="thingood-logo" class="logo"/>
          </div>
          <div className="work-in-progress">WORK IN PROGRESS...</div>
      </div>
      <div className="footer">
        <hr className='custom-divider'></hr>
        <div className="footer-divider-container">
            <p className="mini-footer-text">Thinkgood Srls - Via Lanzone 25 Milano 20123 - P.IVA 12414860960</p>
            <div className="mobile-footer-text-container">
              <p className="mini-footer-text-mobile">Thinkgood Srls</p>
              <p className="mini-footer-text-mobile">Via Lanzone 25 Milano 20123</p>
              <p className="mini-footer-text-mobile">P.IVA 12414860960</p>
            </div>
            <div className="contact-box">
                <i className="footer-icon fas fa-phone"></i>
                <a className="mini-footer-text-a" id="contact-margin-right" href="tel:3472988931">3472988931</a>
                <i className="footer-icon fas fa-envelope"></i>
                <a className="mini-footer-text-a" id="contact-margin-right" href="mailto:amministrazione@thinkgoodmusic.com">amministrazione@thinkgoodmusic.com</a>
                <i className="footer-icon fas fa-shield-alt"></i>
                <a className="mini-footer-text-a" id="contact-margin-right" href="mailto:thinkgood@pec.it">thinkgood@pec.it</a>
            </div>
        </div>
    </div>
    </div>

  )
}

export default ComingSoon