import React, { useState, useEffect } from 'react'; 
import './App.css';
import { Button } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { Input } from '@material-ui/core';
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase';


import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    bottom: 0, 
    paddingTop: 115,
  },
  color: {
    backgroundColor: 'black',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const classes = useStyles();


  useEffect(() => {
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))
    })
  }, []);



  
  const addTodo = (event => {
      event.preventDefault(); // Will stop the refresh
      db.collection('todos').add({
        todo: input, 
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      setTodos( [...todos, input]);
      setInput(''); // Clear up the input after clicking "add todo" button
  })

  return (
    <>
    <div className="App">
      <header className="App">
        <a className="App">
          <h1>Hey There 🧠</h1>

          <form>
            <FormControl>
              <InputLabel> Your to do 👌</InputLabel>
              <Input value={input} onChange={event => setInput(event.target.value)}/>
            </FormControl>
            <Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">
            add Todo
            </Button>
          </form>

          <ul>
            {todos.map(todo => (
              <Todo todo={todo}/>
            ))}
          </ul>
        </a>
      </header>
    </div>
   
    <div className={classes.root}>
    <AppBar className={classes.color} position="fixed">
        <Toolbar>
        <Typography variant="h6" className={classes.title}>
            To do list App
        </Typography>
        <Button color="inherit">Made by Edouard Toulet 🚀 </Button>
        </Toolbar>
    </AppBar>
    </div>
  </>
  );
}

export default App;