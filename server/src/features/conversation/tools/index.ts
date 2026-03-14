import { igdbTools } from './igdb';
import { systemTools } from './system';
import { mediaTools } from './media';
import { fileTools } from './files';

export const allTools = {
    ...igdbTools,
    ...systemTools,
    ...mediaTools,
    ...fileTools,
};
