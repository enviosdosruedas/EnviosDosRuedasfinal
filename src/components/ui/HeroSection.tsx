
// src/components/ui/HeroSection.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button, type buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import type { VariantProps } from 'class-variance-authority';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ArrowRight, Mail, Star, Home, Truck, Calculator as CalculatorIcon, Users, ChevronDown, Menu, X } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  ArrowRight,
  Mail,
  Star,
  Home,
  Truck,
  Calculator: CalculatorIcon,
  Users,
  ChevronDown,
  Menu,
  X,
};

interface CtaButtonProps {
  text: string;
  href?: string;
  variant?: VariantProps<typeof buttonVariants>['variant'];
  icon?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
  asChild?: boolean;
  className?: string;
}

export interface HeroSectionProps {
  title: React.ReactNode;
  preTitle?: React.ReactNode;
  description?: string | React.ReactNode;
  ctaButtons?: CtaButtonProps[];
  backgroundType?: 'color' | 'gradient' | 'image';
  backgroundColor?: string;
  backgroundGradient?: string;
  backgroundImageUrl?: string;
  backgroundImageAlt?: string;
  backgroundOverlayOpacity?: number;
  textColorClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  visualElement?: React.ReactNode;
  layout?: 'center-stacked' | 'split-visual-right' | 'split-visual-left';
  minHeight?: string;
  contentMaxWidth?: string;
  textAlignment?: 'text-center' | 'text-left' | 'text-right';
  className?: string;
  children?: React.ReactNode;
  priority?: boolean;
  disableAnimation?: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, 
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 80, 
      damping: 12,
    },
  },
};

const visualElementVariants = {
  hidden: { x: 30, opacity: 0, scale: 0.95 },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 70, 
      damping: 15,
      delay: 0.2,
    },
  },
};

export function HeroSection({
  title,
  preTitle,
  description,
  ctaButtons,
  backgroundType = 'gradient',
  backgroundColor = 'bg-background', 
  backgroundGradient = 'bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700', 
  backgroundImageUrl,
  backgroundImageAlt = 'Hero background image',
  backgroundOverlayOpacity = 0,
  textColorClassName = 'text-primary-foreground', 
  titleClassName = 'text-4xl sm:text-5xl lg:text-6xl font-bold', 
  descriptionClassName = 'text-lg sm:text-xl lg:text-2xl opacity-90 leading-relaxed', 
  visualElement,
  layout = 'center-stacked',
  minHeight = 'min-h-[60vh] md:min-h-[70vh]',
  contentMaxWidth = 'max-w-4xl',
  textAlignment = 'text-center',
  className = '',
  children,
  priority = false,
  disableAnimation = false,
}: HeroSectionProps) {
  
  const SectionWrapper = disableAnimation ? "section" : motion.section;
  const sectionWrapperProps = disableAnimation ? {} : {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3 },
  };

  const ContentWrapper = disableAnimation ? "div" : motion.div;
  const contentWrapperProps = disableAnimation ? {} : {
    variants: containerVariants,
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, amount: 0.2 },
  };

  const ItemWrapper = disableAnimation ? "div" : motion.div;
  const itemWrapperProps = disableAnimation ? {} : { variants: itemVariants };

  const VisualWrapper = disableAnimation ? "div" : motion.div;
  const visualWrapperRightProps = disableAnimation ? {} : {
    variants: visualElementVariants,
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, amount: 0.2 },
  };
  const visualWrapperLeftProps = disableAnimation ? {} : {
    variants: { ...visualElementVariants, hidden: { x: -30, opacity: 0, scale: 0.95 } },
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, amount: 0.2 },
  };

  let bgClasses = '';
  if (backgroundType === 'color') bgClasses = backgroundColor;
  else if (backgroundType === 'gradient') bgClasses = backgroundGradient;

  const sectionClasses = cn(
    'relative flex items-center overflow-hidden',
    minHeight,
    bgClasses,
    className
  );

  const contentContainerClasses = cn(
    'relative z-10 container mx-auto px-4 w-full',
    layout === 'center-stacked' ? 'py-12 sm:py-16 md:py-24 lg:py-32' : 'py-10 sm:py-12 md:py-20 lg:py-28'
  );

  const textContentWrapper = (
    <ContentWrapper
      className={cn(
        textColorClassName,
        textAlignment,
        layout === 'center-stacked' ? `mx-auto ${contentMaxWidth}` : ``,
        layout !== 'center-stacked' && visualElement ? (layout === 'split-visual-right' ? 'lg:text-left' : 'lg:text-right') : textAlignment
      )}
      {...contentWrapperProps}
    >
      {preTitle && (
        <ItemWrapper {...itemWrapperProps}>
          <div className="mb-4 md:mb-6">
            {typeof preTitle === 'string' ? (
              <Badge className="px-4 py-2 text-sm font-semibold" variant="secondary">{preTitle}</Badge>
            ) : preTitle}
          </div>
        </ItemWrapper>
      )}

      <ItemWrapper {...itemWrapperProps}>
        {typeof title === 'string' ? <h1 className={cn(titleClassName, 'leading-tight md:leading-tight')}>{title}</h1> : <div className={cn(titleClassName, 'leading-tight md:leading-tight')}>{title}</div>}
      </ItemWrapper>

      {description && (
        <ItemWrapper {...itemWrapperProps}>
          <div className={cn('mt-4 md:mt-6', descriptionClassName, layout === 'center-stacked' ? `mx-auto ${contentMaxWidth === 'max-w-4xl' ? 'max-w-3xl' : contentMaxWidth}` : (layout !== 'center-stacked' ? 'max-w-xl' : ''))}>
            {typeof description === 'string' ? <p>{description}</p> : description}
          </div>
        </ItemWrapper>
      )}

      {children && <ItemWrapper {...itemWrapperProps}><div className="mt-6 md:mt-8">{children}</div></ItemWrapper>}

      {ctaButtons && ctaButtons.length > 0 && (
        <ItemWrapper {...itemWrapperProps}>
          <div
            className={cn(
              'mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto',
              textAlignment === 'text-center' && layout === 'center-stacked' ? 'justify-center' :
              (textAlignment === 'text-left' || (layout === 'split-visual-right')) ? 'justify-center lg:justify-start' :
              (textAlignment === 'text-right' || layout === 'split-visual-left') ? 'justify-center lg:justify-end' : 
              'justify-center' 
            )}
          >
            {ctaButtons.map((button, index) => {
              const IconComponent = button.icon ? iconMap[button.icon] : null;
              return (
                <Button
                  key={index}
                  variant={button.variant || 'default'} 
                  size="lg"
                  asChild={!!button.href && !button.onClick}
                  onClick={button.onClick}
                  className={cn(
                    'font-semibold text-base sm:text-lg py-2.5 sm:py-3 px-6 sm:px-8 rounded-md shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 w-full sm:w-auto',
                    button.className
                  )}
                >
                  {button.href && !button.onClick ? (
                    <Link href={button.href} target={button.target} rel={button.rel}>
                      {IconComponent && <IconComponent className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />}
                      {button.text}
                    </Link>
                  ) : (
                    <>
                      {IconComponent && <IconComponent className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />}
                      {button.text}
                    </>
                  )}
                </Button>
              );
            })}
          </div>
        </ItemWrapper>
      )}
    </ContentWrapper>
  );

  return (
    <SectionWrapper
      className={sectionClasses}
      {...sectionWrapperProps}
    >
      {backgroundType === 'image' && backgroundImageUrl && (
        <Image
          src={backgroundImageUrl}
          alt={backgroundImageAlt}
          fill
          sizes="100vw"
          style={{ objectFit: 'cover' }}
          quality={80} 
          priority={priority}
          className="z-0"
        />
      )}
      {backgroundType === 'image' && backgroundOverlayOpacity > 0 && (
        <div
          className="absolute inset-0 bg-black z-0" 
          style={{ opacity: backgroundOverlayOpacity }}
        ></div>
      )}

      <div className={contentContainerClasses}>
        {layout === 'center-stacked' && textContentWrapper}
        {layout === 'split-visual-right' && (
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            <div>{textContentWrapper}</div>
            {visualElement && (
              <VisualWrapper
                className="flex items-center justify-center lg:justify-end mt-8 lg:mt-0"
                {...visualWrapperRightProps}
              >
                {visualElement}
              </VisualWrapper>
            )}
          </div>
        )}
         {layout === 'split-visual-left' && (
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            {visualElement && (
              <VisualWrapper
                className="flex items-center justify-center lg:justify-start lg:order-first mt-8 lg:mt-0" 
                {...visualWrapperLeftProps}
              >
                {visualElement}
              </VisualWrapper>
            )}
             
            <div className={layout === 'split-visual-left' && visualElement ? 'lg:order-last' : ''}>
                {textContentWrapper}
            </div>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
