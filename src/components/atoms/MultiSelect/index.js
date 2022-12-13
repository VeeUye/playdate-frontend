import React, { useState } from "react";
import { useSelect } from "downshift";
import classNames from "classnames";
import PropTypes from "prop-types";
import styles from "./styles.module.css";

function MultiSelect({ friends, onChange, value }) {
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
      defaultSelectedItem: 0,
      onSelectedItemChange: ({ selectedItem }) => {
        if (!selectedItem) {
          return;
        }

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

    const pluralFriends =
      selectedItems && selectedItems.length > 1 ? "friends" : "friend";

    const buttonText =
      selectedItems && selectedItems.length
        ? `${selectedItems.length} ${pluralFriends} selected`
        : "Invite friends";

    return (
      <div>
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
                className={classNames(
                  highlightedIndex === index && styles.highlightedListItem,
                  selectedItem === item && styles.selectedListItem,
                  styles.listItem
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
                  className={styles.input}
                  checked={selectedItems.includes(item)}
                  value={item.label}
                  onChange={onChange}
                  data-testid={`option-${item.value}`}
                />
                <div>
                  <span className={styles.listItemName}>{item.label}</span>
                </div>
              </li>
            ))}
        </ul>
      </div>
    );
  }

  return <Select />;
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
