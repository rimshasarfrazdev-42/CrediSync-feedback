import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';
import { Checkbox } from '../../components/ui/checkbox';
import { AlertCircle, CheckCircle, Pencil, Clock4, Check, ShieldCheck, Shield } from 'lucide-react';
import { Input } from '../ui/input';

function DialogSection({
  handleNextStep,
  fullName,
  dateOfBirth,
  state,
  setFullName,
  setDateOfBirth,
  setState,
  refs,
  isDialogOpen,
  setIsDialogOpen,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    const nameParts = fullName.trim().split(' ');
    refs.firstNameRef.current = nameParts[0] || '';
    refs.lastNameRef.current = nameParts.slice(1).join(' ') || '';
    refs.fullNameRef.current = fullName;
    refs.dateOfBirthRef.current = dateOfBirth;
    refs.stateRef.current = state;

    setIsEditing(false);
  };

  const providerData = {
    fullName: 'John D. Smith',
    dateOfBirth: '08/17/1983',
    npiNumber: '1234567890',
    state: 'California',
  };
  const systemChecks = [
    {
      name: 'FSMB License Check',
      description: "Validates provider's medical license with FSMB.",
      status: 'Pending',
    },
    {
      name: 'ABMS Board Verification',
      description: 'Confirms specialty board certifications.',
      status: 'Pending',
    },
    {
      name: 'NPI Registry Confirmation',
      description: 'Confirms record match.',
      status: 'Verified',
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Verified':
        return <CheckCircle className="w-5 h-5 text-[#22C55E]" />;
      case 'Pending':
        return <Clock4 className="w-5 h-5 text-[#D7AE0B]" />;
      case 'Failed':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <>
      <Dialog
        className="!bg-white"
        open={isDialogOpen}
        onOpenChange={(open) => {
          if (!open && isEditing) {
            handleSave();
          }
          setIsDialogOpen(open);
        }}
      >
        <DialogContent
          className="
      w-[90%] max-w-full 
      sm:max-w-xl 
      md:max-w-4xl 
      2xl:max-w-6xl
      h-[80vh] sm:h-[80vh] md:h-[80vh] xl:h-[85vh] 2xl:h-[90vh]
      rounded-xl
      p-4 sm:p-6 md:p-8
      overflow-y-auto
      mx-auto my-1
      hide-scrollbar
      bg-white
    "
        >
          {/* 1. Dialog Header */}
          <DialogHeader className="flex flex-col items-center space-y-2 text-center bg-white">
            <DialogTitle className="text-[20px] font-semibold text-secondary mt-2">
              Confirm your information before we verify your credentials.
            </DialogTitle>
            <DialogDescription className="text-[16px] font-normal text-tertiary">
              We'll check for your licenses, board certifications, and sanctions records.
            </DialogDescription>
            <div className="flex w-full p-3 mt-2 space-x-2 text-sm font-normal border rounded-lg bg-primary/10 border-primary/30 text-primary">
              <ShieldCheck className="flex-shrink-0 w-6 h-6 mt-1 md:mt-0" />
              <p className="leading-relaxed text-left sm:text-start">
                Your information is securely verified against official medical databases. No PHI is shared without your
                consent.
              </p>
            </div>
          </DialogHeader>

          <div className="py-4 space-y-4">
            {/* 2. Review Your Details Section */}
            <section className="p-4 space-y-4 border shadow-sm rounded-xl">
              <div className="flex items-start justify-between gap-8 sm:items-center">
                <h3 className="text-lg font-medium text-secondary">Review Your Details</h3>
                <Button
                  variant="ghost"
                  className="text-primary hover:bg-primary/10 font-semibold text-[16px] mt-1 sm:mt-0"
                  onClick={() => {
                    if (isEditing) handleSave();
                    else setIsEditing(true);
                  }}
                >
                  {isEditing ? <Check className="w-4 h-4" /> : <Pencil className="w-4 h-4 " />}
                  {isEditing ? 'Save' : 'Edit'}
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Full Name */}
                <div className="space-y-1">
                  <label htmlFor="fullName" className="text-sm font-medium text-secondary">
                    Full Name
                  </label>
                  <Input
                    placeholder="John D.Smith"
                    value={fullName || ''}
                    className={`border-gray-300 ${!isEditing ? 'bg-gray-50 pointer-events-none' : ''}`}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                {/* Date of Birth */}
                <div className="space-y-1">
                  <label htmlFor="dob" className="text-sm font-medium text-secondary">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <Input
                      placeholder="MM/DD/YYYY"
                      value={dateOfBirth || ''}
                      onChange={(e) => {
                        setDateOfBirth(e.target.value);
                        if (isEditing) {
                          refs.dateOfBirthRef.current = e.target.value;
                        }
                      }}
                      readOnly={!isEditing}
                      className={`pr-12 border-gray-300 ${!isEditing ? 'bg-gray-50' : ''}`}
                    />
                    <span className="absolute inset-y-0 flex items-center text-gray-400 cursor-pointer right-3">
                      <input
                        type="date"
                        disabled={!isEditing}
                        value={dateOfBirth ? dateOfBirth.split('/').reverse().join('-') : ''}
                        max={new Date().toISOString().split('T')[0]}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value) {
                            const [year, month, day] = value.split('-');
                            const formatted = `${month}/${day}/${year}`;
                            setDateOfBirth(formatted);
                            refs.dateOfBirthRef.current = formatted;
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
                          cursor: isEditing ? 'pointer' : 'default',
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
                </div>

                {/* NPI Number */}
                <div className="space-y-1">
                  <label htmlFor="npi" className="text-sm font-medium text-secondary">
                    NPI Number
                  </label>
                  <Input
                    placeholder="1234567890"
                    // value={providerData.npiNumber}
                    className="border-gray-300 pointer-events-none bg-gray-50"
                    readOnly
                  />
                </div>

                {/* State */}
                <div className="space-y-1">
                  <label htmlFor="state" className="text-sm font-medium text-secondary">
                    State
                  </label>
                  <Input
                    placeholder="California"
                    value={state}
                    className={`border-gray-300 ${!isEditing ? 'bg-gray-50 pointer-events-none' : ''}`}
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>
              </div>
            </section>

            {/* 3. System Checks Overview Section */}
            <section className="p-4 space-y-2 border shadow-sm rounded-xl">
              <h3 className="text-lg font-medium text-secondary">System Checks Overview</h3>

              <div className="grid gap-4">
                {systemChecks.map((check, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-start justify-between p-4 transition-shadow border rounded-lg sm:flex-row sm:items-center hover:shadow-md"
                  >
                    {/* Icon */}
                    <div className="flex items-center flex-shrink-0 w-10 h-10 sm:justify-center text-primary">
                      <Shield size={30} />
                    </div>

                    {/* Name & Description */}
                    <div className="flex flex-col flex-1 mt-2 sm:mt-0 sm:ml-4">
                      <p className="font-medium text-[18px]">{check.name}</p>
                      <p className="text-[16px] font-normal text-tertiary">{check.description}</p>
                    </div>

                    {/* Status */}
                    <div className="flex items-center mt-2 space-x-2 sm:mt-0">
                      <span
                        className={`text-sm font-normal ${
                          check.status === 'Verified' ? 'text-green-500' : 'text-yellow-600'
                        }`}
                      >
                        {check.status}
                      </span>
                      {getStatusIcon(check.status)}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. Consent Checkbox */}
            <div className="flex p-4 border rounded-lg shadow-sm sm:flex-row sm:items-start sm:space-x-4">
              <div className="flex-shrink-0 mt-1 sm:mt-0">
                <input
                  id="consent"
                  type="checkbox"
                  required
                  className="w-4 h-4 border border-gray-400 rounded-sm accent-primary focus:ring-0"
                />
              </div>
              <div className="flex flex-col ml-2 sm:ml-0">
                <label htmlFor="consent" className="text-sm font-medium leading-snug text-secondary sm:leading-none">
                  I consent to CrediSync retrieving my professional records for credentialing verification.
                </label>
                <p className="mt-1 text-sm font-normal text-tertiary sm:mt-1">
                  This consent is required to begin automated checks.
                </p>
              </div>
            </div>
          </div>

          {/* 5. Dialog Footer */}
          <DialogFooter className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
            <DialogClose asChild>
              <Button className="w-full text-[16px] font-semibold text-tertiary bg-white border border-tertiary rounded-md">
                Back to Personal Info
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="w-full text-[16px] font-semibold"
              onClick={() => {
                refs.dateOfBirthRef.current = dateOfBirth;
                handleNextStep();
              }}
            >
              Run System Checks
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DialogSection;
