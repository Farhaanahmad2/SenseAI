import React, { useState, useEffect } from 'react';
import ReactMarkDown from 'react-markdown';

const TypingEffectMarkDown = ({ searchresult }) => {
  const [displayedText, setDisplayedText] = useState(''); // Initial empty state
  const typingSpeed = 50; // Typing speed in milliseconds

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + searchresult.charAt(index));
      index++;

      if (index === searchresult.length) {
        clearInterval(interval); // Stop once the text is fully typed
      }
    }, typingSpeed);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [searchresult]);

  return (
    <div className="typing-effect">
      <ReactMarkDown className="m-3">{displayedText}</ReactMarkDown>
    </div>
  );
};

export default TypingEffectMarkDown;
