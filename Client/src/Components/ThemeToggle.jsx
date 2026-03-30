import React, { useState, useEffect } from 'react';
import "../css/themetoggle.css"

const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('selected-theme') === 'dark';
    });

    useEffect(() => {
        const theme = isDarkMode ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.setAttribute('data-bs-theme', theme);
        localStorage.setItem('selected-theme', theme);
    }, [isDarkMode]);

    return (
        <div className="theme-switch-wrapper position-relative z-2 m-3 d-flex align-items-center">
            {/* Label first for "Light Mode [Switch]" order */}
            <span className="theme-label me-2">
                {isDarkMode ? 'Dark Mode' : 'Light Mode'}
            </span>
            
            <div className="form-check form-switch mb-0">
                <input
                    className="form-check-input custom-switch"
                    type="checkbox"
                    role="switch"
                    id="themeSwitch"
                    checked={isDarkMode}
                    onChange={() => setIsDarkMode(!isDarkMode)}
                    style={{ cursor: 'pointer' }}
                />
            </div>
        </div>
    );
};

export default ThemeToggle;