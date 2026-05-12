export type ReviewTickerVariant = 1 | 2;

export type ReviewTickerCard = {
  variant: ReviewTickerVariant;
  avatarSrc: string;
  avatarAlt: string;
  text: string;
  name: string;
  moreDetails: string;
  /** 1–5 */
  rating: number;
};

/** Four review cards (sequence duplicated in the marquee for a seamless loop). */
export const REVIEWS_TICKER_CARDS: readonly ReviewTickerCard[] = [
  {
    variant: 1,
    avatarSrc:
      "https://framerusercontent.com/images/IQSjFA4Ib4n0oYbLbdzOcyLNoc.jpg?width=313&height=318",
    avatarAlt: "Portrait of Michael T.",
    text: 'We are thrilled with the product photography provided by James. They captured our products beautifully, highlighting their unique features and enhancing their appeal.',
    name: "Michael T.",
    moreDetails: "Marketing Manager, Stellar Designs",
    rating: 5,
  },
  {
    variant: 1,
    avatarSrc:
      "https://framerusercontent.com/images/lyybXyxksCLXHQiYzPxvVNCP0w.jpg?width=184&height=187",
    avatarAlt: "Portrait of Aurora Jensen",
    text: "Thanks you, our product images have never looked better! They have a keen eye for detail and a talent for capturing our products in the best possible light. We couldn't be happier with the results!",
    name: "Aurora Jensen",
    moreDetails: "Marketing Director",
    rating: 5,
  },
  {
    variant: 1,
    avatarSrc:
      "https://framerusercontent.com/images/a3sbnC4UAnsmxN1dQDA7reipn4.jpg?width=299&height=323",
    avatarAlt: "Portrait of G. Monroe",
    text: "He provided exceptional product photography services for our latest collection. Their attention to detail and creative approach resulted in images that perfectly showcased our products.  Highly recommended!",
    name: "G. Monroe",
    moreDetails: "Marketing Manager, Stellar Designs",
    rating: 5,
  },
  {
    variant: 1,
    avatarSrc:
      "https://framerusercontent.com/images/IWc4AmoN2WHJmPsYV3flu7I9ec.jpg?width=317&height=320",
    avatarAlt: "Portrait of Michael",
    text: "It was a fantastic experience! They brought a level of professionalism and creativity to our product photography that truly set our brand apart. We look forward to working with them again in the future!",
    name: "Michael",
    moreDetails: "MD, Stellar Designs",
    rating: 5,
  },
];

/** Reviews page — second column only (variant 2 on the page). */
export const REVIEWS_PAGE_SECOND_COLUMN: readonly ReviewTickerCard[] = [
  {
    variant: 2,
    avatarSrc:
      "https://framerusercontent.com/images/F8ur4MxzltB6kcNMHbY8uVKQbg.jpg?scale-down-to=1024",
    avatarAlt: "Portrait of Calliope",
    text: "Fennegan’s photography skills are unmatched! He captured our product launch event with such creativity and attention to detail. The photos were stunning, and we couldn't be happier. Highly recommend!",
    name: "Calliope",
    moreDetails: "Marketing Manager, Stellar Designs",
    rating: 5,
  },
  {
    variant: 2,
    avatarSrc:
      "https://framerusercontent.com/images/KuIBzI0VbhnNU4FBscAHrIRO2DQ.jpg?scale-down-to=1024",
    avatarAlt: "Portrait of Octavian",
    text: "Working with Fennegan was a fantastic experience. His ability to capture the essence of our travel adventures was truly impressive. The images are not just pictures; they’re memories we’ll cherish forever.",
    name: "Octavian",
    moreDetails: "Marketing Director",
    rating: 5,
  },
  {
    variant: 2,
    avatarSrc:
      "https://framerusercontent.com/images/Z4kmYBAi7pNNnGeW41ZiDk92B9c.jpg?scale-down-to=1024",
    avatarAlt: "Portrait of P. Seraphina",
    text: "Fennegan brought our brand to life with his incredible product shots. His professionalism and artistic vision made the entire process smooth and enjoyable. We look forward to working with him again!",
    name: "P. Seraphina",
    moreDetails: "CEO, Wanderlast Ventures",
    rating: 5,
  },
  {
    variant: 2,
    avatarSrc:
      "https://framerusercontent.com/images/FcgfqfA0SqTQarBmr06rDwvN54.jpg?scale-down-to=512",
    avatarAlt: "Portrait of M. Lysander",
    text: "Fennegan has a magical touch with his camera. He documented our event perfectly, capturing both the grand moments and the small, intimate details. His photos tell a beautiful story that we’ll treasure always.",
    name: "M. Lysander",
    moreDetails: "Marketing Manager, Stellar Designs",
    rating: 5,
  },
];

/** Reviews page — third column only (variant 2 on the page). */
export const REVIEWS_PAGE_THIRD_COLUMN: readonly ReviewTickerCard[] = [
  {
    variant: 2,
    avatarSrc:
      "https://framerusercontent.com/images/8HV18CpxFcbG11CdHQ8r0Ztsg.jpg?scale-down-to=1024",
    avatarAlt: "Portrait of Michael T.",
    text: "Fennegan is an absolute delight to work with. His patience and creativity shone through in every shot of our botanical collection. The photos are breathtaking and have helped elevate our brand's visual appeal.",
    name: "Michael T.",
    moreDetails: "Marketing Manager, Stellar Designs",
    rating: 5,
  },
  {
    variant: 2,
    avatarSrc:
      "https://framerusercontent.com/images/JX7OrmwnRJGl4xxKetHfPfGlM.jpg?scale-down-to=1024",
    avatarAlt: "Portrait of Isolde",
    text: "Fennegan’s talent is truly exceptional. He captured the serene beauty of our resort perfectly, making each photo feel like a dream. His work has significantly boosted our marketing efforts.",
    name: "Isolde",
    moreDetails: "Marketing Director",
    rating: 5,
  },
  {
    variant: 2,
    avatarSrc:
      "https://framerusercontent.com/images/44I6lVCGXuIxvmyUtUdxX1W5jDs.jpg?scale-down-to=512",
    avatarAlt: "Portrait of Zephyrin",
    text: "Fennegan’s photography truly showcases the beauty and adventure of our ocean charters. His stunning images have captivated our audience and helped us attract more clients. We couldn't be more pleased with his work.",
    name: "Zephyrin",
    moreDetails: "Enchanted Gardens",
    rating: 5,
  },
  {
    variant: 2,
    avatarSrc:
      "https://framerusercontent.com/images/BsYyDC468zaKcFPgn4YkwYXNrA.jpg?scale-down-to=1024",
    avatarAlt: "Portrait of Thaddeus",
    text: "It was a fantastic experience! They brought a level of professionalism and creativity to our product photography that truly set our brand apart. T. We look forward to working with them again in the future!",
    name: "Thaddeus",
    moreDetails: "Marketing Manager, Stellar Designs",
    rating: 5,
  },
];
