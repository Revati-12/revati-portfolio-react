import { useState, useRef, useEffect } from "react";
import "./ChatBot.css";
import { db } from "../firebase";
import {
    collection, addDoc, serverTimestamp,
    doc, updateDoc, arrayUnion,
    getDoc, setDoc, increment
} from "firebase/firestore";

const REVATI_INFO = `
You are an AI assistant on Revati Kale's portfolio website.
Answer questions about Revati professionally and helpfully.
Only answer questions related to Revati — for anything else 
say "I can only answer questions about Revati's portfolio."

Here is everything about Revati:

NAME: Revati Kale
LOCATION: Wardha, Maharashtra, India
EMAIL: kalerevati27@gmail.com
PHONE: +91 8208509306
LINKEDIN: linkedin.com/in/revati-kale-a94120371

EDUCATION:
- B.Tech Computer Science Engineering — GH Raisoni College of Engineering, Nagpur (2025–2028, In Progress)
- Diploma in Computer Engineering — Government Polytechnic Arvi, Wardha (2022–2025, 88.57%)
- SSC 10th Grade — Kannamwar Vidyalaya Arvi, Wardha (2022, 89.60%)

EXPERIENCE:
- Industrial Training Trainee at Mountreach Solutions Pvt. Ltd. (Jun–Jul 2024)
  Built an Android prototype app using Java, XML and Firebase
  Learned industry coding practices and workflows
  Collaborated on documentation and presentations

TECHNICAL SKILLS:
- HTML & CSS (80%)
- Java Android Development (75%)
- C Programming (70%)
- Python (65%)
- Firebase & Cloud (60%)
- JavaScript (55%)

TOOLS & PLATFORMS:
- Android Studio, Firebase, Google Cloud, VS Code, GitHub, XML

CURRENTLY LEARNING:
- React.js, SQL, DSA, Cloud Architecture

SOFT SKILLS:
- Leadership, Teamwork, Problem Solving, Research, Mentoring, Presentation

PROJECTS:
1. Rakshak — Animal Safety & Emergency Reporting Android App
   - Built with Java, Android Studio, Firebase, XML, GPS API
   - Team of 4 members
   - One-tap emergency reporting with live location sharing
   - Intelligent routing by severity and proximity
   - Push notifications and real-time status updates

CERTIFICATIONS (6+):
- Google Cloud Fundamentals: Core Infrastructure (Google Cloud Skills Boost)
- Generative AI with Vertex AI (Google Cloud Skills Boost)
- Responsible AI with Google Cloud (Google Cloud Skills Boost)
- Python for Beginners (Infosys Springboard)
- Introduction to Cloud Computing (Infosys Springboard)
- Android App Development (Mountreach Solutions Industrial Training)

ACHIEVEMENTS:
- 2nd Prize at State Level TechFest 2025 (paper on cloud computing)
- Enigma 2.0 Hackathon Participant
- Executive Committee Member — IETE Forum Student Chapter

AVAILABILITY:
- Currently open to internships in Android Development or Web Development
- Available for collaborations and projects

PORTFOLIO WEBSITE:
- Built using React.js + Vite
- Styled with custom CSS
- Firebase Firestore for contact form
- AI Chatbot powered by OpenRouter
- Deployed on GitHub Pages
`;

const QUICK_QUESTIONS = [
    "What are Revati's skills?",
    "Tell me about Rakshak project",
    "Is she available for internship?",
    "What certifications does she have?",
];

const FOLLOWUP_MAP = {
    "skill": ["What tools does she use?", "Is she learning anything new?", "What is her strongest skill?"],
    "project": ["What was Revati's role?", "What tech stack was used?", "Any other projects?"],
    "rakshak": ["What tech was used in Rakshak?", "How big was the team?", "What problem does it solve?"],
    "certif": ["Which platform issued them?", "Is she doing more certifications?", "Any cloud certifications?"],
    "internship": ["How to contact Revati?", "What roles is she open to?", "Where is she located?"],
    "contact": ["What is her email?", "Is she on LinkedIn?", "Where is she based?"],
    "education": ["What is her GPA?", "Where does she study?", "When does she graduate?"],
    "default": ["What are her top skills?", "Tell me about her projects", "Is she available for internship?"],
};

function getFollowups(text) {
    const lower = text.toLowerCase();
    if (lower.includes("skill") || lower.includes("know") || lower.includes("language")) return FOLLOWUP_MAP["skill"];
    if (lower.includes("rakshak")) return FOLLOWUP_MAP["rakshak"];
    if (lower.includes("project")) return FOLLOWUP_MAP["project"];
    if (lower.includes("certif")) return FOLLOWUP_MAP["certif"];
    if (lower.includes("internship") || lower.includes("available") || lower.includes("hire")) return FOLLOWUP_MAP["internship"];
    if (lower.includes("contact") || lower.includes("email") || lower.includes("reach")) return FOLLOWUP_MAP["contact"];
    if (lower.includes("education") || lower.includes("college") || lower.includes("degree")) return FOLLOWUP_MAP["education"];
    return FOLLOWUP_MAP["default"];
}

// ── typing animation ──
function TypingText({ text }) {
    const [displayed, setDisplayed] = useState("");
    const [done, setDone] = useState(false);

    useEffect(() => {
        setDisplayed("");
        setDone(false);
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplayed(text.slice(0, i + 1));
                i++;
            } else {
                setDone(true);
                clearInterval(timer);
            }
        }, 12);
        return () => clearInterval(timer);
    }, [text]);

    return (
        <span>
            {displayed}
            {!done && <span className="typing-cursor">|</span>}
        </span>
    );
}

function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [chatId, setChatId] = useState(null);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [visitorNum, setVisitorNum] = useState(null);
    const [followups, setFollowups] = useState([]);
    const messagesEndRef = useRef(null);
    const countedRef = useRef(false);
    const [listening, setListening] = useState(false);
    const recognitionRef = useRef(null);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) return "Good morning! ☀️ I'm Revati's AI assistant. Are you looking for a talented developer? Ask me anything about her skills and experience!";
        if (hour >= 12 && hour < 17) return "Good afternoon! 👋 I'm Revati's AI assistant. Looking for a developer intern? Ask me anything about Revati's skills, projects, or experience!";
        if (hour >= 17 && hour < 21) return "Good evening! 🌙 I'm Revati's AI assistant. Exploring portfolios? Ask me anything about Revati's skills and projects!";
        return "Hello, night owl! 🦉 I'm Revati's AI assistant. Ask me anything about her skills, projects, or experience!";
    };

    const [messages, setMessages] = useState([
        { role: "ai", text: getGreeting() }
    ]);

    // ── visitor counter ──
    useEffect(() => {
        if (!isOpen || countedRef.current) return;
        countedRef.current = true;

        const countVisitor = async () => {
            try {
                const ref = doc(db, "stats", "chatbot");
                const snap = await getDoc(ref);
                if (snap.exists()) {
                    await updateDoc(ref, { visitors: increment(1) });
                    setVisitorNum(snap.data().visitors + 1);
                } else {
                    await setDoc(ref, { visitors: 1 });
                    setVisitorNum(1);
                }
            } catch (e) {
                console.error("Counter error:", e);
            }
        };
        countVisitor();
    }, [isOpen]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async (text) => {
        const question = text || input.trim();
        if (!question) return;

        setMessages((prev) => [...prev, { role: "user", text: question }]);
        setFollowups([]);
        setInput("");
        setLoading(true);

        try {
            const response = await fetch(
                "https://openrouter.ai/api/v1/chat/completions",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_KEY}`,
                        "HTTP-Referer": "https://revati-kale-portfolio.netlify.app",
                        "X-Title": "Revati Portfolio"
                    },
                    body: JSON.stringify({
                        model: "openrouter/auto",
                        messages: [
                            { role: "system", content: REVATI_INFO },
                            { role: "user", content: question }
                        ]
                    })
                }
            );

            const data = await response.json();

            if (data.choices && data.choices[0]) {
                const reply = data.choices[0].message.content;
                setMessages((prev) => [...prev, { role: "ai", text: reply, animate: true }]);
                setFollowups(getFollowups(question + " " + reply));

                // save to Firebase
                try {
                    if (!chatId) {
                        const docRef = await addDoc(collection(db, "chats"), {
                            startedAt: serverTimestamp(),
                            messages: [
                                { role: "user", text: question },
                                { role: "ai", text: reply }
                            ]
                        });
                        setChatId(docRef.id);
                    } else {
                        const chatRef = doc(db, "chats", chatId);
                        await updateDoc(chatRef, {
                            messages: arrayUnion(
                                { role: "user", text: question },
                                { role: "ai", text: reply }
                            )
                        });
                    }
                } catch (fbErr) {
                    console.error("Firebase save error:", fbErr);
                }

            } else {
                setMessages((prev) => [...prev, {
                    role: "ai",
                    text: "Sorry, I couldn't get a response. Please try again!"
                }]);
            }

        } catch (err) {
            console.error(err);
            setMessages((prev) => [...prev, {
                role: "ai",
                text: "Sorry, something went wrong. Please try again!"
            }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKey = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };
    const startVoice = () => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Sorry, your browser doesn't support voice input. Try Chrome!");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = "en-IN";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => setListening(true);
        recognition.onend = () => setListening(false);

        recognition.onresult = (e) => {
            const transcript = e.results[0][0].transcript;
            setInput(transcript);
        };

        recognition.onerror = (e) => {
            console.error("Voice error:", e.error);
            setListening(false);
        };

        recognitionRef.current = recognition;
        recognition.start();
    };

    return (
        <>
            <button
                className={`chatbot-fab ${isOpen ? "open" : ""}`}
                onClick={() => setIsOpen(!isOpen)}
                title="Ask AI about Revati"
            >
                {isOpen ? "✕" : "🤖"}
            </button>

            {isOpen && (
                <div className="chatbot-window">

                    {/* header */}
                    <div className="chatbot-header">
                        <div className="chatbot-avatar">AI</div>
                        <div>
                            <div className="chatbot-name">Revati's AI Assistant</div>
                            <div className="chatbot-status">
                                <span className="chatbot-dot"></span>
                                {visitorNum
                                    ? `Visitor #${visitorNum} • Always online`
                                    : "Always online"
                                }
                            </div>
                        </div>
                        <button className="chatbot-close" onClick={() => setIsOpen(false)}>✕</button>
                    </div>

                    {/* messages */}
                    <div className="chatbot-messages">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`chatbot-msg ${msg.role === "user" ? "user" : "ai"}`}
                            >
                                {msg.role === "ai" && msg.animate
                                    ? <TypingText text={msg.text} />
                                    : msg.text
                                }
                            </div>
                        ))}
                        {loading && (
                            <div className="chatbot-msg ai">
                                <span className="chatbot-typing">
                                    <span></span><span></span><span></span>
                                </span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* follow-up suggestions */}
                    {followups.length > 0 && !loading && (
                        <div className="chatbot-followups">
                            <div className="followup-label">You might also ask:</div>
                            <div className="followup-btns">
                                {followups.map((q, i) => (
                                    <button
                                        key={i}
                                        className="followup-btn"
                                        onClick={() => sendMessage(q)}
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* quick questions — only show before first user message */}
                    {messages.length <= 1 && (
                        <div className="chatbot-quick">
                            {QUICK_QUESTIONS.map((q, i) => (
                                <button
                                    key={i}
                                    className="chatbot-quick-btn"
                                    onClick={() => sendMessage(q)}
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* input */}
                    <div className="chatbot-input-row">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKey}
                            placeholder={listening ? "🎤 Listening..." : "Ask anything about Revati..."}
                            className={`chatbot-input ${listening ? "listening" : ""}`}
                            disabled={loading}
                        />
                        {/* voice button */}
                        <button
                            className={`chatbot-voice ${listening ? "active" : ""}`}
                            onClick={startVoice}
                            disabled={loading}
                            title="Voice input"
                        >
                            🎤
                        </button>
                        <button
                            className="chatbot-send"
                            onClick={() => sendMessage()}
                            disabled={loading || !input.trim()}
                        >
                            ➤
                        </button>
                    </div>

                </div>
            )}
        </>
    );
}

export default ChatBot;