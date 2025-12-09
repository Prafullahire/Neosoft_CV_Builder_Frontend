import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import cvService from "../../services/cvService";
import CVCard from "./CVCard";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // Fetch CVs When Page Loads
  useEffect(() => {
    fetchCVs();
  }, []);


  // API request to get CVs and Saves them to state using setCvs
  const fetchCVs = async () => {
    try {
      const data = await cvService.getCVs();
      setCvs(data);
    } catch (error) {
      console.error("Error fetching CVs:", error);
    } finally {
      setLoading(false);
    }
  };


  // Clears login session & Redirects to login page
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const handleCreateNew = () => {
    navigate("/layouts");
  };

  const handleEdit = (id) => {
    navigate(`/editor/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this CV?")) {
      try {
        await cvService.deleteCV(id);
        setCvs(cvs.filter((cv) => cv._id !== id));
        alert("CV deleted successfully");
      } catch (error) {
        console.error("Error deleting CV:", error);
        alert("Failed to delete CV");
      }
    }
  };
  // Opens the CV in a new tab for download
  const handleDownload = (id) => {
    const base = "/Neosoft_CV_Builder_Frontend"; 
    window.open(`${base}/cv/${id}`, "_blank");
  };

  const handleShare = async (id) => {
    try {
      const cv = cvs.find((c) => c._id === id);
      if (!cv.isPublic) {
        await cvService.updateCV(id, { ...cv, isPublic: true });
      }

      const { shareCV } = await import("../../utils/pdfUtils");
      const cvName = cv.basicDetails?.name || "My CV";
      const result = await shareCV(id, cvName);

      if (result.success) {
        alert(result.message);
      } else {
        alert(`Failed to share: ${result.message}`);
      }
    } catch (error) {
      console.error("Error sharing CV:", error);
      alert("Failed to share CV");
    }
  };

  return (
    <Container className="dashboard-container mt-5">
      <div className="dashboard-header">
        <div>
          <h1>Welcome, {userInfo ? userInfo.username : "User"}</h1>
          <p className="text-muted">Manage your CVs and create new ones</p>
        </div>
        <div className="header-actions">
          <Button variant="success" size="lg" onClick={handleCreateNew}>
            + Create New CV
          </Button>
          <Button variant="danger" onClick={logoutHandler}>
            Logout
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : cvs.length === 0 ? (
        <div className="empty-state">
          <h3>No CVs yet</h3>
          <p>Create your first CV to get started</p>
          <Button variant="primary" size="lg" onClick={handleCreateNew}>
            Create Your First CV
          </Button>
        </div>
      ) : (
        <Row className="mt-4">
          {cvs.map((cv) => (
            <Col key={cv._id} md={4} className="mb-4">
              <CVCard
                cv={cv}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onDownload={handleDownload}
                onShare={handleShare}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Dashboard;
