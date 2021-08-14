export default interface MediaService {
    save: (originalName: string | undefined, location: string | undefined) => Promise<boolean>;
}

