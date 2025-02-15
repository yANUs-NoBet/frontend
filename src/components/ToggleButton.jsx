import { Check, X } from "lucide-react";

export default function ToggleButton({ isBlocked, setIsBlocked }) {

  return (
    <div className="toggle-container" onClick={() => setIsBlocked(!isBlocked)}>
      <div className={`toggle-track ${isBlocked ? "enabled" : "disabled"}`}>
        <div className="toggle-circle">
          {isBlocked ? <Check className="icon" size={20} /> : <X className="icon" size={20} />}
        </div>
      </div>
    </div>
  );
}
