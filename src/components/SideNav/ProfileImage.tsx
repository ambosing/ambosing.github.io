import styled from '@emotion/styled';
import { IGatsbyImageData, GatsbyImage } from 'gatsby-plugin-image';
import React, { FunctionComponent } from 'react';

type ProfileImageProps = {
  profileImage: IGatsbyImageData;
};

const ProfileImageWrapper = styled(GatsbyImage)`
  width: 112px;
  height: 112px;
  margin-bottom: 12px;
  border-radius: 50%;

  @media (max-width: 428px) {
    width: 80px;
    height: 80px;
  }
`;

export const ProfileImage: FunctionComponent<ProfileImageProps> = ({
  profileImage,
}) => {
  return <ProfileImageWrapper image={profileImage} alt="ChocoBall" />;
};
