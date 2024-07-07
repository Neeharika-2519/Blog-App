import axios from 'axios'
import { Sidebar } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { HiArrowSmRight, HiChartPie, HiDocumentText, HiOutlineUserGroup, HiUser } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

export default function DashSidebar() {
    const location=useLocation()
    const dispatch=useDispatch()
    const {currentUser}=useSelector(state=>state.user)
    const [tab, setTab]=useState('');
    useEffect(()=>{
        const urlParams=new URLSearchParams(location.search)
        const tabFromUrl= setTab(urlParams.get('tab'))
        if(tabFromUrl){
        setTab(tabFromUrl)
        }
    },[location.search])
    const handleSignOut=async()=>{
      try{
          const res=await axios.post('/api/user/signout')
          dispatch(signoutSuccess())
      }catch(error){
          console.log(error.message)
      }
  }
  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col gap-1'>
          {
            currentUser && currentUser.isAdmin &&(
              <Link to='/dashboard?tab=dash'>
                <Sidebar.Item active={tab==='dash' || !tab} icon={HiChartPie} labelColor='dark'>Dashboard</Sidebar.Item>
              </Link>
            )
          }
            <Link to='/dashboard?tab=profile'>
                <Sidebar.Item active={tab==='profile'} icon={HiUser} label={"User"} labelColor='dark'>Profile</Sidebar.Item>
            </Link>
            {
              currentUser.isAdmin && (
                <Link to='/dashboard?tab=posts'>
                  <Sidebar.Item active={tab==='posts'} icon={HiDocumentText} label={currentUser.isAdmin?'Admin':''} labelColor='dark'>Posts</Sidebar.Item>
                </Link>
              )
            }
            {
              currentUser.isAdmin && (
                <Link to='/dashboard?tab=users'>
                  <Sidebar.Item active={tab==='users'} icon={HiOutlineUserGroup} labelColor='dark'>Users</Sidebar.Item>
                </Link>
              )
            }
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
            <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignOut} >Sign Out</Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}
