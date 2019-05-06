import * as React from 'react';
import classnames from 'classnames';
import * as styles from './WorkspaceSwitcher.scss';
import * as stylesVerticalNav from '../VerticalNav.scss';
import Popup from '../../Popup/Popup';
import Divider from '../../Divider/Divider';
import Button from '../../Button/Button';
import AddSVG from '../../../svg/add';
import Avatar from '../../Avatar';
import IReactComponentProps from '../../../common/structures/IReactComponentProps';
import Handler from '../../../common/structures/Handler';
import { VerticalNavItem } from '../VerticalNav';
import CloseSmallSVG from '../../../svg/close--small';
import WarningSVG from '../../../svg/warning';

interface IWorkspaceSwitcherProps extends IReactComponentProps {
	className?: string;
	onClickAccount: Handler;
	onClickManageTeam: Handler;
	onClickAddTeam: Handler;
	onClickLogout: Handler;
	onClickWorkspace: Handler;
	onClickWorkspaceNav: Handler;
	routeTo: string;
	tooltip: string;
	workspaces: any[];
}

interface IWorkspaceSwitcherState {
	activeWorkspaceItem: any;
}

export class WorkspaceSwitcher extends React.Component<IWorkspaceSwitcherProps, IWorkspaceSwitcherState> {

	constructor (props: IWorkspaceSwitcherProps) {
		super(props);

		this.state = {
			activeWorkspaceItem: this.getInitialActiveWorkspaceItem(),
		};
	}

	getInitialActiveWorkspaceItem () {
		return this.props.workspaces
			&&
			(
				this.props.workspaces.find(element => element.isActive) || (this.props.workspaces.length && this.props.workspaces[0])
			)
		;
	}

	componentDidUpdate (prevProps: IWorkspaceSwitcherProps, prevState: IWorkspaceSwitcherState) {
		if (prevProps.workspaces.length !== this.props.workspaces.length) {
			this.setState({
				activeWorkspaceItem: this.getInitialActiveWorkspaceItem(),
			});
		}
	}

	onSelect (workspaceItem: any) {
		this.setState({
			activeWorkspaceItem: workspaceItem,
		});

		if (this.props.onClickWorkspace) {
			this.props.onClickWorkspace.call(this, workspaceItem);
		}
	}

	render () {
		const hasTeams = this.props.workspaces && !!this.props.workspaces.filter(workspaceItem => workspaceItem.isTeam).length;

		return (
			<VerticalNavItem
				className={classnames(
					styles.WorkspaceSwitcher,
					this.props.className,
				)}
				tooltip={this.props.workspaces.length ? null : this.props.tooltip}
				routeTo={this.props.routeTo}
				type={this.props.workspaces.length ? 'switcher' : 'navlink'}
			>
				{
					this.props.workspaces.length
						?
						<Popup
							className={styles.WorkspaceSwitcher_Popup__Width100}
							offsetX="-19px"
							padding={false}
							position="right"
							triggerContent={(
								<div
									className={stylesVerticalNav.VerticalNav_NonNavLinkItem}
									onClick={this.props.onClickWorkspaceNav}
								>
									<Avatar
										className={styles.WorkspaceSwitcher_Avatar}
										color={this.state.activeWorkspaceItem.color}
										initials={this.state.activeWorkspaceItem.initials}
										placeholderSrc={this.state.activeWorkspaceItem.srcCache}
										size="s"
										src={this.state.activeWorkspaceItem.src}
										type={this.state.activeWorkspaceItem.isTeam ? 'team' : 'user'}
									/>
								</div>
							)}
						>
							{ hasTeams &&
								<>
									<div className={styles.WorkspaceSwitcher_Popup_InfoContainer}>
										<WarningSVG className={styles.WorkspaceSwitcher_Popup_WarningSvg} />
										<div className={styles.WorkspaceSwitcher_Popup_Text} >What’s this?</div>
										<CloseSmallSVG className={styles.WorkspaceSwitcher_Popup_CloseSvg} />
									</div>
									<div className={styles.WorkspaceSwitcher_PopupGrid}>
										{this.props.workspaces.map((workspaceItem) => {
											return (
												<div key={workspaceItem.id} onClick={() => this.onSelect(workspaceItem)}>
													<Avatar
														className={classnames(
															styles.WorkspaceSwitcher_PopupGridItem,
															styles.WorkspaceSwitcher_Avatar,
															{
																[styles.WorkspaceSwitcher_PopupGridItem__Active]: workspaceItem.id === this.state.activeWorkspaceItem.id,
																[styles.WorkspaceSwitcher_PopupGridItem__Team]: !workspaceItem.isTeam,
															},
														)}
														color={workspaceItem.color}
														initials={workspaceItem.initials}
														placeholderSrc={workspaceItem.srcCache}
														size="s"
														type={workspaceItem.isTeam ? 'team' : 'user'}
														src={workspaceItem.src}
													/>
												</div>
											);
										})}
										<div
											className={styles.WorkspaceSwitcher_PopupGridItemAdd}
											onClick={this.props.onClickAddTeam}
										>
											<AddSVG />
										</div>
									</div>
									<Divider />
								</>
							}
							<div className={styles.WorkspaceSwitcher_PopupFooter}>
								<Button
									className="__Green"
									onClick={() => (
										this.state.activeWorkspaceItem.isOwner
											?
											this.props.onClickManageTeam(this.state.activeWorkspaceItem)
											:
											this.props.onClickAccount()
									)}
								>
									{this.state.activeWorkspaceItem.isOwner ? 'Manage Team' : 'My Account'}
								</Button>
								{ !hasTeams &&
									<Button
										className="__Green"
										onClick={this.props.onClickAddTeam}
									>
										Add a Team
									</Button>
								}
								<Button
									className="__Green"
									onClick={this.props.onClickLogout}
								>
									Logout
								</Button>
							</div>
						</Popup>
						:
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M16 0a16 16 0 1 0 16 16A16.047 16.047 0 0 0 16 0zM7 26.7c0-1.4 1.9-3.9 3.3-4.7a7.1 7.1 0 0 1 2.1-.8c.3-.1.5-.1.7-.4a4.009 4.009 0 0 0 .3-3.2 1.6 1.6 0 0 0-.7-.9c-.6-.5-1.6-1.3-1.6-3.9 0-3.4 2-5.7 4.9-5.7s4.9 2.3 4.9 5.7c0 2.6-.9 3.4-1.6 3.9a1.6 1.6 0 0 0-.7.9 3.677 3.677 0 0 0 .4 3.2 1.612 1.612 0 0 0 .7.4 6.758 6.758 0 0 1 2 .8c1.4.8 3.3 3.4 3.3 4.7a13.657 13.657 0 0 1-9 3.3 13.657 13.657 0 0 1-9-3.3zm19.7-1.6a11.18 11.18 0 0 0-3.9-4.8 13.325 13.325 0 0 0-2.3-1 3.352 3.352 0 0 1 0-1 .349.349 0 0 1 .2-.1c.7-.6 2.3-1.9 2.3-5.4-.1-4.6-2.9-7.8-7-7.8-4 0-6.9 3.2-6.9 7.7 0 3.5 1.5 4.8 2.3 5.4.1.1.1.1.2.1a1.7 1.7 0 0 1 0 1 8.789 8.789 0 0 0-2.4 1A11.941 11.941 0 0 0 5.3 25 13.992 13.992 0 1 1 30 16a14.473 14.473 0 0 1-3.3 9.1z" /></svg>
				}
			</VerticalNavItem>
		);
	}

}
