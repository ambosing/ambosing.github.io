import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';

type ScrollProps = {
  scrollWidth: number;
};

const ProgressBar = styled.div<ScrollProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: ${({ scrollWidth }) => scrollWidth}%;
  height: 4px;
  background-color: #ab8b71;
  border-radius: 10px;
  z-index: 100;
  transition: width 0.3s ease;

  @media (max-width: 744px) {
    height: 2px;
  }
`;

export const ScrollIndicator = () => {
  const [scrollWidth, setScrollWidth] = useState(0);

  const updateScrollIndicator = () => {
    const windowHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrollPosition = window.scrollY;

    const scrollPercentage = (scrollPosition / windowHeight) * 100;
    setScrollWidth(scrollPercentage);
  };

  useEffect(() => {
    window.addEventListener('scroll', updateScrollIndicator);

    return () => {
      window.removeEventListener('scroll', updateScrollIndicator);
    };
  }, []);
  return <ProgressBar scrollWidth={scrollWidth}></ProgressBar>;
};
