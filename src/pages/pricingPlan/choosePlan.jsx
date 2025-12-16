import ChoosePlanContainer from '../../components/pricing-plan/choose-plan/choosePlanContainer';
import React from 'react';
import MainLayout from '../../layouts/MainLayout';

function ChoosePlan() {
  return (
    <>
      <MainLayout>
        {' '}
        <ChoosePlanContainer />
      </MainLayout>
    </>
  );
}

export default ChoosePlan;
