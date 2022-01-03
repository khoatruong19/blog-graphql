import React, { useState } from 'react'
import { Form, Input, Button } from 'antd';
import { useMutation } from '@apollo/client';
import { addNewPost } from '../graphql-client/mutations';
import { getPosts } from '../graphql-client/queries';
import { fetchUser } from '../graphql-client/fetchUser';
import { useNavigate } from 'react-router-dom';
const CreatePost = () => {
    const user = fetchUser()
    const navigate = useNavigate()
    const [newPost, setNewPost] = useState({
      title:"",
      content:"",
    })
    const [addPost, dataMutation] = useMutation(addNewPost)
    
    const handelOnChangeInput = (e) => {
      setNewPost({...newPost,
        [e.target.name]: e.target.value
      })
    }


    const handelAddPost = () => {
      console.log(newPost)
      addPost({
        variables:{
          title: newPost.title,
          content: newPost.content,
          authorId: user.googleId
        },
        refetchQueries: [{query: getPosts}]
      })
      setNewPost({
        title:"",
        content:""
      })
      navigate("/")
    };

    if(!user) {
      alert("Please login first!")
      window.location = '/'
    }

    
    return (
        <div className='h-[93vh] flex items-center justify-center'>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              autoComplete="off"
            >
      <Form.Item
        label="Title"
        rules={[{ required: true, message: 'Please input your title!' }]}
      >
        <Input name="title"  value={newPost.title} onChange={handelOnChangeInput} style={{width:"300px",height:"60px"}} />
      </Form.Item>

      <Form.Item
        label="Content"
        rules={[{ required: true, message: 'Please input your content!' }]}
      >
        <Input.TextArea name="content" value={newPost.content} onChange={handelOnChangeInput} style={{width:"400px",height:"100px"}} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="button" onClick={handelAddPost}>
          Submit
        </Button>
      </Form.Item>
    </Form>
        </div>
    )
}

export default CreatePost
