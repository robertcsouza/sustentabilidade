import Barbearia from '../models/Barbearia';
import Admin from '../models/Admin';


class BarbeariaController{

    //save admin on database
    async create(req,res){

        const  user_id  = req.user_id;
        const { nome ,estado,cidade,bairro,rua,numero} = req.body;
        const { filename } = req.file;

            let barbearia = await Barbearia.findOne({admin:user_id});
               

            if(!barbearia){
                barbearia = await Barbearia.create({
                    thumbnail: filename,
                    nome,
                    estado,
                    cidade,
                    bairro,
                    rua,
                    numero,
                    admin:user_id
                });

                const  admin = await Admin.findOneAndUpdate({_id:user_id},
                 {barbearia:barbearia._id}
                   ,{
                     new:false
                    });
              

              

                
                //return res.json({ok:"usuario cadastrado com sucesso"});
                return res.json(barbearia);

                
            }

            return res.json({
                error:"Barbearia ja existente"
            })
     
    }

    async update(req,res){

        const  user_id  = req.user_id;
        const { nome ,estado,cidade,bairro,rua,numero} = req.body;
        const  filename  = req.file;  


        let barbearia = await Barbearia.findOne({admin:user_id});

        if(!barbearia){
            return res.json('nao foi encontrado o estabelecimento');
        }

        var update = {filename,nome,estado,cidade,bairro,rua,numero}
        if(!filename){ delete update['filename']}
        if(!nome){ delete update['nome']}
        if(!estado){ delete update['estado']}
        if(!cidade){ delete update['estado']}
        if(!bairro){ delete update['bairro']}
        if(!rua){ delete update['rua']}
        if(!numero){ delete update['numero']}
        
        
          barbearia = await Barbearia.findOneAndUpdate({admin:user_id},
           update
           ,{
                new:false
            });
 
        return res.json({ok:'atualizado com sucesso'})
    }


    async configBarbearia(req,res){

        const  user_id  = req.user_id;
        const {dia,horario} = req.body;
         


        let barbearia = await Barbearia.findOne({admin:user_id});

        if(!barbearia){
            return res.json('nao foi encontrado o estabelecimento');
        }

        var update = {dia,horario}
        if(!dia){ delete update['dia']}
        if(!horario){ delete update['horaio']}
        
        
        
          barbearia = await Barbearia.findOneAndUpdate({admin:user_id},
           update
           ,{
                new:false
            });
 
        return res.json({ok:'atualizado com sucesso'})
    }

    async ListaCidadeEstado(req,res){

        const  user_id  = req.user_id;
        const {nome,estado,cidade} = req.body;
        var query = {nome,estado,cidade}
        
        if(!nome){ delete query['nome']}
        if(!estado){ delete query['estado']}
        if(!cidade){ delete query['cidade']}

       
        let barbearia = await Barbearia.find(query);
        
        if(!barbearia){
            return res.json('nao foi encontrado nenhum estabelecimento');
        }   
            
        return res.json(barbearia)
    }

    

}


export default new BarbeariaController();