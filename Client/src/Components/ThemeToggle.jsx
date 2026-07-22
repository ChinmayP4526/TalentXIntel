import React from 'react';
import { useTheme } from "../context/ThemeContext";
import "../css/themetoggle.css";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const isDarkMode = theme === "dark";

    return (
        <div className="theme-switch-wrapper position-relative z-2 m-3 d-flex align-items-center">
            {/* Label first for "Light Mode [Switch]" order */}
            <span className="theme-label me-2">
                {isDarkMode ? "Dark Mode" : "Light Mode"}
            </span>

            <div className="form-check form-switch mb-0">
                <input
                    className="form-check-input custom-switch"
                    type="checkbox"
                    role="switch"
                    id="themeSwitch"
                    checked={isDarkMode}
                    onChange={toggleTheme}
                    style={{ cursor: "pointer" }}
                />
            </div>
        </div>
    );
};

export default ThemeToggle;