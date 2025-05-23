import { useEffect, useRef } from 'react';
import { SectionContainer, ViewContainer } from './style';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const TextSection = () => {
  const sectionRef = useRef(null);
  const textLeftRef = useRef(null);
  const textRightRef = useRef(null);
  const eyeLeftRef = useRef(null);
  const eyeRightRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=200%',
        pin: true,
        pinSpacing: true,
        scrub: 2,
      },
    });

    const textElements = [textLeftRef.current, textRightRef.current];

    textElements.forEach((element, index) => {
      if (!element) return;

      gsap.set(element, {
        color: 'var(--primary-10)',
        textShadow: 'none',
        opacity: 0,
        yPercent: 50,
      });

      mainTimeline.to(
        element,
        {
          opacity: 1,
          yPercent: 0,
          color: 'var(--primary-50)',
          textShadow: `
          0 0 30px var(--primary-30),
          0 0 60px var(--primary-40),
          0 0 110px var(--primary-30),
          0 0 100px var(--primary-20)
        `,
          duration: 1,
          onStart: () => element.classList.add('text-flicker-in-glow'),
          onReverseComplete: () => element.classList.remove('text-flicker-in-glow'),
        },
        index * 0.2
      );
    });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const eyes = [eyeLeftRef.current, eyeRightRef.current];

      eyes.forEach((eye) => {
        if (!eye) return;

        const eyeRect = eye.getBoundingClientRect();
        const eyeCenterX = eyeRect.left + eyeRect.width / 2;
        const eyeCenterY = eyeRect.top + eyeRect.height / 2;

        const angle = Math.atan2(clientY - eyeCenterY, clientX - eyeCenterX);
        const distance = Math.min(Math.hypot(clientX - eyeCenterX, clientY - eyeCenterY), eyeRect.width * 0.35);

        const moveX = Math.cos(angle) * distance;
        const moveY = Math.sin(angle) * distance;

        gsap.to(eye.children[0], {
          x: moveX,
          y: moveY,
          duration: 0.3,
          ease: 'power2.out',
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <SectionContainer>
      <ViewContainer ref={sectionRef}>
        <div className="inner" ref={innerRef}>
          <h1>당신이 찾던 미래의 콘텐츠 플랫폼</h1>
          <div className="content">
            <div className="text-l">
              <span ref={textLeftRef}>보고 싶은 건</span>
            </div>
            <div className="view">
              <div className="img-box">
                <div className="eye-l" ref={eyeLeftRef}>
                  <img src="/images/eye-2.png" alt="" className="eye-bl" />
                </div>
                <div className="eye-r" ref={eyeRightRef}>
                  <img src="/images/eye-3.png" alt="" className="eye-br" />
                </div>
              </div>
            </div>
            <div className="text-r">
              <span ref={textRightRef}>이미 알고 있어</span>
            </div>
          </div>
        </div>
      </ViewContainer>
    </SectionContainer>
  );
};

export default TextSection;
