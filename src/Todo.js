import { List, ListItem, ListItemText } from '@material-ui/core'
import React from 'react';
import './Todo.css';


function Todo({ todo }) {
    return (
        <List className="todo__list">
            <ListItem>
                <ListItemText primary={todo} secondary="🚀" />
            </ListItem>
        </List>
    )
}

export default Todo
