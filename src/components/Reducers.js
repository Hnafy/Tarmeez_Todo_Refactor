export function todoReducer(state, action) {
    switch (action.type) {
        case "add":
            if (action.payload.input.trim() !== "") {
                const updatedTodos = [
                    ...state,
                    {
                        id: action.payload.id + 1,
                        text: action.payload.input,
                        check: false,
                        categories: ["All", "Not Achieved"],
                    },
                ];
                return updatedTodos;
            }
            break;
        case "deleteAll":
            return [];
        case "storage":
            return action.payload.todoStorage === null
                ? state
                : action.payload.todoStorage;
        case "delete":
            let deletedTodo = state.filter(
                (el) => el.id !== action.payload.index
            );
            return deletedTodo;
        case "toggle":
            let toggledTodo = state.map((item) => {
                if (item.id === action.payload.index) {
                    if (!item.check) {
                        return {
                            ...item,
                            check: true,
                            categories: ["All", "Achieved"],
                        };
                    } else {
                        return item;
                    }
                } else {
                    return item;
                }
            });
            return toggledTodo;
        default:
            break;
    }
}
