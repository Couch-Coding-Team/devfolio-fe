import React from "react";
import {
  FormControl,
  // InputAdornment,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
// import SearchIcon from "@material-ui/icons/Search";
import Query from "./Query";
import TECH_STACKS_QUERY from "../queries/techStacks";

const Search = ({ handleFilter, handleReset }) => {
  const classes = useStyles();

  const handleSelectChange = (event, value) => {
    if (!value.length) {
      handleReset();
    } else {
      const projIds = value.flatMap((val) =>
        val.projects.map((proj) => proj.id)
      );
      const filtered = [...new Set([...projIds])]; // remove duplicates
      handleFilter(filtered);
    }
  };
  return (
    <Query query={TECH_STACKS_QUERY}>
      {({ data: { techStacks } }) => {
        return (
          <FormControl variant="outlined" className={classes.formControl}>
            <Autocomplete
              multiple
              fullWidth
              filterSelectedOptions
              id="tags-outlined"
              options={techStacks}
              getOptionLabel={(option) => option.name}
              onChange={handleSelectChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="기술스택으로 검색해보세요"
                  // 이슈: https://github.com/mui-org/material-ui/issues/18650
                  // InputProps={{
                  //   ...params.InputProps,
                  //   startAdornment: (
                  //     <InputAdornment position="start">
                  //       <SearchIcon />
                  //     </InputAdornment>
                  //   ),
                  // }}
                />
              )}
              ChipProps={{ color: "primary" }}
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
