import React, { useState } from 'react';
import { Col, Form, Input, Row } from 'reactstrap';
import { ArrowUp } from 'react-feather'
import mockData5 from "../../../assets/pictures/mockData5.jpg"
import Avatar from '../../Avatar/Avatar';
import useGetComments from './hooks/useGetComments';

const Comment = ({ className, postId }) => {
  const [comment, setComment] = useState('');
  const [commentsList, setCommentsList] = useState([]);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (comment.trim() !== '') {
      setCommentsList([...commentsList, comment]);
      setComment('');
    }
  }

  // const { comments, error, isLoading } = useGetComments(postId)

  // returned data from server
  const mockComments = [
    {
      id: '123123',
      post_id: '123',
      commenter_id: 'maya11',
      content: 'slayyyy',
      commenter_username: 'jennie_l',
      commenter_picture: mockData5
    },
    {
      id: '12312356',
      post_id: '123',
      commenter_id: 'maya112',
      content: 'beautiful',
      commenter_username: 'jennie_l',
      commenter_picture: mockData5
    },
  ]

  return (
    <div className={className}>
      <Form onSubmit={handleCommentSubmit}>
        <div className="t-bg-[#F1F1F1] p-2 t-flex t-items-center t-justify-between mb-4">
          <Input
            type="text"
            placeholder="Write a comment.."
            value={comment}
            onChange={handleCommentChange}
            className="t-w-full !t-rounded-full mr-2 py-2 px-3 placeholder-gray-400 border border-gray-400 focus:t-outline-none focus:t-shadow-none"
          />
          <button
            type="submit"
            className="t-text-white t-bg-[#098DED] hover:t-bg-[#077ACD] t-rounded-full p-1"
          >
            <ArrowUp  />
          </button>
        </div>
      </Form>
      <ul>
        {mockComments.map((comment, index) => (
          <li key={index} className="mb-4 ml-2 t-flex">
            <Row className='t-flex t-items-center'>
              <Col>
              <Avatar img={comment.commenter_picture} className="t-w-[2.5rem] t-h-[2.5rem]" />
              </Col>
              <Col className="t-text-[0.85rem]">
                <Row><h1 className='t-font-semibold'>{comment.commenter_username}</h1></Row>
                <Row><p className='mt-1'>{comment.content}</p></Row>
              </Col>
            
            </Row>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comment;