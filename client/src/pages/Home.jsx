import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get('/api/post/getPosts');
      const data =  res.data;
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div className='p-5'>
      <div className='flex flex-col gap-6 lg:p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to my Blog</h1>
        <p className='text-gray-500 text-xs sm:text-sm'>Lorem ipsum dolor sit amet. Non exercitationem galisum et dicta optio quo vero quisquam et nisi itaque in adipisci exercitationem qui dolorum assumenda. Ut omnis dolores et dicta modi qui aspernatur pariatur vel esse accusantium qui mollitia earum est libero itaque id voluptatum repudiandae.</p>
        <Link to='/search' className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'>View all posts</Link>
      </div> 
      <div className='p-3 bg-amber-100'>
        <CallToAction/>
      </div>
      <div className='max-w-6xl mx-auto p-3 flex flex-col items-center gap-8 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className='flex flex-wrap gap-4'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='text-lg text-teal-500 hover:underline text-center'
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
