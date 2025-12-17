import React, { useRef, useState } from 'react';
import FormStepHeader from '../../ui/form-step-header';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { Trash2, Upload } from 'lucide-react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../../../components/ui/select';
import { useNavigate } from "react-router-dom";


function OtherDocumentContainer({
  step,
  setStep,
  documentFormsRef,
  addMoreDocumentForm,
  deleteDocumetForm,
  setRerender,
  handleSubmit,
  errors,
}) {
  const formatNativeDate = (nativeValue) => {
    if (!nativeValue) return '';
    const [year, month, day] = nativeValue.split('-');
    return `${month}/${day}/${year}`;
  };

  const getNativeDateValue = (block, fieldName) => {
    const dateString = block[fieldName];
    if (!dateString || dateString.length !== 10) return '';
    return dateString.split('/').reverse().join('-');
  };
  const handleFileChange = (e, block) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      block.uploadFile = selectedFile;
      setRerender((prev) => prev + 1);
    }
  };

  const removeFile = (e, block) => {
    e.stopPropagation();
    block.uploadFile = null;
    block.fileInputRef.current.value = '';
    setRerender((prev) => prev + 1);
  };
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const isValid = await handleSubmit();
    if (isValid) {
      navigate("/upload-credential");
    } else {
      console.log("Form has errors. Please fix them before finishing.");
    }
  }

  return (
    <>
      <FormStepHeader info="Other Documents" step="6" progress={100} />
      <div className="flex justify-end my-5">
        <Button onClick={addMoreDocumentForm}>Add Another</Button>
      </div>
      {/* Education Records Container */}
      <div className="grid w-full grid-cols-1 gap-6 mt-5">
        {documentFormsRef.current?.map((block, index) => (
          <div className="w-full p-5 border rounded-3xl border-zinc-200">
            <div className="flex items-center justify-between mb-5" key={block.id}>
              <p className="text-lg font-semibold text-secondary">Other Document</p>
              {documentFormsRef.current.length > 1 && (
                <Trash2 size={18} className="text-red-600 cursor-pointer" onClick={() => deleteDocumetForm(block.id)} />
              )}
            </div>

            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex flex-col">
                <p className="mb-2 text-base font-semibold text-secondary">Document Type<span className="ml-1 text-red-500">*</span></p>
                <Select
                  value={block.documentType || undefined}
                  onValueChange={(value) => {
                    block.documentType = value;
                    if (setRerender) setRerender(prev => prev + 1);
                  }}
                >
                  <SelectTrigger className="w-full h-10 border border-gray-300">
                    <SelectValue placeholder="Select Document Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-300 ">
                    <SelectItem value="Case Logs">Case Logs</SelectItem>
                    <SelectItem value="CME">CME</SelectItem>
                    <SelectItem value="BLS">BLS</SelectItem>
                    <SelectItem value="ACLS">ACLS</SelectItem>
                    <SelectItem value="PALS">PALS</SelectItem>
                    <SelectItem value="ATLS">ATLS</SelectItem>
                    <SelectItem value="ALSO">ALSO</SelectItem>
                    <SelectItem value="NRP">NRP</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors[`Documents[${index}].documentType`] && (<p className="text-sm text-red-600">{errors[`Documents[${index}].documentType`]}</p>)}
              </div>

              {/* file upload functionality */}
              <div className="flex flex-col space-y-2">
                <p className="text-base font-semibold text-secondary">Upload file<span className="ml-1 text-red-500">*</span></p>
                <div
                  className="flex items-center justify-between h-10 p-2 transition-colors border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50"
                  onClick={() => block.fileInputRef.current.click()}
                >
                  <p className={`truncate text-sm ${block.uploadFile ? 'text-secondary' : 'text-gray-500'}`}>
                    {block.uploadFile ? block.uploadFile.name : 'file upload – no file chosen'}
                  </p>
                  <div className="flex items-center space-x-2">
                    {block.uploadFile && (
                      <Trash2
                        size={16}
                        className="text-red-500 transition-colors hover:text-red-700"
                        onClick={(e) => removeFile(e, block)}
                      />
                    )}
                    <Upload size={16} className={'text-tertiary'} />
                  </div>

                  <Input
                    type="file"
                    ref={block.fileInputRef}
                    accept=".pdf,.jpg,.jpeg,.docx"
                    onChange={(e) => handleFileChange(e, block)}
                    className="hidden"
                  />
                </div>
                {errors[`Documents[${index}].uploadFile`] && (<p className="text-sm text-red-600">{errors[`Documents[${index}].uploadFile`]}</p>)}
              </div>

              <div className="flex flex-col">
                <p className="mb-2 text-base font-semibold text-secondary">Issue Date<span className="ml-1 text-red-500">*</span></p>
                <div className="relative">
                  <Input
                    placeholder="MM/DD/YYYY"
                    value={block.issueDate || ''}
                    onChange={(e) => {
                      block.issueDate = e.target.value;
                      setRerender(prev => prev + 1);
                    }}
                  />
                  <span className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer">
                    <input
                      type="date"
                      value={getNativeDateValue(block, 'issueDate')}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value) {
                          block.issueDate = formatNativeDate(value);
                          setRerender(prev => prev + 1);
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" /><path d="M8 14h.01" /><path d="M12 14h.01" /><path d="M16 14h.01" /><path d="M8 18h.01" /><path d="M12 18h.01" /><path d="M16 18h.01" />
                    </svg>
                  </span>
                </div>
                {errors[`Documents[${index}].issueDate`] && <p className="text-sm text-red-600">{errors[`Documents[${index}].issueDate`]}</p>}
              </div>

              <div className="flex flex-col">
                <p className="mb-2 text-base font-semibold text-secondary">Expiry Date<span className="ml-1 text-red-500">*</span></p>
                <div className="relative">
                  <Input
                    placeholder="MM/DD/YYYY"
                    value={block.expiryDate || ''}
                    onChange={(e) => {
                      block.expiryDate = e.target.value;
                      setRerender(prev => prev + 1);
                    }}
                  />
                  <span className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer">
                    <input
                      type="date"
                      value={getNativeDateValue(block, 'expiryDate')}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value) {
                          block.expiryDate = formatNativeDate(value);
                          setRerender(prev => prev + 1);
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" /><path d="M8 14h.01" /><path d="M12 14h.01" /><path d="M16 14h.01" /><path d="M8 18h.01" /><path d="M12 18h.01" /><path d="M16 18h.01" />
                    </svg>
                  </span>
                </div>
                {errors[`Documents[${index}].expiryDate`] && <p className="text-sm text-red-600">{errors[`Documents[${index}].expiryDate`]}</p>}
              </div>
            </div>
          </div>
        ))}

      </div>

      {/* Action Button */}
      <div className="flex justify-between w-full mt-5">
        <Button
          className="px-8 bg-transparent border text-secondary hover:bg-gray-100"
          onClick={() => setStep(step - 1)}
        >
          Back
        </Button>
        <Button onClick={onSubmit}>Finish Onboarding</Button>
      </div>
    </>
  );
}

export default OtherDocumentContainer;
