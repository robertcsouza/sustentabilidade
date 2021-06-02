import { Schema, model } from 'mongoose';

//nome,local,atividades,dataInicio,dataTermino

const ConhecimentoSchema = new Schema ({
    nome:String,
    nivel:String,
    docAdicional:String,
    cursoAdicional:String,
    userId:String

});

export default model('Conhecimento',ConhecimentoSchema);