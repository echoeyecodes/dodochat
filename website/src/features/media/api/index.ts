import { request } from '../../../lib/request';
import type { FileResponse } from '../types/index';

const uploadFile = async (file: File, conversation_id: string): Promise<FileResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('conversation_id', conversation_id);

    const { data } = await request({
        path: '/api/media/upload',
        method: 'POST',
        body: formData,
    });
    return data.data;
};

const getFiles = async (conversation_id: string): Promise<FileResponse[]> => {
    const { data } = await request({
        path: `/api/media/${conversation_id}`,
        method: 'GET',
    });
    return data.data;
};


const mediaApi = {
    uploadFile,
    getFiles,
};

export default mediaApi