import { Schema, model } from 'mongoose';


const ExperienciaSchema = new Schema ({
    empresa:String,
    periodo:String,
    descricao:String,
    cargo:String,
    userId:String
});

export default model('Experiencia',ExperienciaSchema);