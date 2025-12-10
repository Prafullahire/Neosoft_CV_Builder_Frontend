// import React, { useState, useEffect } from 'react';
// import { Form, Alert } from 'react-bootstrap';

// const Skills = ({ data = [], onChange }) => {
//     const [errors, setErrors] = useState({});

//     // Auto add first skill when component loads and data is empty
//     useEffect(() => {
//         if (data.length === 0) {
//             handleAdd();
//         }
//     }, []); // run once

//     const handleAdd = () => {
//         onChange([
//             ...data,
//             {
//                 name: '',
//                 proficiency: 50,
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

//     const validateSkills = () => {
//         const newErrors = {};
//         let isValid = true;

//         data.forEach((skill, index) => {
//             if (!skill.name || skill.name.trim() === '') {
//                 newErrors[`${index}-name`] = 'Skill name is required';
//                 isValid = false;
//             }
//         });

//         setErrors(newErrors);
//         return isValid;
//     };

//     // Expose validation to parent
//     useEffect(() => {
//         window.skillsValidate = validateSkills;
//     }, [data, errors]);

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

//             {data.map((skill, index) => (
//                 <div key={index} className="array-item">
//                     <div className="array-item-header">
//                         <h5>Skill #{index + 1}</h5>
//                         <button className="remove-button" onClick={() => handleRemove(index)}>
//                             Remove
//                         </button>
//                     </div>

//                     <Form.Group className="mb-3">
//                         <Form.Label>Skill Name *</Form.Label>
//                         <Form.Control
//                             type="text"
//                             value={skill.name}
//                             onChange={(e) => handleChange(index, 'name', e.target.value)}
//                             placeholder="e.g., JavaScript"
//                             isInvalid={!!getFieldError(index, 'name')}
//                             required
//                         />
//                         {getFieldError(index, 'name') && (
//                             <Form.Text className="d-block text-danger mt-1">
//                                 {getFieldError(index, 'name')}
//                             </Form.Text>
//                         )}
//                     </Form.Group>

//                     <Form.Group className="mb-3">
//                         <Form.Label>Proficiency: {skill.proficiency}%</Form.Label>
//                         <Form.Range
//                             value={skill.proficiency}
//                             onChange={(e) => handleChange(index, 'proficiency', parseInt(e.target.value))}
//                             min="0"
//                             max="100"
//                             step="5"
//                         />
//                         <div className="d-flex justify-content-between">
//                             <small>Beginner</small>
//                             <small>Expert</small>
//                         </div>
//                     </Form.Group>
//                 </div>
//             ))}

//             <button className="add-button" onClick={handleAdd}>
//                 + Add Skill
//             </button>
//         </div>
//     );
// };

// export default Skills;

import React, { useState, useEffect } from "react";
import { Form, Alert } from "react-bootstrap";

const Skills = ({ data = [], onChange }) => {
  const [errors, setErrors] = useState({});

  // Initialize with one skill if empty
  useEffect(() => {
    if (data.length === 0) {
      onChange([
        {
          name: "",
          proficiency: 50,
        },
      ]);
    }
  }, []);

  const handleAdd = () => {
    onChange([...data, { name: "", proficiency: 50 }]);
  };

  const handleRemove = (index) => {
    const newData = data.filter((_, i) => i !== index);
    onChange(newData);

    // Clear errors for removed skill
    const newErrors = { ...errors };
    Object.keys(newErrors).forEach(
      (key) => key.startsWith(`${index}-`) && delete newErrors[key]
    );
    setErrors(newErrors);
  };

  const handleChange = (index, field, value) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    onChange(newData);

    // Clear error for field
    if (errors[`${index}-${field}`]) {
      const newErrors = { ...errors };
      delete newErrors[`${index}-${field}`];
      setErrors(newErrors);
    }
  };

  const validateSkills = () => {
    const newErrors = {};
    let isValid = true;

    data.forEach((skill, index) => {
      if (!skill.name || skill.name.trim() === "") {
        newErrors[`${index}-name`] = "Skill name is required";
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // Expose validation to parent
  useEffect(() => {
    window.skillsValidate = validateSkills;
  }, [data, errors]);

  const getFieldError = (index, field) => errors[`${index}-${field}`] || "";

  return (
    <div className="array-section">
      {data.map((skill, index) => (
        <div key={index} className="array-item">
          <div className="array-item-header">
            <h5>Skill #{index + 1}</h5>
            {data.length > 1 && (
              <button
                className="remove-button"
                onClick={() => handleRemove(index)}
              >
                Remove
              </button>
            )}
          </div>

          <Form.Group className="mb-3">
            <Form.Label>Skill Name *</Form.Label>
            <Form.Control
              type="text"
              value={skill.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
              placeholder="e.g., JavaScript"
              isInvalid={!!getFieldError(index, "name")}
            />
            {getFieldError(index, "name") && (
              <Form.Text className="d-block text-danger mt-1">
                {getFieldError(index, "name")}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Proficiency: {skill.proficiency}%</Form.Label>
            <Form.Range
              value={skill.proficiency}
              onChange={(e) =>
                handleChange(index, "proficiency", parseInt(e.target.value))
              }
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
