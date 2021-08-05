import { makeStyles } from "@material-ui/core";

const IconLabel = ({ icon, label }) => {
  const classes = useStyles();
  return (
    <div className={classes.verticalAlign}>
      <div className={classes.icon}>{icon}</div>
      <div>{label}</div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  verticalAlign: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  icon: {
    "& svg": {
      display: "block",
      height: "100%",
    },
  },
}));

export default IconLabel;
