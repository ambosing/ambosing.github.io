module.exports = {
  siteMetadata: {
    title: `제멋대로맛 초코볼`,
    description: `이것저것 하고 싶은 개발자의 기술블로그`,
    author: `Ambosing`,
    siteUrl: 'https://ambosing.github.io/',
  },
  plugins: [
    `gatsby-plugin-react-helmet-async`,
    {
      resolve: 'gatsby-plugin-typescript',
      options: {
        isTSX: true,
        allExtensions: true,
      },
    },
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `contents`,
        path: `${__dirname}/contents`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/static`,
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: ['auto', 'webp'],
          quality: 100,
          placeholder: 'blurred',
        },
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-autolink-headers`,
          {
            resolve: 'gatsby-remark-smartypants',
            options: {
              dashes: 'oldschool',
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 768,
              quality: 100,
              withWebp: true,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {},
          },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'nofollow',
            },
          },
          {
            resolve: 'gatsby-plugin-canonical-urls',
            options: {
              siteUrl: 'https://ambosing.github.io/',
              stripQueryString: true,
            },
          },
          'gatsby-plugin-advanced-sitemap',
          {
            resolve: 'gatsby-plugin-robots-txt',
            options: {
              host: 'https://ambosing.github.io/',
              sitemap: 'https://ambosing.github.io/sitemap.xml',
              policy: [{ userAgent: '*', allow: '/' }],
            },
          },
          {
            resolve: 'gatsby-plugin-manifest',
            options: {
              icon: 'static/favicon/favicon-96x96.png',
            },
          },
          {
            resolve: 'gatsby-plugin-google-gtag',
            options: {
              trackingIds: ['G-R0Z17QLND3'],
            },
          },
          {
            resolve: `gatsby-plugin-feed`,
            options: {
              query: `
								{
									site {
										siteMetadata {
											title
											description
											author
											siteUrl
										}
									}
								}
							`,
              feeds: [
                {
                  title: `제멋대로맛 초코볼`,
                  output: '/rss.xml',
                  setup: options => ({
                    ...options,
                    site_url: 'https://ambosing.github.io/',
                    description: `이것저것 하고 싶은 개발자의 기술블로그`,
                    author: `Ambosing`,
                  }),
                  serialize: ({ query: { site, allMarkdownRemark } }) => {
                    return allMarkdownRemark.edges.map(edge => {
                      return Object.assign({}, edge.node.frontmatter, {
                        title: edge.node.frontmatter.title,
                        description: edge.node.frontmatter.summary,
                        date: edge.node.frontmatter.date,
                        url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                        guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                        author: site.siteMetadata.author,
                        custom_elements: [
                          { 'content:encoded': edge.node.html },
                        ],
                      });
                    });
                  },
                  query: `
										{
											allMarkdownRemark(
												sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
											) {
												edges {
													node {
														html
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
																	gatsbyImageData
																}
															}
														}
													}
												}
											}
										}
									`,
                },
              ],
            },
          },
        ],
      },
    },
  ],
};
