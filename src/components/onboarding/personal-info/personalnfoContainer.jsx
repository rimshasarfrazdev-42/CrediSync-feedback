import React, { use, useRef, useState } from 'react';
import FormStepHeader from '../../ui/form-step-header';
import { Input } from '../../ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../../../components/ui/select';
import DialogSection from '../../ui/dialogSection';

function PersonalInfoContainer({ refs, errors, handleNextStep }) {
  const [fullName, setFullName] = useState(`${refs.firstNameRef.current} ${refs.lastNameRef.current}`);
  const [dateOfBirth, setDateOfBirth] = useState(refs.dateOfBirthRef.current);
  const [state, setState] = useState(refs.stateRef.current);
  return (
    <>
      <FormStepHeader info="Personal Info" step="1" progress={17} />
      <div className="grid w-full grid-cols-1 gap-4 p-5 mt-5 border sm:grid-cols-2 md:grid-cols-3 min-h-96 rounded-3xl border-zinc-200">
        <div className="flex flex-col">
          <p className="mb-2 text-base font-semibold text-secondary">First Name</p>
          <Input
            placeholder="Enter your first Name"
            value={fullName.split(' ')[0] || ''}
            onChange={(e) => {
              const newFirst = e.target.value;
              const newFull = `${newFirst} ${fullName.split(' ').slice(1).join(' ')}`;
              setFullName(newFull);
              refs.firstNameRef.current = newFirst;
            }}
          />
          {errors.firstName && <p className="text-sm text-red-600">{errors.firstName}</p>}
        </div>
        <div className="flex flex-col">
          <p className="mb-2 text-base font-semibold text-secondary">Middle Initial</p>
          <Input
            placeholder="Enter your Middle Initial"
            defaultValue={refs.middleInitialRef.current}
            onChange={(e) => (refs.middleInitialRef.current = e.target.value)}
          />
          {errors.middleInitial && <p className="text-sm text-red-600">{errors.middleInitial}</p>}
        </div>
        <div className="flex flex-col">
          <p className="mb-2 text-base font-semibold text-secondary">Last Name</p>
          <Input
            placeholder="Enter your Last Name"
            value={fullName.split(' ').slice(1).join(' ')}
            onChange={(e) => {
              const newLast = e.target.value;
              const newFull = `${fullName.split(' ')[0]} ${newLast}`;
              setFullName(newFull);
              refs.lastNameRef.current = newLast;
            }}
          />
          {errors.lastName && <p className="text-sm text-red-600">{errors.lastName}</p>}
        </div>
        <div className="flex flex-col">
          <p className="mb-2 text-base font-semibold text-secondary">Other Name(s)</p>
          <Input
            placeholder="Enter your first Name"
            defaultValue={refs.otherNameRef.current}
            onChange={(e) => (refs.otherNameRef.current = e.target.value)}
          />
          {errors.otherName && <p className="text-sm text-red-600">{errors.otherName}</p>}
        </div>
        <div className="flex flex-col">
          <p className="mb-2 text-base font-semibold text-secondary">Date Of Birth</p>
          <Input
            placeholder="MM/DD/YYYY"
            value={dateOfBirth}
            onChange={(e) => {
              refs.dateOfBirthRef.current = e.target.value;
              setDateOfBirth(refs.dateOfBirthRef.current);
            }}
          />
          {errors.dateOfBirth && <p className="text-sm text-red-600">{errors.dateOfBirth}</p>}
        </div>
        <div className="flex flex-col">
          <p className="mb-2 text-base font-semibold text-secondary">Email</p>
          <Input
            placeholder="you@hospital.org"
            defaultValue={refs.emailRef.current}
            onChange={(e) => (refs.emailRef.current = e.target.value)}
          />
          {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
        </div>
        <div className="flex flex-col">
          <p className="mb-2 text-base font-semibold text-secondary">Contact Number</p>
          <Input
            placeholder="(555) 201-1488"
            defaultValue={refs.contactRef.current}
            onChange={(e) => (refs.contactRef.current = e.target.value)}
          />
          {errors.contact && <p className="text-sm text-red-600">{errors.contact}</p>}
        </div>
        <div className="flex flex-col">
          <p className="mb-2 text-base font-semibold text-secondary">Gender</p>
          <Select
            value={refs.genderRef.current || undefined}
            onValueChange={(value) => (refs.genderRef.current = value)}
          >
            <SelectTrigger className="w-full h-10 border border-gray-300">
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-300 ">
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
          {errors.gender && <p className="text-sm text-red-600">{errors.gender}</p>}
        </div>
        <div className="flex flex-col">
          <p className="mb-2 text-base font-semibold">Address</p>
          <Input
            placeholder="1200 Lakeshore Dr, Suite 200"
            defaultValue={refs.addressRef.current}
            onChange={(e) => (refs.addressRef.current = e.target.value)}
          />
          {errors.address && <p className="text-sm text-red-600">{errors.address}</p>}
        </div>
        <div className="flex flex-col">
          <p className="mb-2 text-base font-semibold text-secondary">City</p>
          <Input
            placeholder="City"
            defaultValue={refs.cityRef.current}
            onChange={(e) => (refs.cityRef.current = e.target.value)}
          />
          {errors.city && <p className="text-sm text-red-600">{errors.city}</p>}
        </div>
        <div className="flex flex-col">
          <p className="mb-2 text-base font-semibold text-secondary">State</p>
          <Input
            placeholder="CA"
            value={state}
            onChange={(e) => {
              refs.stateRef.current = e.target.value;
              setState(refs.stateRef.current);
            }}
          />
          {errors.state && <p className="text-sm text-red-600">{errors.state}</p>}
        </div>
        <div className="flex flex-col">
          <p className="mb-2 text-base font-semibold text-secondary">Zip</p>
          <Input
            placeholder="Zip Code"
            defaultValue={refs.zipRef.current}
            onChange={(e) => (refs.zipRef.current = e.target.value)}
          />
          {errors.zip && <p className="text-sm text-red-600">{errors.zip}</p>}
        </div>
        <div className="flex flex-col">
          <p className="mb-2 text-base font-semibold text-secondary">Country</p>
          <Input
            placeholder="Country"
            defaultValue={refs.countryRef.current}
            onChange={(e) => (refs.countryRef.current = e.target.value)}
          />
          {errors.country && <p className="text-sm text-red-600">{errors.country}</p>}
        </div>
      </div>
      <div className="flex justify-end w-full pt-5 sm:pt-6 md:pt-8">
        <DialogSection
          fullName={fullName}
          setFullName={setFullName}
          refs={refs}
          state={state}
          setState={setState}
          dateOfBirth={dateOfBirth}
          setDateOfBirth={setDateOfBirth}
          handleNextStep={handleNextStep}
        />
      </div>
    </>
  );
}

export default PersonalInfoContainer;
