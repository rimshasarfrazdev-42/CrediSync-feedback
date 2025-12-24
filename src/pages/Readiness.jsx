import MainLayout from '../layouts/MainLayout';
import WelcomeBanner from '../components/DashBoard/WelcomeBanner';
import { CredentialReadinessCard } from '../components/DashBoard/CredentialReadinessCard';
import ScoreBreakdown from '../components/Readiness/ScoreBreakdown';
export const Readiness = () => {
  return (
    <>
      <div className=" bg-white">
        <MainLayout>
          <WelcomeBanner
            heading={`Readiness Score`}
            subHeading={`Track your credentialing progress and ensure compliance`}
          />
          <CredentialReadinessCard heading={`Overall Progress`} subHeading={`Your credentialing completion status`} />
          <ScoreBreakdown />
        </MainLayout>
      </div>
    </>
  );
};
