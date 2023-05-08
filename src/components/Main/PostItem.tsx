import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { PostFrontmatterType } from 'types/PostItem.types';

type PostItemProps = PostFrontmatterType & { link: string };

const PostItemWrapper = styled(Link)`
  position: relative;
  top: 0px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: top 0.2s ease;

  &:hover {
    top: -5px;
  }
`;

const ThumbnailImage = styled(GatsbyImage)`
  width: 100%;
  height: 220px;
  border-radius: 10px 10px 0 0;

  @media (max-width: 1024px) {
    height: 184px;
  }

  @media (max-width: 320px) {
    height: 140px;
  }
`;

const PostItemContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 14px;
  gap: 14px;

  @media (max-width: 1024px) {
    gap: 12px;
  }

  @media (max-width: 320px) {
    padding: 10px;
    gap: 10px;
  }
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const CategoryItem = styled.div`
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 4px;
  background-color: #f2ceb2;
  color: #402e32;

  @media (max-width: 1024px) {
    font-size: 12px;
    line-height: 18px;
  }

  @media (max-width: 320px) {
    font-size: 10px;
    line-height: 16px;
  }
`;

const Title = styled.div`
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  overflow-wrap: break-word;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  color: #402e32;

  @media (max-width: 1024px) {
    font-size: 16px;
    line-height: 22px;
  }

  @media (max-width: 320px) {
    font-size: 14px;
    line-height: 20px;
  }
`;

const Summary = styled.div`
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  overflow-wrap: break-word;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 14px;
  line-height: 20px;
  color: #baa89b;

  @media (max-width: 1024px) {
    font-size: 12px;
    line-height: 18px;
  }

  @media (max-width: 320px) {
    font-size: 10px;
    line-height: 16px;
  }
`;

const Under = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Date = styled.div`
  font-size: 12px;
  line-height: 16px;
  color: #524439;

  @media (max-width: 1024px) {
    font-size: 10px;
    line-height: 14px;
  }

  @media (max-width: 320px) {
    font-size: 8px;
    line-height: 12px;
  }
`;

export const PostItem: FunctionComponent<PostItemProps> = ({
  title,
  date,
  categories,
  summary,
  thumbnail: {
    childImageSharp: { gatsbyImageData },
  },
  link,
}) => {
  return (
    <PostItemWrapper to={link}>
      <ThumbnailImage image={gatsbyImageData} alt="Post Item Image" />
      <PostItemContent>
        <CategoryWrapper>
          {categories.map(category => (
            <CategoryItem key={category}>{category}</CategoryItem>
          ))}
        </CategoryWrapper>
        <Title>{title}</Title>
        <Summary>{summary}</Summary>
        <Under>
          <Date>{date}</Date>
        </Under>
      </PostItemContent>
    </PostItemWrapper>
  );
};
