import jwt from 'jsonwebtoken';
import User from '../models/User';
import Admin from '../models/Admin';
import Barbeiro from '../models/Barbeiro';
import ConfigAuth from '../config/auth';

class SessionController{

    async sessionAdmin(req,res){

        const {email, senha} = req.body;

        const admin = await Admin.findOne({email,senha});
        
        if(!admin){
           
            return res.status(401).json({error:"falha ao fazer login"});
         
        }

        const {_id,nome} = admin;
        
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


    }

    async sessionBarbeiro(req,res){

        const {email, senha} = req.body;

        const barbeiro = await Barbeiro.findOne({email,senha});
        
        if(!barbeiro){
           
            return res.status(401).json({error:"falha ao fazer login"});
         
        }

        const {_id,nome} = barbeiro;
        
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


    }

    async sessionUser(req,res){

        const {email, senha} = req.body;

        const user = await User.findOne({email,senha});
        
        if(!user){
           
            return res.status(401).json({error:"falha ao fazer login"});
         
        }

        const {_id,nome} = user;
        
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


    }


    

    


}

export default new SessionController();