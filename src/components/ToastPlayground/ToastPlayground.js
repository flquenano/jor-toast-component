import React from "react";

import Button from "../Button";

import styles from "./ToastPlayground.module.css";

import ToastShelf from "../ToastShelf";
import { TOAST_ACTION, useToastDispatchContext } from "../ToastProvider";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const defaultVariant = VARIANT_OPTIONS[0];
  const inputRef = React.useRef();
  const [selectedVariant, setSelectedVariant] = React.useState(defaultVariant);
  const [txtInput, setTxtInput] = React.useState("");
  const toastDispatch = useToastDispatchContext();

  const addToast = () => {
    setSelectedVariant(defaultVariant);
    setTxtInput("");
    toastDispatch({
      type: TOAST_ACTION.ADD,
      payload: {
        variant: selectedVariant,
        text: txtInput,
        duration: 10000
      }
    });
    inputRef.current.focus();
  };

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>
      <ToastShelf />
      <form
        className={styles.controlsWrapper}
        onSubmit={(e) => {
          e.preventDefault();
          addToast();
        }}
      >
        <div className={styles.row}>
          <label htmlFor="message" className={styles.label} style={{ alignSelf: "baseline" }}>
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              ref={inputRef}
              id="message"
              className={styles.messageInput}
              value={txtInput}
              onChange={(e) => {
                setTxtInput(e.target.value);
              }}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((variant) => (
              <label htmlFor={`variant-${variant}`} key={variant}>
                <input
                  id={`variant-${variant}`}
                  type="radio"
                  name="variant"
                  value={variant}
                  checked={selectedVariant === variant}
                  onChange={(event) => {
                    setSelectedVariant(event.target.value);
                  }}
                />
                {variant}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button type="submit" disabled={!txtInput || !selectedVariant} onClick={addToast}>
              Pop Toast!
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
