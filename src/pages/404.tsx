import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { graphql, Link } from 'gatsby';
import { GlobalStyle } from 'components/Common/GlobalStyle';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import useLoading from 'hooks/useLoading';
import LoadingAnimation from 'components/Common/LoadingAnimation';

type ErrorPageProps = {
  data: {
    file: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData;
      };
    };
  };
};

const NotFoundPageWrapper = styled.div`
  display: flex;
  height: calc(var(--vh, 1vh) * 100);
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NotFoundText = styled.div`
  font-size: 36px;
  font-weight: 600;
  line-height: 52px;
  margin-bottom: 20px;

  @media (max-width: 1024px) {
    font-size: 32px;
    line-height: 46px;
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

const GoToMainButton = styled(Link)`
  font-size: 20px;
  font-weight: 600;
  color: #c25450;
  text-decoration: underline;
  line-height: 30px;
  margin-bottom: 30px;

  @media (max-width: 1024px) {
    font-size: 20px;
    line-height: 30px;
  }

  @media (max-width: 428px) {
    font-size: 14px;
    line-height: 20px;
  }

  @media (max-width: 320px) {
    font-size: 12px;
    line-height: 18px;
  }
`;

const NotFoundImage = styled(GatsbyImage)`
  width: 360px;
  height: 360px;

  @media (max-width: 1024px) {
    width: 280px;
    height: 280px;
  }

  @media (max-width: 428px) {
    width: 200px;
    height: 200px;
  }

  @media (max-width: 320px) {
    width: 160px;
    height: 160px;
  }
`;

const NotFoundPage: FunctionComponent<ErrorPageProps> = ({
  data: {
    file: {
      childImageSharp: { gatsbyImageData },
    },
  },
}) => {
  const loading = useLoading();

  return (
    <>
      {loading && <LoadingAnimation />}
      <NotFoundPageWrapper>
        <GlobalStyle />
        <NotFoundText>페이지를 찾을 수 없습니다.</NotFoundText>
        <GoToMainButton to="/">홈으로 돌아가기</GoToMainButton>
        <NotFoundImage image={gatsbyImageData} alt="404 not found" />
      </NotFoundPageWrapper>
    </>
  );
};

export default NotFoundPage;

export const getErrorImage = graphql`
  query getErrorImage {
    file(name: { eq: "error" }) {
      childImageSharp {
        gatsbyImageData(width: 360, height: 360)
      }
    }
  }
`;
