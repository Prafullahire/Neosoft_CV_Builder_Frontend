import React from "react";
import "./CVCard.css";

const CVCard = ({ cv, onEdit, onDelete, onDownload, onShare }) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <div className="cv-card">
            <div className="cv-card-header">
                
                <h4 className="cv-name">
                    {cv.basicDetails?.name || "Untitled CV"}
                </h4>

                <span className="cv-badge">
                    {cv.layout || "modern"}
                </span>
            </div>

            <div className="cv-card-info">
                <p className="cv-updated">
                    Last updated: {formatDate(cv.updatedAt)}
                </p>

                {cv.basicDetails?.email && (
                    <p className="cv-email">{cv.basicDetails.email}</p>
                )}
            </div>

            <div className="cv-card-actions">
                <button className="action-btn edit" onClick={() => onEdit(cv._id)}>
                    ✏️ Edit
                </button>

                <button className="action-btn download" onClick={() => onDownload(cv._id)}>
                    ⬇️ Download
                </button>

                <button className="action-btn share" onClick={() => onShare(cv._id)}>
                    🔗 Share
                </button>
            </div>

            <button className="action-btn delete" onClick={() => onDelete(cv._id)}>
                🗑️ Delete
            </button>
        </div>
    );
};

export default CVCard;
