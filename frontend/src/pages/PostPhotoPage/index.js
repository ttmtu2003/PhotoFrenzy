
import UserNavbar from '../../components/NavBar/NavBar';
import CreatePost from './components/CreatePost';

const PostPhotoPage = () => {
  

  return (
    <div>
      <UserNavbar />
      <div className='t-h-[100vh] t-flex t-items-center t-justify-center'>
        <CreatePost />
      </div>
    </div>
  );
};

export default PostPhotoPage;