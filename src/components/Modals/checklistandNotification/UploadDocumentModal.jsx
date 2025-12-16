import React, { useRef, useState } from "react";

const DEFAULT_ACCEPT = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

function formatFileSize(bytes) {
  if (!bytes && bytes !== 0) return "";
  const mb = bytes / (1024 * 1024);
  if (mb < 1) return `${bytes} bytes`;
  return `${mb.toFixed(1)} MB`;
}

export default function UploadDocumentModal({
  open,
  onClose,
  onUpload,
  title = "Upload Document",
  description = "Upload malpractice insurance to complete this checklist item.",
  fieldLabel = "Upload Document",
  maxSizeMB = 10,
  accept = DEFAULT_ACCEPT,
}) {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const maxBytes = maxSizeMB * 1024 * 1024;
  const acceptAttr = Array.isArray(accept) ? accept.join(",") : accept;

  const resetState = () => {
    setFile(null);
    setError("");
    setDragActive(false);
  };

  const validateFile = (f) => {
    if (!f) {
      setError("Please select a file to upload.");
      return false;
    }

    // Size
    if (f.size > maxBytes) {
      setError(`File must be smaller than ${maxSizeMB} MB.`);
      return false;
    }

    // Type (by MIME or extension)
    if (Array.isArray(accept) && accept.length > 0) {
      const lowerName = f.name.toLowerCase();
      const typeAllowed =
        accept.includes(f.type) ||
        accept.some((pattern) => {
          if (pattern.startsWith(".")) {
            return lowerName.endsWith(pattern.toLowerCase());
          }
          return false;
        });

      if (!typeAllowed) {
        setError("Unsupported file type.");
        return false;
      }
    }

    setError("");
    return true;
  };

  const handleFiles = (filesList) => {
    const f = filesList?.[0];
    if (!f) return;
    if (!validateFile(f)) return;
    setFile(f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!dragActive) setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // ignore events bubbling from children
    if (e.target === e.currentTarget) {
      setDragActive(false);
    }
  };

  const handleBrowseClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e) => {
    handleFiles(e.target.files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateFile(file)) return;
    if (onUpload) onUpload(file);
    resetState();
    onClose && onClose();
  };

  const handleCancel = () => {
    resetState();
    onClose && onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 bg-secondary/80 sm:px-6"
      aria-modal="true"
      role="dialog"
    >
      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl">
        <form
          onSubmit={handleSubmit}
          className="max-h-[90vh] overflow-y-auto px-4 py-5 sm:px-6 sm:py-6"
        >
          {/* Header */}
          <div className="mb-4 sm:mb-5">
            <h2 className="text-base font-semibold text-secondary sm:text-lg">
              {title}
            </h2>
            <p className="mt-1 text-xs text-tertiary sm:text-sm">
              {description}
            </p>
          </div>

          {/* Field Label */}
          <div className="mb-3 sm:mb-4">
            <label className="block text-xs font-medium text-slate-700 sm:text-sm mb-1.5">
              {fieldLabel}
            </label>

            {/* Drop Zone */}
            <div
              className={`relative flex min-h-[210px] w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-slate-50 px-4 text-center transition-colors ${
                dragActive
                  ? "border-primary bg-slate-100"
                  : "border-slate-200 hover:border-slate-300"
              }`}
              onDragOver={handleDragOver}
              onDragEnter={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleBrowseClick}
            >
              {/* Upload icon */}
              <div className="flex items-center justify-center w-10 h-10 mb-3 rounded-full bg-slate-100">
                <svg
                  className="w-5 h-5 text-slate-500"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 16V4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M7 9l5-5 5 5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5 18h14"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {!file && (
                <>
                  <p className="text-sm font-medium text-slate-700">
                    Drag and drop your file here
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    or click to browse
                  </p>
                  <p className="mt-3 text-[11px] text-slate-400">
                    Supported: PDF, JPG, DOCX (Max {maxSizeMB}MB)
                  </p>
                </>
              )}

              {file && (
                <div className="flex flex-col items-center mt-1">
                  <p className="text-sm font-medium text-slate-800">
                    {file.name}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {formatFileSize(file.size)}
                  </p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                    }}
                    className="mt-2 text-xs font-medium text-primary hover:underline"
                  >
                    Remove file
                  </button>
                </div>
              )}

              <input
                ref={inputRef}
                type="file"
                className="hidden"
                accept={acceptAttr}
                onChange={handleChange}
              />
            </div>

            {error && (
              <p className="mt-2 text-xs text-rose-500">
                {error}
              </p>
            )}
          </div>

          {/* Footer buttons */}
         <div className="flex flex-col-reverse gap-3 mt-4 sm:flex-row sm:justify-end">
  <button
    type="button"
    onClick={handleCancel}
    className="inline-flex justify-center w-1/2 px-4 py-2 text-sm font-medium bg-white border rounded-md border-slate-300 text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
  >
    Cancel
  </button>
  <button
    type="submit"
    className="w-1/2 inline-flex justify-center rounded-md bg-[#0B3B7F] px-4 py-2 text-sm font-semibold text-white hover:bg-[#082b5a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 disabled:cursor-not-allowed disabled:bg-slate-300"
    disabled={!file}
  >
    Upload Document
  </button>
</div>

        </form>
      </div>
    </div>
  );
}
