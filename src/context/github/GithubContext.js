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

    const fetchUsers = async () => {
        dispatch({
            type:'SET_LOADING'
        })
        const response = await fetch(`${GITHUB_URL}/users`, {
            headers:{
                Authorization: `token ${GITHUB_TOKEN}`
            }
        })

        const data = await response.json()
        dispatch({
            type:"GET_USERS",
            payload:data,
        })
    }

    return <GithubContext.Provider value={{
        users:state.users,
        loading:state.loading,
        fetchUsers
    }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext