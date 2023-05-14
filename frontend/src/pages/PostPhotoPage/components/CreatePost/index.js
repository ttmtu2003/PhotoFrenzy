import React, { useRef, useState } from 'react';
import usePostPhoto from '../../hooks/usePostPhoto';
import { Image } from 'react-feather'
import { Button, Input } from 'reactstrap';

const CreatePost = ({ className }) => {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');
  const { postPhoto } = usePostPhoto();
  const fileInputRef = useRef(null);

  const user_id = window.localStorage.getItem('id')

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    // console.log("FILE", file)
  };

  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData()
    formData.append('file', file)
    formData.append('caption', caption)
    formData.append('user_id', user_id)
    postPhoto(formData)
  }

  return (
    <div className='t-w-[40rem] t-h-fit t-bg-[#DADADA] t-rounded-lg'>
      <div className='t-flex t-h-[4rem] t-w-full t-justify-center t-items-center t-border-b-[2px] t-border-b-[#f4f4f4]'>
        <h1 className='t-font-bold t-text-[20px]'>Create Post</h1>
      </div>
      
      <form onSubmit={handleSubmit}>
        {/* caption */}
        <div className='p-3'>
          <Input type="textarea" placeholder="What's happening?" data-testid="caption" name="caption" className="placeholder-gray-500" value={caption} onChange={handleCaptionChange} />
        </div>
        
        {/* photo */}
        <div className='px-3'>
          <label htmlFor="photo-upload" className="t-w-full t-flex t-justify-center">
            {file ? (
              <img src={URL.createObjectURL(file)} alt="Selected" data-testid="photo-preview" />
            ) : (
              <div className='hover:t-cursor-pointer t-flex t-justify-start t-w-full'>
                <Image className='hover:t-text-[#098DED]' />
              </div>
            )}
          </label>
          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: 'none' }}
            data-testid="photo-input"
          />
        </div>

        {/* submit button */}
        <div className='t-flex t-justify-end mr-3 mb-2'>
          <Button className='t-bg-[#098DED] t-rounded-md t-border-none hover:t-bg-[#0786E2]' type="submit">Post</Button>
        </div>
        
      </form>
    </div>
  )
}

export default CreatePost