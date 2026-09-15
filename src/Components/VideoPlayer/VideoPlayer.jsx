import './VideoPlayer.css'

const VideoPlayer = ({playState, setPlayState}) => {

    const closePlayer = (e) => {
        if (e.target === e.currentTarget) {
           setPlayState(false); 
        }
    }

  return (
    <div
      className={`video-player ${playState ? '' : 'hide'}`}
      onClick={closePlayer}
    >
      {/* src is set only when playState is true to avoid loading the 15 MB
          video file until the user actually clicks Play */}
      {playState && (
        <video
          src={new URL('../../assets/college-video.mp4', import.meta.url).href}
          autoPlay
          muted
          controls
        />
      )}
    </div>
  )
}

export default VideoPlayer
