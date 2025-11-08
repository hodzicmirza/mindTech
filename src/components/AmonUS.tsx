import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

export default function AmongUS() {
  const svgRef = useRef(null);
  const [completedLights, setCompletedLights] = useState([0, 0, 0, 0]);

  useEffect(() => {

    // Initialize draggables
    Draggable.create('.drag-1', {
      onDrag: function() { 
        updateLine('.line-1', this.x + 120, this.y + 185); 
      },
      onRelease: function() {
        if (this.x !== 670 || this.y !== 188) {
          reset('.drag-1', '.line-1', 70, 185);
          toggleLight(2, false);
        } else if (this.x === 670 && this.y === 188) {
          toggleLight(2, true);
        }
      },
      liveSnap: { points: [{ x: 670, y: 188 }], radius: 20 }
    });

    Draggable.create('.drag-2', {
      onDrag: function() { 
        updateLine('.line-2', this.x + 120, this.y + 375); 
      },
      onRelease: function() {
        if (this.x !== 670 || this.y !== -188) {
          reset('.drag-2', '.line-2', 60, 375);
          toggleLight(1, false);
        } else if (this.x === 670 && this.y === -188) {
          toggleLight(1, true);
        }
      },
      liveSnap: { points: [{ x: 670, y: -188 }], radius: 20 }
    });

    Draggable.create('.drag-3', {
      onDrag: function() { 
        updateLine('.line-3', this.x + 120, this.y + 560); 
      },
      onRelease: function() {
        if (this.x !== 670 || this.y !== 0) {
          reset('.drag-3', '.line-3', 60, 560);
          toggleLight(3, false);
        } else if (this.x === 670 && this.y === 0) {
          toggleLight(3, true);
        }
      },
      liveSnap: { points: [{ x: 670, y: 0 }], radius: 20 }
    });

    Draggable.create('.drag-4', {
      onDrag: function() { 
        updateLine('.line-4', this.x + 120, this.y + 745); 
      },
      onRelease: function() {
        if (this.x !== 670 || this.y !== 0) {
          reset('.drag-4', '.line-4', 60, 745);
          toggleLight(4, false);
        } else if (this.x === 670 && this.y === 0) {
          toggleLight(4, true);
        }
      },
      liveSnap: { points: [{ x: 670, y: 0 }], radius: 20 }
    });

    function updateLine(selector: gsap.TweenTarget, x: any, y: any) {
      gsap.set(selector, {
        attr: {
          x2: x,
          y2: y
        }
      });
    }

    type LightState = number[];

    interface ToggleLightProps {
      selector: number;
      visibility: boolean;
    }

    function toggleLight(selector: number, visibility: boolean): void {
      setCompletedLights((prev: LightState) => {
        const newLights: number[] = [...prev];
        newLights[selector - 1] = visibility ? 1 : 0;
        
        // Check if all lights are completed
        if (visibility && newLights.every(light => light === 1)) {
     
          setTimeout(() => {
            reset('.drag-1', '.line-1', 70, 185);
            reset('.drag-2', '.line-2', 60, 375);
            reset('.drag-3', '.line-3', 60, 560);
            reset('.drag-4', '.line-4', 60, 745);
            setCompletedLights([0, 0, 0, 0]);
          }, 2000);
        }
        
        return newLights;
      });

      gsap.to(`.light-${selector}`, {
        opacity: visibility ? 1 : 0,
        duration: 0.3
      });
    }

    function reset(drag: gsap.TweenTarget, line: gsap.TweenTarget, x: number, y: number) {
      gsap.to(drag, {
        duration: 0.3,
        ease: 'power2.out',
        x: 0,
        y: 0
      });
      gsap.to(line, {
        duration: 0.3,
        ease: 'power2.out',
        attr: {
          x2: x,
          y2: y
        }
      });
    }

    return () => {
      // Cleanup draggables
      Draggable.get('.drag-1')?.kill();
      Draggable.get('.drag-2')?.kill();
      Draggable.get('.drag-3')?.kill();
      Draggable.get('.drag-4')?.kill();
    };
  }, []);

  return (
    <div style={{ 
      margin: 0, 
      display: 'grid', 
      placeItems: 'center', 
      background: 'black', 
      height: '100vh', 
      overflow: 'hidden' 
    }}>
      <svg 
        ref={svgRef}
        width="907" 
        height="907" 
        viewBox="0 0 907 907"
        style={{ width: '90vmin', height: 'auto' }}
      >
        {/* Add your SVG content here */}
        <linearGradient id="a" y1="453.5" x2="907" y2="453.5" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#1d1d1b"/>
          <stop offset="0" stopColor="#272726"/>
          <stop offset=".2" stopColor="#262625" stopOpacity=".93"/>
          <stop offset=".35" stopColor="#232322" stopOpacity=".69"/>
          <stop offset=".48" stopColor="#1e1e1c" stopOpacity=".29"/>
          <stop offset=".51" stopColor="#1d1d1b" stopOpacity=".2"/>
          <stop offset="1" stopColor="#1d1d1b"/>
        </linearGradient>
        
        {/* Continue with all the SVG paths and elements from your original code */}
        {/* ... (paste all the SVG content here) ... */}
        
        {/* Draggable rectangles */}
        <rect x="60" y="165" width="60" height="40" className="drag drag-1" fill="white" opacity="0" />
        <rect x="60" y="355" width="60" height="40" className="drag drag-2" fill="white" opacity="0" />
        <rect x="60" y="540" width="60" height="40" className="drag drag-3" fill="white" opacity="0" />
        <rect x="60" y="725" width="60" height="40" className="drag drag-4" fill="white" opacity="0" />

        {/* Drag Lines */}
        <line x1="70" y1="185" x2="70" y2="185" className="line line-back line-1" />
        <line x1="70" y1="185" x2="70" y2="185" className="line line-1" />
        <line x1="65" y1="375" x2="65" y2="375" className="line line-back line-2" />
        <line x1="65" y1="375" x2="65" y2="375" className="line line-2" />
        <line x1="65" y1="560" x2="65" y2="560" className="line line-back line-3" />
        <line x1="65" y1="560" x2="65" y2="560" className="line line-3" />
        <line x1="65" y1="745" x2="65" y2="745" className="line line-back line-4" />
        <line x1="65" y1="745" x2="65" y2="745" className="line line-4" />
      </svg>

      <style>{`
        .light { opacity: 0; }
        .drag { fill: white; opacity: 0; }
        .line {
          stroke-width: 18px;
          pointer-events: none;
        }
        .line-back {
          stroke-width: 30px;
          pointer-events: none;
        }
        .line-1 {
          stroke: #324d9c;
        }
        .line-1.line-back {
          stroke: #25378d;
        }
        .line-2 {
          stroke: #e52320;
        }
        .line-2.line-back {
          stroke: #a71916;
        }
        .line-3 {
          stroke: #ffeb13;
        }
        .line-3.line-back {
          stroke: #aa9f17;
        }
        .line-4 {
          stroke: #a6529a;
        }
        .line-4.line-back {
          stroke: #90378c;
        }
        
        /* Add all the other CSS classes from your original code */
        .c{fill:#273065;stroke:#1a1b36}.c,.d,.e,.f,.k,.u{stroke-miterlimit:10}.c,.d,.e,.f,.u,.y{stroke-width:5px}.d{fill:#71160e;stroke:#280f10}.e{fill:#8c6c15}.e,.u{stroke:#38321a}.f{fill:#212021;stroke:#000}.h{fill:#9b3015;stroke:#471d12}.h,.y{stroke-linecap:round;stroke-linejoin:round}.k,.y{fill:none}.k{stroke:#1d1d1b;stroke-width:6px}.l{fill:#d9c905}.m{fill:#25378d}.n{fill:#324d9c}.o{fill:#a71916}.p{fill:#e52320}.q{fill:#aa9f17}.r{fill:#ffeb13}.s{fill:#90378c}.t{fill:#a6529a}.u{fill:#1d1d1b}.v{fill:#5b5c64}.w{fill:#292829}.x{fill:#2f3038}.y{stroke:#252526}
      `}</style>
    </div>
  );
}