import React from 'react';
import { motion } from 'framer-motion';
import { TimelineStage } from '../types';

interface ProgressIndicatorProps {
  stages: TimelineStage[];
  activeStage: number;
  className?: string;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ stages, activeStage, className }) => {
  const progressPercentage = ((activeStage + 1) / stages.length) * 100;

  return (
    <div className={`relative ${className}`}>
      {/* Main progress bar */}
      <div className="relative h-1 bg-white/20 rounded-full overflow-hidden">
        {/* Animated progress fill */}
        <motion.div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-aqua-400 via-marine-400 to-aqua-300 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ 
            duration: 1.2, 
            ease: "easeOut",
            type: "spring",
            stiffness: 100
          }}
        >
          {/* Glowing effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-aqua-200 to-marine-200 rounded-full opacity-60"
            animate={{
              opacity: [0.4, 0.8, 0.4],
              filter: [
                "blur(0px) brightness(1)",
                "blur(2px) brightness(1.2)", 
                "blur(0px) brightness(1)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Flowing particles along the progress bar */}
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2"
          animate={{
            left: `${progressPercentage}%`,
            x: '-50%'
          }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-aqua-200 rounded-full"
              animate={{
                x: [-8, 8, -8],
                y: [-4, 4, -4],
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Stage indicators */}
      <div className="flex justify-between mt-6">
        {stages.map((stage, index) => {
          const isActive = index === activeStage;
          const isCompleted = index < activeStage;
          const isUpcoming = index > activeStage;

          return (
            <motion.div
              key={stage.id}
              className="flex flex-col items-center relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Stage circle */}
              <motion.div
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center relative z-10 ${
                  isCompleted 
                    ? 'bg-aqua-500 border-aqua-400 text-white' 
                    : isActive
                    ? 'bg-white border-aqua-400 text-marine-600'
                    : 'bg-white/20 border-white/40 text-white/60'
                }`}
                animate={{
                  scale: isActive ? [1, 1.2, 1] : 1,
                  boxShadow: isActive 
                    ? [
                        "0 0 0px rgba(56, 189, 248, 0)",
                        "0 0 20px rgba(56, 189, 248, 0.6)",
                        "0 0 10px rgba(56, 189, 248, 0.4)"
                      ]
                    : isCompleted
                    ? "0 0 10px rgba(56, 189, 248, 0.3)"
                    : "0 0 0px rgba(56, 189, 248, 0)"
                }}
                transition={{ 
                  duration: isActive ? 2 : 0.5,
                  repeat: isActive ? Infinity : 0 
                }}
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 0 15px rgba(56, 189, 248, 0.5)"
                }}
              >
                {isCompleted ? (
                  <motion.svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 200, 
                      delay: 0.2 
                    }}
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </motion.svg>
                ) : (
                  <motion.span 
                    className="text-sm font-bold"
                    animate={{
                      color: isActive ? '#075985' : isUpcoming ? 'rgba(255,255,255,0.6)' : '#ffffff'
                    }}
                  >
                    {index + 1}
                  </motion.span>
                )}

                {/* Active stage pulse */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-aqua-300"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.8, 0.3, 0.8]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.div>

              {/* Stage label */}
              <motion.div
                className="mt-3 text-center max-w-20"
                animate={{
                  color: isCompleted ? '#38bdf8' : isActive ? '#ffffff' : 'rgba(255,255,255,0.6)'
                }}
              >
                <motion.div
                  className="text-lg mb-1"
                  animate={{
                    scale: isActive ? [1, 1.1, 1] : 1
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: isActive ? Infinity : 0 
                  }}
                >
                  {stage.icon}
                </motion.div>
                
                <motion.p 
                  className="text-xs font-medium leading-tight"
                  animate={{
                    fontWeight: isActive ? 600 : 400
                  }}
                >
                  {stage.title}
                </motion.p>
                
                <motion.p 
                  className="text-xs opacity-80 mt-1"
                  animate={{
                    opacity: isActive ? 1 : 0.6
                  }}
                >
                  {stage.duration}
                </motion.p>
              </motion.div>

              {/* Connection line to next stage */}
              {index < stages.length - 1 && (
                <motion.div
                  className="absolute top-4 left-8 w-16 h-0.5 bg-white/20"
                  animate={{
                    backgroundColor: index < activeStage 
                      ? 'rgba(56, 189, 248, 0.6)' 
                      : 'rgba(255, 255, 255, 0.2)'
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Animated progress along connection line */}
                  {index < activeStage && (
                    <motion.div
                      className="absolute inset-0 bg-aqua-400"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ 
                        duration: 0.8, 
                        delay: index * 0.2,
                        ease: "easeOut" 
                      }}
                      style={{ transformOrigin: 'left center' }}
                    />
                  )}
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Progress stats */}
      <motion.div
        className="mt-8 glass-morphism p-4 rounded-xl text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex justify-center items-center space-x-6 text-sm">
          <motion.div
            animate={{ color: activeStage >= 0 ? '#38bdf8' : '#ffffff' }}
          >
            <span className="font-semibold">{activeStage + 1}</span>
            <span className="text-white/60 ml-1">/ {stages.length} Stages</span>
          </motion.div>
          
          <div className="w-px h-4 bg-white/30" />
          
          <motion.div
            animate={{ color: progressPercentage > 50 ? '#22c55e' : '#ffffff' }}
          >
            <span className="font-semibold">{Math.round(progressPercentage)}%</span>
            <span className="text-white/60 ml-1">Complete</span>
          </motion.div>
        </div>

        {/* Mini progress bar */}
        <div className="mt-3 h-1 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-aqua-400 to-green-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default ProgressIndicator;