import React from "react";
import { makeStyles, Tabs, Tab } from "@material-ui/core";
import Search from "../../components/Search";
import { ORDER_BY } from "../../constants";

const useStyles = makeStyles((theme) => ({
  bar: {
    display: "flex",
    gap: "180px",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      gap: "0",
      flexDirection: "column-reverse",
    },
  },
  tabs: {
    margin: "36px 0",
    [theme.breakpoints.down("sm")]: {
      margin: "24px",
      width: "100%",
    },
  },
}));

const ListHeader = ({
  handleTabChange,
  handleFilter,
  handleFilterReset,
  filterIds,
  tabValue,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.bar}>
      <Tabs
        value={tabValue}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleTabChange}
        aria-label="project list order"
        className={classes.tabs}
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
  );
};

export default ListHeader;
