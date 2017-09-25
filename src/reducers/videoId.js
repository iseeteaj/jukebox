const videoId = (state = '', action) => {
  switch (action.type) {
    case 'SET_PLAYING_VIDEO_ID':
      return action.videoId
    default:
      return state
  }
}

export default videoId
