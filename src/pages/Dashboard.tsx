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
        backgroundColor: ['#4F46E5', '#E0E0E0'],
        hoverBackgroundColor: ['#6366F1', '#BDBDBD'],
        borderColor: ['transparent', 'transparent'],
      },
    ],
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <div
          className="bg-white dark:bg-darkbg-800 border border-gray-200 dark:border-gray-700 p-6 rounded-lg shadow-md cursor-pointer transform transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
          onClick={() => handleCardClick('/application-form')}
        >
          <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4">Application Form</h2>
          <p className="text-gray-700 dark:text-darktext-100 mb-4">Fill out the application form to apply for our programs.</p>
          <div className="w-32 h-32 mx-auto">
            <Pie data={pieData} />
          </div>
          <div className="text-center text-gray-800 dark:text-darktext-100 mt-4 text-lg font-medium">
            Progress: {Math.round(formProgress)}%
          </div>
        </div>
        <div
          className="bg-white dark:bg-darkbg-800 border border-gray-200 dark:border-gray-700 p-6 rounded-lg shadow-md cursor-pointer transform transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
          onClick={() => handleCardClick('/video-tutorials')}
        >
          <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4">Video Tutorials</h2>
          <p className="text-gray-700 dark:text-darktext-100">Watch video tutorials to learn more about our offerings.</p>
        </div>
      </div>
    </Layout>

  );
};

export default Dashboard;