/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import { useIntl } from 'react-intl'
import { KTSVG } from '../../../helpers'
import { AsideMenuItemWithSub } from './AsideMenuItemWithSub'
import { AsideMenuItem } from './AsideMenuItem'
import { PAccount, PBranch, PCategory, POrder, PProduct, PRole, PTag, RAccount, RBranch, RCategory, ROrder, RProduct, RRole, RTag } from 'app/constants'
import { RoleLayout } from 'app/components'

export function AsideMenuMain() {
  const intl = useIntl()

  return (
    <>
      <AsideMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/art/art002.svg'
        title={intl.formatMessage({ id: 'MENU.DASHBOARD' })}
        fontIcon='bi-app-indicator'
      />
      <AsideMenuItem
        to='/builder'
        icon='/media/icons/duotune/general/gen019.svg'
        title='Layout Builder'
        fontIcon='bi-layers'
      />
      {/* <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Crafted</span>
        </div>
      </div>
      <AsideMenuItemWithSub
        to='/crafted/pages'
        title='Pages'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/general/gen022.svg'
      >
        <AsideMenuItemWithSub to='/crafted/pages/profile' title='Profile' hasBullet={true}>
          <AsideMenuItem to='/crafted/pages/profile/overview' title='Overview' hasBullet={true} />
          <AsideMenuItem to='/crafted/pages/profile/projects' title='Projects' hasBullet={true} />
          <AsideMenuItem to='/crafted/pages/profile/campaigns' title='Campaigns' hasBullet={true} />
          <AsideMenuItem to='/crafted/pages/profile/documents' title='Documents' hasBullet={true} />
          <AsideMenuItem
            to='/crafted/pages/profile/connections'
            title='Connections'
            hasBullet={true}
          />
        </AsideMenuItemWithSub>

        <AsideMenuItemWithSub to='/crafted/pages/wizards' title='Wizards' hasBullet={true}>
          <AsideMenuItem
            to='/crafted/pages/wizards/horizontal'
            title='Horizontal'
            hasBullet={true}
          />
          <AsideMenuItem to='/crafted/pages/wizards/vertical' title='Vertical' hasBullet={true} />
        </AsideMenuItemWithSub>
      </AsideMenuItemWithSub>
      <AsideMenuItemWithSub
        to='/crafted/accounts'
        title='Accounts'
        icon='/media/icons/duotune/communication/com006.svg'
        fontIcon='bi-person'
      >
        <AsideMenuItem to='/crafted/account/overview' title='Overview' hasBullet={true} />
        <AsideMenuItem to='/crafted/account/settings' title='Settings' hasBullet={true} />
      </AsideMenuItemWithSub>
      <AsideMenuItemWithSub
        to='/error'
        title='Errors'
        fontIcon='bi-sticky'
        icon='/media/icons/duotune/general/gen040.svg'
      >
        <AsideMenuItem to='/error/404' title='Error 404' hasBullet={true} />
        <AsideMenuItem to='/error/500' title='Error 500' hasBullet={true} />
      </AsideMenuItemWithSub>
      <AsideMenuItemWithSub
        to='/crafted/widgets'
        title='Widgets'
        icon='/media/icons/duotune/general/gen025.svg'
        fontIcon='bi-layers'
      >
        <AsideMenuItem to='/crafted/widgets/lists' title='Lists' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/statistics' title='Statistics' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/charts' title='Charts' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/mixed' title='Mixed' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/tables' title='Tables' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/feeds' title='Feeds' hasBullet={true} />
      </AsideMenuItemWithSub> */}
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Ứng dụng</span>
        </div>
      </div>
      <RoleLayout permissionPath={RBranch.GET} >
        <AsideMenuItem fontIcon='bi-chat-left'
          icon='/media/icons/duotune/general/gen001.svg'
          to={PBranch.index} title='Chi nhánh'
        />
      </RoleLayout>
      <RoleLayout permissionPath={RTag.GET}>
        <AsideMenuItem fontIcon='bi-chat-left'
          icon='/media/icons/duotune/general/gen025.svg'
          to={PTag.index} title='Tag'
        />
      </RoleLayout>
      <AsideMenuItemWithSub
        to='/apps/chat'
        title='Phân loại & Sản phẩm'
        fontIcon='bi-chat-left'
        icon='/media/icons/duotune/communication/com012.svg'
      >
        <RoleLayout permissionPath={RCategory.GET}>
          <AsideMenuItem to={PCategory.index} title='Loại sản phẩm' hasBullet={true} />
        </RoleLayout>
        <RoleLayout permissionPath={RProduct.GET}>
          <AsideMenuItem to={PProduct.index} title='Sản phẩm' hasBullet={true} />
        </RoleLayout>
      </AsideMenuItemWithSub>
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Hệ thống</span>
        </div>
      </div>
      <RoleLayout permissionPath={ROrder.GET}>
        <AsideMenuItem fontIcon='bi-chat-left'
          icon='/media/icons/duotune/ecommerce/ecm006.svg'
          to={POrder.index} title='Danh sách đơn hàng'
        />
      </RoleLayout>
      <AsideMenuItemWithSub
        to='/apps/chat'
        title='Nhân viên & Phân quyền'
        fontIcon='bi-chat-left'
        icon='/media/icons/duotune/general/gen049.svg'
      >
        <RoleLayout permissionPath={RAccount.GET}>
          <AsideMenuItem to={PAccount.index} title='Tài khoản' hasBullet={true} />
        </RoleLayout>
        <RoleLayout permissionPath={RRole.GET}>
          <AsideMenuItem to={PRole.index} title='Phân quyền' hasBullet={true} />
        </RoleLayout>
      </AsideMenuItemWithSub>
      <div className='menu-item'>
        <div className='menu-content'>
          <div className='separator mx-1 my-4'></div>
        </div>
      </div>
      <div className='menu-item'>
        <a
          target='_blank'
          className='menu-link'
          href={process.env.REACT_APP_PREVIEW_DOCS_URL + '/docs/changelog'}
        >
          <span className='menu-icon'>
            <KTSVG path='/media/icons/duotune/general/gen005.svg' className='svg-icon-2' />
          </span>
          <span className='menu-title'>Changelog {process.env.REACT_APP_VERSION}</span>
        </a>
      </div>
    </>
  )
}
