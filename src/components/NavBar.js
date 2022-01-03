import React, { useEffect, useState } from 'react'
import {  Button, Menu } from 'antd';
import {Link} from "react-router-dom"
import { fetchUser } from '../graphql-client/fetchUser';
import MenuItem from 'antd/lib/menu/MenuItem';
import {useIsAuthContext} from "../context/isAuth"
const NavBar = () => {
    const user = fetchUser()
    const {isAuth, setIsAuth} = useIsAuthContext()
    const handelLogout = () => {
        if(localStorage.getItem("user")){
            localStorage.clear()
            setIsAuth(false)
        }
    }

    return (
        <div className='w-full'>
            <div className='flex justify-between md:justify-around items-center max-w-screen'>

            
                {isAuth && user && (
                    <div className=" flex items-center gap-3">
                        <img alt="ava" width={50} className='rounded-full' src={user.imageUrl} />
                        <h2 className='text-white text-2xl mt-2'>{user.name}</h2>
                    </div>
                )}
            
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} className='flex w-1/2'>
                <Menu.Item><Link to="/">Home</Link></Menu.Item>
                {isAuth ? (
                    <>
                        <Menu.Item><Link to="/create-post">Create Post</Link></Menu.Item>
                        <MenuItem><Button onClick={handelLogout} type="dashed" danger>Logout</Button></MenuItem>
                    </>
                )
                      : <Menu.Item><Link to="/login">Login</Link></Menu.Item> }
            </Menu>
            </div>
        </div>
    )
}

export default NavBar
