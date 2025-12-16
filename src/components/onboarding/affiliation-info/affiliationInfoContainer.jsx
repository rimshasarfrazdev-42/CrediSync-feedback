import React from 'react';
import FormStepHeader from '../../ui/form-step-header';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { Trash2 } from 'lucide-react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../../../components/ui/select';

function AffiliationInfoContainer({ affiliationFormsRef, addMoreAffiliationForm, deleteAffiliationForm, errors }) {
  return (
    <>
      <FormStepHeader info="Affiliations" step="3" progress={50} />
      <div className="flex items-center justify-between my-5">
        <p className="text-lg text-secondary">Affiliations</p>
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
                  <p className="mb-2 text-base font-semibold text-secondary">Hospital/Facility</p>
                  <Select
                    value={block.hospital || undefined}
                    onValueChange={(value) => (block.hospital = value)}
                  >
                    <SelectTrigger className="w-full h-10 border border-gray-300">
                      <SelectValue placeholder="Select Hospital or Facility Name" />
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
                  <p className="mb-2 text-base font-semibold text-secondary">Start Date</p>
                  <Input
                    placeholder="MM/DD/YYYY"
                    defaultValue={block.startDate}
                    onChange={(e) => (block.startDate = e.target.value)}
                  />
                  {errors[`Affiliation[${index}].startDate`] && (<p className="text-sm text-red-600">{errors[`Affiliation[${index}].startDate`]}</p>)}
                </div>
                <div className="flex flex-col">
                  <p className="mb-2 text-base font-semibold text-secondary">End Date</p>
                  <Input
                    placeholder="MM/DD/YYYY or Present"
                    defaultValue={block.endDate}
                    onChange={(e) => (block.endDate = e.target.value)}
                  />
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
