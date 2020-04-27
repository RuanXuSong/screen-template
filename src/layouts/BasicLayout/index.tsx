import React, { useState } from 'react';
import ProLayout, { Settings, SettingDrawer, MenuDataItem } from '@ant-design/pro-layout';
import { IRouteComponentProps, Link, useModel } from 'umi';
import Iconfont from '@/components/Iconfont';
import CustomHeaderRight from './components/CustomHeaderRight';
import defaultSettings from './defaultSettings';
import Logo from './components/Logo';
import { ConfigProvider, Empty } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

export default function BasicLayout(props: IRouteComponentProps) {
  const [collapsed, handleMenuCollapse] = useState<boolean>(false);
  const [settings, setSettings] = useState<Partial<Settings>>(defaultSettings);
  const { initialState } = useModel('@@initialState');

  const { menus = []} = initialState as { menus: MenuDataItem[] };
  return (
    <ConfigProvider locale={zhCN} renderEmpty={() => <Empty image={require('../../assets/pic_empty@2x.png')} description="暂无数据" />}>
      <ProLayout
        logo={<Logo />}
        collapsed={collapsed}
        onCollapse={handleMenuCollapse}
        menuHeaderRender={(logoDom, titleDom) => (
          <Link to="/">
            {logoDom}
            {titleDom}
          </Link>
        )}
        menuItemRender={(menuItemProps, defaultDom) => {
          return (
            <Link to={menuItemProps.path || '/'}>
              <span>
                {menuItemProps.customIcon && (
                  <Iconfont
                    name={menuItemProps.customIcon}
                    style={{ marginRight: 10, fontSize: 17 }}
                  />
                )}
              </span>
              <span>{defaultDom}</span>
            </Link>
          );
        }}
        subMenuItemRender={(menuItemProps, defaultDom) => {
          return (
            <span>
              {menuItemProps.customIcon && (
                <Iconfont
                  name={menuItemProps.customIcon}
                  style={{ marginRight: 10, fontSize: 17 }}
                />
              )}
              <span>{defaultDom}</span>
            </span>
          );
        }}
        rightContentRender={(/** props: HeaderViewProps */) => (
          <CustomHeaderRight />
        )}
        onMenuHeaderClick={() => props.history.push('/')}
        menuDataRender={() => menus}
        {...settings}
      >
        {props.children}
      </ProLayout>
      <SettingDrawer settings={settings} onSettingChange={setSettings} />
    </ConfigProvider>
  );
}
