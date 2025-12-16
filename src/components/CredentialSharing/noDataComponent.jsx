const NoDataComponent = () => {
  return (
      <div className="w-full bg-white rounded-b-xl p-12 flex flex-col items-center justify-center text-center min-h-[300px]">
        <img src="/CredentialSharing/noDataicon.svg" alt="No data Icon" />
        <h3 className="text-lg font-semibold text-secondary">No Data Yet</h3>
        <p className="mt-1 text-sm text-tertiary"> Your credential list is currently empty.</p>
      </div>
  );
};
export default NoDataComponent;
