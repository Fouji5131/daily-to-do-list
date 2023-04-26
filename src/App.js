import React, { useState } from "react";
import Card from "./components/ui/card";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);

  const noOfItems = items.length;

  const handleInputChange = (event) => {
    if (event.target.value == null) {
      return;
    }
    setInputValue(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setItems([...items, inputValue]);
    setInputValue("");
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const deleteAllToDos = () => {
    setItems([]);
  };

  const isDisabled = inputValue.trim() === "";

  const buttonStyle = isDisabled
    ? {
        cursor: "not-allowed",
        backgroundColor: "gray",
      }
    : {};

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-light-blue">
      <Card>
        <div className="space-y-5">
          <h1 className="font-bold text-4xl">Daily To Do List</h1>
          <form
            onSubmit={handleFormSubmit}
            className="flex justify-between p-2 border-2 border-gray-100 rounded-md space-x-5"
          >
            <input
              className="w-3/4 focus:outline-none"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Add new list item"
            />
            <button
              className="px-5 py-2 rounded-md bg-blue-400 text-white"
              style={buttonStyle}
              type="submit"
              disabled={isDisabled}
            >
              Add
            </button>
          </form>

          <div className="flex flex-col h-52 px-5 space-y-2 border-b-2 border-gray-100">
            {items.map((item, index) => {
              return (
                <label
                  htmlFor="box"
                  key={index}
                  id={index}
                  className="flex text-lg font-normal h-6 hover:text-blue-400"
                >
                  <input
                    id="box"
                    key={index}
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    className="accent-green-500 h-6 w-6 mr-5 rounded-2xl"
                  />
                  <h1
                    style={{
                      textDecoration: isChecked ? "line-through" : "none",
                      color: isChecked ? "gray" : "black",
                    }}
                  >
                    {item}
                  </h1>
                </label>
              );
            })}
          </div>

          <div className="flex flex-row justify-between px-5 text-gray-400">
            <h1>{noOfItems} Total</h1>
            <h1>{noOfItems} Completed</h1>
            <h1>{noOfItems} Uncompleted</h1>
            <button onClick={deleteAllToDos}>Clear All</button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default App;
