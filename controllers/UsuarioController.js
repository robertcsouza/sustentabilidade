import User from '../models/User';
import Agendamento from '../models/Agendamento';


class UsuarioController{

    async getUser(req,res){
        const user_id = req.user_id;
            
        const user = await User.findOne({_id:user_id});

        if(user){
            
            return res.json(user);

        }
        
        return res.json({
            error:"Nao foi possivel executar a ação"
        });

    }

    async create(req,res){

        const { nome , email, senha, nascimento} = req.body;
        const  filename  = req.file;

            let user = await User.findOne({email});


            if(!user){
                user = await User.create({
                    thumbnail: filename,
                    nome,
                    email,
                    senha,
                    nascimento,
                });

                

                //return res.json({ok:"usuario cadastrado com sucesso"});
                return res.json(user);

                
            }

            return res.status(401).json({error:"email ja existe"});
     
    }

    async update(req,res){

        const  user_id  = req.user_id;
        const { nome ,nascimento} = req.body;
        const  filename  = req.file;  
        var update = {filename,nome,nascimento}
        if(!filename){ delete update['filename']}
        if(!nome){ delete update['nome']}
        if(!nascimento){delete update['nascimento']}
        
        const  user = await User.findOneAndUpdate({_id:user_id},
           update
           ,{
                new:false
            });
 
        return res.json({ok:'atualizado com sucesso'})
    }


    async listarAgendamentos(req,res){
        const user_id = req.user_id;
            
        const user = await User.findOne({_id:user_id});

        if(user){

            
            const agendamentos = await Agendamento.find({usuario:user_id}).populate('barbeiro').populate('barbearia').populate('usuario');

            return res.json({agendamentos});

        }
        
        return res.json({
            error:"Nao foi possivel executar a ação"
        });

    }

    async finalizarAgendamento(req,res){
        const user_id = req.user_id;
        const { id } = req.params; 
        console.log(id)   
        const user = await User.findOne({_id:user_id});

        if(user){

            
            const agendamento = await Agendamento.findOneAndDelete({_id:id,usuario:user_id});

            return res.json({ok:true});

        }
        
        return res.json({
            error:"Nao foi possivel executar a ação"
        });

    }

}


export default new UsuarioController();