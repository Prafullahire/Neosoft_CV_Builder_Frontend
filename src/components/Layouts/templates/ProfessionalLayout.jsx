import React from 'react';
import './LayoutStyles.css';

const ProfessionalLayout = ({ data }) => {
    const { basicDetails, education, experience, projects, skills, socialProfiles } = data;

    return (
        <div className="cv-layout professional-layout">
            {/* Header Section */}
            <div className="cv-header">
                {basicDetails?.image && (
                    <img src={basicDetails.image} alt="Profile" className="profile-image" />
                )}
                <div className="header-info">
                    <h1>{basicDetails?.name || 'Your Name'}</h1>
                    <div className="contact-info">
                        {basicDetails?.email && <span>📧 {basicDetails.email}</span>}
                        {basicDetails?.phone && <span>📱 {basicDetails.phone}</span>}
                        {basicDetails?.city && basicDetails?.state && (
                            <span>📍 {basicDetails.city}, {basicDetails.state}</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Introduction */}
            {basicDetails?.intro && (
                <div className="cv-section">
                    <h2>Professional Summary</h2>
                    <p>{basicDetails.intro}</p>
                </div>
            )}

            {/* Experience */}
            {experience && experience.length > 0 && (
                <div className="cv-section">
                    <h2>Work Experience</h2>
                    {experience.map((exp, index) => (
                        <div key={index} className="experience-item">
                            <div className="item-header">
                                <h3>{exp.position}</h3>
                                <span className="date-range">
                                    {exp.joiningDate} - {exp.leavingDate || 'Present'}
                                </span>
                            </div>
                            <h4>{exp.company} {exp.location && `- ${exp.location}`}</h4>
                            {exp.description && <p>{exp.description}</p>}
                            {exp.technologies && exp.technologies.length > 0 && (
                                <div className="technologies">
                                    <strong>Technologies:</strong> {exp.technologies.join(', ')}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Education */}
            {education && education.length > 0 && (
                <div className="cv-section">
                    <h2>Education</h2>
                    {education.map((edu, index) => (
                        <div key={index} className="education-item">
                            <div className="item-header">
                                <h3>{edu.degree}</h3>
                                <span className="date-range">{edu.year}</span>
                            </div>
                            <h4>{edu.institution}</h4>
                            {edu.percentage && <p>Grade: {edu.percentage}%</p>}
                        </div>
                    ))}
                </div>
            )}

            {/* Projects */}
            {projects && projects.length > 0 && (
                <div className="cv-section">
                    <h2>Projects</h2>
                    {projects.map((project, index) => (
                        <div key={index} className="project-item">
                            <h3>{project.title}</h3>
                            {project.description && <p>{project.description}</p>}
                            <div className="project-details">
                                {project.duration && <span>Duration: {project.duration}</span>}
                                {project.teamSize && <span>Team Size: {project.teamSize}</span>}
                            </div>
                            {project.technologies && project.technologies.length > 0 && (
                                <div className="technologies">
                                    <strong>Technologies:</strong> {project.technologies.join(', ')}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Skills */}
            {skills && skills.length > 0 && (
                <div className="cv-section">
                    <h2>Skills</h2>
                    <div className="skills-grid">
                        {skills.map((skill, index) => (
                            <div key={index} className="skill-item">
                                <span className="skill-name">{skill.name}</span>
                                <div className="skill-bar">
                                    <div
                                        className="skill-progress"
                                        style={{ width: `${skill.proficiency || 50}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Social Profiles */}
            {socialProfiles && socialProfiles.length > 0 && (
                <div className="cv-section">
                    <h2>Connect With Me</h2>
                    <div className="social-links">
                        {socialProfiles.map((profile, index) => (
                            <a key={index} href={profile.url} target="_blank" rel="noopener noreferrer">
                                {profile.platform}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfessionalLayout;
