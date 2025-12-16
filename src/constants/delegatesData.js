// src/data/delegatesData.js

const STORAGE_KEY = 'delegates';

const safeParse = (value) => {
  try {
    return value ? JSON.parse(value) : [];
  } catch (err) {
    console.error('Failed to parse delegates from localStorage', err);
    return [];
  }
};

export const getDelegates = () => {
  if (typeof window === 'undefined') return [];
  return safeParse(localStorage.getItem(STORAGE_KEY));
};

export const saveDelegates = (delegates) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(delegates));
};

export const addDelegate = (payload) => {
  const delegates = getDelegates();

  const newDelegate = {
    id: Date.now(),
    status: payload.status || 'Pending',
    access: payload.access || 'View Only',
    ...payload,
  };

  const updated = [...delegates, newDelegate];
  saveDelegates(updated);
  return updated;
};

export const updateDelegate = (id, updates) => {
  const delegates = getDelegates();
  const updated = delegates.map((d) =>
    d.id === id ? { ...d, ...updates } : d
  );
  saveDelegates(updated);
  return updated;
};

export const removeDelegate = (id) => {
  const delegates = getDelegates();
  const updated = delegates.filter((d) => d.id !== id);
  saveDelegates(updated);
  return updated;
};
