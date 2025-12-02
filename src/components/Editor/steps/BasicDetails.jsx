import React from 'react';
import { Form } from 'react-bootstrap';

const BasicDetails = ({ data, onChange }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange({ ...data, [name]: value });
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

    return (
        <div>
            <Form.Group className="mb-3">
                <Form.Label>Profile Image</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={handleImageUpload} />
                {data?.image && (
                    <img
                        src={data.image}
                        alt="Preview"
                        style={{ width: '100px', height: '100px', marginTop: '10px', borderRadius: '50%' }}
                    />
                )}
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Full Name *</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    value={data?.name || ''}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Email *</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    value={data?.email || ''}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                    type="tel"
                    name="phone"
                    value={data?.phone || ''}
                    onChange={handleChange}
                    placeholder="+1 234 567 8900"
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                    type="text"
                    name="address"
                    value={data?.address || ''}
                    onChange={handleChange}
                    placeholder="Street address"
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control
                    type="text"
                    name="city"
                    value={data?.city || ''}
                    onChange={handleChange}
                    placeholder="City"
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>State</Form.Label>
                <Form.Control
                    type="text"
                    name="state"
                    value={data?.state || ''}
                    onChange={handleChange}
                    placeholder="State"
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Pincode</Form.Label>
                <Form.Control
                    type="text"
                    name="pincode"
                    value={data?.pincode || ''}
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
                    value={data?.intro || ''}
                    onChange={handleChange}
                    placeholder="Write a brief introduction about yourself..."
                />
            </Form.Group>
        </div>
    );
};

export default BasicDetails;
