const startRecording = document.getElementById("startRecording")
const stopRecording = document.getElementById("stopRecording")
const playBack = document.getElementById("playBack")
const feedback = document.getElementById("feedback")

startRecording.addEventListener("click", startRecorder, false)
stopRecording.addEventListener("click", stopRecorder, false)
playBack.addEventListener("click", () => audio.play(), false)


const audio = new Audio()
const streams = []

let startTime
let mediaRecorder
let chunks


async function startRecorder() {
  navigator.mediaDevices
  .getUserMedia({ audio: true })
  .then(onSuccess, onError)
}


function onSuccess(stream) {
  startTime = new Date()
  // The System "recording" icon appears now there is a stream
  streams.push(stream)

  const mimeType = "audio/webm"
  mediaRecorder = new MediaRecorder(stream) //, { mimeType })
  chunks = [];

  mediaRecorder.onstop = saveRecording
  mediaRecorder.ondataavailable = ({data}) => {
    chunks.push(data);
  };

  mediaRecorder.start()
  showStartTime()
};


function onError(error) {
  alert(`An error occured with getUserMedia():
  ${error}`);
};


function stopRecorder() {
  if (!mediaRecorder) {
    return
  }

  mediaRecorder.stop()
  stopAllTracks()
  showEndTime()
}


function stopAllTracks() {
  // Switch off the System "recording" icon
  streams.forEach( stream => {
    stream.getTracks() // get all tracks from the MediaStream
      .forEach( track => track.stop() ); // stop each of them
  })
  streams.length = 0
}


function saveRecording() {
  const type = mediaRecorder.mimeType
  const blob = new Blob(chunks, { type })
  const src = window.URL.createObjectURL(blob)
  audio.src = src
  
  // Play the recording immediately
  audio.play()
}



function showStartTime() {
  const text = `Started: ${startTime.toLocaleTimeString("en-gb") + "." + startTime.getMilliseconds()}`
  console.log("text:", text);
  feedback.textContent = text
}


function showEndTime(){
  const endTime = new Date()
  const duration = (endTime - startTime) / 1000
  const text = `
Ended:   ${endTime.toLocaleTimeString("en-gb") + "." + endTime.getMilliseconds()}
Duration:       ${duration} seconds`

  feedback.textContent += text
}