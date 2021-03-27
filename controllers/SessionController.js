import jwt from 'jsonwebtoken';
import User from '../models/User';
import ConfigAuth from '../config/auth';

class SessionController{


    async sessionUser(req,res){

        const {email, senha} = req.body;

        const user = await User.findOne({email,senha},'-senha -email');
        
        if(!user){
           
            return res.status(401).json({error:"falha ao fazer login"});
         
        }

        const {_id,nome} = user;
        
        return res.json({
            user,
            token: jwt.sign({_id},ConfigAuth.secret,{
                expiresIn:ConfigAuth.expiresIn
            })
        });


    }


    

    


}

export default new SessionController();