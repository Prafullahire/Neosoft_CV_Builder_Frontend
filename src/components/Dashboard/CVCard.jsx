import React from "react";
import { Card, Button, Badge, Stack } from "react-bootstrap";

const CVCard = ({ cv, onEdit, onDelete, onDownload, onShare }) => {
  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <Card className="shadow-sm rounded-4 mb-3">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="fw-bold text-success mb-0">
            {cv.basicDetails?.name || "Untitled CV"}
          </h5>

          <Badge bg="info" className="text-capitalize px-3 py-2 rounded-pill">
            {cv.layout || "modern"}
          </Badge>
        </div>

        <div className="mb-3">
          <div className="text-muted small">
            Last updated: {formatDate(cv.updatedAt)}
          </div>

          {cv.basicDetails?.email && (
            <div className="text-muted small">
              {cv.basicDetails.email}
            </div>
          )}
        </div>

        <Stack direction="horizontal" gap={2} className="mb-3">
          <Button
            size="sm"
            variant="primary"
            onClick={() => onEdit(cv._id)}
          >
            ✏️ Edit
          </Button>

          <Button
            size="sm"
            variant="success"
            onClick={() => onDownload(cv._id)}
          >
            ⬇️ Download
          </Button>

          <Button
            size="sm"
            variant="info"
            onClick={() => onShare(cv._id)}
          >
            🔗 Share
          </Button>
        </Stack>

        {/* Delete */}
        <Button
          variant="danger"
          className="w-100"
          onClick={() => onDelete(cv._id)}
        >
          🗑️ Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CVCard;
