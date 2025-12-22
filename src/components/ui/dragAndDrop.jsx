import React, { useEffect, useRef, useState } from 'react';
import { Upload, Image, CircleCheck, Trash2, ShieldCheck, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from './input';
import { toast } from 'sonner';

function DragAndDrop({ imageContainer, onUpdate, savedImage }) {
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [replaceIndex, setReplaceIndex] = useState(null);


  const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
  const MAX_SIZE_MB = 5;
  const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

  const isValidFile = (file) => {
    if (!file) return false;
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Invalid file format", { description: "Please upload a JPG or PNG image." });
      return false;
    }
    if (file.size > MAX_SIZE_BYTES) {
      toast.error("File too large", { description: `Maximum file size allowed is ${MAX_SIZE_MB}MB.` });
      return false;
    }
    return true;
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const processFiles = (newFiles) => {
    const incoming = Array.from(newFiles);
    const validOnes = incoming.filter(isValidFile);

    if (validOnes.length > 0) {
      const newFileObjects = validOnes.map(file => ({
        file: file,
        name: file.name,
        url: URL.createObjectURL(file)
      }));

      const updatedList = [...files, ...newFileObjects];
      setFiles(updatedList);
      imageContainer.current = updatedList.map(item => item.file);
      onUpdate && onUpdate();
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    processFiles(e.dataTransfer.files);
  };

  const handleFileChanges = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile || !isValidFile(selectedFile)) {
      e.target.value = '';
      return;
    }
    const newFileObj = {
      file: selectedFile,
      name: selectedFile.name,
      url: URL.createObjectURL(selectedFile),
    };
    let updatedList = [...files];
    if (replaceIndex !== null) {
      updatedList[replaceIndex] = newFileObj;
      setReplaceIndex(null);
    }
    else {
      updatedList.push(newFileObj);
    }

    setFiles(updatedList);
    imageContainer.current = updatedList.map(item => item.file);
    onUpdate && onUpdate();

    e.target.value = '';
  };

  const replaceSpecificFile = () => {
    fileInputRef.current?.click();

  }
  const removeFile = (index) => {
    const updatedList = files.filter((_, i) => i !== index);
    setFiles(updatedList);

    imageContainer.current = updatedList.length > 0 ? updatedList.map(item => item.file) : null;
    onUpdate && onUpdate();
  };

  return (
    <div className="w-full">
      {/* 1. LIST OF UPLOADED FILES */}
      {files.length > 0 && (
        <div className="flex flex-col gap-3 mt-6">
          {files.map((fileObj, index) => (
            <div
              key={index}
              className="flex flex-col items-center w-full gap-4 p-4 transition-all duration-300 border shadow-sm rounded-xl bg-primary bg-opacity-10 border-primary border-opacity-30 sm:flex-row"
            >
              {/* Preview Icon */}
              <div className="flex items-center justify-center flex-shrink-0 w-20 h-20 overflow-hidden border sm:w-20 sm:h-20 rounded-xl bg-primary bg-opacity-10 text-primary">
                <Image size={50} />
              </div>

              {/* File Info */}
              <div className="flex flex-col items-center flex-1 gap-1 text-center sm:items-start sm:text-left">
                <p className="text-lg font-semibold break-all text-secondary">{fileObj.name}</p>
                <p className="flex items-center gap-2 text-sm text-primary">
                  <CircleCheck size={18} />
                  <span>Uploaded successfully</span>
                </p>
              </div>

              <div
                className="flex gap-3"
              >
                <div
                  className="flex items-center flex-shrink-0 gap-1 font-semibold border-b-2 cursor-pointer text-primary border-primary"
                  onClick={() => {
                    setReplaceIndex(index);
                    fileInputRef.current?.click();
                  }}
                >
                  <p>Replace</p>
                </div>
                <div
                  className="flex items-center flex-shrink-0 gap-1 text-red-600 cursor-pointer hover:text-red-700"
                  onClick={() => removeFile(index)}>
                  <Trash2 className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}

          <div className="flex items-center gap-2 mt-1 text-primary">
            <ShieldCheck size={15} />
            <span className="text-xs">Encrypted and stored securely</span>
          </div>
        </div>
      )}
      <div
        className={`w-full rounded-xl border-dashed border-[1px] border-tertiary border-opacity-30 bg-tertiary bg-opacity-10 flex flex-col justify-center items-center p-5 transition-all mt-4 ${files.length > 0 ? 'h-32' : 'h-72'}`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {files.length === 0 ? (
          <>
            <div className="flex items-center justify-center w-16 h-16 rounded-full text-tertiary">
              <Upload size={35} />
            </div>
            <p className="text-subtext text-[16px] font-normal">Drag & drop your file here, or</p>
            <Button className="!bg-primary !text-white px-8 mt-4" onClick={openFilePicker}>
              Browse Files
            </Button>
            <p className="text-tertiary mt-2 text-[14px]">Accepted: JPG, PNG (Max 5MB)</p>
          </>
        ) : (
          <button
            onClick={openFilePicker}
            className="flex flex-col items-center gap-2 text-primary hover:text-primary-dark transition-colors"
          >
            <div className="p-2 border-2 border-dashed border-primary rounded-full">
              <Plus size={24} />
            </div>
            <span className="font-semibold text-sm">Add another file</span>
          </button>
        )}
      </div>

      <Input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/jpeg,image/png,image/jpg"
        className="hidden"
        onChange={handleFileChanges}
      />
    </div>
  );
}

export default DragAndDrop;