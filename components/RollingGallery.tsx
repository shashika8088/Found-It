import React, { useEffect, useRef, useState } from 'react';
// Corrected import from 'motion/react' to 'framer-motion' to match the hooks and components being used.
import { motion, useMotionValue, useAnimation, useTransform } from 'framer-motion';

const IMGS = [
    // Water bottle
    'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=400&h=250&auto=format&fit=crop',
    // Airpods case
    'https://images.unsplash.com/photo-1610438235354-a6ae5528385c?q=80&w=400&h=250&auto=format&fit=crop',
    // Backpack
    'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1',
    // Wallet
    'https://images.unsplash.com/photo-1557825835-b4527f242af7?q=80&w=400&h=250&auto=format&fit=crop',
    // Headphones
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&h=250&auto=format&fit=crop',
    // Smartphone
    'https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=400&h=250&auto=format&fit=crop',
    // Laptop
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=400&h=250&auto=format&fit=crop',
    // Camera
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=400&h=250&auto=format&fit=crop',
    // Sunglasses
    'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=400&h=250&auto=format&fit=crop'
];


interface RollingGalleryProps {
  autoplay?: boolean;
  pauseOnHover?: boolean;
  images?: string[];
}

const RollingGallery: React.FC<RollingGalleryProps> = ({ autoplay = false, pauseOnHover = false, images = IMGS }) => {
  const [isScreenSizeSm, setIsScreenSizeSm] = useState(window.innerWidth <= 640);

  const cylinderWidth = isScreenSizeSm ? 1100 : 1800;
  const faceCount = images.length;
  const faceWidth = (cylinderWidth / faceCount);
  const dragFactor = 0.05;
  const radius = cylinderWidth / (2 * Math.PI);

  const rotation = useMotionValue(0);
  const controls = useAnimation();
  // FIX: Use `number` for the setInterval return type, as `NodeJS.Timeout` is not available in the browser.
  const autoplayRef = useRef<number | null>(null);

  const handleDrag = (_: any, info: { offset: { x: number } }) => {
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };

  const handleDragEnd = (_: any, info: { velocity: { x: number } }) => {
    controls.start({
      rotateY: rotation.get() + info.velocity.x * dragFactor,
      transition: { type: 'spring', stiffness: 60, damping: 20, mass: 0.1, ease: 'easeOut' }
    });
  };

  const transform = useTransform(rotation, value => {
    return `rotate3d(0, 1, 0, ${value}deg)`;
  });

  const startAutoplay = () => {
    autoplayRef.current = window.setInterval(() => {
        const currentRotation = rotation.get();
        const nextRotation = currentRotation - 360 / faceCount;
        controls.start({
            rotateY: nextRotation,
            transition: { duration: 2, ease: 'linear' }
        });
        rotation.set(nextRotation);
    }, 2000);
  }

  useEffect(() => {
    if (autoplay) {
      startAutoplay();
      return () => {
        if (autoplayRef.current) {
          clearInterval(autoplayRef.current)
        }
      };
    }
  }, [autoplay, controls, faceCount]);

  useEffect(() => {
    const handleResize = () => setIsScreenSizeSm(window.innerWidth <= 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseEnter = () => {
    if (autoplay && pauseOnHover) {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
      controls.stop();
    }
  };

  const handleMouseLeave = () => {
    if (autoplay && pauseOnHover) {
      startAutoplay();
    }
  };

  return (
    <div className="relative h-[400px] w-full overflow-hidden">
      <div className="absolute top-0 h-full w-24 z-10 left-0 bg-gradient-to-r from-background to-transparent dark:from-dark-background"></div>
      <div className="absolute top-0 h-full w-24 z-10 right-0 bg-gradient-to-l from-background to-transparent dark:from-dark-background"></div>
      <div className="flex h-full items-center justify-center" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
        <motion.div
          drag="x"
          className="flex h-auto min-h-[200px] justify-center items-center cursor-grab"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: 'preserve-3d'
          }}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          animate={controls}
        >
          {images.map((url, i) => (
            <div
              key={i}
              className="absolute flex h-fit items-center justify-center p-[4%] sm:p-[3%]"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
                backfaceVisibility: 'hidden'
              }}
            >
              <img src={url} alt={`Gallery item ${i + 1}`} className="pointer-events-none h-[40px] w-[100px] sm:h-[100px] sm:w-[165px] rounded-lg border-2 border-surface dark:border-dark-surface/50 shadow-xl object-cover transition-transform duration-300 group-hover:scale-105" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default RollingGallery;