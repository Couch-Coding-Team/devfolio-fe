import React, { useContext, useState } from "react";
import moment from "moment";
import {
  Grid,
  Avatar,
  TextField,
  Button,
  makeStyles,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { UserContext } from "../../AppContext";

const Comment = ({ data, deleteComment, updateComment }) => {
  const classes = useStyles();

  const userId = useContext(UserContext)?.id;
  const {
    users_permissions_user: { id: authorId, username, avatar_url },
    comment,
    updated_at,
    id: commentId,
  } = data;

  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(undefined);

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    updateComment({
      variables: {
        id: commentId,
        comment: value,
      },
    });
    handleEdit();
  };

  const handleDelete = () => {
    deleteComment({
      variables: {
        id: commentId,
      },
    });
  };

  return (
    <Grid container wrap="nowrap" spacing={2}>
      <Grid item>
        <Avatar alt={username} src={avatar_url} />
      </Grid>
      <Grid item xs zeroMinWidth>
        <h4 className={classes.username}>{username}</h4>
        {edit ? (
          <form className={classes.inputRow} noValidate autoComplete="off">
            <TextField
              fullWidth
              multiline
              rows="2"
              variant="outlined"
              onChange={(e) => setValue(e.target.value)}
              defaultValue={comment}
              className={classes.input}
            />
            <Button
              color="secondary"
              variant="contained"
              onClick={handleSubmit}
            >
              수정하기
            </Button>
          </form>
        ) : (
          <>
            <p>{comment}</p>
            <p className={classes.date}>
              {moment(updated_at).format("YYYY-MM-DD HH:mm")}
            </p>
          </>
        )}
      </Grid>
      {userId?.toString() === authorId && (
        <Grid item>
          <EditIcon onClick={handleEdit} />
          <DeleteIcon onClick={handleOpen} />
        </Grid>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          댓글을 삭제하시겠습니까?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            삭제
          </Button>
          <Button onClick={handleClose} color="primary">
            취소
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default Comment;

const useStyles = makeStyles({
  username: { margin: 0 },
  inputRow: { margin: "1em 0" },
  input: { marginBottom: "1em" },
  date: { color: "gray" },
});
