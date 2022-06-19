import {createContext, useReducer} from 'react'
import githubReducer from './GithubReducer'

const GithubContext = createContext()

const GITHUB_URL = 'https://api.github.com'
const GITHUB_TOKEN = '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'

export const GithubProvider = ({children}) => {
    const initialState = {
        users:[],
        loading:false,
    }
    const [state, dispatch] = useReducer(githubReducer, initialState)

    const searchUsers = async (text) => {
        dispatch({
            type:'SET_LOADING'
        })
        const params = new URLSearchParams({
            q:text
        })
        const response = await fetch(`https://api.github.com/search/users?${params}`, {
            headers:{
                Authorization: `token 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`
            }
        })

        const {items} = await response.json()
        dispatch({
            type:"GET_USERS",
            payload:items,
        })
    }

    return <GithubContext.Provider value={{
        users:state.users,
        loading:state.loading,
        searchUsers
    }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext