import { Router } from "express";

export class ControllerBase {
    constructor(
        public endpoint: string,
        public router: Router = Router({
            strict: true,
            caseSensitive: true,
        }),
    ) { }
}
