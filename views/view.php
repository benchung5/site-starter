
<?php 
use Config\Config as Config;
use Lib\Utils;
?>

<?php $this->insert('header', $view_data ); ?>

<div class="site-wrapper">
	<div class="content-wrapper view">
		<div class="row">
			<div class="small-12 columns internal">

				<div class="row">
					<div class="small-12 large-10 large-centered columns article-content">
						<div class="title-area">
							<h1><?= $view_data['article']->name ?></h1>
							<div class="article-meta">
								<span class="meta-item">
									<span class="meta-label">Published</span>
									<span class="meta-value"><?= date('F jS, Y', strtotime(Utils::sanitize($view_data['article']->created_on))) ?></span>
								</span>
								<?php if ($view_data['article']->categories): ?>
									<span class="meta-divider">|</span>
									<span class="meta-item">
										<span class="meta-label">Categories</span>
										<span class="meta-value">
										<?php
										$categoryLinks = [];
										foreach ($view_data['article']->categories as $category) {
											$categoryLinks[] = '<a href="/articles#categories=' . Utils::sanitize($category->slug) . '">' . Utils::sanitize($category->name) . '</a>';
										}
										echo implode(', ', $categoryLinks);
										?>
										</span>
									</span>
								<?php endif; ?>
							</div>
						</div>
						<!-- don't sanitize body since we need html -->
						<div class="body-area"><?= $view_data['article']->body ?>
							
						<?php  
						    // Always use production URL for share links
						    $url = "https://naturewithus.com" . $_SERVER['REQUEST_URI'];
						    
						    $encoded_url = urlencode($url);
						    $encoded_title = urlencode($view_data['article']->name);
						 ?> 

						</div>
						
						<div class="article-share">
							<span class="share-label">Share</span>
							<a href="https://www.facebook.com/sharer/sharer.php?u=<?= $encoded_url ?>" target="_blank" rel="noopener noreferrer" class="social-share-link facebook" title="Share on Facebook" aria-label="Share on Facebook">
								<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
									<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
								</svg>
							</a>
							<a href="https://x.com/intent/tweet?url=<?= $encoded_url ?>&text=<?= $encoded_title ?>" target="_blank" rel="noopener noreferrer" class="social-share-link x" title="Share on X" aria-label="Share on X">
								<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
									<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
								</svg>
							</a>
							<a href="https://www.linkedin.com/sharing/share-offsite/?url=<?= $encoded_url ?>" target="_blank" rel="noopener noreferrer" class="social-share-link linkedin" title="Share on LinkedIn" aria-label="Share on LinkedIn">
								<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
									<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
								</svg>
							</a>
							<a href="https://pinterest.com/pin/create/button/?url=<?= $encoded_url ?>&description=<?= $encoded_title ?>" target="_blank" rel="noopener noreferrer" class="social-share-link pinterest" title="Share on Pinterest" aria-label="Share on Pinterest">
								<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
									<path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.001 12 24.001c6.624 0 11.999-5.373 11.999-12.001C23.999 5.372 18.627.001 12 .001z"/>
								</svg>
							</a>
						</div>

					</div>
				</div>
			</div>

		</div>
	</div><!-- /content wrapper -->

	<?php if (!empty($view_data['related_articles'])): ?>
		<?php
			// Get the primary category for the "View all" link
			$primary_category = $view_data['article']->categories[0] ?? null;
		?>
		<div class="related-posts-section">
			<div class="row">
				<div class="small-12 columns">
					<div class="related-posts-header">
						<h2>Related Posts</h2>
						<?php if ($primary_category): ?>
							<a href="/articles#categories=<?= Utils::sanitize($primary_category->slug) ?>" class="view-all-button">View all</a>
						<?php endif; ?>
					</div>
					<div class="related-posts-grid">
						<?php foreach ($view_data['related_articles'] as $related): ?>
							<?php
								// Get the primary category for this related article
								$related_primary_cat = !empty($related->categories) ? $related->categories[0] : null;
								$related_url = $related_primary_cat ? '/articles/' . Utils::sanitize($related_primary_cat->slug) . '/' . Utils::sanitize($related->slug) : '#';
								
								// Generate summary from body (strip HTML, truncate)
								$body_text = strip_tags($related->body);
								$summary = mb_substr($body_text, 0, 150);
								if (mb_strlen($body_text) > 150) {
									$summary .= '...';
								}
								
								// Get first image
								$image_url = '';
								$image_alt = '';
								if (!empty($related->images) && isset($related->images[0])) {
									$image_url = '/uploads/articles/' . Utils::sanitize($related->images[0]->name);
									$image_alt = isset($related->images[0]->description) ? Utils::sanitize($related->images[0]->description) : Utils::sanitize($related->name);
								} else {
									$image_url = '/assets/img/placeholder-images/placeholder-img.png';
									$image_alt = Utils::sanitize($related->name);
								}
							?>
							<article class="related-post-item">
								<a href="<?= $related_url ?>" class="related-post-link">
									<div class="related-post-image">
										<img src="<?= $image_url ?>" alt="<?= $image_alt ?>" />
									</div>
									<div class="related-post-content">
										<h3 class="related-post-title"><?= Utils::sanitize($related->name) ?></h3>
										<p class="related-post-summary"><?= Utils::sanitize($summary) ?></p>
										<div class="related-post-meta">
											<span class="related-post-author">Ben Chung</span>
											<span class="related-post-date"><?= date('F j, Y', strtotime($related->created_on)) ?></span>
										</div>
									</div>
								</a>
							</article>
						<?php endforeach; ?>
					</div>
				</div>
			</div>
		</div>
	<?php endif; ?>

	<?php $this->insert('footer', $view_data ); ?>

</div><!-- /site wrapper -->