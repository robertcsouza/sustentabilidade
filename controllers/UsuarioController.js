import User from '../models/User';

import path from 'path';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import ConfigAuth from '../config/auth';

class UsuarioController{

 
    async create(req,res){

        const {nome , email, senha, nascimento} = req.body;
        
       
         
        let user = await User.findOne({email});


            if(!user){
                user = await User.create({
                    nome,
                    email,
                    senha, 
                    nascimento,
                });

                //return res.json({ok:"usuario cadastrado com sucesso"});
               
                

                const userCreate = await User.findOne({email,senha});
                
                if(!userCreate){
                   
                    return res.status(401).json({error:"falha ao fazer login"});
                 
                }
        
                const {_id} = userCreate;
                
                return res.json({
                    user:{
                        _id,
                        nome,
                        email
                    },
                    token: jwt.sign({_id},ConfigAuth.secret,{
                        expiresIn:ConfigAuth.expiresIn
                    })
                });
               
               
                //return res.json(user);

                
            }

            return res.status(401).json({error:"email ja existe"});
     
    }

    async update(req,res){

        const  user_id  = req.user_id;
        const { nome ,nascimento} = req.body;
        let filename;
        if(req.file){
            filename = req.file.filename;
        }
        var update = {'thumbnail':filename,nome,nascimento}
        if(!filename){ delete update['thumbnail']}
        if(!nome){ delete update['nome']}
        if(!nascimento){delete update['nascimento']}
        
         
        
        const  user = await User.findOneAndUpdate({_id:user_id},    
            update
           ,{
                new:false
            });

            
            try {
                const {thumbnail} =  user;
    
                var upload = path.resolve(__dirname,'..','uploads',)
                //console.log(`${upload}/modeloMan1-1603501256583.jpg`);   
                fs.unlinkSync(`${upload}/${thumbnail}`);      
                //path.resolve(__dirname,'..','uploads')
       
             } catch (error) {
                    console.log('nao foi possivel deletar a imagem');             
             }
        

 
        return res.json({ok:'atualizado com sucesso'})
    }

}


export default new UsuarioController();