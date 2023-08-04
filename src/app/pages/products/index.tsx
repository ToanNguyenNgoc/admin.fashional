import { RoleLayout } from "app/components";
import { RProduct } from "app/constants";

function ProductPage() {
    return (
        <RoleLayout permissionPath={RProduct.GET} isNavigate>
            <div>
                ProductPage
            </div>
        </RoleLayout>
    );
}

export default ProductPage;