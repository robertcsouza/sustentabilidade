import  { Schema, model } from 'mongoose';


const CurriculoSchema = new Schema({
        userId:String,    
        nome:String,
        email:String,
        telefone:String,
        linkedin:String,
        cidade:String,
        dataNascimento:String,
        atuacao:String,
        status:Boolean
        }  

);


export default model('Curriculo',CurriculoSchema);