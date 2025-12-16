import React, { useEffect, useState } from 'react';

const emptyValues = {
  hospitalName: '',
  streetAddress: '',
  city: '',
  state: '',
  zip: '',
  phone: '',
  startDate: '',
  endDate: '',
  fax: '',
};

export default function HospitalPrivilegeModal({ open, onClose, onSave, initialValues }) {
  const [values, setValues] = useState(emptyValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      setValues({ ...emptyValues, ...(initialValues || {}) });
      setErrors({});
    }
  }, [open, initialValues]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    const requiredFields = ['hospitalName', 'streetAddress', 'city', 'state', 'zip', 'phone', 'startDate', 'endDate'];

    requiredFields.forEach((field) => {
      if (!values[field]?.trim()) {
        newErrors[field] = 'This field is required.';
      }
    });

    // Simple phone validation
    if (values.phone && !/^\(?\d{3}\)?[-\s.]?\d{3}[-\s.]?\d{4}$/.test(values.phone)) {
      newErrors.phone = 'Enter a valid phone number.';
    }

    // Simple date validation: MM/DD/YYYY
    const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
    ['startDate', 'endDate'].forEach((field) => {
      if (values[field] && !dateRegex.test(values[field])) {
        newErrors[field] = 'Use MM/DD/YYYY format.';
      }
    });

    // Start date should not be after end date
    if (!newErrors.startDate && !newErrors.endDate && values.startDate && values.endDate) {
      const [sm, sd, sy] = values.startDate.split('/').map(Number);
      const [em, ed, ey] = values.endDate.split('/').map(Number);
      const start = new Date(sy, sm - 1, sd);
      const end = new Date(ey, em - 1, ed);
      if (start > end) {
        newErrors.startDate = 'Start date must be before end date.';
        newErrors.endDate = 'End date must be after start date.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (onSave) onSave(values);
    onClose && onClose();
  };

  const fieldClass = (name) =>
    `w-full rounded-md border px-3 py-2 text-sm text-secondary placeholder:text-tertiary focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 ${
      errors[name] ? 'border-rose-400' : 'border-slate-300'
    }`;

  const errorText = (name) => (errors[name] ? <p className="mt-1 text-xs text-rose-500">{errors[name]}</p> : null);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 bg-secondary/80 sm:px-6"
      aria-modal="true"
      role="dialog"
    >
      <div className="relative w-full max-w-lg bg-white shadow-xl rounded-2xl">
        <form onSubmit={handleSubmit} className="max-h-[90vh] overflow-y-auto px-4 py-5 sm:px-6 sm:py-6">
          {/* Header */}
          <div className="mb-4 sm:mb-5">
            <h2 className="text-base font-semibold text-secondary sm:text-lg">Add Hospital Privilege Entry</h2>
            <p className="mt-1 text-xs text-tertiary sm:text-sm">
              Log your hospital affiliation details below. No document upload required.
            </p>
          </div>

          {/* Hospital Name */}
          <div className="mb-3 sm:mb-4">
            <label className="block text-xs font-medium text-secondary sm:text-sm">Hospital Name</label>
            <input
              type="text"
              name="hospitalName"
              value={values.hospitalName}
              onChange={handleChange}
              placeholder="Enter Hospital Name"
              className={fieldClass('hospitalName')}
            />
            {errorText('hospitalName')}
          </div>

          {/* Street Address */}
          <div className="mb-3 sm:mb-4">
            <label className="block text-xs font-medium text-secondary sm:text-sm">Street Address</label>
            <input
              type="text"
              name="streetAddress"
              value={values.streetAddress}
              onChange={handleChange}
              placeholder="Enter Street Address"
              className={fieldClass('streetAddress')}
            />
            {errorText('streetAddress')}
          </div>
          <div className="mb-3 sm:mb-4">
            <label className="block text-xs font-medium text-secondary sm:text-sm">City</label>
            <input
              type="text"
              name="city"
              value={values.city}
              onChange={handleChange}
              placeholder="Enter City"
              className={fieldClass('city')}
            />
            {errorText('city')}
          </div>
          {/* City / State / Zip */}
          <div className="grid grid-cols-1 gap-3 mb-3 sm:mb-4 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <label className="block text-xs font-medium text-secondary sm:text-sm">State</label>
              <input
                type="text"
                name="state"
                value={values.state}
                onChange={handleChange}
                placeholder="CA"
                className={fieldClass('state')}
              />
              {errorText('state')}
            </div>

            <div className="sm:col-span-1">
              <label className="block text-xs font-medium text-secondary sm:text-sm">Zip</label>
              <input
                type="text"
                name="zip"
                value={values.zip}
                onChange={handleChange}
                placeholder="Enter Zip"
                className={fieldClass('zip')}
              />
              {errorText('zip')}
            </div>
          </div>

          {/* Phone */}
          <div className="mb-3 sm:mb-4">
            <label className="block text-xs font-medium text-secondary sm:text-sm">Phone</label>
            <input
              type="tel"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              placeholder="(555) 201-1488"
              className={fieldClass('phone')}
            />
            {errorText('phone')}
          </div>

          {/* Start / End Date */}
          <div className="grid grid-cols-1 gap-3 mb-3 sm:mb-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-secondary sm:text-sm">Start Date</label>
              <input
                type="text"
                name="startDate"
                value={values.startDate}
                onChange={handleChange}
                placeholder="MM/DD/YYYY"
                className={fieldClass('startDate')}
              />
              {errorText('startDate')}
            </div>
            <div>
              <label className="block text-xs font-medium text-secondary sm:text-sm">End Date</label>
              <input
                type="text"
                name="endDate"
                value={values.endDate}
                onChange={handleChange}
                placeholder="MM/DD/YYYY"
                className={fieldClass('endDate')}
              />
              {errorText('endDate')}
            </div>
          </div>

          {/* Fax (Optional) */}
          <div className="mb-4 sm:mb-5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-medium text-secondary sm:text-sm">Fax (Optional)</label>
            </div>
            <input
              type="text"
              name="fax"
              value={values.fax}
              onChange={handleChange}
              placeholder="Enter fax number"
              className={fieldClass('fax')}
            />
          </div>

          {/* Footer buttons */}
          <div className="flex flex-col-reverse gap-3 mt-2 sm:mt-0 sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium border rounded-md sm:w-1/2 border-slate-300 text-secondary hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-full sm:w-1/2 inline-flex justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-[#082b5a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              Save Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
