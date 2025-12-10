// import React, { useState, useEffect } from "react";
// import { Form,  Alert } from "react-bootstrap";

// const Education = ({ data = [], onChange }) => {
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (data.length === 0) {
//       onChange([
//         {
//           degree: "",
//           institution: "",
//           percentage: "",
//           year: "",
//           startDate: "",
//           endDate: "",
//         },
//       ]);
//     }
//   }, [data.length, onChange]);

//   const handleAdd = () => {
//     onChange([
//       ...data,
//       {
//         degree: "",
//         institution: "",
//         percentage: "",
//         year: "",
//         startDate: "",
//         endDate: "",
//       },
//     ]);
//   };

//   const handleRemove = (index) => {
//     const newData = data.filter((_, i) => i !== index);
//     onChange(newData);

//     const newErrors = { ...errors };
//     delete newErrors[index];
//     setErrors(newErrors);
//   };

//   const handleChange = (index, field, value) => {
//     const newData = [...data];
//     newData[index] = { ...newData[index], [field]: value };
//     onChange(newData);

//     if (errors[`${index}-${field}`]) {
//       const newErrors = { ...errors };
//       delete newErrors[`${index}-${field}`];
//       setErrors(newErrors);
//     }
//   };

//   const validateEducation = () => {
//     const newErrors = {};
//     let isValid = true;

//     data.forEach((edu, index) => {
//       if (!edu.degree || edu.degree.trim() === "") {
//         newErrors[`${index}-degree`] = "Degree is required";
//         isValid = false;
//       }
//       if (!edu.institution || edu.institution.trim() === "") {
//         newErrors[`${index}-institution`] = "Institution is required";
//         isValid = false;
//       }
//     });

//     setErrors(newErrors);
//     return isValid;
//   };

//   useEffect(() => {
//     if (window.currentStepValidate !== undefined) {
//       window.educationValidate = validateEducation;
//     }
//   }, [data, errors,]);

//   const getFieldError = (index, field) => {
//     return errors[`${index}-${field}`] || "";
//   };

//   return (
//     <div className="array-section">
//       {Object.keys(errors).length > 0 && (
//         <Alert variant="warning" className="mb-3">
//           <Alert.Heading>Please fill in all required fields:</Alert.Heading>
//           <ul className="mb-0">
//             {Object.values(errors).map((error, idx) => (
//               <li key={idx}>{error}</li>
//             ))}
//           </ul>
//         </Alert>
//       )}

//       {data.map((edu, index) => (
//         <div key={index} className="array-item">
//           <div className="array-item-header">
//             <h5>Education #{index + 1}</h5>
//             {data.length > 1 && (
//               <button
//                 className="remove-button"
//                 onClick={() => handleRemove(index)}
//               >
//                 Remove
//               </button>
//             )}
//           </div>

//           <Form.Group className="mb-3">
//             <Form.Label>Degree/Qualification *</Form.Label>
//             <Form.Control
//               type="text"
//               value={edu.degree}
//               onChange={(e) => handleChange(index, "degree", e.target.value)}
//               placeholder="e.g., B.Tech in Computer Science"
//               isInvalid={!!getFieldError(index, "degree")}
//               required
//             />
//             {getFieldError(index, "degree") && (
//               <Form.Text className="d-block text-danger mt-1">
//                 {getFieldError(index, "degree")}
//               </Form.Text>
//             )}
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Institution *</Form.Label>
//             <Form.Control
//               type="text"
//               value={edu.institution}
//               onChange={(e) =>
//                 handleChange(index, "institution", e.target.value)
//               }
//               placeholder="e.g., MIT"
//               isInvalid={!!getFieldError(index, "institution")}
//               required
//             />
//             {getFieldError(index, "institution") && (
//               <Form.Text className="d-block text-danger mt-1">
//                 {getFieldError(index, "institution")}
//               </Form.Text>
//             )}
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Percentage/CGPA</Form.Label>
//             <Form.Control
//               type="number"
//               value={edu.percentage}
//               onChange={(e) =>
//                 handleChange(index, "percentage", e.target.value)
//               }
//               placeholder="e.g., 85"
//               min="0"
//               max="100"
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Year</Form.Label>
//             <Form.Control
//               type="text"
//               value={edu.year}
//               onChange={(e) => handleChange(index, "year", e.target.value)}
//               placeholder="e.g., 2020 or 2018-2022"
//             />
//           </Form.Group>
//         </div>
//       ))}

//       <button className="add-button" onClick={handleAdd}>
//         + Add Education
//       </button>
//     </div>
//   );
// };

// export default Education;


import React, { useState, useEffect } from "react";
import { Form, Alert } from "react-bootstrap";

const Education = ({ data = [], onChange }) => {
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (data.length === 0) {
      onChange([
        {
          degree: "",
          institution: "",
          percentage: "",
          year: "",
          startDate: "",
          endDate: "",
        },
      ]);
    }
  }, [data.length, onChange]);

  const handleAdd = () => {
    onChange([
      ...data,
      {
        degree: "",
        institution: "",
        percentage: "",
        year: "",
        startDate: "",
        endDate: "",
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

  const validateEducation = () => {
    const newErrors = {};
    let isValid = true;

    data.forEach((edu, index) => {
      if (!edu.degree || edu.degree.trim() === "") {
        newErrors[`${index}-degree`] = "Degree is required";
        isValid = false;
      }
      if (!edu.institution || edu.institution.trim() === "") {
        newErrors[`${index}-institution`] = "Institution is required";
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  useEffect(() => {
    window.educationValidate = validateEducation;
  }, [data, errors]);

  const getFieldError = (index, field) => {
    return errors[`${index}-${field}`] || "";
  };

  return (
    <div className="array-section">
      {data.map((edu, index) => (
        <div key={index} className="array-item">
          <div className="array-item-header">
            <h5>Education #{index + 1}</h5>
            {data.length > 1 && (
              <button className="remove-button" onClick={() => handleRemove(index)}>
                Remove
              </button>
            )}
          </div>

          <Form.Group className="mb-3">
            <Form.Label>Degree/Qualification *</Form.Label>
            <Form.Control
              type="text"
              value={edu.degree}
              onChange={(e) => handleChange(index, "degree", e.target.value)}
              placeholder="e.g., B.Tech in Computer Science"
              isInvalid={!!getFieldError(index, "degree")}
            />
            {getFieldError(index, "degree") && (
              <Form.Text className="d-block text-danger mt-1">
                {getFieldError(index, "degree")}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Institution *</Form.Label>
            <Form.Control
              type="text"
              value={edu.institution}
              onChange={(e) =>
                handleChange(index, "institution", e.target.value)
              }
              placeholder="e.g., MIT"
              isInvalid={!!getFieldError(index, "institution")}
            />
            {getFieldError(index, "institution") && (
              <Form.Text className="d-block text-danger mt-1">
                {getFieldError(index, "institution")}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Percentage/CGPA</Form.Label>
            <Form.Control
              type="number"
              value={edu.percentage}
              onChange={(e) => handleChange(index, "percentage", e.target.value)}
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
              onChange={(e) => handleChange(index, "year", e.target.value)}
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
