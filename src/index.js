import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import metadata from '../src/block.json';

registerBlockType(metadata.name, {
	edit: Edit,
});
