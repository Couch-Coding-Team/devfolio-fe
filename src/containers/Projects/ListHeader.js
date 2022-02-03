import React from "react";
import { Tabs, Tab } from "@mui/material";
import { styled } from "@mui/material/styles";
import Search from "../../components/Search";
import { ORDER_BY } from "../../constants";

const ListHeader = ({
  handleTabChange,
  handleFilter,
  handleFilterReset,
  filterIds,
  tabValue,
}) => {
  return (
    <Root>
      <div className="searchBar">
        <Tabs
          value={tabValue}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleTabChange}
          aria-label="project list order"
          className="tabs"
        >
          {ORDER_BY.map((order) => (
            <Tab key={order.value} label={order.label} value={order.value} />
          ))}
        </Tabs>
        <Search
          filterIds={filterIds}
          handleFilter={handleFilter}
          handleReset={handleFilterReset}
        />
      </div>
    </Root>
  );
};

export default ListHeader;

const Root = styled("div")(({ theme }) => ({
  ".searchBar": {
    display: "flex",
    gap: "180px",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      gap: "0",
      flexDirection: "column-reverse",
    },
  },
  ".tabs": {
    margin: "36px 0",
    [theme.breakpoints.down("md")]: {
      margin: "24px",
      width: "100%",
    },
  },
}));
