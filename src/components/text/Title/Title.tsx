import * as React from 'react';
import TextBase, {
	ITextBaseProps,
	ITextCommonProps,
	TextBasePropColor,
	TextBasePropFontSize,
	TextBasePropFontWeight,
} from '../_private/TextBase/TextBase';

export enum TitlePropSize {
	s = 's',
	m = 'm',
	l = 'l',
	xl = 'xl',
	caption = 'caption',
}

interface IProps extends ITextCommonProps {
	privateOptions?: ITextBaseProps;
	size?: TitlePropSize;
}

export const Title = (props: IProps) => {
	const {privateOptions, size, ...otherProps} = props;

	return (
		<TextBase
			className="Title"
			color={setColorProp(size, TextBasePropColor.graydark_white_caption)}
			fontSize={setSizeProp(size, TextBasePropFontSize.m)}
			fontWeight={TextBasePropFontWeight.medium}
			{...privateOptions}
			{...otherProps}
		/>
	);
};

Title.defaultProps = {
	size: TitlePropSize.m,
	tag: 'div',
} as Partial<IProps>;

function setSizeProp (size: TitlePropSize | undefined, defaultValue: TextBasePropFontSize): TextBasePropFontSize {
	switch (size) {
		case TitlePropSize.s:
			return TextBasePropFontSize.s;
		case TitlePropSize.m:
		case TitlePropSize.caption:
			return TextBasePropFontSize.m;
		case TitlePropSize.l:
			return TextBasePropFontSize.l;
		case TitlePropSize.xl:
			return TextBasePropFontSize.xl;
	}

	return defaultValue;
}

function setColorProp (size: TitlePropSize | undefined, defaultColor: TextBasePropColor): TextBasePropColor {
	switch (size) {
		case TitlePropSize.caption:
			return TextBasePropColor.gray_gray75_title;
	}

	return defaultColor;
}