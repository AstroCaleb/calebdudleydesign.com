import React, { useEffect } from 'react';
import { useAppContext } from '../useAppContext';

export const Introduction: React.FC = () => {
  const { setIsContactFormOpen } = useAppContext();
  const [showScrollIndicator, setShowScrollIndicator] = React.useState(true);

  const onScroll = () => {
    if (window.scrollY > 0) {
      setShowScrollIndicator(false);
    } else {
      setShowScrollIndicator(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll, false);
    return () => {
      window.removeEventListener('scroll', onScroll, false);
    };
  });

  return (
    <div className="intro-wrapper">
      <div className="intro-wrapper-inner">
        <div className="intro-name">
          <img
            alt="Picture of Caleb and family"
            width="200"
            height="200"
            className="caleb-avatar"
            src="/images/family.jpg"
          />
          <div className="text">
            <h1>{'Hi there!'}</h1>
            <h1>{"I'm Caleb."}</h1>
          </div>
        </div>

        <div className="intro-copy">
          <p>
            {
              "I'm a Software Engineer, and I enjoy helping people solve problems by coming up with creative solutions. I'm also a freelancer in my spare time and am always ready for a new adventure."
            }
          </p>

          <p>
            {
              'I love space, traveling, and enjoy a lot of outdoor activities like kayaking, hiking, biking, and now anything that our son would like to do... even if it means going to the beach.'
            }
          </p>

          <p>
            {
              "If you're interested in working together or just want to say hi, "
            }
            <button
              type="button"
              className="as-link"
              onClick={() => setIsContactFormOpen(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setIsContactFormOpen(true);
                }
              }}
              tabIndex={0}
            >
              {'drop me a line'}
            </button>
            .
          </p>
        </div>
      </div>
      <svg
        className={`scroll-indicator ${showScrollIndicator ? '' : 'hide'}`}
        aria-hidden="true"
        focusable="false"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
      >
        <path
          fill="currentColor"
          d="M443.5 162.6l-7.1-7.1c-4.7-4.7-12.3-4.7-17 0L224 351 28.5 155.5c-4.7-4.7-12.3-4.7-17 0l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17l211 211.1c4.7 4.7 12.3 4.7 17 0l211-211.1c4.8-4.7 4.8-12.3.1-17z"
        ></path>
      </svg>
    </div>
  );
};
