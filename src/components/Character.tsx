
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface CharacterProps {
  className?: string;
}

const Character = ({ className }: CharacterProps) => {
  const [isWaving, setIsWaving] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  
  const messages = [
    { title: "Hi", subtitle: "Baby 💜" },
    { title: "I wanna say something", subtitle: "very important 💖" },
    { title: "You are cute", subtitle: "Ngl ✨" },
    { title: "You so so adorable", subtitle: "like an angel 💫" },
    { title: "You are mineee <3", subtitle: "Just accept 💝" },
    { title: "I love you", subtitle: "Roohi 💕" },
    { title: "I love you so much", subtitle: "Princess 💞" }
  ];
  
  // Handle blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 300);
    }, 3000);
    
    return () => clearInterval(blinkInterval);
  }, []);
  
  const handleCharacterClick = () => {
    // If we're already showing a message, just update it without animations
    if (showMessage) {
      // Get next message index without repeating the current one
      const nextMessageIndex = (currentMessage + 1) % messages.length;
      setCurrentMessage(nextMessageIndex);
      return;
    }
    
    setIsWaving(true);
    setShowHearts(true);
    setShowMessage(true);
    
    // Start with the first message (index 0) when first clicked
    setCurrentMessage(0);
    
    // Reset wave and heart animations after delay
    setTimeout(() => {
      setIsWaving(false);
      setShowHearts(false);
    }, 3000);
  };

  return (
    <div className={cn("relative flex flex-col items-center", className)}>
      {/* Character container */}
      <motion.div 
        className="cursor-pointer relative"
        onClick={handleCharacterClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Main Character */}
        <div className={cn(
          "w-64 h-64 bg-love-light rounded-full flex items-center justify-center",
          "relative shadow-lg border-4 border-white",
          isWaving ? "animate-wave" : "animate-float"
        )}>
          {/* Face */}
          <div className="relative">
            {/* Eyes */}
            <div className="flex space-x-12 mb-2">
              <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                <div className={cn(
                  "w-2 h-2 bg-white rounded-full relative top-0 left-1",
                  isBlinking ? "h-0.5" : ""
                )}></div>
              </div>
              <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                <div className={cn(
                  "w-2 h-2 bg-white rounded-full relative top-0 left-1",
                  isBlinking ? "h-0.5" : ""
                )}></div>
              </div>
            </div>
            
            {/* Smile */}
            <div className="w-16 h-10 mx-auto mt-4 border-b-4 border-black rounded-full"></div>
            
            {/* Blush */}
            <div className="flex justify-between w-40 mt-1">
              <div className="w-8 h-4 bg-love-accent rounded-full opacity-60"></div>
              <div className="w-8 h-4 bg-love-accent rounded-full opacity-60"></div>
            </div>
          </div>
        </div>
        
        {/* Hand */}
        <div className={cn(
          "absolute bottom-8 -right-4 w-12 h-16 bg-love-light rounded-full",
          "border-2 border-white transform origin-bottom",
          isWaving ? "animate-wave" : ""
        )}></div>
      </motion.div>
      
      {/* Floating hearts */}
      {showHearts && (
        <div className="absolute top-0 w-full h-full pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ 
                scale: 0, 
                opacity: 0,
                x: Math.random() * 100 - 50, 
                y: Math.random() * 20 + 30 
              }}
              animate={{ 
                scale: [0, 1, 0.8], 
                opacity: [0, 1, 0],
                y: [30, -30 - (i * 15)],
                x: [(Math.random() * 100 - 50), (Math.random() * 140 - 70)]
              }}
              transition={{ 
                duration: 2 + (i * 0.3), 
                ease: "easeOut",
                delay: i * 0.1
              }}
            >
              <div className={`w-${i % 3 === 0 ? 10 : 8} h-${i % 3 === 0 ? 10 : 8} text-love-primary`}>
                <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Message */}
      {showMessage && (
        <motion.div 
          className="mt-8 bg-white rounded-xl px-8 py-4 shadow-lg border-2 border-love-secondary"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          key={currentMessage} // Add key to force re-render on message change
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-love-dark mb-1">{messages[currentMessage].title}</h2>
          <p className="text-gray-500">{messages[currentMessage].subtitle}</p>
        </motion.div>
      )}
    </div>
  );
};

export default Character;
