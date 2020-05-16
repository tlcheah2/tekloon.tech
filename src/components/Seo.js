import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ description, lang, meta, title, isBlogPost }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            twitterUsername
            image
          }
        }
      }
    `
  )

  const metaTitle = title || site.siteMetadata.title;
  const metaDescription = description || site.siteMetadata.description
  let twitterImage = site.siteMetadata.image;
  if (isBlogPost) {
    meta.push({
      property: `og:type`,
      content: 'article',
    })
    twitterImage = site.siteMetadata.articleImage
  }
  return (
    <Helmet
      htmlAttributes={{
        lang: lang || 'en',
      }}
      title={metaTitle} 
      titleTemplate={`%s`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        // OpenGraph Tags
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:image`,
          content: site.siteMetadata.image,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        // Twitter Card tags
        // {
        //   name: `twitter:card`,
        //   content: `summary_large_image`,
        // },
        // {
        //   name: `twitter:creator`,
        //   content: site.siteMetadata.twitterUsername,
        // },
        // {
        //   name: `twitter:site`,
        // },
        // {
        //   name: `twitter:title`,
        //   content: title,
        // },
        // {
        //   name: `twitter:description`,
        //   content: metaDescription,
        // },
        // {
        //   name: `twitter:image`,
        //   content: site.siteMetadata.image,
        // },
      ].concat(meta)}
    >
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={site.siteMetadata.twitterUsername} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={twitterImage} />
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO