/** Album page sections: enter from Y 170, spring (stiffness 362, damping 100, mass 1). */
export const albumPageSectionEnterSpring = {
  type: "spring" as const,
  stiffness: 362,
  damping: 100,
  mass: 1,
  delay: 0,
};

export function albumPageSectionMotionProps(reduceMotion: boolean | null) {
  if (reduceMotion) return {};
  return {
    initial: { y: 170, opacity: 1 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true, amount: "some" as const },
    transition: albumPageSectionEnterSpring,
  };
}
