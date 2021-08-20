import React, { useState } from "react";
import { Divider, TextField, Button, makeStyles } from "@material-ui/core";
import Comment from "./Comment";

const Comments = ({ data, submitData, projectId, userId }) => {
  const classes = useStyles();
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    submitData({
      variables: {
        input: {
          data: {
            project: projectId,
            users_permissions_user: userId,
            comment: value,
          },
        },
      },
    });
  };

  return (
    <div className={classes.root}>
      <h3>Comments</h3>
      <Divider />
      {data.map((el, index) => (
        <div key={index} className={classes.commentRow}>
          <Comment data={el} />
          {index + 1 !== data.length && <Divider variant="fullWidth" />}
        </div>
      ))}
      <form className={classes.inputRow} noValidate autoComplete="off">
        <TextField
          fullWidth
          multiline
          rows="3"
          variant="outlined"
          placeholder="응원의 메세지나 궁금한 점을 남겨주세요."
          onChange={(e) => setValue(e.target.value)}
          // defaultValue="Default Value"
        />
        <Button color="secondary" variant="contained" onClick={handleSubmit}>
          댓글달기
        </Button>
      </form>
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