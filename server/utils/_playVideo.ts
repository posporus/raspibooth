function playVideo(arrayBuffer: ArrayBuffer) {
    // Create a Blob from the ArrayBuffer
    const blob = new Blob([arrayBuffer], { type: 'video/mp4' });
  
    // Create an object URL for the Blob
    const url = URL.createObjectURL(blob);
  
    // Create a video element
    const video = document.createElement('video');
  
    // Set the source of the video element to the object URL
    video.src = url;
  
    // Add the video element to the DOM
    document.body.appendChild(video);
  
    // Play the video
    video.play();
  }
  