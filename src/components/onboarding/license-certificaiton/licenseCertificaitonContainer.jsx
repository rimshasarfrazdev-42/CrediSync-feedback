import React, { useRef, useState } from 'react';
import FormStepHeader from '../../ui/form-step-header';
import { Input } from '../../ui/input';
import { Upload, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

function LicenseCertificationContainer({ licenseRefs, setRerender, errors }) {

  const formatNativeDate = (nativeValue) => {
    if (!nativeValue) return '';
    const [year, month, day] = nativeValue.split('-');
    return `${month}/${day}/${year}`;
  };

  const getNativeDateValue = (ref) => {
    const dateString = ref.current;
    if (!dateString || dateString.length !== 10) return '';
    return dateString.split('/').reverse().join('-');
  };

  const handleLicenseUpload = (e) => {
    const file = e.target.files?.[0] || null;
    if (file && file.size > 2097152) {
      toast.error("File is too large. Max limit is 2MB.");
      e.target.value = "";
      return;
    }
    licenseRefs.uploadLicenseRef.current = file;
    setRerender(prev => prev + 1);
  };

  const removeLicenseFile = (e) => {
    e.stopPropagation();
    licenseRefs.uploadLicenseRef.current = null;
    licenseRefs.fileLicenseInputRef.current.value = "";
    setRerender(prev => prev + 1);
  };

  const handleCertificateUpload = (e) => {
    const file = e.target.files?.[0] || null;
    if (file && file.size > 2097152) {
      toast.error("File is too large. Max limit is 2MB.");
      e.target.value = "";
      return;
    }
    licenseRefs.uploadCertificateRef.current = file;
    setRerender(prev => prev + 1);
  };

  const removeCertificateFile = (e) => {
    e.stopPropagation();
    licenseRefs.uploadCertificateRef.current = null;
    licenseRefs.fileCertificateInputRef.current.value = "";
    setRerender(prev => prev + 1);
  };


  return (
    <>
      <FormStepHeader info="Licenses & Certifications" step="4" progress={67} />

      <div className="grid w-full grid-cols-1 gap-6 mt-5">
        <div className="w-full mt-2 lg:p-5 lg:mt-5 lg:border rounded-3xl border-zinc-200">
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">

            {/* License Number - FIX: Switched to value */}
            <div className="flex flex-col">
              <p className="mb-2 text-base font-semibold text-secondary">License Number<span className="ml-1 text-red-500">*</span></p>
              <Input
                placeholder="1234567890"
                value={licenseRefs.licenseNumberRef.current || ''}
                onChange={(e) => {
                  licenseRefs.licenseNumberRef.current = e.target.value;
                  setRerender(p => p + 1);
                }}
              />

              {errors.licenseNumber && (
                <p className="text-sm text-red-600">{errors.licenseNumber}</p>
              )}

            </div>

            {/* Issuing State - FIX: Switched to value */}
            <div className="flex flex-col">
              <p className="mb-2 text-base font-semibold text-secondary">Issuing State<span className="ml-1 text-red-500">*</span></p>
              <Input
                placeholder="CA"
                value={licenseRefs.issuingStateRef.current || ''}
                onChange={(e) => {
                  licenseRefs.issuingStateRef.current = e.target.value;
                  setRerender(prev => prev + 1);
                }}
              />
              {errors.issuingState && <p className="text-sm text-red-600">{errors.issuingState}</p>}
            </div>

            <div className="flex flex-col">
              <p className="mb-2 text-base font-semibold text-secondary">Issue Date<span className="ml-1 text-red-500">*</span></p>
              <div className="relative">
                <Input
                  placeholder="MM/DD/YYYY"
                  value={licenseRefs.issueDateRef.current || ''}
                  onChange={(e) => {
                    licenseRefs.issueDateRef.current = e.target.value;
                    setRerender(prev => prev + 1);
                  }}
                />
                <span className="absolute inset-y-0 flex items-center text-gray-400 cursor-pointer right-3">
                  <input
                    type="date"
                    value={getNativeDateValue(licenseRefs.issueDateRef)}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value) {
                        licenseRefs.issueDateRef.current = formatNativeDate(value);
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
              {errors.issueDate && <p className="text-sm text-red-600">{errors.issueDate}</p>}
            </div>

            <div className="flex flex-col">
              <p className="mb-2 text-base font-semibold text-secondary">Expiry Date<span className="ml-1 text-red-500">*</span></p>
              <div className="relative">
                <Input
                  placeholder="MM/DD/YYYY"
                  value={licenseRefs.expiryDateRef.current || ''}
                  onChange={(e) => {
                    licenseRefs.expiryDateRef.current = e.target.value;
                    setRerender(prev => prev + 1);
                  }}
                />
                <span className="absolute inset-y-0 flex items-center text-gray-400 cursor-pointer right-3">
                  <input
                    type="date"
                    value={getNativeDateValue(licenseRefs.expiryDateRef)}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value) {
                        licenseRefs.expiryDateRef.current = formatNativeDate(value);
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
              {errors.expiryDate && <p className="text-sm text-red-600">{errors.expiryDate}</p>}
            </div>
          </div>

          {/* Upload License */}
          <div className="w-full mt-3">
            <div className="flex flex-col space-y-2">
              <p className="text-base font-semibold text-secondary">Upload License<span className="ml-1 text-red-500">*</span></p>
              <div
                className="flex items-center justify-between h-10 p-2 transition-colors border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50"
                onClick={() => licenseRefs.fileLicenseInputRef.current.click()}
              >
                <p className={`truncate text-sm ${licenseRefs.uploadLicenseRef.current ? 'text-secondary' : 'text-gray-500'}`}>
                  {licenseRefs.uploadLicenseRef.current
                    ? licenseRefs.uploadLicenseRef.current.name
                    : (
                      <>
                        <span className="hidden md:inline">No file chosen — Max 2MB (PDF, JPG, DOCX)</span>
                        <span className="inline md:hidden">No file chosen (Max 2MB)</span>
                      </>
                    )
                  }
                </p>
                <div className="flex items-center space-x-2">
                  {licenseRefs.uploadLicenseRef.current && (
                    <Trash2
                      size={16}
                      className="text-red-500 transition-colors hover:text-red-700"
                      onClick={removeLicenseFile}
                    />
                  )}
                  <Upload size={16} className={'text-tertiary'} />
                </div>

                <Input
                  type="file"
                  ref={licenseRefs.fileLicenseInputRef}
                  accept=".pdf,.jpg,.jpeg,.docx"
                  onChange={handleLicenseUpload}
                  className="hidden"
                />
              </div>
              {errors.uploadLicense && <p className="text-sm text-red-600">{errors.uploadLicense}</p>}
            </div>
          </div>
        </div>

        <div className="w-full p-5 border rounded-3xl border-zinc-200">
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col">
              <p className="mb-2 text-base font-semibold text-secondary">Board Name</p>
              <Input
                placeholder="American Board of Medicine"
                value={licenseRefs.boardNameRef.current || ''}
                onChange={(e) => {
                  licenseRefs.boardNameRef.current = e.target.value;
                  setRerender(prev => prev + 1);
                }}
              />
              {errors.boardName && <p className="text-sm text-red-600">{errors.boardName}</p>}
            </div>
            <div className="flex flex-col">
              <p className="mb-2 text-base font-semibold text-secondary">Specialty</p>
              <Input
                placeholder="Cardiology"
                value={licenseRefs.specialtyRef.current || ''}
                onChange={(e) => {
                  licenseRefs.specialtyRef.current = e.target.value;
                  setRerender(prev => prev + 1);
                }}
              />
              {errors.specialty && <p className="text-sm text-red-600">{errors.specialty}</p>}
            </div>
          </div>
          <div className="flex flex-col mt-3">
            <p className="mb-2 text-base font-semibold text-secondary">Upload Certificate<span className="ml-1 text-red-500">*</span></p>
            <div
              className="flex items-center justify-between h-10 p-2 transition-colors border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50"
              onClick={() => licenseRefs.fileCertificateInputRef.current.click()}
            >
              <p className={`truncate text-sm ${licenseRefs.uploadCertificateRef.current ? 'text-secondary' : 'text-gray-500'}`}>
                {licenseRefs.uploadCertificateRef.current
                  ? licenseRefs.uploadCertificateRef.current.name
                  : (
                    <>
                      <span className="hidden sm:inline">No file chosen — Max 2MB (PDF, JPG, DOCX)</span>
                      <span className="inline sm:hidden">No file chosen (Max 2MB)</span>
                    </>
                  )
                }
              </p>
              <div className="flex items-center space-x-2">
                {licenseRefs.uploadCertificateRef.current && (
                  <Trash2
                    size={16}
                    className="text-red-500 transition-colors hover:text-red-700"
                    onClick={removeCertificateFile}
                  />
                )}
                <Upload size={16} className={'text-tertiary'} />
              </div>

              <Input
                type="file"
                ref={licenseRefs.fileCertificateInputRef}
                accept=".pdf,.jpg,.jpeg,.docx"
                onChange={handleCertificateUpload}
                className="hidden"
              />
            </div>
            {errors.uploadCertificate && <p className="text-sm text-red-600">{errors.uploadCertificate}</p>}
          </div>
        </div>
      </div>
    </>
  );
}

export default LicenseCertificationContainer;