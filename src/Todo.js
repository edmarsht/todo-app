import React, { useState } from 'react'; 
import './Todo.css';
import db from './firebase'
import { Button } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { Modal } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';


import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';




const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 500,
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(10, 10, 10),
    },

    root: {
        minWidth: 278,
        display: 'inline-block',
        backgroundColor: '#EDEDED',
        margin: '0 1px',
        transform: 'scale(0.8)',
        boxShadow: theme.shadows[5],
      },

      title: {
        fontSize: 14,
      },
      pos: {
        marginBottom: 30,
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
                <h1>Edit</h1>
                <input placeholder={todo.todo} value={input} onChange={event => setInput(event.target.value)}/>
                <Button onClick={updateTodo}>Update To do </Button>
            </div>
        </Modal>
   
        



        <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
            Go 🚀
        </Typography>
        <Typography className={classes.pos} primary={todo.todo} variant="h5" component="h2">
            {todo.todo}
        </Typography>

        </CardContent>
      </CardActionArea>
      <CardActions>
        <div className="todo__edit" size="small" color="primary">
                <Button className="button__todo" onClick={e => setOpen(true)}>Edit</Button>
                <HighlightOffIcon fontSize="medium" className="icon__todo" onClick={event => db.collection('todos').doc(todo.id).delete()}></HighlightOffIcon>
            {/* with a delete event  */}
            </div>

      </CardActions>
    </Card>
        </>
    )
};


export default Todo