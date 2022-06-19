import React, {useContext} from 'react'
import UserItem from './UserItem'
import GithubContext from '../../context/github/GithubContext'

const UserResults = () => {
    const {users, loading} = useContext(GithubContext)
    if(!loading){
        return (
            <div className='grid gap-8 md:grid-cols-2'>
                {users.map(user=><UserItem key={user.login} user={user} />)}
            </div>
        )
    }else{
        return <h3>Loading ...</h3>
    }
}

export default UserResults