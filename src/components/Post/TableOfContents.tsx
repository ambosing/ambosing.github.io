import styled from '@emotion/styled';
import React, { FunctionComponent, useEffect, useState } from 'react';

type TableOfContentsProps = {
  contents: string;
};

type FixTableProps = {
  fixTable: boolean;
};

const TOC = styled.div<FixTableProps>`
  position: ${({ fixTable }) => (fixTable ? 'fixed' : 'absolute')};
  width: 260px;
  top: ${({ fixTable }) => (fixTable ? '80px' : '580px')};
  left: calc(82%);
  padding: 10px;
  border-left: 2px solid #dfe0df;

  p,
  li {
    padding: 2px 0;
    color: grey;
  }

  a {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    width: 100%;
    font-size: 16px;
    color: grey;
    line-height: 1.8em;
    padding-left: 12px;
    border-radius: 10px;
    transition: background-color 0.3s ease;
  }

  a:hover {
    background-color: #fff8ee;
  }

  ul {
    list-style: none;
  }

  ul ul {
    margin-left: 18px;
  }

  ul ul li a {
    font-size: 14px;
    color: #979797;
  }

  ul ul ul {
    display: none;
  }

  @media (max-width: 1512px) {
    display: none;
  }
`;

export const TableOfContents: FunctionComponent<TableOfContentsProps> = ({
  contents,
}) => {
  const [fixTable, setFixTable] = useState(false);
  const handleScroll = () => {
    window.scrollY >= 500 ? setFixTable(true) : setFixTable(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <TOC
      fixTable={fixTable}
      dangerouslySetInnerHTML={{ __html: contents }}
    ></TOC>
  );
};
