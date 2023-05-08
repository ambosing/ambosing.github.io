import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';

type LinkIconProps = {
  link: string;
  image: string;
};

const IconCircle = styled.a`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #fff6ea;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 428px) {
    width: 32px;
    height: 32px;
  }
`;

const IconImage = styled.img`
  width: 28px;
  height: 28px;

  @media (max-width: 428px) {
    width: 24px;
    height: 24px;
  }
`;

export const LinkIcon: FunctionComponent<LinkIconProps> = ({ link, image }) => {
  return (
    <IconCircle href={link} target="_blank">
      <IconImage src={image} alt="icon" />
    </IconCircle>
  );
};
