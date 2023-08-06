import React from "react";
import "./CustomToggle.css";


const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <button
        className="custom-toggle-button"
        type="button"
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >
        {children}
    </button>
));

export default CustomToggle;
