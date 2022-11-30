import React, { useState } from "react";
import { useSelect } from "downshift";
import classNames from "classnames";
import PropTypes from "prop-types";

function DownshiftMultiSelect({ friends, onChange, value }) {
  function itemToString(item) {
    return item ? item.label : "";
  }
  function stateReducer(state, actionAndChanges) {
    const { changes, type } = actionAndChanges;
    switch (type) {
      case useSelect.stateChangeTypes.MenuKeyDownEnter:
      case useSelect.stateChangeTypes.MenuKeyDownSpaceButton:
      case useSelect.stateChangeTypes.ItemClick:
        return {
          ...changes,
          isOpen: true, // keep menu open after selection.
          highlightedIndex: state.highlightedIndex,
        };
      default:
        return changes;
    }
  }

  function Select() {
    const [selectedItems, setSelectedItems] = useState([]);
    const {
      isOpen,
      selectedItem,
      getToggleButtonProps,
      getLabelProps,
      getMenuProps,
      highlightedIndex,
      getItemProps,
    } = useSelect({
      items: friends,
      itemToString,
      stateReducer,
      selectedItem: value,
      onSelectedItemChange: ({ selectedItem }) => {
        if (!selectedItem) {
          return;
        }

        console.log(selectedItem, "---selecteditem");

        const index = selectedItems.indexOf(selectedItem);

        if (index > 0) {
          setSelectedItems([
            ...selectedItems.slice(0, index),
            ...selectedItems.slice(index + 1),
          ]);
        } else if (index === 0) {
          setSelectedItems([...selectedItems.slice(1)]);
        } else {
          setSelectedItems([...selectedItems, selectedItem]);
        }
      },
    });
    const buttonText = value.length
      ? `${value.length} friends selected`
      : "Friends";

    return (
      <div>
        <div className="w-72 flex flex-col gap-1">
          <label {...getLabelProps()}>Invite friends:</label>
          <div
            className="p-2 bg-white flex justify-between cursor-pointer"
            {...getToggleButtonProps()}
          >
            <span>{buttonText}</span>
            <span className="px-2">{isOpen ? <>&#8593;</> : <>&#8595;</>}</span>
          </div>
        </div>
        <ul
          {...getMenuProps()}
          className="absolute w-72 p-0 bg-white shadow-md max-h-80 overflow-scroll"
        >
          {isOpen &&
            friends.map((item, index) => (
              <li
                className={classNames(
                  highlightedIndex === index && "bg-blue-300",
                  selectedItem === item && "font-bold",
                  "py-2 px-3 shadow-sm flex gap-3 items-center"
                )}
                key={`${item.value}${index}`}
                {...getItemProps({
                  item,
                  index,
                  "aria-selected": selectedItems.includes(item),
                })}
              >
                <input
                  type="checkbox"
                  className="h-5 w-5"
                  checked={selectedItem.includes(item.label)}
                  value={item.label}
                  onChange={onChange}
                />
                <div className="flex flex-col">
                  <span className="text-sm text-gray-700">{item.label}</span>
                </div>
              </li>
            ))}
        </ul>
      </div>
    );
  }

  return <Select />;
}

DownshiftMultiSelect.propTypes = {
  friends: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default DownshiftMultiSelect;
