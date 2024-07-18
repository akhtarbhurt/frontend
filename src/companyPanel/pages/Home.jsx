import React, { useState, useEffect } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import axios from 'axios';
import { notification } from 'antd';

const Dashboard = () => {
  const [reviewsData, setReviewsData] = useState({
    monthlyReviews: {},
    ratingsDistribution: {},
    sentimentAnalysis: {},
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviewsData = async () => {
      try {
        const companyIDResponse = await axios.get(`${import.meta.env.VITE_API_KEY}/api/v1/companyLogin`);
        const companyID = companyIDResponse?.data?.result?._id;

        const response = await axios.get(`${import.meta.env.VITE_API_KEY}/api/v1/companyReviews/${companyID}`);
        const reviews = response?.data?.payload;

        // Process data for the charts
        const monthlyReviews = processMonthlyReviews(reviews);
        const ratingsDistribution = processRatingsDistribution(reviews);
        const sentimentAnalysis = processSentimentAnalysis(reviews);

        setReviewsData({
          monthlyReviews,
          ratingsDistribution,
          sentimentAnalysis,
        });
      } catch (error) {
        console.error('Failed to fetch reviews', error);

        setReviewsData({
          monthlyReviews: processMonthlyReviews([]),
          ratingsDistribution: processRatingsDistribution([]),
          sentimentAnalysis: processSentimentAnalysis([]),
        });
      } finally {
        setLoading(false);
      }
    };

    fetchReviewsData();
  }, []);

  const processMonthlyReviews = (reviews) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const data = Array(12).fill(0);

    reviews?.forEach((review) => {
      const month = new Date(review.createdAt).getMonth();
      data[month]++;
    });

    return {
      labels: months,
      datasets: [
        {
          label: 'Monthly Reviews',
          data,
          fill: false,
          backgroundColor: 'rgba(75,192,192,0.2)',
          borderColor: 'rgba(75,192,192,1)',
        },
      ],
    };
  };

  const processRatingsDistribution = (reviews) => {
    const ratings = [0, 0, 0, 0, 0];

    reviews?.forEach((review) => {
      if (review?.rating >= 1 && review?.rating <= 5) {
        ratings[review?.rating - 1]++;
      }
    });

    return {
      labels: ['5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star'],
      datasets: [
        {
          label: 'Ratings Distribution',
          data: ratings,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const processSentimentAnalysis = (reviews) => {
    const sentiment = { positive: 0, neutral: 0, negative: 0 };

    reviews?.forEach((review) => {
      if (review.rating >= 4) {
        sentiment.positive++;
      } else if (review.rating === 3) {
        sentiment.neutral++;
      } else {
        sentiment.negative++;
      }
    });

    return {
      labels: ['Positive', 'Neutral', 'Negative'],
      datasets: [
        {
          data: [sentiment.positive, sentiment.neutral, sentiment.negative],
          backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
          hoverBackgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
        },
      ],
    };
  };

  if (loading) {
    return <div className='min-h-screen flex justify-center items-center ' >Loading...</div>;
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow col-span-2 w-full">
          <h2 className="text-xl font-bold mb-2">Monthly Reviews</h2>
          <div className="chart-container w-full h-96">
            <Line data={reviewsData.monthlyReviews} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow col-span-1 w-full">
          <h2 className="text-xl font-bold mb-2">Ratings Distribution</h2>
          <div className="chart-container w-full h-96">
            <Bar data={reviewsData.ratingsDistribution} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow col-span-1 w-full">
          <h2 className="text-xl font-bold mb-2">Sentiment Analysis</h2>
          <div className="chart-container w-full h-96">
            <Pie data={reviewsData.sentimentAnalysis} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
