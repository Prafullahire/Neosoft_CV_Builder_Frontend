// import React, {
//   useState,
//   useEffect,
//   useCallback,
//   forwardRef,
//   useImperativeHandle,
// } from 'react';
// import { Form } from 'react-bootstrap';

// const Experience = forwardRef(({ data = [], onChange }, ref) => {
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (data.length === 0) {
//       onChange([{
//         company: '',
//         position: '',
//         location: '',
//         joiningDate: '',
//         leavingDate: '',
//         ctc: '',
//         technologies: [],
//         description: '',
//       }]);
//     }
//   }, [data.length, onChange]);

//   const handleAdd = () => {
//     onChange([...data, {
//       company: '',
//       position: '',
//       location: '',
//       joiningDate: '',
//       leavingDate: '',
//       ctc: '',
//       technologies: [],
//       description: '',
//     }]);
//   };

//   const handleRemove = (index) => {
//     const newData = data.filter((_, i) => i !== index);
//     onChange(newData);
//     const newErrors = { ...errors };
//     Object.keys(newErrors).forEach(key => key.startsWith(`${index}-`) && delete newErrors[key]);
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
//     const technologies = value.split(',').map(t => t.trim());
//     handleChange(index, 'technologies', technologies);
//   };

//   // ✅ Expose validate() to parent
//   const validateExperience = useCallback(() => {
//     const newErrors = {};
//     let isValid = true;

//     data.forEach((exp, index) => {
//       if (!exp.company || exp.company.trim() === '') {
//         newErrors[`${index}-company`] = 'Company name is required';
//         isValid = false;
//       }
//       if (!exp.position || exp.position.trim() === '') {
//         newErrors[`${index}-position`] = 'Position is required';
//         isValid = false;
//       }
//     });

//     setErrors(newErrors);
//     return isValid;
//   }, [data]);

//   useImperativeHandle(ref, () => ({
//     validate: validateExperience,
//   }));

//   const getFieldError = (index, field) => errors[`${index}-${field}`] || '';

//   return (
//     <div className="array-section">
//       {data.map((exp, index) => (
//         <div key={index} className="array-item">
//           <div className="array-item-header">
//             <h5>Experience #{index + 1}</h5>
//             {data.length > 1 && (
//               <button className="remove-button" onClick={() => handleRemove(index)}>
//                 Remove
//               </button>
//             )}
//           </div>

//           <Form.Group className="mb-3">
//             <Form.Label>Company Name *</Form.Label>
//             <Form.Control
//               type="text"
//               value={exp.company}
//               onChange={e => handleChange(index, 'company', e.target.value)}
//               placeholder="e.g., Google"
//               isInvalid={!!getFieldError(index, 'company')}
//             />
//             {getFieldError(index, 'company') && (
//               <Form.Text className="text-danger">{getFieldError(index, 'company')}</Form.Text>
//             )}
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Position *</Form.Label>
//             <Form.Control
//               type="text"
//               value={exp.position}
//               onChange={e => handleChange(index, 'position', e.target.value)}
//               placeholder="e.g., Senior Software Engineer"
//               isInvalid={!!getFieldError(index, 'position')}
//             />
//             {getFieldError(index, 'position') && (
//               <Form.Text className="text-danger">{getFieldError(index, 'position')}</Form.Text>
//             )}
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Location</Form.Label>
//             <Form.Control
//               type="text"
//               value={exp.location}
//               onChange={e => handleChange(index, 'location', e.target.value)}
//               placeholder="e.g., San Francisco"
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Joining Date</Form.Label>
//             <Form.Control
//               type="text"
//               value={exp.joiningDate}
//               onChange={e => handleChange(index, 'joiningDate', e.target.value)}
//               placeholder="e.g., Jan 2020"
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Leaving Date</Form.Label>
//             <Form.Control
//               type="text"
//               value={exp.leavingDate}
//               onChange={e => handleChange(index, 'leavingDate', e.target.value)}
//               placeholder="e.g., Dec 2022"
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>CTC</Form.Label>
//             <Form.Control
//               type="text"
//               value={exp.ctc}
//               onChange={e => handleChange(index, 'ctc', e.target.value)}
//               placeholder="e.g., $120,000"
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Technologies (comma-separated)</Form.Label>
//             <Form.Control
//               type="text"
//               value={exp.technologies?.join(', ') || ''}
//               onChange={e => handleTechnologiesChange(index, e.target.value)}
//               placeholder="React, Node.js"
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Description</Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={3}
//               value={exp.description}
//               onChange={e => handleChange(index, 'description', e.target.value)}
//               placeholder="Describe responsibilities..."
//             />
//           </Form.Group>
//         </div>
//       ))}

//       <button className="add-button" onClick={handleAdd}>+ Add Experience</button>
//     </div>
//   );
// });

// export default Experience;
import React, { forwardRef, useImperativeHandle } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Validation schema
const schema = Yup.object({
  experiences: Yup.array().of(
    Yup.object({
      company: Yup.string().required("Company name is required"),
      position: Yup.string().required("Position is required"),
      location: Yup.string().nullable(true),
      joiningDate: Yup.string().nullable(true),
      leavingDate: Yup.string().nullable(true),
      ctc: Yup.string().nullable(true),
      technologies: Yup.array().of(Yup.string()).nullable(true),
      description: Yup.string().nullable(true),
    })
  ),
});

const Experience = forwardRef(({ data = [], onChange }, ref) => {
  const { control, handleSubmit, getValues, formState } = useForm({
    defaultValues: {
      experiences:
        data.length > 0
          ? data
          : [
              {
                company: "",
                position: "",
                location: "",
                joiningDate: "",
                leavingDate: "",
                ctc: "",
                technologies: [],
                description: "",
              },
            ],
    },
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });

  // Expose validate method to parent
  useImperativeHandle(ref, () => ({
    validate: async () => {
      let isValid = false;
      await handleSubmit(
        (values) => {
          onChange(values.experiences);
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
            <h5>Experience #{index + 1}</h5>
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
            <Form.Label>Company Name *</Form.Label>
            <Controller
              name={`experiences.${index}.company`}
              control={control}
              render={({ field }) => (
                <Form.Control
                  {...field}
                  placeholder="e.g., Google"
                  isInvalid={!!formState.errors?.experiences?.[index]?.company}
                />
              )}
            />
            <Form.Control.Feedback type="invalid">
              {formState.errors?.experiences?.[index]?.company?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Position *</Form.Label>
            <Controller
              name={`experiences.${index}.position`}
              control={control}
              render={({ field }) => (
                <Form.Control
                  {...field}
                  placeholder="e.g., Senior Software Engineer"
                  isInvalid={!!formState.errors?.experiences?.[index]?.position}
                />
              )}
            />
            <Form.Control.Feedback type="invalid">
              {formState.errors?.experiences?.[index]?.position?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Controller
              name={`experiences.${index}.location`}
              control={control}
              render={({ field }) => (
                <Form.Control {...field} placeholder="e.g., San Francisco" />
              )}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Joining Date</Form.Label>
            <Controller
              name={`experiences.${index}.joiningDate`}
              control={control}
              render={({ field }) => (
                <Form.Control {...field} placeholder="e.g., Jan 2020" />
              )}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Leaving Date</Form.Label>
            <Controller
              name={`experiences.${index}.leavingDate`}
              control={control}
              render={({ field }) => (
                <Form.Control {...field} placeholder="e.g., Dec 2022" />
              )}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>CTC</Form.Label>
            <Controller
              name={`experiences.${index}.ctc`}
              control={control}
              render={({ field }) => (
                <Form.Control {...field} placeholder="e.g., $120,000" />
              )}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Technologies (comma-separated)</Form.Label>
            <Controller
              name={`experiences.${index}.technologies`}
              control={control}
              render={({ field }) => (
                <Form.Control
                  {...field}
                  value={field.value?.join(", ") || ""}
                  onChange={(e) =>
                    field.onChange(e.target.value.split(",").map((t) => t.trim()))
                  }
                  placeholder="React, Node.js"
                />
              )}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Controller
              name={`experiences.${index}.description`}
              control={control}
              render={({ field }) => (
                <Form.Control
                  {...field}
                  as="textarea"
                  rows={3}
                  placeholder="Describe responsibilities..."
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
            company: "",
            position: "",
            location: "",
            joiningDate: "",
            leavingDate: "",
            ctc: "",
            technologies: [],
            description: "",
          })
        }
      >
        + Add Experience
      </Button>
    </div>
  );
});

export default Experience;
