import React, { useState, useEffect, useCallback } from 'react';
import { Form } from 'react-bootstrap';

const SocialProfiles = ({ data = [], onChange }) => {
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (data.length === 0) {
            onChange([{ platform: '', url: '' }]);
        }
    }, [data.length, onChange]);

    const handleAdd = () => {
        onChange([...data, { platform: '', url: '' }]);
    };

    const handleRemove = (index) => {
        const newData = data.filter((_, i) => i !== index);
        onChange(newData);

        const newErrors = { ...errors };
        Object.keys(newErrors).forEach(key => key.startsWith(`${index}-`) && delete newErrors[key]);
        setErrors(newErrors);
    };

    const handleChange = (index, field, value) => {
        const newData = [...data];
        newData[index] = { ...newData[index], [field]: value };
        onChange(newData);

        if (errors[`${index}-${field}`]) {
            const newErrors = { ...errors };
            delete newErrors[`${index}-${field}`];
            setErrors(newErrors);
        }
    };

    const validateSocialProfiles = useCallback(() => {
        const newErrors = {};
        let isValid = true;

        data.forEach((profile, index) => {
            if (!profile.platform || profile.platform.trim() === '') {
                newErrors[`${index}-platform`] = 'Platform is required';
                isValid = false;
            }
            if (!profile.url || profile.url.trim() === '') {
                newErrors[`${index}-url`] = 'Profile URL is required';
                isValid = false;
            } else if (!/^https?:\/\/.+/.test(profile.url)) {
                newErrors[`${index}-url`] = 'URL must start with http:// or https://';
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    }, [data]);

    useEffect(() => {
        window.socialProfilesValidate = validateSocialProfiles;
    }, [validateSocialProfiles]);

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

    const getFieldError = (index, field) => errors[`${index}-${field}`] || '';

    return (
        <div className="array-section">
            {data.map((profile, index) => (
                <div key={index} className="array-item">
                    <div className="array-item-header">
                        <h5>Social Profile #{index + 1}</h5>
                        {data.length > 1 && (
                            <button className="remove-button" onClick={() => handleRemove(index)}>
                                Remove
                            </button>
                        )}
                    </div>

                    <Form.Group className="mb-3">
                        <Form.Label>Platform *</Form.Label>
                        <Form.Select
                            value={profile.platform}
                            onChange={(e) => handleChange(index, 'platform', e.target.value)}
                            isInvalid={!!getFieldError(index, 'platform')}
                        >
                            <option value="">Select Platform</option>
                            {platformOptions.map(platform => (
                                <option key={platform} value={platform}>{platform}</option>
                            ))}
                        </Form.Select>
                        {getFieldError(index, 'platform') && (
                            <Form.Text className="d-block text-danger mt-1">
                                {getFieldError(index, 'platform')}
                            </Form.Text>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Profile URL *</Form.Label>
                        <Form.Control
                            type="url"
                            value={profile.url}
                            onChange={(e) => handleChange(index, 'url', e.target.value)}
                            placeholder="https://linkedin.com/in/yourprofile"
                            isInvalid={!!getFieldError(index, 'url')}
                        />
                        {getFieldError(index, 'url') && (
                            <Form.Text className="d-block text-danger mt-1">
                                {getFieldError(index, 'url')}
                            </Form.Text>
                        )}
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
