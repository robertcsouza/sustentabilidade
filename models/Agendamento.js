import  { Schema, model } from 'mongoose';


const AgendamentoSchema = new Schema({

        data:String,
        hora:String,
        nome:String,
        barbeiro:{ type: Schema.Types.ObjectId, ref: 'Barbeiro' },    
        barbearia:{ type: Schema.Types.ObjectId, ref: 'Barbearia' },
        usuario:{ type: Schema.Types.ObjectId, ref: 'User' },
        status:Boolean
        }  

);


export default model('Agendamento',AgendamentoSchema);