import React from "react";

import Toast from "../Toast";
import styles from "./ToastShelf.module.css";
import { useToastStateContext } from "../ToastProvider";

function ToastShelf() {
  const toastState = useToastStateContext();

  return (
    <ol className={styles.wrapper} role="region" aria-live="polite" aria-label="Notification">
      {toastState.map((toast) => (
        <li className={styles.toastWrapper} key={toast.id}>
          <Toast id={toast.id} variant={toast.variant} duration={toast.duration}>
            {toast.text}
          </Toast>
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
