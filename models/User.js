import { Schema, model } from 'mongoose';


const UserSchema = new Schema ({
    id: String,
    nome: String,
    email: String,
    senha:String,
    nascimento: String,
    ultimo_agendamento:String,
})



export default model('User',UserSchema);