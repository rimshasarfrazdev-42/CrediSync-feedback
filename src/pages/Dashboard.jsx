import MainLayout from '../layouts/MainLayout';
import WelcomeBanner from '../components/DashBoard/WelcomeBanner';
import StatsGrid from '../components/DashBoard/StatsGrid';
import { NotificationsCard } from '../components/DashBoard/NotificationsCard';
import { CredentialReadinessCard } from '../components/DashBoard/CredentialReadinessCard';
import RecentDocumentsCard from '../components/DashBoard/RecentDocumentsCard';

import UploadButton from '../components/DashBoard/UploadButton';

export const Dashboard = () => {
  return (
    <>
      <MainLayout>
        <WelcomeBanner
          heading="Welcome back, Dr. Jane Smith"
          subHeading="Manage your healthcare credentials and compliance documents"
        />

        <StatsGrid />

        <div className="grid w-full grid-cols-1 gap-6 mx-auto lg:grid-cols-2">
          <CredentialReadinessCard
            heading="Credential Readiness Score"
            subHeading="Your overall compliance status"
            button={<UploadButton />}
          />

          <NotificationsCard />
        </div>

        <RecentDocumentsCard />

        {/* <SessionTimeoutModal /> */}
      </MainLayout>
    </>
  );
};
