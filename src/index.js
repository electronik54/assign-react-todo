import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//returns todo element
function Item(props) {
    return (
        <li className={props.isDone ? 'entryDone' : 'entry'}>

            <label>
                <input type="checkbox" checked={props.isDone} onChange={props.onChange}></input>
                {props.isDone ? "DONE" : "Not Done"}
            </label>
            <h2>
                {props.value}
            </h2>
            <p>
                {props.description}
            </p>
            <button onClick={props.deleteItem}>remove</button>
        </li>
    );
}

//top level component
class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [
                {
                    name: "WORK"
                    , isDone: false
                    , description: "Call the customer for update in his case."
                }
                , {
                    name: "SCHOOL"
                    , isDone: false
                    , description: "Start a reseach for the user experience assignment"
                }
                , {
                    name: "FAMILY"
                    , isDone: false
                    , description: "Take mom and dad to dinner"
                }
                , {
                    name: "FRIENDS"
                    , isDone: false
                    , description: "Skype with my besties about good news"
                }
                , {
                    name: "TRAVEL"
                    , isDone: false
                    , description: "Visit Russia!!"
                }
                , {
                    name: "BOOKS"
                    , isDone: false
                    , description: "Reread man are from mars women from venus"
                }
                , {
                    name: "SPORT"
                    , isDone: false
                    , description: "Join Seneca Sports community"
                }
                , {
                    name: "PERSONAL PHONE CALLS"
                    , isDone: false
                    , description: "call susan for recipe,call pratek for congrats"
                }
                , {
                    name: "BIRTHDAY REMIND"
                    , isDone: false
                    , description: "Bills bday is cominnggg"
                }
                , {
                    name: "INTERNSHIP"
                    , isDone: false
                    , description: "Contact employers by linkedin"
                }
            ]
            , addTodo: {
                name: ""
                , description: ""
            }
            , allComplete: false
        };
    }

    //for checkbox
    handleChanged(i) {
        const todos = [...this.state.todos];//create copy of array
        todos[i].isDone = !todos[i].isDone;//make changes
        const allComplete = !this.state.todos.some(td => td.isDone === false);//check if all is done
        this.setState({//use set state to notify react of changes
            todos: todos
            , allComplete: allComplete
        });
    }

    //for remove button
    deleteItem(i) {
        let todos = [...this.state.todos];
        todos = todos.filter(name => name !== todos[i]);
        this.setState({
            todos: todos
        });
    }

    //to set new todo name
    setname(e) {
        e.preventDefault();//to prevent form submission and reload the page
        let addTodo = { ...this.state.addTodo };
        addTodo.name = e.target.value;
        this.setState({
            addTodo: addTodo
        });
    }

    //set new todo description
    setdesc(e) {
        e.preventDefault();
        let addTodo = { ...this.state.addTodo };
        addTodo.description = e.target.value;
        this.setState({
            addTodo: addTodo
        });
    }

    //add new todo to todos array
    addToArray(e) {
        e.preventDefault();
        let state = { ...this.state };
        state.todos.push({
            name: state.addTodo.name
            , isDone: false
            , description: state.addTodo.description
        });

        this.setState({
            todos: state.todos
            , addTodo: state.addTodo
        });

    }

    render() {

        return (
            <article>
                <Items //pass data and parameters to this component in props

                    newEntry={this.state.newEntry}

                    setname={(evt) => this.setname(evt)}
                    setdesc={(evt) => this.setdesc(evt)}

                    todos={this.state.todos}
                    handleChanged={i => this.handleChanged(i)}
                    deleteItem={i => this.deleteItem(i)}
                    addToArray={(evt) => this.addToArray(evt)}
                />
                <div className={this.state.allComplete ? "popup" : "hidden"}>
                    <p>All tasks done!!</p>
                </div>
            </article>
        );

    }
}

class Items extends React.Component {

    renderTodo(todo, num) {
        return (
            <Item
                isDone={todo.isDone}
                key={num}
                onChange={() => this.props.handleChanged(num)}
                deleteItem={() => this.props.deleteItem(num)}
                value={todo.name}
                description={todo.description}
            />
        );
    }

    render() {
        return (
            <ul className="list">
                {
                    this.props.todos.map((itm, i) =>
                        this.renderTodo( itm, i)
                    )
                }
                <li>
                    <form onSubmit={e => { this.props.addToArray(e) }}>
                            <input type="text" data-type="name" onChange={e => this.props.setname(e)} placeholder="Name"></input>
                            <input type="text" data-type="description" onChange={e => this.props.setdesc(e)} placeholder="Description"></input>
                        <input type="submit" value="Add Todo"></input>
                    </form>
                </li>
            </ul>
        );
    }
}

// ========================================

ReactDOM.render(
    <Application />,
    document.getElementById('root')
);
