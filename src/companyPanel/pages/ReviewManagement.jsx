import React, { useState, useEffect, useRef } from 'react';
import { Table, Button, notification, Dropdown, Menu, Modal, Input } from 'antd';
import axios from 'axios';

const ReviewManagement = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [getName, setGetName] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [selectedReview, setSelectedReview] = useState(null);
  const [replies, setReplies] = useState([]);
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [selectedReportReview, setSelectedReportReview] = useState(null);
  const [getCompany, setGetCompany] = useState([])
  const ws = useRef(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const companyIDResponse = await axios.get(`${import.meta.env.VITE_API_KEY}/api/v1/companyLogin`);
        const companyData = companyIDResponse.data.result;
        const companyID = companyData._id;
        setGetName(companyData.companyName);

        const response = await axios.get(`${import.meta.env.VITE_API_KEY}/api/v1/companyReviews/${companyID}`);
        setReviews(response.data.payload);
      } catch (error) {
        console.error('Failed to fetch reviews', error);
       setReviews([])
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();

    ws.current = new WebSocket('ws://localhost:8080');

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'new_reply') {
        setReplies((prevReplies) => [...prevReplies, data.data]);
      }
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const handleReply = (review) => {
    setSelectedReview(review);
    setIsModalVisible(true);
  };

  const handleReplySubmit = async () => {
    if (!replyText.trim()) {
      notification.warning({ message: 'Reply cannot be empty' });
      return;
    }

    try {
      const companyIDResponse = await axios.get(`${import.meta.env.VITE_API_KEY}/api/v1/companyLogin`);
      const companyData = companyIDResponse.data.result;
      const userID = companyData.userID;
      setGetCompany(companyData)
      const response = await axios.post(
        `${import.meta.env.VITE_API_KEY}/api/v1/reply`,
        {
          reviewID: selectedReview._id,
          text: replyText,
          userID: userID,
          isCompanyReply: true,
        }
      );

      notification.success({ message: 'Reply submitted successfully' });
      setReplies((prevReplies) => [...prevReplies, response.data.result]);
      setIsModalVisible(false);
      setReplyText('');
    } catch (error) {
      console.error('Failed to submit reply', error);
      notification.error({ message: 'Failed to submit reply' });
    }
  };

  const handleReport = (review, reason) => {
    setSelectedReportReview(review);
    setReportReason(reason);
    setIsReportModalVisible(true);
  };

  const handleReportSubmit = async () => {
    if (!reportReason.trim()) {
      notification.warning({ message: 'Report reason cannot be empty' });
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_KEY}/api/v1/reportReview`,
        {
          reviewID: selectedReportReview._id,
          action: reportReason,
          companyName: getCompany?.companyName
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure token is stored in localStorage
          },
        }
      );

      notification.success({ message: 'Review reported successfully' });
      setIsReportModalVisible(false);
      setReportReason('');
    } catch (error) {
      console.error('Failed to report review', error);
      notification.error({ message: 'Failed to report review' });
    }
  };

  const columns = [
    { title: 'User', dataIndex: 'name', key: 'name' },
    { title: 'Rating', dataIndex: 'rating', key: 'rating' },
    { title: 'Content', dataIndex: 'review', key: 'review' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        const menu = (
          <Menu onClick={({ key }) => handleReport(record, key)}>
            <Menu.Item key="spam">Spam</Menu.Item>
            <Menu.Item key="abusive">Abusive Language</Menu.Item>
            <Menu.Item key="hate speech">Hate Speech</Menu.Item>
            <Menu.Item key="false information">False Information</Menu.Item>
            <Menu.Item key="violence">Violence</Menu.Item>
          </Menu>
        );

        return (
          <div>
            <Dropdown overlay={menu} trigger={['click']}>
              <Button type="default">Report</Button>
            </Dropdown>
            <Button
              type="primary"
              className="bg-blue-500 mt-2"
              onClick={() => handleReply(record)}
            >
              Reply
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="min-h-screen">
      <Table
        className="mt-20"
        columns={columns}
        dataSource={reviews}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
      <Modal
        title="Reply to Review"
        visible={isModalVisible}
        onOk={handleReplySubmit}
        onCancel={() => setIsModalVisible(false)}
      >
        <Input.TextArea
          rows={4}
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder="Write your reply here"
        />
      </Modal>
      <Modal
        title="Report Review"
        visible={isReportModalVisible}
        onOk={handleReportSubmit}
        onCancel={() => setIsReportModalVisible(false)}
        
      >
        <Input.TextArea
          rows={4}
          value={reportReason}
          onChange={(e) => setReportReason(e.target.value)}
          placeholder="Provide the reason for reporting"
        />
      </Modal>
      <div>
        {replies?.map((reply) => (
          <div key={reply._id}>
            {reply.text} (by {reply.isCompanyReply ? 'Company' : 'User'})
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewManagement;
