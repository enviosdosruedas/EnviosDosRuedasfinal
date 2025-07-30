"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  layout?: 'center-stacked' | 'split-visual-right';
  preTitle?: React.ReactNode;
  title: React.ReactNode;
  description?: string;
  ctaButtons?: React.ReactNode;
  visualElement?: React.ReactNode;
  backgroundImageUrl?: string;
  backgroundOverlayOpacity?: number;
  className?: string;
}

export function HeroSection({
  layout = 'center-stacked',
  preTitle,
  title,
  description,
  ctaButtons,
  visualElement,
  backgroundImageUrl,
  backgroundOverlayOpacity = 0.5,
  className,
}: HeroSectionProps) {
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    },
  };

  const visualVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  }

  const renderContent = () => (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        'flex flex-col space-y-4 z-10',
        layout === 'center-stacked' && 'items-center text-center',
        layout === 'split-visual-right' && 'items-start text-left'
      )}
    >
      {preTitle && <motion.div variants={itemVariants}>{preTitle}</motion.div>}
      <motion.h1 variants={itemVariants} className="text-4xl font-extrabold tracking-tight lg:text-5xl">
        {title}
      </motion.h1>
      {description && <motion.p variants={itemVariants} className="max-w-prose text-lg text-muted-foreground">{description}</motion.p>}
      {ctaButtons && <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">{ctaButtons}</motion.div>}
    </motion.div>
  );

  return (
    <section className={cn('relative w-full', className)}>
      {backgroundImageUrl && (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImageUrl})` }}
          />
          <div 
            className="absolute inset-0 bg-black" 
            style={{ opacity: backgroundOverlayOpacity }}
          />
        </>
      )}
      
      <div className={cn(
        'container mx-auto px-4 py-20 md:py-32 relative',
        layout === 'split-visual-right' && 'grid md:grid-cols-2 gap-12 items-center'
      )}>
        {renderContent()}
        {layout === 'split-visual-right' && visualElement && (
          <motion.div 
            variants={visualVariants}
            initial="hidden"
            animate="visible"
            className="hidden md:flex items-center justify-center"
          >
            {visualElement}
          </motion.div>
        )}
      </div>
    </section>
  );
}
