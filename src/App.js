import React, { useState, useEffect } from 'react'; 
import './App.css';
import { Button } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { Input } from '@material-ui/core';
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase';



function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');


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
    <div className="App">
      <header className="App">
        <a className="App">
          <h1>Hey There 🧠</h1>

          <form>
            <FormControl>
              <InputLabel> Write a to do thing 👌</InputLabel>
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
  );
}

export default App;