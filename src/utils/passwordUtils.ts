
/**
 * Calculates the strength of a password from 0-100
 * @param password The password to check
 * @returns A number from 0-100 indicating password strength
 */
export const calculatePasswordStrength = (password: string): number => {
  if (password.length === 0) return 0;
  
  let score = 0;
  
  // Base score for length
  if (password.length >= 6) score += 1;
  if (password.length >= 8) score += 1;
  if (password.length >= 10) score += 1;
  
  // Score for complexity
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  
  // Check for common patterns
  if (!/123|abc|qwerty|password|senha/i.test(password)) score += 1;
  
  // Normalize score to percentage (0-100)
  return Math.min(100, Math.round((score / 8) * 100));
};

/**
 * Gets a text representation of password strength
 * @param strength The strength value (0-100)
 * @returns A string representing the strength level
 */
export const getStrengthText = (strength: number): string => {
  if (strength < 30) return "Fraca";
  if (strength < 70) return "Média";
  return "Forte";
};

/**
 * Gets the color class for a password strength indicator
 * @param strength The strength value (0-100)
 * @returns A Tailwind CSS class for the appropriate color
 */
export const getStrengthColor = (strength: number): string => {
  if (strength < 30) return "bg-red-500";
  if (strength < 70) return "bg-yellow-500";
  return "bg-green-500";
};
