import React, { useState } from 'react'
import {Row, Col, Card, Button} from "antd"
import { useNavigate, useParams } from 'react-router-dom'
import {DeleteOutlined} from "@ant-design/icons"
import { useMutation, useQuery } from '@apollo/client'
import {deleteSinglePost, addNewComment, deleteSingleComment} from "../graphql-client/mutations"
import { getPosts, getComments, getSinglePost  } from '../graphql-client/queries'
import { fetchUser } from '../graphql-client/fetchUser'
const PostDetail = () => {
    const user = fetchUser()
    const {id} = useParams()
    const navigate = useNavigate()

    const [comment, setComment] = useState("")

    const [deletePost, dataMutation] = useMutation(deleteSinglePost)
    const [addComment] = useMutation(addNewComment)
    const [deleteComment] = useMutation(deleteSingleComment)
    const {loading, error, data} = useQuery(getSinglePost,{
        variables: {id}
    })
    const {loading: loading2, error:err2, data: data2} = useQuery(getComments,{
        variables: {postId: id}
    })

    if(loading) return "Loading..."
    if(error) return "Error..."


    const {post} = data
    const currentUser =  user?.googleId == post.author.id 
    
    const handelDeletePost = () => {
        deletePost({
          variables:{
            id 
          },
          refetchQueries: [{query: getPosts}]
        })
        navigate("/")
      }

    const handelDeleteComment = (id) => {
        deleteComment({
            variables:{
                id: id
            },
        })
        window.location.reload()
    }  

    const handelAddComment = () => {
        addComment({
            variables:{
                comment,
                postId: post.id,
                authorId: user.googleId
            },
        })
        setComment("")
        window.location.reload()
    }  

    return (
        <div>
            <Row>
                <Col span={12} className='py-16 pl-52'>
                    <Card title={`${post.title}`} className='w-full md:h-96' >
                        <div className='flex flex-col items-start justify-between h-80 '>
                            <p className='max-h-[200px] overflow-y-auto'>{post.content}</p>
                            <p className='text-xl font-semibold flex items-center justify-between h-16 w-full'>@{post.author.username}{currentUser && <span onClick={handelDeletePost} className='hover:opacity-60 cursor-pointer text-red-500'><DeleteOutlined styled={{fontSize:"20px"}}/></span>}</p>
                        </div>
                    </Card>
                </Col>
                <Col  span={12} className='py-16'>
                    <div className='flex items-center justify-center flex-col gap-5'>
                        {user && 
                            <div className='flex items-center justify-center flex-col gap-5 w-full'>
                            <textarea value={comment} onChange={(e) => setComment(e.target.value)} type="text" placeholder='Comment here....' rows={5} className="w-4/5 outline-none rounded-2xl p-2 text-xl" />
                            <Button type="primary" success onClick={handelAddComment}>Add comment</Button>
                        </div>}
                        <label className='text-3xl font-semibold'>Comments</label>
                        <div className='flex flex-col justify-center items-center gap-6'>
                            {loading2 ? "Loading comments..." : (
                                data2.comments.map(comment => (
                                    <div key={comment.id} className='border-2 flex flex-col gap-20 border-sky-200 p-5 min-w-[500px] min-h-20'>
                                        <p>{comment.comment}</p>
                                        <h1 className='text-lg font-semibold flex items-center justify-between '>@{comment.author.username}{user?.googleId == comment.author.id && <span onClick={() =>handelDeleteComment(comment.id)} className='hover:opacity-60 cursor-pointer text-red-500'><DeleteOutlined styled={{fontSize:"20px"}}/></span>}</h1>
                                    </div>    
                                ))
                            )}
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default PostDetail
