class Store {
    constructor(initialState = {}, reducers = {}) {
        this.state = initialState;
        this.reducers = reducers;
        this.observers = [];
    }

    dispatch(action) {
        console.group(action.type);
        console.log('%c Current state', 'color: gray', this.state);
        console.log('%c Action', 'color: orange', action);
        let newState = { ...this.state };
        for (const name in this.reducers) {
            const reducer = this.reducers[name];
            const partialState = this.state[name];
            newState[name] = reducer(partialState, action);
        }
        this.state = newState;
        console.log('%c New state', 'color: green', newState);
        console.groupEnd();
        this.notify(newState);
    }

    addObserver(fn) {
        this.observers.push(fn);
        return () => {
            this.observers = this.observers.filter(observer => observer !== fn);
        }
    }

    notify(newState) {
        this.observers.forEach(observer => observer(newState));
    }
}

const initialTodosState = {
    ids: [],
    entities: {},
}

const todosReducer = (todosState = initialTodosState, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            const todo = action.payload;
            return {
                ids: [...todosState.ids, todo.id],
                entities: {
                    ...todosState.entities,
                    [todo.id]: todo,
                },
            };
        default:
            return todosState;
    }
}

const reducers = {
    todos: todosReducer,
};

const store = new Store({}, reducers);

const action = { type: 'DUMMY' };

const action2 = {
    type: 'ADD_TODO',
    payload: {
        id: 'todo-1',
        desc: 'Walk your dog',
    },
};

store.addObserver(newState => console.log('Observer: ', newState));
store.dispatch(action);
store.dispatch(action2);


store.addObserver(function(newState) {
    const list = document.querySelector('ul.todo-list');
    list.innerHTML = '';
    const { todos } = newState;
    todos.ids.forEach((id) => {
        const item = document.createElement('li');
        item.innerText = todos.entities[id].desc;
        list.appendChild(item);
    })
});

let lastID = 2;
const addTodoBtn = document.getElementById('add-todo');
const newTodoField = document.getElementById('new-todo');
addTodoBtn.addEventListener('click', function(event) {
    const action = {
        type: 'ADD_TODO',
        payload: {
            id: `todo-${++lastID}`,
            desc: newTodoField.value,
        },
    };
    store.dispatch(action);
});

