import React from "react"
import { graphql } from "gatsby"
import Layout from '../components/Layout';
import NavBar from '../components/NavBar';
import SEO from '../components/Seo';
import styles from './Post.module.css';
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';
deckDeckGoHighlightElement();

export default ({ data }) => {
    console.log('styles', styles);
    const post = data.markdownRemark;
    return (
        <>
            <NavBar />
            <SEO title={post.frontmatter.title} description={post.excerpt} />
            <Layout>
                <h1 className={styles.postTitle}>{post.frontmatter.title}</h1>
                <p className={styles.publishedDate}>Published {post.frontmatter.date}</p>
                <hr />
                <div dangerouslySetInnerHTML={{ __html: post.html }} />
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
      }
      excerpt
    }
  }
`