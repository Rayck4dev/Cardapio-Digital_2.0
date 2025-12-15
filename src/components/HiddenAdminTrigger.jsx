import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function HiddenAdminTrigger({ children }) {
  const navigate = useNavigate();
  const clickCount = useRef(0);
  const timeoutRef = useRef(null);
  const pressTimer = useRef(null);

  function handleClick() {
    clickCount.current += 1;

    if (clickCount.current === 2) {
      navigate("/admin");
      clickCount.current = 0;
      return;
    }

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      clickCount.current = 0;
    }, 300);
  }

  function handleTouchStart() {
    pressTimer.current = setTimeout(() => {
      navigate("/admin");
    }, 700);
  }

  function handleTouchEnd() {
    clearTimeout(pressTimer.current);
  }

  return (
    <div
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ display: "inline-block" }}
    >
      {children}
    </div>
  );
}
