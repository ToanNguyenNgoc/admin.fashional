export interface BodyForgot {
    email?: string;
    recaptcha: string;
    platform: string;
    password?: string;
    token?:string;
}