import React from 'react'
import "./Button.scss";

interface IButton {
  text: string
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

const Button = (props: IButton) => {
  const {text} = props;
  const {onClick} = props;

  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

export default Button