export interface UserLogin {
    email:string,
    password:string
}
export interface UserSignup {
    email:string,
    password:string,
    name:string
}

export interface AuthResponse {
    accessToken:string,
    user: AuthUser
}

export interface AuthUser {
    id:number,
    email:string,
    name:string
}

