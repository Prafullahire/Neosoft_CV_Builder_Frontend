import React, { forwardRef, useImperativeHandle } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = Yup.object({
  educations: Yup.array().of(
    Yup.object({
      degree: Yup.string().required("Degree is required"),
      institution: Yup.string().required("Institution is required"),
      percentage: Yup.number()
        .typeError("Percentage must be a number")
        .transform((value, originalValue) =>
          originalValue === "" ? null : value
        )
        .nullable(true),
      year: Yup.string().nullable(true),
    })
  ),
});


const Education = forwardRef(({ data = [], onChange }, ref) => {
  const { control, handleSubmit, getValues, formState } = useForm({
    defaultValues: {
      educations:
        data.length > 0
          ? data
          : [{ degree: "", institution: "", percentage: "", year: "" }],
    },
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "educations",
  });

  // Expose validate method and getValues to parent
  useImperativeHandle(ref, () => ({
    validate: async () => {
      let isValid = false;
      await handleSubmit(
        (values) => {
          onChange(values.educations);
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
    <div className="array-section">
      {fields.map((field, index) => (
        <div key={field.id} className="array-item">
          <div className="array-item-header">
            <h5>Education #{index + 1}</h5>
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
            <Form.Label>Degree/Qualification *</Form.Label>
            <Controller
              name={`educations.${index}.degree`}
              control={control}
              render={({ field }) => (
                <Form.Control
                  {...field}
                  placeholder="e.g., Bachelor of Science in Computer Science"
                  isInvalid={!!formState.errors?.educations?.[index]?.degree}
                />
              )}
            />
            <Form.Control.Feedback type="invalid">
              {formState.errors?.educations?.[index]?.degree?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Institution *</Form.Label>
            <Controller
              name={`educations.${index}.institution`}
              control={control}
              render={({ field }) => (
                <Form.Control
                  {...field}
                  placeholder="e.g., University of Example"
                  isInvalid={!!formState.errors?.educations?.[index]?.institution}
                />
              )}
            />
            <Form.Control.Feedback type="invalid">
              {formState.errors?.educations?.[index]?.institution?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Percentage/CGPA</Form.Label>
            <Controller
              name={`educations.${index}.percentage`}
              control={control}
              render={({ field }) => (
                <Form.Control
                  {...field}
                  type="number"
                  placeholder="e.g., 85 or 9.0"
                />
              )}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Year</Form.Label>
            <Controller
              name={`educations.${index}.year`}
              control={control}
              render={({ field }) => (
                <Form.Control {...field} placeholder="e.g., 2020" />
              )}
            />
          </Form.Group>
        </div>
      ))}

      <Button
        variant="primary"
        onClick={() =>
          append({ degree: "", institution: "", percentage: "", year: "" })
        }
      >
        + Add Education
      </Button>
    </div>
  );
});

export default Education;
