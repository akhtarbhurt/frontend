import React, { useState, useEffect } from 'react';
import { Table, Button, notification, Modal, Input, Dropdown, Menu } from 'antd';
import axios from 'axios';

export default function Report() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentReview, setCurrentReview] = useState({});
  const [warningText, setWarningText] = useState('');

  useEffect(() => {
    const fetchReportedReviews = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_KEY}/api/v1/reportedReviews`);
        const reportedReviews = response.data.result.reverse();

        const formattedData = reportedReviews.map((review, index) => ({
          _id: review._id,
          key: index,
          companyName: review.companyName,
          message: review.message,
          review: review.review,
          report: review.action,
          userName: review.userName,
          warning: review.warning,
          userID: review.userID,
          reviewId: review.reviewId,
        }));

        setDataSource(formattedData);
      } catch (error) {
        console.error('Failed to fetch reported reviews', error);
        notification.error({ message: 'Failed to fetch reported reviews' });
      } finally {
        setLoading(false);
      }
    };

    fetchReportedReviews();
  }, []);

  const handleMenuClick = async ({ key, item }) => {
    const { userID, userName } = item.props.review;
  
    try {
      if (!userID) {
        notification.error({ message: 'UserID is missing for the current review' });
        return;
      }
  
      const url = key === 'block' 
        ? `http://localhost:3000/api/v1/block/${userID}`
        : `http://localhost:3000/api/v1/unblock/${userID}`;
  
      await axios.patch(url);
      notification.success({ message: `User ${userName} ${key}ed successfully` });
    } catch (error) {
      console.error(`Failed to ${key} user`, error);
      notification.error({ message: `Failed to ${key} user` });
    }
  };
  

  const showModal = (review) => {
    setCurrentReview(review);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    if (currentReview && currentReview.userID) {
      const warningPayload = {
        userID: currentReview.userID,
        warningText: warningText,
        warningNumber: currentReview.warning ? currentReview.warning.length + 1 : 1,
        reviewId: currentReview.reviewId,
      };

      try {
        await axios.post(`${import.meta.env.VITE_API_KEY}/api/v1/warning`, warningPayload);
        notification.success({ message: 'Warning generated successfully' });

        setDataSource((prevDataSource) =>
          prevDataSource.map((item) =>
            item.key === currentReview.key ? { ...item, warning: [...(item.warning || []), warningText] } : item
          )
        );

        setIsModalVisible(false);
        setWarningText('');
      } catch (error) {
        console.error('Failed to generate warning', error);
        notification.error({ message: 'Failed to generate warning' });
      }
    } else {
      console.error('UserID is missing:', currentReview);
      notification.error({ message: 'UserID is missing for the current review' });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setWarningText('');
  };

  const deleteReview = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_KEY}/api/v1/reviews/${currentReview.reviewId}`);
      await axios.delete(`${import.meta.env.VITE_API_KEY}/api/v1/reportedReviews/${currentReview._id}`);
      notification.success({ message: 'Review deleted successfully' });

      setDataSource(dataSource.filter(item => item._id !== currentReview._id));
      setIsModalVisible(false);
    } catch (error) {
      console.error('Failed to delete review', error);
      notification.error({ message: 'Failed to delete review' });
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="block" review={currentReview}>Block</Menu.Item>
      <Menu.Item key="unblock" review={currentReview}>Unblock</Menu.Item>
    </Menu>
  );
  

  const columns = [
    {
      title: 'Company Name',
      dataIndex: 'companyName',
      key: 'companyName',
    },
    {
      title: 'Review',
      dataIndex: 'review',
      key: 'review',
    },
    {
      title: 'Report',
      dataIndex: 'report',
      key: 'report',
    },
    {
      title: 'User Name',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'Warning',
      dataIndex: 'warning',
      key: 'warning',
      render: (warnings) => (warnings ? warnings.join(', ') : ''),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <div>
          <Button type="primary" className='bg-blue-500 text-white' onClick={() => showModal(record)}>Take Action</Button>
          <Dropdown overlay={menu} trigger={['click']}>
            <Button className='ml-2' onClick={() => setCurrentReview(record)}>Actions</Button>
          </Dropdown>
        </div>
      ),
    },
  ];
  

  return (
    <div className='w-full min-h-screen p-5'>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 10 }}
        loading={loading}
      />
      <Modal
        title="Generating Warning"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="delete" type="danger" className='bg-red-500 text-white' onClick={deleteReview}>
            Delete Review
          </Button>,
          <Button key="submit" type="primary" className='bg-green-500 text-white' onClick={handleOk}>
            Generate Warning
          </Button>,
        ]}
      >
        <Input 
          value={warningText}
          onChange={(e) => setWarningText(e.target.value)}
          placeholder="Enter warning text"
        />
      </Modal>
    </div>
  );
}
