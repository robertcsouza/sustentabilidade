import  { Schema, model } from 'mongoose';

//genero,civil,nacionalidade,cep,logradouro,casa,bairro,estado

const CurriculoSchema = new Schema({
        userId:String,    
        nome:String,
        email:String,
        telefone:String,
        cidade:String,
        dataNascimento:String,
        sexo:String,
        civil:String,
        nacionalidade:String,
        cep:String,
        logradouro:String,
        casa:String,
        bairro:String,
        estado:String,
        status:Boolean
        }  

);


export default model('Curriculo',CurriculoSchema);