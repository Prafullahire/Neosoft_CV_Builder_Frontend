// import React, { useState, useEffect } from 'react';
// import { Form, Alert } from 'react-bootstrap';

// const Projects = ({ data = [], onChange }) => {
//     const [errors, setErrors] = useState({});

//     const handleAdd = () => {
//         onChange([
//             ...data,
//             {
//                 title: '',
//                 description: '',
//                 duration: '',
//                 teamSize: '',
//                 technologies: [],
//                 role: '',
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

//     const validateProjects = () => {
//         const newErrors = {};
//         let isValid = true;

//         data.forEach((project, index) => {
//             if (!project.title || project.title.trim() === '') {
//                 newErrors[`${index}-title`] = 'Project title is required';
//                 isValid = false;
//             }
//         });

//         setErrors(newErrors);
//         return isValid;
//     };

//     // Expose validation to parent
//    useEffect(() => {
//         window.projectsValidate = validateProjects;
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

//             {data.map((project, index) => (
//                 <div key={index} className="array-item">
//                     <div className="array-item-header">
//                         <h5>Project #{index + 1}</h5>
//                         <button className="remove-button" onClick={() => handleRemove(index)}>
//                             Remove
//                         </button>
//                     </div>

//                     <Form.Group className="mb-3">
//                         <Form.Label>Project Title *</Form.Label>
//                         <Form.Control
//                             type="text"
//                             value={project.title}
//                             onChange={(e) => handleChange(index, 'title', e.target.value)}
//                             placeholder="e.g., E-commerce Platform"
//                             isInvalid={!!getFieldError(index, 'title')}
//                             required
//                         />
//                         {getFieldError(index, 'title') && (
//                             <Form.Text className="d-block text-danger mt-1">
//                                 {getFieldError(index, 'title')}
//                             </Form.Text>
//                         )}
//                     </Form.Group>

//                     <Form.Group className="mb-3">
//                         <Form.Label>Description</Form.Label>
//                         <Form.Control
//                             as="textarea"
//                             rows={3}
//                             value={project.description}
//                             onChange={(e) => handleChange(index, 'description', e.target.value)}
//                             placeholder="Describe the project..."
//                         />
//                     </Form.Group>

//                     <Form.Group className="mb-3">
//                         <Form.Label>Duration</Form.Label>
//                         <Form.Control
//                             type="text"
//                             value={project.duration}
//                             onChange={(e) => handleChange(index, 'duration', e.target.value)}
//                             placeholder="e.g., 6 months"
//                         />
//                     </Form.Group>

//                     <Form.Group className="mb-3">
//                         <Form.Label>Team Size</Form.Label>
//                         <Form.Control
//                             type="number"
//                             value={project.teamSize}
//                             onChange={(e) => handleChange(index, 'teamSize', e.target.value)}
//                             placeholder="e.g., 5"
//                             min="1"
//                         />
//                     </Form.Group>

//                     <Form.Group className="mb-3">
//                         <Form.Label>Technologies (comma-separated)</Form.Label>
//                         <Form.Control
//                             type="text"
//                             value={project.technologies?.join(', ') || ''}
//                             onChange={(e) => handleTechnologiesChange(index, e.target.value)}
//                             placeholder="e.g., React, Express, PostgreSQL"
//                         />
//                     </Form.Group>

//                     <Form.Group className="mb-3">
//                         <Form.Label>Your Role</Form.Label>
//                         <Form.Control
//                             type="text"
//                             value={project.role}
//                             onChange={(e) => handleChange(index, 'role', e.target.value)}
//                             placeholder="e.g., Full Stack Developer"
//                         />
//                     </Form.Group>
//                 </div>
//             ))}

//             <button className="add-button" onClick={handleAdd}>
//                 + Add Project
//             </button>
//         </div>
//     );
// };

// export default Projects;

import React, { useState, useEffect } from 'react';
import { Form, Alert } from 'react-bootstrap';

const Projects = ({ data = [], onChange }) => {
    const [errors, setErrors] = useState({});

    // 👉 Always show at least one project form initially
    useEffect(() => {
        if (data.length === 0) {
            onChange([
                {
                    title: '',
                    description: '',
                    duration: '',
                    teamSize: '',
                    technologies: [],
                    role: '',
                },
            ]);
        }
    }, []); // run once

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

        const newErrors = { ...errors };
        delete newErrors[index];
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

    const handleTechnologiesChange = (index, value) => {
        const technologies = value.split(',').map((tech) => tech.trim());
        handleChange(index, 'technologies', technologies);
    };

    const validateProjects = () => {
        const newErrors = {};
        let isValid = true;

        data.forEach((project, index) => {
            if (!project.title || project.title.trim() === '') {
                newErrors[`${index}-title`] = 'Project title is required';
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    // 👉 Expose validation function to parent
    useEffect(() => {
        window.projectsValidate = validateProjects;
    }, [data, errors]);

    const getFieldError = (index, field) => {
        return errors[`${index}-${field}`] || '';
    };

    return (
        <div className="array-section">
            {Object.keys(errors).length > 0 && (
                <Alert variant="warning" className="mb-3">
                    <Alert.Heading> Please fill in required fields:</Alert.Heading>
                    <ul className="mb-0">
                        {Object.values(errors).map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul>
                </Alert>
            )}

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
                            placeholder="e.g., Stock Market Prediction System"
                            isInvalid={!!getFieldError(index, 'title')}
                            required
                        />
                        {getFieldError(index, 'title') && (
                            <Form.Text className="d-block text-danger mt-1">
                                {getFieldError(index, 'title')}
                            </Form.Text>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={project.description}
                            onChange={(e) => handleChange(index, 'description', e.target.value)}
                            placeholder="Brief project description..."
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Duration</Form.Label>
                        <Form.Control
                            type="text"
                            value={project.duration}
                            onChange={(e) => handleChange(index, 'duration', e.target.value)}
                            placeholder="e.g., 3 months"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Team Size</Form.Label>
                        <Form.Control
                            type="number"
                            value={project.teamSize}
                            onChange={(e) => handleChange(index, 'teamSize', e.target.value)}
                            placeholder="e.g., 4"
                            min="1"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Technologies (comma-separated)</Form.Label>
                        <Form.Control
                            type="text"
                            value={project.technologies?.join(', ') || ''}
                            onChange={(e) => handleTechnologiesChange(index, e.target.value)}
                            placeholder="e.g., Next.js, Flask, MongoDB"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Your Role</Form.Label>
                        <Form.Control
                            type="text"
                            value={project.role}
                            onChange={(e) => handleChange(index, 'role', e.target.value)}
                            placeholder="e.g., Backend Developer"
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
