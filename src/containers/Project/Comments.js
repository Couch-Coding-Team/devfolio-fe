import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { Divider, TextField, Button, makeStyles } from "@material-ui/core";
import Comment from "./Comment";

const Comments = ({ data }) => {
  const classes = useStyles();
  const handleSubmit = () => {
    // useMutation(CREATE_COMMENT);
  };
  return (
    <div className={classes.root}>
      <h3>Comments</h3>
      <Divider />
      {data.map((el, index) => (
        <div className={classes.commentRow}>
          <Comment data={el} />
          {index + 1 !== data.length && <Divider variant="fullWidth" />}
        </div>
      ))}
      <div className={classes.inputRow}>
        <TextField
          fullWidth
          multiline
          rows="3"
          variant="outlined"
          // defaultValue="Default Value"
          placeholder="응원의 메세지나 궁금한 점을 남겨주세요."
        />
        <Button color="secondary" variant="contained" onClick={handleSubmit}>
          댓글달기
        </Button>
      </div>
    </div>
  );
};

export default Comments;

const useStyles = makeStyles({
  root: {
    margin: "70px 0",
    "& .MuiOutlinedInput-root": {
      borderRadius: 0,
    },
  },
  commentRow: { margin: "30px 0" },
  inputRow: { display: "flex", gap: "8px" },
});
