import React, { useState } from "react";
import Tick from "../../assets/images/tick.png";
import Cross from "../../assets/images/close.png";
import EditPic from "../../assets/images/pen.png";
import DeletePic from "../../assets/images/recycle-bin.png";

function ItemsList(props) {
  const [editLabel, setEditLabel] = useState("");
  const [editId, setEditId] = useState(null);

  function handleCheckboxClick(id) {
    const newItems = props.items.map((item) => {
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
    props.getItemsValue(reorderedItems);
  }

  const deleteToDo = (id) => {
    const newItems = [...props.items];
    const updatedItems = newItems.filter((item) => item.id !== id);
    props.getItemsValue(updatedItems);
  };

  const handleEditLabel = (e) => {
    setEditLabel(e.target.value);
  };

  const handleEdit = (id, label) => {
    setEditId(id);
    setEditLabel(label);
  };

  const handleSaveEdit = () => {
    const updatedTasks = props.items.map((item) => {
      if (item.id === editId) {
        return {
          ...item,
          label: editLabel,
        };
      }
      return item;
    });
    props.getItemsValue(updatedTasks);
    setEditId(null);
    setEditLabel("");
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditLabel("");
  };

  return (
    <div className="h-4/5">
      <div className="flex flex-col w-full">
        <ul className=" space-y-4">
          {props.items.map((item, index) => {
            return (
              <li
                key={index}
                className="flex justify-between px-3 py-5 w-full rounded-2xl shadow-lg bg-white/50"
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
                  <div className="flex justify-between w-full py-5">
                    <label
                      htmlFor={item.id}
                      className="flex text-md xl:text-lg font-normal w-4/6 md:w-5/6 h-6 hover:text-blue-400"
                    >
                      <input
                        id={item.id}
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => handleCheckboxClick(item.id)}
                        className="accent-white h-5 w-5 xl:h-6 xl:w-6 mr-2 rounded-xl"
                      />
                      <p
                        className="w-full h-auto "
                        style={{
                          textDecoration: item.isChecked
                            ? "line-through"
                            : "none",
                          color: item.isChecked ? "gray" : "black",
                        }}
                      >
                        <span className="break-all h-full">{item.label}</span>
                      </p>
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
                        onClick={() => deleteToDo(item.id)}
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
    </div>
  );
}

export default ItemsList;
