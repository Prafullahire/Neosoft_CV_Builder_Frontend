import * as Yup from "yup";

export const cvSchema = Yup.object({
  basicDetails: Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    designation: Yup.string(),
    intro: Yup.string(),
  }),
  education: Yup.array().of(
    Yup.object({
      degree: Yup.string().required("Degree required"),
      college: Yup.string().required("College required"),
      year: Yup.string(),
    })
  ),
  experience: Yup.array().of(
    Yup.object({
      company: Yup.string().required("Company required"),
      role: Yup.string().required("Role required"),
      duration: Yup.string(),
    })
  ),
  projects: Yup.array().of(
    Yup.object({
      name: Yup.string().required("Project name required"),
      description: Yup.string().required("Project description required"),
    })
  ),
  skills: Yup.array().of(
    Yup.object({
      skill: Yup.string().required("Skill name required"),
      level: Yup.string(),
    })
  ),
  socialProfiles: Yup.array().of(
    Yup.object({
      platform: Yup.string().required("Platform required"),
      link: Yup.string().url("Invalid URL").required("Link required"),
    })
  ),
});
