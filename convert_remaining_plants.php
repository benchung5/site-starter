<?php
/**
 * Convert the 49 remaining plants from trees to articles.
 * - Moves images from uploads/trees/ to uploads/articles/ (original, -med, -sml)
 * - Sets trees to draft (mode_id=1)
 * - Creates articles with body (paths updated to /uploads/articles/)
 * - Links articles to native-plants category (id 21)
 *
 * Run via SSH: php convert_remaining_plants.php
 * Or via browser: convert_remaining_plants.php?run=1
 *
 * Dry run (no DB changes, no file moves): convert_remaining_plants.php?dry=1
 */

require_once __DIR__ . '/vendor/autoload.php';

use Config\Config;
use Lib\Db;

Config::define_constants();

$argv = $GLOBALS['argv'] ?? $_SERVER['argv'] ?? [];
$dryRun = (isset($_GET['dry']) && $_GET['dry'] === '1')
    || (php_sapi_name() === 'cli' && in_array('--dry', $argv));
$run = php_sapi_name() === 'cli' || (isset($_GET['run']) && $_GET['run'] === '1');

if (!$run && !$dryRun) {
    die('Run via SSH: php convert_remaining_plants.php — or add ?run=1 to the URL. Use --dry or ?dry=1 for a dry run.');
}

$db = (new Db)->connect();

$converted_ids = [74, 108, 116, 118, 120, 121, 123, 124, 127, 132, 135, 141];
$skip_names = [
    'Bearberry', 'Bunchberry', 'Canada mint', 'Clasping twistedstalk',
    'Common Juniper', 'Fireweed', 'Hawthorns', 'Labrador tea',
    'Shrubby Cinquefoil', 'Soapberry', 'Tamarack', 'Yarrow',
    'Comfrey', 'Common eyebright', 'Echinacea', 'Wormwood', 'Valerian',
    'Cow Parsnip', 'Black Cherry'
];

$placeholders = implode(',', array_fill(0, count($converted_ids), '?'));
$skip_placeholders = implode(',', array_fill(0, count($skip_names), '?'));

$sql = "SELECT t.id, t.slug, t.common_name, t.body, t.images,
        (SELECT tc.slug FROM trees_categories ttc
         INNER JOIN trees_category tc ON tc.id = ttc.trees_category_id
         WHERE ttc.tree_id = t.id
         ORDER BY tc.name LIMIT 1) AS category_slug
        FROM trees t
        WHERE t.mode_id != 1
        AND t.id NOT IN ($placeholders)
        AND t.common_name NOT IN ($skip_placeholders)
        ORDER BY t.common_name";

$params = array_merge($converted_ids, $skip_names);
$stmt = $db->pdo->prepare($sql);
$stmt->execute($params);
$plants = $stmt->fetchAll(PDO::FETCH_OBJ);

$baseDir = __DIR__;
$sourceDir = $baseDir . '/uploads/trees';
$destDir = $baseDir . '/uploads/articles';

$variant = function ($base, $suffix) {
    return preg_replace('/(\.[\w\d_-]+)$/i', '-' . $suffix . '$1', $base);
};

$NATIVE_PLANTS_CAT = 21;
$redirects = [];
$converted = 0;
$errors = [];

if (!is_dir($destDir) && !$dryRun) {
    mkdir($destDir, 0755, true);
}

foreach ($plants as $plant) {
    $images = $plant->images ? json_decode($plant->images) : [];
    if (!is_array($images)) {
        $images = [];
    }

    // 1. Move images (original, med, sml) from trees to articles
    $sourcePaths = [$sourceDir, $sourceDir . '/temp'];
    foreach ($images as $img) {
        $name = is_object($img) ? $img->name : $img['name'];
        if (!$name) continue;

        $variants = [
            ['src' => $name, 'dest' => $name],
            ['src' => $variant($name, 'med'), 'dest' => $variant($name, 'med')],
            ['src' => $variant($name, 'sml'), 'dest' => $variant($name, 'sml')],
        ];

        foreach ($variants as $v) {
            $destPath = $destDir . '/' . $v['dest'];
            $found = false;
            $srcPath = null;

            foreach ($sourcePaths as $srcBase) {
                $tryPath = $srcBase . '/' . $v['src'];
                if (file_exists($tryPath)) {
                    $found = true;
                    $srcPath = $tryPath;
                    break;
                }
                $glob = glob($srcBase . '/' . pathinfo($v['src'], PATHINFO_FILENAME) . '.*');
                if ($glob) {
                    $found = true;
                    $srcPath = $glob[0];
                    break;
                }
            }

            if ($found && $srcPath && !$dryRun) {
                if (file_exists($destPath)) {
                    @unlink($destPath);
                }
                if (rename($srcPath, $destPath)) {
                    // moved
                } elseif (copy($srcPath, $destPath)) {
                    unlink($srcPath);
                } else {
                    $errors[] = "Could not move: {$v['src']}";
                }
            }
        }
    }

    // 2. Prepare article body (replace upload paths)
    $body = $plant->body ?: '';
    $body = str_replace('/uploads/trees/', '/uploads/articles/', $body);
    $body = str_replace('uploads/trees/', '/uploads/articles/', $body);

    // 3. Images JSON for article (keep same structure)
    $imagesJson = $plant->images ?: '[]';

    // 4. Insert article
    if (!$dryRun) {
        $check = $db->pdo->prepare("SELECT id FROM articles WHERE slug = ?");
        $check->execute([$plant->slug]);
        if ($check->fetch()) {
            $errors[] = "Article already exists: {$plant->slug}";
            continue;
        }

        $ins = $db->pdo->prepare("
            INSERT INTO articles (slug, name, body, images, mode_id, created_on, deleted_on)
            VALUES (?, ?, ?, ?, 2, CURDATE(), NULL)
        ");
        $ins->execute([$plant->slug, $plant->common_name, $body, $imagesJson]);

        // 5. Link to native-plants category
        $artId = $db->pdo->lastInsertId();
        $ac = $db->pdo->prepare("INSERT IGNORE INTO article_categories (article_id, category_id) VALUES (?, ?)");
        $ac->execute([$artId, $NATIVE_PLANTS_CAT]);

        // 6. Set tree to draft
        $upd = $db->pdo->prepare("UPDATE trees SET mode_id = 1 WHERE id = ?");
        $upd->execute([$plant->id]);
    }

    $catSlug = $plant->category_slug ?: 'native-plants';
    $redirects[] = "RewriteRule ^plants/{$catSlug}/{$plant->slug}/?$ /articles/native-plants/{$plant->slug} [R=301,L]";
    $converted++;
    echo ($dryRun ? "[DRY] " : "") . "Converted: {$plant->common_name} ({$plant->slug})\n";
}

echo "\n=== SUMMARY ===\n";
echo "Converted: $converted plants\n";
if ($errors) {
    echo "Errors:\n";
    foreach ($errors as $e) echo "  - $e\n";
}

echo "\n=== HTACCESS REDIRECTS (add to .htaccess before the main RewriteRule) ===\n";
$redirectBlock = "# Plant-to-article redirects (49 plants)\n" . implode("\n", $redirects);
echo $redirectBlock . "\n";

$redirectFile = __DIR__ . '/htaccess_redirects_49.txt';
if (!$dryRun && file_put_contents($redirectFile, $redirectBlock)) {
    echo "\nRedirects also saved to htaccess_redirects_49.txt\n";
}

echo "\nDone.\n";
