import React from 'react';
import { Form } from 'react-bootstrap';

const SocialProfiles = ({ data = [], onChange }) => {
    const handleAdd = () => {
        onChange([
            ...data,
            {
                platform: '',
                url: '',
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

    const platformOptions = [
        'LinkedIn',
        'GitHub',
        'Twitter',
        'Facebook',
        'Instagram',
        'Portfolio',
        'Medium',
        'Stack Overflow',
        'Other',
    ];

    return (
        <div className="array-section">
            {data.map((profile, index) => (
                <div key={index} className="array-item">
                    <div className="array-item-header">
                        <h5>Social Profile #{index + 1}</h5>
                        <button className="remove-button" onClick={() => handleRemove(index)}>
                            Remove
                        </button>
                    </div>

                    <Form.Group className="mb-3">
                        <Form.Label>Platform *</Form.Label>
                        <Form.Select
                            value={profile.platform}
                            onChange={(e) => handleChange(index, 'platform', e.target.value)}
                            required
                        >
                            <option value="">Select Platform</option>
                            {platformOptions.map((platform) => (
                                <option key={platform} value={platform}>
                                    {platform}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Profile URL *</Form.Label>
                        <Form.Control
                            type="url"
                            value={profile.url}
                            onChange={(e) => handleChange(index, 'url', e.target.value)}
                            placeholder="https://linkedin.com/in/yourprofile"
                            required
                        />
                    </Form.Group>
                </div>
            ))}

            <button className="add-button" onClick={handleAdd}>
                + Add Social Profile
            </button>
        </div>
    );
};

export default SocialProfiles;
