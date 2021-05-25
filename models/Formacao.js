import { Schema, model } from 'mongoose';

//instituicao,curso,dataInicio,dataTermino,periodo,turno,status
const FormacaoSchema = new Schema ({
    instiuicao:String,
    curso:String,
    dataInicio:String,
    dataTermino:String,
    periodo:String,
    turno:String,
    status:String,
    userId:String
});

export default model('Formacao',FormacaoSchema);