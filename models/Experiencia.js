import { Schema, model } from 'mongoose';

//nome,local,atividades,dataInicio,dataTermino

const ExperienciaSchema = new Schema ({
    nome:String,
    local:String,
    atividades:String,
    dataInicio:String,
    dataTermino:String,
    userId:String
});

export default model('Experiencia',ExperienciaSchema);