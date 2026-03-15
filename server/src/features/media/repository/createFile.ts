import { File, type FileDoc } from "../models/File";

export const createFile = async (data: Partial<FileDoc>): Promise<FileDoc> => {
    return await File.create(data);
};
