import "./App.css";
// import axios from 'axios';
import { FaTimesCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import {
  getData,
  removeItem,
  changePage,
  changeShow,
  emptyShow,
  changeStatus,
} from "./action";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const { data, paginate, page, show } = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getData());
  }, []);
  useEffect(() => {
    dispatch(changeShow());
  }, [data, page]);
  useEffect(() => {
    dispatch(emptyShow());
  }, [show]);
  return (
    <div className="container  my-3">
      <div className="grid lg:grid-cols-9 grid-cols-6 text-center border bg-slate-50">
        <div className="p-3 font-bold border-r">#</div>
        <div className="p-3 font-bold border-r">ID</div>
        <div className="col-span-2 lg:col-span-5 p-3 font-bold border-r">
          Title
        </div>
        <div className="md:p-3 font-normal py-3 text-sm md:font-bold  md:text-center md:text-base border-r">
          Completed
        </div>
        <div className="p-3 font-bold">delete</div>
      </div>
      {show.map((item, index) => {
        return (
          <div
            key={item.id}
            className="grid lg:grid-cols-9 grid-cols-6 text-center hover:bg-slate-100 hover:shadow-md
           transition-all duration-200
          border-b border-l border-r border-slate-200 hover:border-transparent"
          >
            <div className="p-2 border-r border-inherit font-bold">
              {(page - 1) * 10 + (index + 1)}
            </div>

            <div className="p-2 border-r border-inherit">{item.id}</div>
            <div className="col-span-2 lg:col-span-5 text-left p-2 border-r border-inherit">
              {item.title}
            </div>
            <div
              className={
                item.completed
                  ? "text-green-600 capitalize font-bold p-2 border-r border-inherit cursor-pointer"
                  : "text-red-600 capitalize font-bold p-2 border-r border-inherit cursor-pointer"
              }
              onClick={() => dispatch(changeStatus(index))}
            >
              {item.completed.toString()}
            </div>
            <div
              className="p-2 flex justify-center items-center cursor-pointer text-red-600"
              onClick={() => dispatch(removeItem(index))}
            >
              <FaTimesCircle className="" />
            </div>
          </div>
        );
      })}
      <div className="flex md:justify-center my-6 items-center gap-1 flex-wrap ">
        {paginate.map((item, index) => {
          return (
            <button
              key={index}
              className={
                page === index + 1 ? "btn-default btn-active" : "btn-default"
              }
              onClick={() => dispatch(changePage(index))}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default App;
