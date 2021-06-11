import React from "react"
import { graphql } from "gatsby"
import moment from 'moment'
import Layout from '../components/Layout';
import NavBar from '../components/NavBar';
import SEO from '../components/Seo';
import ArticleSeo from '../components/ArticleSeo';
import SubscribeForm from '../components/SubscribeForm';
import styles from './Post.module.css';
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';
deckDeckGoHighlightElement();

export default ({ data }) => {
  const post = data.markdownRemark;
  const { siteMetadata } = data.site;
  const { slug } = post.fields;
  const formattedPublishedDate = moment(post.frontmatter.date).format('YYYY-MM-DD');
  return (
    <>
      <SEO
        title={post.frontmatter.title}
        description={post.excerpt}
        isBlogPost={true}
        path={slug}
        postCoverImage={post.frontmatter.cover}
      />
      <ArticleSeo
        title={post.frontmatter.title}
        description={post.excerpt}
        url={`${siteMetadata.url}${slug}`}
        isBlogPost={true}
        datePublished={formattedPublishedDate}
        author={siteMetadata.author}
        imageUrl={siteMetadata.image}
        organization={siteMetadata.organization}
        postCoverImage={post.frontmatter.cover}
      />
      <NavBar />
      <Layout>
        <h1 className={styles.postTitle}>{post.frontmatter.title}</h1>
        <p className={styles.publishedDate}>Published {formattedPublishedDate}</p>
        <hr />
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <SubscribeForm />
      </Layout>
    </>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
        cover
      }
      excerpt
      fields {
        slug
      }
    }
    site {
      siteMetadata {
        title
        description
        author
        url
        siteUrl
        twitterUsername
        image
        organization {
          url
          logo
          name
        }
      }
    } 
  }
`