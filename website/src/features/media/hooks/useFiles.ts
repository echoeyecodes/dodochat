import { useQuery } from '@tanstack/react-query';
import mediaApi from '../api/index';

export const useFiles = ({ conversation_id, enabled }: { conversation_id?: string, enabled?: boolean }) => {
    return useQuery({
        queryKey: ['files', conversation_id],
        queryFn: () => mediaApi.getFiles(conversation_id!),
        enabled
    });
};
