const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const quizData = require('./quiz.json');

exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === `MarkdownRemark`) {
    const { createNodeField } = actions;
    const slug = createFilePath({ node, getNode, basePath: `pages` });
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
            }
          }
        }
      }
    `);
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const comp = node.fields.slug.startsWith('/daily-quiz') ? path.resolve(`./src/templates/Quiz.js`) : path.resolve(`./src/templates/Post.js`)
    createPage({
      path: node.fields.slug,
      component: comp,
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    })
  })
  // Create Page for all quiz Data
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