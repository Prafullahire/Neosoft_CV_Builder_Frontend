// import React from 'react';
// import { Card, Button, Badge } from 'react-bootstrap';
// import './CVCard.css';

// const CVCard = ({ cv, onEdit, onDelete, onDownload, onShare }) => {
//     // Converts a timestamp (updatedAt) into a readable date format
//     const formatDate = (dateString) => {
//         return new Date(dateString).toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'short',
//             day: 'numeric',
//         });
//     };

//     return (
//         <Card className="cv-card">
//             <Card.Body>
//                 <div className="cv-card-header">
//                     <h5>{cv.basicDetails?.name || 'Untitled CV'}</h5>
//                     <Badge bg={cv.layout === 'professional' ? 'primary' : cv.layout === 'modern' ? 'info' : 'warning'}>
//                         {cv.layout}
//                     </Badge>
//                 </div>

//                 <div className="cv-card-info">
//                     <p className="text-muted mb-1">
//                         <small>Last updated: {formatDate(cv.updatedAt)}</small>
//                     </p>
//                     {cv.basicDetails?.email && (
//                         <p className="text-muted mb-1">
//                             <small>{cv.basicDetails.email}</small>
//                         </p>
//                     )}
//                 </div>

//                 <div className="cv-card-actions">
//                     <Button variant="primary" size="sm" onClick={() => onEdit(cv._id)}>
//                         ✏️ Edit
//                     </Button>
//                     <Button variant="success" size="sm" onClick={() => onDownload(cv._id)}>
//                         📥 Download
//                     </Button>
//                     <Button variant="info" size="sm" onClick={() => onShare(cv._id)}>
//                         🔗 Share
//                     </Button>
//                     <Button variant="danger" size="sm" onClick={() => onDelete(cv._id)}>
//                         🗑️ Delete
//                     </Button>
//                 </div>
//             </Card.Body>
//         </Card>
//     );
// };

// export default CVCard;


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
