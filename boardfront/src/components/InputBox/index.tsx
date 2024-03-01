import {
    ChangeEvent,
    Dispatch,
    KeyboardEvent,
    SetStateAction,
    forwardRef,
} from "react";

import "./style.css";

// interface : Input Box Component Properties
interface Props {
    label: string;
    type: "text" | "password";
    placeholder: string;
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
    error: boolean;

    icon?: string;
    message?: string;

    onButtonClick?: () => void;
    onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
}
// component : Input Box
const InputBox = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
    // state : properties //
    const { label, type, placeholder, value, error } = props;
    const { icon, message, onButtonClick, onKeyDown } = props;
    const { setValue } = props;

    // event handler //
    // Input Value Change Event
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        //const value = event.target.value;
        const { value } = event.target;
        setValue(value);
    };

    // Input KeyDown Event
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (!onKeyDown) return;
        onKeyDown(event);
    };
    return (
        <div className="inputbox">
            <div className="inputbox-label">{label}</div>
            <div
                className={
                    error ? "inputbox-container-error" : "inputbox-container"
                }
            >
                <input
                    ref={ref}
                    type={type}
                    className="input"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyDownHandler}
                />
                {onButtonClick !== undefined && (
                    <div className="icon-button" onClick={onButtonClick}>
                        {icon !== undefined && (
                            <div className={`icon ${icon}`}></div>
                        )}
                    </div>
                )}
            </div>
            {message !== undefined && (
                <div className="inputbox-message">{message}</div>
            )}
        </div>
    );
});

export default InputBox;
