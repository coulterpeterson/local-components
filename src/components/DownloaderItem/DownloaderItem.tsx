import React from 'react';
import ReactComponentPropsI from '../../common/structures/ReactComponentPropsI';
import ProgressBar from '../ProgressBar';
// import { ipcRenderer } from 'electron'; // crum - todo: figure this out

interface PropsI extends ReactComponentPropsI {

	cancelText?: string;
	downloaded?: number;
	itemSize?: number;
	label?: string;
	onCancel?: (...params: any[]) => any;
	onCancelIPCEvent?: string;
	progress?: number;
	progressText?: string | number | boolean;
	queueIndex?: number;
	queueLength?: number;
	showCancel?: boolean;
	showEllipsis?: boolean;
	stripes?: boolean;

}

export default class DownloaderItem extends React.Component<PropsI> {

	static defaultProps: Partial<PropsI> = {
		cancelText: 'Cancel Download',
		showEllipsis: true,
	};

	constructor (props: PropsI) {
		super(props);

		this.cancelOnClick = this.cancelOnClick.bind(this);
	}

	cancelOnClick (...args: any[]) {
		if (this.props.onCancel) {
			return this.props.onCancel(...args);
		}

		if (this.props.onCancelIPCEvent) {
			//return ipcRenderer.send(this.props.onCancelIPCEvent);
		}
	}

	render () {
		return (
			<li className="DownloaderItem">
				<span>
					{this.props.label}
					{this.props.queueLength && this.props.queueLength > 1 && ` (${(this.props.queueIndex || 0) + 1} of ${this.props.queueLength})`}
					{this.props.showEllipsis && '...'}
				</span>
				<ProgressBar
					progress={this.props.progress}
					stripes={this.props.stripes}
				/>
				<span className="DownloadSizeProgress">
					{
						this.props.progressText
							?
							this.props.progressText
							:
							!isNaN(this.props.itemSize || NaN)
								?
								`${!isNaN(this.props.downloaded || NaN) ? this.props.downloaded : 0}/${this.props.itemSize} MB`
								:
								<span>&nbsp;</span>
					}
				</span>
				{
					this.props.showCancel && (
						<button
							className="__Green"
							onClick={this.cancelOnClick}
						>
							{this.props.cancelText}
						</button>
					)
				}
			</li>
		);
	}
}