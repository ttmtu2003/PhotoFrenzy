import React, { useState } from 'react';
import { Col, Form, Input, Row } from 'reactstrap';
import { ArrowUp } from 'react-feather'
// component
import Avatar from '../../Avatar/Avatar';
// hook
import useGetComments from './hooks/useGetComments';
import usePostComment from './hooks/usePostComment';
// assets
import defaultAvatar from '../../../assets/pictures/default-avatar.jpg'

const Comment = ({ className, postId }) => {
  // user id
  const userId = window.localStorage.getItem('id')

  // comment
  const [comment, setComment] = useState('')
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  }

  const { comments, setComments } = useGetComments({ postId })
  const { postComment } = usePostComment();

  // post comment
  const handlePostComment = async (event) => {
    event.preventDefault();
    const response = await postComment({postId, comment, userId});
    setComment('');
    setComments([...comments, response.comment]);
  };

  return (
    <div className={className}>
      <Form onSubmit={handlePostComment}>
        <div className="t-bg-[#F1F1F1] p-2 t-flex t-items-center t-justify-between mb-4">
          {/* comment input */}
          <Input
            type="text"
            placeholder="Write a comment.."
            value={comment}
            onChange={handleCommentChange}
            className="t-w-full !t-rounded-full mr-2 py-2 px-3 placeholder-gray-400 border border-gray-400 focus:t-outline-none focus:t-shadow-none"
          />
          {/* submit button */}
          <button
            type="submit"
            className="t-text-white t-bg-[#098DED] hover:t-bg-[#077ACD] t-rounded-full p-1"
          >
            <ArrowUp  />
          </button>
        </div>
     
        {/* comments list */}
        <ul className="wrapper t-h-[410px] t-overflow-y-auto">
          {comments.map((comment, index) => (
            <li key={index} className="mb-4 ml-2 t-flex">
              <Row className='t-flex t-items-center'>
                <Col>
                <Avatar img={comment?.commenter_picture || defaultAvatar} className="t-w-[2.5rem] t-h-[2.5rem]" />
                </Col>
                <Col className="t-text-[0.85rem]">
                  <Row><h1 className='t-font-semibold'>{comment.commenter_username}</h1></Row>
                  <Row><p className='mt-1'>{comment.content}</p></Row>
                </Col>
              
              </Row>
            </li>
          ))}
        </ul>
      </Form>
    </div>
  );
};

export default Comment;