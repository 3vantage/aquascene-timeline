'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckIcon, 
  ArrowRightIcon, 
  ArrowLeftIcon,
  SparklesIcon,
  ShareIcon,
  BeakerIcon,
  CubeTransparentIcon
} from '@heroicons/react/24/outline';

interface QuizQuestion {
  id: string;
  question: string;
  options: {
    id: string;
    text: string;
    image: string;
    style: string[];
  }[];
}

interface QuizResult {
  style: string;
  title: string;
  description: string;
  characteristics: string[];
  recommendedPlants: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedCost: string;
  timeToComplete: string;
  gradient: string;
}

const AquascapingQuiz: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);

  const questions: QuizQuestion[] = [
    {
      id: 'experience',
      question: 'What\'s your aquascaping experience level?',
      options: [
        { id: 'beginner', text: 'Complete beginner', image: '🌱', style: ['nature', 'iwagumi', 'dutch'] },
        { id: 'some', text: 'I\'ve tried a few tanks', image: '🌿', style: ['nature', 'dutch', 'jungle'] },
        { id: 'experienced', text: 'Experienced hobbyist', image: '🍃', style: ['iwagumi', 'biotope', 'hardscape'] },
        { id: 'expert', text: 'Contest-level aquascaper', image: '🏆', style: ['nature', 'iwagumi', 'biotope'] }
      ]
    },
    {
      id: 'maintenance',
      question: 'How much time can you dedicate to maintenance?',
      options: [
        { id: 'minimal', text: 'Very little (30 min/week)', image: '⏰', style: ['iwagumi', 'hardscape'] },
        { id: 'moderate', text: 'Some time (1-2 hours/week)', image: '⏳', style: ['nature', 'biotope'] },
        { id: 'dedicated', text: 'I love maintenance (3+ hours/week)', image: '⏲️', style: ['dutch', 'jungle'] },
        { id: 'obsessed', text: 'It\'s my meditation', image: '🧘', style: ['dutch', 'nature'] }
      ]
    },
    {
      id: 'style_preference',
      question: 'Which aesthetic appeals to you most?',
      options: [
        { id: 'minimal', text: 'Clean, minimal, zen-like', image: '🎋', style: ['iwagumi'] },
        { id: 'lush', text: 'Lush jungle paradise', image: '🌺', style: ['jungle', 'dutch'] },
        { id: 'natural', text: 'Natural landscape replica', image: '🏔️', style: ['nature', 'biotope'] },
        { id: 'structured', text: 'Organized, colorful garden', image: '🌈', style: ['dutch'] }
      ]
    },
    {
      id: 'budget',
      question: 'What\'s your budget range?',
      options: [
        { id: 'low', text: 'Budget-friendly ($100-300)', image: '💰', style: ['iwagumi', 'nature'] },
        { id: 'medium', text: 'Moderate investment ($300-800)', image: '💳', style: ['nature', 'biotope', 'jungle'] },
        { id: 'high', text: 'Premium setup ($800-2000)', image: '💎', style: ['dutch', 'nature'] },
        { id: 'unlimited', text: 'Money is no object', image: '🏆', style: ['dutch', 'nature', 'biotope'] }
      ]
    },
    {
      id: 'focus',
      question: 'What excites you most about aquascaping?',
      options: [
        { id: 'design', text: 'The artistic design process', image: '🎨', style: ['nature', 'iwagumi'] },
        { id: 'plants', text: 'Growing beautiful plants', image: '🌿', style: ['dutch', 'jungle'] },
        { id: 'ecosystem', text: 'Creating a living ecosystem', image: '🐟', style: ['biotope', 'nature'] },
        { id: 'challenge', text: 'Technical challenges', image: '⚗️', style: ['dutch', 'biotope'] }
      ]
    }
  ];

  const results: QuizResult[] = [
    {
      style: 'iwagumi',
      title: 'Iwagumi Style',
      description: 'You\'re drawn to minimalist beauty and zen-like tranquility. Iwagumi focuses on stone arrangements with simple carpeting plants.',
      characteristics: ['Minimalist design', 'Stone-focused hardscape', 'Simple plant palette', 'Peaceful aesthetic'],
      recommendedPlants: ['Dwarf Hairgrass', 'Monte Carlo', 'Glossostigma', 'Riccia Fluitans'],
      difficulty: 'Intermediate',
      estimatedCost: '$300-600',
      timeToComplete: '2-3 months',
      gradient: 'from-slate-600 to-stone-400'
    },
    {
      style: 'nature',
      title: 'Nature Aquarium',
      description: 'You love recreating natural landscapes underwater. This style balances hardscape and plants to mimic nature.',
      characteristics: ['Natural landscape recreation', 'Balanced composition', 'Diverse plant species', 'Dynamic hardscape'],
      recommendedPlants: ['Vallisneria', 'Cryptocoryne', 'Anubias', 'Java Fern', 'Rotala'],
      difficulty: 'Intermediate',
      estimatedCost: '$400-1000',
      timeToComplete: '3-6 months',
      gradient: 'from-green-600 to-emerald-400'
    },
    {
      style: 'dutch',
      title: 'Dutch Aquarium',
      description: 'You\'re passionate about plant cultivation and colorful displays. Dutch style is all about structured plant arrangements.',
      characteristics: ['Plant-focused design', 'Colorful arrangements', 'High maintenance', 'Structured layout'],
      recommendedPlants: ['Alternanthera Reineckii', 'Ludwigia', 'Cabomba', 'Limnophila', 'Hygrophila'],
      difficulty: 'Advanced',
      estimatedCost: '$600-1500',
      timeToComplete: '4-8 months',
      gradient: 'from-red-500 to-yellow-400'
    },
    {
      style: 'jungle',
      title: 'Jungle Style',
      description: 'You love wild, overgrown beauty. Jungle style embraces controlled chaos with lush, dense plantings.',
      characteristics: ['Dense plantings', 'Wild appearance', 'Fast-growing plants', 'Natural randomness'],
      recommendedPlants: ['Amazon Sword', 'Java Moss', 'Wisteria', 'Hornwort', 'Frogbit'],
      difficulty: 'Beginner',
      estimatedCost: '$200-500',
      timeToComplete: '2-4 months',
      gradient: 'from-green-800 to-lime-400'
    },
    {
      style: 'biotope',
      title: 'Biotope Aquarium',
      description: 'You\'re fascinated by authentic ecosystems. Biotope recreates specific natural habitats with scientific accuracy.',
      characteristics: ['Geographic authenticity', 'Species-specific fish', 'Natural behavior focus', 'Educational value'],
      recommendedPlants: ['Native species only', 'Region-specific plants', 'Echinodorus', 'Sagittaria'],
      difficulty: 'Advanced',
      estimatedCost: '$500-1200',
      timeToComplete: '6-12 months',
      gradient: 'from-blue-600 to-teal-400'
    },
    {
      style: 'hardscape',
      title: 'Hardscape Focused',
      description: 'You appreciate the beauty of rocks and wood. This style emphasizes dramatic hardscape with minimal plants.',
      characteristics: ['Dramatic rock/wood arrangements', 'Minimal plants', 'Strong visual impact', 'Lower maintenance'],
      recommendedPlants: ['Anubias', 'Java Fern', 'Moss species', 'Minimal carpeting'],
      difficulty: 'Intermediate',
      estimatedCost: '$300-800',
      timeToComplete: '1-3 months',
      gradient: 'from-stone-600 to-amber-600'
    }
  ];

  const calculateResult = (): QuizResult => {
    const styleScores: { [key: string]: number } = {};
    
    answers.forEach((answerId, questionIndex) => {
      const question = questions[questionIndex];
      const selectedOption = question.options.find(opt => opt.id === answerId);
      
      selectedOption?.style.forEach(style => {
        styleScores[style] = (styleScores[style] || 0) + 1;
      });
    });

    const topStyle = Object.entries(styleScores)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 'nature';
    
    return results.find(r => r.style === topStyle) || results[1];
  };

  const handleAnswer = (optionId: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionId;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const finalResult = calculateResult();
      setResult(finalResult);
      setShowResult(true);
    }
  };

  const goToPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setResult(null);
  };

  const shareResult = () => {
    if (result) {
      const text = `I just discovered my aquascaping style: ${result.title}! Find your style with AquaScene's quiz.`;
      if (navigator.share) {
        navigator.share({ text, url: window.location.origin });
      } else {
        navigator.clipboard.writeText(`${text} ${window.location.origin}`);
      }
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-gradient-to-br from-slate-900 via-blue-900 to-teal-900 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-8"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">What's Your Aquascaping Style?</h2>
                  <p className="text-cyan-200">Discover your perfect aquascape style in 5 questions</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
                >
                  ✕
                </button>
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-cyan-200">
                  <span>Question {currentQuestion + 1} of {questions.length}</span>
                  <span>{Math.round(progress)}% complete</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="text-center space-y-8">
                <motion.h3
                  key={currentQuestion}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl font-semibold text-white"
                >
                  {questions[currentQuestion].question}
                </motion.h3>

                {/* Options */}
                <div className="grid md:grid-cols-2 gap-4">
                  {questions[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={option.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleAnswer(option.id)}
                      className={`p-6 rounded-xl text-left transition-all duration-300 hover:scale-105 ${
                        answers[currentQuestion] === option.id
                          ? 'bg-emerald-500/20 border-2 border-emerald-400'
                          : 'glass-underwater border border-cyan-400/30 hover:border-cyan-400/60'
                      }`}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-4xl">{option.image}</div>
                        <div className="flex-1">
                          <div className="text-white font-medium text-lg">
                            {option.text}
                          </div>
                          {answers[currentQuestion] === option.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="flex items-center gap-2 mt-2 text-emerald-400"
                            >
                              <CheckIcon className="w-4 h-4" />
                              <span className="text-sm">Selected</span>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between">
                <button
                  onClick={goToPrevious}
                  disabled={currentQuestion === 0}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg glass-underwater border border-white/30 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
                >
                  <ArrowLeftIcon className="w-4 h-4" />
                  Previous
                </button>
                
                <div className="text-center">
                  <div className="text-cyan-200 text-sm">
                    {answers[currentQuestion] ? '✓ Answered' : 'Choose an option'}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Result Header */}
              <div className="text-center space-y-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-emerald border border-emerald-400/50"
                >
                  <SparklesIcon className="w-5 h-5 text-emerald-400" />
                  <span className="text-white font-semibold">Your Perfect Style</span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className={`text-5xl font-bold bg-gradient-to-r ${result?.gradient} bg-clip-text text-transparent`}
                >
                  {result?.title}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-xl text-cyan-100 max-w-2xl mx-auto"
                >
                  {result?.description}
                </motion.p>
              </div>

              {/* Result Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="glass-underwater p-6 rounded-xl border border-cyan-400/30"
                >
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <CubeTransparentIcon className="w-5 h-5 text-cyan-400" />
                    Style Characteristics
                  </h3>
                  <ul className="space-y-2">
                    {result?.characteristics.map((char, index) => (
                      <li key={index} className="text-cyan-100 text-sm flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                        {char}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                  className="glass-underwater p-6 rounded-xl border border-cyan-400/30"
                >
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <BeakerIcon className="w-5 h-5 text-emerald-400" />
                    Quick Stats
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-cyan-200">Difficulty:</span>
                      <span className={`font-medium ${
                        result?.difficulty === 'Beginner' ? 'text-green-400' :
                        result?.difficulty === 'Intermediate' ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {result?.difficulty}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cyan-200">Est. Cost:</span>
                      <span className="text-white font-medium">{result?.estimatedCost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cyan-200">Time to Complete:</span>
                      <span className="text-white font-medium">{result?.timeToComplete}</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Recommended Plants */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="glass-deep-water p-6 rounded-xl border border-emerald-400/30"
              >
                <h3 className="text-white font-semibold mb-4">Recommended Plants for Your Style</h3>
                <div className="flex flex-wrap gap-2">
                  {result?.recommendedPlants.map((plant, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm border border-emerald-400/30"
                    >
                      {plant}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Actions */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={shareResult}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  <ShareIcon className="w-5 h-5" />
                  Share My Style
                </button>
                
                <button
                  onClick={resetQuiz}
                  className="px-6 py-3 glass-underwater border border-cyan-400/50 text-white font-semibold rounded-lg hover:bg-cyan-500/20 transition-colors"
                >
                  Try Again
                </button>
                
                <button
                  onClick={onClose}
                  className="px-6 py-3 glass-underwater border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default AquascapingQuiz;