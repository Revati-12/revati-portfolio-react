import { useState } from "react";
import certificates from "../certificatesData";
import "./Certificates.css";

function Certificates() {
    const [selectedPdf, setSelectedPdf] = useState(null);
    const [activeFilter, setActiveFilter] = useState("All");

    const featuredCertificates = certificates.filter(
        (cert) => cert.featured
    );

    const categories = [
        "All",
        ...new Set(certificates.map((cert) => cert.category))
    ];

    const filteredCertificates =
        activeFilter === "All"
            ? certificates
            : certificates.filter(
                (cert) => cert.category === activeFilter
            );

    return (
        <section id="certificates">
            <div className="section-header">
                <span className="section-label">
                    verified learning
                </span>

                <h2 className="section-title">
                    My <span>Certificates</span>
                </h2>

                <div className="section-line"></div>

                <p className="section-subtitle">
                    Certifications, achievements and learning milestones.
                </p>
            </div>

            {/* Filters */}

            <div className="filter-container">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`filter-btn ${activeFilter === category
                            ? "active"
                            : ""
                            }`}
                        onClick={() =>
                            setActiveFilter(category)
                        }
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* All Certificates */}

            <div className="certificates-grid">
                {filteredCertificates.map((cert, index) => (
                    <div
                        className="certificate-card"
                        key={index}
                    >
                        <span className="badge">
                            {cert.category}
                        </span>

                        <h4>{cert.title}</h4>

                        <p>{cert.issuer}</p>

                        <button
                            className="view-btn"
                            onClick={() =>
                                setSelectedPdf(cert.file)
                            }
                        >
                            View Certificate
                        </button>
                    </div>
                ))}
            </div>

            {/* PDF Modal */}

                { selectedPdf && (
                    <div
                        className="pdf-modal"
                        onClick={() => setSelectedPdf(null)}
                    >
                        <div
                            className="pdf-container"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="close-btn"
                                onClick={() => setSelectedPdf(null)}
                            >
                                ✕
                            </button>

                            <a
                                href={selectedPdf}
                                download
                                className="download-btn"
                            >
                                Download PDF
                            </a>

                            <a
                                href={selectedPdf}
                                target="_blank"
                                rel="noreferrer"
                                className="download-btn"
                                style={{ marginLeft: "10px" }}
                            >
                                Open PDF
                            </a>

                            <iframe
                                src={selectedPdf}
                                title="Certificate"
                                width="100%"
                                height="600px"
                                style={{
                                    border: "none",
                                    marginTop: "20px"
                                }}
                            />
                        </div>
                    </div>
                )}
        </section >
    );
}

export default Certificates;