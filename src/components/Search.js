import React, { useState } from "react";
import { FormControl, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Autocomplete } from "@mui/material";
import { graphql, useStaticQuery } from "gatsby";

const Search = ({ filterIds, handleFilter, handleReset }) => {
  const {
    allStrapiTechStack: { nodes: techStacks },
  } = useStaticQuery(data);
  const [filters, setFilters] = useState(filterIds);

  const handleSelectChange = (event, techStacks) => {
    if (!techStacks.length) {
      setFilters([]);
      handleReset();
    } else {
      const newFilterIds = techStacks.map((tech) => {
        // window.gtag("event", "기술스택 검색", { tech_name: tech.name });
        return tech.strapiId;
      });
      setFilters(newFilterIds);
      handleFilter(newFilterIds);
    }
  };

  return (
    <Root>
      <FormControl variant="outlined" className="searchForm">
        <Autocomplete
          multiple
          fullWidth
          filterSelectedOptions
          id="tags-outlined"
          options={techStacks}
          getOptionLabel={(option) => option.name}
          value={techStacks.filter(
            (tech) => filters?.includes(tech.strapiId) // 필터와 id 일치하는 기술스택 객체
          )}
          onChange={handleSelectChange}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              placeholder="기술스택으로 검색해보세요"
            />
          )}
          ChipProps={{ color: "primary" }}
        />
      </FormControl>
    </Root>
  );
};

export default Search;

const data = graphql`
  query {
    allStrapiTechStack {
      totalCount
      nodes {
        strapiId
        name
        projects {
          id
        }
      }
    }
  }
`;

const Root = styled("div")(({ theme }) => ({
  ".searchForm": {
    flex: "1 1 auto",
    "& .MuiOutlinedInput-root": {
      borderRadius: "100px",
      paddingLeft: "24px",
    },
    "& .MuiAutocomplete-endAdornment": {
      display: "none",
    },
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
}));
