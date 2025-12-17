import React from 'react';
import FormStepHeader from '../../ui/form-step-header';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { Trash2 } from 'lucide-react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../../../components/ui/select';

function AffiliationInfoContainer({ affiliationFormsRef, addMoreAffiliationForm, deleteAffiliationForm, errors, setRerender }) {
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
  const handleValueChange = (block, fieldName, value) => {
    block[fieldName] = value;
    if (setRerender) setRerender(prev => prev + 1);
  };
  return (
    <>
      <FormStepHeader info="Affiliations" step="3" progress={50} />
      <div className="flex justify-end my-5">
        {/* <p className="text-lg text-secondary">Affiliations</p> */}
        <Button onClick={addMoreAffiliationForm}>Add Another</Button>
      </div>
      {/* Education Records Container */}
      <div className="grid w-full grid-cols-1 gap-6 mt-5">
        {affiliationFormsRef.current?.map((block, index) => (
          <div key={block.id}>
            <div className="w-full p-5 border rounded-3xl border-zinc-200">
              <div className="flex items-center justify-between mb-5">
                <p className="text-lg font-semibold text-secondary">Add Affiliations</p>
                {affiliationFormsRef.current.length > 1 && (
                  <Trash2
                    size={18}
                    className="text-red-600 cursor-pointer"
                    onClick={() => deleteAffiliationForm(block.id)}
                  />
                )}
              </div>

              <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col">
                  <p className="mb-2 text-base font-semibold text-secondary">Hospital/Facility<span className="ml-1 text-red-500">*</span></p>
                  <Select
                    value={block.hospital || undefined}
                    onValueChange={(value) => handleValueChange(block, 'hospital', value)} 
                  >
                    <SelectTrigger
                      className="w-full h-auto min-h-[2.5rem] border border-gray-300 text-left items-center py-2" 
                    >
                      <SelectValue
                        placeholder="Select Hospital or Facility Name"
                        className="whitespace-normal leading-snug" 
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-300 ">
                      <SelectItem value="Cleveland Clinic">Cleveland Clinic</SelectItem>
                      <SelectItem value="Johns Hopkins Hospital">Johns Hopkins Hospital</SelectItem>
                      <SelectItem value="Mayo Clinic">Mayo Clinic</SelectItem>
                      <SelectItem value="Massachusetts General Hospital">Massachusetts General Hospital</SelectItem>
                      <SelectItem value="Houston Methodist Hospital">Houston Methodist Hospital</SelectItem>
                      <SelectItem value="Northwestern Memorial Hospital">Northwestern Memorial Hospital</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors[`Affiliation[${index}].hospital`] && (<p className="text-sm text-red-600">{errors[`Affiliation[${index}].hospital`]}</p>)}
                </div>
                <div className="flex flex-col">
                  <p className="mb-2 text-base font-semibold text-secondary">Start Date<span className="ml-1 text-red-500">*</span></p>
                  <div className="relative">
                    <Input
                      placeholder="MM/DD/YYYY"
                      defaultValue={block.startDate}
                      onChange={(e) => (block.startDate = e.target.value)}
                      className="pr-12"
                    />
                    <span className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer">
                      <input
                        type="date"
                        value={getNativeDateValue(block, 'startDate')}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value) {
                            block.startDate = formatNativeDate(value);
                            // Need to trigger a re-render to update the visible Input
                            if (setRerender) setRerender(prev => prev + 1);
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
                  {errors[`Affiliation[${index}].startDate`] && (<p className="text-sm text-red-600">{errors[`Affiliation[${index}].startDate`]}</p>)}
                </div>
                <div className="flex flex-col">
                  <p className="mb-2 text-base font-semibold text-secondary">End Date<span className="ml-1 text-red-500">*</span></p>
                  <div className="relative">
                    <Input
                      placeholder="MM/DD/YYYY or Present"
                      defaultValue={block.endDate}
                      onChange={(e) => (block.endDate = e.target.value)}
                      className="pr-12"
                    />
                    <span className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer">
                      <input
                        type="date"
                        value={getNativeDateValue(block, 'endDate')}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value) {
                            block.endDate = formatNativeDate(value);
                            // Need to trigger a re-render to update the visible Input
                            if (setRerender) setRerender(prev => prev + 1);
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
                  {errors[`Affiliation[${index}].endDate`] && (<p className="text-sm text-red-600">{errors[`Affiliation[${index}].endDate`]}</p>)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default AffiliationInfoContainer;
