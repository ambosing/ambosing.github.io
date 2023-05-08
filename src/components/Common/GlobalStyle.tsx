import { css, Global } from '@emotion/react';
import React, { FunctionComponent } from 'react';
import '@fontsource/noto-sans-kr';

const defaultStyle = css`
  @import url('https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@400;700;800&display=swap');

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 400;
    color: #000;
  }

  html,
  body,
  #___gatsby {
    height: 100%;
    -webkit-tap-highlight-color: transparent;
    scroll-behavior: smooth;
  }

  a,
  a:hover {
    text-decoration: none;
    cursor: pointer;
  }
`;

export const GlobalStyle: FunctionComponent = () => {
  return <Global styles={defaultStyle} />;
};
