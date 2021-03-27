import { Schema, model } from 'mongoose';


const UserSchema = new Schema ({
    thumbnail:String,
    id: String,
    nome: String,
    email: String,
    senha:String,
    nascimento: String,
    ultimo_agendamento:String,
    
},{
    toJSON:{
        virtuals:true
    }
});


UserSchema.virtual('thumbnail_url').get(function(){
    return `http://localhost:3333/file/${this.thumbnail}`;
});



export default model('User',UserSchema);