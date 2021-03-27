import express from 'express';
import serverSocket from 'socket.io';
import path from 'path';
import mongoose from 'mongoose';
import routes from './routes';
import cors from 'cors';

class App{

    constructor(){
        this.server = express();
        this.server.use(cors());
        //mudar para o padrao ecs6
        this.app = require('http').createServer(this.server)
        this.serverIO = serverSocket(this.app);

        this.serverIO.on('connection',()=>{
            console.log('conectado');
        });
        mongoose.connect('mongodb://localhost:27017/cdb',{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });


        this.middlewares();
        this.routes();

    }

    middlewares(){

        this.server.use(
            '/file',
            express.static(path.resolve(__dirname,'..','uploads'))
        );

        this.server.use(express.json());
    }

    routes(){

        this.server.use(routes);

    }

}


export default new App();