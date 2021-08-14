import { UserModel } from "../config/mongo";
import MediaService from "./media-service";

export class MediaServiceImpl implements MediaService {
    async save (originalName: string | undefined, location: string | undefined) { 
        if(originalName && location)
            return UserModel.create({name: Date().toString(), media: {
                fileName: originalName,
                fileUrl: location
            }}).then(() => true)
            .catch(() => false);
        else return false
    };
    
}