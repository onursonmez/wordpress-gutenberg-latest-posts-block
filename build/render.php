<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

$numberOfPosts = isset($attributes['numberOfPosts']) ? $attributes['numberOfPosts'] : 5;

$args = array(
    'post_type' => 'post',
    'posts_per_page' => $numberOfPosts,
    'post_status' => 'publish',
    'orderby' => 'date',
    'order' => 'DESC'
);

$latest_posts = get_posts($args);

if (!empty($latest_posts)) :
?>
    <div <?php echo get_block_wrapper_attributes(); ?>>
        <ul class="latest-posts-list">
            <?php foreach ($latest_posts as $post) : ?>
                <li class="latest-post-item">
                    <h4 class="post-title">
                        <a href="<?php echo esc_url(get_permalink($post->ID)); ?>">
                            <?php echo esc_html($post->post_title); ?>
                        </a>
                    </h4>
                    <div class="post-meta">
                        <span class="post-date">
                            <?php echo get_the_date('F j, Y', $post->ID); ?>
                        </span>
                    </div>
                    <div class="post-excerpt">
                        <?php echo wp_trim_words($post->post_excerpt ?: $post->post_content, 20); ?>
                    </div>
                </li>
            <?php endforeach; ?>
        </ul>
    </div>
<?php else : ?>
    <div <?php echo get_block_wrapper_attributes(); ?>>
        <p><?php _e('No posts found.', 'latest-posts-block'); ?></p>
    </div>
<?php endif; ?>