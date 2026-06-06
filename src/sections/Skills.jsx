import "./Skills.css";

function Skills() {
    return (
        <section id="skills">

            <div className="section-header">
                <div className="section-tag">what I know</div>
                <h2 className="section-title">
                    My <span>Skills</span>
                </h2>
                <div className="section-line"></div>
            </div>

            <div className="skills-grid">

                {/* Skill Bars */}
                <div className="skill-bars reveal">

                    <div className="skill-bar-group">
                        <div className="skill-bar-top">
                            <span className="skill-name">HTML & CSS</span>
                            <span className="skill-pct">80%</span>
                        </div>
                        <div className="skill-track">
                            <div
                                className="skill-fill"
                                style={{ width: "80%" }}
                            ></div>
                        </div>
                    </div>

                    <div className="skill-bar-group">
                        <div className="skill-bar-top">
                            <span className="skill-name">Java (Android)</span>
                            <span className="skill-pct">40%</span>
                        </div>
                        <div className="skill-track">
                            <div
                                className="skill-fill"
                                style={{ width: "40%" }}
                            ></div>
                        </div>
                    </div>

                    <div className="skill-bar-group">
                        <div className="skill-bar-top">
                            <span className="skill-name">Python</span>
                            <span className="skill-pct">40%</span>
                        </div>
                        <div className="skill-track">
                            <div
                                className="skill-fill"
                                style={{ width: "40%" }}
                            ></div>
                        </div>
                    </div>

                    <div className="skill-bar-group">
                        <div className="skill-bar-top">
                            <span className="skill-name">JavaScript</span>
                            <span className="skill-pct">70%</span>
                        </div>
                        <div className="skill-track">
                            <div
                                className="skill-fill"
                                style={{ width: "70%" }}
                            ></div>
                        </div>
                    </div>

                    <div className="skill-bar-group">
                        <div className="skill-bar-top">
                            <span className="skill-name">Firebase & Cloud</span>
                            <span className="skill-pct">50%</span>
                        </div>
                        <div className="skill-track">
                            <div
                                className="skill-fill"
                                style={{ width: "50%" }}
                            ></div>
                        </div>
                    </div>

                    <div className="skill-bar-group">
                        <div className="skill-bar-top">
                            <span className="skill-name">C Programming</span>
                            <span className="skill-pct">70%</span>
                        </div>
                        <div className="skill-track">
                            <div
                                className="skill-fill"
                                style={{ width: "70%" }}
                            ></div>
                        </div>
                    </div>

                </div>

                {/* Skill Pills */}
                <div className="skill-pills-wrap reveal">

                    <div className="pill-group">
                        <div className="pill-group-title">
                            🛠 Tools & Platforms
                        </div>

                        <div className="pills">
                            <span className="pill">Android Studio</span>
                            <span className="pill">Firebase</span>
                            <span className="pill">VS Code</span>
                            <span className="pill">GitHub</span>
                            <span className="pill">XML</span>
                        </div>
                    </div>

                    <div className="pill-group">
                        <div className="pill-group-title">
                            💡 Soft Skills
                        </div>

                        <div className="pills">
                            <span className="pill teal">Leadership</span>
                            <span className="pill teal">Teamwork</span>
                            <span className="pill teal">Problem Solving</span>
                            <span className="pill teal">Research</span>
                            <span className="pill teal">Mentoring</span>
                            <span className="pill teal">Presentation</span>
                        </div>
                    </div>

                    <div className="pill-group">
                        <div className="pill-group-title">
                            📚 Currently Learning
                        </div>

                        <div className="pills">
                            <span className="pill purple">React.js</span>
                            <span className="pill purple">SQL</span>
                            <span className="pill purple">DSA</span>
                            <span className="pill purple">Cloud Architecture</span>
                        </div>
                    </div>

                </div>

            </div>

        </section>
    );
}

export default Skills;