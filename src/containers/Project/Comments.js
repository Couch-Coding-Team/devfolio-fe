import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { Divider, TextField, Button } from "@material-ui/core";
import Comment from "./Comment";

const Comments = ({ data }) => {
  const handleSubmit = () => {
    // useMutation(CREATE_COMMENT);
  };
  return (
    <>
      <h3>Comments</h3>
      <Divider />
      {data.map((el, index) => (
        <div style={{ margin: "30px 0" }}>
          <Comment data={el} />
          {index + 1 !== data.length && <Divider variant="fullWidth" />}
        </div>
      ))}
      <div style={{ display: "flex" }}>
        <TextField
          id="outlined-multiline-static"
          multiline
          rows="3"
          defaultValue="Default Value"
          // className={classes.textField}
          margin="normal"
          variant="outlined"
          style={{ width: "100%" }}
        />
        <Button color="secondary" variant="outlined" onClick={handleSubmit}>
          댓글달기
        </Button>
      </div>
    </>
  );
};

export default Comments;
