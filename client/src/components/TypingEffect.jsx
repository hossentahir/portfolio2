import { useState, useEffect } from 'react';

const roles = [
  'Software Engineer',
  'Web Developer',
  'JavaScript Developer'
];

export const TypingEffect = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullWord = roles[roleIndex];
    let timeout;

    if (!isDeleting) {
      // Typing phase: ~80ms per character
      if (displayedText.length < currentFullWord.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentFullWord.slice(0, displayedText.length + 1));
        }, 80);
      } else {
        // Pause ~1500ms after full word is typed
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 1500);
      }
    } else {
      // Deleting phase: ~40ms per character
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(currentFullWord.slice(0, displayedText.length - 1));
        }, 40);
      } else {
        // Move to next role in array
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, roleIndex]);

  return (
    <span className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-bold">
      <span>{displayedText}</span>
      <span className="ml-1 text-indigo-500 animate-pulse font-mono font-bold">|</span>
    </span>
  );
};
