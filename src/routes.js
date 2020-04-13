import { Router } from 'express';

import authMiddleware from '../middlewares/auth';

import CadastroController from '../controllers/CadastroController';
import AgendamentoController from '../controllers/AgendamentoController';
import DisponivelController from '../controllers/DisponivelController';
import SessionController from '../controllers/SessionController';

const routes = new Router();



routes.get('/', (req, res)=>{
  
    return res.json({ ok:true});
});

routes.post('/cadastro', CadastroController.store);

routes.post('/login', SessionController.store );


routes.use(authMiddleware);

routes.post('/agendar', AgendamentoController.store);

routes.get('/agendamentos/:user_id', AgendamentoController.indexById);

routes.get('/agendamentos',AgendamentoController.index);

routes.post('/disponivel', DisponivelController.index );




export default routes;