import React, { useContext } from "react";
import moment from "moment";
import { Grid, Avatar } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { UserContext } from "../../AppContext";

const Comment = ({ data, deleteComment }) => {
  const userId = useContext(UserContext).id;
  const {
    users_permissions_user: { id: authorId, username, avatar_url },
    comment,
    updated_at,
    id: commentId,
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
      {userId.toString() === authorId && (
        <Grid item>
          <DeleteIcon
            onClick={() => {
              deleteComment({
                variables: {
                  id: commentId,
                },
              });
            }}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default Comment;
