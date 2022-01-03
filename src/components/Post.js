import React, { useEffect, useState } from 'react'
import { Card } from 'antd'
import {DeleteOutlined, LikeOutlined ,LikeFilled } from "@ant-design/icons"
import { useMutation, useQuery } from '@apollo/client'
import {deleteSinglePost, handleLikeUnlike} from "../graphql-client/mutations"
import { getPosts, getLikes, checkLiked } from '../graphql-client/queries'
import { Link } from 'react-router-dom'
const Post = ({title, content, author,user,id}) => {
    const [deletePost, dataMutation] = useMutation(deleteSinglePost)
    const [liked, setLiked] = useState(null)
    const [handelLike] = useMutation(handleLikeUnlike)
    const isCurrentUser = user?.googleId == author.id

    const {data} = useQuery(getLikes,{
      variables:{
        postId: id
      }
    })
    const {data: data2} = useQuery(checkLiked,{
      variables:{
        authorId: user?.googleId,
        postId: id
      }
    })

    console.log(data2?.checkLike)
    
    const handelDeletePost = () => {
      console.log(id)
      deletePost({
        variables:{
          id
        },
        refetchQueries: [{query: getPosts}]
      })
    }

    const handelClickLike = () => {
        if(!user) alert("Your're not logged in !!")
        handelLike({
          variables:{
            authorId: user?.googleId,
            postId: id
          }
        })
        window.location.reload()
    }
    return (
        <Card title={`${title}`} extra={<Link to={`/post/${id}`}>More</Link>} className='sm:w-[600px] md:h-96 w-full' >
          <div className='flex flex-col items-start justify-between h-80 '>
            <p className='max-h-[200px] overflow-y-auto'>{content} </p>
            <p className='text-xl font-semibold flex items-center justify-between h-16 w-full'>@{author.username}<span className='flex items-center gap-2 cursor-pointer' onClick={handelClickLike}> {data2?.checkLike? <LikeFilled/> : <LikeOutlined/>}</span>{data?.likes.length} {isCurrentUser && <span onClick={handelDeletePost} className='hover:opacity-60 cursor-pointer text-red-500'><DeleteOutlined styled={{fontSize:"20px"}}/></span>}</p>
          </div>
        </Card>
    )
}

export default Post
