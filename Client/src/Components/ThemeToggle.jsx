import React, { useState, useEffect } from 'react';
import "../css/themetoggle.css"
const ThemeToggle = () => {
    // Initialize state from localStorage so it persists on refresh
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('selected-theme') === 'dark';
    });

    useEffect(() => {
        const theme = isDarkMode ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.setAttribute('data-bs-theme', theme);

        // Save the choice
        localStorage.setItem('selected-theme', theme);
    }, [isDarkMode]);

    return (
        <div className="form-check form-switch theme-switch-wrapper position-relative z-2 m-3">
            <input
                className="form-check-input custom-switch"
                type="checkbox"
                role="switch"
                id="themeSwitch"
                checked={isDarkMode}
                onChange={() => setIsDarkMode(!isDarkMode)}
            />
            {/* <label className="form-check-label d-none d-md-inline" htmlFor="themeSwitch">
                {isDarkMode ? 'Dark Mode' : 'Light Mode'}
            </label> */}
        </div>
    );
};

export default ThemeToggle;