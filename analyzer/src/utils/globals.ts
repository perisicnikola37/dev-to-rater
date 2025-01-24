export const isValidDevToLink = (url: string): boolean => {
  try {
    const { origin } = new URL(url);
    return origin === "https://dev.to";
  } catch (error) {
    console.error("Invalid URL", error);
    return false;
  }
};
