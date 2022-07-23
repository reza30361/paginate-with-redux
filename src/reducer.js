export const todos = (
    state = {
      data: [],
      paginate: [],
      error: "",
      page:1,
      show:[]
    },
    action
  ) => {
    switch (action.type) {
      case "getData":
        return action.payload;
      case "removeItem":
        return action.payload;
      case "changePage":
        return action.payload;
      case "changeShow":
        return action.payload;
      case "emptyShow":
        return action.payload;
      case "changeStatus":
        return action.payload;
      case "error":
        return action.payload;
      
      default:
        return state;
    }
  };