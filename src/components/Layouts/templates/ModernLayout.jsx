import React from 'react';
import './LayoutStyles.css';

const ModernLayout = ({ data }) => {
    const { basicDetails, education, experience, projects, skills, socialProfiles } = data;

    return (
        <div className="cv-layout modern-layout">
            <div className="modern-sidebar">
                {basicDetails?.image && (
                    <img src={basicDetails.image} alt="Profile" className="profile-image-modern" />
                )}

                <div className="sidebar-section">
                    <h2>Contact</h2>
                    {basicDetails?.email && <p>📧 {basicDetails.email}</p>}
                    {basicDetails?.phone && <p>📱 {basicDetails.phone}</p>}
                    {basicDetails?.address && <p>📍 {basicDetails.address}</p>}
                    {basicDetails?.city && <p>{basicDetails.city}, {basicDetails.state} {basicDetails.pincode}</p>}
                </div>

                {skills && skills.length > 0 && (
                    <div className="sidebar-section">
                        <h2>Skills</h2>
                        {skills.map((skill, index) => (
                            <div key={index} className="skill-item-modern">
                                <span>{skill.name}</span>
                                <div className="skill-bar-modern">
                                    <div
                                        className="skill-progress-modern"
                                        style={{ width: `${skill.proficiency || 50}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {socialProfiles && socialProfiles.length > 0 && (
                    <div className="sidebar-section">
                        <h2>Social</h2>
                        {socialProfiles.map((profile, index) => (
                            <a key={index} href={profile.url} target="_blank" rel="noopener noreferrer" className="social-link-modern">
                                {profile.platform}
                            </a>
                        ))}
                    </div>
                )}
            </div>

            <div className="modern-main">
                <div className="modern-header">
                    <h1>{basicDetails?.name || 'Your Name'}</h1>
                    {basicDetails?.designation && <h3 className="designation">{basicDetails.designation}</h3>}
                    {basicDetails?.intro && <p className="intro-text">{basicDetails.intro}</p>}
                </div>

                {experience && experience.length > 0 && (
                    <div className="modern-section">
                        <h2 className="section-title">Experience</h2>
                        {experience.map((exp, index) => (
                            <div key={index} className="timeline-item">
                                <div className="timeline-marker"></div>
                                <div className="timeline-content">
                                    <h3>{exp.position}</h3>
                                    <h4>{exp.company}</h4>
                                    <span className="timeline-date">
                                        {exp.joiningDate} - {exp.leavingDate || 'Present'}
                                    </span>
                                    {exp.description && <p>{exp.description}</p>}
                                    {exp.technologies && exp.technologies.length > 0 && (
                                        <div className="tech-tags">
                                            {exp.technologies.map((tech, i) => (
                                                <span key={i} className="tech-tag">{tech}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Education */}
                {education && education.length > 0 && (
                    <div className="modern-section">
                        <h2 className="section-title">Education</h2>
                        {education.map((edu, index) => (
                            <div key={index} className="timeline-item">
                                <div className="timeline-marker"></div>
                                <div className="timeline-content">
                                    <h3>{edu.degree}</h3>
                                    <h4>{edu.institution}</h4>
                                    <span className="timeline-date">{edu.year}</span>
                                    {edu.percentage && <p>Grade: {edu.percentage}%</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {projects && projects.length > 0 && (
                    <div className="modern-section">
                        <h2 className="section-title">Projects</h2>
                        {projects.map((project, index) => (
                            <div key={index} className="project-card">
                                <h3>{project.title}</h3>
                                {project.description && <p>{project.description}</p>}
                                {project.technologies && project.technologies.length > 0 && (
                                    <div className="tech-tags">
                                        {project.technologies.map((tech, i) => (
                                            <span key={i} className="tech-tag">{tech}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ModernLayout;
