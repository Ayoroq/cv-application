import { useState } from 'react';

import PersonalInfoForm from './forms/PersonalInfoForm';
import SkillsForm from './forms/SkillsForm';
import ExperienceForm from './forms/ExperienceForm';
import EducationForm from './forms/EducationForm';
import AwardsForm from './forms/AwardsForm';

export default function ResumeForm({resumeData, onChange}) {
  const [activeTab, setActiveTab] = useState('personal');

  function handleDataChange(newFormData) {
    const updatedResume = {
      ...resumeData,
      lastModified: Date.now(),
      data: newFormData
    };
    onChange(updatedResume);
  }

  return (
   <div className="resume-form">
    <div className="tab-nav">
      <button className={`tab-btn ${activeTab === 'personal' ? 'active' : ''}`} onClick={() => setActiveTab('personal')}>Personal</button>
      <button className={`tab-btn ${activeTab === 'skills' ? 'active' : ''}`} onClick={() => setActiveTab('skills')}>Skills</button>
      <button className={`tab-btn ${activeTab === 'experience' ? 'active' : ''}`} onClick={() => setActiveTab('experience')}>Experience</button>
      <button className={`tab-btn ${activeTab === 'education' ? 'active' : ''}`} onClick={() => setActiveTab('education')}>Education</button>
      <button className={`tab-btn ${activeTab === 'awards' ? 'active' : ''}`} onClick={() => setActiveTab('awards')}>Awards</button>
    </div>
    
    {activeTab === 'personal' && <PersonalInfoForm data={resumeData?.data} onChange={handleDataChange} />}
    {activeTab === 'skills' && <SkillsForm data={resumeData?.data} onChange={handleDataChange} />}
    {activeTab === 'experience' && <ExperienceForm data={resumeData?.data} onChange={handleDataChange}/>}
    {activeTab === 'education' && <EducationForm data={resumeData?.data} onChange={handleDataChange} />}
    {activeTab === 'awards' && <AwardsForm data={resumeData?.data} onChange={handleDataChange} />}
  </div>
  );
}