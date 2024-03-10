import mongoose from 'mongoose';

const Upload = new mongoose.Schema({
    imageName: {
        type: String,
    },
    imageData: {
        type: Buffer,
        required: true
    }
});

const Image = mongoose.model('Upload', Upload);

export default Image