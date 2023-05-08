import React, { FunctionComponent } from 'react';
import { PostList } from 'components/Main/PostList';
import { graphql } from 'gatsby';
import { PostListItemType } from 'types/PostItem.types';
import queryString, { ParsedQuery } from 'query-string';
import { Template } from 'components/Common/Template';
import { SideNavigation } from 'components/Common/SideNavigation';
import { MainChocoBall } from 'components/Main/MainChocoBall';
import useLoading from 'hooks/useLoading';
import LoadingAnimation from 'components/Common/LoadingAnimation';

type IndexPageProps = {
  location: {
    search: string;
  };
  data: {
    site: {
      siteMetadata: {
        title: string;
        description: string;
        siteUrl: string;
      };
    };
    allMarkdownRemark: {
      edges: PostListItemType[];
    };
    file: {
      publicURL: string;
    };
  };
};

const IndexPage: FunctionComponent<IndexPageProps> = ({
  location: { search },
  data: {
    site: {
      siteMetadata: { title, description, siteUrl },
    },
    allMarkdownRemark: { edges },
    file: { publicURL },
  },
}) => {
  const parsed: ParsedQuery<string> = queryString.parse(search);
  const isMainPage: boolean =
    !parsed.category || typeof parsed.category !== 'string';
  const selectedCategory: string = isMainPage
    ? 'All'
    : (parsed.category as string);
  const loading = useLoading();

  return (
    <Template
      title={title}
      description={description}
      url={siteUrl}
      image={publicURL}
    >
      {loading && <LoadingAnimation />}
      <SideNavigation selectedCategory={selectedCategory}></SideNavigation>
      {isMainPage && <MainChocoBall />}
      <PostList selectedCategory={selectedCategory} posts={edges} />
    </Template>
  );
};

export default IndexPage;

export const getPostList = graphql`
  query getPostList {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            summary
            date(formatString: "YYYY.MM.DD.")
            categories
            thumbnail {
              childImageSharp {
                gatsbyImageData(width: 768, height: 400)
              }
            }
          }
        }
      }
    }
    file(name: { eq: "profile-image" }) {
      publicURL
    }
  }
`;
