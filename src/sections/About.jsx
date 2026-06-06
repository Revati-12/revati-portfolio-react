import "./About.css";
function About() {
    return (
        <section id="about">

            <div className="section-header">
                <div className="section-tag">about me</div>
                <h2 className="section-title">
                    Who I <span>Am</span>
                </h2>
                <div className="section-line"></div>
            </div>

            <div className="about-grid">

                {/* Left Side */}
                <div className="about-text reveal">
                    <div style={{ textAlign: "justify" }}>
                        <p>
                            Hey! I'm <strong>Revati Kale</strong>, a second-year B.Tech
                            Computer Science student from Wardha, Maharashtra.
                            Before my B.Tech, I completed my Diploma in Computer
                            Engineering with <strong>88.57%</strong>.
                        </p>

                        <p>
                            I got my first industry experience at
                            <strong> Mountreach Solutions</strong>, where I built
                            an Android prototype app using Java, XML and Firebase.
                        </p>

                        <p>
                            I enjoy learning through hands-on projects.
                            My journey started with a <strong>2D car animation </strong>in C programming, followed by <strong>SafeSphere</strong>, a personal safety app.
                            Later, working in a team of four, we enhanced the idea into <strong>Rakshak</strong>, an animal safety application.
                            These experiences helped me strengthen my development skills and problem-solving abilities.

                        </p>
                    </div>
                    <div className="about-info-grid">

                        <div className="info-chip">
                            <span className="chip-label">📍 Location</span>
                            <span className="chip-val">Wardha, Maharashtra</span>
                        </div>

                        <div className="info-chip">
                            <span className="chip-label">🎓 College</span>
                            <span className="chip-val">GH Raisoni, Nagpur</span>
                        </div>

                        <div className="info-chip">
                            <span className="chip-label">📅 Batch</span>
                            <span className="chip-val">B.Tech 2025–2028</span>
                        </div>

                        <div className="info-chip">
                            <span className="chip-label">💼 Status</span>
                            <span className="chip-val">Open to Internships</span>
                        </div>

                    </div>

                    <div className="about-links">

                        <a
                            href="mailto:kalerevati27@gmail.com"
                            className="about-link"
                        >
                            ✉️ kalerevati3@gmail.com
                        </a>

                        <a
                            href="tel:+918208509306"
                            className="about-link"
                        >
                            📞 +91 8208509306
                        </a>

                    </div>

                </div>

                {/* Right Side */}
                <div className="education reveal">

                    <div className="edu-label">
                        Education Timeline
                    </div>

                    <div className="edu-item">
                        <div className="edu-dot"></div>

                        <div className="edu-content">
                            <div className="edu-year">
                                2025 – 2028 (Expected)
                            </div>

                            <div className="edu-degree">
                                B.Tech — Computer Science Engineering
                            </div>

                            <div className="edu-school">
                                GH Raisoni College of Engineering, Nagpur
                            </div>

                            <div className="edu-badge in-progress">
                                In Progress
                            </div>
                        </div>
                    </div>

                    <div className="edu-item">
                        <div className="edu-dot"></div>

                        <div className="edu-content">
                            <div className="edu-year">
                                2022 – 2025
                            </div>

                            <div className="edu-degree">
                                Diploma — Computer Engineering
                            </div>

                            <div className="edu-school">
                                Government Polytechnic Arvi, Wardha
                            </div>

                            <div className="edu-badge score">
                                88.57%
                            </div>
                        </div>
                    </div>

                    <div className="edu-item">
                        <div className="edu-dot"></div>

                        <div className="edu-content">
                            <div className="edu-year">
                                2022
                            </div>

                            <div className="edu-degree">
                                SSC — 10th Grade
                            </div>

                            <div className="edu-school">
                                Kannamwar Vidyalaya Arvi, Wardha
                            </div>

                            <div className="edu-badge score">
                                89.60%
                            </div>
                        </div>
                    </div>

                    <div className="exp-card">

                        <div className="exp-top">

                            <div className="exp-icon">
                                🏢
                            </div>

                            <div>
                                <div className="exp-role">
                                    Industrial Training Trainee
                                </div>

                                <div className="exp-company">
                                    Mountreach Solutions Pvt. Ltd.
                                </div>
                            </div>

                            <div className="exp-duration">
                                Jun – Jul 2024
                            </div>

                        </div>

                        <ul className="exp-points">
                            <li>Built an Android prototype with Java, XML & Firebase</li>
                            <li>Learned industry coding practices & workflows</li>
                            <li>Collaborated on documentation & presentations</li>
                        </ul>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default About;