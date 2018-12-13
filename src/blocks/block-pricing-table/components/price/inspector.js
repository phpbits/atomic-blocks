/**
 * Inspector Controls
 */

// Setup the block
const { __ } = wp.i18n;
const { Component } = wp.element;

// Import Inspector components
const {
	InspectorControls,
	BlockDescription,
	ColorPalette,
	PanelColorSettings,
	FontSizePicker,
	withFontSizes,
} = wp.editor;

const {
	withFallbackStyles,
	PanelBody,
} = wp.components;

// Compose
const { compose } = wp.compose;

const applyFallbackStyles = withFallbackStyles( ( node, ownProps ) => {
	const { fontSize, customFontSize } = ownProps.attributes;
	const editableNode = node.querySelector( '[contenteditable="true"]' );
	//verify if editableNode is available, before using getComputedStyle.
	const computedStyles = editableNode ? getComputedStyle( editableNode ) : null;
	return {
		fallbackFontSize: fontSize || customFontSize || ! computedStyles ? undefined : parseInt( computedStyles.fontSize ) || undefined,
	};
} );

/**
 * Create an Inspector Controls wrapper Component
 */
class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		// Setup the attributes
		const {
			attributes: {
				price,
			},
			attributes,
			fallbackFontSize,
			fontSize,
			isSelected,
			setAttributes,
			setFontSize,
		} = this.props;

		return (
		<InspectorControls key="inspector">
			<PanelBody title={ __( 'Text Settings', 'atomic-blocks' ) }>
				<FontSizePicker
					fallbackFontSize={ fallbackFontSize }
					value={ fontSize.size }
					onChange={ setFontSize }
				/>
			</PanelBody>
		</InspectorControls>
		);
	}
}

export default compose( [
	applyFallbackStyles,
	withFontSizes( 'fontSize' ),
] )( Inspector );