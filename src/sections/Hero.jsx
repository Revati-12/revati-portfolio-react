import "./Hero.css";
import { useState, useEffect } from "react";

function Hero() {

    const roles = [
        "Web Applications",
        "Android Apps",
        "Full Stack Projects",
        "Cloud Solutions",
        "Modern UI/UX"
    ];

    const [text, setText] = useState("");
    const [roleIndex, setRoleIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
        const currentRole = roles[roleIndex];

        if (charIndex < currentRole.length) {
            const timeout = setTimeout(() => {
                setText(currentRole.slice(0, charIndex + 1));
                setCharIndex(charIndex + 1);
            }, 80);

            return () => clearTimeout(timeout);
        }

        const timeout = setTimeout(() => {
            setText("");
            setCharIndex(0);
            setRoleIndex((prev) => (prev + 1) % roles.length);
        }, 1800);

        return () => clearTimeout(timeout);
    }, [charIndex, roleIndex]);
    return (
        <section id="home">

            {/* background orbs */}
            <div className="orb orb-1"></div>
            <div className="orb orb-2"></div>

            <div className="hero-content">

                <div className="hero-greeting">
                    <span className="code-bracket">&lt;</span>
                    Hello, World!
                    <span className="code-bracket">/&gt;</span>
                </div>

                <h1 className="hero-name">
                    I'm <span className="gradient-text">Revati Kale</span>
                </h1>
                <div className="hero-subtitle">
                    Computer Engineering Student & Developer
                </div>

                <div className="hero-role">
                    <span className="role-prefix">I build </span>

                    <span className="typed-text">
                        {text}
                    </span>

                    <span className="cursor">|</span>
                </div>

                <p className="hero-bio">
                    A passionate 3rd year CS Engineering student at
                    GH Raisoni College, Nagpur — exploring Android
                    development, web technologies, and cloud
                    platforms. Currently open to internships and
                    collaborations.
                </p>

                <div className="hero-btns">

                    <a href="#projects" className="btn-primary">
                        View My Work

                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>

                    </a>

                    <a
                        href="https://www.linkedin.com/in/revati-kale-a94120371"
                        target="_blank"
                        rel="noreferrer"
                        className="btn-secondary"
                    >
                        LinkedIn
                    </a>
                    <a
                        href="https://www.skills.google/public_profiles/bcb7f0b8-8631-41df-b24e-918d418d6d9e"
                        target="_blank"
                        rel="noreferrer"
                        className="btn-secondary"
                    >
                        Google Skills
                    </a>

                </div>

                <div className="hero-stats">

                    <div className="stat">
                        <span className="stat-num">88.57%</span>
                        <span className="stat-label">Diploma Score</span>
                    </div>

                    <div className="stat-divider"></div>

                    <div className="stat">
                        <span className="stat-num">89.60%</span>
                        <span className="stat-label">SSC Score</span>
                    </div>

                    <div className="stat-divider"></div>

                    <div className="stat">
                        <span className="stat-num">6+</span>
                        <span className="stat-label">Certifications</span>
                    </div>

                </div>

            </div>

            <div className="hero-visual">

                <div className="float-badge badge-1">
                    <span>☁️</span> Google Skills Certified
                </div>

                <div className="float-badge badge-2">
                    <span>📱</span> Android Dev
                </div>

                <div className="float-badge badge-3">
                    <span>🏆</span> State Level 2nd Prize
                </div>

                <div className="float-badge badge-4">
                    <span>🐍</span> Python
                </div>

                <div className="hero-card">

                    <div className="card-top">

                        <div className="card-avatar">
                            RK
                        </div>

                        <div>
                            <div className="card-name">
                                Revati Kale
                            </div>

                            <div className="card-status">
                                <span className="status-dot"></span>
                                Open to opportunities
                            </div>

                        </div>

                    </div>

                    <div className="card-divider"></div>

                    <div className="card-row">
                        <span className="card-label">
                            College
                        </span>
                        <span className="card-val">
                            GH Raisoni, Nagpur
                        </span>
                    </div>

                    <div className="card-row">
                        <span className="card-label">
                            Focus
                        </span>
                        <span className="card-val">
                            Android & Web Dev
                        </span>
                    </div>

                    <div className="card-row">
                        <span className="card-label">
                            Batch
                        </span>
                        <span className="card-val">
                            B.Tech 2025–2028
                        </span>
                    </div>

                </div>

            </div>

        </section>
    );
}

export default Hero;