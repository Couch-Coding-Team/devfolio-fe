import React, { useState } from "react";
import { FormControl, makeStyles, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import Query from "./Query";
import TECH_STACKS_QUERY from "../queries/techStacks";

const Search = ({ filterIds, handleFilter, handleReset }) => {
  const classes = useStyles();
  const [filters, setFilters] = useState(filterIds);

  const handleSelectChange = (event, techStacks) => {
    if (!techStacks.length) {
      handleReset();
    } else {
      const newFilterIds = techStacks.map((tech) => {
        window.gtag("event", `${tech.name} 검색`);
        return tech.id;
      });
      setFilters(newFilterIds);
      handleFilter(newFilterIds);
    }
  };

  return (
    <Query query={TECH_STACKS_QUERY} limit={50} sort="name:asc">
      {({
        data: {
          techStacks,
          techStacksConnection: {
            aggregate: { count },
          },
        },
        onLoadMore,
      }) => {
        const handleScroll = (event) => {
          if (techStacks.length === count) return;
          const listboxNode = event.target;
          // 스크롤 끝에 닿을때
          if (
            listboxNode.scrollTop + listboxNode.clientHeight ===
            listboxNode.scrollHeight
          ) {
            onLoadMore("techStacks", techStacks.length);
          }
        };
        return (
          <FormControl variant="outlined" className={classes.formControl}>
            <Autocomplete
              multiple
              fullWidth
              filterSelectedOptions
              id="tags-outlined"
              options={techStacks}
              getOptionLabel={(option) => option.name}
              defaultValue={techStacks.filter(
                (tech) => filters?.includes(tech.id) // 필터와 id 일치하는 기술스택 객체
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
              ListboxProps={{ onScroll: handleScroll }}
            />
          </FormControl>
        );
      }}
    </Query>
  );
};

export default Search;

const useStyles = makeStyles((theme) => ({
  formControl: {
    flex: "1 1 auto",
    "& .MuiOutlinedInput-root": {
      borderRadius: "100px",
      paddingLeft: "24px",
    },
    "& .MuiAutocomplete-endAdornment": {
      display: "none",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));
