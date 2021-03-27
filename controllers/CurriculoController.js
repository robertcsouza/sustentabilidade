import jwt from 'jsonwebtoken';
import Curriculo from '../models/Curriculo';
import User from '../models/User';
import Formacao from '../models/Formacao';
import Experiencia from '../models/Experiencia';
import ConfigAuth from '../config/auth';

class CurriculoController{


   
   
    async create(req,res){

        
        const {nome,email,telefone,cidade,dataNascimento,atuacao,status} = req.body;
        const user_id = req.user_id;
            
            let payload = {"userId":user_id,nome,email,telefone,cidade,dataNascimento,atuacao,status}

            let curriculo = await Curriculo.findOne({"userId":user_id});
            console.log(curriculo);
            if(!curriculo){

                curriculo = await Curriculo.create(payload);
                
                return res.json(curriculo);

            }
          
            return res.json({
                error:"Você já tem um Curriculo cadastrado"
            })


    }


    async update(req,res){

        
        const {nome,email,telefone,cidade,dataNascimento,atuacao,status} = req.body;
        const user_id = req.user_id;
            
            let payload = {"userId":user_id,nome,email,telefone,cidade,dataNascimento,atuacao,status}

            let curriculo = await Curriculo.findOne({"userId":user_id});
            console.log(curriculo);
            if(curriculo){

                curriculo = await Curriculo.update(payload);
                
                return res.json(curriculo);

            }
          
            return res.json({
                error:"Você Não possui um Curriculo ativo"
            })


    }

    async delete(req,res){

        
      const {id} =  req.params; 
     
            let curriculo = await Curriculo.findByIdAndDelete({"_id":id});
                
                return res.json({ok:true});

           
    }



    async FormacaoCreate(req,res){

        
        const {titulo,instituto,dataConclusao} = req.body;
        const user_id = req.user_id;
            
            let payload = {titulo,instituto,dataConclusao,"userId":user_id}

            let user = await User.findOne({"_id":user_id});
            
            if(user){
                let formacao  = await Formacao.create(payload);
                
                return res.json({'ok':true});
            }
            
          
            return res.json({
                error:"Nao foi possivel salvar formação"
            })


    }


    async FormacaoDelete(req,res){

        
        const {id} =  req.params; 
       
              let formacao = await Formacao.findByIdAndDelete({"_id":id});
                  
                  return res.json({ok:true});
       
      }


      async ExperienciaCreate(req,res){

        
        const {empresa,periodo,cargo,descricao} = req.body;
        const user_id = req.user_id;
            
            let payload = {empresa,periodo,cargo,descricao,"userId":user_id}

            let user = await User.findOne({"_id":user_id});
            
            if(user){
                let exp = await Experiencia.create(payload);
                
                return res.json({'ok':true});
            }
            
          
            return res.json({
                error:"Nao foi possivel salvar formação"
            })


    }


    async ExperienciaDelete(req,res){

        
        const {id} =  req.params; 
       
              let formacao = await Experiencia.findByIdAndDelete({"_id":id});
                  
                  return res.json({ok:true});
       
      }



      async get(req,res){

        const userId = req.query.id;

        if(!userId){
            return res.json({error:'nao foi possivel encontar o curriculo'});
        }

        let curriculo = await  Curriculo.findOne({"userId":userId})
        let formacoes = await  Formacao.find({"userId":userId});
        let experiencia = await  Experiencia.find({"userId":userId});
        
        let payload = {curriculo,'formacoes':formacoes,'experiencias':experiencia}
        console.log(payload);

        return res.json(payload);
      }



    

    


}

export default new CurriculoController();