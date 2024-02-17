import { ChangeEvent, Dispatch, SetStateAction, forwardRef } from "react";
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
    onButtonClick?: () => void;
    message?: string;
}
// component : Input Box
const InputBox = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
    // state : properties //
    const { label, type, placeholder, value, error } = props;
    const { icon, message, onButtonClick } = props;
    const { setValue } = props;

    // event handler //
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        //const value = event.target.value;
        const { value } = event.target;
        setValue(value);
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
                />
                {onButtonClick !== undefined && (
                    <div className="icon-button">
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
