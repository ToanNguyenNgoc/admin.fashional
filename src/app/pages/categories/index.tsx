import { RoleLayout } from "app/components";
import { RCategory } from "app/constants";

function CategoryPage() {
    return (
        <RoleLayout permissionPath={RCategory.GET} isNavigate >
            <div>
                CategoryPage
            </div>
        </RoleLayout>
    );
}

export default CategoryPage;