import React, { useRef, useState } from 'react';
import FormStepHeader from '../../ui/form-step-header';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { Trash2, Upload } from 'lucide-react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../../../components/ui/select';

function InsuranceInfoContainer({ InsuranceFormsRef, addMoreInsuranceForm, deleteInsuranceForm, setRerender, errors }) {
  const handleFileChange = (e, block) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      block.uploadCertificate = selectedFile;
      setRerender((prev) => prev + 1);
    }
  };

  const removeFile = (e, block) => {
    e.stopPropagation();
    block.uploadCertificate = null;
    block.fileInputRef.current.value = '';
    setRerender((prev) => prev + 1);
  };
  return (
    <div className="w-full p-5 mb-8 bg-white border shadow-sm rounded-3xl border-zinc-200 sm:p-6 lg:p-8">
      <FormStepHeader info="Insurance Details" step="5" progress={83} />
      <div className="flex items-center justify-between my-5">
        <p className="text-lg text-secondary">Insurance Details</p>
        <Button onClick={addMoreInsuranceForm}>Add Another</Button>
      </div>
      {/* Education Records Container */}
      <div className="grid w-full grid-cols-1 gap-6 mt-5">
        {InsuranceFormsRef.current?.map((block, index) => (
          <div className="w-full p-5 border rounded-3xl border-zinc-200" key={block.id}>
            <div className="flex items-center justify-between mb-5">
              <p className="text-lg font-semibold text-secondary">Add Insurance Details</p>
              {InsuranceFormsRef.current.length > 1 && (
                <Trash2
                  size={18}
                  className="text-red-600 cursor-pointer"
                  onClick={() => deleteInsuranceForm(block.id)}
                />
              )}
            </div>

            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col">
                <p className="mb-2 text-base font-semibold text-secondary">Insurer Name</p>
                <Input
                  placeholder="Insurer Name"
                  defaultValue={block.insurerName}
                  onChange={(e) => (block.insurerName = e.target.value)}
                />
                {errors[`Insurance[${index}].insurerName`] && (<p className="text-sm text-red-600">{errors[`Insurance[${index}].insurerName`]}</p>)}
              </div>
              <div className="flex flex-col">
                <p className="mb-2 text-base font-semibold text-secondary">Policy Number</p>
                <Input
                  placeholder="POL-3381209"
                  defaultValue={block.policyNumber}
                  onChange={(e) => (block.policyNumber = e.target.value)}
                />
                {errors[`Insurance[${index}].policyNumber`] && (<p className="text-sm text-red-600">{errors[`Insurance[${index}].policyNumber`]}</p>)}
              </div>
              <div className="flex flex-col">
                <p className="mb-2 text-base font-semibold text-secondary">Coverage Limits</p>
                <Select value={block.coverageLimits || undefined} onValueChange={(value) => (block.coverageLimits = value)}>
                  <SelectTrigger className="w-full h-10 border border-gray-300">
                    <SelectValue placeholder="Select Coverage Limits" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-300 ">
                    <SelectItem value="$1,000,000 / $3,000,000">$1,000,000 / $3,000,000</SelectItem>
                    <SelectItem value="$2,000,000 / $4,000,000">$2,000,000 / $4,000,000</SelectItem>
                    <SelectItem value="$500,000 / $1,500,000">$500,000 / $1,500,000</SelectItem>
                    <SelectItem value="$3,000,000 / $5,000,000">$3,000,000 / $5,000,000</SelectItem>
                  </SelectContent>
                </Select>
                {errors[`Insurance[${index}].coverageLimits`] && (<p className="text-sm text-red-600">{errors[`Insurance[${index}].coverageLimits`]}</p>)}
              </div>
              <div className="flex flex-col">
                <p className="mb-2 text-base font-semibold text-secondary">Start Date</p>
                <Input
                  placeholder="MM/DD/YYYY"
                  defaultValue={block.startDate}
                  onChange={(e) => (block.startDate = e.target.value)}
                />
                {errors[`Insurance[${index}].startDate`] && (<p className="text-sm text-red-600">{errors[`Insurance[${index}].startDate`]}</p>)}
              </div>
              <div className="flex flex-col">
                <p className="mb-2 text-base font-semibold text-secondary">End Date</p>
                <Input
                  placeholder="MM/DD/YYYY"
                  defaultValue={block.endDate}
                  onChange={(e) => (block.endDate = e.target.value)}
                />
                {errors[`Insurance[${index}].endDate`] && (<p className="text-sm text-red-600">{errors[`Insurance[${index}].endDate`]}</p>)}
              </div>
              <div className="flex flex-col space-y-2">
                <p className="text-base font-semibold text-secondary">Insurance Certificate</p>
                <div
                  className="flex items-center justify-between h-10 p-2 transition-colors border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50"
                  onClick={() => block.fileInputRef.current.click()}
                >
                  <p
                    className={`truncate text-sm ${block.uploadCertificate ? 'text-secondary' : 'text-gray-500'}`}
                  >
                    {block.uploadCertificate ? block.uploadCertificate.name : 'Upload COI or Malpractice File'}
                  </p>
                  <div className="flex items-center space-x-2">
                    {block.uploadCertificate && (
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
                {errors[`Insurance[${index}].uploadCertificate`] && (<p className="text-sm text-red-600">{errors[`Insurance[${index}].uploadCertificate`]}</p>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InsuranceInfoContainer;
