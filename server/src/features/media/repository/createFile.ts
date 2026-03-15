import { File, type FileDoc } from "../models/File";

export const createFile = async (data: Partial<FileDoc>) => {
    const doc = await File.create(data);
    return doc.toObject();
};
