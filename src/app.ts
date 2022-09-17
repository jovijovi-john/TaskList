import express from 'express';
import routes from './routes';

import cors from "cors";

class App {

    server: any;

    constructor() {
        this.server = express();
        this.server.listen(4000, () => {
            console.log("Server na porta http://localhost:4000")
        });

        this.middlewares();
        this.routes();

    }

    middlewares() {
        this.server.use(cors())
        this.server.use(express.json());
    }

    routes() {
        this.server.use(routes);
    }
}

export default new App().server;
