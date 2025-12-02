import React from 'react';
import './LayoutStyles.css';

const CreativeLayout = ({ data }) => {
    const { basicDetails, education, experience, projects, skills, socialProfiles } = data;

    return (
        <div className="cv-layout creative-layout">
            {/* Creative Header with Gradient */}
            <div className="creative-header">
                <div className="header-content">
                    {basicDetails?.image && (
                        <img src={basicDetails.image} alt="Profile" className="profile-image-creative" />
                    )}
                    <div className="header-text">
                        <h1>{basicDetails?.name || 'Your Name'}</h1>
                        {basicDetails?.intro && <p className="tagline">{basicDetails.intro}</p>}
                    </div>
                </div>
                <div className="contact-bar">
                    {basicDetails?.email && <span>✉ {basicDetails.email}</span>}
                    {basicDetails?.phone && <span>☎ {basicDetails.phone}</span>}
                    {basicDetails?.city && <span>⌖ {basicDetails.city}, {basicDetails.state}</span>}
                </div>
            </div>

            <div className="creative-content">
                {/* Two Column Layout */}
                <div className="creative-columns">
                    {/* Left Column */}
                    <div className="creative-left">
                        {/* Experience */}
                        {experience && experience.length > 0 && (
                            <div className="creative-section">
                                <h2 className="creative-heading">💼 Experience</h2>
                                {experience.map((exp, index) => (
                                    <div key={index} className="creative-item">
                                        <div className="item-title-row">
                                            <h3>{exp.position}</h3>
                                            <span className="date-badge">
                                                {exp.joiningDate} - {exp.leavingDate || 'Now'}
                                            </span>
                                        </div>
                                        <h4 className="company-name">{exp.company}</h4>
                                        {exp.description && <p>{exp.description}</p>}
                                        {exp.technologies && exp.technologies.length > 0 && (
                                            <div className="pill-container">
                                                {exp.technologies.map((tech, i) => (
                                                    <span key={i} className="pill">{tech}</span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Projects */}
                        {projects && projects.length > 0 && (
                            <div className="creative-section">
                                <h2 className="creative-heading">🚀 Projects</h2>
                                {projects.map((project, index) => (
                                    <div key={index} className="creative-item project-highlight">
                                        <h3>{project.title}</h3>
                                        {project.description && <p>{project.description}</p>}
                                        <div className="project-meta">
                                            {project.duration && <span>⏱ {project.duration}</span>}
                                            {project.teamSize && <span>👥 {project.teamSize} members</span>}
                                        </div>
                                        {project.technologies && project.technologies.length > 0 && (
                                            <div className="pill-container">
                                                {project.technologies.map((tech, i) => (
                                                    <span key={i} className="pill">{tech}</span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right Column */}
                    <div className="creative-right">
                        {/* Education */}
                        {education && education.length > 0 && (
                            <div className="creative-section">
                                <h2 className="creative-heading">🎓 Education</h2>
                                {education.map((edu, index) => (
                                    <div key={index} className="creative-item education-card">
                                        <h3>{edu.degree}</h3>
                                        <h4>{edu.institution}</h4>
                                        <div className="edu-details">
                                            {edu.year && <span>{edu.year}</span>}
                                            {edu.percentage && <span className="grade-badge">{edu.percentage}%</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Skills */}
                        {skills && skills.length > 0 && (
                            <div className="creative-section">
                                <h2 className="creative-heading">⚡ Skills</h2>
                                <div className="skills-creative">
                                    {skills.map((skill, index) => (
                                        <div key={index} className="skill-bubble">
                                            <span className="skill-name-creative">{skill.name}</span>
                                            <span className="skill-percent">{skill.proficiency || 50}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Social Profiles */}
                        {socialProfiles && socialProfiles.length > 0 && (
                            <div className="creative-section">
                                <h2 className="creative-heading">🔗 Connect</h2>
                                <div className="social-creative">
                                    {socialProfiles.map((profile, index) => (
                                        <a
                                            key={index}
                                            href={profile.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="social-button"
                                        >
                                            {profile.platform}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreativeLayout;
