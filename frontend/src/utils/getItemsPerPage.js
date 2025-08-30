// utils/getItemsPerPage.js

export const getItemsPerPage = () => {
  if (typeof window === "undefined") return 6;

  const width = window.innerWidth;

  if (width < 640) return 4; // Very small screens
  if (width < 768) return 6; // Small screens
  if (width < 2000) return 8; // Medium screens
  return 12; // Very large screens
};
