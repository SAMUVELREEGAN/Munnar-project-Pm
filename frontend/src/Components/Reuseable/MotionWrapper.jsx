import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../../utils/motion";

/**
 * Animate elements on scroll into viewport with Framer Motion
 */
export function FadeIn({
    children,
    direction = "up",
    delay = 0,
    duration = 0.6,
    className = "",
    viewportOnce = true,
    ...props
}) {
    return (
        <motion.div
            variants={fadeIn(direction, delay, duration)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: viewportOnce, margin: "-40px" }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}

/**
 * Container that staggers the appearance of child motion elements
 */
export function StaggerContainer({
    children,
    staggerChildren = 0.1,
    delayChildren = 0,
    className = "",
    viewportOnce = true,
    ...props
}) {
    return (
        <motion.div
            variants={staggerContainer(staggerChildren, delayChildren)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: viewportOnce, margin: "-40px" }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}

export { motion, AnimatePresence } from "framer-motion";
