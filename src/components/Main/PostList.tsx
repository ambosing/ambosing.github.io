import styled from '@emotion/styled';
import React, { FunctionComponent } from 'react';
import { PostItem } from './PostItem';
import { PostListItemType } from 'types/PostItem.types';
import {
  useInfiniteScroll,
  useInfiniteScrollType,
} from 'hooks/useInfiniteScroll';

type PostListProps = {
  selectedCategory: string;
  posts: PostListItemType[];
};

const PostListWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 18px;
  width: 1020px;
  margin: 0 auto;
  padding-left: 220px;

  @media (max-width: 1440px) {
    width: 920px;
  }

  @media (max-width: 1024px) {
    width: 700px;
    padding-left: 0;
  }

  @media (max-width: 744px) {
    width: 100%;
    padding: 0 36px;
    grid-gap: 12px;
  }

  @media (max-width: 428px) {
    padding: 0 28px;
    grid-template-columns: 1fr;
  }

  @media (max-width: 320px) {
    padding: 0 18px;
  }
`;

const PostCategory = styled.div`
  margin: 80px auto 70px;
  padding-left: 220px;
  text-align: center;

  @media (max-width: 1024px) {
    padding-left: 0;
    margin-top: 132px;
  }

  @media (max-width: 428px) {
    margin: 86px auto 50px;
  }
`;

const PostCategoryText = styled.span`
  display: inline-block;
  font-size: 20px;
  line-height: 50px;
  font-weight: 800;
  color: #765941;
  border-bottom: 1px solid #765941;
  padding: 0 60px;

  @media (max-width: 428px) {
    font-size: 16px;
    line-height: 40px;
    padding: 0 40px;
  }

  @media (max-width: 320px) {
    font-size: 14px;
    line-height: 30px;
    padding: 0 30px;
  }
`;

export const PostList: FunctionComponent<PostListProps> = ({
  selectedCategory,
  posts,
}) => {
  const { containerRef, postList }: useInfiniteScrollType = useInfiniteScroll(
    selectedCategory,
    posts,
  );

  return (
    <>
      <PostCategory>
        <PostCategoryText>
          {selectedCategory === 'All' ? '전체 게시글' : selectedCategory}
        </PostCategoryText>
      </PostCategory>
      <PostListWrapper ref={containerRef}>
        {postList.map(
          ({
            node: {
              id,
              fields: { slug },
              frontmatter,
            },
          }: PostListItemType) => (
            <PostItem {...frontmatter} link={slug} key={id} />
          ),
        )}
      </PostListWrapper>
    </>
  );
};
