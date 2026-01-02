import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Upload, X, FileText, Image as ImageIcon } from "lucide-react";

/**
 * DragAndDrop (multi-file)
 * - Stores uploaded items inside imageContainer.current as ARRAY
 * - Each item is: { id, name, type, size, url, file? }
 *
 * Props:
 * - imageContainer: React ref (required) -> will hold array
 * - savedImages / savedImage: backward compatible (optional)
 * - accept: input accept string (e.g. ".pdf,.doc,.docx")
 * - allowedTypes: MIME types allowed
 * - maxBytes: max file size
 * - multiple: boolean
 * - onUpdate: callback after add/remove
 * - label: helper label like "PDF, DOC, DOCX"
 */
export default function DragAndDrop({
  imageContainer,
  savedImages,
  savedImage,
  accept = "",
  allowedTypes = [],
  maxBytes = 5 * 1024 * 1024,
  multiple = true,
  onUpdate,
  label = "",
}) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  // ✅ UI must be driven by state (ref doesn't re-render)
  const [files, setFiles] = useState([]);

  // ✅ init from ref/saved once
  useEffect(() => {
    const current = imageContainer?.current;

    let initial = [];
    if (Array.isArray(current)) initial = current;
    else if (current) initial = [current];
    else if (Array.isArray(savedImages)) initial = savedImages;
    else if (savedImage) initial = [savedImage];

    setFiles(initial);
    if (imageContainer) imageContainer.current = initial;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openPicker = () => inputRef.current?.click();

  const getExt = (name = "") => {
    const idx = name.lastIndexOf(".");
    if (idx === -1) return "";
    return name.slice(idx + 1).toLowerCase();
  };

  const isAllowed = (file) => {
    if (!file) return false;

    // Prefer mime check
    if (allowedTypes?.length && file.type) {
      if (allowedTypes.includes(file.type)) return true;
    }

    // Fallback to extension check (some browsers/doc files)
    const ext = getExt(file.name);
    if (!ext) return false;

    const acceptExts =
      accept
        ?.split(",")
        .map((s) => s.trim().replace(".", "").toLowerCase())
        .filter(Boolean) || [];

    if (!acceptExts.length) return true;
    return acceptExts.includes(ext);
  };

  const toItem = (file) => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const url = file.type?.startsWith("image/") ? URL.createObjectURL(file) : "";
    return { id, name: file.name, type: file.type, size: file.size, url, file };
  };

  const addFiles = (fileList) => {
    const incoming = Array.from(fileList || []);
    if (!incoming.length) return;

    setFiles((prev) => {
      const base = multiple ? [...prev] : [];

      for (const f of incoming) {
        if (!isAllowed(f)) {
          toast.error("Invalid file format", {
            description: label ? `Allowed: ${label}` : "This file type is not allowed.",
          });
          continue;
        }

        if (f.size > maxBytes) {
          toast.error("File too large", {
            description: `Max size is ${Math.round(maxBytes / (1024 * 1024))}MB.`,
          });
          continue;
        }

        // prevent duplicate by name+size
        const duplicate = base.some((x) => x?.name === f.name && x?.size === f.size);
        if (duplicate) continue;

        base.push(toItem(f));

        // if single mode, only take first valid
        if (!multiple) break;
      }

      if (imageContainer) imageContainer.current = base;
      onUpdate?.();
      return base;
    });
  };

  const handleInput = (e) => {
    addFiles(e.target.files);
    e.target.value = "";
  };

  const removeAt = (idx) => {
    setFiles((prev) => {
      const next = [...prev];
      const removed = next[idx];

      if (removed?.url) {
        try {
          URL.revokeObjectURL(removed.url);
        } catch {}
      }

      next.splice(idx, 1);

      if (imageContainer) imageContainer.current = next;
      onUpdate?.();

      return next;
    });
  };

  const clearAll = () => {
    setFiles((prev) => {
      prev.forEach((it) => {
        if (it?.url) {
          try {
            URL.revokeObjectURL(it.url);
          } catch {}
        }
      });

      if (imageContainer) imageContainer.current = [];
      onUpdate?.();

      return [];
    });
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    addFiles(e.dataTransfer.files);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const onDragLeave = () => setDragOver(false);

  const hasFiles = files.length > 0;

  return (
    <div className="mt-6">
      {/* Drop Zone */}
      <div
        className={[
          "w-full rounded-xl border border-dashed p-4 transition",
          dragOver ? "border-primary bg-primary/5" : "border-tertiary/30 bg-tertiary/10",
        ].join(" ")}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
      >
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <div className="flex items-center justify-center rounded-full h-14 w-14 bg-primary/10 text-primary">
            <Upload />
          </div>

          <p className="text-sm font-semibold text-secondary">Drag & drop files here</p>

          <button
            type="button"
            onClick={openPicker}
            className="mt-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-[#093059]"
          >
            Browse Files
          </button>

          <p className="mt-2 text-xs text-tertiary">
            {label ? `Accepted: ${label}` : "Select files to upload"}
          </p>

          <input
            ref={inputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            className="hidden"
            onChange={handleInput}
          />
        </div>
      </div>

      {/* Uploaded Files List */}
      {hasFiles && (
        <div className="p-3 mt-4 bg-white border rounded-xl border-zinc-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-secondary">Attached files ({files.length})</p>
            <button
              type="button"
              onClick={clearAll}
              className="text-xs font-semibold text-red-600 hover:text-red-700"
            >
              Clear all
            </button>
          </div>

          <div className="space-y-2">
            {files.map((it, idx) => {
              const isImage = it?.type?.startsWith("image/") || Boolean(it?.url);
              return (
                <div
                  key={it?.id || idx}
                  className="flex items-center justify-between gap-3 p-2 border rounded-lg border-tertiary/10 bg-tertiary/5"
                >
                  <div className="flex items-center gap-3">
                    {/* Thumbnail / Icon */}
                    <div className="flex items-center justify-center w-10 h-10 overflow-hidden bg-white border rounded-lg">
                      {isImage && it?.url ? (
                        <img src={it.url} alt={it.name} className="object-cover w-full h-full" />
                      ) : (
                        <div className="text-tertiary">
                          {it?.type === "application/pdf" ? (
                            <FileText className="w-5 h-5" />
                          ) : (
                            <ImageIcon className="w-5 h-5" />
                          )}
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-semibold truncate text-secondary">{it?.name || "File"}</p>
                      <p className="text-xs text-tertiary">{Math.ceil((it?.size || 0) / 1024)} KB</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeAt(idx)}
                    className="p-1 rounded-md text-tertiary hover:bg-white hover:text-secondary"
                    aria-label="Remove file"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
