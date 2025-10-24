export const wrapAsync = (fn) => {
  return async (...args) => {
    try {
      const data = await fn(...args);
      return { data, error: null };
    } catch (error) {
      console.error("Error in", fn.name || "anonymous", ":", error);

      return { data: null, error };
    }
  };
};
