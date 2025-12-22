
import { Button } from '../../components/ui/button';
import { affiliationSchema } from '../../validator/affiliationInfoSchema';
import { educationSchema } from '../../validator/educationInfoSchema';
import { insuranceSchema } from '../../validator/insuranceInfoSchema';
import { licenseSchema } from '../../validator/licenseSchema';
import { documentSchema } from '../../validator/otherDocumentSchema';
import { personalInfoSchema } from '../../validator/personalInfoSchema';
import React, { useRef, useState } from 'react';
import PersonalInfoContainer from '../../components/onboarding/personal-info/personalnfoContainer';
import EducationInfoContainer from '../../components/onboarding/education-info/educationInfoContainer';
import AffiliationInfoContainer from '../../components/onboarding/affiliation-info/affiliationInfoContainer';
import LicenseCertificationContainer from '../../components/onboarding/license-certificaiton/licenseCertificaitonContainer';
import InsuranceInfoContainer from '../../components/onboarding/insurance-info/insuranceInfoContainer';
import OtherDocumentContainer from '../../components/onboarding/other-document/otherDocumentContainer';

function OnBoarding() {
  const [step, setStep] = useState(1);
  const [rerender, setRerender] = useState(0);
  const [errors, setErrors] = useState({});

  const firstNameRef = useRef('');
  const middleInitialRef = useRef('');
  const lastNameRef = useRef('');
  const fullNameRef = useRef('');
  const otherNameRef = useRef('');
  const dateOfBirthRef = useRef('');
  const emailRef = useRef('');
  const contactRef = useRef('');
  const genderRef = useRef('');
  const addressRef = useRef('');
  const cityRef = useRef('');
  const stateRef = useRef('');
  const zipRef = useRef('');
  const countryRef = useRef('');

  const licenseNumberRef = useRef('');
  const issuingStateRef = useRef('');
  const issueDateRef = useRef('');
  const expiryDateRef = useRef('');
  const boardNameRef = useRef('');
  const specialtyRef = useRef('');
  const uploadLicenseRef = useRef(null);
  const uploadCertificateRef = useRef(null);
  const fileLicenseInputRef = useRef(null);
  const fileCertificateInputRef = useRef(null);

  const educationFormsRef = useRef([
    {
      id: Date.now(),
      institution: '',
      degree: '',
      specialty: '',
      startDate: '',
      endDate: '',
      uploadDiploma: null,
      fileInputRef: React.createRef(),
    },
  ]);
  const affiliationFormsRef = useRef([
    {
      id: Date.now(),
      hospital: '',
      startDate: '',
      endDate: '',
    },
  ]);

  const InsuranceFormsRef = useRef([
    {
      id: Date.now(),
      insurerName: '',
      policyNumber: '',
      coverageLimits: '',
      startDate: '',
      endDate: '',
      uploadCertificate: null,
      fileInputRef: React.createRef(),
    },
  ]);
  const documentFormsRef = useRef([
    {
      id: Date.now(),
      documentType: '',
      issueDate: '',
      expiryDate: '',
      uploadFile: null,
      fileInputRef: React.createRef(),
    },
  ]);

  // ============= Add More forms logic area ===============
  const addMoreForm = () => {
    educationFormsRef.current.push({
      id: Date.now() + Math.random(),
      institution: '',
      degree: '',
      specialty: '',
      startDate: '',
      endDate: '',
      uploadDiploma: null,
      fileInputRef: React.createRef(),
    });
    setRerender((prev) => prev + 1);
  };
  const addMoreAffiliationForm = () => {
    affiliationFormsRef.current.push({
      id: Date.now() + Math.random(),
      hospital: '',
      startDate: '',
      endDate: '',
    });
    setRerender((prev) => prev + 1);
  };
  const addMoreInsuranceForm = () => {
    InsuranceFormsRef.current.push({
      id: Date.now() + Math.random(),
      insurerName: '',
      policyNumber: '',
      coverageLimits: '',
      startDate: '',
      endDate: '',
      uploadCertificate: null,
      fileInputRef: React.createRef(),
    });
    setRerender((prev) => prev + 1);
  };
  const addMoreDocumentForm = () => {
    documentFormsRef.current.push({
      id: Date.now() + Math.random(),
      documentType: '',
      issueDate: '',
      expiryDate: '',
      uploadFile: null,
      fileInputRef: React.createRef(),
    });
    setRerender((prev) => prev + 1);
  };
  // ============= Delete forms logic area ===============
  const deleteForm = (id) => {
    educationFormsRef.current = educationFormsRef.current.filter((block) => block.id !== id);
    setRerender((prev) => prev + 1);
  };

  const deleteAffiliationForm = (id) => {
    affiliationFormsRef.current = affiliationFormsRef.current.filter((block) => block.id !== id);
    setRerender((prev) => prev + 1);
  };
  const deleteInsuranceForm = (id) => {
    InsuranceFormsRef.current = InsuranceFormsRef.current.filter((block) => block.id !== id);
    setRerender((prev) => prev + 1);
  };
  const deleteDocumetForm = (id) => {
    documentFormsRef.current = documentFormsRef.current.filter((block) => block.id !== id);
    setRerender((prev) => prev + 1);
  };

  // Reference object for personal info
  const allRefs = {
    firstNameRef,
    middleInitialRef,
    lastNameRef,
    otherNameRef,
    fullNameRef,
    dateOfBirthRef,
    emailRef,
    contactRef,
    genderRef,
    addressRef,
    cityRef,
    stateRef,
    zipRef,
    countryRef,
  };

  const licenseRefs = {
    licenseNumberRef,
    issuingStateRef,
    issueDateRef,
    expiryDateRef,
    boardNameRef,
    specialtyRef,
    uploadLicenseRef,
    uploadCertificateRef,
    fileLicenseInputRef,
    fileCertificateInputRef,
  };

  // Validation
  const handleNextStep = async () => {
    try {
      if (step === 1) {
        await personalInfoSchema.validate(
          {
            firstName: firstNameRef.current,
            middleInitial: middleInitialRef.current,
            fullName: fullNameRef.current,
            lastName: lastNameRef.current,
            otherName: otherNameRef.current,
            dateOfBirth: dateOfBirthRef.current,
            email: emailRef.current,
            contact: contactRef.current,
            gender: genderRef.current,
            address: addressRef.current,
            city: cityRef.current,
            state: stateRef.current,
            zip: zipRef.current,
            country: countryRef.current,
          },
          { abortEarly: false },
        );
      }

      if (step === 2) await educationSchema.validate({ Education: educationFormsRef.current }, { abortEarly: false });
      if (step === 3)
        await affiliationSchema.validate({ Affiliation: affiliationFormsRef.current }, { abortEarly: false });
      if (step === 4)
        await licenseSchema.validate({
          licenseNumber: licenseNumberRef.current,
          issuingState: issuingStateRef.current,
          issueDate: issueDateRef.current,
          expiryDate: expiryDateRef.current,
          boardName: boardNameRef.current,
          specialty: specialtyRef.current,
          uploadLicense: uploadLicenseRef.current,
          uploadCertificate: uploadCertificateRef.current,
        },
        { abortEarly: false }
      );
      if (step === 5) {
        await insuranceSchema.validate({ Insurance: InsuranceFormsRef.current }, { abortEarly: false });
      }
      if (step === 6) await documentSchema.validate({ Documents: documentFormsRef.current }, { abortEarly: false });

      setStep(step + 1);
    } catch (err) {
      const formattedErrors = {};
      err.inner.forEach((e) => {
        formattedErrors[e.path] = e.message;
      });
      setErrors(formattedErrors);
    }
  };

  // VALIDATE ALL STEPS TOGETHER (USED IN FINAL SUBMIT)
  const validateAllSteps = async () => {
    await personalInfoSchema.validate(
      {
        firstName: firstNameRef.current,
        middleInitial: middleInitialRef.current,
        lastName: lastNameRef.current,
        otherName: otherNameRef.current,
        fullName: fullNameRef.current,
        dateOfBirth: dateOfBirthRef.current,
        email: emailRef.current,
        contact: contactRef.current,
        gender: genderRef.current,
        address: addressRef.current,
        city: cityRef.current,
        state: stateRef.current,
        zip: zipRef.current,
        country: countryRef.current,
      },
      { abortEarly: false },
    );

    await educationSchema.validate({ Education: educationFormsRef.current }, { abortEarly: false });

    await affiliationSchema.validate({ Affiliation: affiliationFormsRef.current }, { abortEarly: false });

    await licenseSchema.validate(
      {
        licenseNumber: licenseNumberRef.current,
        issuingState: issuingStateRef.current,
        issueDate: issueDateRef.current,
        expiryDate: expiryDateRef.current,
        boardName: boardNameRef.current,
        specialty: specialtyRef.current,
        uploadLicense: uploadLicenseRef.current,
        uploadCertificate: uploadCertificateRef.current,
      },
      { abortEarly: false }
    );

    await insuranceSchema.validate({ Insurance: InsuranceFormsRef.current }, { abortEarly: false });

    await documentSchema.validate({ Documents: documentFormsRef.current }, { abortEarly: false });
  };

  // Submit Form

  const handleSubmit = async () => {
    try {
      // FULL VALIDATION
      setErrors({});
      await validateAllSteps();

      const educationData = educationFormsRef.current.map(({ fileInputRef, ...rest }) => rest);
      const insuranceData = InsuranceFormsRef.current.map(({ fileInputRef, ...rest }) => rest);
      const DocumentData = documentFormsRef.current.map(({ fileInputRef, ...rest }) => rest);

      const finalData = {
        firstName: firstNameRef.current,
        middleInitial: middleInitialRef.current,
        lastName: lastNameRef.current,
        otherName: otherNameRef.current,
        fullName: fullNameRef.current,
        dateOfBirth: dateOfBirthRef.current,
        email: emailRef.current,
        contact: contactRef.current,
        gender: genderRef.current,
        address: addressRef.current,
        city: cityRef.current,
        state: stateRef.current,
        zip: zipRef.current,
        country: countryRef.current,

        licenseNumber: licenseNumberRef.current,
        issuingState: issuingStateRef.current,
        issueDate: issueDateRef.current,
        expiryDate: expiryDateRef.current,
        boardName: boardNameRef.current,
        specialty: specialtyRef.current,
        uploadLicense: uploadLicenseRef.current,
        uploadCertificate: uploadCertificateRef.current,

        Affiliation: affiliationFormsRef.current,
        Education: educationData,
        Insurance: insuranceData,
        Documents: DocumentData,
      };

      console.log('FINAL JSON:', finalData);
      return true;
    } catch (err) {
      const formatted = {};
      err.inner?.forEach((e) => (formatted[e.path] = e.message));
      setErrors(formatted);
      console.log('VALIDATION FAILED', formatted);
      return false;
    }
  };

  return (
    <>
      {/* header section */}
      <div className="w-full px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <div className="flex flex-col w-full gap-3 p-5 bg-white border shadow-sm rounded-3xl border-zinc-200 sm:p-6 lg:p-8">
          {/* Heading */}
          <p className="text-[20px] sm:text-[28px] lg:text-[39px] font-semibold text-[#111827] leading-snug">
            Provider Onboarding
          </p>
          {/* Sub Text */}
          <p className="text-sm sm:text-base lg:text-[18px] text-subtext font-medium leading-relaxed">
            Complete the steps to finish your profile. Your data is stored securely and PHI-safe.
          </p>
        </div>
      </div>
      {/* content section */}
      <div className="w-full px-5 bg-transparent pb-8 sm:px-6 lg:px-8">
        <div className="w-full p-5  bg-white border shadow-sm rounded-3xl border-zinc-200 sm:p-6 lg:p-8">
          {step === 1 ? (
            <PersonalInfoContainer
              step={step}
              setStep={setStep}
              handleNextStep={handleNextStep}
              refs={allRefs}
              submit={handleSubmit}
              errors={errors}
              setErrors={setErrors}
            />
          ) : step === 2 ? (
            <EducationInfoContainer
              educationFormsRef={educationFormsRef}
              addMoreForm={addMoreForm}
              deleteForm={deleteForm}
              setRerender={setRerender}
              errors={errors}
            />
          ) : step === 3 ? (
            <AffiliationInfoContainer
              affiliationFormsRef={affiliationFormsRef}
              addMoreAffiliationForm={addMoreAffiliationForm}
              deleteAffiliationForm={deleteAffiliationForm}
              errors={errors}
              setRerender={setRerender}
            />
          ) : step === 4 ? (
            <LicenseCertificationContainer licenseRefs={licenseRefs} setRerender={setRerender} errors={errors} />
          ) : step === 5 ? (
            <InsuranceInfoContainer
              InsuranceFormsRef={InsuranceFormsRef}
              addMoreInsuranceForm={addMoreInsuranceForm}
              deleteInsuranceForm={deleteInsuranceForm}
              setRerender={setRerender}
              errors={errors}
            />
          ) : (
            <OtherDocumentContainer
              step={step}
              setStep={setStep}
              documentFormsRef={documentFormsRef}
              addMoreDocumentForm={addMoreDocumentForm}
              deleteDocumetForm={deleteDocumetForm}
              setRerender={setRerender}
              handleSubmit={handleSubmit}
              errors={errors}
            />
          )}
          <div className="flex justify-between w-full mt-5">
            {step > 1 && step !== 6 ? (
              <Button
                onClick={() => setStep(step - 1)}
                className="px-8 bg-transparent border text-secondary hover:bg-gray-100"
              >
                Back
              </Button>
            ) : (
              <></>
            )}
            {step > 1 && step < 6 ? <Button className='!bg-primary !text-white' onClick={handleNextStep}>Save & Next</Button> : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default OnBoarding;
