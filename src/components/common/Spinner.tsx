import React from 'react';
import '../../styles/spinner.css'; // Adjust the path according to your project structure

interface SpinnerProps {
  isLoading: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="overlay">
      <div className="spinner"></div>
    </div>
  );
};

export default Spinner;
