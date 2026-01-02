import { useEffect } from "react";
import { toast } from "sonner";

export default function useCameraCapture({
  isCameraOpen,
  setIsCameraOpen,
  setTempPhoto,
  videoRef,
  canvasRef,
  tempPhoto,
  setFileData,
  verification,
}) {
  const startCamera = async () => {
    setTempPhoto(null);
    setIsCameraOpen(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraOpen(true);
      }
    } catch (err) {
      setIsCameraOpen(false);
      if (err?.name === "NotAllowedError" || err?.name === "PermissionDeniedError") {
        toast.error("Camera Access Denied", {
          description: "Please allow camera access in your browser settings to verify your identity.",
        });
      } else {
        toast.error("Camera Error", { description: "Could not find a working camera." });
      }
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    stream?.getTracks().forEach((track) => track.stop());
    setIsCameraOpen(false);
    setTempPhoto(null);
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
    setTempPhoto(dataUrl);

    const stream = video.srcObject;
    stream?.getTracks().forEach((track) => track.stop());
  };

  const retakePhoto = () => startCamera();

  const savePhoto = () => {
    const byteString = atob(tempPhoto.split(",")[1]);
    const mimeString = tempPhoto.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);

    const blob = new Blob([ab], { type: mimeString });
    const file = new File([blob], "identity-capture.jpg", { type: "image/jpeg" });

    setFileData(file);
    verification.current = URL.createObjectURL(file);

    setIsCameraOpen(false);
    setTempPhoto(null);
  };

  useEffect(() => {
    if (!isCameraOpen) return;

    const startStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false,
        });

        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        setIsCameraOpen(false);

        if (err?.name === "NotAllowedError") {
          toast.error("Camera Access Denied", { description: "Please allow camera access in browser settings." });
        } else {
          toast.error("Camera Error", { description: "Unable to access camera." });
        }
      }
    };

    startStream();

    return () => {
      const stream = videoRef.current?.srcObject;
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, [isCameraOpen, setIsCameraOpen, videoRef]);

  return { startCamera, stopCamera, capturePhoto, retakePhoto, savePhoto };
}
