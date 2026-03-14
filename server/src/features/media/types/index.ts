import type { FileDoc } from '../models/File';
import { withCDN } from '../../common/helpers';

export type FileResponse = {
    id: string;
    name: string;
    type: string;
    size: number;
    url: string;
    metadata?: Record<string, string | number>;
    created_at: Date;
};

export const mapFileToResponse = (file: FileDoc): FileResponse => ({
    id: file._id.toString(),
    name: file.name,
    type: file.type,
    size: file.size,
    url: file.path.replace(/\\/g, '/'),
    metadata: file.metadata,
    created_at: file.created_at,
});
