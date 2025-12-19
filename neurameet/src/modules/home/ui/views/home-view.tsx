"use client";

import { useState, useEffect } from 'react';

export const HomeView = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const letters = "NEURAMEET".split("");

  return (
    <div className="flex-1 flex items-center justify-center relative overflow-hidden bg-white">
      <div className="absolute top-20 left-20 w-64 h-64 bg-[#51B16A] rounded-full blur-3xl opacity-10 animate-float" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#093C23] rounded-full blur-3xl opacity-10 animate-float-delayed" />
      
      <div 
        className="relative z-10 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transform: `perspective(1000px) rotateX(${mousePosition.y * 0.5}deg) rotateY(${mousePosition.x * 0.5}deg)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <div className="flex flex-col items-center gap-8">
          <div className="flex gap-1 md:gap-2">
            {letters.map((letter, i) => (
              <span
                key={i}
                className="text-5xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#093C23] to-[#51B16A] drop-shadow-lg"
                style={{
                  animation: `letterPop 0.6s ease-out ${i * 0.1}s both`,
                  display: 'inline-block',
                  transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
                  transition: `transform 0.3s ease ${i * 0.03}s`
                }}
              >
                {letter}
              </span>
            ))}
          </div>

          <div 
            className="h-1 bg-gradient-to-r from-transparent via-[#093C23] to-transparent"
            style={{
              width: isHovered ? '100%' : '0%',
              transition: 'width 0.8s ease',
              boxShadow: '0 0 15px rgba(9, 60, 35, 0.5)'
            }}
          />

          <p 
            className="text-[#093C23] text-xl md:text-2xl tracking-[0.3em] font-light opacity-0"
            style={{
              animation: 'fadeIn 1s ease-out 1s forwards'
            }}
          >
            AI-POWERED MEETINGS
          </p>

          <div className="relative mt-8 animate-float">
            <svg 
              className="w-24 h-24 md:w-32 md:h-32 text-[#093C23] drop-shadow-xl" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="2" r="1" className="animate-pulse" />
              <line x1="12" y1="3" x2="12" y2="5" stroke="currentColor" strokeWidth="0.5" />
              
              <rect x="8" y="5" width="8" height="7" rx="1" />
              
              <circle cx="10" cy="8" r="1" fill="#51B16A" className="animate-pulse" />
              <circle cx="14" cy="8" r="1" fill="#51B16A" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
              
              <path d="M 10 10 Q 12 11 14 10" stroke="#51B16A" strokeWidth="0.5" fill="none" strokeLinecap="round" />
              
              <rect x="9" y="12" width="6" height="6" rx="1" />
              
              <rect x="10.5" y="14" width="3" height="2" rx="0.3" fill="#51B16A" opacity="0.4" />
              
              <rect x="6" y="13" width="2" height="4" rx="0.5" className="animate-wiggle" />
              <rect x="16" y="13" width="2" height="4" rx="0.5" className="animate-wiggle" style={{ animationDelay: '0.3s' }} />
              
              <rect x="9.5" y="18" width="2" height="3" rx="0.5" />
              <rect x="12.5" y="18" width="2" height="3" rx="0.5" />
              
              <ellipse cx="10.5" cy="21" rx="1.2" ry="0.5" />
              <ellipse cx="13.5" cy="21" rx="1.2" ry="0.5" />
            </svg>
            
            <div className="absolute inset-0 bg-[#093C23] rounded-full blur-2xl opacity-20 -z-10 scale-150 animate-pulse" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes letterPop {
          0% {
            opacity: 0;
            transform: scale(0) rotateY(180deg);
          }
          50% {
            transform: scale(1.2) rotateY(0deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotateY(0deg);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes grid-flow {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(30px, -30px) scale(1.1);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-30px, 30px) scale(1.05);
          }
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }

        @keyframes wiggle {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-5deg);
          }
          75% {
            transform: rotate(5deg);
          }
        }

        .animate-wiggle {
          animation: wiggle 2s ease-in-out infinite;
          transform-origin: center;
        }
      `}</style>
    </div>
  );
};