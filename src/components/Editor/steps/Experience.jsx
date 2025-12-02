import React from 'react';
import { Form } from 'react-bootstrap';

const Experience = ({ data = [], onChange }) => {
    const handleAdd = () => {
        onChange([
            ...data,
            {
                company: '',
                position: '',
                location: '',
                joiningDate: '',
                leavingDate: '',
                ctc: '',
                technologies: [],
                description: '',
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
            {data.map((exp, index) => (
                <div key={index} className="array-item">
                    <div className="array-item-header">
                        <h5>Experience #{index + 1}</h5>
                        <button className="remove-button" onClick={() => handleRemove(index)}>
                            Remove
                        </button>
                    </div>

                    <Form.Group className="mb-3">
                        <Form.Label>Company Name *</Form.Label>
                        <Form.Control
                            type="text"
                            value={exp.company}
                            onChange={(e) => handleChange(index, 'company', e.target.value)}
                            placeholder="e.g., Google"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Position *</Form.Label>
                        <Form.Control
                            type="text"
                            value={exp.position}
                            onChange={(e) => handleChange(index, 'position', e.target.value)}
                            placeholder="e.g., Senior Software Engineer"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                            type="text"
                            value={exp.location}
                            onChange={(e) => handleChange(index, 'location', e.target.value)}
                            placeholder="e.g., San Francisco, CA"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Joining Date</Form.Label>
                        <Form.Control
                            type="text"
                            value={exp.joiningDate}
                            onChange={(e) => handleChange(index, 'joiningDate', e.target.value)}
                            placeholder="e.g., Jan 2020"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Leaving Date</Form.Label>
                        <Form.Control
                            type="text"
                            value={exp.leavingDate}
                            onChange={(e) => handleChange(index, 'leavingDate', e.target.value)}
                            placeholder="e.g., Dec 2022 or Present"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>CTC</Form.Label>
                        <Form.Control
                            type="text"
                            value={exp.ctc}
                            onChange={(e) => handleChange(index, 'ctc', e.target.value)}
                            placeholder="e.g., $120,000"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Technologies (comma-separated)</Form.Label>
                        <Form.Control
                            type="text"
                            value={exp.technologies?.join(', ') || ''}
                            onChange={(e) => handleTechnologiesChange(index, e.target.value)}
                            placeholder="e.g., React, Node.js, MongoDB"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={exp.description}
                            onChange={(e) => handleChange(index, 'description', e.target.value)}
                            placeholder="Describe your role and responsibilities..."
                        />
                    </Form.Group>
                </div>
            ))}

            <button className="add-button" onClick={handleAdd}>
                + Add Experience
            </button>
        </div>
    );
};

export default Experience;
