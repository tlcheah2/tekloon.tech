import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ description, lang, meta, title, isBlogPost, path }) {
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
            articleImage
            url
          }
        }
      }
    `
  )

  const metaTitle = title || site.siteMetadata.title;
  const metaDescription = description || site.siteMetadata.description
  let twitterImage = site.siteMetadata.image;
  let canonical = `${site.url}`;
  if (isBlogPost) {
    meta.push({
      property: `og:type`,
      content: 'article',
    })
    twitterImage = site.siteMetadata.articleImage
    canonical += path
  }
  return (
    <Helmet defer={false}
      htmlAttributes={{
        lang,
      }}
      title={metaTitle} 
      titleTemplate={`%s`}
      link={
        canonical
          ? [
              {
                rel: "canonical",
                href: canonical,
              },
            ]
          : []
      }
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        // OpenGraph Tags
        {
          property: `og:url`,
          content: canonical,
        },
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
          content: twitterImage,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        // Twitter Card tags
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.twitterUsername,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `twitter:image`,
          content: twitterImage,
        },
      ].concat(meta)}
    >
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