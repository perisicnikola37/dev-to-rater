import React from 'react'
import YouTube, { YouTubeProps } from 'react-youtube'
import { IoPlayOutline } from 'react-icons/io5'

interface VideoModalProps {
  showVideo: boolean
  setShowVideo: React.Dispatch<React.SetStateAction<boolean>>
}

const VideoModal: React.FC<VideoModalProps> = ({ showVideo, setShowVideo }) => {
  const opts: YouTubeProps['opts'] = {
    height: '390',
    width: '740',
    playerVars: {
      autoplay: 0,
      modestbranding: 1,
      rel: 0,
      vq: 'hd1080',
    },
  }

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    event.target.pauseVideo()
  }

  return (
    <>
      {!showVideo ? (
        <button
          onClick={() => setShowVideo(true)}
          className="bg-transparent border border-white text-white duration-300 cursor-pointer py-2 px-3 rounded-md hover:shadow-lg hover:shadow-blue-500/50 flex items-center space-x-2"
        >
          <IoPlayOutline /> <span>Dev.to Rater in 30 seconds</span>
        </button>
      ) : (
        <div
          className="fixed inset-0 flex justify-center items-center bg-transparent backdrop-blur-xs z-50"
          onClick={() => setShowVideo(false)}
        >
          <div
            className="relative w-full max-w-3xl flex justify-center items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <YouTube
              videoId="4xgdVo1etFc"
              opts={opts}
              onReady={onPlayerReady}
            />
            <button
              onClick={() => setShowVideo(false)}
              className="absolute cursor-pointer top-[-30px] right-[-35px] bg-white text-black rounded-full px-3 py-1 text-lg font-bold hover:scale-110 duration-100 ease-in"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default VideoModal
