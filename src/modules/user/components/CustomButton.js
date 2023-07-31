import {colorSchema} from "../../../helpers/ColorSchema";
import {useState} from "react";

export default function CustomButton(props) {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const defaultButtonStyle = {
        backgroundColor: isHovered ? colorSchema.button.hoverBackgroundColor : colorSchema.button.backgroundColor,
        color: isHovered ? colorSchema.button.hoverTextColor : colorSchema.button.textColor,
        border: colorSchema.button.border,
        transitionDuration: "0.4s",
        fontWeight: "bold",
    };

    // Merge the default style with the style from props
    const buttonStyle = Object.assign({}, defaultButtonStyle, props.style);


    return (
        <button
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            type={props.type}
            className={props.className}
            onClick={props.onClick}
            style={buttonStyle}
        >
            {props.text}
        </button>
    )
}