import { File, type FileDoc } from "../models/File";

export const getFileById = async (id: string): Promise<FileDoc | null> => {
    return await File.findById(id);
};
