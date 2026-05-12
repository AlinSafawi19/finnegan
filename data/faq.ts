export type FaqEntry = {
  id: string;
  question: string;
  answer: string;
};

export const FAQ_ITEMS: readonly FaqEntry[] = [
  {
    id: "book-session",
    question: "How do I book a photography session with you?",
    answer:
      "You can book a session by filling out the contact form on my website or by emailing me directly at [your email address]. I'll get back to you within 24 hours to discuss the details and schedule your shoot.",
  },
  {
    id: "rates",
    question: "What are your rates for photography sessions?",
    answer: `+ Portrait sessions start at $200.

+ Event photography starts at $500.

+ Commercial and product photography pricing is customized based on the project scope.`,
  },
  {
    id: "pricing-includes",
    question: "What does your pricing include?",
    answer: `Pre-shoot consultation.
The photography session.

Professional editing of selected images.

A set number of high-resolution digital images.

Online gallery for viewing and downloading photos.`,
  },
  {
    id: "specialties",
    question: "What types of photography do you specialize in?",
    answer:
      "I specialize in a variety of photography services including portrait, travel, commercial, product, event, and landscape photography. Check out my portfolio to see examples of my work.",
  },
  {
    id: "packages",
    question: "What is included in your photography packages?",
    answer:
      "My packages typically include a pre-shoot consultation, the photography session, professional editing, and a set number of high-resolution digital images. I also offer prints and albums as add-ons.",
  },
  {
    id: "session-length",
    question: "How long does a typical photo session last?",
    answer:
      "Most sessions last between 1-2 hours, depending on the type of shoot and the number of locations. Larger events will naturally take longer.",
  },
  {
    id: "travel",
    question: "Do you travel for shoots?",
    answer:
      "Yes, I love to travel! I am available for destination shoots and events worldwide. Travel fees may apply depending on the location.",
  },
  {
    id: "wardrobe",
    question: "What should I wear to my photo session?",
    answer:
      "I recommend wearing something that makes you feel comfortable and confident. Solid colors and minimal patterns work best. We can discuss wardrobe options during your pre-shoot consultation.",
  },
  {
    id: "photo-delivery",
    question: "How long will it take to receive my photos?",
    answer:
      "You will receive a preview gallery within a week of your shoot. The final edited images will be delivered within 2-4 weeks, depending on the scope of the project.",
  },
] as const;
