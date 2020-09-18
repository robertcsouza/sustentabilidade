import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import authMiddleware from '../middlewares/auth';
import AdminController from '../controllers/AdminController';
import BarbeariaController from '../controllers/BarbeariaController';


import SessionController from '../controllers/SessionController';
import BarbeiroController from '../controllers/BarbeiroController';
import UsuarioController from '../controllers/UsuarioController';
import AgendamentoController from '../controllers/AgendamentoController';


const routes = new Router();

const upload = multer(uploadConfig);

routes.get('/', (req, res)=>{
  
    return res.json({ ok:true});
});

// admin routes -----------------------------------------------------------------------
routes.post('/admin/cadastro', upload.single('thumbnail') ,AdminController.create);
routes.post('/admin/login', SessionController.sessionAdmin );
routes.put('/admin/update',authMiddleware, upload.single('thumbnail') ,AdminController.update);
routes.get('/admin/funcionarios',authMiddleware,AdminController.listarFuncionarios);
routes.delete('/admin/funcionarios',authMiddleware,AdminController.removerFuncionario);
routes.post('/admin/agendamento',authMiddleware,AdminController.listarAgendamentos);

//-------------------------------------------------------------------------------------------

//Barbearias --------------------------------------------------------------------------
routes.post('/admin/barbearia/',authMiddleware, upload.single('thumbnail') ,BarbeariaController.create);
routes.put('/admin/barbearia/',authMiddleware, upload.single('thumbnail') ,BarbeariaController.update);
routes.post('/admin/barbearia/config',authMiddleware, upload.single('thumbnail') ,BarbeariaController.configBarbearia);
routes.post('/barbearia/listar',authMiddleware,BarbeariaController.ListaCidadeEstado);


//--------------------------------------------------------------------------------------------------

//Barbeiro ----------------------------------------------------------------------------
routes.post('/admin/barbeiro/', upload.single('thumbnail') ,BarbeiroController.create);
routes.post('/admin/barbeiro/login', SessionController.sessionBarbeiro );
routes.put('/admin/barbeiro/',authMiddleware, upload.single('thumbnail') ,BarbeiroController.update);
routes.post('/admin/barbeiro/agendamento',authMiddleware,BarbeiroController.listarAgendamentos);
routes.delete('/admin/barbeiro/agendamento',authMiddleware,BarbeiroController.finalizarAgendamento);
routes.post('/admin/barbeiro/listar',authMiddleware,BarbeiroController.listarFuncionariosBarbearia);
//------------------------------------------------------------------------------------

// users -------------------------------------------------------------------------------
routes.post('/cadastro', upload.single('thumbnail') ,UsuarioController.create);
routes.post('/login', SessionController.sessionUser );
routes.put('/update',authMiddleware, upload.single('thumbnail') ,UsuarioController.update);
routes.get('/agendamento',authMiddleware,UsuarioController.listarAgendamentos);
routes.delete('/agendamento/:id',authMiddleware,UsuarioController.finalizarAgendamento);
routes.get('/user',authMiddleware,UsuarioController.getUser);

//--------------------------------------------------------------------------------------
 
 routes.post('/admin/agendamento/create',authMiddleware,AgendamentoController.createAdm);
 routes.post('/agendamento',authMiddleware,AgendamentoController.createUser);
 routes.post('/listadisponivel',authMiddleware,AgendamentoController.listaDisponivel);

// Agendamento ---------------------------------------------------------------------------



//----------------------------------------------------------------------------------------


//routes.use(authMiddleware);

//routes.put('/usuario',upload.single('thumbnail'),UsuarioController.update );






export default routes;