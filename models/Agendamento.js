import mongoose, { Schema, model } from 'mongoose';

const AgendamentoSchema = new Schema({

        data:String,
        tipo:String,
        horario:String,
        user_id:String,    

});


export default model('Agendamento',AgendamentoSchema);