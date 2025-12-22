import React, { useEffect, useRef, useState } from 'react';
import { Lock, Camera, Upload, ShieldCheck, CircleCheck, Trash2, Image, X } from 'lucide-react';
import CardHeader from '../ui/cardHeader';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import DragAndDrop from '../ui/dragAndDrop';
import { Input } from '../ui/input';
import { uploadCredentialSchema } from '../../validator/uploadCredentialSchema';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';


function UploadCredentialsContainer() {
  const GovernmentID = useRef(null);
  const DegreeDiploma = useRef(null);
  const MedicalLicense = useRef(null);
  const BoardCertification = useRef(null);
  const CertificateOfInsurance = useRef(null);
  const navigate = useNavigate();
  //optional docs refs
  const DEAcertificate = useRef(null);
  const ResumeCV = useRef(null);
  const VaccinationProof = useRef(null);
  const SupportingDocuments = useRef(null);

  // For photo verification section
  const fileInputRef = useRef(null);
  const verification = useRef(null);
  const [fileData, setFileData] = useState(null);
  const [uploadedCount, setUploadedCount] = useState(0);
  const [errors, setErrors] = useState({});
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [tempPhoto, setTempPhoto] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null)

  const openFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChanges = (e) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Invalid file format", {
          description: "Please upload a JPG or PNG image.",
        });
        e.target.value = '';
        return;
      }
      const MAX_SIZE_MB = 5;
      const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
      if (file.size > MAX_SIZE_BYTES) {
        toast.error("File too large", {
          description: `The photo must be smaller than ${MAX_SIZE_MB}MB.`,
        });
        e.target.value = '';
        return;
      }

      setFileData(file);
      const previewURL = URL.createObjectURL(file);
      verification.current = previewURL;
    }
  };
  const removeFile = () => {
    setFileData(null);
    verification.current = null;
  };

  // Below thing is for tracking upload progress
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

  const updateProgress = () => {
    let count = 0;
    allDocs.forEach((ref) => {
      if (ref.current !== null) count++;
    });

    setUploadedCount(count);
  };

  // Submit Handler function
  const submitHandler = async () => {
    try {
      setErrors({})
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
        { abortEarly: false },
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
      console.log('Submitted Data: ', data);
    } catch (err) {
      const formatted = {};
      err.inner?.forEach((e) => (formatted[e.path] = e.message));
      setErrors(formatted);
    }
    navigate("/verification");
  };

  // Save and resume function can be implemented here
  const saveAndResumeHandler = () => {
    const savedDocs = {
      GovernmentID: GovernmentID.current,
      DegreeDiploma: DegreeDiploma.current,
      MedicalLicense: MedicalLicense.current,
      BoardCertification: BoardCertification.current,
      CertificateOfInsurance: CertificateOfInsurance.current,
      DEAcertificate: DEAcertificate.current,
      ResumeCV: ResumeCV.current,
      VaccinationProof: VaccinationProof.current,
      SupportingDocuments: SupportingDocuments.current,
    };

    localStorage.setItem('savedDocs', JSON.stringify(savedDocs));
    toast.success('Saved Successfully!');
  };

  // Load saved data on component mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedDocs') || '{}');

    if (saved.GovernmentID) GovernmentID.current = saved.GovernmentID;
    if (saved.DegreeDiploma) DegreeDiploma.current = saved.DegreeDiploma;
    if (saved.MedicalLicense) MedicalLicense.current = saved.MedicalLicense;
    if (saved.BoardCertification) BoardCertification.current = saved.BoardCertification;
    if (saved.CertificateOfInsurance) CertificateOfInsurance.current = saved.CertificateOfInsurance;

    if (saved.DEAcertificate) DEAcertificate.current = saved.DEAcertificate;
    if (saved.ResumeCV) ResumeCV.current = saved.ResumeCV;
    if (saved.VaccinationProof) VaccinationProof.current = saved.VaccinationProof;
    if (saved.SupportingDocuments) SupportingDocuments.current = saved.SupportingDocuments;

    updateProgress();
  }, []);

  const startCamera = async () => {
    setTempPhoto(null);
    setIsCameraOpen(true)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraOpen(true);
      }
    } catch (err) {
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        toast.error("Camera Access Denied", {
          description: "Please allow camera access in your browser settings to verify your identity.",
        });
      } else {
        toast.error("Camera Error", { description: "Could not find a working camera." });
      }
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    stream?.getTracks().forEach(track => track.stop());
    setIsCameraOpen(false);
    setTempPhoto(null);
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setTempPhoto(dataUrl);

      const stream = video.srcObject;
      stream?.getTracks().forEach(track => track.stop());
    }
  };
  const retakePhoto = () => {
    startCamera(); // Restart stream
  };

  const savePhoto = () => {
    const byteString = atob(tempPhoto.split(',')[1]);
    const mimeString = tempPhoto.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) { ia[i] = byteString.charCodeAt(i); }

    const blob = new Blob([ab], { type: mimeString });
    const file = new File([blob], "identity-capture.jpg", { type: "image/jpeg" });

    setFileData(file);
    verification.current = URL.createObjectURL(file);
    setIsCameraOpen(false);
    setTempPhoto(null);
    updateProgress();
  };

  useEffect(() => {
    if (!isCameraOpen) return;

    const startStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        setIsCameraOpen(false);

        if (err.name === "NotAllowedError") {
          toast.error("Camera Access Denied", {
            description: "Please allow camera access in browser settings.",
          });
        } else {
          toast.error("Camera Error", {
            description: "Unable to access camera.",
          });
        }
      }
    };

    startStream();

    return () => {
      const stream = videoRef.current?.srcObject;
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, [isCameraOpen]);
  return (
    <>
      {/* Outer Container for max width */}
      <div className="w-full mx-auto">
        {/* Header Section */}
        <div className="w-full px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-10 ">
          <div className="flex flex-col w-full gap-4 p-5  border shadow-sm rounded-3xl border-zinc-200 sm:p-6 lg:p-8">
            <p className="text-3xl sm:text-[39px] font-semibold text-secondary leading-tight">
              Upload Your Credentials
            </p>

            <p className="text-sm sm:text-[18px] text-subtext font-medium">
              Upload your key credentialing documents securely.
            </p>

            <div className="flex items-start md:items-center gap-3 p-4 text-sm font-normal border rounded-lg bg-primary bg-opacity-10 border-primary border-opacity-30 text-primary sm:text-base">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-lock shrink-0 mt-0.5 md:mt-0"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span>All uploads are encrypted and stored securely per HIPAA & SOC 2 standards.</span>
            </div>
          </div>
        </div>

        {/* CONTENT GRID */}
        <div className="grid w-full grid-cols-1 gap-6 px-4 mb-10 sm:px-6 lg:px-8 md:grid-cols-12">
          {/* LEFT SECTION – 8 COLUMNS */}
          <div className="flex flex-col w-full gap-6 order-2 md:order-1  md:col-span-8">
            {/* Photo Verification */}
            <div className="w-full p-5 bg-white border shadow-sm rounded-3xl border-zinc-200">
              <CardHeader
                heading="Photo Verification"
                subText="Take or upload a clear photo to verify your identity"
                status={verification.current ? "Uploaded" : "Required"}
              />
              {verification.current ? (
                <>
                  <div className="w-full flex items-center justify-center rounded-xl border-dashed border-[1px] border-primary mt-6">
                    <div className="flex flex-col items-center w-full gap-4 p-4 transition-all duration-300 shadow-sm sm:flex-row rounded-xl bg-primary bg-opacity-10 hover:shadow-lg">
                      {/* Preview */}
                      <div className="flex items-center justify-center flex-shrink-0 w-20 h-20 overflow-hidden border sm:w-20 sm:h-20 rounded-xl bg-primary bg-opacity-10 text-primary">
                        <Image size={50} />
                      </div>

                      {/* File Info */}
                      <div className="flex flex-col items-center flex-1 gap-1 text-center sm:items-start sm:text-left">
                        <p className="text-lg font-semibold break-all text-secondary">{fileData?.name}</p>
                        <p className="flex items-center gap-2 text-sm text-primary">
                          <CircleCheck size={18} />
                          <span>Uploaded successfully</span>
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <div
                          className="flex items-center flex-shrink-0 gap-1 font-semibold border-b-2 cursor-pointer text-primary border-primary"
                          onClick={openFilePicker}
                        >
                          <p>Replace</p>
                        </div>
                        <div
                          className="flex items-center flex-shrink-0 gap-1 text-red-600 cursor-pointer hover:text-red-700"
                          onClick={removeFile}
                        >
                          <Trash2 className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="w-full h-72 rounded-xl border-dashed border-[1px] border-tertiary border-opacity-30 bg-tertiary bg-opacity-10 flex flex-col justify-center items-center mt-6 p-5">
                  <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary bg-opacity-10 text-primary">
                    <Camera size={40} />
                  </div>

                  <Button className="text-center !bg-primary !text-white mt-4 text-[16px] font-semibold w-full flex items-center gap-2 justify-center"
                    onClick={startCamera}
                  >
                    <Camera size={24} />
                    <span>Take Photo</span>
                  </Button>

                  <Button
                    className="text-center text-[16px] font-semibold bg-transparent w-full border-[1px] flex items-center justify-center gap-2 border-rare text-rare mt-4"
                    onClick={openFilePicker}
                  >
                    <Upload size={24} className='text-subtext' />
                    <span className='text-subtext'>Upload Photo</span>
                  </Button>

                  <p className="mt-2 text-sm font-normal text-tertiary">Accepted: JPG, PNG (Max 5MB)</p>
                </div>
              )}
              <Input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg, image/png"
                className="hidden"
                onChange={handleFileChanges}
              />
            </div>

            {/* REQUIRED TITLE */}
            <div className="w-full">
              <p className="text-xl font-medium text-subtext">Required Documents</p>
            </div>

            {/* Required Docs – Responsive Cards */}
            <div className="flex flex-col gap-6">
              <div className="p-5 bg-white border shadow-sm rounded-3xl border-zinc-200">
                <CardHeader
                  heading="Government-issued ID"
                  subText="Indetity Verification • Driver's License, Passport, or State ID"
                  status={GovernmentID.current ? 'Uploaded' : 'Pending'}
                />
                <DragAndDrop imageContainer={GovernmentID} savedImage={GovernmentID.current ? { ...GovernmentID.current } : null} onUpdate={updateProgress} />
                {errors.GovernmentID && <div className="mt-2 text-red-600">{errors.GovernmentID}</div>}
              </div>

              <div className="p-5 bg-white border shadow-sm rounded-3xl border-zinc-200">
                <CardHeader
                  heading="Degree / Diploma"
                  subText="Education Verification • MD, DO, NP, or PA Degree Certificate"
                  status={DegreeDiploma.current ? 'Uploaded' : 'Pending'}
                />
                <DragAndDrop imageContainer={DegreeDiploma} savedImage={DegreeDiploma.current ? { ...DegreeDiploma.current } : null} onUpdate={updateProgress} />
                {errors.DegreeDiploma && <div className="mt-2 text-red-600">{errors.DegreeDiploma}</div>}
              </div>

              <div className="p-5 bg-white border shadow-sm rounded-3xl border-zinc-200">
                <CardHeader
                  heading="Medical License(s)"
                  subText="Professional License • State medical licenses (upload multiple if needed)"
                  status={MedicalLicense.current ? 'Uploaded' : 'Pending'}
                />
                <DragAndDrop imageContainer={MedicalLicense} savedImage={MedicalLicense.current ? { ...MedicalLicense.current } : null} onUpdate={updateProgress} />
                {errors.MedicalLicense && <div className="mt-2 text-red-600">{errors.MedicalLicense}</div>}
              </div>

              <div className="p-5 bg-white border shadow-sm rounded-3xl border-zinc-200">
                <CardHeader
                  heading="Board Certification(s)"
                  subText="Board Certification • ABMS or AOA Certification documents"
                  status={BoardCertification.current ? 'Uploaded' : 'Pending'}
                />
                <DragAndDrop imageContainer={BoardCertification} savedImage={BoardCertification.current ? { ...BoardCertification.current } : null} onUpdate={updateProgress} />
                {errors.BoardCertification && <div className="mt-2 text-red-600">{errors.BoardCertification}</div>}
              </div>

              <div className="p-5 bg-white border shadow-sm rounded-3xl border-zinc-200">
                <CardHeader
                  heading="Certificate of Insurance (COI)"
                  subText="Malpractice Insurance • Current professional liability coverage"
                  status={CertificateOfInsurance.current ? 'Uploaded' : 'Pending'}
                />
                <DragAndDrop imageContainer={CertificateOfInsurance} savedImage={CertificateOfInsurance.current ? { ...CertificateOfInsurance.current } : null} onUpdate={updateProgress} />
                {errors.CertificateOfInsurance && (
                  <div className="mt-2 text-red-600">{errors.CertificateOfInsurance}</div>
                )}
              </div>
            </div>

            {/* OPTIONAL TITLE */}
            <div className="w-full">
              <p className="text-xl font-medium text-secondary">Optional Documents</p>
              <p className="text-[16px] font-normal text-subtext">These documents help expedite your verification but are not required to continue.</p>
            </div>

            {/* Optional Docs */}
            <div className="flex flex-col gap-6">
              <div className="p-5 bg-white border shadow-sm rounded-3xl border-zinc-200">
                <CardHeader
                  heading="DEA Certificate"
                  subText="DEA / Controlled Substance • Required if prescribing"
                  status={DEAcertificate.current ? 'Uploaded' : 'Pending'}
                />
                <DragAndDrop imageContainer={DEAcertificate} savedImage={DEAcertificate.current ? { ...DEAcertificate.current } : null} onUpdate={updateProgress} />
                {errors.DEAcertificate && <div className="mt-2 text-red-600">{errors.DEAcertificate}</div>}
              </div>

              <div className="p-5 bg-white border shadow-sm rounded-3xl border-zinc-200">
                <CardHeader
                  heading="Resume or Curriculum Vitae"
                  subText="CV / Resume • PDF or Word format"
                  status={ResumeCV.current ? 'Uploaded' : 'Pending'}
                />
                <DragAndDrop imageContainer={ResumeCV} savedImage={ResumeCV.current ? { ...ResumeCV.current } : null} onUpdate={updateProgress} />
                {errors.ResumeCV && <div className="mt-2 text-red-600">{errors.ResumeCV}</div>}
              </div>

              <div className="p-5 bg-white border shadow-sm rounded-3xl border-zinc-200">
                <CardHeader
                  heading="Vaccination Proof"
                  subText="Immunization / Health Records • COVID, Flu, or required immunizations"
                  status={VaccinationProof.current ? 'Uploaded' : 'Pending'}
                />
                <DragAndDrop imageContainer={VaccinationProof} savedImage={VaccinationProof.current ? { ...VaccinationProof.current } : null} onUpdate={updateProgress} />
                {errors.VaccinationProof && <div className="mt-2 text-red-600">{errors.VaccinationProof}</div>}
              </div>

              <div className="p-5 bg-white border shadow-sm rounded-3xl border-zinc-200">
                <CardHeader
                  heading="Supporting Documents"
                  subText="Miscellaneous • Background Check, CME certificates, etc."
                  status={SupportingDocuments.current ? 'Uploaded' : 'Pending'}
                />
                <DragAndDrop imageContainer={SupportingDocuments} savedImage={SupportingDocuments.current ? { ...SupportingDocuments.current } : null} onUpdate={updateProgress} />
                {errors.SupportingDocuments && <div className="mt-2 text-red-600">{errors.SupportingDocuments}</div>}
              </div>
            </div>

            {/* Security Info */}
            <div className="flex p-4 space-x-2 text-base border rounded-lg bg-primary bg-opacity-10 border-primary border-opacity-30 text-primary">
              <ShieldCheck size={10} className='w-20 h-4 mt-1 sm:w-8 md:w-8' />
              <p>
                <span className="font-bold">Document Security: </span>
                All files are encrypted in transit and at rest. You can always manage or update your documents later
                from your Credential Vault.
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
              <Button className="!bg-primary w-full !text-white text-[16px] sm:order-2 order-1 font-semibold" onClick={submitHandler}>Continue to Verification</Button>
            </div>
          </div>

          {/* RIGHT SIDEBAR – Upload Progress */}
          <div className="w-full p-5 bg-white border shadow-sm md:col-span-4 rounded-3xl border-zinc-200 h-fit order-1 md:order-2">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[20px] font-semibold text-secondary">Upload Progress</p>
              <p className="text-[16px] font-normal text-tertiary">{uploadedCount} of 9</p>
            </div>

            <Progress value={(uploadedCount / 9) * 100} />
            <p className="text-[16px] font-normal text-tertiary mt-2">
              {Math.round((uploadedCount / 9) * 100)}% complete
            </p>

            <div className="mt-5">
              <div className="h-px mb-3 bg-gray-200"></div>

              <div className="flex justify-between">
                <p className="text-base font-normal text-secondary">Required Documents:</p>
                <p className="text-base font-normal text-tertiary">5</p>
              </div>

              <div className="flex justify-between mt-2">
                <p className="text-base font-normal text-secondary">Optional Documents:</p>
                <p className="text-base font-normal text-tertiary">4</p>
              </div>

              <div className="h-px mt-4 bg-gray-200"></div>
            </div>

            <div className="mt-6">
              <p className="mb-2 text-base font-normal text-secondary">Quick Tips:</p>
              <ul className="list-disc ml-5 space-y-1 text-[16px] font-normal text-subtext">
                <li>Ensure all documents are clear and legible</li>
                <li>Check that licenses are current and not expired</li>
                <li>You can update documents later from your vault</li>
              </ul>
            </div>
          </div>
        </div>
        {isCameraOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl overflow-hidden w-full max-w-md shadow-2xl py-1">
              <div className="px-6 py-1 flex justify-between items-center">
                <h3 className=" text-xl font-bold text-secondary">
                  {tempPhoto ? "Review Photo" : "Identity Verification"}
                </h3>
                <button onClick={stopCamera} className="p-2 hover:bg-zinc-100 rounded-full">
                  <X size={24} className="text-zinc-500" />
                </button>
              </div>

              <div className="relative aspect-square bg-black mx-6  rounded-xl overflow-hidden shadow-inner">
                {tempPhoto ? (
                  <img src={tempPhoto} className="w-full h-full object-cover" alt="Captured" />
                ) : (
                  <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                )}

                {!tempPhoto && (
                  <div className="absolute inset-0 border-[30px] border-black/20 pointer-events-none">
                    <div className="w-full h-full border-2 border-white/40 border-dashed rounded-full" />
                  </div>
                )}
                <canvas ref={canvasRef} className="hidden" />
              </div>

              <div className="px-6 py-4 flex flex-col">
                {tempPhoto ? (
                  <div className="flex gap-4">
                    <Button
                      onClick={retakePhoto}
                      className="flex-1 !bg-zinc-100 !text-secondary border border-zinc-200 py-6 font-bold"
                    >
                      Retake
                    </Button>
                    <Button
                      onClick={savePhoto}
                      className="flex-1 !bg-primary !text-white py-6 font-bold"
                    >
                      Use Photo
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={capturePhoto}
                    className="w-full !bg-primary !text-white py-6 flex text-lg font-bold"
                  >
                    <Camera size={24} /> Take Photo
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-center mx-auto w-full gap-2 px-4 py-5 sm:px-6 lg:px-8 text-center sm:text-left">
          <Lock className="text-primary shrink-0" size={16} />

          <span className="text-sm text-tertiary">
            HIPAA & SOC 2 Compliant • Your data is protected • All files encrypted
          </span>
        </div>

      </div>
    </>
  );
}

export default UploadCredentialsContainer;
