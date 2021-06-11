const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const quizData = require('./quiz.json');

exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === `MarkdownRemark`) {
    const { createNodeField } = actions;
    let slug;
    // If there is no file absolute path, means the input is not from local file
    if (!node.fileAbsolutePath) {
      // use slug form 
      slug = `/blog/${node.frontmatter.title.toString().toLowerCase().replace('/ /g', '-')}`;
    } else {
      // Create slug from file path
      slug = createFilePath({ node, getNode, basePath: `pages` });
    }
    if (slug.startsWith('/blog/')) {
      const pathBasename = path.basename(slug);
      createNodeField({
        node,
        name: `slug`,
        value: pathBasename,
      })
    } else if (slug.startsWith('/daily-quiz/')) {
      // const pathBasename = path.basename(slug);
      createNodeField({
        node,
        name: `slug`,
        value: slug,
      })
    }
  }

}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
      query {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
      `);
  result.data.allMarkdownRemark.edges.forEach(({ node }, index) => {
    // If node.fields is null, then it could be the data from Notion CMS
    let slug;
    if (!node.fields || !node.fields.slug) {
      // convert title to slug
      slug = node.frontmatter.title.toString().toLowerCase().replace('/ /g', '-');
    } else {
      slug = node.fields.slug;
    }

    const comp = path.resolve(`./src/templates/Post.js`);
    createPage({
      path: slug,
      component: comp,
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug,
      },
    })
  })
  // // Create Page for all quiz Data
  quizData.forEach((quiz, index) => {
    const slug = `/daily-quiz/quiz-${index + 1}`;
    createPage({
      path: slug,
      component: path.resolve(`./src/templates/Quiz.js`),
      context: {
        slug,
        quizNumber: index + 1,
        ...quiz,
      }
    })
  });
}