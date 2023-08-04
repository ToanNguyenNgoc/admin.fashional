import { RoleLayout } from "app/components";
import { RBranch } from "app/constants";

function BranchPage() {
    return (
        <RoleLayout permissionPath={RBranch.GET} >
            <div>
                BranchPage
            </div>
        </RoleLayout>
    );
}

export default BranchPage;