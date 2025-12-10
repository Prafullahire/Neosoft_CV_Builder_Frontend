import React, { useState , useEffect,useRef} from "react";
import { Form, Alert } from "react-bootstrap";

const BasicDetails = ({ data, onChange, onValidation, }) => {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
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

  const validateForm = () => {
    const newErrors = {};

    if (!data?.name || data.name.trim() === "") {
      newErrors.name = "Full Name is required";
    } else if (data.name.trim().length < 2) {
      newErrors.name = "Full Name must be at least 2 characters";
    }

    if (!data?.email || data.email.trim() === "") {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);

    if (onValidation) {
      onValidation(Object.keys(newErrors).length === 0);
    }

    return Object.keys(newErrors).length === 0;
  };

  React.useImperativeHandle(useRef(null), () => ({ validateForm }), []);

 useEffect(() => {
    if (onValidation) {
      window.currentStepValidate = validateForm;
    }
  }, [data, errors]);

  return (
    <div>
      {Object.keys(errors).length > 0 && (
        <Alert variant="danger" className="mb-3">
          <Alert.Heading> Please correct the following errors:</Alert.Heading>
          <ul className="mb-0">
            {Object.values(errors).map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        </Alert>
      )}

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
          name="name"
          value={data?.name || ""}
          onChange={handleChange}
          placeholder="Enter your full name"
          isInvalid={!!errors.name}
          required
        />
        {errors.name && (
          <Form.Text className="d-block text-danger mt-1">
            {errors.name}
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email *</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={data?.email || ""}
          onChange={handleChange}
          placeholder="your.email@example.com"
          isInvalid={!!errors.email}
          required
        />
        {errors.email && (
          <Form.Text className="d-block text-danger mt-1">
            {errors.email}
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Designation</Form.Label>
        <Form.Control
          type="text"
          name="designation"
          value={data?.designation || ""}
          onChange={handleChange}
          placeholder="e.g., Senior Software Engineer, UX Designer"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="tel"
          name="phone"
          value={data?.phone || ""}
          onChange={handleChange}
          placeholder="+1 234 567 8900"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          name="address"
          value={data?.address || ""}
          onChange={handleChange}
          placeholder="Street address"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          name="city"
          value={data?.city || ""}
          onChange={handleChange}
          placeholder="City"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>State</Form.Label>
        <Form.Control
          type="text"
          name="state"
          value={data?.state || ""}
          onChange={handleChange}
          placeholder="State"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Pincode</Form.Label>
        <Form.Control
          type="text"
          name="pincode"
          value={data?.pincode || ""}
          onChange={handleChange}
          placeholder="123456"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Professional Summary</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          name="intro"
          value={data?.intro || ""}
          onChange={handleChange}
          placeholder="Write a brief introduction about yourself..."
        />
      </Form.Group>
    </div>
  );
};

BasicDetails.displayName = "BasicDetails";

export default BasicDetails;
