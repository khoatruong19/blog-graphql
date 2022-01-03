import { useQuery } from '@apollo/client'
import { getPosts } from '../graphql-client/queries'
import React from 'react'
import Post from './Post'
import {fetchUser} from "../graphql-client/fetchUser"
const Feed = () => {
    const {loading, error, data} = useQuery(getPosts)
    if(loading) return "Loading.."
    if(error) console.log(error)
    const user = fetchUser()
    console.log(user)
    return (
        <div className='flex flex-col items-center gap-10 md:gap-15 p-5 '>
            {data?.posts.map(post => (
                <Post key={post.id} id={post.id} title={post.title} user={user && user} content={post.content} author={post.author} />
            ))}
        </div>
    )
}

export default Feed
