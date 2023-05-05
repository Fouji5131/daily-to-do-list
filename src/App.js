import React, { useEffect, useState } from "react";
import Card from "./components/ui/card";

import DeletePic from "./assets/images/recycle-bin.png";
import EditPic from "./assets/images/pen.png";
import Tick from "./assets/images/tick.png";
import Cross from "./assets/images/close.png";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);
  const [editLabel, setEditLabel] = useState("");
  const [editId, setEditId] = useState(null);

  const noOfItems = items.length;
  const noOfCompleted = items.filter((item) => item.isChecked).length;
  const noOfUnCompleted = noOfItems - noOfCompleted;
  const progress =
    items.length == 0 ? "0" : Math.trunc((noOfCompleted / noOfItems) * 100);

  const isDisabled = inputValue.trim() === "";
  const buttonStyle = isDisabled
    ? {
        cursor: "not-allowed",
        backgroundColor: "gray",
      }
    : {};

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedItems = localStorage.getItem("items");
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  // Save tasks to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
    console.log(items);
  }, [items]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setItems((prevItems) => [
      ...prevItems,
      {
        id: Date.now(),
        label: inputValue,
        completed: false,
        isChecked: false,
      },
    ]);
    setInputValue("");
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  function handleCheckboxClick(id) {
    const newItems = items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          completed: !item.completed,
          isChecked: !item.isChecked,
        };
      }
      return item;
    });

    const uncheckedItems = newItems.filter((item) => !item.isChecked);
    const checkedItems = newItems.filter((item) => item.isChecked);
    const reorderedItems = [...uncheckedItems, ...checkedItems];
    setItems(reorderedItems);
  }

  const deleteAllToDos = () => {
    setItems([]);
  };

  const deleteToDo = (id) => {
    const newItems = [...items];
    newItems.splice(id, 1);
    // console.log(newItems);
    setItems(newItems);
  };

  const handleEditLabel = (e) => {
    setEditLabel(e.target.value);
  };

  const handleEdit = (id, label) => {
    setEditId(id);
    setEditLabel(label);
  };

  const handleSaveEdit = () => {
    const updatedTasks = items.map((item) => {
      if (item.id === editId) {
        return {
          ...item,
          label: editLabel,
        };
      }
      return item;
    });
    setItems(updatedTasks);
    setEditId(null);
    setEditLabel("");
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditLabel("");
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center  bg-blue-300">
      <Card>
        <div className="flex flex-col justify-between w-full h-full xl:w-1/2 font-mono p-5 rounded-3xl shadow-2xl bg-white">
          <div className="space-y-5">
            <h1 className="font-bold text-3xl sm:text-4xl xl:text-5xl text-center font-bouncy ">
              Daily To Do List
            </h1>

            <form
              onSubmit={handleFormSubmit}
              className="flex justify-between p-1 xl:p-2 border-2 border-blue-300 rounded-2xl space-x-5"
            >
              <input
                className="w-3/4 focus:outline-none bg-transparent placeholder:text-black/50"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Add new list item"
              />
              <button
                className="px-2 py-1 xl:px-5 xl:py-2 rounded-xl bg-blue-300 text-white"
                style={buttonStyle}
                type="submit"
                disabled={isDisabled}
              >
                Add
              </button>
            </form>
          </div>

          <div className="flex flex-col items-center space-y-5 text-black">
            <div className="w-full border-b-2 border-blue-300"></div>
            <div className="">
              <div className="grid md:grid-cols-2 md:gap-x-28">
                <h1>
                  Total: <span className="font-bold">{noOfItems}</span>
                </h1>
                <h1>
                  Completed: <span className="font-bold">{noOfCompleted}</span>
                </h1>
                <h1>
                  Uncompleted:{" "}
                  <span className="font-bold">{noOfUnCompleted}</span>
                </h1>
                <h1>
                  Progress: <span className="font-bold">{progress}%</span>
                </h1>
              </div>
            </div>
            <button
              className="w-2/4 xl:w-1/4 py-0 xl:px-2 xl:py-0 rounded-md bg-blue-300 text-white hover:scale-125"
              onClick={deleteAllToDos}
            >
              Clear All
            </button>
          </div>
        </div>

        <div
          className="flex flex-col overflow-y-auto overflow-x-auto w-full h-full xl:w-1/2 p-5 rounded-3xl shadow-2xl bg-white"
          style={
            {
              // boxShadow: "inset 0px 0px 36px 0px rgba(0, 0, 0, 0.3)",
            }
          }
        >
          <ul className=" space-y-4">
            {items.map((item, index) => {
              return (
                <li
                  key={index}
                  className="flex justify-between px-3 py-5 w-full rounded-2xl shadow-lg bg-blue-300"
                >
                  {editId === item.id ? (
                    <div className="flex justify-between w-full">
                      <input
                        className="w-4/5 pl-1 focus:outline-none bg-white/20 rounded-md"
                        value={editLabel}
                        onChange={handleEditLabel}
                      />
                      <div className="space-x-4">
                        <button
                          className="hover:scale-125"
                          onClick={handleSaveEdit}
                        >
                          <img className="w-4 h-4" src={Tick} alt="" />
                        </button>
                        <button
                          className="hover:scale-125"
                          onClick={handleCancelEdit}
                        >
                          <img className="w-4 h-4" src={Cross} alt="" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between w-full">
                      <label
                        htmlFor={item.id}
                        className="flex text-md xl:text-lg font-normal h-6 hover:text-blue-400"
                      >
                        <input
                          id={item.id}
                          type="checkbox"
                          checked={item.completed}
                          onChange={() => handleCheckboxClick(item.id)}
                          className="accent-white h-5 w-5 xl:h-6 xl:w-6 mr-2 rounded-xl"
                        />
                        <h1
                          // className={testCheck(item)}
                          style={{
                            textDecoration: item.isChecked
                              ? "line-through"
                              : "none",
                            color: item.isChecked ? "gray" : "black",
                          }}
                        >
                          {item.label}
                        </h1>
                      </label>

                      <div className="space-x-4">
                        <button
                          className="hover:scale-125"
                          onClick={() => handleEdit(item.id, item.label)}
                        >
                          <img className="w-5 h-5" src={EditPic} alt="" />
                        </button>

                        <button
                          className="hover:scale-125"
                          onClick={() => deleteToDo(index)}
                        >
                          <img className="w-5 h-5" src={DeletePic} alt="" />
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </Card>
    </div>
  );
}

export default App;
