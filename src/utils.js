/**
 * Fetch the theme preference of the user
 * @returns {string} - The theme preference as either "dark" or "light".
 */
export function getThemePreference() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return "dark";
    }
    return "light";
}