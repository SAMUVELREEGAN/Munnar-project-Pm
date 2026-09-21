// Reusable Framer Motion animation variants & transitions (Optimized for quick, snappy, buttery-smooth 60fps UX)

export const fastEase = [0.16, 1, 0.3, 1];

export const fadeIn = (direction = "up", delay = 0, duration = 0.32) => {
    return {
        hidden: {
            y: direction === "up" ? 14 : direction === "down" ? -14 : 0,
            x: direction === "left" ? 14 : direction === "right" ? -14 : 0,
            opacity: 0,
        },
        show: {
            y: 0,
            x: 0,
            opacity: 1,
            transition: {
                type: "tween",
                duration: duration,
                delay: delay,
                ease: fastEase,
            },
        },
    };
};

export const staggerContainer = (staggerChildren = 0.04, delayChildren = 0) => {
    return {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: staggerChildren,
                delayChildren: delayChildren,
            },
        },
    };
};

export const cardVariant = {
    hidden: { opacity: 0, y: 12 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            type: "tween",
            duration: 0.32,
            ease: fastEase,
        },
    },
};

export const scaleIn = (delay = 0, duration = 0.28) => {
    return {
        hidden: { opacity: 0, scale: 0.96 },
        show: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "tween",
                duration: duration,
                delay: delay,
                ease: fastEase,
            },
        },
    };
};

export const springHover = {
    rest: { scale: 1, y: 0 },
    hover: {
        y: -5,
        transition: {
            type: "spring",
            stiffness: 350,
            damping: 22,
        },
    },
};

export const buttonTap = {
    scale: 0.96,
    transition: {
        type: "spring",
        stiffness: 450,
        damping: 18,
    },
};
