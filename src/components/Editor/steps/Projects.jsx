import React from 'react';
import { Form } from 'react-bootstrap';

const Projects = ({ data = [], onChange }) => {
    const handleAdd = () => {
        onChange([
            ...data,
            {
                title: '',
                description: '',
                duration: '',
                teamSize: '',
                technologies: [],
                role: '',
            },
        ]);
    };

    const handleRemove = (index) => {
        const newData = data.filter((_, i) => i !== index);
        onChange(newData);
    };

    const handleChange = (index, field, value) => {
        const newData = [...data];
        newData[index] = { ...newData[index], [field]: value };
        onChange(newData);
    };

    const handleTechnologiesChange = (index, value) => {
        const technologies = value.split(',').map((tech) => tech.trim());
        handleChange(index, 'technologies', technologies);
    };

    return (
        <div className="array-section">
            {data.map((project, index) => (
                <div key={index} className="array-item">
                    <div className="array-item-header">
                        <h5>Project #{index + 1}</h5>
                        <button className="remove-button" onClick={() => handleRemove(index)}>
                            Remove
                        </button>
                    </div>

                    <Form.Group className="mb-3">
                        <Form.Label>Project Title *</Form.Label>
                        <Form.Control
                            type="text"
                            value={project.title}
                            onChange={(e) => handleChange(index, 'title', e.target.value)}
                            placeholder="e.g., E-commerce Platform"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={project.description}
                            onChange={(e) => handleChange(index, 'description', e.target.value)}
                            placeholder="Describe the project..."
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Duration</Form.Label>
                        <Form.Control
                            type="text"
                            value={project.duration}
                            onChange={(e) => handleChange(index, 'duration', e.target.value)}
                            placeholder="e.g., 6 months"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Team Size</Form.Label>
                        <Form.Control
                            type="number"
                            value={project.teamSize}
                            onChange={(e) => handleChange(index, 'teamSize', e.target.value)}
                            placeholder="e.g., 5"
                            min="1"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Technologies (comma-separated)</Form.Label>
                        <Form.Control
                            type="text"
                            value={project.technologies?.join(', ') || ''}
                            onChange={(e) => handleTechnologiesChange(index, e.target.value)}
                            placeholder="e.g., React, Express, PostgreSQL"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Your Role</Form.Label>
                        <Form.Control
                            type="text"
                            value={project.role}
                            onChange={(e) => handleChange(index, 'role', e.target.value)}
                            placeholder="e.g., Full Stack Developer"
                        />
                    </Form.Group>
                </div>
            ))}

            <button className="add-button" onClick={handleAdd}>
                + Add Project
            </button>
        </div>
    );
};

export default Projects;
