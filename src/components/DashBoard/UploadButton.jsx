import { Upload } from 'lucide-react';
import { useRef, useState } from 'react';
export const UploadButton = () => {
  const fileInputRef = useRef(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setLoading(true);
      setUploadStatus('');
      setTimeout(() => {
        setUploadedFile(file);
        setLoading(false);
        setUploadStatus('success');
        console.log('File uploaded:', {
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified,
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }, 1500);
    }
  };
  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xls,.xlsx"
      />
      {
        <button
          onClick={handleUploadClick}
          className="flex items-center justify-center px-6 py-2 mt-6 font-medium transition duration-150 border rounded-md border-primary text-primary hover:bg-dashboard"
        >
          {' '}
          <Upload className="w-4 h-4 mr-2" /> {loading ? 'Uploading...' : 'Upload Document'}
        </button>
      }
      {uploadStatus === 'success' && uploadedFile && (
        <div className="w-full p-3 mt-4 border border-green-200 rounded-md bg-green-50">
          <p className="text-sm font-medium text-green-800">File uploaded successfully</p>
          <p className="mt-1 text-xs text-green-600">{uploadedFile.name}</p>
          <p className="text-xs text-primary">{(uploadedFile.size / 1024).toFixed(2)} KB</p>
        </div>
      )}
      {uploadStatus === 'error' && (
        <div className="p-3 mt-4 border border-red-200 rounded-md bg-red-50">
          <p className="text-sm font-medium text-red-800">✗ Upload failed</p>
        </div>
      )}
    </>
  );
};
export default UploadButton;
