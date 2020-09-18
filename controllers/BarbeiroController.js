import Barbeiro from '../models/Barbeiro';
import Agendamento from '../models/Agendamento';
import User from '../models/User';


class BarbeiroController{

    //save admin on database
    async create(req,res){

        const { nome , email, senha, nascimento,barbearia} = req.body;
        const { filename } = req.file;

            let barbeiro = await Barbeiro.findOne({email});


            if(!barbeiro){
                barbeiro = await Barbeiro.create({
                    thumbnail: filename,
                    nome,
                    email,
                    senha,
                    nascimento,
                    barbearia
                });

                

                //return res.json({ok:"usuario cadastrado com sucesso"});
                return res.json(barbeiro);

                
            }

            return res.json({
                error:"email ja existe"
            })
     
    }

    async update(req,res){

        const  user_id  = req.user_id;
        const { nome ,nascimento,barbearia} = req.body;
        const  filename  = req.file;  
        var update = {filename,nome,nascimento}
        if(!filename){ delete update['filename']}
        if(!nome){ delete update['nome']}
        if(!nascimento){delete update['nascimento']}
        if(!barbearia){delete update['barbearia']}
        
        const  barbeiro = await Barbeiro.findOneAndUpdate({_id:user_id},
           update
           ,{
                new:false
            });
 
        return res.json({ok:'atualizado com sucesso'})
    }

    async listarAgendamentos(req,res){
        const user_id = req.user_id;
        const { data } = req.body;    
        const barbeiro = await Barbeiro.findOne({_id:user_id});

        if(barbeiro){

            
            const agendamentos = await Agendamento.find({data,barbeiro:barbeiro._id});

            return res.json({agendamentos});

        }
        
        return res.json({
            error:"Nao foi possivel executar a ação"
        });

    }

    async finalizarAgendamento(req,res){
        const user_id = req.user_id;
        const { agendamento_id } = req.body;    
        const barbeiro = await Barbeiro.findOne({_id:user_id});

        if(barbeiro){

            
            const agendamento = await Agendamento.findOneAndDelete({_id:agendamento_id,barbeiro:user_id});

            return res.json({ok:true});

        }
        
        return res.json({
            error:"Nao foi possivel executar a ação"
        });

    }

    async listarFuncionariosBarbearia(req,res){
        const user_id = req.user_id;
        const {barbearia} = req.body;    
        const user = await User.findOne({_id:user_id});

        if(user){

            
            const funcionarios = await Barbeiro.find({barbearia:barbearia});

            return res.json(funcionarios);

        }
        
        return res.json({
            error:"Nao foi possivel recuperar a informação"
        });

    }

    

}


export default new BarbeiroController();