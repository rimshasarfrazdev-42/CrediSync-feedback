import React, { useState, useEffect, useRef } from 'react';
import FormStepHeader from '../../ui/form-step-header';
import { Input } from '../../ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../../../components/ui/select';
import DialogSection from '../../ui/dialogSection';
import { personalInfoSchema } from '../../../validator/personalInfoSchema';
import * as Yup from 'yup';
import { Button } from '../../ui/button';

function PersonalInfoContainer({ refs, errors, setErrors, handleNextStep }) {
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(refs.dateOfBirthRef.current);
  const [state, setState] = useState(refs.stateRef.current);
  const [gender, setGender] = useState(refs.genderRef.current || '');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  useEffect(() => {
    const first = refs.firstNameRef.current || '';
    const last = refs.lastNameRef.current || '';

    if (first || last) {
      setFullName(`${first} ${last}`.trim());
    } else {
      setFullName('');
    }
  }, []);
  const validateAndOpenDialog = async () => {
    const formData = {
      firstName: refs.firstNameRef.current,
      middleInitial: refs.middleInitialRef.current,
      lastName: refs.lastNameRef.current,
      otherName: refs.otherNameRef.current,
      dateOfBirth: dateOfBirth, 
      email: refs.emailRef.current,
      contact: refs.contactRef.current,
      gender: gender,
      address: refs.addressRef.current,
      city: refs.cityRef.current,
      state: state,
      zip: refs.zipRef.current,
      country: refs.countryRef.current,
    };

    try {
      await personalInfoSchema.validate(formData, { abortEarly: false });
      setErrors({});
      setIsDialogOpen(true);

    } catch (validationErrors) {
      const newErrors = {};
      if (validationErrors.inner) {
        validationErrors.inner.forEach(error => {
          newErrors[error.path] = error.message;
        });
      }
      setErrors(newErrors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  return (
    <>
      <FormStepHeader info="Personal Info" step="1" progress={17} />
      <div className="grid w-full grid-cols-1 gap-4 p-5 mt-5 border sm:grid-cols-2 md:grid-cols-3 min-h-96 rounded-3xl border-zinc-200">
        <div className="flex flex-col">

          <p className="mb-2 text-base font-semibold text-secondary">First Name<span className="text-red-500 ml-1">*</span></p>
          <Input
            placeholder="Enter First Name"
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
            placeholder="Enter Middle Initial"
            defaultValue={refs.middleInitialRef.current}
            onChange={(e) => (refs.middleInitialRef.current = e.target.value)}
          />
          {errors.middleInitial && <p className="text-sm text-red-600">{errors.middleInitial}</p>}
        </div>
        <div className="flex flex-col">
          <p className="mb-2 text-base font-semibold text-secondary">Last Name<span className="text-red-500 ml-1">*</span></p>
          <Input
            placeholder="Enter Last Name"
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
            placeholder="Enter other or previous name(s)"
            defaultValue={refs.otherNameRef.current}
            onChange={(e) => (refs.otherNameRef.current = e.target.value)}
          />
          {errors.otherName && <p className="text-sm text-red-600">{errors.otherName}</p>}
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-base font-semibold text-secondary">
            Date Of Birth<span className="ml-1 text-red-500">*</span>
          </label>

          <div className="relative">
            <Input
              placeholder="MM/DD/YYYY"
              value={dateOfBirth || ''}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="pr-12"
            />
            <span className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer">
              <input
                type="date"
                value={
                  dateOfBirth
                    ? dateOfBirth.split('/').reverse().join('-')
                    : ''
                }
                max={new Date().toISOString().split('T')[0]}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value) {
                    const [year, month, day] = value.split('-');
                    const formatted = `${month}/${day}/${year}`;
                    setDateOfBirth(formatted);
                  }
                }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
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

          {errors.dateOfBirth && (
            <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>
          )}
        </div>

        <div className="flex flex-col">
          <p className="mb-2 text-base font-semibold text-secondary">Email<span className="text-red-500 ml-1">*</span></p>
          <Input
            placeholder="you@hospital.org"
            defaultValue={refs.emailRef.current}
            onChange={(e) => (refs.emailRef.current = e.target.value)}
          />
          {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
        </div>
        <div className="flex flex-col">
          <p className="mb-2 text-base font-semibold text-secondary">Contact Number<span className="text-red-500 ml-1">*</span></p>
          <Input
            placeholder="(555) 201-1488"
            defaultValue={refs.contactRef.current}
            onChange={(e) => (refs.contactRef.current = e.target.value)}
          />
          {errors.contact && <p className="text-sm text-red-600">{errors.contact}</p>}
        </div>
        <div className="flex flex-col">
          <p className="mb-2 text-base font-semibold text-secondary">Gender<span className="text-red-500 ml-1">*</span></p>
          <Select
            value={gender || undefined}
            onValueChange={(value) => {
              setGender(value);
              refs.genderRef.current = value;
            }}
          >
            <SelectTrigger className="w-full h-10 border border-gray-300">
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-300">
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
          {errors.gender && <p className="text-sm text-red-600">{errors.gender}</p>}
        </div>
        <div className="flex flex-col">
          <p className="mb-2 text-base font-semibold">Address<span className="text-red-500 ml-1">*</span></p>
          <Input
            placeholder="1200 Lakeshore Dr, Suite 200"
            defaultValue={refs.addressRef.current}
            onChange={(e) => (refs.addressRef.current = e.target.value)}
          />
          {errors.address && <p className="text-sm text-red-600">{errors.address}</p>}
        </div>
        <div className="flex flex-col">
          <p className="mb-2 text-base font-semibold text-secondary">City<span className="text-red-500 ml-1">*</span></p>
          <Input
            placeholder="City"
            defaultValue={refs.cityRef.current}
            onChange={(e) => (refs.cityRef.current = e.target.value)}
          />
          {errors.city && <p className="text-sm text-red-600">{errors.city}</p>}
        </div>
        <div className="flex flex-col">
          <p className="mb-2 text-base font-semibold text-secondary">State<span className="text-red-500 ml-1">*</span></p>
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
          <p className="mb-2 text-base font-semibold text-secondary">Zip<span className="text-red-500 ml-1">*</span></p>
          <Input
            placeholder="Zip Code"
            defaultValue={refs.zipRef.current}
            onChange={(e) => (refs.zipRef.current = e.target.value)}
          />
          {errors.zip && <p className="text-sm text-red-600">{errors.zip}</p>}
        </div>
        <div className="flex flex-col">
          <p className="mb-2 text-base font-semibold text-secondary">Country<span className="text-red-500 ml-1">*</span></p>
          <Input
            placeholder="Country"
            defaultValue={refs.countryRef.current}
            onChange={(e) => (refs.countryRef.current = e.target.value)}
          />
          {errors.country && <p className="text-sm text-red-600">{errors.country}</p>}
        </div>
      </div>
      <div className="flex justify-end w-full pt-5 sm:pt-6 md:pt-8">
        <Button
          type="button" 
          onClick={validateAndOpenDialog}
        >
          Save & Next
        </Button>
        <DialogSection
          fullName={fullName}
          setFullName={setFullName}
          refs={refs}
          state={state}
          setState={setState}
          dateOfBirth={dateOfBirth}
          setDateOfBirth={setDateOfBirth}
          handleNextStep={handleNextStep}
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
        />
      </div>
    </>
  );
}

export default PersonalInfoContainer;
