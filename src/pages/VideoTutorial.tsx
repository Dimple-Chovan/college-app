import React, { useState, useContext } from "react";
import ReactPlayer from "react-player";
import Layout from "../components/Layout";
import { FormContext } from "../context/FormContext";

const VideoTutorial: React.FC = () => {
  const { videoProgress, setVideoProgress, notes, setNotes } =
    useContext(FormContext);

  const [currentNotes, setCurrentNotes] = useState(notes);
  const [videoDuration, setVideoDuration] = useState(0);
  const [showAlert, setShowAlert] = useState(false); // State for success alert

  const [currentVideo, setCurrentVideo] = useState({
    url: "/videos/video1.mp4", // Default video
    subtitle: "/subtitles/coding.vtt",
    id: "1",
    title: "Learn JavaScript in 30 Minutes",
  });

  const videos = [
    {
      title: "Learn JavaScript in 30 Minutes",
      url: "/videos/video1.mp4",
      subtitle: "/subtitles/coding.vtt",
      id: "1",
      thumbnail: "https://img.youtube.com/vi/H4K9nDClV4A/hqdefault.jpg",
    },
    {
      title: "Introduction to Machine Learning",
      url: "/videos/video2.mp4",
      subtitle: "/subtitles/ml.vtt",
      id: "2",
      thumbnail: "https://img.youtube.com/vi/Gv9_4yMHFhI/hqdefault.jpg",
    },
    {
      title: "The Power of Positive Thinking",
      url: "/videos/video3.mp4",
      subtitle: "/subtitles/motivation.vtt",
      id: "3",
      thumbnail: "https://img.youtube.com/vi/G0-MH1fFovg/hqdefault.jpg",
    }
  ];

  const handleProgress = (progress: { playedSeconds: number }) => {
    if (videoDuration > 0) {
      setVideoProgress((prevProgress) => ({
        ...prevProgress,
        [currentVideo.id]: (progress.playedSeconds / videoDuration) * 100, // Track by Video ID
      }));      
    }
  };
  
  const handleDuration = (duration: number) => {
    setVideoDuration(duration);
  };

  const handleVideoChange = (video: any) => {
    setCurrentVideo(video);
  };

  const handleNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentNotes(event.target.value);
  };

  const handleSaveNotes = () => {
    setNotes(currentNotes);
    console.log("Notes saved:", currentNotes);
    
    // Show alert
    setShowAlert(true);

    // Hide alert after 3 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row p-6 bg-white rounded-lg shadow-md">
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2">{currentVideo.title}</h3>
          <ReactPlayer
            url={currentVideo.url}
            controls
            onProgress={handleProgress}
            onDuration={handleDuration}  // Capture total duration
            width="100%"
            height="350px"
            config={{
              file: {
                attributes: { crossOrigin: "anonymous" },
                tracks: [
                  {
                    kind: "subtitles",
                    src: currentVideo.subtitle,
                    srcLang: "en",
                    label: "English",
                    default: true,
                  },
                ],
              },
            }}
          />
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
              <div
                className="bg-blue-500 h-2.5 rounded-full"
                style={{ width: `${Math.min(videoProgress[currentVideo.url] || 0, 100)}%` }}
              ></div>
            </div>
            <div className="text-sm font-medium text-gray-600">
              Progress: {Math.min(Math.round(videoProgress[currentVideo.id] || 0), 100)}%
            </div>
          </div>
        </div>
        <div className="flex-1 md:ml-7 overflow-y-auto h-100">
          <h3 className="text-xl font-semibold mb-2">Video List</h3>
          <ul className="space-y-4">
            {videos.map((video) => (
              <li key={video.id} className="mb-2">
                <button
                  onClick={() => handleVideoChange(video)}
                  className="flex items-center space-x-4 text-left"
                >
                  <img src={video.thumbnail} alt={video.title} className="w-16 h-16 rounded" />
                  <div>
                    <div className="text-blue-500 hover:underline">{video.title}</div>
                    <div className="text-sm text-gray-600">
                      Progress: {Math.min(Math.round(videoProgress[video.id] || 0), 100)}%
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-2">Notes</h3>
        <textarea
          value={currentNotes}
          onChange={handleNotesChange}
          className="w-full h-64 p-2 border border-gray-300 rounded"
          placeholder="Take notes here..."
        ></textarea>
        <button
          onClick={handleSaveNotes}
          className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Save Notes
        </button>
      </div>
      {showAlert && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded-lg shadow-md transition-opacity duration-500">
          ✅ Notes saved successfully!
        </div>
      )}
    </Layout>
  );
};

export default VideoTutorial;
