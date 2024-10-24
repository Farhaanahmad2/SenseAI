import React, { useState, useEffect } from "react";
import './TypingEffect.css'; // CSS for styling (optional)

const TypingEffect = ({ texts, speed = 100, pauseDuration = 1000 }) => {
  const [displayedText, setDisplayedText] = useState("");  // Text to display
  const [isDeleting, setIsDeleting] = useState(false);     // Whether the text is being deleted
  const [textIndex, setTextIndex] = useState(0);           // Index to track which text to type
  
  const [charIndex, setCharIndex] = useState(0);           // Character index for typing/deleting
  const [pause, setPause] = useState(false);               // Pause between typing/deleting
  const [cycles, setCycles] = useState(0);                 // Count the number of completed cycles

  useEffect(() => {
    // Stop after typing the second text
    if (cycles >= 2 && textIndex === 1) return;

    if (pause) {
      const pauseTimeout = setTimeout(() => setPause(false), pauseDuration);
      
      return () => clearTimeout(pauseTimeout);
    }

    const intervalId = setInterval(() => {
      if (!pause) {
        const currentText = texts[textIndex];

        if (!isDeleting) {
          // Typing effect (forward)
          if (charIndex < currentText.length) {
            setDisplayedText((prev) => prev + currentText.charAt(charIndex));

            setCharIndex(charIndex + 1);
          } else if (textIndex === 0) {
            // Only delete if it's the first text
            setIsDeleting(true);  // Start deleting after typing is complete

            setPause(true);       // Pause before starting deletion
          } else {
            // For second text, just finish typing and stop

            setPause(true); 

            setCycles(2);  // Stop after second text is typed
          }
        } else {
          // Deleting effect (backward) for the first text only
          if (charIndex > 0) {
            setDisplayedText((prev) => prev.slice(0, -1));
            setCharIndex(charIndex - 1);
          } else {
            // Start typing second text after deletion
            setIsDeleting(false);

            setPause(true);     

            setTextIndex((prevIndex) => prevIndex + 1); // Move to second text

            setCycles(cycles + 1);  // Increment cycle count after finishing typing+deleting
          }
        }
      }
    }, speed);





    return () => clearInterval(intervalId); // Clean up on unmount
  }, [texts, charIndex, isDeleting, pause, textIndex, cycles, pauseDuration, speed]);

  return (
    <h1 className="typing-effect ">
     
     <b className="fs-4">
      {displayedText && (
        <>    
          {displayedText.split(' ').length >= 1 ? (
            <>
              <span>{displayedText.substring(0, displayedText.lastIndexOf(' '))}</span> 

              <span style={{ color: '#31D2F2' }}> {displayedText.split(' ').slice(-1)}</span>
            </>
          ) : (
            <span>{displayedText}</span>  
          )}
        </>
      )}
    </b>
      <span className="cursor"></span> {/* Blinking cursor */}
    </h1>
  );
};

export default TypingEffect;














