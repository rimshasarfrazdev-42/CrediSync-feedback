import React from "react";

import DragAndDrop from "../upload-credentials/dragAndDrop";
import { ShieldCheck } from "lucide-react";
import { Button } from "../../components/ui/button";
import CardHeader from '../ui/cardHeader';
export default function DocumentsSection({
  refs,
  DOC_RULES,
  MAX_SIZE_BYTES,
  updateProgress,
  errors,
  saveAndResumeHandler,
  submitHandler,
}) {
  const {
    GovernmentID,
    DegreeDiploma,
    MedicalLicense,
    BoardCertification,
    CertificateOfInsurance,
    DEAcertificate,
    ResumeCV,
    VaccinationProof,
    SupportingDocuments,
  } = refs;

  return (
    <>
      <div className="w-full">
        <p className="text-xl font-medium text-subtext">Required Documents</p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Government ID */}
        <div className="p-5 bg-white border shadow-sm rounded-3xl border-zinc-200">
          <CardHeader
            heading="Government-issued ID"
            subText="Identity Verification • Driver's License, Passport, or State ID"
            status={GovernmentID.current.length ? "Uploaded" : "Pending"}
          />
          <DragAndDrop
            imageContainer={GovernmentID}
            savedImages={GovernmentID.current}
            accept={DOC_RULES.GovernmentID.accept}
            allowedTypes={DOC_RULES.GovernmentID.allowedTypes}
            label={DOC_RULES.GovernmentID.label}
            maxBytes={MAX_SIZE_BYTES}
            multiple
            onUpdate={updateProgress}
          />
          {errors.GovernmentID && <div className="mt-2 text-red-600">{errors.GovernmentID}</div>}
        </div>

        {/* Degree */}
        <div className="p-5 bg-white border shadow-sm rounded-3xl border-zinc-200">
          <CardHeader
            heading="Degree / Diploma"
            subText="Education Verification • MD, DO, NP, or PA Degree Certificate"
            status={DegreeDiploma.current.length ? "Uploaded" : "Pending"}
          />
          <DragAndDrop
            imageContainer={DegreeDiploma}
            savedImages={DegreeDiploma.current}
            accept={DOC_RULES.DegreeDiploma.accept}
            allowedTypes={DOC_RULES.DegreeDiploma.allowedTypes}
            label={DOC_RULES.DegreeDiploma.label}
            maxBytes={MAX_SIZE_BYTES}
            multiple
            onUpdate={updateProgress}
          />
          {errors.DegreeDiploma && <div className="mt-2 text-red-600">{errors.DegreeDiploma}</div>}
        </div>

        {/* Medical */}
        <div className="p-5 bg-white border shadow-sm rounded-3xl border-zinc-200">
          <CardHeader
            heading="Medical License(s)"
            subText="Professional License • State medical licenses (upload multiple if needed)"
            status={MedicalLicense.current.length ? "Uploaded" : "Pending"}
          />
          <DragAndDrop
            imageContainer={MedicalLicense}
            savedImages={MedicalLicense.current}
            accept={DOC_RULES.MedicalLicense.accept}
            allowedTypes={DOC_RULES.MedicalLicense.allowedTypes}
            label={DOC_RULES.MedicalLicense.label}
            maxBytes={MAX_SIZE_BYTES}
            multiple
            onUpdate={updateProgress}
          />
          {errors.MedicalLicense && <div className="mt-2 text-red-600">{errors.MedicalLicense}</div>}
        </div>

        {/* Board */}
        <div className="p-5 bg-white border shadow-sm rounded-3xl border-zinc-200">
          <CardHeader
            heading="Board Certification(s)"
            subText="Board Certification • ABMS or AOA Certification documents"
            status={BoardCertification.current.length ? "Uploaded" : "Pending"}
          />
          <DragAndDrop
            imageContainer={BoardCertification}
            savedImages={BoardCertification.current}
            accept={DOC_RULES.BoardCertification.accept}
            allowedTypes={DOC_RULES.BoardCertification.allowedTypes}
            label={DOC_RULES.BoardCertification.label}
            maxBytes={MAX_SIZE_BYTES}
            multiple
            onUpdate={updateProgress}
          />
          {errors.BoardCertification && <div className="mt-2 text-red-600">{errors.BoardCertification}</div>}
        </div>

        {/* COI */}
        <div className="p-5 bg-white border shadow-sm rounded-3xl border-zinc-200">
          <CardHeader
            heading="Certificate of Insurance (COI)"
            subText="Malpractice Insurance • Current professional liability coverage"
            status={CertificateOfInsurance.current.length ? "Uploaded" : "Pending"}
          />
          <DragAndDrop
            imageContainer={CertificateOfInsurance}
            savedImages={CertificateOfInsurance.current}
            accept={DOC_RULES.CertificateOfInsurance.accept}
            allowedTypes={DOC_RULES.CertificateOfInsurance.allowedTypes}
            label={DOC_RULES.CertificateOfInsurance.label}
            maxBytes={MAX_SIZE_BYTES}
            multiple
            onUpdate={updateProgress}
          />
          {errors.CertificateOfInsurance && <div className="mt-2 text-red-600">{errors.CertificateOfInsurance}</div>}
        </div>
      </div>

      {/* Optional */}
      <div className="w-full">
        <p className="text-xl font-medium text-secondary">Optional Documents</p>
        <p className="text-[16px] font-normal text-subtext">
          These documents help expedite your verification but are not required to continue.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* DEA */}
        <div className="p-5 bg-white border shadow-sm rounded-3xl border-zinc-200">
          <CardHeader
            heading="DEA Certificate"
            subText="DEA / Controlled Substance • Required if prescribing"
            status={DEAcertificate.current.length ? "Uploaded" : "Pending"}
          />
          <DragAndDrop
            imageContainer={DEAcertificate}
            savedImages={DEAcertificate.current}
            accept={DOC_RULES.DEAcertificate.accept}
            allowedTypes={DOC_RULES.DEAcertificate.allowedTypes}
            label={DOC_RULES.DEAcertificate.label}
            maxBytes={MAX_SIZE_BYTES}
            multiple
            onUpdate={updateProgress}
          />
          {errors.DEAcertificate && <div className="mt-2 text-red-600">{errors.DEAcertificate}</div>}
        </div>

        {/* Resume */}
        <div className="p-5 bg-white border shadow-sm rounded-3xl border-zinc-200">
          <CardHeader
            heading="Resume or Curriculum Vitae"
            subText="CV / Resume • PDF or Word format"
            status={ResumeCV.current.length ? "Uploaded" : "Pending"}
          />
          <DragAndDrop
            imageContainer={ResumeCV}
            savedImages={ResumeCV.current}
            accept={DOC_RULES.ResumeCV.accept}
            allowedTypes={DOC_RULES.ResumeCV.allowedTypes}
            label={DOC_RULES.ResumeCV.label}
            maxBytes={MAX_SIZE_BYTES}
            multiple
            onUpdate={updateProgress}
          />
          {errors.ResumeCV && <div className="mt-2 text-red-600">{errors.ResumeCV}</div>}
        </div>

        {/* Vaccination */}
        <div className="p-5 bg-white border shadow-sm rounded-3xl border-zinc-200">
          <CardHeader
            heading="Vaccination Proof"
            subText="Immunization / Health Records • COVID, Flu, or required immunizations"
            status={VaccinationProof.current.length ? "Uploaded" : "Pending"}
          />
          <DragAndDrop
            imageContainer={VaccinationProof}
            savedImages={VaccinationProof.current}
            accept={DOC_RULES.VaccinationProof.accept}
            allowedTypes={DOC_RULES.VaccinationProof.allowedTypes}
            label={DOC_RULES.VaccinationProof.label}
            maxBytes={MAX_SIZE_BYTES}
            multiple
            onUpdate={updateProgress}
          />
          {errors.VaccinationProof && <div className="mt-2 text-red-600">{errors.VaccinationProof}</div>}
        </div>

        {/* Supporting */}
        <div className="p-5 bg-white border shadow-sm rounded-3xl border-zinc-200">
          <CardHeader
            heading="Supporting Documents"
            subText="Miscellaneous • Background Check, CME certificates, etc."
            status={SupportingDocuments.current.length ? "Uploaded" : "Pending"}
          />
          <DragAndDrop
            imageContainer={SupportingDocuments}
            savedImages={SupportingDocuments.current}
            accept={DOC_RULES.SupportingDocuments.accept}
            allowedTypes={DOC_RULES.SupportingDocuments.allowedTypes}
            label={DOC_RULES.SupportingDocuments.label}
            maxBytes={MAX_SIZE_BYTES}
            multiple
            onUpdate={updateProgress}
          />
          {errors.SupportingDocuments && <div className="mt-2 text-red-600">{errors.SupportingDocuments}</div>}
        </div>
      </div>

      {/* Security Info */}
      <div className="flex p-4 space-x-2 text-base border rounded-lg bg-primary bg-opacity-10 border-primary border-opacity-30 text-primary">
        <ShieldCheck size={10} className="w-20 h-4 mt-1 sm:w-8 md:w-8" />
        <p>
          <span className="font-bold">Document Security: </span>
          All files are encrypted in transit and at rest. You can always manage or update your documents later from your
          Credential Vault.
        </p>
      </div>

      {/* Bottom Buttons */}
      <div className="flex flex-col w-full gap-4 mt-4 sm:flex-row">
        <Button
          className="w-full bg-transparent border-[1px] border-tertiary order-2 sm:order-1 text-tertiary text-[16px] font-semibold"
          onClick={saveAndResumeHandler}
        >
          Save and Resume Later
        </Button>
        <Button
          className="!bg-primary w-full !text-white text-[16px] sm:order-2 order-1 font-semibold"
          onClick={submitHandler}
        >
          Continue to Verification
        </Button>
      </div>
    </>
  );
}
