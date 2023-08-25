import { styled } from "styled-components";
import Modal from "react-modal";
import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

const Container = styled.div`
  width: 50%;
  height: 50vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StartRecButton = styled.button`
  background-color: transparent;
  border: 0.5px solid lightgray;
  padding: 10px;
  margin: 0 10px;
  width: 70px;
  &:hover {
    background-color: black;
    color: white;
  }
`;
const StopRecButton = styled.button`
  background-color: transparent;
  border: 0.5px solid lightgray;
  padding: 10px;
  margin: 0 10px;
  width: 70px;
  &:hover {
    background-color: black;
    color: white;
  }
`;

const ModalP = styled.p``;

const ModalBtn = styled.button`
  background-color: transparent;
  border: 0.5px solid lightgray;
  padding: 10px;
  margin: 0 10px;
  width: 70px;
  &:hover {
    background-color: black;
    color: white;
  }
`;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const ScreenRecorder = () => {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [audiomMdalIsOpen, setAudioModalIsOpen] = useState(true);
  const [webcamConfirmed, setWebcamConfirmed] = useState(false);
  const [isAudioConfirmed, setIsAudioConfirmed] = useState(false);
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);

  const handleYesConfirmation = () => {
    setWebcamConfirmed(true);
    setModalIsOpen(false);
  };
  const handleNoConfirmation = () => {
    setModalIsOpen(false);
  };
  const handleAudioYes = () => {
    setAudioModalIsOpen(false);
    setIsAudioConfirmed(true);
  };
  const handleAudioNo = () => {
    setAudioModalIsOpen(false);
    setIsAudioConfirmed(false);
  };

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable]);

  const handleStopCaptureClick = useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, setCapturing]);

  const handleDownload = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = "react-webcam-stream-capture.webm";
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  const videoConstraints = {
    width: { min: 480 },
    height: { min: 480 },
    facingMode: "user",
    audio: isAudioConfirmed,
  };

  return (
    <Container>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleNoConfirmation}
        style={customStyles}
        contentLabel="Confimation Modal"
        ariaHideApp={false}
      >
        <ModalP>Are you ready to record your webcam and enrtire screen?</ModalP>
        <ModalBtn onClick={handleYesConfirmation}>Yes</ModalBtn>
        <ModalBtn onClick={handleNoConfirmation}>No</ModalBtn>
      </Modal>

      {webcamConfirmed && (
        <Modal
          isOpen={audiomMdalIsOpen}
          onRequestClose={() => setAudioModalIsOpen(false)}
          style={customStyles}
          contentLabel="Confimation Modal"
          ariaHideApp={false}
        >
          <ModalP>Are you ready to record your audio?</ModalP>
          <ModalBtn onClick={handleAudioYes}>Yes</ModalBtn>
          <ModalBtn onClick={handleAudioNo}>No</ModalBtn>
        </Modal>
      )}
      {webcamConfirmed && (
        <Webcam
          height={480}
          width={720}
          audio={isAudioConfirmed}
          mirrored={true}
          ref={webcamRef}
          videoConstraints={videoConstraints}
          audioConstraints={{
            autoGainControl: true,
            noiseSuppression: true,
            echoCancellation: true,
          }}
        />
      )}

      {capturing ? (
        <StopRecButton onClick={handleStopCaptureClick}>
          Stop Capture
        </StopRecButton>
      ) : (
        <StartRecButton onClick={handleStartCaptureClick}>
          Start Capture
        </StartRecButton>
      )}
      {recordedChunks.length > 0 && (
        <button onClick={handleDownload}>Download</button>
      )}
    </Container>
  );
};

export default ScreenRecorder;
