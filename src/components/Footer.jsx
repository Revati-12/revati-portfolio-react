import "./Footer.css";

function Footer() {
    return (
        <footer id="footer">

            <div className="footer-orb footer-orb-1"></div>
            <div className="footer-orb footer-orb-2"></div>
            <div className="footer-grid"></div>

            <div className="footer-container">

                <div className="footer-left">

                    <h2 className="footer-logo">
                        Revati<span>.</span>
                    </h2>

                    <p className="footer-desc">
                        Computer Engineering Student passionate about
                        Android Development, Web Technologies and Cloud.
                    </p>

                </div>

                <div className="footer-right">

                    <a
                        href="https://github.com/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        GitHub
                    </a>

                    <a
                        href="https://www.linkedin.com/in/revati-kale-a94120371"
                        target="_blank"
                        rel="noreferrer"
                    >
                        LinkedIn
                    </a>

                    <a href="mailto:kalerevati3@gmail.com">
                        Email
                    </a>

                    <a
                        href="certificates/Resume/revati-kale-resume.pdf"
                        target="_blank"
                        rel="noreferrer"
                    >Resume
                    </a>

                </div>

            </div>

            <div className="footer-divider"></div>

            <div className="footer-bottom">

                <p>
                    © 2026 Revati Kale. All Rights Reserved.
                </p>

                <p style={{ color: "var(--teal)", fontSize: "0.82rem" }}>
                    Open to Internships ✦
                </p>

            </div>

        </footer>
    );
}

export default Footer;