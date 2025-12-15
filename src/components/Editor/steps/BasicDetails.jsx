import React, { forwardRef, useImperativeHandle, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Form } from "react-bootstrap";

const schema = Yup.object({
  name: Yup.string().required("Full Name is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Enter a valid 10-digit phone number")
    .required("Phone is required"),
  designation: Yup.string().required("Designation is required"),
});

const BasicDetails = forwardRef(({ data = {}, onChange }, ref) => {
  const { control, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: data,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset(data);
  }, [data, reset]);

  useImperativeHandle(ref, () => ({
    validate: async () => {
      let isValid = false;
      await handleSubmit(
        (values) => {
          onChange(values);
          isValid = true;
        },
        () => {
          isValid = false;
        }
      )();
      return isValid;
    },
    getValues: () => getValues(),
  }));

  return (
    <form>
      <Form.Group className="mb-3">
        <Form.Label>Full Name *</Form.Label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Form.Control
              {...field}
              placeholder="e.g., John Doe"
              isInvalid={!!formState.errors.name}
            />
          )}
        />
        <Form.Control.Feedback type="invalid">
          {formState.errors.name?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email *</Form.Label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Form.Control
              {...field}
              placeholder="e.g., john@example.com"
              isInvalid={!!formState.errors.email}
            />
          )}
        />
        <Form.Control.Feedback type="invalid">
          {formState.errors.email?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Phone *</Form.Label>
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <Form.Control
              {...field}
              placeholder="e.g., 9876543210"
              isInvalid={!!formState.errors.phone}
            />
          )}
        />
        <Form.Control.Feedback type="invalid">
          {formState.errors.phone?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Designation *</Form.Label>
        <Controller
          name="designation"
          control={control}
          render={({ field }) => (
            <Form.Control
              {...field}
              placeholder="e.g., Software Engineer"
              isInvalid={!!formState.errors.designation}
            />
          )}
        />
        <Form.Control.Feedback type="invalid">
          {formState.errors.designation?.message}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Optional fields */}
      <Form.Group className="mb-3">
        <Form.Label>Address</Form.Label>
        <Controller
          name="address"
          control={control}
          render={({ field }) => <Form.Control {...field} />}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>City</Form.Label>
        <Controller
          name="city"
          control={control}
          render={({ field }) => <Form.Control {...field} />}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>State</Form.Label>
        <Controller
          name="state"
          control={control}
          render={({ field }) => <Form.Control {...field} />}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Pincode</Form.Label>
        <Controller
          name="pincode"
          control={control}
          render={({ field }) => <Form.Control {...field} />}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Introduction</Form.Label>
        <Controller
          name="intro"
          control={control}
          render={({ field }) => (
            <Form.Control as="textarea" {...field} rows={3} />
          )}
        />
      </Form.Group>
    </form>
  );
});

export default BasicDetails;
