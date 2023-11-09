import styled from '@emotion/styled';
import { Link } from 'gatsby';
import React, { FunctionComponent, ReactNode } from 'react';

type CategoryItemProps = {
  active: boolean;
};

type GatsbyLinkProps = {
  children: ReactNode;
  className?: string;
  to: string;
} & CategoryItemProps;

export type CategoryListProps = {
  selectedCategory: string;
  categoryList: {
    [key: string]: number;
  };
};

const CategoryListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 32px 18px;

  @media (max-width: 428px) {
    margin-top: 18px;
  }
`;

const CategoryTitleText = styled.div`
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  color: #f9e7e2;
  margin-bottom: 32px;
  padding: 0 14px;

  @media (max-width: 428px) {
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 18px;
  }
`;

const CategoryItem = styled(({ active, ...props }: GatsbyLinkProps) => (
  <Link {...props} />
))<CategoryItemProps>`
  width: 100%;
  line-height: 44px;
  padding: 0 14px;
  font-size: 14px;
  font-weight: ${({ active }) => (active ? '600' : '400')};
  color: ${({ active }) => (active ? '#FFEACE' : '#fff')};
  background-color: ${({ active }) => (active ? '#96765D' : 'none')};
  border-radius: 10px;
  vertical-align: middle;
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #96765d;
  }

  @media (max-width: 428px) {
    font-size: 12px;
    line-height: 40px;
  }
`;

const Number = styled.span`
  font-size: 12px;
  color: inherit;
  padding-left: 4px;

  @media (max-width: 428px) {
    font-size: 10px;
  }
`;

export const CategoryList: FunctionComponent<CategoryListProps> = ({
  selectedCategory,
  categoryList,
}) => {
  return (
    <CategoryListWrapper>
      <CategoryTitleText>Category</CategoryTitleText>
      {Object.entries(categoryList).map(([name, count]) => (
        <CategoryItem
          to={`/?category=${name}`}
          active={name === selectedCategory}
          key={name}
        >
          {name}
          <Number>({count})</Number>
        </CategoryItem>
      ))}
    </CategoryListWrapper>
  );
};
