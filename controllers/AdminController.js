import Admin from '../models/Admin';
import Barbeiro from '../models/Barbeiro';
import Agendamento from '../models/Agendamento';


class AdminController{

    //save admin on database
    async create(req,res){

        const { nome , email, senha, nascimento} = req.body;
        const { filename } = req.file;

            let admin = await Admin.findOne({email});


            if(!admin){
                admin = await Admin.create({
                    thumbnail: filename,
                    nome,
                    email,
                    senha,
                    nascimento,
                });

                

                //return res.json({ok:"usuario cadastrado com sucesso"});
                return res.json(admin);

                
            }

            return res.json({
                error:"email ja existe"
            })
     
    }

    async update(req,res){

        const  user_id  = req.user_id;
        const { nome ,nascimento} = req.body;
        const  filename  = req.file;  
        var update = {filename,nome,nascimento}
        if(!filename){ delete update['filename']}
        if(!nome){ delete update['nome']}
        if(!nascimento){delete update['nascimento']}
        
        const  admin = await Admin.findOneAndUpdate({_id:user_id},
           update
           ,{
                new:false
            });
 
        return res.json({ok:'atualizado com sucesso'})
    }

   
    async listarFuncionarios(req,res){
        const user_id = req.user_id;
            
        const admin = await Admin.findOne({_id:user_id});

        if(admin){

            
            const funcionarios = await Barbeiro.find({barbearia:admin.barbearia});

            return res.json(funcionarios);

        }
        
        return res.json({
            error:"Nao foi possivel recuperar a informação"
        });

    }

    async removerFuncionario(req,res){
        const user_id = req.user_id;
        const { funcionario_id } = req.body;    
        const admin = await Admin.findOne({_id:user_id});

        if(admin){

            
            const funcionario = await Barbeiro.findOneAndDelete({_id:funcionario_id});

            return res.json({ok:true});

        }
        
        return res.json({
            error:"Nao foi possivel executar a ação"
        });

    }

    async listarAgendamentos(req,res){
        const user_id = req.user_id;
        const { data } = req.body;    
        const admin = await Admin.findOne({_id:user_id});

        if(admin){

            
            const agendamentos = await Agendamento.find({data,barbearia:admin.barbearia});

            return res.json({agendamentos});

        }
        
        return res.json({
            error:"Nao foi possivel executar a ação"
        });

    }




    

}


export default new AdminController();