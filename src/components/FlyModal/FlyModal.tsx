import * as React from 'react';
import classnames from 'classnames';
import * as styles from './FlyModal.sass';
import Close from '../Close';
import IReactComponentProps from '../../common/structures/IReactComponentProps';

const ReactModal = require('react-modal');

/**
 * Try catch for Local vs. Styleguidist
 */

declare let __non_webpack_require__: any;
let ReactDOM: any;

try {
	ReactDOM = __non_webpack_require__('react-dom');
}
catch (e) {
	ReactDOM = require('react-dom');
}

if (typeof document !== 'undefined' && document.getElementById('root')) {
	ReactModal.setAppElement('#root');
}
else {
	ReactModal.setAppElement('body');
}

interface IProps extends IReactComponentProps {

	ariaHideApp?: boolean;
	closeTimeoutMS?: number;
	hasIcon?: boolean;
	isOpen?: boolean;
	onRequestClose?: () => void;
	overlayClassName?: string;
	parentSelector?: () => {};
	portalClassName?: string;
	shouldCloseOnOverlayClick?: boolean;

}

export default class FlyModal extends React.Component<IProps> {

	static defaultProps: Partial<IProps> = {
		ariaHideApp: true,
		closeTimeoutMS: 0,
		hasIcon: false,
		isOpen: true,
		onRequestClose: FlyModal.onRequestClose,
		overlayClassName: styles.FlyModalOverlay,
		parentSelector: () => document.body,
		portalClassName: 'ReactModalPortal',
		shouldCloseOnOverlayClick: true,
	};

	static onRequestClose () {
		document.getElementsByClassName(styles.FlyModalOverlay)[0].classList.add('__FadeOut');
		ReactDOM.unmountComponentAtNode(document.getElementById('popup-container'));
	}

	render () {
		return (
			<ReactModal
				{...this.props}
				className={classnames(
					styles.FlyModal,
					'FlyModal', // in here for tests
				)} // warning: this must be set after {...this.props} to work
			>
				<Close
					className={classnames({
						[styles.FlyModal__HasIcon]: this.props.hasIcon,
					})}
					onClick={FlyModal.onRequestClose}
				/>
				{this.props.children}
			</ReactModal>
		);
	}

}