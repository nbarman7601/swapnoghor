import React, { useEffect, useState } from 'react';

const CurrencyFormatter = ({ amount }) => {
  const [displayAmount, setDisplayAmount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1000; // Duration of the animation in milliseconds (1 second)
    const startTime = performance.now();

    const animateAmount = (currentTime) => {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1); // Ensure progress doesn't exceed 1
      const updatedAmount = Math.floor(progress * amount);

      setDisplayAmount(updatedAmount);

      if (progress < 1) {
        requestAnimationFrame(animateAmount);
      }
    };

    requestAnimationFrame(animateAmount);
  }, [amount]);

  return (
    <span>
      {displayAmount.toLocaleString('en-US', {
        style: 'currency',
        currency: 'INR',
      })}
    </span>
  );
};

export default CurrencyFormatter;
