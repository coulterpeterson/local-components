import React from 'react';
import classnames from 'classnames';
import EyeSVG from '../../svg/eye.svg';
import ReactComponentPropsI from '../../common/structures/ReactComponentPropsI';

interface StateI {

	inputType: 'password' | 'text';

}

export default class InputPasswordToggle extends React.Component<ReactComponentPropsI, StateI> {

	constructor (props: ReactComponentPropsI) {
		super(props);

		this.state = {
			inputType: 'password',
		};

		this.toggleType = this.toggleType.bind(this);
	}

	toggleType () {
		this.setState({
			inputType: this.state.inputType === 'password' ? 'text' : 'password',
		});
	}

	render () {
		const { className, ...props } = this.props;

		return (
			<div
				className={classnames(
					'PasswordToggle',
					`PasswordToggle__${this.state.inputType}`,
					this.props.className,
				)}
			>
				<input
					type={this.state.inputType}
					className={className ? `PasswordToggleInput ${className}` : 'PasswordToggleInput'}
					{...props}
				/>
				<span
					className="Eye"
					onClick={this.toggleType}
				>
					<svg>{EyeSVG}</svg>
				</span>
			</div>
		);
	}

}