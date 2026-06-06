import "./Navbar.css";

function Navbar({ toggleTheme, theme, activeSection, setActiveSection }) {
    return (
        <nav id="navbar">

            <div className="nav-logo">
                Revati<span>.</span>
            </div>

            <ul className="nav-links">

                <li>
                    <a className={activeSection === "home" ? "active" : ""} href="#home">
                        Home
                    </a>
                </li>

                <li>
                    <a className={activeSection === "about" ? "active" : ""} href="#about">
                        About
                    </a>
                </li>

                <li>
                    <a className={activeSection === "skills" ? "active" : ""} href="#skills">
                        Skills
                    </a>
                </li>

                <li>
                    <a className={activeSection === "projects" ? "active" : ""} href="#projects">
                        Projects
                    </a>
                </li>

                <li>
                    <a
                        className={activeSection === "certificates" ? "active" : ""}
                        href="#certificates"
                        onClick={() => setActiveSection("certificates")}
                    >
                        Certificates
                    </a>
                </li>

                <li>
                    <a className={activeSection === "contact" ? "active" : ""} href="#contact">
                        Contact
                    </a>
                </li>

                {/* THEME TOGGLE */}
                <button
                    className="theme-btn"
                    onClick={toggleTheme}
                >
                    {theme === "dark" ? "☀️" : "🌙"}
                </button>

            </ul>

        </nav>
    );
}

export default Navbar;