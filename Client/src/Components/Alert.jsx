import React from 'react'

const Alert = ({ alert }) => {
    const capitalize = (word) => {
        if (word === "danger") word = "error";
        return word.charAt(0).toUpperCase() + word.slice(1);
    };

    if (!alert) return null;

    return (
        <div
            className="position-fixed top-0 start-50 translate-middle-x mt-3"
            style={{ zIndex: 9999, minWidth: "350px" }}
        >
            <div className={`alert alert-${alert.type} shadow`}>
                <strong>{capitalize(alert.type)}</strong> {alert.msg}
            </div>
        </div>
    );
};

export default Alert;
