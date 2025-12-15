// import React, {
//   useState,
//   useEffect,
//   useCallback,
//   forwardRef,
//   useImperativeHandle,
// } from "react";
// import { Form } from "react-bootstrap";

// const Projects = forwardRef(({ data = [], onChange }, ref) => {
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (data.length === 0) {
//       onChange([
//         {
//           title: "",
//           description: "",
//           duration: "",
//           teamSize: "",
//           technologies: [],
//           role: "",
//         },
//       ]);
//     }
//   }, [data.length, onChange]);

//   const handleAdd = () => {
//     onChange([
//       ...data,
//       {
//         title: "",
//         description: "",
//         duration: "",
//         teamSize: "",
//         technologies: [],
//         role: "",
//       },
//     ]);
//   };

//   const handleRemove = (index) => {
//     const newData = data.filter((_, i) => i !== index);
//     onChange(newData);

//     // Clear errors for removed project
//     const newErrors = { ...errors };
//     Object.keys(newErrors).forEach(
//       (key) => key.startsWith(`${index}-`) && delete newErrors[key]
//     );
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

//   const handleTechnologiesChange = (index, value) => {
//     const technologies = value.split(",").map((t) => t.trim());
//     handleChange(index, "technologies", technologies);
//   };

//   // ✅ Expose validate() to parent
//   const validateProjects = useCallback(() => {
//     const newErrors = {};
//     let isValid = true;

//     data.forEach((project, index) => {
//       if (!project.title || project.title.trim() === "") {
//         newErrors[`${index}-title`] = "Project title is required";
//         isValid = false;
//       }
//     });

//     setErrors(newErrors);
//     return isValid;
//   }, [data]);

//   useImperativeHandle(ref, () => ({
//     validate: validateProjects,
//   }));

//   const getFieldError = (index, field) => errors[`${index}-${field}`] || "";

//   return (
//     <div className="array-section">
//       {data.map((project, index) => (
//         <div key={index} className="array-item">
//           <div className="array-item-header">
//             <h5>Project {index + 1}</h5>
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
//             <Form.Label>Project Title *</Form.Label>
//             <Form.Control
//               type="text"
//               value={project.title}
//               onChange={(e) => handleChange(index, "title", e.target.value)}
//               placeholder="e.g., Stock Market Prediction System"
//               isInvalid={!!getFieldError(index, "title")}
//             />
//             {getFieldError(index, "title") && (
//               <Form.Text className="d-block text-danger mt-1">
//                 {getFieldError(index, "title")}
//               </Form.Text>
//             )}
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Description</Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={3}
//               value={project.description}
//               onChange={(e) => handleChange(index, "description", e.target.value)}
//               placeholder="Brief project description..."
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Duration</Form.Label>
//             <Form.Control
//               type="text"
//               value={project.duration}
//               onChange={(e) => handleChange(index, "duration", e.target.value)}
//               placeholder="e.g., 3 months"
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Team Size</Form.Label>
//             <Form.Control
//               type="number"
//               min="1"
//               value={project.teamSize}
//               onChange={(e) => handleChange(index, "teamSize", e.target.value)}
//               placeholder="e.g., 4"
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Technologies (comma-separated)</Form.Label>
//             <Form.Control
//               type="text"
//               value={project.technologies?.join(", ") || ""}
//               onChange={(e) => handleTechnologiesChange(index, e.target.value)}
//               placeholder="e.g., React, Node.js"
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Your Role</Form.Label>
//             <Form.Control
//               type="text"
//               value={project.role}
//               onChange={(e) => handleChange(index, "role", e.target.value)}
//               placeholder="e.g., Backend Developer"
//             />
//           </Form.Group>
//         </div>
//       ))}

//       <button className="add-button" onClick={handleAdd}>
//         + Add Project
//       </button>
//     </div>
//   );
// });

// export default Projects;
import React, { forwardRef, useImperativeHandle } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Validation schema
const schema = Yup.object({
  projects: Yup.array().of(
    Yup.object({
      title: Yup.string().required("Project title is required"),
      description: Yup.string().nullable(true),
      duration: Yup.string().nullable(true),
      teamSize: Yup.number().nullable(true),
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
                <Form.Control {...field} type="number" min="1" placeholder="e.g., 4" />
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
                <Form.Control {...field} placeholder="e.g., Backend Developer" />
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
