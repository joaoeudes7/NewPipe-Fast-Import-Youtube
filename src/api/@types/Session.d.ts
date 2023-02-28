declare module 'express-session' {
    interface SessionData {
        download: string;
        redirect: string;
    }
}

export {};