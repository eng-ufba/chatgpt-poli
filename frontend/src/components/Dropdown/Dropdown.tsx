import React, { ReactElement, useEffect, useState } from "react";
import './Dropdown.scss';
import { Icon } from "../Icons/Icon";

type DropdownProps = {
    options: Array<string>,
    selected: string,
    setSelected: React.Dispatch<React.SetStateAction<string>>,
    clickOutsideEmit: boolean
}

export const Dropdown = ({options, selected, setSelected, clickOutsideEmit}: DropdownProps): ReactElement => {
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(() => false);
    const [isFocus, setIsFocus] = useState<boolean>(() => false);

    const toggleDropdown = (): void => {
        setIsDropdownOpen((previousValue) => !previousValue);
    }

    const onOptionClick = (option: string): void => {
        setSelected(option);
        setIsDropdownOpen(() => false);
    }

    const enabledFocus = (): void => {
        setIsFocus(() => true);
    }

    const disableFocus = (): void => {
        setIsFocus(() => false);
    }

    useEffect(() => {
        if (isFocus === false) {
            setIsDropdownOpen(() => false);
        }
    }, [clickOutsideEmit]);

    return <div className="dropdown" onMouseLeave={disableFocus} onMouseEnter={enabledFocus}>
        <div className={isDropdownOpen ? 'selected-container selected-container-open' : 'selected-container'} onClick={toggleDropdown}>
            <p className="text">
                {selected}
            </p>
            <Icon.ArrowDown />
        </div>
        <div className={isDropdownOpen ? 'options-list options-list-open' : 'options-list'}>
            {options.map((option, index) => {
                return <div className="option-item" key={'option-' + index} onClick={() => onOptionClick(option)}>
                    {option}
                </div>
            })}
        </div>
    </div>
}