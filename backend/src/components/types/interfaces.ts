export interface ICandidate {
    email: string;
    password: string;
}

export interface IAuthRequest extends Request {
    user: ICandidate;
}