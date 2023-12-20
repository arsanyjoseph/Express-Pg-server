import { Express } from 'express';

export class App {
    constructor(private readonly app: Express) { }

    public listen() {
        this.app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}`))
    }
}