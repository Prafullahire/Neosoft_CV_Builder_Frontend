import React, { useState, useEffect, useCallback } from "react";
import { Form } from "react-bootstrap";

const BasicDetails = ({ data = {}, onChange }) => {
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!data || Object.keys(data).length === 0) {
      onChange({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        image: "",
        designation: "",
        intro: "",
      });
    }
  }, [data, onChange]);

  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });

    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ ...data, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  const validateBasicDetails = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    if (!data.name) {
      newErrors.name = "Full Name is required ";
      isValid = false;
    }

    if (!data.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!data.phone) {
      newErrors.phone = "Valid Phone Number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(data.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
      isValid = false;
    }

    if (!data.designation || data.designation.trim() === "") {
      newErrors.designation = "Designation is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }, [data]);

  useEffect(() => {
    window.basicDetailsValidate = validateBasicDetails;
  }, [validateBasicDetails]);

  const getFieldError = (field) => errors[field] || "";

  return (
    <div className="array-section">
      <Form.Group className="mb-3">
        <Form.Label>Profile Image</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
        {data?.image && (
          <img
            src={data.image}
            alt="Preview"
            style={{
              width: "100px",
              height: "100px",
              marginTop: "10px",
              borderRadius: "50%",
            }}
          />
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Full Name *</Form.Label>
        <Form.Control
          type="text"
          value={data.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="e.g., John Doe"
          isInvalid={!!getFieldError("name")}
          required
        />
        {getFieldError("name") && (
          <Form.Text className="d-block text-danger mt-1">
            {getFieldError("name")}
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email *</Form.Label>
        <Form.Control
          type="email"
          value={data.email}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="e.g., john@example.com"
          isInvalid={!!getFieldError("email")}
          required
        />
        {getFieldError("email") && (
          <Form.Text className="d-block text-danger mt-1">
            {getFieldError("email")}
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Phone Number *</Form.Label>
        <Form.Control
          type="tel"
          value={data.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          placeholder="e.g., 9876543210"
          isInvalid={!!getFieldError("phone")}
          required
        />
        {getFieldError("phone") && (
          <Form.Text className="d-block text-danger mt-1">
            {getFieldError("phone")}
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Designation *</Form.Label>
        <Form.Control
          type="text"
          value={data.designation}
          onChange={(e) => handleChange("designation", e.target.value)}
          placeholder="e.g., Software Engineer"
          isInvalid={!!getFieldError("designation")}
          required
        />
        {getFieldError("designation") && (
          <Form.Text className="d-block text-danger mt-1">
            {getFieldError("designation")}
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          value={data.address}
          onChange={(e) => handleChange("address", e.target.value)}
          placeholder="Street Address"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          value={data.city}
          onChange={(e) => handleChange("city", e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>State</Form.Label>
        <Form.Control
          type="text"
          value={data.state}
          onChange={(e) => handleChange("state", e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Pincode</Form.Label>
        <Form.Control
          type="text"
          value={data.pincode}
          onChange={(e) => handleChange("pincode", e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Introduction</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={data.intro}
          onChange={(e) => handleChange("intro", e.target.value)}
          placeholder="Briefly introduce yourself..."
        />
      </Form.Group>
    </div>
  );
};

export default BasicDetails;
