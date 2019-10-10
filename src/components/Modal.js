import React from "react";
import ReactDOM from "react-dom";
import ModalInner from './ModalInner'

function Modal(props) {
  return ReactDOM
    .createPortal(
       <ModalInner {...props} />,
       document.querySelector("#modal")
     );
}
export default Modal;