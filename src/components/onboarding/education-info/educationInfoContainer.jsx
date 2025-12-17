import React, { useRef, useState } from 'react';
import FormStepHeader from '../../ui/form-step-header';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { Trash2, Upload } from 'lucide-react';

function EducationInfoContainer({ educationFormsRef, addMoreForm, deleteForm, setRerender, errors }) {

  const formatNativeDate = (nativeValue) => {
    if (!nativeValue) return '';
    const [year, month, day] = nativeValue.split('-');
    return `${month}/${day}/${year}`;
  };
  const handleDateChange = (e, block, fieldName) => {
    block[fieldName] = e.target.value;
    setRerender((prev) => prev + 1);
  };
  const handleFileChange = (e, block) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      block.uploadDiploma = selectedFile;
      setRerender((prev) => prev + 1);
    }
  };

  const removeFile = (e, block) => {
    e.stopPropagation();
    block.uploadDiploma = null;
    block.fileInputRef.current.value = '';
    setRerender((prev) => prev + 1);
  };

  return (
    <>
      <FormStepHeader info="Education Info" step="2" progress={33} />

      <div className="flex  justify-end my-5">
        {/* <p className="text-lg text-secondary font-semibold">Education</p> */}

        <Button onClick={addMoreForm}>Add Another</Button>
      </div>

      <div className="grid w-full grid-cols-1 gap-6 mt-5">
        {educationFormsRef.current?.map((block, index) => (
          <div key={block.id} className="w-full p-5 border rounded-3xl border-zinc-200">
            <div className="flex items-center justify-between mb-5">
              <p className="text-lg font-semibold text-secondary">Add Education Record</p>

              {educationFormsRef.current.length > 1 && (
                <Trash2 size={18} className="text-red-600 cursor-pointer" onClick={() => deleteForm(block.id)} />
              )}
            </div>

            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col">
                <p className="mb-2 text-base font-semibold text-secondary">Institution<span className="ml-1 text-red-500">*</span></p>
                <Input placeholder="Institution Name" defaultValue={block.institution} onChange={(e) => (block.institution = e.target.value)} />
                {errors[`Education[${index}].institution`] && (<p className="text-sm text-red-600">{errors[`Education[${index}].institution`]}</p>)}
              </div>

              <div className="flex flex-col">
                <p className="mb-2 text-base font-semibold text-secondary">Degree<span className="ml-1 text-red-500">*</span></p>
                <Input placeholder="MD / DO / NP" defaultValue={block.degree} onChange={(e) => (block.degree = e.target.value)} />
                {errors[`Education[${index}].degree`] && (<p className="text-sm text-red-600">{errors[`Education[${index}].degree`]}</p>)}
              </div>

              <div className="flex flex-col">
                <p className="mb-2 text-base font-semibold text-secondary">Specialty<span className="ml-1 text-red-500">*</span></p>
                <Input placeholder="Specialty" defaultValue={block.specialty} onChange={(e) => (block.specialty = e.target.value)} />
                {errors[`Education[${index}].specialty`] && (<p className="text-sm text-red-600">{errors[`Education[${index}].specialty`]}</p>)}
              </div>

              <div className="flex flex-col">
                <p className="mb-2 text-base font-semibold text-secondary">Start Date<span className="ml-1 text-red-500">*</span></p>
                <div className="relative">
                  <Input
                    placeholder="MM/DD/YYYY"
                    value={block.startDate || ''}
                    onChange={(e) => handleDateChange(e, block, 'startDate')}
                    className="pr-12"
                  />
                  <span className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer">
                    <input
                      type="date"
                      value={
                        block.startDate
                          ? block.startDate.split('/').reverse().join('-')
                          : ''
                      }
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value) {
                          block.startDate = formatNativeDate(value);
                          setRerender((prev) => prev + 1);
                        }
                      }}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: 0,
                        cursor: 'pointer',
                      }}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M8 2v4" />
                      <path d="M16 2v4" />
                      <rect width="18" height="18" x="3" y="4" rx="2" />
                      <path d="M3 10h18" />
                      <path d="M8 14h.01" />
                      <path d="M12 14h.01" />
                      <path d="M16 14h.01" />
                      <path d="M8 18h.01" />
                      <path d="M12 18h.01" />
                      <path d="M16 18h.01" />
                    </svg>
                  </span>
                </div>
                {errors[`Education[${index}].startDate`] && (<p className="text-sm text-red-600">{errors[`Education[${index}].startDate`]}</p>)}
              </div>

              <div className="flex flex-col">
                <p className="mb-2 text-base font-semibold text-secondary">End Date<span className="ml-1 text-red-500">*</span></p>
                <div className="relative">
                  <Input
                    placeholder="MM/DD/YYYY"
                    value={block.endDate || ''}
                    onChange={(e) => handleDateChange(e, block, 'endDate')}
                    className="pr-12"
                  />
                  <span className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer">
                    <input
                      type="date"
                      value={
                        block.endDate
                          ? block.endDate.split('/').reverse().join('-')
                          : ''
                      }
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value) {
                          block.endDate = formatNativeDate(value);
                          setRerender((prev) => prev + 1);
                        }
                      }}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: 0,
                        cursor: 'pointer',
                      }}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M8 2v4" />
                      <path d="M16 2v4" />
                      <rect width="18" height="18" x="3" y="4" rx="2" />
                      <path d="M3 10h18" />
                      <path d="M8 14h.01" />
                      <path d="M12 14h.01" />
                      <path d="M16 14h.01" />
                      <path d="M8 18h.01" />
                      <path d="M12 18h.01" />
                      <path d="M16 18h.01" />
                    </svg>
                  </span>
                </div>
                {errors[`Education[${index}].endDate`] && (<p className="text-sm text-red-600">{errors[`Education[${index}].endDate`]}</p>)}
              </div>

              <div className="flex flex-col space-y-2">
                <p className="text-base font-semibold text-secondary">Upload Diploma<span className="ml-1 text-red-500">*</span></p>

                <div
                  className="flex items-center justify-between h-10 p-2 transition-colors border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50"
                  onClick={() => block.fileInputRef.current.click()}
                >
                  <p className={`truncate text-sm ${block.uploadDiploma ? 'text-secondary' : 'text-gray-500'}`}>
                    {block.uploadDiploma ? block.uploadDiploma.name : 'file upload – PDF/JPG/DOCX'}
                  </p>

                  <div className="flex items-center space-x-2">
                    {block.uploadDiploma && (
                      <Trash2
                        size={16}
                        className="text-red-500 hover:text-red-700"
                        onClick={(e) => removeFile(e, block)}
                      />
                    )}

                    <Upload size={16} className="text-tertiary" />
                  </div>

                  <Input
                    type="file"
                    ref={block.fileInputRef}
                    accept=".pdf,.jpg,.jpeg,.docx"
                    onChange={(e) => handleFileChange(e, block)}
                    className="hidden"
                  />
                </div>
                {errors[`Education[${index}].uploadDiploma`] && (<p className="text-sm text-red-600">{errors[`Education[${index}].uploadDiploma`]}</p>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default EducationInfoContainer;
