import LoadingAnimation from 'components/Common/LoadingAnimation';
import { SideNavigation } from 'components/Common/SideNavigation';
import { Template } from 'components/Common/Template';
import { CommentWidget } from 'components/Post/CommentWidget';
import { PostContent } from 'components/Post/PostContent';
import { PostHead } from 'components/Post/PostHead';
import { TableOfContents } from 'components/Post/TableOfContents';
import { graphql } from 'gatsby';
import useLoading from 'hooks/useLoading';
import React, { FunctionComponent } from 'react';
import { PostPageItemType } from 'types/PostItem.types';

type PostTemplateProps = {
  data: {
    allMarkdownRemark: {
      edges: PostPageItemType[];
    };
  };
  location: {
    href: string;
  };
};

const PostTemplate: FunctionComponent<PostTemplateProps> = function ({
  data: {
    allMarkdownRemark: { edges },
  },
  location: { href },
}) {
  const {
    node: {
      html,
      tableOfContents,
      frontmatter: {
        title,
        summary,
        date,
        categories,
        thumbnail: {
          childImageSharp: { gatsbyImageData },
          publicURL,
        },
      },
    },
  } = edges[0];

  const loading = useLoading();

  return (
    <Template title={title} description={summary} url={href} image={publicURL}>
      {loading && <LoadingAnimation />}
      <SideNavigation selectedCategory={categories[0]}></SideNavigation>
      <PostHead
        title={title}
        date={date}
        categories={categories}
        thumbnail={gatsbyImageData}
      />
      <TableOfContents contents={tableOfContents} />
      <PostContent html={html} />
      <CommentWidget />
    </Template>
  );
};

export default PostTemplate;

export const queryMarkdownDataBySlug = graphql`
  query queryMarkdownDataBySlug($slug: String) {
    allMarkdownRemark(filter: { fields: { slug: { eq: $slug } } }) {
      edges {
        node {
          html
          tableOfContents
          frontmatter {
            title
            summary
            date(formatString: "YYYY.MM.DD.")
            categories
            thumbnail {
              childImageSharp {
                gatsbyImageData
              }
              publicURL
            }
          }
        }
      }
    }
  }
`;
