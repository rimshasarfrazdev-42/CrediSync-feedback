import React, { useRef, useState } from 'react';
import FormStepHeader from '../../ui/form-step-header';
import { Input } from '../../ui/input';
import { Upload, Trash2 } from 'lucide-react';

function LicenseCertificationContainer({ licenseRefs, setRerender, errors }) {

 const handleLicenseUpload = (e) => {
  const file = e.target.files?.[0] || null;
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
      {/* Education Records Container */}

      <div className="grid w-full grid-cols-1 gap-6 mt-5">
        <div className="w-full p-5 border rounded-3xl border-zinc-200">
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col">
              <p className="mb-2 text-base font-semibold text-secondary">License Number</p>
              <Input
                placeholder="A1234567"
                defaultValue={licenseRefs.licenseNumberRef.current}
                onChange={(e) => (licenseRefs.licenseNumberRef.current = e.target.value)}
              />
              {errors.licenseNumber && <p className="text-sm text-red-600">{errors.licenseNumber}</p>}
            </div>
            <div className="flex flex-col">
              <p className="mb-2 text-base font-semibold text-secondary">Issuing State</p>
              <Input
                placeholder="CA"
                defaultValue={licenseRefs.issuingStateRef.current}
                onChange={(e) => (licenseRefs.issuingStateRef.current = e.target.value)}
              />
              {errors.issuingState && <p className="text-sm text-red-600">{errors.issuingState}</p>}
            </div>
            <div className="flex flex-col">
              <p className="mb-2 text-base font-semibold text-secondary">Issue Date</p>
              <Input
                placeholder="MM/DD/YYYY"
                defaultValue={licenseRefs.issueDateRef.current}
                onChange={(e) => (licenseRefs.issueDateRef.current = e.target.value)}
              />
              {errors.issueDate && <p className="text-sm text-red-600">{errors.issueDate}</p>}
            </div>
            <div className="flex flex-col">
              <p className="mb-2 text-base font-semibold text-secondary">Expiry Date</p>
              <Input
                placeholder="MM/DD/YYYY"
                defaultValue={licenseRefs.expiryDateRef.current}
                onChange={(e) => (licenseRefs.expiryDateRef.current = e.target.value)}
              />
              {errors.expiryDate && <p className="text-sm text-red-600">{errors.expiryDate}</p>}
            </div>
          </div>
          <div className="w-full mt-3">
            {/* file upload functionality */}
            <div className="flex flex-col space-y-2">
              <p className="text-base font-semibold text-secondary">Upload License</p>
              <div
                className="flex items-center justify-between h-10 p-2 transition-colors border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50"
                onClick={() => licenseRefs.fileLicenseInputRef.current.click()}
              >
                <p className={`truncate text-sm ${licenseRefs.uploadLicenseRef.current ? 'text-secondary' : 'text-gray-500'}`}>
                  {licenseRefs.uploadLicenseRef.current ? licenseRefs.uploadLicenseRef.current.name : 'file upload – no file chosen'}
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
                {errors.uploadLicense && <p className="text-sm text-red-600">{errors.uploadLicense}</p>}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full p-5 border rounded-3xl border-zinc-200">
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col">
              <p className="mb-2 text-base font-semibold text-secondary">Board Name</p>
              <Input
                placeholder="American Board of Internal Medicine"
                defaultValue={licenseRefs.boardNameRef.current}
                onChange={(e) => (licenseRefs.boardNameRef.current = e.target.value)}
              />
              {errors.boardName && <p className="text-sm text-red-600">{errors.boardName}</p>}
            </div>
            <div className="flex flex-col">
              <p className="mb-2 text-base font-semibold text-secondary">Specialty</p>
              <Input
                placeholder="Cardiology"
                defaultValue={licenseRefs.specialtyRef.current}
                onChange={(e) => (licenseRefs.specialtyRef.current = e.target.value)}
              />
              {errors.specialty && <p className="text-sm text-red-600">{errors.specialty}</p>}
            </div>
          </div>
          <div className="flex flex-col mt-3">
              <p className="mb-2 text-base font-semibold text-secondary">Upload License</p>
              <div
                className="flex items-center justify-between h-10 p-2 transition-colors border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50"
                onClick={() => licenseRefs.fileCertificateInputRef.current.click()}
              >
                <p className={`truncate text-sm ${licenseRefs.uploadCertificateRef.current ? 'text-secondary' : 'text-gray-500'}`}>
                  {licenseRefs.uploadCertificateRef.current ? licenseRefs.uploadCertificateRef.current.name : 'file upload – no file chosen'}
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
                {errors.uploadCertificate && <p className="text-sm text-red-600">{errors.uploadCertificate}</p>}
              </div>
            </div>
        </div>
      </div>
    </>
  );
}

export default LicenseCertificationContainer;
