import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { format } from '@wordpress/date';

export default function Edit({ attributes, setAttributes }) {
    const { numberOfPosts, displayFeaturedImage, displayExcerpt } = attributes;
    const blockProps = useBlockProps();

    const posts = useSelect(
        (select) => {
            return select('core').getEntityRecords('postType', 'post', {
                per_page: numberOfPosts,
                _embed: true,
            });
        },
        [numberOfPosts]
    );

    return (
        <div {...blockProps}>
            <InspectorControls>
                <PanelBody title={__('Ayarlar', 'my-latest-posts-block')}>
                    <RangeControl
                        label={__(
                            'Gösterilecek yazı sayısı',
                            'my-latest-posts-block'
                        )}
                        value={numberOfPosts}
                        onChange={(value) =>
                            setAttributes({ numberOfPosts: value })
                        }
                        min={1}
                        max={10}
                    />
                    <ToggleControl
                        label={__('Öne çıkan görsel', 'my-latest-posts-block')}
                        checked={displayFeaturedImage}
                        onChange={() =>
                            setAttributes({
                                displayFeaturedImage: !displayFeaturedImage,
                            })
                        }
                    />
                    <ToggleControl
                        label={__('Özet', 'my-latest-posts-block')}
                        checked={displayExcerpt}
                        onChange={() =>
                            setAttributes({
                                displayExcerpt: !displayExcerpt,
                            })
                        }
                    />
                </PanelBody>
            </InspectorControls>

            <div className="wp-block-custom-latest-posts">
                {!posts && <div>Yükleniyor...</div>}
                {posts && posts.length === 0 && <div>Yazı bulunamadı.</div>}
                {posts && posts.length > 0 && (
                    <ul>
                        {posts.map((post) => (
                            <li key={post.id}>
                                {displayFeaturedImage &&
                                    post._embedded['wp:featuredmedia'] && (
                                        <div>
                                            <img
                                                src={
                                                    post._embedded[
                                                        'wp:featuredmedia'
                                                    ][0].source_url
                                                }
                                                alt={post.title.rendered}
                                            />
                                        </div>
                                    )}
                                <div>
                                    <h3>
                                        <a href={post.link}>
                                            {post.title.rendered}
                                        </a>
                                    </h3>
                                    {displayExcerpt && (
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: post.excerpt.rendered,
                                            }}
                                        />
                                    )}
                                    <div>
                                        <span>
                                            {format('d F Y', post.date)}
                                        </span>
                                        <a href={post.link}>Devamını Oku →</a>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
