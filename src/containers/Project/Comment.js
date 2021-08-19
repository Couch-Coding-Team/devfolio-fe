import React from "react";
import moment from "moment";
import { Grid, Avatar } from "@material-ui/core";

const Comment = ({ data }) => {
  const {
    users_permissions_user: { username, avatar_url },
    comment,
    updated_at,
  } = data;
  return (
    <Grid container wrap="nowrap" spacing={2}>
      <Grid item>
        <Avatar alt={username} src={avatar_url} />
      </Grid>
      <Grid item xs zeroMinWidth>
        <h4 style={{ margin: 0 }}>{username}</h4>
        <p>{comment}</p>
        <p style={{ color: "gray" }}>
          {moment(updated_at).format("YYYY-MM-DD HH:mm")}
        </p>
      </Grid>
    </Grid>
  );
};

export default Comment;
