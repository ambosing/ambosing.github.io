import { css, Global } from '@emotion/react';
import React, { FunctionComponent } from 'react';
import '@fontsource/noto-sans-kr';

const defaultStyle = css`
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;800&display=swap');

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 400;
    color: #000;
  }

  body {
    overflow: unset !important;
  }

  html,
  body,
  #___gatsby {
    min-height: 100%;
    min-height: 100svh;
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
