/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: 'Tek Loon',
    description: `Tek Loon's Blog for Javascript and Web Development`,
    author: 'Tek Loon',
    url: 'https://tekloon.dev',
    siteUrl: 'https://tekloon.dev',
    twitterUsername: `@TekLoonCheah`,
    image: 'https://tekloon.dev/images/tekloon.jpg',
    articleImage: 'https://tekloon.dev/images/article-stock-photo.jpeg',
    organization: {
      name: 'Tek Loon Blog',
      url: 'https://tekloon.dev',
      logo: 'https://tekloon.dev/icons/icon-512x512.png',
    },
  },
  plugins: [
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
            },
          },
          {
            resolve: `gatsby-remark-highlight-code`,
          },
        ],
      },
    },
    `gatsby-plugin-dark-mode`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `TekLoon`,
        short_name: `TekLoon`,
        start_url: `/`,
        background_color: `black`,
        theme_color: `black`,
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: `standalone`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-107667557-2",
      },
    },
    `gatsby-plugin-sitemap`,
  ],

}
