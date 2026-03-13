import { useMutation } from '@tanstack/react-query'
import { conversationApi } from '../api'
import { useInvalidateConversations } from './useInvalidateConversations'
import { toast } from 'sonner'
import { useNavigate } from '@tanstack/react-router'

type UseDeleteConversationProps = {
  active_id?: string | null;
}

export const useDeleteConversation = ({ active_id }: UseDeleteConversationProps = {}) => {
  const invalidateConversations = useInvalidateConversations()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (id: string) => conversationApi.deleteConversation(id),
    onSuccess: (_, id) => {
      invalidateConversations()
      toast.success('Conversation deleted')

      if (active_id === id) {
        navigate({ to: '/conversations' })
      }
    },
    onError: (error) => {
      console.error('Failed to delete conversation:', error)
      toast.error('Failed to delete conversation')
    }
  })
}
