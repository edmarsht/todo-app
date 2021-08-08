<List className="todo__list">
<ListItem>
    <ListItemText className="todo" primary={todo.todo}/>
</ListItem>
<div className="todo__edit">
    <Button className="button__todo" onClick={e => setOpen(true)}>Edit</Button>
    <HighlightOffIcon className="icon__todo" onClick={event => db.collection('todos').doc(todo.id).delete()}></HighlightOffIcon>
{/* with a delete event  */}
</div>
</List>

