import React, { useEffect, useState } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import Hero from "../containers/Projects/Hero";
import Layout from "../components/Layout";
import { ListBody, ListHeader } from "../containers/Projects";
import { ORDER_BY } from "../constants";

const IndexPage = (props) => {
  const {
    data: {
      allStrapiProject: { edges: projectEdges },
    },
  } = useStaticQuery(query);
  const [tabValue, setTabValue] = useState(ORDER_BY[0].value);
  const [filterIds, setFilter] = useState([]); // 검색값
  const [results, setResults] = useState([]);

  useEffect(() => {
    setInitialList();
  }, []);

  const setInitialList = () => {
    setResults(projectEdges.map((edge) => edge.node));
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    const newLabel = ORDER_BY.find((el) => el.value === newValue).label;
    // window.gtag("event", `${newLabel} 클릭`);
  };

  const handleFilter = (techIds) => {
    setFilter(techIds);
    const filtered = results.filter(
      (proj) =>
        proj.tech_stacks.findIndex((tech) => techIds.includes(tech.id)) > -1
    );
    setResults(filtered);
  };

  const handleFilterReset = () => {
    setFilter([]);
    setInitialList();
  };

  return (
    <Layout location={props.location}>
      <Container>
        <Hero />
      </Container>
      <Root>
        <Container>
          <ListHeader
            handleTabChange={handleTabChange}
            tabValue={tabValue}
            handleFilter={handleFilter}
            handleFilterReset={handleFilterReset}
            filterIds={filterIds}
          />
          <ListBody
            tabValue={tabValue}
            filterIds={filterIds}
            projects={results}
          />
        </Container>
      </Root>
    </Layout>
  );
};

const Root = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.grey[50], // #f9f9f9
  paddingBottom: "36px",
}));

const query = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allStrapiProject(filter: { is_hidden: { eq: true } }) {
      edges {
        node {
          strapiId
          title
          description
          owner_name
          owner_github_url
          project_github_url
          tech_stacks {
            id
            name
          }
          thumbnail_url
          view_count
          published_at
          reactions {
            id
          }
          comments {
            id
          }
        }
      }
    }
  }
`;
export default IndexPage;
