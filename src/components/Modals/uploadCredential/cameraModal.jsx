import React from "react";
import { Camera, X } from "lucide-react";
import { Button } from "../../ui/button";

export default function CameraModal({
  isCameraOpen,
  stopCamera,
  tempPhoto,
  videoRef,
  canvasRef,
  capturePhoto,
  retakePhoto,
  savePhoto,
}) {
  if (!isCameraOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
      <div className="w-full max-w-md py-1 overflow-hidden bg-white shadow-2xl rounded-2xl">
        <div className="flex items-center justify-between px-6 py-1">
          <h3 className="text-xl font-bold text-secondary">
            {tempPhoto ? "Review Photo" : "Identity Verification"}
          </h3>
          <button onClick={stopCamera} className="p-2 rounded-full hover:bg-zinc-100">
            <X size={24} className="text-zinc-500" />
          </button>
        </div>

        <div className="relative mx-6 overflow-hidden bg-black shadow-inner aspect-square rounded-xl">
          {tempPhoto ? (
            <img src={tempPhoto} className="object-cover w-full h-full" alt="Captured" />
          ) : (
            <video ref={videoRef} autoPlay playsInline className="object-cover w-full h-full" />
          )}

          {!tempPhoto && (
            <div className="absolute inset-0 border-[30px] border-black/20 pointer-events-none">
              <div className="w-full h-full border-2 border-dashed rounded-full border-white/40" />
            </div>
          )}

          <canvas ref={canvasRef} className="hidden" />
        </div>

        <div className="flex flex-col px-6 py-4">
          {tempPhoto ? (
            <div className="flex gap-4">
              <Button
                onClick={retakePhoto}
                className="flex-1 !bg-zinc-100 !text-secondary border border-zinc-200 py-6 font-bold"
              >
                Retake
              </Button>
              <Button onClick={savePhoto} className="flex-1 !bg-primary !text-white py-6 font-bold">
                Use Photo
              </Button>
            </div>
          ) : (
            <Button onClick={capturePhoto} className="w-full !bg-primary !text-white py-6 flex text-lg font-bold">
              <Camera size={24} /> Take Photo
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
