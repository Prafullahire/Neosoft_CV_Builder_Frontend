import React, { forwardRef, useImperativeHandle } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = Yup.object({
  projects: Yup.array().of(
    Yup.object({
      title: Yup.string().required("Project title is required"),
      description: Yup.string().nullable(true),
      duration: Yup.string().nullable(true),
      teamSize: Yup.number()
        .typeError("Team size must be a number")
        .transform((value, originalValue) =>
          originalValue === "" ? null : value
        )
        .nullable(true),
      technologies: Yup.array().of(Yup.string()).nullable(true),
      role: Yup.string().nullable(true),
    })
  ),
});

const Projects = forwardRef(({ data = [], onChange }, ref) => {
  const { control, handleSubmit, getValues, formState } = useForm({
    defaultValues: {
      projects:
        data.length > 0
          ? data
          : [
              {
                title: "",
                description: "",
                duration: "",
                teamSize: "",
                technologies: [],
                role: "",
              },
            ],
    },
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  // Expose validate method to parent
  useImperativeHandle(ref, () => ({
    validate: async () => {
      let isValid = false;
      await handleSubmit(
        (values) => {
          onChange(values.projects);
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
            <h5>Project #{index + 1}</h5>
            {fields.length > 1 && (
              <Button variant="danger" size="sm" onClick={() => remove(index)}>
                Remove
              </Button>
            )}
          </div>

          <Form.Group className="mb-3">
            <Form.Label>Project Title *</Form.Label>
            <Controller
              name={`projects.${index}.title`}
              control={control}
              render={({ field }) => (
                <Form.Control
                  {...field}
                  placeholder="e.g., Stock Market Prediction System"
                  isInvalid={!!formState.errors?.projects?.[index]?.title}
                />
              )}
            />
            <Form.Control.Feedback type="invalid">
              {formState.errors?.projects?.[index]?.title?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Controller
              name={`projects.${index}.description`}
              control={control}
              render={({ field }) => (
                <Form.Control
                  {...field}
                  as="textarea"
                  rows={3}
                  placeholder="Brief project description..."
                />
              )}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Duration</Form.Label>
            <Controller
              name={`projects.${index}.duration`}
              control={control}
              render={({ field }) => (
                <Form.Control {...field} placeholder="e.g., 3 months" />
              )}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Team Size</Form.Label>
            <Controller
              name={`projects.${index}.teamSize`}
              control={control}
              render={({ field }) => (
                <Form.Control
                  {...field}
                  type="number"
                  min="1"
                  placeholder="e.g., 4"
                />
              )}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Technologies (comma-separated)</Form.Label>
            <Controller
              name={`projects.${index}.technologies`}
              control={control}
              render={({ field }) => (
                <Form.Control
                  {...field}
                  value={field.value?.join(", ") || ""}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value.split(",").map((t) => t.trim())
                    )
                  }
                  placeholder="e.g., React, Node.js"
                />
              )}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Your Role</Form.Label>
            <Controller
              name={`projects.${index}.role`}
              control={control}
              render={({ field }) => (
                <Form.Control
                  {...field}
                  placeholder="e.g., Backend Developer"
                />
              )}
            />
          </Form.Group>
        </div>
      ))}

      <Button
        variant="primary"
        onClick={() =>
          append({
            title: "",
            description: "",
            duration: "",
            teamSize: "",
            technologies: [],
            role: "",
          })
        }
      >
        + Add Project
      </Button>
    </div>
  );
});

export default Projects;
