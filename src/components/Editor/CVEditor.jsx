import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Button, ProgressBar } from 'react-bootstrap';
import axios from 'axios';
import BasicDetails from './steps/BasicDetails';
import Education from './steps/Education';
import Experience from './steps/Experience';
import Projects from './steps/Projects';
import Skills from './steps/Skills';
import SocialProfiles from './steps/SocialProfiles';
import CVPreview from './CVPreview';
import PaymentModal from '../Payment/PaymentModal';
import './CVEditor.css';

const CVEditor = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const [currentStep, setCurrentStep] = useState(0);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [pendingAction, setPendingAction] = useState(null); // 'download' or 'share'

    const [cvData, setCvData] = useState({
        layout: location.state?.layout || 'professional',
        basicDetails: {
            name: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            state: '',
            pincode: '',
            image: '',
            intro: '',
        },
        education: [],
        experience: [],
        projects: [],
        skills: [],
        socialProfiles: [],
    });

    const steps = [
        { name: 'Basic Details', component: BasicDetails, dataKey: 'basicDetails' },
        { name: 'Education', component: Education, dataKey: 'education' },
        { name: 'Experience', component: Experience, dataKey: 'experience' },
        { name: 'Projects', component: Projects, dataKey: 'projects' },
        { name: 'Skills', component: Skills, dataKey: 'skills' },
        { name: 'Social Profiles', component: SocialProfiles, dataKey: 'socialProfiles' },
    ];

    useEffect(() => {
        // Load existing CV if editing
        if (id) {
            loadCV();
        }
    }, [id]);

    useEffect(() => {
        // Warn user about unsaved changes
        const handleBeforeUnload = (e) => {
            if (hasUnsavedChanges) {
                e.preventDefault();
                e.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [hasUnsavedChanges]);

    const loadCV = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.get(`http://localhost:5000/api/cvs/${id}`, config);
            setCvData(data);
        } catch (error) {
            console.error('Error loading CV:', error);
            alert('Failed to load CV');
        }
    };

    const handleDataChange = (section, data) => {
        setCvData((prev) => ({
            ...prev,
            [section]: data,
        }));
        setHasUnsavedChanges(true);
    };

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
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
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            if (id) {
                // Update existing CV
                await axios.put(`http://localhost:5000/api/cvs/${id}`, cvData, config);
                alert('CV updated successfully!');
            } else {
                // Create new CV
                const { data } = await axios.post('http://localhost:5000/api/cvs', cvData, config);
                alert('CV created successfully!');
                navigate(`/editor/${data._id}`, { replace: true });
            }

            setHasUnsavedChanges(false);
        } catch (error) {
            console.error('Error saving CV:', error);
            alert('Failed to save CV');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDownload = () => {
        setPendingAction('download');
        setShowPaymentModal(true);
    };

    const processDownload = async () => {
        const { generatePDF } = await import('../../utils/pdfUtils');
        const cvName = cvData.basicDetails?.name || 'CV';
        const filename = `${cvName.replace(/\s+/g, '_')}_CV.pdf`;

        const result = await generatePDF('cv-preview-wrapper', filename);

        if (result.success) {
            alert('PDF downloaded successfully!');
        } else {
            alert(`Failed to generate PDF: ${result.message}`);
        }
    };

    const handleShare = () => {
        setPendingAction('share');
        setShowPaymentModal(true);
    };

    const processShare = async () => {
        if (!id) {
            alert('Please save the CV first before sharing');
            return;
        }

        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            // Make CV public
            await axios.put(
                `http://localhost:5000/api/cvs/${id}`,
                { ...cvData, isPublic: true },
                config
            );

            const { shareCV } = await import('../../utils/pdfUtils');
            const cvName = cvData.basicDetails?.name || 'My CV';
            const result = await shareCV(id, cvName);

            if (result.success) {
                alert(result.message);
            } else {
                alert(`Failed to share: ${result.message}`);
            }
        } catch (error) {
            console.error('Error sharing CV:', error);
            alert('Failed to share CV');
        }
    };

    const CurrentStepComponent = steps[currentStep].component;
    const progress = ((currentStep + 1) / steps.length) * 100;

    return (
        <Container fluid className="cv-editor-container">
            <Row className="editor-header align-items-center">
                <Col>
                    <h2>CV Editor</h2>
                    <ProgressBar now={progress} label={`Step ${currentStep + 1} of ${steps.length}`} />
                </Col>
                <Col xs="auto">
                    <div className="header-actions">
                        <Button variant="outline-primary" onClick={() => navigate('/dashboard')}>
                            Dashboard
                        </Button>
                    </div>
                </Col>
            </Row>

            <Row className="editor-content">
                {/* Left Panel - Form */}
                <Col md={5} className="form-panel">
                    <div className="step-indicator">
                        <h3>{steps[currentStep].name}</h3>
                    </div>

                    <div className="form-content">
                        <CurrentStepComponent
                            data={cvData[steps[currentStep].dataKey]}
                            onChange={(data) =>
                                handleDataChange(steps[currentStep].dataKey, data)
                            }
                        />
                    </div>

                    <div className="navigation-buttons">
                        <Button
                            variant="secondary"
                            onClick={handlePrevious}
                            disabled={currentStep === 0}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleNext}
                            disabled={currentStep === steps.length - 1}
                        >
                            Next
                        </Button>
                    </div>
                </Col>

                {/* Right Panel - Preview */}
                <Col md={7} className="preview-panel">
                    <div className="preview-header">
                        <h4>Live Preview</h4>
                        <div className="action-buttons">
                            <Button variant="success" onClick={handleSave} disabled={isSaving}>
                                {isSaving ? 'Saving...' : 'Save CV'}
                            </Button>
                            <Button variant="info" onClick={handleDownload}>
                                Download PDF
                            </Button>
                            <Button variant="warning" onClick={handleShare}>
                                Share
                            </Button>
                        </div>
                    </div>
                    <div className="preview-content">
                        <CVPreview data={cvData} layout={cvData.layout} />
                    </div>
                </Col>
            </Row>
            <PaymentModal
                show={showPaymentModal}
                onHide={() => setShowPaymentModal(false)}
                onPaymentSuccess={() => {
                    if (pendingAction === 'download') processDownload();
                    if (pendingAction === 'share') processShare();
                }}
            />
        </Container >
    );
};

export default CVEditor;
