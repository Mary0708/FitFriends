export const SALT_ROUNDS = 10;

export const UserMessages = {
    ALREADY_EXISTS: 'User with this email already exists',
    AUTHORIZED: 'User authorized',
    UNAUTHORIZED: 'User is not authorized',
    INVALID_TOKEN: 'Token is invalid or not found',
    USER_NOT_FOUND: 'User(s) not found',
    WRONG_PASSWORD: 'User password is wrong',
    WRONG_LOGIN: 'User login is wrong.',
    CREATE: 'Creates a new user.',
    LOGIN: "User's login procedure",
    LOGOUT: "User's logout procedure",
    UPDATE: "Updates the user's profile data",
    FRIEND: 'Add/remove friend',
  } as const;

export enum UserValidation {
    NameMinLength = 1,
    NameMaxLength = 15,
    PasswordMinLength = 6,
    PasswordMaxLength = 12,
}

export const UserQuery = {
    USER_QUERY_MAX: 50,
    USER_QUERY_MIN: 1,
    USER_DEFAULT_PAGE: 1,
    USER_DEFAULT_SORT_DIRECTION: 'desc',
} as const;

export enum UserSort {
    Date = 'date',
}

export const UserSortField = {
    [UserSort.Date]: 'createdAt',
};