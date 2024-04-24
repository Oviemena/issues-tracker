export const revalidate = 1;

import CompletedIssues from "../../_components/completed-issues";
import InProgressIssues from "../../_components/in-progress-issue";
import OpenIssues from "../../_components/open-issues";

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
