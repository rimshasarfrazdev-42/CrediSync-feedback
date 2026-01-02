import { useCallback } from "react";

export default function useDocsProgress(allDocs, setUploadedCount) {
  const updateProgress = useCallback(() => {
    let count = 0;

    allDocs.forEach((ref) => {
      const list = Array.isArray(ref.current) ? ref.current : ref.current ? [ref.current] : [];
      if (list.length > 0) count++;
    });

    setUploadedCount(count);
  }, [allDocs, setUploadedCount]);

  return { updateProgress };
}
