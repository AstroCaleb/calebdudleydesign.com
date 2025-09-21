import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer>
      <div className="footer-inner">
        <p>Copyright &copy; {new Date().getFullYear()} Caleb Dudley Design.</p>
        <p>All Rights Reserved.</p>
      </div>
    </footer>
  );
};
