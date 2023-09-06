import { useState } from "react";
import { colorSchema } from "../../helpers/ColorSchema";

export default function OutlineButton(props) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  //pros'tan status isimli tip gelecek. Ona göre farklı colorSchema kullanılacak.
  let varColorSchema = colorSchema.button;

  if (props.status === "success") {
    varColorSchema = colorSchema.button_success;
  } else if (props.status === "danger") {
    varColorSchema = colorSchema.button_danger;
  }

  const defaultButtonStyle = {
    backgroundColor: isHovered ? varColorSchema.hoverBackgroundColor : varColorSchema.backgroundColor,
    color: isHovered ? varColorSchema.hoverTextColor : varColorSchema.textColor,
    border: varColorSchema.border,
    borderRadius: varColorSchema.borderRadius,
    transitionDuration: "0.4s",
    width: "15%",
    height: "35px",
    minWidth: "min-content",
    outline: "none",
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
  );
}
