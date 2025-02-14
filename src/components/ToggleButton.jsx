import { useState } from "react";
import { Check, X } from "lucide-react";

export default function ToggleButton() {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <div className="toggle-container" onClick={() => setIsEnabled(!isEnabled)}>
      <div className={`toggle-track ${isEnabled ? "enabled" : "disabled"}`}>
        <div className="toggle-circle">
          {isEnabled ? <Check className="icon" size={20} /> : <X className="icon" size={20} />}
        </div>
      </div>
    </div>
  );
}
