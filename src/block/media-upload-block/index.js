/**
 * BLOCK: demo-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */
const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { MediaUpload } = wp.editor;
const { Button } = wp.components;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'cgb/media-upload-block', {

	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'VK Media Upload' ), // Block title.
	icon: 'upload', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.

	attributes: {
		imgURL: {
			type: 'string',
			source: 'attribute',
			attribute: 'src',
			selector: 'img',
		},
		imgID: {
			type: 'number',
		},
		imgAlt: {
			type: 'string',
			source: 'attribute',
			attribute: 'alt',
			selector: 'img',
		},
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: function( props ) {
		const onFileSelect = ( img ) => {
			props.setAttributes( {
				imgURL: img.url,
				imgID: img.id,
				imgAlt: img.alt,
			} );
		}

		const onRemoveImage = () => {
			props.setAttributes( {
				imgURL: null,
				imgID: null,
				imgAlt: null,
			} );
		}

		return (
			<div className="media-wrapper">
				{
					(props.attributes.imgURL) ? (
						<div>
							<img
								src={props.attributes.imgURL}
								alt={props.attributes.imgAlt}
							/>
							{
								(props.isSelected) ? (
									<Button
										onClick={ onRemoveImage }
									>Remove</Button>
								) : null
							}
						</div>
					) : (
					<MediaUpload
						onSelect={ onFileSelect }
						value={props.attributes.imgID}
						render={ ({open}) =>
							<Button onClick={open} className="button">
								Open Library
							</Button>
						}
					/>
					)
				}
			</div>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: function( props ) {
		return (
			<div className="img-wrapper">
				<img
					src={props.attributes.imgURL}
					alt={props.attributes.imgAlt}
				/>
			</div>
		);
	},
} );
