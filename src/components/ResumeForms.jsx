import { useState } from 'react';

import PersonalInfoForm from './forms/PersonalInfoForm';
import SkillsForm from './forms/SkillsForm';
import ExperienceForm from './forms/ExperienceForm';
import EducationForm from './forms/EducationForm';
import AwardsForm from './forms/AwardsForm';

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

  const [activeTab, setActiveTab] = useState('personal');

  return (
   <div>
    <div className="tab-nav">
      <button className={`tab-btn ${activeTab === 'personal' ? 'active' : ''}`} onClick={() => setActiveTab('personal')}>Personal</button>
      <button className={`tab-btn ${activeTab === 'skills' ? 'active' : ''}`} onClick={() => setActiveTab('skills')}>Skills</button>
      <button className={`tab-btn ${activeTab === 'experience' ? 'active' : ''}`} onClick={() => setActiveTab('experience')}>Experience</button>
      <button className={`tab-btn ${activeTab === 'education' ? 'active' : ''}`} onClick={() => setActiveTab('education')}>Education</button>
      <button className={`tab-btn ${activeTab === 'awards' ? 'active' : ''}`} onClick={() => setActiveTab('awards')}>Awards</button>
    </div>
    
    {activeTab === 'personal' && <PersonalInfoForm data={resumeData} onChange={setResumeData} />}
    {activeTab === 'skills' && <SkillsForm data={resumeData} onChange={setResumeData} />}
    {activeTab === 'experience' && <ExperienceForm data={resumeData} onChange={setResumeData}/>}
    {activeTab === 'education' && <EducationForm data={resumeData} onChange={setResumeData} />}
    {activeTab === 'awards' && <AwardsForm data={resumeData} onChange={setResumeData} />}
  </div>
  );
}