const { Schema, model } = require('mongoose');

const ScreenTaskSchema = Schema({
    titulo: {
        type: String,
        required: [true, 'Titulo is required']
    },
    descripcion: {
        type: String,
        required: [true, 'Descripcion is required']
    },
    screen: {
        type: String,
        required: [true, 'Campo is required']
    },
    prioridad: {
        type: Boolean, 
        required: [true, 'Prioridad is required']
    } 
});

ScreenTaskSchema.toJSON=function(){
    const { __v, _id, ...task } = this.toObject();
    screen.uid= _id;

    return screen;
}

module.exports = model('Screen',ScreenTaskSchema);