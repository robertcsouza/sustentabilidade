import { Schema, model } from 'mongoose';


const FormacaoSchema = new Schema ({
    titulo:String,
    instituto:String,
    dataConclusao:String,
    userId:String
});

export default model('Formacao',FormacaoSchema);