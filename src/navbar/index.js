import React, { Component } from 'react';
import LeftMenu from "./leftmenu"
import RightMenu from "./rightmenu"
import { Drawer, Button } from 'antd';
import './style.css'
class Navbar extends Component {
	state = {
		current: 'mail',
		visible: false
	}
	showDrawer = () => {
		this.setState({
			visible: true,
		});
	};

	onClose = () => {
		this.setState({
			visible: false,
		});
	};

	render() {
		return (
			<nav className="menuBar">
				<div className="logo">
					<a style={{fontSize:"18px",color:'Black',fontFamily:'Kaushan Script, cursive'}} href="">Breast Cancer</a>
				</div>
				<div className="menuCon">
					<div className="leftMenu">
						{/* <LeftMenu />/ */}
					</div>
					{/* <div className="rightMenu">
						<RightMenu />
					</div> */}
					
					<Drawer
						title="Basic Drawer"
						placement="right"
						closable={false}
						onClose={this.onClose}
						visible={this.state.visible}
					>
						<LeftMenu />
						{/* <RightMenu /> */}
					</Drawer>

				</div>
			</nav>
		);
	}
}

export default Navbar;
