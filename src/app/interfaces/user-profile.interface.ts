export interface User {
    id: string;
    Username: string;
    PasswordHash: string;
    UserToken: string;
    UserRefreshToken: string;
    // Add other user properties as needed
}