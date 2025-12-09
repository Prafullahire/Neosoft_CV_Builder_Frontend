// import React, { useState,useEffect } from 'react';
// import { Form, Alert } from 'react-bootstrap';

// const Experience = ({ data = [], onChange }) => {
//     const [errors, setErrors] = useState({});

//     const handleAdd = () => {
//         onChange([
//             ...data,
//             {
//                 company: '',
//                 position: '',
//                 location: '',
//                 joiningDate: '',
//                 leavingDate: '',
//                 ctc: '',
//                 technologies: [],
//                 description: '',
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
//         // Clear error for this field when user edits
//         if (errors[`${index}-${field}`]) {
//             const newErrors = { ...errors };
//             delete newErrors[`${index}-${field}`];
//             setErrors(newErrors);
//         }
//     };

//     const handleTechnologiesChange = (index, value) => {
//         const technologies = value.split(',').map((tech) => tech.trim());
//         handleChange(index, 'technologies', technologies);
//     };

//     const validateExperience = () => {
//         const newErrors = {};
//         let isValid = true;

//         data.forEach((exp, index) => {
//             if (!exp.company || exp.company.trim() === '') {
//                 newErrors[`${index}-company`] = 'Company name is required';
//                 isValid = false;
//             }
//             if (!exp.position || exp.position.trim() === '') {
//                 newErrors[`${index}-position`] = 'Position is required';
//                 isValid = false;
//             }
//         });

//         setErrors(newErrors);
//         return isValid;
//     };

//     useEffect(() => {
//         window.experienceValidate = validateExperience;
//     }, [data, errors]);

//     const getFieldError = (index, field) => {
//         return errors[`${index}-${field}`] || '';
//     };

//     return (
//         <div className="array-section">
//             {Object.keys(errors).length > 0 && (
//                 <Alert variant="warning" className="mb-3">
//                     <Alert.Heading> Please fill in all required fields:</Alert.Heading>
//                     <ul className="mb-0">
//                         {Object.values(errors).map((error, idx) => (
//                             <li key={idx}>{error}</li>
//                         ))}
//                     </ul>
//                 </Alert>
//             )}

//             {data.map((exp, index) => (
//                 <div key={index} className="array-item">
//                     <div className="array-item-header">
//                         <h5>Experience #{index + 1}</h5>
//                         <button className="remove-button" onClick={() => handleRemove(index)}>
//                             Remove
//                         </button>
//                     </div>

//                     <Form.Group className="mb-3">
//                         <Form.Label>Company Name *</Form.Label>
//                         <Form.Control
//                             type="text"
//                             value={exp.company}
//                             onChange={(e) => handleChange(index, 'company', e.target.value)}
//                             placeholder="e.g., Google"
//                             isInvalid={!!getFieldError(index, 'company')}
//                             required
//                         />
//                         {getFieldError(index, 'company') && (
//                             <Form.Text className="d-block text-danger mt-1">
//                                 {getFieldError(index, 'company')}
//                             </Form.Text>
//                         )}
//                     </Form.Group>

//                     <Form.Group className="mb-3">
//                         <Form.Label>Position *</Form.Label>
//                         <Form.Control
//                             type="text"
//                             value={exp.position}
//                             onChange={(e) => handleChange(index, 'position', e.target.value)}
//                             placeholder="e.g., Senior Software Engineer"
//                             isInvalid={!!getFieldError(index, 'position')}
//                             required
//                         />
//                         {getFieldError(index, 'position') && (
//                             <Form.Text className="d-block text-danger mt-1">
//                                 {getFieldError(index, 'position')}
//                             </Form.Text>
//                         )}
//                     </Form.Group>

//                     <Form.Group className="mb-3">
//                         <Form.Label>Location</Form.Label>
//                         <Form.Control
//                             type="text"
//                             value={exp.location}
//                             onChange={(e) => handleChange(index, 'location', e.target.value)}
//                             placeholder="e.g., San Francisco, CA"
//                         />
//                     </Form.Group>

//                     <Form.Group className="mb-3">
//                         <Form.Label>Joining Date</Form.Label>
//                         <Form.Control
//                             type="text"
//                             value={exp.joiningDate}
//                             onChange={(e) => handleChange(index, 'joiningDate', e.target.value)}
//                             placeholder="e.g., Jan 2020"
//                         />
//                     </Form.Group>

//                     <Form.Group className="mb-3">
//                         <Form.Label>Leaving Date</Form.Label>
//                         <Form.Control
//                             type="text"
//                             value={exp.leavingDate}
//                             onChange={(e) => handleChange(index, 'leavingDate', e.target.value)}
//                             placeholder="e.g., Dec 2022 or Present"
//                         />
//                     </Form.Group>

//                     <Form.Group className="mb-3">
//                         <Form.Label>CTC</Form.Label>
//                         <Form.Control
//                             type="text"
//                             value={exp.ctc}
//                             onChange={(e) => handleChange(index, 'ctc', e.target.value)}
//                             placeholder="e.g., $120,000"
//                         />
//                     </Form.Group>

//                     <Form.Group className="mb-3">
//                         <Form.Label>Technologies (comma-separated)</Form.Label>
//                         <Form.Control
//                             type="text"
//                             value={exp.technologies?.join(', ') || ''}
//                             onChange={(e) => handleTechnologiesChange(index, e.target.value)}
//                             placeholder="e.g., React, Node.js, MongoDB"
//                         />
//                     </Form.Group>

//                     <Form.Group className="mb-3">
//                         <Form.Label>Description</Form.Label>
//                         <Form.Control
//                             as="textarea"
//                             rows={3}
//                             value={exp.description}
//                             onChange={(e) => handleChange(index, 'description', e.target.value)}
//                             placeholder="Describe your role and responsibilities..."
//                         />
//                     </Form.Group>
//                 </div>
//             ))}

//             <button className="add-button" onClick={handleAdd}>
//                 + Add Experience
//             </button>
//         </div>
//     );
// };

// export default Experience;

import React, { useState, useEffect } from 'react';
import { Form, Alert } from 'react-bootstrap';

const Experience = ({ data = [], onChange }) => {
    const [errors, setErrors] = useState({});

    // 👉 Automatically show 1 experience block on first render
    useEffect(() => {
        if (data.length === 0) {
            onChange([
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
        }
    }, []); // Runs once

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

        // Clear errors for removed item
        const newErrors = { ...errors };
        delete newErrors[index];
        setErrors(newErrors);
    };

    const handleChange = (index, field, value) => {
        const newData = [...data];
        newData[index] = { ...newData[index], [field]: value };
        onChange(newData);

        // Clear error for this field when user edits
        if (errors[`${index}-${field}`]) {
            const newErrors = { ...errors };
            delete newErrors[`${index}-${field}`];
            setErrors(newErrors);
        }
    };

    const handleTechnologiesChange = (index, value) => {
        const technologies = value.split(',').map((tech) => tech.trim());
        handleChange(index, 'technologies', technologies);
    };

    const validateExperience = () => {
        const newErrors = {};
        let isValid = true;

        data.forEach((exp, index) => {
            if (!exp.company || exp.company.trim() === '') {
                newErrors[`${index}-company`] = 'Company name is required';
                isValid = false;
            }
            if (!exp.position || exp.position.trim() === '') {
                newErrors[`${index}-position`] = 'Position is required';
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    useEffect(() => {
        if (window.currentStepValidate !== undefined) {
            window.experienceValidate = validateExperience;
        }
    }, [data, errors]);

    const getFieldError = (index, field) => {
        return errors[`${index}-${field}`] || '';
    };

    return (
        <div className="array-section">
            {Object.keys(errors).length > 0 && (
                <Alert variant="warning" className="mb-3">
                    <Alert.Heading>Please fill in all required fields:</Alert.Heading>
                    <ul className="mb-0">
                        {Object.values(errors).map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul>
                </Alert>
            )}

            {data.map((exp, index) => (
                <div key={index} className="array-item">
                    <div className="array-item-header">
                        <h5>Experience #{index + 1}</h5>

                        {/* Hide remove button when only 1 experience exists */}
                        {data.length > 1 && (
                            <button className="remove-button" onClick={() => handleRemove(index)}>
                                Remove
                            </button>
                        )}
                    </div>

                    <Form.Group className="mb-3">
                        <Form.Label>Company Name *</Form.Label>
                        <Form.Control
                            type="text"
                            value={exp.company}
                            onChange={(e) => handleChange(index, 'company', e.target.value)}
                            placeholder="e.g., Google"
                            isInvalid={!!getFieldError(index, 'company')}
                            required
                        />
                        {getFieldError(index, 'company') && (
                            <Form.Text className="d-block text-danger mt-1">
                                {getFieldError(index, 'company')}
                            </Form.Text>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Position *</Form.Label>
                        <Form.Control
                            type="text"
                            value={exp.position}
                            onChange={(e) => handleChange(index, 'position', e.target.value)}
                            placeholder="e.g., Senior Software Engineer"
                            isInvalid={!!getFieldError(index, 'position')}
                            required
                        />
                        {getFieldError(index, 'position') && (
                            <Form.Text className="d-block text-danger mt-1">
                                {getFieldError(index, 'position')}
                            </Form.Text>
                        )}
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
    