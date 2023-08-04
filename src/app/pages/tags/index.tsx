import { RoleLayout } from "app/components";
import { RTag } from "app/constants";

function TagPage() {
    return (
        <RoleLayout permissionPath={RTag.GET} isNavigate >
            <div>
                TagPage
            </div>
        </RoleLayout>
    );
}

export default TagPage;