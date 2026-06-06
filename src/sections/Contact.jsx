import "./Contact.css";
import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import emailjs from "@emailjs/browser";

function Contact() {

    const [form, setForm] = useState({
        name: "", email: "", subject: "", message: ""
    });
    const [status, setStatus] = useState("idle");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!form.name || !form.email || !form.subject || !form.message) {
            setStatus("empty");
            return;
        }

        setStatus("sending");

        try {
            // Save message to Firebase
            await addDoc(collection(db, "messages"), {
                ...form,
                createdAt: serverTimestamp(),
            });

            // Send email notification
            await emailjs.send(
                "service_0ukn0u9",
                "template_0dki2cd",
                {
                    name: form.name,
                    email: form.email,
                    subject: form.subject,
                    message: form.message,
                    time: new Date().toLocaleString(),
                },
                "kXNnGXU4HIddLB1Ng"
            );

            setStatus("success");

            setForm({
                name: "",
                email: "",
                subject: "",
                message: "",
            });
        } catch (err) {
            console.error("Contact form error:", err);
            setStatus("error");
        }


    };


    return (
        <section id="contact">

            <div className="section-grid-bg"></div>

            <div className="section-header">
                <div className="section-tag">get in touch</div>
                <h2 className="section-title">
                    Contact <span>Me</span>
                </h2>
                <div className="section-line"></div>
            </div>

            <div className="contact-grid">

                <div className="contact-info reveal">
                    <p className="contact-intro">
                        I'm always open to internship opportunities,
                        collaborations, or just a friendly chat about
                        tech. My inbox is always open!
                    </p>
                    <div className="contact-cards">
                        <a href="mailto:kalerevati27@gmail.com" className="contact-card">
                            <div className="contact-card-icon">✉</div>
                            <div>
                                <div className="contact-card-label">Email</div>
                                <div className="contact-card-val">kalerevati3@gmail.com</div>
                            </div>
                        </a>
                        <a href="tel:+918208509306" className="contact-card">
                            <div className="contact-card-icon">📞</div>
                            <div>
                                <div className="contact-card-label">Phone</div>
                                <div className="contact-card-val">+91 8208509306</div>
                            </div>
                        </a>
                        <a href="https://www.linkedin.com/in/revati-kale-a94120371"
                            target="_blank" rel="noreferrer" className="contact-card">
                            <div className="contact-card-icon">in</div>
                            <div>
                                <div className="contact-card-label">LinkedIn</div>
                                <div className="contact-card-val">revati-kale-a94120371</div>
                            </div>
                        </a>
                        <div className="contact-card">
                            <div className="contact-card-icon">📍</div>
                            <div>
                                <div className="contact-card-label">Location</div>
                                <div className="contact-card-val">Wardha, Maharashtra</div>
                            </div>
                        </div>
                    </div>

                    <div className="ach-strip">
                        <div className="ach-strip-title">🏆 Quick Highlights</div>
                        <div className="ach-items">
                            <div className="ach-item">
                                <span className="ach-icon">🥈</span>
                                <span>2nd Prize — State Level TechFest 2025</span>
                            </div>
                            <div className="ach-item">
                                <span className="ach-icon">⚡</span>
                                <span>Enigma 2.0 Hackathon Participant</span>
                            </div>
                            <div className="ach-item">
                                <span className="ach-icon">🤝</span>
                                <span>IETE Forum Executive Committee</span>
                            </div>
                            <div className="ach-item">
                                <span className="ach-icon">📜</span>
                                <span>6+ Certifications — Google Cloud & Infosys</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="contact-form-wrap reveal">
                    <form className="contact-form" onSubmit={handleSubmit}>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Your Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Priya Sharma"
                                />
                            </div>
                            <div className="form-group">
                                <label>Your Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="you@email.com"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Subject</label>
                            <input
                                type="text"
                                name="subject"
                                value={form.subject}
                                onChange={handleChange}
                                placeholder="Internship / Collaboration / Just saying hi!"
                            />
                        </div>

                        <div className="form-group">
                            <label>Message</label>
                            <textarea
                                rows="5"
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                placeholder="Hi Revati, I'd love to..."
                            ></textarea>
                        </div>

                        {status === "empty" && (
                            <p className="form-status error">⚠ Please fill in all fields.</p>
                        )}
                        {status === "success" && (
                            <p className="form-status success">✅ Message sent! I'll get back to you soon.</p>
                        )}
                        {status === "error" && (
                            <p className="form-status error">❌ Something went wrong. Please try again.</p>
                        )}

                        <button
                            type="submit"
                            className="btn-submit"
                            disabled={status === "sending"}
                        >
                            {status === "sending" ? "Sending..." : "Send Message"}
                        </button>

                    </form>
                </div>

            </div>

        </section>
    );
}

export default Contact;