
import React, { useEffect, useRef, useState } from "react";
import { uploadCredentialSchema } from "../../validator/uploadCredentialSchema";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


import HeaderSection from "./uploadHeaderSection";
import DocumentsSection from "./DocumentsSection";
import ProgressSidebar from "./ProgressSidebar";
import FooterSection from "./uploadFooterSection";
import { DOC_RULES, MAX_SIZE_BYTES, MAX_SIZE_MB } from "../../constants/uploadCredential/uploadConstant";

import CameraModal from "../Modals/uploadCredential/cameraModal";
import usePhotoVerification from "../../hooks/usePhotoverification";
import useDocsProgress from "../../hooks/useDocsProgress";
import useCameraCapture from "../../hooks/useCameraCapture";
import PhotoVerificationCard from "./PhotoVerificationCard";


function UploadCredentialsContainer() {
  const GovernmentID = useRef([]);
  const DegreeDiploma = useRef([]);
  const MedicalLicense = useRef([]);
  const BoardCertification = useRef([]);
  const CertificateOfInsurance = useRef([]);

  const DEAcertificate = useRef([]);
  const ResumeCV = useRef([]);
  const VaccinationProof = useRef([]);
  const SupportingDocuments = useRef([]);

  const navigate = useNavigate();

  const fileInputRef = useRef(null);
  const verification = useRef(null);

  const [fileData, setFileData] = useState(null);
  const [uploadedCount, setUploadedCount] = useState(0);
  const [errors, setErrors] = useState({});
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [tempPhoto, setTempPhoto] = useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const allDocs = [
    GovernmentID,
    DegreeDiploma,
    MedicalLicense,
    BoardCertification,
    CertificateOfInsurance,
    DEAcertificate,
    ResumeCV,
    VaccinationProof,
    SupportingDocuments,
  ];

  const { updateProgress } = useDocsProgress(allDocs, setUploadedCount);
const { openFilePicker, handleFileChanges, removeFile } = usePhotoVerification({
  fileInputRef,
  verification,
  setFileData,
  MAX_SIZE_BYTES,
  MAX_SIZE_MB,
});

  const { startCamera, stopCamera, capturePhoto, retakePhoto, savePhoto } = useCameraCapture({
    isCameraOpen,
    setIsCameraOpen,
    setTempPhoto,
    videoRef,
    canvasRef,
    tempPhoto,
    setFileData,
    verification,
  });

  const submitHandler = async () => {
    try {
      setErrors({});

      await uploadCredentialSchema.validate(
        {
          GovernmentID: GovernmentID.current,
          DegreeDiploma: DegreeDiploma.current,
          MedicalLicense: MedicalLicense.current,
          BoardCertification: BoardCertification.current,
          CertificateOfInsurance: CertificateOfInsurance.current,
          DEAcertificate: DEAcertificate.current,
          ResumeCV: ResumeCV.current,
          VaccinationProof: VaccinationProof.current,
          SupportingDocuments: SupportingDocuments.current,
        },
        { abortEarly: false }
      );

      const data = {
        governmentID: GovernmentID.current,
        degree: DegreeDiploma.current,
        medical: MedicalLicense.current,
        board: BoardCertification.current,
        Insurance: CertificateOfInsurance.current,
        DEA: DEAcertificate.current,
        resume: ResumeCV.current,
        vaccination: VaccinationProof.current,
        supportingDocs: SupportingDocuments.current,
      };

      console.log("Submitted Data: ", data);
      navigate("/login");
    } catch (err) {
      const formatted = {};
      err.inner?.forEach((e) => (formatted[e.path] = e.message));
      setErrors(formatted);
    }
  };

  const saveAndResumeHandler = () => {
    const savedDocs = {
      GovernmentID: GovernmentID.current || [],
      DegreeDiploma: DegreeDiploma.current || [],
      MedicalLicense: MedicalLicense.current || [],
      BoardCertification: BoardCertification.current || [],
      CertificateOfInsurance: CertificateOfInsurance.current || [],
      DEAcertificate: DEAcertificate.current || [],
      ResumeCV: ResumeCV.current || [],
      VaccinationProof: VaccinationProof.current || [],
      SupportingDocuments: SupportingDocuments.current || [],
    };

    localStorage.setItem("savedDocs", JSON.stringify(savedDocs));
    toast.success("Saved Successfully!");
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedDocs") || "{}");
    const toArray = (v) => (Array.isArray(v) ? v : v ? [v] : []);

    GovernmentID.current = toArray(saved.GovernmentID);
    DegreeDiploma.current = toArray(saved.DegreeDiploma);
    MedicalLicense.current = toArray(saved.MedicalLicense);
    BoardCertification.current = toArray(saved.BoardCertification);
    CertificateOfInsurance.current = toArray(saved.CertificateOfInsurance);

    DEAcertificate.current = toArray(saved.DEAcertificate);
    ResumeCV.current = toArray(saved.ResumeCV);
    VaccinationProof.current = toArray(saved.VaccinationProof);
    SupportingDocuments.current = toArray(saved.SupportingDocuments);

    updateProgress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refs = {
    GovernmentID,
    DegreeDiploma,
    MedicalLicense,
    BoardCertification,
    CertificateOfInsurance,
    DEAcertificate,
    ResumeCV,
    VaccinationProof,
    SupportingDocuments,
  };

  return (
    <>
      <div className="w-full mx-auto">
        <HeaderSection />

        <div className="grid w-full grid-cols-1 gap-6 px-4 mb-10 sm:px-6 lg:px-8 md:grid-cols-12">
          <div className="flex flex-col order-2 w-full gap-6 md:order-1 md:col-span-8">
             <PhotoVerificationCard
      verification={verification}
      fileData={fileData}
      openFilePicker={openFilePicker}
      startCamera={startCamera}
      removeFile={removeFile}
      fileInputRef={fileInputRef}
      handleFileChanges={handleFileChanges}
    />
            <DocumentsSection
              refs={refs}
              DOC_RULES={DOC_RULES}
              MAX_SIZE_BYTES={MAX_SIZE_BYTES}
              updateProgress={updateProgress}
              errors={errors}
              saveAndResumeHandler={saveAndResumeHandler}
              submitHandler={submitHandler}
            />
          </div>

          <ProgressSidebar uploadedCount={uploadedCount} />
        </div>

        <CameraModal
          isCameraOpen={isCameraOpen}
          stopCamera={stopCamera}
          tempPhoto={tempPhoto}
          videoRef={videoRef}
          canvasRef={canvasRef}
          capturePhoto={capturePhoto}
          retakePhoto={retakePhoto}
          savePhoto={savePhoto}
        />

        <FooterSection />
      </div>
    </>
  );
}

export default UploadCredentialsContainer;
