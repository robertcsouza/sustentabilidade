import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';
import authMiddleware from '../middlewares/auth';
import SessionController from '../controllers/SessionController';
import UsuarioController from '../controllers/UsuarioController';
import CurriculoController from '../controllers/CurriculoController';



const routes = new Router();

const upload = multer(uploadConfig);

routes.get('/', (req, res)=>{
  
    return res.json({ ok:true});
});



// users -------------------------------------------------------------------------------
routes.post('/cadastro',UsuarioController.create);
routes.post('/login', SessionController.sessionUser );
routes.put('/update',authMiddleware, upload.single('thumbnail') ,UsuarioController.update);

// Curriculo -------------------------------------------------------------------------------
routes.get('/curriculo',CurriculoController.get);
routes.post('/curriculo/create',authMiddleware,CurriculoController.create);
routes.put('/curriculo/update',authMiddleware,CurriculoController.update);
routes.delete('/curriculo/delete/:id',authMiddleware,CurriculoController.delete);

// Formacao -------------------------------------------------------------------------------
routes.post('/curriculo/formacao/create',authMiddleware,CurriculoController.FormacaoCreate);
routes.delete('/curriculo/formacao/delete/:id',authMiddleware,CurriculoController.FormacaoDelete);

// Formacao -------------------------------------------------------------------------------
routes.post('/curriculo/experiencia/create',authMiddleware,CurriculoController.ExperienciaCreate);
routes.delete('/curriculo/experiencia/delete/:id',authMiddleware,CurriculoController.ExperienciaDelete);


//----------------------------------------------------------------------------------------


//routes.use(authMiddleware);

//routes.put('/usuario',upload.single('thumbnail'),UsuarioController.update );






export default routes;