import User from '../models/User';
import Agendamento from '../models/Agendamento';

class AgendamentoController {

   // data tipo horario user_id

    async index(req,res){

        let agendamentos = await Agendamento.find();
        return res.json({agendamentos});

    }

    async indexById(req,res){
        const { user_id } = req.params;
        let agendamentos = await Agendamento.find({user_id});

        return res.json({agendamentos});
 
    }

    async store(req,res){

        const { data , tipo, horario, user_id }  = req.body;
        
        const documents = await Agendamento.find({data,tipo,horario,user_id});

        if(documents.length < 20){
        let agendar = await Agendamento.create({data,tipo,horario,user_id});
            
            return res.json({agendar});
        }
        
        return res.json({"error":"agendamento nao disponivel"});
        
    }
}

export default new  AgendamentoController();