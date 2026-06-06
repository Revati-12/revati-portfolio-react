import "./Projects.css";

function Projects() {
    const handleAction = (message) => {
        alert(message);
    };
    return (
        <section id="projects">
            <div style={{ position: 'relative', zIndex: 1 }}></div>
            <div className="section-header">
                <div className="section-tag">what I built</div>
                <h2 className="section-title">
                    My <span>Projects</span>
                </h2>
                <div className="section-line"></div>
            </div>

            <div className="projects-grid">

                {/* Rakshak Project */}
                <div className="project-card reveal">
                    <div className="project-top">
                        <div className="project-icon">🦮</div>
                        <div className="project-links">
                            <span className="project-tag-badge">Team of 4</span>
                        </div>
                    </div>

                    <h3 className="project-name">Rakshak</h3>

                    <p className="project-tagline">
                        Animal Safety & Emergency Reporting App
                    </p>

                    <p className="project-desc">
                        An Android application that lets civilians instantly report
                        animal accidents. GPS-enabled photos auto-notify nearby NGOs
                        and vets, with intelligent routing to prioritize cases by
                        severity.
                    </p>

                    <ul className="project-features">
                        <li>One-tap emergency reporting with live location sharing</li>
                        <li>Intelligent routing by severity & proximity</li>
                        <li>Push notifications & real-time status updates</li>
                        <li>Embedded first-aid guidance for animals</li>
                    </ul>

                    <div className="project-stack">
                        <span>Java</span>
                        <span>Android Studio</span>
                        <span>Firebase</span>
                        <span>XML</span>
                        <span>GPS API</span>
                    </div>
                    <div className="project-actions">
                        <button
                            className="project-btn"
                            onClick={() => handleAction("Rakshak case study will be available soon!")}
                        >
                            📄 View Case Study
                        </button>

                        <button
                            className="project-btn secondary"
                            onClick={() => handleAction("Project screenshots coming soon!")}
                        >
                            📸 Screenshots
                        </button>
                    </div>


                </div>

                {/* Project 2 */}
                <div className="project-card coming-soon reveal">
                    <div className="project-top">
                        <div className="project-icon">🌐</div>
                        <div className="status-badge progress">In Progress</div>
                    </div>

                    <h3 className="project-name">Portfolio CMS</h3>

                    <p className="project-tagline">
                        Frontend / Full-Stack Application
                    </p>

                    <p className="project-desc">
                        Currently in progress. I'm exploring React.js and building
                        my first full web application.
                    </p>

                    <div className="project-stack">
                        <span>React.js</span>
                        <span>JavaScript</span>
                        <span>CSS</span>
                    </div>
                    <div className="project-actions">
                        <button
                            className="project-btn"
                            onClick={() => handleAction("Project is currently in development!")}
                        >
                            🚧 In Development
                        </button>

                        <button
                            className="project-btn secondary"
                            onClick={() => handleAction("You'll be notified when the project is ready!")}
                        >
                            🔔 Notify Me
                        </button>
                    </div>
                </div>

                {/* Project 3 */}
                <div className="project-card reveal">
                    <div className="project-top">
                        <div className="project-icon">🚗</div>
                        <div className="status-badge first-project">First Project</div>
                    </div>

                    <h3 className="project-name">2D Car Animation</h3>

                    <p className="project-tagline">
                        C Programming Graphics Project
                    </p>

                    <p className="project-desc">
                        One of my first programming projects, developed using C programming and graphics concepts.
                        The project demonstrates a moving 2D car animation and helped me understand programming logic,
                        computer graphics, and animation fundamentals.
                    </p>

                    <div className="project-stack">
                        <span>C Programming</span>
                        <span>Graphics.h</span>
                        <span>Animation</span>
                    </div>
                    <div className="project-actions">
                        <button className="project-btn"
                            onClick={() => handleAction("A demo video of the 2D Car Animation will be added soon.")}
                        >
                            🎬 Watch Animation
                        </button>

                        <button className="project-btn secondary"
                            onClick={() => handleAction("The source code for this project will be uploaded soon.")}
                        >
                            💻 Source Code
                        </button>
                    </div>
                </div>

            </div>

            <div className="student-note reveal">
                <span className="note-icon">💡</span>

                <p>
                    I'm a 3rd-year student actively building my portfolio.
                    More projects are on the way — follow my journey on LinkedIn.
                </p>
            </div>
        </section>
    );
}

export default Projects;