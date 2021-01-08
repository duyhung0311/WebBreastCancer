import React, { Component } from 'react';
import LeftMenu from "./leftmenu"
import { Drawer} from 'antd';
import './style.css'
import { Images } from '../../config/image';

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
					<a style={{fontSize:"18px",color:'Black',fontFamily:'Kaushan Script, cursive'}} href="">
						<img src={Images.IMAGE_LOGO} style={{zoom:0.5}}/>
					</a>
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
