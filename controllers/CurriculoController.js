import jwt from 'jsonwebtoken';
import Curriculo from '../models/Curriculo';
import User from '../models/User';
import Formacao from '../models/Formacao';
import Experiencia from '../models/Experiencia';
import Conhecimento from '../models/Conhecimento';
import ConfigAuth from '../config/auth';

class CurriculoController{


   
   
    async create(req,res){

        
        const {nome,email,telefone,cidade,dataNascimento,status,sexo,civil,nacionalidade,cep,logradouro,casa,bairro,estado,objetivo} = req.body;
        const user_id = req.user_id;
            
            let payload = {"userId":user_id,nome,email,telefone,cidade,dataNascimento,status,sexo,civil,nacionalidade,cep,logradouro,casa,bairro,estado,objetivo}

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

            //genero,estado civil, nacionalidade,cep,logradouro,nº casa,bairro,estado
        
        const {nome,email,telefone,cidade,dataNascimento,status,sexo,civil,nacionalidade,cep,logradouro,casa,bairro,estado} = req.body;
        const user_id = req.user_id;
            
            let payload = {"userId":user_id,nome,email,telefone,cidade,dataNascimento,status,sexo,civil,nacionalidade,cep,logradouro,casa,bairro,estado}

            let curriculo = await Curriculo.findOne({"userId":user_id});
            
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

        
        const {instituicao,curso,dataInicio,dataTermino,periodo,turno,status} = req.body;
        const user_id = req.user_id;
            
            let payload = {instituicao,curso,dataInicio,dataTermino,periodo,turno,status,"userId":user_id}

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
        const user_id = req.user_id;
       
              let formacao = await Formacao.findById({"_id":id});
              
              let user = await User.findOne({"_id":user_id});    
              
            
              if(user == null || formacao == null){
                return res.json({
                    error:"Nao foi possivel deletar a Formação"
                })  
            }
              

            if(user._id == formacao.userId){
                let result  = await Formacao.findByIdAndDelete({"_id":formacao._id});
                
                return res.json({'ok':true});
            }else{
                return res.json({
                    error:"Nao foi possivel deletar a Formação"
                })  
            }
       
      }


      async ExperienciaCreate(req,res){

        
        const {nome,local,atividades,dataInicio,dataTermino} = req.body;
        const user_id = req.user_id;
            
            let payload = {nome,local,atividades,dataInicio,dataTermino,"userId":user_id}

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
        const user_id = req.user_id;
       
        let user = await User.findOne({"_id":user_id});  
        let experiencia = await Experiencia.findByIdAndDelete({"_id":id});
                  
               
        if(user == null || experiencia == null){
            return res.json({
                error:"Nao foi possivel deletar a Formação"
            })  
        }
              
            
            if(user._id == experiencia.userId){
                let result  = await Experiencia.findByIdAndDelete({"_id":experiencia._id});
                
                return res.json({'ok':true});
            }else{
                return res.json({
                    error:"Nao foi possivel deletar a Formação"
                })  
            }
       
      }

      async ConhecimentoCreate(req,res){

        
        const {nome,nivel,docAdicional,cursoAdicional} = req.body;
        const user_id = req.user_id;
            
            let payload = {nome,nivel,docAdicional,cursoAdicional,"userId":user_id}

            let user = await User.findOne({"_id":user_id});
            
            if(user){
                let exp = await Conhecimento.create(payload);
                
                return res.json({'ok':true});
            }
            
          
            return res.json({
                error:"Nao foi possivel salvar formação"
            })


    }

    async ConhecimentoDelete(req,res){

        
        const {id} =  req.params; 
        const user_id = req.user_id;
       
        let user = await User.findOne({"_id":user_id});  
        let conhecimento = await Conhecimento.findByIdAndDelete({"_id":id});
                  
               
        if(user == null || conhecimento == null){
            return res.json({
                error:"Nao foi possivel deletar a Formação"
            })  
        }
              
            
            if(user._id == conhecimento.userId){
                let result  = await Conhecimento.findByIdAndDelete({"_id":conhecimento._id});
                
                return res.json({'ok':true});
            }else{
                return res.json({
                    error:"Nao foi possivel deletar a Formação"
                })  
            }
       
      }



      async get(req,res){

        const userId = req.query.id;

        if(!userId){
            return res.json({error:'nao foi possivel encontar o curriculo'});
        }

        let curriculo = await  Curriculo.findOne({"userId":userId})
        let formacoes = await  Formacao.find({"userId":userId});
        let experiencia = await  Experiencia.find({"userId":userId});
        let conhecimento = await  Conhecimento.find({"userId":userId});
        
        let payload = {curriculo,'formacoes':formacoes,'experiencias':experiencia,'conhecimento':conhecimento}
        

        return res.json(payload);
      }

      async getFormacao(req,res){

        const user_id = req.user_id;

        if(!user_id){
            return res.json({error:'nao foi possivel encontar o curriculo'});
        }

        
        let formacoes = await  Formacao.find({"userId":user_id});
        
        let payload = {'formacoes':formacoes}
        
        return res.json(payload);
      }

      async getExperiencia(req,res){

        const user_id = req.user_id;

        if(!user_id){
            return res.json({error:'nao foi possivel encontar o curriculo'});
        }

        
        let experiencia = await  Experiencia.find({"userId":user_id});
        
        
        let payload = {'experiencias':experiencia}
        

        return res.json(payload);
      }

      async getConhecimento(req,res){

        const user_id = req.user_id;
       
        if(!user_id){
            return res.json({error:'nao foi possivel realizar a operação'});
        }

        let conhecimento = await  Conhecimento.find({"userId":user_id});
        
        let payload = {'conhecimento':conhecimento}
        

        return res.json(payload);
      }


      

    

    


}

export default new CurriculoController();