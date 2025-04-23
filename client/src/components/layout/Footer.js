import React from 'react';

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-light">
      <div className="container text-center">
        <span className="text-muted">
          &copy; {new Date().getFullYear()} Health & Fitness Tracker
        </span>
      </div>
    </footer>
  );
};

export default Footer;