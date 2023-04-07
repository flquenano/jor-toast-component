import React from "react";

function useEscapeKey(eventFunc) {
  return React.useEffect(() => {
    const dismissAllToasts = (e) => {
      if (e.code === "Escape") {
        eventFunc();
      }
    };
    window.addEventListener("keydown", dismissAllToasts);
    return () => {
      window.removeEventListener("keydown", dismissAllToasts);
    };
  }, [eventFunc]);
}

export default useEscapeKey;
