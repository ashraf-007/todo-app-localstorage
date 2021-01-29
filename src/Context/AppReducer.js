export const AppReducer = (state , action) => {

switch (action.type) {
    case "TOGGLE_COMPLETED" : 
    return {...state , todos : state.todos.map((todo)=> todo._id === action.payload._id ? action.payload : todo ),
         todoCount : state.todoCount
    }
    case "GET_TODOS" :
    return { ...state , todos : action.payload };
    case "ADD_TODO" :
        return { ...state , todos : [  action.payload , ...state.todos ] ,
            todoCount : state.todoCount  };
    case "DELETE_TODO" : 
    return { ...state , todos : state.todos.filter((todo)=> todo._id !== action.payload )  }
     case "DELETE_ALL":
         return {...state , todos : state.todos.filter((todo)=> !todo.completed) }
    case "CONTROL_TODOS" : 
        return {...state , todos : action.payload };
        case "NEW" :
            return { ...state , todos : action.payload }
    default: 
    return state;
}
}