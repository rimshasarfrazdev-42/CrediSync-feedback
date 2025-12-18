import React, { useRef, useState } from 'react';
import DelegateModal from '../components/Modals/delegateModal';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleDelegateClick = () => setShowModal(true);

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

  const handleVideoEnded = () => setIsPlaying(false);

  const handleSendInvite = async (payload) => {
    console.log('Invite payload:', payload);
  };

  const handelClick = () => {
    navigate('/login');
  };

return (
 <div className="bg-gradient-to-r from-[#F0FFFE] to-[#F8FAFC] lg:min-h-[100svh] w-full px-3 sm:px-6 ">

  <main className="w-full max-w-none">

      {/* Use grid so footer has reserved space on md+ and never overlaps content */}
    <section className="flex w-full flex-col py-4 lg:min-h-[100svh] lg:py-6">

        {/* CONTENT */}
        <div className="flex flex-col flex-1">
          {/* Heading */}
          <header className="mb-4 text-center md:mb-6">
            <h1 className="text-[1.5rem] md:text-[2.2rem] font-bold tracking-tight text-[#163B6D]">
              Welcome to CrediSync
            </h1>
            <p className="mx-auto mt-2 max-w-[720px] text-[0.9rem] md:text-[1.05rem] text-[#374151] leading-snug">
              Complete your Intake yourself — or securely delegate it to your admin or coordinator.
            </p>
          </header>

          {/* Main video card */}
          <div className="rounded-2xl border border-[#e0ecff] bg-[#f9fcff] shadow-[0_18px_45px_rgba(15,27,61,0.08)]">
            {/* cap height so page never overflows on laptop/tablet */}
            <div className="relative overflow-hidden rounded-2xl w-full aspect-video max-h-[46vh] md:max-h-[52vh]">
              <video
                ref={videoRef}
                className="absolute inset-0 object-cover w-full h-full"
                src="/refrence-video.mp4"
                preload="metadata"
                onEnded={handleVideoEnded}
              />

              {!isPlaying && (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <button
                    type="button"
                    onClick={handleTogglePlay}
                    aria-label="Play introduction video"
                    className="flex items-center justify-center transition-opacity duration-300"
                  >
                    <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-gradient-to-r from-[#F0FFFE] to-[#F8FAFC] shadow-[0_14px_30px_rgba(15,27,61,0.22)] hover:scale-[1.03] transition-all">
                      <svg viewBox="0 0 48 48" className="w-16 h-16 md:w-32 md:h-32">
                        <path d="M19 16 L19 32 L32 24 Z" fill="#163B6D" />
                      </svg>
                    </div>
                  </button>

                  {/* Caption pinned to bottom - allow wrap on small screens to prevent overflow */}
                  <div className="absolute bottom-3 left-3 right-3 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 rounded-lg bg-gradient-to-r from-[#F0FFFE] to-[#F8FAFC] px-3 py-2 text-center text-[10px] sm:text-[13px] md:text-[16px] text-[#374151] shadow-xl border border-[#e6eefc]">
                    New to CrediSync? Watch this 1-minute walkthrough to get started.
                  </div>
                </div>
              )}

              {isPlaying && (
                <button
                  type="button"
                  onClick={handleTogglePlay}
                  aria-label="Pause introduction video"
                  className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 hover:opacity-100"
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

          {/* Button options card */}
          <div className="mt-4">
            <div className="flex flex-col rounded-2xl overflow-hidden border border-[#d3e2ff] bg-white shadow-[0_10px_25px_rgba(15,27,61,0.06)]">
              <div className="grid grid-cols-1 gap-3 p-4 md:grid-cols-2 md:gap-6 md:px-5">
                <div className="flex flex-col">
                  <button
                    type="button"
                    onClick={handleDelegateClick}
                    className={[
                      "w-full px-4 py-3.5 bg-white text-center font-semibold",
                      "text-[14px] sm:text-[15px] md:text-[17px]",
                      "text-[#92949F] border border-[#92949F] rounded-lg",
                      "whitespace-nowrap",
                    ].join(" ")}
                  >
                    Delegate to my Admin / Coordinator
                  </button>

                  <p className="mt-2 text-center text-[13px] sm:text-[14px] md:text-[16px] text-[#526183]">
                    Send a secure link so your team can complete The Intake for you.
                  </p>
                </div>

                <DelegateModal
                  isOpen={showModal}
                  onClose={() => setShowModal(false)}
                  onSendInvite={handleSendInvite}
                />

                <div className="flex flex-col">
                  <button
                    onClick={handelClick}
                    type="button"
                    className={[
                      "w-full px-4 py-3.5 bg-primary text-white text-center font-semibold",
                      "text-[14px] sm:text-[15px] md:text-[17px]",
                      "border border-gray-200 rounded-lg",
                      "whitespace-nowrap",
                    ].join(" ")}
                  >
                    I’ve got this for now!
                  </button>

                  <p className="mt-2 text-center text-[13px] sm:text-[14px] md:text-[16px] text-[#526183]">
                    Start your Intake — about 5 minutes to verify your credentials.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button
      onClick={handelClick}
      className="mx-auto mt-2 mb-0 lg:mt-10 text-[13px] sm:text-[14px] md:text-[16px] underline text-primary font-semibold"
    >
      Watch later from my Dashboard
    </button>
        </div>

        {/* FOOTER (never fixed; always fits, no scroll) */}
        <footer className="mt-4 lg:mt-auto pt-2 md:pt-4 text-center text-[13px] sm:text-[14px] md:text-[15px] text-[#8a94ab]">
          <div className="inline-flex flex-wrap items-center justify-center gap-2">
            <svg viewBox="0 0 20 20" className="w-5 h-5" fill="none">
              <rect x="4" y="8" width="12" height="9" rx="2" stroke="#8a94ab" strokeWidth="1.3" />
              <path
                d="M7 8V6.5A3.5 3.5 0 0 1 10.5 3 3.5 3.5 0 0 1 14 6.5V8"
                stroke="#8a94ab"
                strokeWidth="1.3"
              />
            </svg>
            HIPAA &amp; SOC 2 Compliant | Your data is secure
          </div>
        </footer>
      </section>
    </main>
  </div>
);

};

export default Home;
