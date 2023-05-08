import styled from '@emotion/styled';
import React, { FunctionComponent } from 'react';

export type PostHeadInfoProps = {
  title: string;
  date: string;
  categories: string[];
};

const PostHeadInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: space-between;
  width: 1020px;
  height: 100%;
  margin: 0 auto;
  color: #ffffff;
  padding: 100px 0 100px 220px;

  @media (max-width: 1440px) {
    width: 920px;
  }

  @media (max-width: 1024px) {
    width: 700px;
    padding: 80px 0;
  }

  @media (max-width: 744px) {
    width: 100%;
    padding: 80px 36px;
  }

  @media (max-width: 428px) {
    padding: 60px 28px;
  }

  @media (max-width: 320px) {
    padding: 50px 18px;
  }
`;

const Category = styled.div`
  color: #fff;
  font-size: 18px;
  line-height: 26px;

  @media (max-width: 1024px) {
    font-size: 16px;
    line-height: 22px;
  }

  @media (max-width: 428px) {
    font-size: 14px;
    line-height: 20px;
  }
`;

const Title = styled.h1`
  display: -webkit-box;
  overflow: hidden;
  overflow-wrap: break-word;
  text-overflow: ellipsis;
  white-space: normal;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 38px;
  line-height: 54px;
  font-weight: 800;
  color: #fff;

  @media (max-width: 1024px) {
    font-size: 32px;
    line-height: 50px;
  }

  @media (max-width: 428px) {
    font-size: 24px;
    line-height: 34px;
  }

  @media (max-width: 320px) {
    font-size: 18px;
    line-height: 26px;
  }
`;

const Date = styled.div`
  color: #fff;
  font-size: 18px;
  line-height: 26px;

  @media (max-width: 1024px) {
    font-size: 14px;
    line-height: 20px;
  }

  @media (max-width: 428px) {
    font-size: 12px;
    line-height: 16px;
  }
`;

export const PostHeadInfo: FunctionComponent<PostHeadInfoProps> = ({
  title,
  date,
  categories,
}) => {
  return (
    <PostHeadInfoWrapper>
      <Category>{categories.join('/')}</Category>
      <Title>{title}</Title>
      <Date>{date}</Date>
    </PostHeadInfoWrapper>
  );
};
