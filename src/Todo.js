import React, { useState } from 'react'; 
import './Todo.css';
import db from './firebase'
import { Button } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { List, ListItem, ListItemText, Modal } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

function Todo({ todo }) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState();
 
    const handleOpen = () => {
        setOpen(true);
    };

    const updateTodo = () => {
        db.collection('todos').doc(todo.id).set({
        todo: input
        }, { merge: true})
        setOpen(false);
    }

    return (
        <>
        <Modal open={open} onClose={e => setOpen(false)}>
            <div className={classes.paper}>
                <h1>Open</h1>
                <input placeholder={todo.todo} value={input} onChange={event => setInput(event.target.value)}/>
                <Button onClick={updateTodo}>Update To do </Button>
            </div>
        </Modal>
        <List className="todo__list">
            <ListItem>
                <ListItemText primary={todo.todo} secondary="🚀" />
            </ListItem>
                <Button onClick={e => setOpen(true)}>Edit</Button>
                <HighlightOffIcon onClick={event => db.collection('todos').doc(todo.id).delete()}></HighlightOffIcon>
            {/* with a delete event  */}
        </List>
        </>
    )
}

export default Todo
