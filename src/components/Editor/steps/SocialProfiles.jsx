import React, { forwardRef, useImperativeHandle, useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = Yup.object({
  socialProfiles: Yup.array().of(
    Yup.object({
      platform: Yup.string().required("Platform is required"),
      url: Yup.string()
        .required("Profile URL is required")
        .matches(/^https?:\/\/.+/, "URL must start with http:// or https://"),
    })
  ),
});

const SocialProfiles = forwardRef(({ data = [], onChange }, ref) => {
  const { control, handleSubmit, getValues, formState, reset } = useForm({
    defaultValues: {
      socialProfiles: [{ platform: "", url: "" }],
    },
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  useEffect(() => {
    if (data && data.length > 0) {
      reset({ socialProfiles: data });
    }
  }, [data, reset]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "socialProfiles",
  });

  useImperativeHandle(ref, () => ({
    validate: async () => {
      let isValid = false;
      await handleSubmit(
        (values) => {
          onChange(values.socialProfiles);
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

  const platformOptions = [
    "LinkedIn",
    "GitHub",
    "Twitter",
    "Facebook",
    "Instagram",
    "Portfolio",
    "Medium",
    "Stack Overflow",
    "Other",
  ];

  return (
    <div className="array-section">
      {fields.map((field, index) => (
        <div key={field.id} className="array-item">
          <div className="array-item-header">
            <h5>Social Profile #{index + 1}</h5>
            {fields.length > 1 && (
              <Button
                variant="danger"
                size="sm"
                onClick={() => remove(index)}
              >
                Remove
              </Button>
            )}
          </div>

          <Form.Group className="mb-3">
            <Form.Label>Platform *</Form.Label>
            <Controller
              name={`socialProfiles.${index}.platform`}
              control={control}
              render={({ field }) => (
                <Form.Select
                  {...field}
                  isInvalid={
                    !!formState.errors?.socialProfiles?.[index]?.platform
                  }
                >
                  <option value="">Select Platform</option>
                  {platformOptions.map((platform) => (
                    <option key={platform} value={platform}>
                      {platform}
                    </option>
                  ))}
                </Form.Select>
              )}
            />
            <Form.Control.Feedback type="invalid">
              {formState.errors?.socialProfiles?.[index]?.platform?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Profile URL *</Form.Label>
            <Controller
              name={`socialProfiles.${index}.url`}
              control={control}
              render={({ field }) => (
                <Form.Control
                  {...field}
                  type="url"
                  placeholder="https://linkedin.com/in/yourprofile"
                  isInvalid={!!formState.errors?.socialProfiles?.[index]?.url}
                />
              )}
            />
            <Form.Control.Feedback type="invalid">
              {formState.errors?.socialProfiles?.[index]?.url?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </div>
      ))}

      <Button
        variant="primary"
        onClick={() => append({ platform: "", url: "" })}
      >
        + Add Social Profile
      </Button>
    </div>
  );
});

export default SocialProfiles;
