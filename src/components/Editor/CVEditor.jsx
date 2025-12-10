// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import {
//   Container,
//   Row,
//   Col,
//   Button,
//   ProgressBar,
//   Toast,
//   ToastContainer,
// } from "react-bootstrap";
// import axios from "axios";
// import BasicDetails from "./steps/BasicDetails";
// import Education from "./steps/Education";
// import Experience from "./steps/Experience";
// import Projects from "./steps/Projects";
// import Skills from "./steps/Skills";
// import SocialProfiles from "./steps/SocialProfiles";
// import CVPreview from "./CVPreview";
// import PaymentModal from "../Payment/PaymentModal";
// import { API_ENDPOINTS } from "../../config/api";
// import "./CVEditor.css";

// const CVEditor = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [currentStep, setCurrentStep] = useState(0);
//   const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [pendingAction, setPendingAction] = useState(null); // 'download' or 'share'
//   const [toasts, setToasts] = useState([]);

//   const [cvData, setCvData] = useState({
//     layout: location.state?.layout || "professional",
//     basicDetails: {
//       name: "",
//       email: "",
//       phone: "",
//       address: "",
//       city: "",
//       state: "",
//       pincode: "",
//       image: "",
//       designation: "",
//       intro: "",
//     },
//     education: [],
//     experience: [],
//     projects: [],
//     skills: [],
//     socialProfiles: [],
//   });

//   const steps = [
//     { name: "Basic Details", component: BasicDetails, dataKey: "basicDetails" },
//     { name: "Education", component: Education, dataKey: "education" },
//     { name: "Experience", component: Experience, dataKey: "experience" },
//     { name: "Projects", component: Projects, dataKey: "projects" },
//     { name: "Skills", component: Skills, dataKey: "skills" },
//     {
//       name: "Social Profiles",
//       component: SocialProfiles,
//       dataKey: "socialProfiles",
//     },
//   ];

//   const showToast = (message, variant = "info") => {
//     const id = Math.random();
//     const newToast = { id, message, variant };
//     setToasts((prev) => [...prev, newToast]);
//     setTimeout(() => {
//       setToasts((prev) => prev.filter((t) => t.id !== id));
//     }, 3000);
//   };

//   useEffect(() => {
//     if (id) {
//       loadCV();
//     }
//   }, [id]);

//   useEffect(() => {
//     const handleBeforeUnload = (e) => {
//       if (hasUnsavedChanges) {
//         e.preventDefault();
//         e.returnValue = "";
//       }
//     };

//     window.addEventListener("beforeunload", handleBeforeUnload);
//     return () => window.removeEventListener("beforeunload", handleBeforeUnload);
//   }, [hasUnsavedChanges]);

//   const loadCV = async () => {
//     try {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       const config = {
//         headers: {
//           Authorization: `Bearer ${userInfo.token}`,
//         },
//       };

//       const { data } = await axios.get(API_ENDPOINTS.CV.GET(id), config);
//       setCvData(data);
//     } catch (error) {
//       console.error("Error loading CV:", error);
//       showToast("Failed to load CV", "danger");
//     }
//   };

//   const handleDataChange = (section, data) => {
//     setCvData((prev) => ({
//       ...prev,
//       [section]: data,
//     }));
//     setHasUnsavedChanges(true);
//   };

//   const validateCurrentStep = () => {
//     const dataKey = steps[currentStep].dataKey;
//     const stepData = cvData[dataKey];
//     let isValid = true;
//     let errorMessages = [];

//     if (currentStep === 0) {
//       if (!stepData?.name || stepData.name.trim() === "") {
//         errorMessages.push("✗ Full Name is required");
//         isValid = false;
//       } else if (stepData.name.trim().length < 2) {
//         errorMessages.push("✗ Full Name must be at least 2 characters");
//         isValid = false;
//       }

//       if (!stepData?.email || stepData.email.trim() === "") {
//         errorMessages.push("✗ Email is required");
//         isValid = false;
//       } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(stepData.email)) {
//         errorMessages.push("✗ Please enter a valid email address");
//         isValid = false;
//       }
//     }
//     // Validation for Education
//     else if (currentStep === 1) {
//       if (stepData && stepData.length > 0) {
//         const educationErrors = [];
//         stepData.forEach((edu, index) => {
//           if (!edu.degree || edu.degree.trim() === "") {
//             educationErrors.push(`Education #${index + 1}: Degree is required`);
//           }
//           if (!edu.institution || edu.institution.trim() === "") {
//             educationErrors.push(
//               `Education #${index + 1}: Institution is required`
//             );
//           }
//         });
//         if (educationErrors.length > 0) {
//           errorMessages.push(...educationErrors);
//           isValid = false;
//         }
//       }
//     }
//     // Validation for Experience
//     else if (currentStep === 2) {
//       if (stepData && stepData.length > 0) {
//         const experienceErrors = [];
//         stepData.forEach((exp, index) => {
//           if (!exp.company || exp.company.trim() === "") {
//             experienceErrors.push(
//               `Experience #${index + 1}: Company name is required`
//             );
//           }
//           if (!exp.position || exp.position.trim() === "") {
//             experienceErrors.push(
//               `Experience #${index + 1}: Position is required`
//             );
//           }
//         });
//         if (experienceErrors.length > 0) {
//           errorMessages.push(...experienceErrors);
//           isValid = false;
//         }
//       }
//     }
//     // Validation for Projects
//     else if (currentStep === 3) {
//       if (stepData && stepData.length > 0) {
//         const projectErrors = [];
//         stepData.forEach((project, index) => {
//           if (!project.title || project.title.trim() === "") {
//             projectErrors.push(
//               `Project #${index + 1}: Project title is required`
//             );
//           }
//         });
//         if (projectErrors.length > 0) {
//           errorMessages.push(...projectErrors);
//           isValid = false;
//         }
//       }
//     }
//     // Validation for Skills
//     else if (currentStep === 4) {
//       if (stepData && stepData.length > 0) {
//         const skillErrors = [];
//         stepData.forEach((skill, index) => {
//           if (!skill.name || skill.name.trim() === "") {
//             skillErrors.push(`Skill #${index + 1}: Skill name is required`);
//           }
//         });
//         if (skillErrors.length > 0) {
//           errorMessages.push(...skillErrors);
//           isValid = false;
//         }
//       }
//     }
//     // Validation for Social Profiles
//     else if (currentStep === 5) {
//       if (stepData && stepData.length > 0) {
//         const profileErrors = [];
//         stepData.forEach((profile, index) => {
//           if (!profile.platform || profile.platform.trim() === "") {
//             profileErrors.push(
//               `Social Profile #${index + 1}: Platform is required`
//             );
//           }
//           if (!profile.url || profile.url.trim() === "") {
//             profileErrors.push(
//               `Social Profile #${index + 1}: Profile URL is required`
//             );
//           } else if (!/^https?:\/\/.+/.test(profile.url)) {
//             profileErrors.push(
//               `Social Profile #${
//                 index + 1
//               }: URL must start with http:// or https://`
//             );
//           }
//         });
//         if (profileErrors.length > 0) {
//           errorMessages.push(...profileErrors);
//           isValid = false;
//         }
//       }
//     }

//     if (!isValid) {
//       showToast(`VALIDATION ERRORS:\n\n${errorMessages.join("\n")}`, "danger");
//     }

//     return isValid;
//   };

//   const handleNext = () => {
//     if (validateCurrentStep()) {
//       if (currentStep < steps.length - 1) {
//         setCurrentStep(currentStep + 1);
//       }
//     }
//   };

//   const handlePrevious = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const handleSave = async () => {
//     setIsSaving(true);
//     try {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${userInfo.token}`,
//         },
//       };

//       if (id) {
//         // Update existing CV
//         await axios.put(API_ENDPOINTS.CV.UPDATE(id), cvData, config);
//         showToast("CV updated successfully!", "success");
//       } else {
//         // Create new CV
//         const { data } = await axios.post(
//           API_ENDPOINTS.CV.CREATE,
//           cvData,
//           config
//         );
//         showToast("CV created successfully!", "success");
//         navigate(`/editor/${data._id}`, { replace: true });
//       }

//       setHasUnsavedChanges(false);
//     } catch (error) {
//       console.error("Error saving CV:", error);
//       showToast("Failed to save CV", "danger");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleDownload = () => {
//     setPendingAction("download");
//     setShowPaymentModal(true);
//   };

//   const processDownload = async () => {
//     const { generatePDF } = await import("../../utils/pdfUtils");
//     const cvName = cvData.basicDetails?.name || "CV";
//     const filename = `${cvName.replace(/\s+/g, "_")}_CV.pdf`;

//     const result = await generatePDF("cv-preview-wrapper", filename);

//     if (result.success) {
//       showToast("PDF downloaded successfully!", "success");
//     } else {
//       showToast(`Failed to generate PDF: ${result.message}`, "danger");
//     }
//   };

//   const handleShare = () => {
//     setPendingAction("share");
//     setShowPaymentModal(true);
//   };

//   const processShare = async () => {
//     if (!id) {
//       showToast("Please save the CV first before sharing", "warning");
//       return;
//     }

//     try {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${userInfo.token}`,
//         },
//       };

//       // Make CV public
//       await axios.put(
//         API_ENDPOINTS.CV.UPDATE(id),
//         { ...cvData, isPublic: true },
//         config
//       );

//       const { shareCV } = await import("../../utils/pdfUtils");
//       const cvName = cvData.basicDetails?.name || "My CV";
//       const result = await shareCV(id, cvName);

//       if (result.success) {
//         showToast(result.message, "success");
//       } else {
//         showToast(`Failed to share: ${result.message}`, "danger");
//       }
//     } catch (error) {
//       console.error("Error sharing CV:", error);
//       showToast("Failed to share CV", "danger");
//     }
//   };

//   const CurrentStepComponent = steps[currentStep].component;
//   const progress = ((currentStep + 1) / steps.length) * 100;

//   return (
//     <Container fluid className="cv-editor-container">
//       <ToastContainer
//         position="top-center"
//         className="p-3"
//         style={{
//           zIndex: 1050,
//           position: "fixed",
//           top: "20px",
//           left: "50%",
//           transform: "translateX(-50%)",
//         }}
//       >
//         {toasts.map((toast) => (
//           <Toast
//             key={toast.id}
//             onClose={() =>
//               setToasts((prev) => prev.filter((t) => t.id !== toast.id))
//             }
//             show={true}
//             delay={3000}
//             autohide
//             bg={toast.variant}
//           >
//             <Toast.Body
//               className={toast.variant === "danger" ? "text-white" : ""}
//             >
//               {toast.message}
//             </Toast.Body>
//           </Toast>
//         ))}
//       </ToastContainer>

//       <Row className="editor-header align-items-center">
//         <Col>
//           <h2>CV Editor</h2>
//           <ProgressBar
//             now={progress}
//             label={`Step ${currentStep + 1} of ${steps.length}`}
//           />
//         </Col>
//         <Col xs="auto">
//           <div className="header-actions">
//             <Button
//               variant="outline-primary"
//               onClick={() => navigate("/dashboard")}
//             >
//               Dashboard
//             </Button>
//           </div>
//         </Col>
//       </Row>

//       <Row className="editor-content">
//         <Col md={5} className="form-panel">
//           <div className="step-indicator">
//             <h3>{steps[currentStep].name}</h3>
//           </div>

//           <div className="form-content">
//             <CurrentStepComponent
//               data={cvData[steps[currentStep].dataKey]}
//               onChange={(data) =>
//                 handleDataChange(steps[currentStep].dataKey, data)
//               }
//             />
//           </div>

//           <div className="navigation-buttons">
//             <Button
//               variant="secondary"
//               onClick={handlePrevious}
//               disabled={currentStep === 0}
//             >
//               Previous
//             </Button>
//             {/* <Button
//                             variant="primary"
//                             onClick={handleNext}
//                             disabled={currentStep === steps.length - 1}
//                         >
//                             Next
//                         </Button> */}
//             {currentStep === steps.length - 1 ? (
//               <Button variant="success" onClick={handleSave}>
//                 Finish & Save
//               </Button>
//             ) : (
//               <Button variant="primary" onClick={handleNext}>
//                 Next
//               </Button>
//             )}
//           </div>
//         </Col>

//         {/*  Preview */}
//         <Col md={7} className="preview-panel">
//           <div className="preview-header">
//             <h4>Live Preview</h4>
//             <div className="action-buttons">
//               <Button
//                 variant="success"
//                 onClick={handleSave}
//                 disabled={isSaving}
//               >
//                 {isSaving ? "Saving..." : "Save CV"}
//               </Button>
//               <Button variant="info" onClick={handleDownload}>
//                 Download PDF
//               </Button>
//               <Button variant="warning" onClick={handleShare}>
//                 Share
//               </Button>
//             </div>
//           </div>
//           <div className="preview-content">
//             <CVPreview data={cvData} layout={cvData.layout} />
//           </div>
//         </Col>
//       </Row>
//       <PaymentModal
//         show={showPaymentModal}
//         onHide={() => setShowPaymentModal(false)}
//         onPaymentSuccess={() => {
//           if (pendingAction === "download") processDownload();
//           if (pendingAction === "share") processShare();
//         }}
//       />
//     </Container>
//   );
// };

// export default CVEditor;


import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  ProgressBar,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import axios from "axios";
import { 
  Save, 
  Download, 
  Share2, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle
} from "lucide-react";
import BasicDetails from "./steps/BasicDetails";
import Education from "./steps/Education";
import Experience from "./steps/Experience";
import Projects from "./steps/Projects";
import Skills from "./steps/Skills";
import SocialProfiles from "./steps/SocialProfiles";
import CVPreview from "./CVPreview";
import PaymentModal from "../Payment/PaymentModal";
import { API_ENDPOINTS } from "../../config/api";
import "./CVEditor.css";

const CVEditor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [toasts, setToasts] = useState([]);

  const [cvData, setCvData] = useState({
    layout: location.state?.layout || "professional",
    basicDetails: {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      image: "",
      designation: "",
      intro: "",
    },
    education: [],
    experience: [],
    projects: [],
    skills: [],
    socialProfiles: [],
  });

  const steps = [
    { name: "Basic Details", component: BasicDetails, dataKey: "basicDetails" },
    { name: "Education", component: Education, dataKey: "education" },
    { name: "Experience", component: Experience, dataKey: "experience" },
    { name: "Projects", component: Projects, dataKey: "projects" },
    { name: "Skills", component: Skills, dataKey: "skills" },
    {
      name: "Social Profiles",
      component: SocialProfiles,
      dataKey: "socialProfiles",
    },
  ];

  const showToast = (message, variant = "info") => {
    const id = Math.random();
    const newToast = { id, message, variant };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  useEffect(() => {
    if (id) {
      loadCV();
    }
  }, [id]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const loadCV = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(API_ENDPOINTS.CV.GET(id), config);
      setCvData(data);
    } catch (error) {
      console.error("Error loading CV:", error);
      showToast("Failed to load CV", "danger");
    }
  };

  const handleDataChange = (section, data) => {
    setCvData((prev) => ({
      ...prev,
      [section]: data,
    }));
    setHasUnsavedChanges(true);
  };

  const validateCurrentStep = () => {
    const dataKey = steps[currentStep].dataKey;
    const stepData = cvData[dataKey];
    let isValid = true;
    let errorMessages = [];

    if (currentStep === 0) {
      if (!stepData?.name || stepData.name.trim() === "") {
        errorMessages.push("✗ Full Name is required");
        isValid = false;
      } else if (stepData.name.trim().length < 2) {
        errorMessages.push("✗ Full Name must be at least 2 characters");
        isValid = false;
      }

      if (!stepData?.email || stepData.email.trim() === "") {
        errorMessages.push("✗ Email is required");
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(stepData.email)) {
        errorMessages.push("✗ Please enter a valid email address");
        isValid = false;
      }
    } else if (currentStep === 1) {
      if (stepData && stepData.length > 0) {
        const educationErrors = [];
        stepData.forEach((edu, index) => {
          if (!edu.degree || edu.degree.trim() === "") {
            educationErrors.push(`Education #${index + 1}: Degree is required`);
          }
          if (!edu.institution || edu.institution.trim() === "") {
            educationErrors.push(
              `Education #${index + 1}: Institution is required`
            );
          }
        });
        if (educationErrors.length > 0) {
          errorMessages.push(...educationErrors);
          isValid = false;
        }
      }
    } else if (currentStep === 2) {
      if (stepData && stepData.length > 0) {
        const experienceErrors = [];
        stepData.forEach((exp, index) => {
          if (!exp.company || exp.company.trim() === "") {
            experienceErrors.push(
              `Experience #${index + 1}: Company name is required`
            );
          }
          if (!exp.position || exp.position.trim() === "") {
            experienceErrors.push(
              `Experience #${index + 1}: Position is required`
            );
          }
        });
        if (experienceErrors.length > 0) {
          errorMessages.push(...experienceErrors);
          isValid = false;
        }
      }
    } else if (currentStep === 3) {
      if (stepData && stepData.length > 0) {
        const projectErrors = [];
        stepData.forEach((project, index) => {
          if (!project.title || project.title.trim() === "") {
            projectErrors.push(
              `Project #${index + 1}: Project title is required`
            );
          }
        });
        if (projectErrors.length > 0) {
          errorMessages.push(...projectErrors);
          isValid = false;
        }
      }
    } else if (currentStep === 4) {
      if (stepData && stepData.length > 0) {
        const skillErrors = [];
        stepData.forEach((skill, index) => {
          if (!skill.name || skill.name.trim() === "") {
            skillErrors.push(`Skill #${index + 1}: Skill name is required`);
          }
        });
        if (skillErrors.length > 0) {
          errorMessages.push(...skillErrors);
          isValid = false;
        }
      }
    } else if (currentStep === 5) {
      if (stepData && stepData.length > 0) {
        const profileErrors = [];
        stepData.forEach((profile, index) => {
          if (!profile.platform || profile.platform.trim() === "") {
            profileErrors.push(
              `Social Profile #${index + 1}: Platform is required`
            );
          }
          if (!profile.url || profile.url.trim() === "") {
            profileErrors.push(
              `Social Profile #${index + 1}: Profile URL is required`
            );
          } else if (!/^https?:\/\/.+/.test(profile.url)) {
            profileErrors.push(
              `Social Profile #${
                index + 1
              }: URL must start with http:// or https://`
            );
          }
        });
        if (profileErrors.length > 0) {
          errorMessages.push(...profileErrors);
          isValid = false;
        }
      }
    }

    if (!isValid) {
      showToast(`VALIDATION ERRORS:\n\n${errorMessages.join("\n")}`, "danger");
    }

    return isValid;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      if (id) {
        await axios.put(API_ENDPOINTS.CV.UPDATE(id), cvData, config);
        showToast("CV updated successfully!", "success");
      } else {
        const { data } = await axios.post(
          API_ENDPOINTS.CV.CREATE,
          cvData,
          config
        );
        showToast("CV created successfully!", "success");
        navigate(`/editor/${data._id}`, { replace: true });
      }

      setHasUnsavedChanges(false);
    } catch (error) {
      console.error("Error saving CV:", error);
      showToast("Failed to save CV", "danger");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownload = () => {
    setPendingAction("download");
    setShowPaymentModal(true);
  };

  const processDownload = async () => {
    const { generatePDF } = await import("../../utils/pdfUtils");
    const cvName = cvData.basicDetails?.name || "CV";
    const filename = `${cvName.replace(/\s+/g, "_")}_CV.pdf`;

    const result = await generatePDF("cv-preview-wrapper", filename);

    if (result.success) {
      showToast("PDF downloaded successfully!", "success");
    } else {
      showToast(`Failed to generate PDF: ${result.message}`, "danger");
    }
  };

  const handleShare = () => {
    setPendingAction("share");
    setShowPaymentModal(true);
  };

  const processShare = async () => {
    if (!id) {
      showToast("Please save the CV first before sharing", "warning");
      return;
    }

    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.put(
        API_ENDPOINTS.CV.UPDATE(id),
        { ...cvData, isPublic: true },
        config
      );

      const { shareCV } = await import("../../utils/pdfUtils");
      const cvName = cvData.basicDetails?.name || "My CV";
      const result = await shareCV(id, cvName);

      if (result.success) {
        showToast(result.message, "success");
      } else {
        showToast(`Failed to share: ${result.message}`, "danger");
      }
    } catch (error) {
      console.error("Error sharing CV:", error);
      showToast("Failed to share CV", "danger");
    }
  };

  const CurrentStepComponent = steps[currentStep].component;
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="cv-editor-wrapper">
      <ToastContainer
        position="top-center"
        className="p-3"
        style={{
          zIndex: 1050,
          position: "fixed",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            onClose={() =>
              setToasts((prev) => prev.filter((t) => t.id !== toast.id))
            }
            show={true}
            delay={3000}
            autohide
            bg={toast.variant}
          >
            <Toast.Body
              className={toast.variant === "danger" ? "text-white" : ""}
            >
              {toast.message}
            </Toast.Body>
          </Toast>
        ))}
      </ToastContainer>

      {/* Top Header */}
      <div className="editor-top-header">
        <div className="header-content">
          <h1 className="editor-main-title">CV Editor</h1>
          <button 
            className="dashboard-link-btn"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>
        </div>
        <div className="progress-bar-container">
          <ProgressBar 
            now={progress} 
            className="main-progress-bar"
            label={`Step ${currentStep + 1} of ${steps.length}`}
          />
        </div>
      </div>

      {/* Main Content */}
      <Container fluid className="editor-main-container">
        <Row className="editor-row">
          {/* Left Side - Form Panel */}
          <Col md={6} className="form-column">
            <div className="form-panel">
              <div className="form-header">
                <h2 className="form-title">{steps[currentStep].name}</h2>
              </div>

              <div className="form-body">
                <CurrentStepComponent
                  data={cvData[steps[currentStep].dataKey]}
                  onChange={(data) =>
                    handleDataChange(steps[currentStep].dataKey, data)
                  }
                />
              </div>

              <div className="form-footer">
                <button
                  className="nav-button prev-button"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                >
                  <ArrowLeft size={18} />
                  <span>Previous</span>
                </button>
                {currentStep === steps.length - 1 ? (
                  <button 
                    className="nav-button finish-button"
                    onClick={handleSave}
                  >
                    <CheckCircle size={18} />
                    <span>Finish & Save</span>
                  </button>
                ) : (
                  <button 
                    className="nav-button next-button"
                    onClick={handleNext}
                  >
                    <span>Next</span>
                    <ArrowRight size={18} />
                  </button>
                )}
              </div>
            </div>
          </Col>

          {/* Right Side - Preview Panel */}
          <Col md={6} className="preview-column">
            <div className="preview-panel">
              <div className="preview-header">
                <h2 className="preview-title">Live Preview</h2>
                <div className="preview-actions">
                  {/* <button 
                    className="preview-action-btn save-cv-btn"
                    onClick={handleSave}
                    disabled={isSaving}
                  >
                    <Save size={16} />
                    <span>Save CV</span>
                  </button> */}
                  <button 
                    className="preview-action-btn download-pdf-btn"
                    onClick={handleDownload}
                  >
                    <Download size={16} />
                    <span>Download PDF</span>
                  </button>
                  <button 
                    className="preview-action-btn share-cv-btn"
                    onClick={handleShare}
                  >
                    <Share2 size={16} />
                    <span>Share</span>
                  </button>
                </div>
              </div>

              <div className="preview-body">
                <CVPreview data={cvData} layout={cvData.layout} />
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <PaymentModal
        show={showPaymentModal}
        onHide={() => setShowPaymentModal(false)}
        onPaymentSuccess={() => {
          if (pendingAction === "download") processDownload();
          if (pendingAction === "share") processShare();
        }}
      />
    </div>
  );
};

export default CVEditor;