import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AuroraBackground() {
    const [mouse, setMouse] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const move = (e) => {
            setMouse({
                x: e.clientX,
                y: e.clientY,
            });
        };

        window.addEventListener("mousemove", move);

        return () => {
            window.removeEventListener("mousemove", move);
        };
    }, []);

    return (
        <div className="aurora-container">
            {/* Mouse Glow */}
            <div
                className="mouse-glow"
                style={{
                    left: mouse.x,
                    top: mouse.y,
                }}
            />

            {/* Aurora Blobs */}
            <motion.div
                className="aurora blob-purple"
                animate={{
                    x: [0, 150, 0],
                    y: [0, 80, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="aurora blob-cyan"
                animate={{
                    x: [0, -120, 0],
                    y: [0, 100, 0],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="aurora blob-violet"
                animate={{
                    x: [0, 80, 0],
                    y: [0, -120, 0],
                }}
                transition={{
                    duration: 22,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Particles */}
            <div className="particles">
                {[...Array(40)].map((_, i) => (
                    <span
                        key={i}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${6 + Math.random() * 6}s`,
                        }}
                    />
                ))}
            </div>

            {/* Grid */}
            <div className="grid-bg" />
        </div>
    );
}