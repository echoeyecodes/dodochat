import { igdbTools } from './igdb';
import { systemTools } from './system';
import { mediaTools } from './media';

export const allTools = {
    ...igdbTools,
    ...systemTools,
    ...mediaTools,
};
