import React from 'react'
import {Button} from 'antd';
import {GoogleOutlined} from "@ant-design/icons"
import GoogleLogin from 'react-google-login';
import { useMutation } from '@apollo/client';
import { addNewAuthor } from '../graphql-client/mutations';
import {useNavigate} from "react-router-dom"
import {useIsAuthContext} from "../context/isAuth"
const Login = () => {
    const navigate = useNavigate()
    const [addAuthor, dataMutation] = useMutation(addNewAuthor)
    const {setIsAuth} = useIsAuthContext()
    const responseGoogle = (response) => {
        const {profileObj} = response
        console.log(response)
        addAuthor({
            variables:{
                _id: response.googleId,
                username: profileObj.name,
                imageUrl: profileObj.imageUrl
            }
        })
        localStorage.setItem("user",JSON.stringify(profileObj))
        setIsAuth(true)
        navigate("/")
      }
    return (
        <div className='h-[93vh] flex items-center justify-center w-full'>
            <GoogleLogin
                clientId="207501287490-71fui67mg3m244mcc83u7v1dl03qj30a.apps.googleusercontent.com"
                render={renderProps => (
                    <Button onClick={renderProps.onClick} disabled={renderProps.disabled} type='primary' icon={<GoogleOutlined style={{color:"gold",fontSize:"35px"}} />} style={{width:"400px", height:"60px", fontSize:"20px"}}>Sign In With Google</Button>
                )}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}

export default Login
