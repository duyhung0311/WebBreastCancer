
import React from 'react';
import { Menu, Grid, Badge } from 'antd';
import { ShoppingCartOutlined } from "@ant-design/icons";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const { useBreakpoint } = Grid;

const RightMenu = () => {
  const { md } = useBreakpoint();
  return (
    <Menu mode={md ? "horizontal" : "inline"}>
      <Menu.Item key="mail">
        <a style={{ color: 'Black', fontFamily: 'Kaushan Script, cursive' }} href="">Signin</a>
      </Menu.Item>
      <Menu.Item key="app">
        <a style={{ color: 'Black', fontFamily: 'Kaushan Script, cursive' }} href="">
          
            <Badge style={{fontFamily: "Noto Sans,sans-serif"}} count={5} >
            <ShoppingCartOutlined/>
            </Badge>
        </a>
      </Menu.Item>
    </Menu>
  );
}

export default RightMenu;
