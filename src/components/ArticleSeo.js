import React from "react"
import { Helmet } from "react-helmet"


export default (props) => {
    const { title, url, isBlogPost, description, datePublished, author, imageUrl, organization } = props;
    const baseSchema = [
        {
          '@context': 'http://schema.org',
          '@type': 'WebSite',
          url,
          name: title,
          alternateName: title,
        },
    ];

    const schema = isBlogPost ? [
        ...baseSchema,
        {
          '@context': 'http://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              item: {
                '@id': url,
                name: title,
                image: imageUrl,
              },
            },
          ],
        },
        {
            '@context': 'http://schema.org',
            '@type': 'BlogPosting',
            url,
            name: title,
            alternateName: title,
            headline: title,
            description,
            author: {
              '@type': 'Person',
              name: author,
            },
            publisher: {
              '@type': 'Organization',
              url: organization.url,
              logo: {
                '@type': 'ImageObject',
                url: organization.logo,
              },
              name: organization.name,
            },
            datePublished,
            dateModified: datePublished, 
            mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': 'https://tekloon.dev'
            },
            image: {
              '@type': 'ImageObject',
              url: imageUrl,
            },
          },
    ] : baseSchema;
    
    return (
        <Helmet defer={false}>
            {/* Schema.org tags */}
            <script type="application/ld+json">{JSON.stringify(schema)}</script>
        </Helmet>
    )
}