import React from 'react';
import { Form } from 'react-bootstrap';

const Skills = ({ data = [], onChange }) => {
    const handleAdd = () => {
        onChange([
            ...data,
            {
                name: '',
                proficiency: 50,
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
            {data.map((skill, index) => (
                <div key={index} className="array-item">
                    <div className="array-item-header">
                        <h5>Skill #{index + 1}</h5>
                        <button className="remove-button" onClick={() => handleRemove(index)}>
                            Remove
                        </button>
                    </div>

                    <Form.Group className="mb-3">
                        <Form.Label>Skill Name *</Form.Label>
                        <Form.Control
                            type="text"
                            value={skill.name}
                            onChange={(e) => handleChange(index, 'name', e.target.value)}
                            placeholder="e.g., JavaScript"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Proficiency: {skill.proficiency}%</Form.Label>
                        <Form.Range
                            value={skill.proficiency}
                            onChange={(e) => handleChange(index, 'proficiency', parseInt(e.target.value))}
                            min="0"
                            max="100"
                            step="5"
                        />
                        <div className="d-flex justify-content-between">
                            <small>Beginner</small>
                            <small>Expert</small>
                        </div>
                    </Form.Group>
                </div>
            ))}

            <button className="add-button" onClick={handleAdd}>
                + Add Skill
            </button>
        </div>
    );
};

export default Skills;
