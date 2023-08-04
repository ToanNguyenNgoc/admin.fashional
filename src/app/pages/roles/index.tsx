import { RoleLayout } from "app/components";
import { RRole } from "app/constants";

function RolePage() {
    return (
        <RoleLayout permissionPath={RRole.GET} isNavigate>
            <div>
                RolePage
            </div>
        </RoleLayout>
    );
}

export default RolePage;