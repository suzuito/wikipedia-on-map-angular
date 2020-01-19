export interface API {
    origin: string;
}

export interface Env {
    production: boolean;
    googleMapAPIKey: string;
    api: API;
}
