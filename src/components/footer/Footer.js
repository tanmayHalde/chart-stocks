import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <div className="row footer navbar-bottom">
      <footer>
        <div className="source">
          <a href="https://github.com/tanmayHalde/chart-stocks" target="_blank">
            <img 
              src={require('../../images/github-mark-sm.png')}
              alt="github-mark"
            />
          </a>
        </div>
        <div className="signature">
          @tanmayHalde
        </div>

      </footer>
    </div>
  );
};

export default Footer;