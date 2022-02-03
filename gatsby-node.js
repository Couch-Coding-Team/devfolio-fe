const path = require(`path`);

const makeRequest = (graphql, request) =>
  new Promise((resolve, reject) => {
    // Query for nodes to use in creating pages.
    resolve(
      graphql(request).then((result) => {
        if (result.errors) {
          reject(result.errors);
        }

        return result;
      })
    );
  });

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  const getProjects = makeRequest(
    graphql,
    `
    {
      allStrapiProject {
        edges {
          node {
            strapiId
          }
        }
      }
    }
    `
  ).then((result) => {
    // Create pages for each project.
    result.data.allStrapiProject.edges.forEach(({ node }) => {
      createPage({
        path: `/project/${node.strapiId}`,
        component: path.resolve(`src/templates/project.js`),
        context: {
          id: node.strapiId,
        },
      });
    });
  });

  // Query for projects nodes to use in creating pages.
  return getProjects;
};
