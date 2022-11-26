import React from "react";
import { useCombobox, useMultipleSelection } from "downshift";
import classNames from "classnames";
import styles from "./downshift-multi-select.module.css";

function MultipleComboBoxExample() {
  const friends = [
    { value: "FaoLwxoE2ub6qYMZRACNiNEth9OH", label: "Chief Wiggum" },
    { value: "t0fvq3bA77Z7X3F1a7LkeCOBipne", label: "Ned Flanders" },
    { value: "5B7vtdeoWXWtjdE69cNZoMM35tDz", label: "Mrs Muntz" },
    { value: "IjGY7FYdqX6KbJ0yaje1qfPQLAJX", label: "Luann Van Houten" },
    { value: "hUt11WDzxEYMvT3Tyh9kGm1JVaHw", label: "Mrs Powell" },
  ];

  const initialSelectedItems = [friends[0]];

  function getFilteredFriends(selectedItems, inputValue) {
    const lowerCasedInputValue = inputValue.toLowerCase();

    return friends.filter(function filterInvitableFriend(friend) {
      return (
        !selectedItems.includes(friend) &&
        friend.label.toLowerCase().includes(lowerCasedInputValue)
      );
    });
  }

  function MultipleComboBox() {
    const [inputValue, setInputValue] = React.useState("");
    const [selectedItems, setSelectedItems] =
      React.useState(initialSelectedItems);
    const items = React.useMemo(
      () => getFilteredFriends(selectedItems, inputValue),
      [selectedItems, inputValue]
    );
    const {
      getSelectedItemProps,
      getDropdownProps,
      // addSelectedItem,
      removeSelectedItem,
    } = useMultipleSelection({
      selectedItems,
      onStateChange({ selectedItems: newSelectedItems, type }) {
        switch (type) {
          case useMultipleSelection.stateChangeTypes
            .SelectedItemKeyDownBackspace:
          case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownDelete:
          case useMultipleSelection.stateChangeTypes.DropdownKeyDownBackspace:
          case useMultipleSelection.stateChangeTypes.FunctionRemoveSelectedItem:
            setSelectedItems(newSelectedItems);
            break;
          default:
            break;
        }
      },
    });
    const {
      isOpen,
      getToggleButtonProps,
      getLabelProps,
      getMenuProps,
      getInputProps,
      highlightedIndex,
      getItemProps,
      selectedItem,
    } = useCombobox({
      items,
      itemToString(item) {
        return item ? item.label : "";
      },
      defaultHighlightedIndex: 0, // after selection, highlight the first item.
      selectedItem: null,
      stateReducer(state, actionAndChanges) {
        const { changes, type } = actionAndChanges;

        switch (type) {
          case useCombobox.stateChangeTypes.InputKeyDownEnter:
          case useCombobox.stateChangeTypes.ItemClick:
          case useCombobox.stateChangeTypes.InputBlur:
            return {
              ...changes,
              ...(changes.selectedItem && {
                isOpen: true,
                highlightedIndex: 0,
              }),
            };
          default:
            return changes;
        }
      },
      onStateChange({
        inputValue: newInputValue,
        type,
        selectedItem: newSelectedItem,
      }) {
        switch (type) {
          case useCombobox.stateChangeTypes.InputKeyDownEnter:
          case useCombobox.stateChangeTypes.ItemClick:
            setSelectedItems([...selectedItems, newSelectedItem]);
            break;

          case useCombobox.stateChangeTypes.InputChange:
            setInputValue(newInputValue);

            break;
          default:
            break;
        }
      },
    });

    return (
      <div className={styles.selectOuter}>
        <div className={styles.selectInner}>
          <label className={styles.label} {...getLabelProps()}>
            Invite friends:
          </label>
          <div className={styles.div1}>
            {selectedItems.map(function renderSelectedItem(
              selectedItemForRender,
              index
            ) {
              return (
                <span
                  className={styles.div2}
                  key={`selected-item-${index}`}
                  {...getSelectedItemProps({
                    selectedItem: selectedItemForRender,
                    index,
                  })}
                >
                  {selectedItemForRender.label}
                  <span
                    className={styles.span1}
                    onClick={(e) => {
                      e.stopPropagation();
                      removeSelectedItem(selectedItemForRender);
                    }}
                  >
                    &#10005;
                  </span>
                </span>
              );
            })}
            <div className={styles.inputWrapper}>
              <input
                placeholder="Select friends to invite..."
                className={styles.input}
                {...getInputProps(
                  getDropdownProps({ preventKeyAction: !isOpen })
                )}
              />
              <button
                aria-label="toggle menu"
                className={styles.button}
                type="button"
                {...getToggleButtonProps()}
              >
                &#8595;
              </button>
            </div>
          </div>
        </div>
        <ul {...getMenuProps()} className={styles.ul}>
          {isOpen &&
            items.map((item, index) => (
              <li
                className={classNames(
                  highlightedIndex === index && styles.highlight,
                  selectedItem === item && styles.selected,
                  styles.selected2
                )}
                key={`${item.value}${index}`}
                {...getItemProps({ item, index })}
              >
                <span>{item.label}</span>
              </li>
            ))}
        </ul>
      </div>
    );
  }

  return <MultipleComboBox />;
}

export default MultipleComboBoxExample;
