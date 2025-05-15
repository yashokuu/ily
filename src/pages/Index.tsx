
import React from 'react';
import Character from '@/components/Character';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 via-pink-50 to-love-light">
      <div className="text-center max-w-md px-4">
        <h1 className="text-4xl font-bold mb-6 text-love-dark animate-fade-up opacity-0" style={{ animationDelay: '0.2s' }}>
          Hey There!
        </h1>
        <Character className="my-8 animate-pop opacity-0" />
        <p className="text-xl text-gray-600 animate-fade-up opacity-0" style={{ animationDelay: '0.5s' }}>
          Click on me to see what I have to say
        </p>
      </div>
    </div>
  );
};

export default Index;
