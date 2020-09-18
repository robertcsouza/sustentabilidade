import { Schema, model } from 'mongoose';


const AdminSchema = new Schema ({
    thumbnail:String,
    nome: String,
    email: String,
    senha:String,
    nascimento: String,
    barbearia:{ type: Schema.Types.ObjectId, ref: 'Barbearia' }
    
    
},{
    toJSON:{
        virtuals:true
    }
});


AdminSchema.virtual('thumbnail_url').get(function(){
    return `http://localhost:3333/file/${this.thumbnail}`;
});



export default model('Admin',AdminSchema);