import { toast } from "sonner";

export default function usePhotoVerification({ fileInputRef, verification, setFileData, MAX_SIZE_BYTES, MAX_SIZE_MB }) {
  const openFilePicker = () => fileInputRef.current?.click();

  const handleFileChanges = (e) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file format", { description: "Please upload a JPG or PNG image." });
      e.target.value = "";
      return;
    }

    if (file.size > MAX_SIZE_BYTES) {
      toast.error("File too large", { description: `The photo must be smaller than ${MAX_SIZE_MB}MB.` });
      e.target.value = "";
      return;
    }

    setFileData(file);
    const previewURL = URL.createObjectURL(file);
    verification.current = previewURL;

    e.target.value = "";
  };

  const removeFile = () => {
    if (verification.current) {
      try {
        URL.revokeObjectURL(verification.current);
      } catch {}
    }
    setFileData(null);
    verification.current = null;
  };

  return { openFilePicker, handleFileChanges, removeFile };
}
