import { Schema, model } from 'mongoose';

const BarbeariaSchema = new Schema ({
    thumbnail:String,
    nome: String,
    rating:Number,
    estado:String,
    cidade:String,
    bairro:String,
    rua:String,
    numero:String,
    admin: { type: Schema.Types.ObjectId, ref: 'Admin' },
    dia:[],
    horario:[]

},{
    toJSON:{
        virtuals:true
    }
});


BarbeariaSchema.virtual('thumbnail_url').get(function(){
    return `http://localhost:3333/file/${this.thumbnail}`;
});



export default model('Barbearia',BarbeariaSchema);