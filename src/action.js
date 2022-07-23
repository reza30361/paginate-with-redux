import axios from "axios";
export const getData = () => async (dispatch, getState) => {
  try {
    const { data } = await axios("https://jsonplaceholder.typicode.com/todos");

    const Paginate = data.filter((item, index) => index % 10 === 0);
    dispatch({
      type: "getData",
      payload: { ...getState().todos, data: data, paginate: [...Paginate] },
    });
  } catch (error) {
    dispatch({
      type: "error",
      payload: { ...getState().todos, error: error.message },
    });
  }
};

export const removeItem = (index) => (dispatch, getState) => {
  const { data, page } = { ...getState().todos };
  data.splice((page - 1) * 10 + index, 1);

  dispatch({
    type: "removeItem",
    payload: { ...getState().todos, data: [...data] },
  });
};
export const changePage = (index) => (dispatch, getState) => {
  dispatch({
    type: "changePage",
    payload: {
      ...getState().todos,
      page: index + 1,
      show: [...getState().todos.data].slice(index * 10, (index + 1) * 10),
    },
  });
};
export const changeShow = () => (dispatch, getState) => {
  const { page, paginate, data } = { ...getState().todos };
  if (Math.ceil(data.length / 10) < paginate.length) {
    paginate.pop();
  }
  dispatch({
    type: "changeShow",
    payload: {
      ...getState().todos,
      show: [...getState().todos.data].slice((page - 1) * 10, page * 10),
      paginate: [...paginate],
    },
  });
};
export const emptyShow = () => (dispatch, getState) => {
  let { show, page } = { ...getState().todos };
  if (show.length == 0 && page > 1) {
    page--;
  }
  dispatch({
    type: "emptyShow",
    payload: { ...getState().todos, page: page },
  });
};
export const changeStatus = (index) => (dispatch, getState) => {
  const { data, page } = { ...getState().todos };
  data[(page - 1) * 10 + index] = {
    ...data[(page - 1) * 10 + index],
    completed: !data[(page - 1) * 10 + index].completed,
  };

  dispatch({
    type: "changeStatus",
    payload: { ...getState().todos, data: [...data] },
  });
};
