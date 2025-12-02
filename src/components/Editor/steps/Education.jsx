import React from 'react';
import { Form, Button } from 'react-bootstrap';

const Education = ({ data = [], onChange }) => {
    const handleAdd = () => {
        onChange([
            ...data,
            {
                degree: '',
                institution: '',
                percentage: '',
                year: '',
                startDate: '',
                endDate: '',
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

    return (
        <div className="array-section">
            {data.map((edu, index) => (
                <div key={index} className="array-item">
                    <div className="array-item-header">
                        <h5>Education #{index + 1}</h5>
                        <button className="remove-button" onClick={() => handleRemove(index)}>
                            Remove
                        </button>
                    </div>

                    <Form.Group className="mb-3">
                        <Form.Label>Degree/Qualification *</Form.Label>
                        <Form.Control
                            type="text"
                            value={edu.degree}
                            onChange={(e) => handleChange(index, 'degree', e.target.value)}
                            placeholder="e.g., B.Tech in Computer Science"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Institution *</Form.Label>
                        <Form.Control
                            type="text"
                            value={edu.institution}
                            onChange={(e) => handleChange(index, 'institution', e.target.value)}
                            placeholder="e.g., MIT"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Percentage/CGPA</Form.Label>
                        <Form.Control
                            type="number"
                            value={edu.percentage}
                            onChange={(e) => handleChange(index, 'percentage', e.target.value)}
                            placeholder="e.g., 85"
                            min="0"
                            max="100"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Year</Form.Label>
                        <Form.Control
                            type="text"
                            value={edu.year}
                            onChange={(e) => handleChange(index, 'year', e.target.value)}
                            placeholder="e.g., 2020 or 2018-2022"
                        />
                    </Form.Group>
                </div>
            ))}

            <button className="add-button" onClick={handleAdd}>
                + Add Education
            </button>
        </div>
    );
};

export default Education;
