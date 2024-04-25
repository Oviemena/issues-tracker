export const revalidate = 1;

import CompletedIssues from "./completed-issues";
import InProgressIssues from "./in-progress-issue";
import OpenIssues from "./open-issues";

const DashboardPage = () => {
  return (
    <div className="flex flex-row space-x-10 items-strtch justify-center">
      <OpenIssues />
      <InProgressIssues />
      <CompletedIssues />
    </div>
  );
};

export default DashboardPage;
