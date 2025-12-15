import React, { useEffect, useState } from "react";
import { Spinner, Offcanvas, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  FileText,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  Download,
  User,
  Menu,
} from "lucide-react";
import cvService from "../../services/cvService";

const SIDEBAR_WIDTH = 280;
const SIDEBAR_COLLAPSED = 80;

const Dashboard = () => {
  const navigate = useNavigate();
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    fetchCVs();
  }, []);

  const fetchCVs = async () => {
    try {
      const data = await cvService.getCVs();
      setCvs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const logoutHandler = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div
      className="d-flex min-vh-100"
      style={{
        background:
          "linear-gradient(135deg, #e8f5e9 0%, #f1f8f4 50%, #ffffff 100%)",
      }}
    >
      <aside
        className="d-none d-md-flex flex-column bg-white shadow"
        style={{
          width: desktopCollapsed ? SIDEBAR_COLLAPSED : SIDEBAR_WIDTH,
          transition: "width 0.3s ease",
        }}
      >
        <SidebarContent
          collapsed={desktopCollapsed}
          userInfo={userInfo}
          logoutHandler={logoutHandler}
          handleCreateNew={() => navigate("/layouts")}
        />
      </aside>

      <Offcanvas
        show={mobileSidebar}
        onHide={() => setMobileSidebar(false)}
        placement="start"
        className="d-md-none"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>CV Builder</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <SidebarContent
            userInfo={userInfo}
            logoutHandler={logoutHandler}
            handleCreateNew={() => navigate("/layouts")}
            closeSidebar={() => setMobileSidebar(false)}
          />
        </Offcanvas.Body>
      </Offcanvas>

      <main className="flex-grow-1 p-3 p-md-4">
        <div className="mb-3">
          <Button
            variant="outline-success"
            onClick={() =>
              window.innerWidth < 768
                ? setMobileSidebar(true)
                : setDesktopCollapsed((p) => !p)
            }
          >
            <Menu size={18} />
          </Button>
        </div>

        <div className="card p-4 mb-4 shadow-sm border-start border-success">
          <h2 className="fw-bold mb-1">
            Welcome back, {userInfo?.username || "User"}!
          </h2>
          <p className="text-muted mb-0">Manage your CVs and create new ones</p>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <Spinner />
          </div>
        ) : (
          <div className="row g-4">
            {cvs.map((cv) => (
              <div className="col-lg-4 col-md-6" key={cv._id}>
                <div className="card p-3 shadow-sm h-100 border-success">
                  <div className="d-flex align-items-center mb-3">
                    <div
                      className="rounded-circle border me-3 d-flex align-items-center justify-content-center"
                      style={{ width: 60, height: 60 }}
                    >
                      <User />
                    </div>
                    <div>
                      <h6 className="fw-bold mb-0">
                        {cv.basicDetails?.name || "Untitled CV"}
                      </h6>
                      <small className="text-muted">
                        {new Date(cv.updatedAt).toLocaleDateString()}
                      </small>
                    </div>
                  </div>

                  <div className="d-flex flex-wrap gap-2">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => navigate(`/editor/${cv._id}`)}
                    >
                      <Edit2 size={14} /> Edit
                    </button>

                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => window.open(`/cv/${cv._id}`, "_blank")}
                    >
                      <Download size={14} /> Preview
                    </button>

                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={async () => {
                        if (!window.confirm("Delete this CV?")) return;
                        await cvService.deleteCV(cv._id);
                        setCvs((prev) =>
                          prev.filter((item) => item._id !== cv._id)
                        );
                      }}
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

const SidebarContent = ({
  collapsed,
  userInfo,
  logoutHandler,
  handleCreateNew,
  closeSidebar,
}) => (
  <div
    className={`d-flex flex-column h-100 pt-3 px-2 ${
      collapsed ? "align-items-center text-center" : ""
    }`}
  >
    <div
      className={`d-flex align-items-center gap-2 mb-2 ${
        collapsed ? "justify-content-center" : ""
      }`}
    >
      <FileText size={18} />
      {!collapsed && (
        <div>
          <h6 className="mb-0" style={{ fontSize: "15px" }}>
            CV Builder
          </h6>
          <small className="text-muted" style={{ fontSize: "12px" }}>
            Create resumes
          </small>
        </div>
      )}
    </div>

    <button
      className="btn btn-success w-100 my-2 py-2 d-flex align-items-center justify-content-center gap-2"
      style={{ fontSize: "14px" }}
      onClick={() => {
        handleCreateNew();
        closeSidebar?.();
      }}
    >
      <Plus size={16} />
      {!collapsed && " Create CV"}
    </button>

    <div
      className="w-100 d-flex align-items-center justify-content-center gap-2 text-success fw-semibold py-2"
      style={{ cursor: "pointer", fontSize: "14px" }}
    >
      <LayoutGrid size={16} />
      {!collapsed && " Dashboard"}
    </div>

    <div className="mt-auto w-100 mb-3">
      {!collapsed && (
        <div className="mb-2">
          <small className="fw-semibold" style={{ fontSize: "17px" }}>
            {userInfo?.username}
          </small>
          <br />
          <small className="text-success" style={{ fontSize: "17px" }}>
            Logged in
          </small>
        </div>
      )}

      <button
        className="btn btn-outline-danger w-100 py-2 d-flex align-items-center justify-content-center gap-2"
        style={{ fontSize: "17px" }}
        onClick={logoutHandler}
      >
        <LogOut size={16} />
        {!collapsed && " Logout"}
      </button>
    </div>
  </div>
);

export default Dashboard;
