// import React, {
//   useState,
//   useEffect,
//   useCallback,
//   forwardRef,
//   useImperativeHandle,
// } from "react";
// import { Form } from "react-bootstrap";

// const Skills = forwardRef(({ data = [], onChange }, ref) => {
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (data.length === 0) {
//       onChange([{ name: "", proficiency: 50 }]);
//     }
//   }, [data.length, onChange]);

//   const handleAdd = () => {
//     onChange([...data, { name: "", proficiency: 50 }]);
//   };

//   const handleRemove = (index) => {
//     const newData = data.filter((_, i) => i !== index);
//     onChange(newData);

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

//   const validateSkills = useCallback(() => {
//     const newErrors = {};
//     let isValid = true;

//     data.forEach((skill, index) => {
//       if (!skill.name || skill.name.trim() === "") {
//         newErrors[`${index}-name`] = "Skill name is required";
//         isValid = false;
//       }
//     });

//     setErrors(newErrors);
//     return isValid;
//   }, [data]);

//   useImperativeHandle(ref, () => ({
//     validate: validateSkills,
//   }));

//   const getFieldError = (index, field) => errors[`${index}-${field}`] || "";

//   return (
//     <div className="array-section">
//       {data.map((skill, index) => (
//         <div key={index} className="array-item">
//           <div className="array-item-header">
//             <h5>Skill #{index + 1}</h5>
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
//             <Form.Label>Skill Name *</Form.Label>
//             <Form.Control
//               type="text"
//               value={skill.name}
//               onChange={(e) => handleChange(index, "name", e.target.value)}
//               placeholder="e.g., JavaScript"
//               isInvalid={!!getFieldError(index, "name")}
//             />
//             {getFieldError(index, "name") && (
//               <Form.Text className="d-block text-danger mt-1">
//                 {getFieldError(index, "name")}
//               </Form.Text>
//             )}
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Proficiency: {skill.proficiency}%</Form.Label>
//             <Form.Range
//               value={skill.proficiency}
//               onChange={(e) =>
//                 handleChange(index, "proficiency", parseInt(e.target.value))
//               }
//               min="0"
//               max="100"
//               step="5"
//             />
//             <div className="d-flex justify-content-between">
//               <small>Beginner</small>
//               <small>Expert</small>
//             </div>
//           </Form.Group>
//         </div>
//       ))}

//       <button className="add-button" onClick={handleAdd}>
//         + Add Skill
//       </button>
//     </div>
//   );
// });

// export default Skills;
import React, { forwardRef, useImperativeHandle } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Validation schema
const schema = Yup.object({
  skills: Yup.array().of(
    Yup.object({
      name: Yup.string().required("Skill name is required"),
      proficiency: Yup.number().min(0).max(100).required(),
    })
  ),
});

const Skills = forwardRef(({ data = [], onChange }, ref) => {
  const { control, handleSubmit, getValues, formState } = useForm({
    defaultValues: {
      skills:
        data.length > 0
          ? data
          : [{ name: "", proficiency: 50 }],
    },
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  // Expose validate method to parent
  useImperativeHandle(ref, () => ({
    validate: async () => {
      let isValid = false;
      await handleSubmit(
        (values) => {
          onChange(values.skills);
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
            <h5>Skill #{index + 1}</h5>
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
            <Form.Label>Skill Name *</Form.Label>
            <Controller
              name={`skills.${index}.name`}
              control={control}
              render={({ field }) => (
                <Form.Control
                  {...field}
                  placeholder="e.g., JavaScript"
                  isInvalid={!!formState.errors?.skills?.[index]?.name}
                />
              )}
            />
            <Form.Control.Feedback type="invalid">
              {formState.errors?.skills?.[index]?.name?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              Proficiency:{" "}
              {getValues(`skills.${index}.proficiency`) || 50}%
            </Form.Label>
            <Controller
              name={`skills.${index}.proficiency`}
              control={control}
              render={({ field }) => (
                <>
                  <Form.Range
                    {...field}
                    min="0"
                    max="100"
                    step="5"
                    value={field.value}
                  />
                  <div className="d-flex justify-content-between">
                    <small>Beginner</small>
                    <small>Expert</small>
                  </div>
                </>
              )}
            />
          </Form.Group>
        </div>
      ))}

      <Button
        variant="primary"
        onClick={() => append({ name: "", proficiency: 50 })}
      >
        + Add Skill
      </Button>
    </div>
  );
});

export default Skills;
