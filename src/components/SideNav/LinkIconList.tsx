import styled from '@emotion/styled';
import React from 'react';
import { LinkIcon } from './LinkIcon';

const Wrapper = styled.div`
  display: flex;
  gap: 12px;
`;

export const LinkIconList = () => {
  return (
    <Wrapper>
      <LinkIcon
        link="https://github.com/ambosing"
        image="/icon/github.svg"
      ></LinkIcon>
      <LinkIcon
        link="https://ambosing.github.io/rss"
        image="/icon/rss.svg"
      ></LinkIcon>
      <LinkIcon
        link="mailto:ambosing_@naver.com"
        image="/icon/email.svg"
      ></LinkIcon>
    </Wrapper>
  );
};
