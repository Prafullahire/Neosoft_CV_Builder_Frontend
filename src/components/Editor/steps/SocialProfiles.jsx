// import React, { useState, useEffect } from 'react';
// import { Form, Alert } from 'react-bootstrap';

// const SocialProfiles = ({ data = [], onChange }) => {
//     const [errors, setErrors] = useState({});

//     // Auto-add one profile when component loads (initial render)
//     useEffect(() => {
//         if (data.length === 0) {
//             handleAdd();
//         }
//     }, []); // run once on mount

//     const handleAdd = () => {
//         onChange([
//             ...data,
//             {
//                 platform: '',
//                 url: '',
//             },
//         ]);
//     };

//     const handleRemove = (index) => {
//         const newData = data.filter((_, i) => i !== index);
//         onChange(newData);

//         // Clear errors for removed item
//         const newErrors = { ...errors };
//         delete newErrors[index];
//         setErrors(newErrors);
//     };

//     const handleChange = (index, field, value) => {
//         const newData = [...data];
//         newData[index] = { ...newData[index], [field]: value };
//         onChange(newData);

//         // Clear error when user edits
//         if (errors[`${index}-${field}`]) {
//             const newErrors = { ...errors };
//             delete newErrors[`${index}-${field}`];
//             setErrors(newErrors);
//         }
//     };

//     const validateSocialProfiles = () => {
//         const newErrors = {};
//         let isValid = true;

//         data.forEach((profile, index) => {
//             if (!profile.platform || profile.platform.trim() === '') {
//                 newErrors[`${index}-platform`] = 'Platform is required';
//                 isValid = false;
//             }
//             if (!profile.url || profile.url.trim() === '') {
//                 newErrors[`${index}-url`] = 'Profile URL is required';
//                 isValid = false;
//             } else if (!/^https?:\/\/.+/.test(profile.url)) {
//                 newErrors[`${index}-url`] = 'Please enter a valid URL starting with http:// or https://';
//                 isValid = false;
//             }
//         });

//         setErrors(newErrors);
//         return isValid;
//     };

//     // Expose validation to parent
//     useEffect(() => {
//         window.socialProfilesValidate = validateSocialProfiles;
//     }, [data, errors]);

//     const platformOptions = [
//         'LinkedIn',
//         'GitHub',
//         'Twitter',
//         'Facebook',
//         'Instagram',
//         'Portfolio',
//         'Medium',
//         'Stack Overflow',
//         'Other',
//     ];

//     const getFieldError = (index, field) => {
//         return errors[`${index}-${field}`] || '';
//     };

//     return (
//         <div className="array-section">
//             {Object.keys(errors).length > 0 && (
//                 <Alert variant="warning" className="mb-3">
//                     <Alert.Heading>Please fill in all required fields:</Alert.Heading>
//                     <ul className="mb-0">
//                         {Object.values(errors).map((error, idx) => (
//                             <li key={idx}>{error}</li>
//                         ))}
//                     </ul>
//                 </Alert>
//             )}

//             {data.map((profile, index) => (
//                 <div key={index} className="array-item">
//                     <div className="array-item-header">
//                         <h5>Social Profile #{index + 1}</h5>
//                         <button className="remove-button" onClick={() => handleRemove(index)}>
//                             Remove
//                         </button>
//                     </div>

//                     <Form.Group className="mb-3">
//                         <Form.Label>Platform *</Form.Label>
//                         <Form.Select
//                             value={profile.platform}
//                             onChange={(e) => handleChange(index, 'platform', e.target.value)}
//                             isInvalid={!!getFieldError(index, 'platform')}
//                             required
//                         >
//                             <option value="">Select Platform</option>
//                             {platformOptions.map((platform) => (
//                                 <option key={platform} value={platform}>
//                                     {platform}
//                                 </option>
//                             ))}
//                         </Form.Select>
//                         {getFieldError(index, 'platform') && (
//                             <Form.Text className="d-block text-danger mt-1">
//                                 {getFieldError(index, 'platform')}
//                             </Form.Text>
//                         )}
//                     </Form.Group>

//                     <Form.Group className="mb-3">
//                         <Form.Label>Profile URL *</Form.Label>
//                         <Form.Control
//                             type="url"
//                             value={profile.url}
//                             onChange={(e) => handleChange(index, 'url', e.target.value)}
//                             placeholder="https://linkedin.com/in/yourprofile"
//                             isInvalid={!!getFieldError(index, 'url')}
//                             required
//                         />
//                         {getFieldError(index, 'url') && (
//                             <Form.Text className="d-block text-danger mt-1">
//                                 {getFieldError(index, 'url')}
//                             </Form.Text>
//                         )}
//                     </Form.Group>
//                 </div>
//             ))}

//             <button className="add-button" onClick={handleAdd}>
//                 + Add Social Profile
//             </button>
//         </div>
//     );
// };

// export default SocialProfiles;


import React, { useState, useEffect } from 'react';
import { Form, Alert } from 'react-bootstrap';

const SocialProfiles = ({ data = [], onChange }) => {
    const [errors, setErrors] = useState({});

    // Initialize with one profile if empty
    useEffect(() => {
        if (data.length === 0) {
            onChange([{ platform: '', url: '' }]);
        }
    }, []);

    const handleAdd = () => {
        onChange([...data, { platform: '', url: '' }]);
    };

    const handleRemove = (index) => {
        const newData = data.filter((_, i) => i !== index);
        onChange(newData);

        // Clear errors for removed item
        const newErrors = { ...errors };
        Object.keys(newErrors).forEach(key => key.startsWith(`${index}-`) && delete newErrors[key]);
        setErrors(newErrors);
    };

    const handleChange = (index, field, value) => {
        const newData = [...data];
        newData[index] = { ...newData[index], [field]: value };
        onChange(newData);

        // Clear error for edited field
        if (errors[`${index}-${field}`]) {
            const newErrors = { ...errors };
            delete newErrors[`${index}-${field}`];
            setErrors(newErrors);
        }
    };

    const validateSocialProfiles = () => {
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
    };

    // Expose validation to parent step
    useEffect(() => {
        window.socialProfilesValidate = validateSocialProfiles;
    }, [data, errors]);

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
            {Object.keys(errors).length > 0 && (
                <Alert variant="warning" className="mb-3">
                    <Alert.Heading>Please fill in all required fields:</Alert.Heading>
                    <ul className="mb-0">
                        {Object.values(errors).map((err, i) => <li key={i}>{err}</li>)}
                    </ul>
                </Alert>
            )}

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
