import express, { Router, Application } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import http from 'http';
import helmet from 'helmet';
import responseTime from 'response-time';


export class Server {
    constructor(private routes: Router, private port: number = 3000) {
        this.startServer();
    }

    private startServer() {
        const app = this.expressApp(this.routes);
        http.createServer(app).listen(this.port, () => {
            console.log(`The Server is Up and Running in Port: ${this.port}`);
        });
    };

    /**
     * Take the routes and return Express Application
     * @param {Router} routes
     * @returns express App
     */
    private expressApp = (routes: Router): Application => {
        const app: Application = express();
        app.use(helmet());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(express.static('public'));
        app.use(cookieParser());
        app.use(responseTime());
        app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        app.use('/', routes);
        return app;
    } 
}

export default Server;