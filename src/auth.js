export function isAuthenticated() {
    // Implement your authentication logic here
    return !!localStorage.getItem('access_token'); // Example check
}