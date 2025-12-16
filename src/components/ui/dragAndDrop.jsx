import React, { useEffect, useRef, useState } from 'react';
import { Upload, Image, CircleCheck, Trash2, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from './input';

function DragAndDrop({ imageContainer, onUpdate, savedImage }) {
  const fileInputRef = useRef(null);
  const [fileData, setFileData] = useState(null);

  const openFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handle Drop function
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      const previewURL = URL.createObjectURL(droppedFile);
      const fileObj = {
        url: previewURL,
        name: droppedFile.name,
      };
      setFileData(fileObj);
      imageContainer.current = fileObj;
      onUpdate && onUpdate();
    }
  };
  // Handle File Changes function
  const handleFileChanges = async (e) => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      const previewURL = URL.createObjectURL(file);
      const fileObj = {
        url: previewURL,
        name: file.name,
      };
      setFileData(fileObj);
      imageContainer.current = fileObj;
      onUpdate && onUpdate();
    }
  };
  // Remove File function
  const removeFile = () => {
    setFileData(null);
    if (imageContainer) imageContainer.current = null;
    onUpdate && onUpdate();
  };

  useEffect(() => {
    if (savedImage) {
      imageContainer.current = { ...savedImage };
      setFileData({ ...savedImage });
    }
  }, [savedImage]);

  return (
    <>
      {fileData && imageContainer.current ? (
        <>
          <div
            className="w-full flex items-center justify-center rounded-xl border-dashed border-[1px] border-primary mt-6"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center w-full gap-4 p-4 transition-all duration-300 shadow-sm sm:flex-row rounded-xl bg-primary bg-opacity-10 hover:shadow-lg">
              {/* Preview */}
              <div className="flex items-center justify-center flex-shrink-0 w-20 h-20 overflow-hidden sm:w-20 sm:h-20 rounded-xl bg-primary bg-opacity-10 text-primary">
                <Image size={50} />
              </div>

              {/* File Info */}
              <div className="flex flex-col items-center flex-1 gap-1 text-center sm:items-start sm:text-left">
                <p className="text-lg text-secondary text-[18px] font-medium break-all">{fileData?.name}</p>
                <p className="text-[14px] text-primary flex gap-2 items-center">
                  <CircleCheck size={18} />
                  <span>Uploaded successfully</span>
                </p>
              </div>

              <div className="flex gap-3">
                <div
                  className="flex-shrink-0 text-primary text-[16px] font-semibold border-b-2 border-primary cursor-pointer flex items-center gap-1"
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
          <div className="flex items-center gap-2 mt-4 text-primary">
            <ShieldCheck size={15} />
            <span>Encrypted and stored securely</span>
          </div>
        </>
      ) : (
        <>
          <div
            className="w-full h-72 rounded-xl border-dashed border-[1px] border-tertiary border-opacity-30 bg-tertiary bg-opacity-10 flex flex-col justify-center items-center mt-6 p-5"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-full text-tertiary">
              <Upload size={35} />
            </div>
            <div>
              <p className="text-rare text-[16px] font-normal">Drag & drop your file here, or</p>
            </div>
            <Button className="!bg-primary !text-white px-8 mt-4 text-center" onClick={openFilePicker}>
              <span>Browse Files</span>
            </Button>
            <p className="text-tertiary mt-2 text-[14px]">Accepted: JPG, PNG (Max 10MB)</p>
          </div>
        </>
      )}

      <Input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/jpg"
        className="hidden"
        onChange={handleFileChanges}
      />
    </>
  );
}

export default DragAndDrop;
