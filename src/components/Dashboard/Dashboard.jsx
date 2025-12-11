import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  FileText,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  Download,
  Share2,
  User,
} from "lucide-react";
import cvService from "../../services/cvService";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    fetchCVs();
  }, []);

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

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");

    navigate("/login");
  };

  const handleCreateNew = () => {
    navigate("/layouts");
  };

  const handleEdit = (id) => navigate(`/editor/${id}`);

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

  const handleDownload = (id) => {
    window.open(`/Neosoft_CV_Builder_Frontend/cv/${id}`, "_blank");
  };

  const handleShare = async (id) => {
    try {
      const cv = cvs.find((c) => c._id === id);
      if (!cv.isPublic) await cvService.updateCV(id, { ...cv, isPublic: true });
      const { shareCV } = await import("../../utils/pdfUtils");
      const cvName = cv.basicDetails?.name || "My CV";
      const result = await shareCV(id, cvName);
      alert(
        result.success ? result.message : `Failed to share: ${result.message}`
      );
    } catch (error) {
      console.error("Error sharing CV:", error);
      alert("Failed to share CV");
    }
  };

  return (
    <div className="dashboard-layout">
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo-container">
            <div className="logo-icon">
              <FileText size={24} />
            </div>
            <div>
              <h1 className="sidebar-logo">CV Builder</h1>
              <p className="sidebar-tagline">Create and manage resumes</p>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button className="nav-item active">
            <LayoutGrid size={20} />
            <span>Dashboard</span>
          </button>
        </nav>

        <div className="sidebar-user">
          <div className="user-profile-card">
            <div className="user-avatar">
              <User size={20} />
            </div>
            <div className="user-details">
              <p className="user-name">{userInfo?.username || "User"}</p>
              <p className="user-status">Logged in</p>
            </div>
          </div>
          <button onClick={logoutHandler} className="logout-btn">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-wrapper">
          {/* Welcome Header */}
          <div className="welcome-header">
            <h2 className="welcome-title">
              Welcome back, {userInfo?.username || "User"}!
            </h2>
            <p className="welcome-subtitle">
              Manage your CVs and create new ones
            </p>
          </div>

          <div className="cvs-section">
            <div className="section-header">
              <h3 className="section-title">Your CVs</h3>
              <button onClick={handleCreateNew} className="create-btn-header">
                <Plus size={18} />
                Create New CV
              </button>
            </div>

            {loading ? (
              <div className="loading-container">
                <Spinner animation="border" style={{ color: "#2ecc71" }} />
                <p className="loading-text">Loading your CVs...</p>
              </div>
            ) : (
              <div className="cvs-grid">
                {cvs.length === 0 ? (
                  <div className="empty-state-message">
                    <div className="empty-icon">
                      <FileText size={48} />
                    </div>
                    <h3 className="empty-state-title">No CVs yet</h3>
                    <p className="empty-state-text">
                      Create your first CV to get started
                    </p>
                  </div>
                ) : (
                  cvs.map((cv) => (
                    <div key={cv._id} className="cv-item-card">
                      <div className="cv-card-header">
                        <div className="cv-icon-wrapper">
                          <FileText size={24} />
                        </div>
                        <div className="cv-card-info">
                          <h4 className="cv-card-title">
                            {cv.basicDetails?.name || "Untitled CV"}
                          </h4>
                          <p className="cv-card-date">
                            Last updated:{" "}
                            {new Date(
                              cv.updatedAt || Date.now()
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="cv-card-actions">
                        <button
                          onClick={() => handleEdit(cv._id)}
                          className="action-btn edit-btn"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDownload(cv._id)}
                          className="action-btn download-btn"
                          title="Download"
                        >
                          <Download size={16} />
                          <span>Download</span>
                        </button>
                        <button
                          onClick={() => handleShare(cv._id)}
                          className="action-btn share-btn"
                          title="Share"
                        >
                          <Share2 size={16} />
                          <span>Share</span>
                        </button>
                        <button
                          onClick={() => handleDelete(cv._id)}
                          className="action-btn delete-btn"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
