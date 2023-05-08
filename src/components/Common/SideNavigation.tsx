import styled from '@emotion/styled';
import {
  CategoryList,
  CategoryListProps,
} from 'components/SideNav/CategoryList';
import { Introduction } from 'components/SideNav/Introduction';
import { SideBarContext } from 'contexts/SideBarContext';
import { graphql, useStaticQuery } from 'gatsby';
import React, {
  FunctionComponent,
  useEffect,
  useContext,
  useMemo,
} from 'react';
import { PostListItemType } from 'types/PostItem.types';
import { Header } from './Header';

type NavigationOpenProps = {
  isOpen: boolean;
};

type NavigationProps = {
  selectedCategory: string;
};

const NavigationBar = styled.nav<NavigationOpenProps>`
  position: fixed;
  left: 0;
  top: 0;
  width: 220px;
  height: calc(var(--vh, 1vh) * 100);
  z-index: 99;
  overflow-y: scroll;
  background-color: #ab8b71;
  box-shadow: 2px 0px 6px rgba(0, 0, 0, 0.1);
  -ms-overflow-style: none;
  scrollbar-width: none;
  transition: left 0.5s ease;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 1024px) {
    z-index: 102;
    left: ${({ isOpen }) => (isOpen ? '0' : '-220px')};
    box-shadow: none;
  }
`;

const Background = styled.div<NavigationOpenProps>`
  display: none;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 101;

  @media (max-width: 1024px) {
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  }
`;

export const SideNavigation: FunctionComponent<NavigationProps> = ({
  selectedCategory,
}) => {
  const { isOpen, setOpen } = useContext(SideBarContext) || {};
  const closeNavigationBar = () => setOpen!(false);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'scroll';
  }, [isOpen]);
  useEffect(() => {
    setOpen && setOpen(false);
  }, [selectedCategory]);

  const datas = useStaticQuery(graphql`
    query getSidebarDatas {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              categories
            }
          }
        }
      }
      file(name: { eq: "profile-image" }) {
        childImageSharp {
          gatsbyImageData(width: 120, height: 120)
        }
      }
    }
  `);

  const categoryList = useMemo(
    () =>
      datas.allMarkdownRemark.edges.reduce(
        (
          list: CategoryListProps['categoryList'],
          {
            node: {
              frontmatter: { categories },
            },
          }: PostListItemType,
        ) => {
          categories.forEach((category: string) => {
            if (list[category] === undefined) list[category] = 1;
            else list[category]++;
          });
          list['All']++;

          return list;
        },
        { All: 0 },
      ),
    [],
  );

  return (
    <>
      <Header
        profileImage={datas.file.childImageSharp.gatsbyImageData}
      ></Header>
      <NavigationBar isOpen={isOpen ? isOpen : false}>
        <Introduction
          profileImage={datas.file.childImageSharp.gatsbyImageData}
        />
        <CategoryList
          selectedCategory={selectedCategory}
          categoryList={categoryList}
        />
      </NavigationBar>
      <Background
        isOpen={isOpen ? isOpen : false}
        onClick={closeNavigationBar}
      ></Background>
    </>
  );
};
