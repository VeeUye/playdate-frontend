import React, { useState } from "react";
import { useSelect } from "downshift";
import classNames from "classnames";
import PropTypes from "prop-types";
import styles from "./styles.module.css";

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

function MultiSelect({ friends, onChange }) {
  const onSelectedItemChange = ({ selectedItem }) => {
    if (!selectedItem) {
      return;
    }
    if (typeof onChange !== "undefined" && selectedItem) onChange(selectedItem);

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
  };

  const [selectedItems, setSelectedItems] = useState([]);
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items: friends,
    itemToString,
    selectedItem: null,
    stateReducer,
    onSelectedItemChange,
  });

  const pluralFriends = selectedItems.length > 1 ? "friends" : "friend";

  const buttonText = selectedItems.length
    ? `${selectedItems.length} ${pluralFriends} selected`
    : "Invite friends";

  return (
    <div className={styles.outer}>
      <label className={styles.label} {...getLabelProps()}>
        Invite friends:
      </label>
      <div className={styles.multiSelectButton} {...getToggleButtonProps()}>
        <span className={styles.buttonText} data-testid="button-text">
          {buttonText}
        </span>
        <span className={styles.arrow} data-testid="arrow-icon">
          {isOpen ? <>&#8593;</> : <>&#8595;</>}
        </span>
      </div>
      <ul
        {...getMenuProps()}
        className={classNames(
          { [styles.dropdownListOpen]: isOpen },
          styles.dropdownlist
        )}
      >
        {isOpen &&
          friends.map((item, index) => (
            <li
              key={`${item}${item.label}`}
              {...getItemProps({
                item,
                index,
                "aria-selected": selectedItems.includes(item),
              })}
              className={classNames(styles.listItem, {
                [styles.highlightedListItem]: highlightedIndex === index,
              })}
            >
              <input
                type="checkbox"
                className={styles.input}
                value={item.label}
                onChange={() => {}}
                checked={selectedItems.includes(item)}
                data-testid={`option-${item.value}`}
              />
              <label htmlFor={item.value} className={styles.testLabel}>
                {" "}
                <span
                  className={classNames(styles.listItemName, {
                    [styles.listItemNameSelected]: selectedItems.includes(item),
                  })}
                >
                  {item.label}
                </span>
              </label>
            </li>
          ))}
      </ul>
    </div>
  );
}

MultiSelect.propTypes = {
  friends: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MultiSelect;
