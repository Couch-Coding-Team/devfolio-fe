import React from "react";
import moment from "moment";
import { Grid, Avatar } from "@material-ui/core";

const Comment = ({ data }) => {
  const { user_id, project_id, comment, published_at } = data;
  return (
    <Grid container wrap="nowrap" spacing={2}>
      <Grid item>
        <Avatar
          alt="Remy Sharp"
          src={
            "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
          }
        />
      </Grid>
      <Grid justifyContent="left" item xs zeroMinWidth>
        <h4 style={{ margin: 0, textAlign: "left" }}>{user_id[0].name}</h4>
        <p style={{ textAlign: "left" }}>{comment}</p>
        <p style={{ textAlign: "left", color: "gray" }}>
          {moment(published_at).format("YYYY-MM-DD")}
        </p>
      </Grid>
    </Grid>
  );
};

export default Comment;
