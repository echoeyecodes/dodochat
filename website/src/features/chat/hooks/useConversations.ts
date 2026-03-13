import { useQuery } from '@tanstack/react-query'
import { conversationApi } from '../api'
import { conversationKeys } from '../constants/query-keys'

export const useConversations = () => {
  return useQuery({
    queryKey: conversationKeys.all,
    queryFn: conversationApi.fetchConversations,
  })
}
