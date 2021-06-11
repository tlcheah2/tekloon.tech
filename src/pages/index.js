import React from "react";
import NavBar from '../components/NavBar';
import PostListItem from '../components/PostListItem';
import { graphql } from 'gatsby';
import Seo from '../components/Seo';

export default ({ data }) => (
  <>
    <NavBar />
    <Seo />
    {data.allMarkdownRemark.edges.filter(({ node }) => !node.frontmatter.status || (node.frontmatter.status && node.frontmatter.status.name === 'Published')).map(({ node }) =>
      <PostListItem
        key={node.id.toString()}
        slug={node.fields.slug}
        title={node.frontmatter.title}
        tags={node.frontmatter.tags}
        keywords={node.frontmatter.keywords}
        publishedDate={node.frontmatter.date}
      />
    )}
  </>
);

export const query = graphql`
    query {
      allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}) {
          edges {
            node {
              id
              frontmatter {
                title
                date
                keywords {
                  name
                }
                tags
                status {
                  name
                }
              }
              fields {
                  slug
              }
            }
          }
        }
    }
`;