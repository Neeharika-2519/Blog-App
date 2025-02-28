import axios from 'axios';
import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';

export default function Header() {
    const path=useLocation().pathname;
    const {currentUser}=useSelector(state=>state.user)
    const [searchTerm, setSearchTerm]=useState('')
    const location =useLocation()
    const dispatch=useDispatch();
    const navigate = useNavigate();
    const {theme}=useSelector(state=>state.theme)
    console.log(searchTerm)
    const handleSignOut=async()=>{
      try{
          const res=await axios.post('/api/user/signout')
          dispatch(signoutSuccess())
      }catch(error){
          console.log(error.message)
      }
  }
  useEffect(()=>{
    const urlParams=new URLSearchParams(location.search)
    const searchTermFromUrl=urlParams.get('searchTerm')
    if(searchTermFromUrl){
      setSearchTerm(searchTermFromUrl)
    }
  },[location.search])

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  return (
    <Navbar className='border-b-2'>
      <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
        <span className='px-2 py-1 '>
          Neeharika's
        </span>
        Blog
      </Link>
      <form onSubmit={handleSubmit}>
        <TextInput type='text' placeholder='Search...' rightIcon={AiOutlineSearch} className='hidden lg:inline' onChange={(e)=>setSearchTerm(e.target.value)} />
      </form>
      <Button className='w-12 h-10 lg:hidden' color='gray' pill><AiOutlineSearch /></Button>
      <div className='flex gap-2 md:order-2'>
        <Button className='w-12 h-10 sm:inline' color='gray' pill onClick={()=>dispatch(toggleTheme())}>{theme==='light'?<FaSun/>:<FaMoon/>}</Button>
        {currentUser?(
          <Dropdown arrowIcon={false} inline label={<Avatar alt='user' img={currentUser.profilePicture} rounded />}>
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <Dropdown.Divider/>
              <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
            </Dropdown.Header>
            <Link to='/dashboard?tab=profile'>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider/>
            <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
          </Dropdown>
        ):(
          <Link to='/sign-in'><Button  className='text-white bg-gray-800 hover:bg-gray-900' outline>Sign In</Button></Link>
        )}
        
        <Navbar.Toggle/>
      </div>
        <Navbar.Collapse>
            <Navbar.Link active={path==='/'} as={'div'}><Link to='/'>Home</Link></Navbar.Link>
            <Navbar.Link active={path==='/about'} as={'div'}><Link to='/about'>About</Link></Navbar.Link>
        </Navbar.Collapse>
     
    </Navbar>
  );
}