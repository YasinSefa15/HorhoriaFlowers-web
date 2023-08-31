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

    //pros'tan status isimli tip gelecek. Ona göre farklı colorSchema kullanılacak.
    let varColorSchema = colorSchema.button

    if (props.status === "success") {
        varColorSchema = colorSchema.button_success
    }else if(props.status === "danger"){
        varColorSchema = colorSchema.button_danger
    }
    else if(props.status === "danger_transparent"){
        varColorSchema = colorSchema.button_danger_transparent
    }    else if(props.status === "info_transparent"){
        varColorSchema = colorSchema.info_transparent
    }

    const defaultButtonStyle = {
        backgroundColor: isHovered ? varColorSchema.hoverBackgroundColor : varColorSchema.backgroundColor,
        color: isHovered ? varColorSchema.hoverTextColor : varColorSchema.textColor,
        border: varColorSchema.border,
        transitionDuration: "0.4s",
        fontWeight: "bold",
        width: "20%",
        height: "max-content",
        minWidth: "min-content",
        outline: "none"
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