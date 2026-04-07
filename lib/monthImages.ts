export interface MonthImage {
  src: string;
  alt: string;
  accentColor: string;
  photographer: string;
}

// Using reliable high-quality image placeholders that allow CORS and hotlinking
export const MONTH_IMAGES: MonthImage[] = [
  {
    src: "/1.jpg",
    alt: "January Wall Calendar Background",
    accentColor: "#683b2b",
    photographer: "Local",
  },
  {
    src: "/2.jpg",
    alt: "February Wall Calendar Background",
    accentColor: "#7a3f30",
    photographer: "Local",
  },
  {
    src: "/3.jpg",
    alt: "March Wall Calendar Background",
    accentColor: "#5a3525",
    photographer: "Local",
  },
  {
    src: "/4.jpg",
    alt: "April Wall Calendar Background",
    accentColor: "#683b2b",
    photographer: "Local",
  },
  {
    src: "/5.jpg",
    alt: "May Wall Calendar Background",
    accentColor: "#7c4535",
    photographer: "Local",
  },
  {
    src: "/6.jpg",
    alt: "June Wall Calendar Background",
    accentColor: "#603020",
    photographer: "Local",
  },
  {
    src: "/7.jpg",
    alt: "July Wall Calendar Background",
    accentColor: "#683b2b",
    photographer: "Local",
  },
  {
    src: "/8.jpg",
    alt: "August Wall Calendar Background",
    accentColor: "#7a3f30",
    photographer: "Local",
  },
  {
    src: "/9.jpg",
    alt: "September Wall Calendar Background",
    accentColor: "#683b2b",
    photographer: "Local",
  },
  {
    src: "/10.jpg",
    alt: "October Wall Calendar Background",
    accentColor: "#7a3a28",
    photographer: "Local",
  },
  {
    src: "/11.jpg",
    alt: "November Wall Calendar Background",
    accentColor: "#5a3020",
    photographer: "Local",
  },
  {
    src: "/12.jpg",
    alt: "December Wall Calendar Background",
    accentColor: "#683b2b",
    photographer: "Local",
  },
];

export const MONTH_NAMES = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December",
];
