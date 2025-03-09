import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormContext } from '../context/FormContext';
import Layout from '../components/Layout';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const Dashboard: React.FC = () => {
  const { formProgress } = useContext(FormContext);
  const navigate = useNavigate();

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  const pieData = {
    labels: ['Completed', 'Remaining'],
    datasets: [
      {
        data: [formProgress, 100 - formProgress],
        backgroundColor: ['#4CAF50', '#E0E0E0'],
        hoverBackgroundColor: ['#66BB6A', '#BDBDBD'],
      },
    ],
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <div
          className="bg-gradient-to-r from-green-400 to-blue-500 p-6 rounded-lg shadow-md cursor-pointer transform transition duration-500 hover:scale-105"
          onClick={() => handleCardClick('/application-form')}
        >
          <h2 className="text-2xl font-semibold text-white mb-4">Application Form</h2>
          <p className="text-white mb-4">Fill out the application form to apply for our programs.</p>
          <div className="w-32 h-32 mx-auto">
            <Pie data={pieData} />
          </div>
          <div className="text-center text-white mt-4 text-lg font-medium">
            Progress: {Math.round(formProgress)}%
          </div>
        </div>
        <div
          className="bg-gradient-to-r from-purple-400 to-pink-500 p-6 rounded-lg shadow-md cursor-pointer transform transition duration-500 hover:scale-105"
          onClick={() => handleCardClick('/video-tutorials')}
        >
          <h2 className="text-2xl font-semibold text-white mb-4">Video Tutorials</h2>
          <p className="text-white">Watch video tutorials to learn more about our offerings.</p>
        </div>
      </div>
    </Layout>

  );
};

export default Dashboard;