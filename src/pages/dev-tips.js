import React from 'react';
import Layout from '../components/Layout';
import NavBar from '../components/NavBar';
import Seo from '../components/Seo';
import { StaticQuery, graphql } from 'gatsby';
import Tag from '../components/Tag';
import PostListItem from '../components/PostListItem';

const DevTips = () => (
  <>
    <NavBar />
    <Seo />
    <Layout>
      <h2>Dev Tips</h2>
      <p>Dev tips is a series of short tips from my daily learning.</p>
      <StaticQuery
        query={graphql`
          query {
            allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/dev-tips/"}}) {
              distinct(field: frontmatter___tags)
              nodes {
                id
                fields {
                  slug
                }
                frontmatter {
                  cover
                  date
                  description
                  tags
                  title
                }
              }
            }
          }`
        }
        render={(data) => {
          return (
            <>
              {/* <div className="tag-container">
                {data.allMarkdownRemark.distinct.map((tag) => <Tag tag={tag} isSmall={true} />)}
              </div> */}
              {data.allMarkdownRemark.nodes.map((node) =>
                <PostListItem
                  key={node.id.toString()}
                  slug={node.fields.slug}
                  title={node.frontmatter.title}
                  tags={node.frontmatter.tags}
                  publishedDate={node.frontmatter.date}
                />
              )}
            </>
          )   
          }
        }
      />
    </Layout>
  </>
);

export default DevTips
