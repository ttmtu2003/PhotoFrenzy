import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap"
import cls from 'classnames'
import React from 'react'
import './style.scss'
// avatar
import Avatar from "../Avatar/Avatar";
// local
import Comment from "./Comment/Comment";
import Like from "./Like/Like";

const PostDetailModal = ({ className, post, open, onClose }) => {
  return (
    <Modal style={{ 'min-height': 'calc(100vh - 3.5rem)' }} className={cls(className, "t-flex t-items-center t-justify-center t-max-w-[100vh] !t-mt-[4rem]")} isOpen={open} toggle={onClose}>
      <ModalHeader toggle={onClose}>Post detail</ModalHeader>
      <ModalBody className="p-0">
        <Row className="mx-0 t-h-full t-w-full">
          <Col xs={8} className="p-0 t-w-full t-h-full t-bg-black">
            <img src={`data:image/jpeg;base64,${post.photo_data}`} className="t-object-contain t-w-full t-h-full" />
          </Col>
          <Col xs={4} className="pt-4">
            {/* avatar */}
            <Row  className="t-items-center">
              <Col xs={2}>{post.avatar !== undefined && <Avatar img={post.avatar ? `${post.avatar}`: null} className="t-w-[2.5rem] t-h-[2.5rem]" />}</Col>
              <Col xs={6} className="ml-2 t-font-semibold"><h1>{post.username}</h1></Col>
              <Col xs={2}><Like postId={post.id}/></Col>
            </Row>
            {/* caption */}
            <Row>
              <Col className="mt-2 t-flex t-flex-wrap"><p>{post.caption}</p></Col>
            </Row>
            <Row>
              <Comment className="mt-2" postId={post.id} />
            </Row>
          </Col>
        </Row>  
      </ModalBody>        
    </Modal>
  )
}

export default PostDetailModal
