import { useState } from 'react';

import PersonalInfoForm from './forms/PersonalInfoForm';

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
    </div>
  );
}
