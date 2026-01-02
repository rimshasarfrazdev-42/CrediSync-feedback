import React from "react";
import { Camera, Upload, CircleCheck, Trash2, Image } from "lucide-react";
import CardHeader from "../../components/ui/cardHeader";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export default function PhotoVerificationCard({
  verification,
  fileData,
  openFilePicker,
  startCamera,
  removeFile,
  fileInputRef,
  handleFileChanges,
}) {
  return (
    <div className="w-full p-5 bg-white border shadow-sm rounded-3xl border-zinc-200">
      <CardHeader
        heading="Photo Verification"
        subText="Take or upload a clear photo to verify your identity"
        status={verification.current ? "Uploaded" : "Required"}
      />

      {verification.current ? (
        <div className="w-full flex items-center justify-center rounded-xl border-dashed border-[1px] border-primary mt-6">
          <div className="flex flex-col items-center w-full gap-4 p-4 transition-all duration-300 shadow-sm sm:flex-row rounded-xl bg-primary bg-opacity-10 hover:shadow-lg">
            <div className="flex items-center justify-center flex-shrink-0 w-20 h-20 overflow-hidden border sm:w-20 sm:h-20 rounded-xl bg-primary bg-opacity-10 text-primary">
              <Image size={50} />
            </div>

            <div className="flex flex-col items-center flex-1 gap-1 text-center sm:items-start sm:text-left">
              <p className="text-lg font-semibold break-all text-secondary">{fileData?.name}</p>
              <p className="flex items-center gap-2 text-sm text-primary">
                <CircleCheck size={18} />
                <span>Uploaded successfully</span>
              </p>
            </div>

            <div className="flex gap-3">
              <div
                className="flex items-center flex-shrink-0 gap-1 font-semibold border-b-2 cursor-pointer text-primary border-primary"
                onClick={openFilePicker}
              >
                <p>Replace</p>
              </div>
              <div
                className="flex items-center flex-shrink-0 gap-1 text-red-600 cursor-pointer hover:text-red-700"
                onClick={removeFile}
              >
                <Trash2 className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-72 rounded-xl border-dashed border-[1px] border-tertiary border-opacity-30 bg-tertiary bg-opacity-10 flex flex-col justify-center items-center mt-6 p-5">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary bg-opacity-10 text-primary">
            <Camera size={40} />
          </div>

          <Button
            className="text-center !bg-primary !text-white mt-4 text-[16px] font-semibold w-full flex items-center gap-2 justify-center"
            onClick={startCamera}
          >
            <Camera size={24} />
            <span>Take Photo</span>
          </Button>

          <Button
            className="text-center text-[16px] font-semibold bg-transparent w-full border-[1px] flex items-center justify-center gap-2 border-rare text-rare mt-4"
            onClick={openFilePicker}
          >
            <Upload size={24} className="text-subtext" />
            <span className="text-subtext">Upload Photo</span>
          </Button>

          <p className="mt-2 text-sm font-normal text-tertiary">Accepted: JPG, PNG (Max 5MB)</p>
        </div>
      )}

      <Input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg, image/png"
        className="hidden"
        onChange={handleFileChanges}
      />
    </div>
  );
}
