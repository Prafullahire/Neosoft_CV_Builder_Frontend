import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import ProfessionalLayout from './templates/ProfessionalLayout';
import ModernLayout from './templates/ModernLayout';
import CreativeLayout from './templates/CreativeLayout';
import './LayoutSelector.css';

const LayoutSelector = () => {
    const navigate = useNavigate();
    const [selectedLayout, setSelectedLayout] = useState('professional');

    const sampleData = {
        basicDetails: {
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+1 234 567 8900',
            city: 'New York',
            state: 'NY',
            intro: 'Experienced software developer with a passion for creating elegant solutions.',
        },
        education: [
            {
                degree: 'B.Tech in Computer Science',
                institution: 'MIT',
                year: '2020',
                percentage: 85,
            },
        ],
        experience: [
            {
                position: 'Senior Developer',
                company: 'Tech Corp',
                joiningDate: 'Jan 2021',
                leavingDate: 'Present',
                technologies: ['React', 'Node.js', 'MongoDB'],
            },
        ],
        projects: [
            {
                title: 'E-commerce Platform',
                description: 'Built a full-stack e-commerce solution',
                technologies: ['React', 'Express', 'PostgreSQL'],
            },
        ],
        skills: [
            { name: 'JavaScript', proficiency: 90 },
            { name: 'React', proficiency: 85 },
            { name: 'Node.js', proficiency: 80 },
        ],
        socialProfiles: [
            { platform: 'LinkedIn', url: 'https://linkedin.com' },
            { platform: 'GitHub', url: 'https://github.com' },
        ],
    };

    const layouts = [
        {
            id: 'professional',
            name: 'Professional',
            description: 'Clean and traditional layout perfect for corporate roles',
            component: ProfessionalLayout,
        },
        {
            id: 'modern',
            name: 'Modern',
            description: 'Contemporary design with sidebar and timeline',
            component: ModernLayout,
        },
        {
            id: 'creative',
            name: 'Creative',
            description: 'Vibrant and colorful layout for creative professionals',
            component: CreativeLayout,
        },
    ];

    const handleSelectLayout = (layoutId) => {
        setSelectedLayout(layoutId);
    };

    const handleContinue = () => {
        navigate('/editor', { state: { layout: selectedLayout } });
    };

    return (
        <Container className="layout-selector-container mt-5">
            <h1 className="text-center mb-4">Choose Your CV Layout</h1>
            <p className="text-center text-muted mb-5">
                Select a layout that best represents your professional style
            </p>

            <Row className="mb-4">
                {layouts.map((layout) => (
                    <Col key={layout.id} md={4} className="mb-4">
                        <Card
                            className={`layout-card ${selectedLayout === layout.id ? 'selected' : ''}`}
                            onClick={() => handleSelectLayout(layout.id)}
                        >
                            <Card.Body>
                                <div className="layout-preview">
                                    <div className="preview-wrapper">
                                        <layout.component data={sampleData} />
                                    </div>
                                </div>
                                <h4 className="mt-3">{layout.name}</h4>
                                <p className="text-muted">{layout.description}</p>
                                <Button
                                    variant={selectedLayout === layout.id ? 'primary' : 'outline-primary'}
                                    className="w-100"
                                >
                                    {selectedLayout === layout.id ? 'Selected' : 'Select'}
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <div className="text-center">
                <Button
                    variant="success"
                    size="lg"
                    onClick={handleContinue}
                    disabled={!selectedLayout}
                >
                    Continue to Editor
                </Button>
            </div>
        </Container>
    );
};

export default LayoutSelector;
