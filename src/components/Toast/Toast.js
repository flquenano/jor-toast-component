import React from "react";
import { AlertOctagon, AlertTriangle, CheckCircle, Info, X } from "react-feather";

import VisuallyHidden from "../VisuallyHidden";

import styles from "./Toast.module.css";
import { TOAST_ACTION, useToastDispatchContext } from "../ToastProvider";

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon
};

function Toast({ id, variant, duration, children }) {
  const toastDispatch = useToastDispatchContext();

  const dismiss = React.useCallback(() => {
    toastDispatch({ type: TOAST_ACTION.REMOVE, payload: { id: id } });
  }, [id, toastDispatch]);

  React.useEffect(() => {
    const dismissTimer = setTimeout(() => {
      dismiss();
    }, duration);
    return () => {
      clearTimeout(dismissTimer);
    };
  }, [duration, dismiss, id, toastDispatch]);

  const Icon = ICONS_BY_VARIANT[variant];
  const style = `${styles.toast} ${styles[variant]}`;

  return (
    <div className={style}>
      <div className={styles.iconContainer}>
        <Icon size={24} />
      </div>
      <p className={styles.content}>
        <VisuallyHidden>{variant} - </VisuallyHidden>
        {children}
      </p>
      <button
        className={styles.closeButton}
        onClick={dismiss}
        aria-label="Dismiss message"
        aria-live="off"
      >
        <X size={24} />
        <VisuallyHidden>Dismiss message</VisuallyHidden>
      </button>
    </div>
  );
}

export default Toast;
