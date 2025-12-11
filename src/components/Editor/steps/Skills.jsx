import React, { useState, useEffect, useCallback } from "react";
import { Form } from "react-bootstrap";

const Skills = ({ data = [], onChange }) => {
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (data.length === 0) {
      onChange([
        {
          name: "",
          proficiency: 50,
        },
      ]);
    }
  }, [data.length, onChange]);

  const handleAdd = () => {
    onChange([...data, { name: "", proficiency: 50 }]);
  };

  const handleRemove = (index) => {
    const newData = data.filter((_, i) => i !== index);
    onChange(newData);

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

    if (errors[`${index}-${field}`]) {
      const newErrors = { ...errors };
      delete newErrors[`${index}-${field}`];
      setErrors(newErrors);
    }
  };

  const validateSkills = useCallback(() => {
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
  }, [data]);

  useEffect(() => {
    window.skillsValidate = validateSkills;
  }, [validateSkills]);

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
