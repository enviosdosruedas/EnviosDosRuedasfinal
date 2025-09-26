"use client"

interface RotatingCardProps {
  frontImageSrc?: string
  backImageSrc?: string
  className?: string // Add className prop for external styling
}

export default function RotatingCard({
  frontImageSrc = "/hero/delante.png",
  backImageSrc = "/hero/detras.png",
  className,
}: RotatingCardProps) {
  return (
    <div className={`scene ${className}`}>
      <div className="credit-card">
        {/* Front Face */}
        <div className="card-face card-front">
          <img
            src={frontImageSrc || "/placeholder.svg"}
            alt="Delante - EnviosDosruedas"
            className="w-full h-full object-contain rounded-[18px]"
          />
        </div>

        {/* Back Face */}
        <div className="card-face card-back">
          <img
            src={backImageSrc || "/placeholder.svg"}
            alt="Detras - EnviosDosruedas"
            className="w-full h-full object-contain rounded-[18px]"
          />
        </div>
      </div>
      <style jsx>{`
        .scene {
          perspective: 1800px;
          perspective-origin: center center;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
        }
        
        .credit-card {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          animation: elegantRotate 15s linear infinite;
          border-radius: 18px;
          margin: 0 auto;
          will-change: transform;
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
          box-shadow: 
            0 40px 80px rgba(0, 0, 0, 0.5),
            0 0 0 1px rgba(255, 255, 255, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.25),
            0 0 30px rgba(251, 193, 7, 0.1);
        }
        
        .card-face {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 18px;
          transform-style: preserve-3d;
          backface-visibility: hidden;
          border: 2px solid rgba(251, 193, 7, 0.2);
        }
        
        .card-front {
          transform: rotateY(0deg) translateZ(5px);
        }
        
        .card-back {
          transform: rotateY(180deg) translateZ(5px);
        }
        
        @keyframes elegantRotate {
          0% {
            transform: rotateY(0deg) rotateX(0deg) rotateZ(0deg) scale(1);
          }
          25% {
            transform: rotateY(90deg) rotateX(10deg) rotateZ(-10deg) scale(1.01);
          }
          50% {
            transform: rotateY(180deg) rotateX(-10deg) rotateZ(10deg) scale(1);
          }
          75% {
            transform: rotateY(270deg) rotateX(10deg) rotateZ(-10deg) scale(1.01);
          }
          100% {
            transform: rotateY(360deg) rotateX(0deg) rotateZ(0deg) scale(1);
          }
        }
      `}</style>
    </div>
  )
}
