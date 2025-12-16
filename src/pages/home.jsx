import React, { useRef, useState } from 'react';
import DelegateModal from '../components/Modals/delegateModal';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const videoRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showModal, setShowModal] = useState(false);
const navigate = useNavigate();
  const handleDelegateClick = () => {
    setShowModal(true);
  };
  const handleTogglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused || video.ended) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

  const handleSendInvite = async (payload) => {
    // Integrate your API here
    // e.g. await api.sendDelegateInvite(payload);
    console.log('Invite payload:', payload);
  };
 const handelClick=()=>{
  navigate("/login");
 }

  return (
    <div className="flex items-center justify-center bg-gradient-to-r from-[#F0FFFE] to-[#F8FAFC] min-h-screen px-4 py-6 md:px-10 lg:px-14 ">
      <main className="w-full mx-auto">
        <section className="flex flex-col">
          {/* Heading */}
          <header className="mb-6 text-center md:mb-10">
            <h1 className="text-[1.8rem] md:text-[2.2rem] font-bold tracking-tight text-[#163B6D]">
              Welcome to CrediSync
            </h1>
            <p className="mx-auto mt-2 max-w-[720px] text-[0.95rem] md:text-[1.05rem] text-slate-600 leading-snug">
              Complete your Intake yourself — or securely delegate it to your admin or coordinator.
            </p>
          </header>

          {/* Main video card */}
          <div className="rounded-2xl border border-[#e0ecff] bg-[#f9fcff] px-3 py-4 sm:px-6 md:px-8 md:py-6 shadow-[0_18px_45px_rgba(15,27,61,0.08)]">
            <div className="mb-5">
              <div className="relative overflow-hidden rounded-2xl aspect-video group">
                <video
                  ref={videoRef}
                  className="absolute inset-0 object-cover w-full h-full"
                  src="/refrence-video.mp4"
                  preload="metadata"
                  onEnded={handleVideoEnded}
                />

                {/* Play button: always visible at start, hidden when playing */}
                {!isPlaying && (
                  <button
                    type="button"
                    onClick={handleTogglePlay}
                    aria-label="Play introduction video"
                    className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
                  >
                    <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-gradient-to-r from-[#F0FFFE] to-[#F8FAFC] shadow-[0_14px_30px_rgba(15,27,61,0.22)] hover:scale-[1.03] transition-all">
                      <svg viewBox="0 0 48 48" className="w-16 h-16 md:w-32 md:h-32">
                        <path d="M19 16 L19 32 L32 24 Z" fill="#163B6D" />
                      </svg>
                    </div>
                  </button>
                )}

                {/* Pause button: only visible on hover when playing */}
                {isPlaying && (
                  <button
                    type="button"
                    onClick={handleTogglePlay}
                    aria-label="Pause introduction video"
                    className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                  >
                    <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-gradient-to-r from-[#F0FFFE] to-[#F8FAFC] shadow-[0_14px_30px_rgba(15,27,61,0.22)] hover:scale-[1.03] transition-all">
                      <svg viewBox="0 0 48 48" className="w-16 h-16 md:w-32 md:h-32">
                        <rect x="14" y="14" width="8" height="20" rx="2" fill="#163B6D" />
                        <rect x="26" y="14" width="8" height="20" rx="2" fill="#163B6D" />
                      </svg>
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Button options card */}
          <div className="mt-5 mb-6">
            <div className="flex flex-col rounded-2xl overflow-hidden border border-[#d3e2ff] bg-white shadow-[0_10px_25px_rgba(15,27,61,0.06)]">
              {/* Buttons row */}
              <div className="flex flex-col gap-3 p-4 md:flex-row md:gap-6">
                <button
                  type="button"
                  onClick={handleDelegateClick}
                  className="flex-1 px-4 py-3.5 bg-white text-center text-[18px] font-semibold text-slate-900 border border-gray-200 rounded-lg"
                >
                  Delegate to my Admin / Coordinator
                </button>

                <DelegateModal isOpen={showModal} onClose={() => setShowModal(false)} onSendInvite={handleSendInvite} />

                <button
                onClick={handelClick}
                  type="button"
                  className="flex-1 px-4 py-3.5 bg-primary text-white text-center text-[18px] font-semibold border border-gray-200 rounded-lg"
                >
                  I’ve got this for now!
                </button>
              </div>

              {/* Descriptions */}
              <div className="flex flex-col text-center md:flex-row">
                <div className="flex-1 px-4 mb-4">
                  <p className="text-[16px] text-[#526183]">
                    Send a secure link so your team can complete The Intake for you.
                  </p>
                </div>
                <div className="flex-1 px-4 mb-4">
                  <p className="text-[16px] text-[#526183]">
                    Start your Intake — about 5 minutes to verify your credentials.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button
          onClick={handelClick}
           className="mx-auto mt-2 text-[16px] text-primary font-semibold">Watch later from my Dashboard</button>

          {/* Footer */}
          <footer className="mt-6 text-center text-[16px] text-[#8a94ab]">
            <div className="inline-flex items-center gap-2">
              <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none">
                <rect x="4" y="8" width="12" height="9" rx="2" stroke="#8a94ab" strokeWidth="1.3" />
                <path d="M7 8V6.5A3.5 3.5 0 0 1 10.5 3 3.5 3.5 0 0 1 14 6.5V8" stroke="#8a94ab" strokeWidth="1.3" />
              </svg>
              HIPAA & SOC 2 Compliant | Your data is secure
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
};

export default Home;
