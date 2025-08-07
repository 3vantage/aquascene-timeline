'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { 
  CubeTransparentIcon, 
  SparklesIcon, 
  ArrowUturnLeftIcon,
  XMarkIcon,
  PlusCircleIcon 
} from '@heroicons/react/24/outline';

interface DraggedItem {
  id: string;
  type: 'plant' | 'rock' | 'driftwood';
  x: number;
  y: number;
  size: 'small' | 'medium' | 'large';
  color: string;
}

interface AquariumItem {
  id: string;
  name: string;
  type: 'plant' | 'rock' | 'driftwood';
  size: 'small' | 'medium' | 'large';
  color: string;
  icon: string;
  cost: number;
}

const AquariumBuilderPreview: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [placedItems, setPlacedItems] = useState<DraggedItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'plant' | 'rock' | 'driftwood'>('plant');
  const [totalCost, setTotalCost] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const availableItems: AquariumItem[] = [
    // Plants
    { id: 'plant1', name: 'Java Fern', type: 'plant', size: 'medium', color: 'from-emerald-800 to-emerald-400', icon: '🌿', cost: 12 },
    { id: 'plant2', name: 'Rotala Red', type: 'plant', size: 'small', color: 'from-red-800 to-red-400', icon: '🌱', cost: 8 },
    { id: 'plant3', name: 'Amazon Sword', type: 'plant', size: 'large', color: 'from-green-800 to-green-400', icon: '🍃', cost: 18 },
    { id: 'plant4', name: 'Moss Ball', type: 'plant', size: 'small', color: 'from-green-900 to-emerald-500', icon: '🟢', cost: 6 },
    
    // Rocks
    { id: 'rock1', name: 'Dragon Stone', type: 'rock', size: 'medium', color: 'from-stone-600 to-stone-800', icon: '🪨', cost: 25 },
    { id: 'rock2', name: 'Seiryu Stone', type: 'rock', size: 'large', color: 'from-slate-500 to-slate-700', icon: '⛰️', cost: 35 },
    { id: 'rock3', name: 'Lava Rock', type: 'rock', size: 'small', color: 'from-red-900 to-stone-700', icon: '🌋', cost: 15 },
    
    // Driftwood
    { id: 'wood1', name: 'Spider Wood', type: 'driftwood', size: 'large', color: 'from-amber-800 to-yellow-900', icon: '🪵', cost: 45 },
    { id: 'wood2', name: 'Manzanita', type: 'driftwood', size: 'medium', color: 'from-orange-900 to-red-900', icon: '🌳', cost: 30 },
  ];

  const filteredItems = availableItems.filter(item => item.type === selectedCategory);

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'small': return 'w-6 h-6';
      case 'medium': return 'w-10 h-10';
      case 'large': return 'w-16 h-16';
      default: return 'w-8 h-8';
    }
  };

  const addItemToTank = (item: AquariumItem) => {
    const newItem: DraggedItem = {
      id: `${item.id}-${Date.now()}`,
      type: item.type,
      x: Math.random() * 200 + 50,
      y: Math.random() * 150 + 100,
      size: item.size,
      color: item.color,
    };
    
    setPlacedItems(prev => [...prev, newItem]);
    setTotalCost(prev => prev + item.cost);
  };

  const removeItem = (itemId: string) => {
    const item = placedItems.find(i => i.id === itemId);
    if (item) {
      const originalItem = availableItems.find(ai => ai.id.includes(item.type));
      if (originalItem) {
        setTotalCost(prev => prev - originalItem.cost);
      }
    }
    setPlacedItems(prev => prev.filter(item => item.id !== itemId));
  };

  const clearTank = () => {
    setPlacedItems([]);
    setTotalCost(0);
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-gradient-to-br from-slate-900 via-blue-900 to-teal-900 rounded-2xl p-6 max-w-6xl w-full max-h-[90vh] overflow-hidden"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <CubeTransparentIcon className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Interactive Aquascape Designer</h2>
              <p className="text-cyan-200 text-sm">Drag items into your tank or click to place them</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-emerald-500/20 px-4 py-2 rounded-lg">
              <div className="text-emerald-400 text-sm font-medium">Total Cost</div>
              <div className="text-white text-xl font-bold">${totalCost}</div>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <XMarkIcon className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Item Library */}
          <div className="lg:col-span-1 space-y-4">
            <div className="glass-underwater p-4 rounded-xl border border-cyan-400/30">
              <h3 className="text-white font-semibold mb-3">Add Items</h3>
              
              {/* Category Tabs */}
              <div className="flex gap-2 mb-4">
                {(['plant', 'rock', 'driftwood'] as const).map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-400/50'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}s
                  </button>
                ))}
              </div>

              {/* Item List */}
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-white/10 cursor-pointer transition-colors"
                    onClick={() => addItemToTank(item)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{item.icon}</span>
                      <div>
                        <div className="text-white text-sm font-medium">{item.name}</div>
                        <div className="text-cyan-300 text-xs">${item.cost}</div>
                      </div>
                    </div>
                    <PlusCircleIcon className="w-4 h-4 text-cyan-400" />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={clearTank}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg text-sm transition-colors"
              >
                <ArrowUturnLeftIcon className="w-4 h-4" />
                Clear All
              </button>
            </div>
          </div>

          {/* 3D Tank Preview */}
          <div className="lg:col-span-3">
            <div 
              ref={containerRef}
              className="relative aspect-[4/3] glass-deep-water rounded-2xl p-6 overflow-hidden border border-cyan-400/30"
            >
              {/* Tank Background */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-cyan-800/10 to-blue-900/40 rounded-2xl" />
              
              {/* Substrate */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-stone-800/60 via-stone-700/40 to-transparent rounded-b-xl" />
              
              {/* Water surface effect */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-cyan-300/40 via-white/50 via-cyan-300/40 to-transparent rounded-t-xl"
                animate={{
                  x: ['-100%', '200%'],
                  scaleX: [1, 1.5, 0.8, 1.2, 1]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              />

              {/* Placed Items */}
              <AnimatePresence>
                {placedItems.map((item) => (
                  <motion.div
                    key={item.id}
                    className={`absolute ${getSizeClasses(item.size)} bg-gradient-to-t ${item.color} rounded-full cursor-pointer shadow-lg hover:scale-110 transition-transform`}
                    style={{
                      left: `${item.x}px`,
                      top: `${item.y}px`,
                      transformOrigin: 'bottom center'
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: 1, 
                      opacity: 1,
                      rotate: item.type === 'plant' ? [0, 2, -1, 3, 0] : 0
                    }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ 
                      duration: item.type === 'plant' ? 4 : 0.3,
                      repeat: item.type === 'plant' ? Infinity : 0
                    }}
                    onClick={() => removeItem(item.id)}
                    whileHover={{ scale: 1.2 }}
                    drag
                    dragElastic={0.1}
                    dragConstraints={{
                      left: 0,
                      right: 300,
                      top: 50,
                      bottom: 200
                    }}
                  />
                ))}
              </AnimatePresence>

              {/* Helper Text */}
              {placedItems.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white/70">
                    <SparklesIcon className="w-12 h-12 mx-auto mb-3 text-cyan-400" />
                    <p className="text-lg font-medium mb-2">Start Designing Your Tank</p>
                    <p className="text-sm">Click items from the library to add them</p>
                  </div>
                </div>
              )}

              {/* Statistics Overlay */}
              <div className="absolute top-4 right-4 space-y-2">
                <div className="glass-underwater p-3 rounded-xl border border-emerald-400/50">
                  <div className="text-emerald-400 text-xs font-medium">Items Placed</div>
                  <div className="text-white text-lg font-bold">{placedItems.length}</div>
                </div>
                
                <div className="glass-underwater p-3 rounded-xl border border-orange-400/50">
                  <div className="text-orange-400 text-xs font-medium">Tank Fullness</div>
                  <div className="text-white text-lg font-bold">{Math.min(100, Math.round((placedItems.length / 8) * 100))}%</div>
                </div>
              </div>

              {/* Cost Breakdown */}
              {totalCost > 0 && (
                <div className="absolute bottom-4 left-4">
                  <div className="glass-underwater p-3 rounded-xl border border-cyan-400/50">
                    <div className="text-cyan-400 text-xs font-medium">Estimated Cost</div>
                    <div className="text-white text-xl font-bold">${totalCost}</div>
                    <div className="text-cyan-200 text-xs">+ shipping & supplies</div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-4">
              <button className="flex-1 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Save My Design
              </button>
              <button className="flex-1 glass-underwater border border-cyan-400/50 text-white font-semibold py-3 px-6 rounded-lg hover:bg-cyan-500/20 transition-colors">
                Get Shopping List
              </button>
            </div>

            <div className="mt-4 text-center text-sm text-cyan-200">
              This is a preview of our full 3D designer coming with early access!
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AquariumBuilderPreview;