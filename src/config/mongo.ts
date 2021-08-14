import mongoose, {Schema} from 'mongoose';

const User = new Schema({
    name: String,
    media: {
        fileName: String,
        fileUrl: String,
    }
});

export const UserModel = mongoose.model('User', User);

