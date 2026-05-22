const GEAR_AFFILIATE_LINK = "#";

export type GearIconKind = "camera" | "aperture" | "asterisk" | "laptop";

export type GearItem = {
  text: string;
  href: string;
};

export type GearCategory = {
  id: string;
  title: string;
  icon: GearIconKind;
  items: GearItem[];
};

export const ABOUT_GEAR_CATEGORIES: GearCategory[] = [
  {
    id: "cameras",
    title: "Cameras",
    icon: "camera",
    items: [
      { text: "Canon EOS R5", href: GEAR_AFFILIATE_LINK },
      { text: "Sony Alpha a7 III", href: GEAR_AFFILIATE_LINK },
      { text: "Fujifilm X-T4", href: GEAR_AFFILIATE_LINK },
    ],
  },
  {
    id: "lenses",
    title: "Lenses",
    icon: "aperture",
    items: [
      { text: "Canon RF 24-70mm f/2.8L IS USM", href: GEAR_AFFILIATE_LINK },
      { text: "Fujinon XF 16-55mm f/2.8 R LM WR", href: GEAR_AFFILIATE_LINK },
      { text: "Sigma 35mm f/1.4 DG HSM Art", href: GEAR_AFFILIATE_LINK },
      { text: "Sony FE 85mm f/1.4 GM", href: GEAR_AFFILIATE_LINK },
    ],
  },
  {
    id: "other-accessories",
    title: "Other Accessories",
    icon: "asterisk",
    items: [
      { text: "Godox AD200 Pro", href: GEAR_AFFILIATE_LINK },
      { text: "Profoto B10", href: GEAR_AFFILIATE_LINK },
      { text: "Neewer Ring Light Kit", href: GEAR_AFFILIATE_LINK },
      { text: "Manfrotto Befree Advanced Tripod", href: GEAR_AFFILIATE_LINK },
      { text: "DJI Ronin-S Gimbal", href: GEAR_AFFILIATE_LINK },
      { text: "Peak Design Everyday Backpack", href: GEAR_AFFILIATE_LINK },
      { text: "SanDisk Extreme Pro SD Cards", href: GEAR_AFFILIATE_LINK },
    ],
  },
  {
    id: "editing-tools",
    title: "Editing Tools",
    icon: "laptop",
    items: [
      { text: "Adobe Creative Cloud", href: GEAR_AFFILIATE_LINK },
      { text: "Wacom Intuos Pro Tablet", href: GEAR_AFFILIATE_LINK },
      { text: "Calibrite ColorChecker Display Pro", href: GEAR_AFFILIATE_LINK },
    ],
  },
];
