// import React, {
//   useState,
//   useEffect,
//   useCallback,
//   forwardRef,
//   useImperativeHandle,
// } from "react";
// import { Form } from "react-bootstrap";

// const Education = forwardRef(({ data = [], onChange }, ref) => {
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (data.length === 0) {
//       onChange([
//         {
//           degree: "",
//           institution: "",
//           percentage: "",
//           year: "",
//           startDate: "",
//           endDate: "",
//         },
//       ]);
//     }
//   }, [data.length, onChange]);

//   const handleAdd = () => {
//     onChange([
//       ...data,
//       {
//         degree: "",
//         institution: "",
//         percentage: "",
//         year: "",
//         startDate: "",
//         endDate: "",
//       },
//     ]);
//   };

//   const handleRemove = (index) => {
//     const newData = data.filter((_, i) => i !== index);
//     onChange(newData);

//     const newErrors = { ...errors };
//     Object.keys(newErrors).forEach((key) => {
//       if (key.startsWith(`${index}-`)) {
//         delete newErrors[key];
//       }
//     });
//     setErrors(newErrors);
//   };

//   const handleChange = (index, field, value) => {
//     const newData = [...data];
//     newData[index] = { ...newData[index], [field]: value };
//     onChange(newData);

//     if (errors[`${index}-${field}`]) {
//       const updatedErrors = { ...errors };
//       delete updatedErrors[`${index}-${field}`];
//       setErrors(updatedErrors);
//     }
//   };

//   const validateEducation = useCallback(() => {
//     const newErrors = {};
//     let isValid = true;

//     data.forEach((edu, index) => {
//       if (!edu.degree || edu.degree.trim() === "") {
//         newErrors[`${index}-degree`] = "Degree is required";
//         isValid = false;
//       }
//       if (!edu.institution || edu.institution.trim() === "") {
//         newErrors[`${index}-institution`] = "Institution is required";
//         isValid = false;
//       }
//     });

//     setErrors(newErrors);
//     return isValid;
//   }, [data]);

//   // ✅ Expose validate() to parent
//   useImperativeHandle(ref, () => ({
//     validate: validateEducation,
//   }));

//   const getFieldError = (index, field) =>
//     errors[`${index}-${field}`] || "";

//   return (
//     <div className="array-section">
//       {data.map((edu, index) => (
//         <div key={index} className="array-item">
//           <div className="array-item-header">
//             <h5>Education #{index + 1}</h5>
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
//             <Form.Label>Degree/Qualification *</Form.Label>
//             <Form.Control
//               type="text"
//               value={edu.degree}
//               onChange={(e) =>
//                 handleChange(index, "degree", e.target.value)
//               }
//               isInvalid={!!getFieldError(index, "degree")}
//             />
//             {getFieldError(index, "degree") && (
//               <Form.Text className="text-danger">
//                 {getFieldError(index, "degree")}
//               </Form.Text>
//             )}
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Institution *</Form.Label>
//             <Form.Control
//               type="text"
//               value={edu.institution}
//               onChange={(e) =>
//                 handleChange(index, "institution", e.target.value)
//               }
//               isInvalid={!!getFieldError(index, "institution")}
//             />
//             {getFieldError(index, "institution") && (
//               <Form.Text className="text-danger">
//                 {getFieldError(index, "institution")}
//               </Form.Text>
//             )}
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Percentage/CGPA</Form.Label>
//             <Form.Control
//               type="number"
//               value={edu.percentage}
//               onChange={(e) =>
//                 handleChange(index, "percentage", e.target.value)
//               }
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Year</Form.Label>
//             <Form.Control
//               type="text"
//               value={edu.year}
//               onChange={(e) =>
//                 handleChange(index, "year", e.target.value)
//               }
//             />
//           </Form.Group>
//         </div>
//       ))}

//       <button className="add-button" onClick={handleAdd}>
//         + Add Education
//       </button>
//     </div>
//   );
// });

// export default Education;

import React, { forwardRef, useImperativeHandle } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Validation schema using Yup
const schema = Yup.object({
  educations: Yup.array().of(
    Yup.object({
      degree: Yup.string().required("Degree is required"),
      institution: Yup.string().required("Institution is required"),
      percentage: Yup.number()
        .typeError("Percentage must be a number")
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

  // Expose validate method to parent
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
                  isInvalid={
                    !!formState.errors?.educations?.[index]?.institution
                  }
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
              render={({ field }) => <Form.Control type="number" {...field} />}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Year</Form.Label>
            <Controller
              name={`educations.${index}.year`}
              control={control}
              render={({ field }) => <Form.Control {...field} />}
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
