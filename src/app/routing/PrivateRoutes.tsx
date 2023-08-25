import { lazy, FC, Suspense } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { MasterLayout } from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import { DashboardWrapper } from '../pages/dashboard/DashboardWrapper'
import { MenuTestPage } from '../pages/MenuTestPage'
import { getCSSVariableValue } from '../../_metronic/assets/ts/_utils'
import { WithChildren } from '../../_metronic/helpers'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'
import { PAccount, PBranch, PCategory, POrder, PProduct, PRole, PTag } from 'app/constants'

const PrivateRoutes = () => {
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))
  const AccountsPage = lazy(() => import('../pages/accounts/index'))
  const AccountFormPage = lazy(() => import('../pages/accounts/account-form'))
  const RolePage = lazy(() => import('../pages/roles/index'))
  const RoleFormPage = lazy(() => import('../pages/roles/role-form'))
  const BranchesPage = lazy(() => import('../pages/branches/index'))
  const BranchFormPage = lazy(() => import('../pages/branches/branch-from'))
  const TagsPage = lazy(() => import('../pages/tags/index'))
  const CategoryPage = lazy(() => import('../pages/categories/index'))
  const CategoryFormPage = lazy(()=> import("../pages/categories/category-form"))
  const ProductPage = lazy(() => import('../pages/products/index'))
  const ProductFormPage = lazy(() => import("../pages/products/products-form"))
  const OrderPage = lazy(() => import("../pages/orders/index"))
  const OrderFormPage = lazy(() => import("../pages/orders/module/order-form"))

  const listOfRoleRoute:Array<{
    path:string;
    element:JSX.Element
  }> = [
    {
      path: PAccount.index,
      element: <AccountsPage />
    },
    {
      path: PAccount.create,
      element: <AccountFormPage />
    },
    {
      path: PAccount.update,
      element: <AccountFormPage />
    },
    // [Role]
    {
      path: PRole.index,
      element: <RolePage />
    },
    {
      path: PRole.create,
      element: <RoleFormPage />
    },
    {
      path: PRole.update,
      element: <RoleFormPage />
    },
    // [Branch]
    {
      path: PBranch.index,
      element: <BranchesPage />
    },
    {
      path: PBranch.create,
      element: <BranchFormPage />
    },
    {
      path: PBranch.update,
      element: <BranchFormPage />
    },
    // [Tag]
    {
      path: PTag.index,
      element: <TagsPage />
    },
    // [Category]
    {
      path: PCategory.index,
      element: <CategoryPage />
    },
    {
      path:PCategory.create,
      element:<CategoryFormPage/>
    },
    {
      path:PCategory.update,
      element:<CategoryFormPage/>
    },
    // [Product]
    {
      path: PProduct.index,
      element: <ProductPage />
    },
    {
      path:PProduct.create,
      element:<ProductFormPage/>
    },
    {
      path:PProduct.update,
      element:<ProductFormPage/>
    },
    // [Order]
    {
      path:POrder.index,
      element:<OrderPage/>
    },
    {
      path:POrder.create,
      element:<OrderFormPage/>
    },
    {
      path:POrder.update,
      element:<OrderFormPage/>
    }
  ]

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='dashboard' element={<DashboardWrapper />} />
        <Route path='builder' element={<BuilderPageWrapper />} />
        <Route path='menu-test' element={<MenuTestPage />} />
        {/* Lazy Modules */}
        <Route
          path='crafted/pages/profile/*'
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/pages/wizards/*'
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/widgets/*'
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/account/*'
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/chat/*'
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/user-management/*'
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />
        {
          listOfRoleRoute.map(item => (
            <Route
              key={item.path}
              path={item.path}
              element={
                <SuspensedView>
                  {item.element}
                </SuspensedView>
              }
            />
          ))
        }
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue('--kt-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export { PrivateRoutes }
