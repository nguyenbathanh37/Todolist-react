import React from 'react';
import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTranslation } from '../../i18n/i18nSlice';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const MenuNavigate: React.FC = () => {
  const navigate = useNavigate()
  const trans = useSelector(selectTranslation)

  const items: MenuProps['items'] = [
    getItem(trans.homepage, '/', <AppstoreOutlined />),
  
    { type: 'divider' },
  
    getItem(trans.authentication, 'sub4', <SettingOutlined />, [
      getItem(trans.Login, '/login'),
      getItem(trans.RegisterTitle, '/register'),
      getItem(trans.forgotPasswordTitle, '/forgot-password'),
    ]),
  ];

  const onClick: MenuProps['onClick'] = (e: any) => {
    navigate(e.key)
  };

  return (
    <Menu
      onClick={onClick}
      style={{ width: 256 }}
      defaultSelectedKeys={['1']}
      mode="inline"
      items={items}
    />
  )
}

export default MenuNavigate