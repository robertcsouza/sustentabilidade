import Agendamento from '../models/Agendamento';
import Barbearia from '../models/Barbearia';


class AgendamentoController{

    //save admin on database
    async createAdm(req,res){

        const { nome , data, hora, barbeiro, barbearia} = req.body;
        const  filename  = req.file;

            let agendamento = await Agendamento.findOne({data,hora,barbeiro,barbearia});

            var filtred = {nome , data, hora, barbeiro, barbearia,status:true}
            if(!filename){ delete filtred['filename']}
            if(!nome){ delete filtred['nome']}
            if(!data){delete filtred['data']}
            if(!hora){delete filtred['hora']}
            if(!barbeiro){delete filtred['barbeiro']}
            if(!barbearia){delete filtred['barbearia']}

            console.log(filtred)

            if(!agendamento){
                agendamento = await Agendamento.create( filtred );

                

                //return res.json({ok:"usuario cadastrado com sucesso"});
                return res.json(agendamento);

                
            }

            return res.json({
                error:"horario indisponivel"
            })
     
    }

    async createUser(req,res){

        const { data, hora, barbeiro, barbearia} = req.body;
        const  filename  = req.file;
        const user_id = req.user_id;

            let agendamento = await Agendamento.findOne({data,hora,barbeiro,barbearia});

            var filtred = {usuario:user_id,data, hora, barbeiro, barbearia,status:true}
            if(!filename){ delete filtred['filename']}
            if(!data){delete filtred['data']}
            if(!hora){delete filtred['hora']}
            if(!barbeiro){delete filtred['barbeiro']}
            if(!barbearia){delete filtred['barbearia']}

            console.log(filtred)

            if(!agendamento){
                
                agendamento = await Agendamento.create( filtred );

                

                //return res.json({ok:"usuario cadastrado com sucesso"});
                return res.json(agendamento);

                
            }

            return res.json({
                error:"horario indisponivel"
            })
     
    }

    async listaDisponivel(req,res){

        //verificar dia da semana se e compativel com o horario de trabalho do estabelecimento

        const { data, barbearia,barbeiro} = req.body;
           
        // verificar se a data atual e igual ou superior a do requerimento    
        if(true){

            const agendamentos = await Agendamento.find({data,barbearia,barbeiro});
        let agendamentoHora = [];   
        const barbeariaConfig = await Barbearia.findOne({_id:barbearia});
        
         const{dia,horario} = barbeariaConfig;
            
         if(!(agendamentos.length > 0)){
            // retornar lista toda disponivel
            return res.json(horario);    

        }

       
           
            agendamentos.forEach(element => {
                agendamentoHora.push(element['hora']);
            });

            horario.forEach(element => {
                    
                agendamentoHora.forEach(hora => {
                    if(element[hora]){
                        element[hora] = false;
                    }
                });
            });

            
        return res.json(horario);


        }

        return res.json({error:'data anterior a atual'});
        
    }
   

}


export default new AgendamentoController();