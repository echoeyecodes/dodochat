import { useContext } from 'react'
import { AuthUserContext } from '../components/AuthUserProvider'

export const useCurrentUser = () => {
    return useContext(AuthUserContext)
}
