import { useState } from 'react';

import PersonalInfoForm from './forms/PersonalInfoForm';
import SkillsForm from './forms/SkillsForm';

export default function ResumeForm() {
  const [resumeData, setResumeData] = useState({
    firstname: "",
    lastname: "",
    title: "",
    street: "",
    city: "",
    province: "",
    postalcode: "",
    phone: "",
    email: "",
    skills: "",
    experience: [],
    education: [],
    awards: [],
  });

  return (
    <div>
        <PersonalInfoForm data={resumeData} onChange={setResumeData} />
        <SkillsForm data={resumeData} onChange={setResumeData} />
        <ExperienceForm data={resumeData} onChange={setResumeData} />
        <EducationForm data={resumeData} onChange={setResumeData} />
        <AwardsForm data={resumeData} onChange={setResumeData} />
    </div>
  );
}
