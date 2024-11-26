<?php
/**
 * Plugin Name:       My Latest Posts Block
 * Description:       A Gutenberg block to display latest posts.
 * Version:           1.0.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:           Onur Sonmez
 * License:          GPL-2.0-or-later
 * License URI:      https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:      latest-posts-block
 */

function my_latest_posts_block_init() {
    register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'my_latest_posts_block_init' );