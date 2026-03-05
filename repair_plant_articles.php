<?php
/**
 * Repair converted plant articles: add plant data block and featured image at top.
 * Fixes articles that were converted from plants but are missing:
 * - Plant details (Botanical Name, Family, Native to, etc.)
 * - Featured image at top of body
 *
 * Run via SSH: php repair_plant_articles.php
 * Or via browser: repair_plant_articles.php?run=1
 *
 * Dry run: repair_plant_articles.php?dry=1 or --dry
 */

require_once __DIR__ . '/vendor/autoload.php';

use Config\Config;
use Lib\Db;
use Lib\Controller;

Config::define_constants();

$argv = $GLOBALS['argv'] ?? $_SERVER['argv'] ?? [];
$dryRun = (isset($_GET['dry']) && $_GET['dry'] === '1')
    || (php_sapi_name() === 'cli' && in_array('--dry', $argv));
$run = php_sapi_name() === 'cli' || (isset($_GET['run']) && $_GET['run'] === '1');

if (!$run && !$dryRun) {
    die('Run via SSH: php repair_plant_articles.php — or add ?run=1. Use --dry or ?dry=1 for dry run.');
}

$db = (new Db)->connect();
$trees = Controller::load_model('trees_model');

// Get articles in native-plants category that have a matching tree (by slug)
$stmt = $db->pdo->query("
    SELECT a.id, a.slug, a.name, a.body, a.images
    FROM articles a
    INNER JOIN article_categories ac ON ac.article_id = a.id AND ac.category_id = 21
    WHERE EXISTS (SELECT 1 FROM trees t WHERE t.slug = a.slug)
    ORDER BY a.name
");
$articles = $stmt->fetchAll(PDO::FETCH_OBJ);

$repaired = 0;
$errors = [];

foreach ($articles as $article) {
    $tree = $trees->get(['slug' => $article->slug]);
    if (!$tree) {
        $errors[] = "Tree not found for: {$article->slug}";
        continue;
    }

    // Build plant data block (same format as manual conversion)
    $parts = [];

    if (!empty($tree->family_genus) && ($tree->family_genus->genus_name ?? $tree->specific_epithet ?? '')) {
        $botanical = trim(($tree->family_genus->genus_name ?? '') . ' ' . ($tree->specific_epithet ?? ''));
        if ($tree->subspecies ?? '') {
            $botanical .= ' subsp. ' . $tree->subspecies;
        }
        $parts[] = '<span class="bold">Botanical Name</span>: ' . htmlspecialchars($botanical) . ' <br>';
    }
    if (!empty($tree->other_common_names)) {
        $parts[] = '<span class="bold">Other Names</span>: ' . htmlspecialchars($tree->other_common_names) . '<br>';
    }
    if (!empty($tree->other_species)) {
        $parts[] = '<span class="bold">Other Botanical Names</span>: ' . htmlspecialchars($tree->other_species) . '<br>';
    }
    if (!empty($tree->family_genus) && !empty($tree->family_genus->family_name)) {
        $parts[] = '<span><span class="bold">Family</span>: ' . htmlspecialchars($tree->family_genus->family_name) . '</span><br>';
    }
    if (!empty($tree->native_to)) {
        $names = array_map(function ($n) { return $n->name; }, $tree->native_to);
        $parts[] = '<span class="bold">Native to</span>: ' . htmlspecialchars(implode(', ', $names)) . '<br>';
    }
    if (!empty($tree->zone) && !empty($tree->zone->name)) {
        $parts[] = '<span class="bold">Hardy to zone</span>: ' . htmlspecialchars($tree->zone->name) . '<br>';
    }
    if (!empty($tree->eco_benefits)) {
        $names = array_map(function ($e) { return $e->name; }, $tree->eco_benefits);
        $parts[] = '<span class="bold">Eco benefits</span>: ' . htmlspecialchars(implode(', ', $names)) . '<br>';
    }
    if (!empty($tree->natural_habitat)) {
        $names = array_map(function ($n) { return $n->name; }, $tree->natural_habitat);
        $parts[] = '<span class="bold">Natural habitat</span>: ' . htmlspecialchars(implode(', ', $names)) . '<br>';
    }
    if (!empty($tree->shapes)) {
        $names = array_map(function ($s) { return $s->name; }, $tree->shapes);
        $parts[] = '<span class="bold">Shapes</span>: ' . htmlspecialchars(implode(', ', $names)) . '<br>';
    }
    if (($tree->height_min ?? null) && ($tree->height_max ?? null)) {
        if ($tree->height_min == $tree->height_max) {
            $parts[] = '<span class="bold">Height</span>: ' . htmlspecialchars($tree->height_min) . 'ft<br>';
        } else {
            $parts[] = '<span class="bold">Height</span>: ' . htmlspecialchars($tree->height_min) . '-' . htmlspecialchars($tree->height_max) . 'ft<br>';
        }
    } elseif (!empty($tree->height_max)) {
        $parts[] = '<span class="bold">Height</span>: up to ' . htmlspecialchars($tree->height_max) . 'ft<br>';
    }
    if (($tree->width_min ?? null) && ($tree->width_max ?? null)) {
        $parts[] = '<span class="bold">width</span>: ' . htmlspecialchars($tree->width_min) . '-' . htmlspecialchars($tree->width_max) . 'ft<br>';
    }
    if (!empty($tree->growth_rate)) {
        $parts[] = '<span class="bold">Growth rate</span>: ' . htmlspecialchars($tree->growth_rate) . '<br>';
    }
    if (($tree->lifespan_min ?? null) && ($tree->lifespan_max ?? null)) {
        $parts[] = '<span class="bold">Lifespan</span>: ' . htmlspecialchars($tree->lifespan_min) . '-' . htmlspecialchars($tree->lifespan_max) . ' years<br>';
    }
    if (!empty($tree->unique_attractions)) {
        $names = array_map(function ($u) { return $u->name; }, $tree->unique_attractions);
        $parts[] = '<span class="bold">Unique attractions</span>: ' . htmlspecialchars(implode(', ', $names)) . '<br>';
    }
    if (!empty($tree->tolerances)) {
        $names = array_map(function ($t) { return $t->name; }, $tree->tolerances);
        $parts[] = '<span class="bold">Tolerances</span>: ' . htmlspecialchars(implode(', ', $names)) . '<br>';
    }
    if (!empty($tree->common_uses)) {
        $names = array_map(function ($c) { return $c->name; }, $tree->common_uses);
        $parts[] = '<span class="bold">Common uses</span>: ' . htmlspecialchars(implode(', ', $names)) . '<br>';
    }
    if (!empty($tree->light)) {
        $names = array_map(function ($l) { return $l->name; }, $tree->light);
        $parts[] = '<span class="bold">Light</span>: ' . htmlspecialchars(implode(', ', $names)) . '<br>';
    }
    if (!empty($tree->transplanting)) {
        $names = array_map(function ($t) { return $t->name; }, $tree->transplanting);
        $parts[] = '<span class="bold">Transplanting</span>: ' . htmlspecialchars(implode(', ', $names)) . '<br>';
    }
    if (!empty($tree->soil)) {
        $names = array_map(function ($s) { return $s->name; }, $tree->soil);
        $parts[] = '<span class="bold">Soil</span>: ' . htmlspecialchars(implode(', ', $names)) . '<br>';
    }
    if (!empty($tree->reproduction_type) && !empty($tree->reproduction_type->name)) {
        $parts[] = '<span class="bold">Reproduction type</span>: ' . htmlspecialchars($tree->reproduction_type->name) . '<br>';
    }

    $plantDataBlock = implode("\r\n", $parts);

    // Featured image (first image)
    $images = $tree->images ?: [];
    $firstImg = null;
    foreach ($images as $img) {
        $n = is_object($img) ? $img->name : ($img['name'] ?? null);
        if ($n && strpos($n, 'thumb') === false) {
            $firstImg = $n;
            break;
        }
    }
    if (!$firstImg && !empty($images)) {
        $firstImg = is_object($images[0]) ? $images[0]->name : ($images[0]['name'] ?? null);
    }

    $featuredHtml = '';
    if ($firstImg) {
        $desc = '';
        foreach ($images as $img) {
            $n = is_object($img) ? $img->name : ($img['name'] ?? null);
            if ($n === $firstImg) {
                $desc = is_object($img) ? ($img->description ?? $article->name) : ($img['description'] ?? $article->name);
                break;
            }
        }
        $desc = $desc ?: $article->name;
        $featuredHtml = '<figure>' . "\r\n" . '<div class="media-center"><img alt="' . htmlspecialchars($desc) . '" src="/uploads/articles/' . htmlspecialchars($firstImg) . '" /></div>' . "\r\n" . '</figure>' . "\r\n\r\n";
    }

    // Check if body already has plant data (starts with <figure> or <span class="bold">Botanical)
    $body = $article->body ?: '';
    $hasPlantData = (strpos($body, '<span class="bold">Botanical Name</span>') !== false)
        || (preg_match('/^<figure>/', trim($body)) && strpos($body, 'media-center') !== false);

    if ($hasPlantData) {
        echo ($dryRun ? "[DRY] " : "") . "Skip (already has plant data): {$article->name}\n";
        continue;
    }

    // Prepend featured image + plant data + hr to body
    $newBody = $featuredHtml;
    if ($plantDataBlock) {
        $newBody .= $plantDataBlock . "\r\n<hr>\r\n\r\n";
    }
    $newBody .= $body;

    // Ensure body uses /uploads/articles/ not /uploads/trees/
    $newBody = str_replace('/uploads/trees/', '/uploads/articles/', $newBody);
    $newBody = str_replace('uploads/trees/', '/uploads/articles/', $newBody);

    if (!$dryRun) {
        $upd = $db->pdo->prepare("UPDATE articles SET body = ? WHERE id = ?");
        $upd->execute([$newBody, $article->id]);
    }

    $repaired++;
    echo ($dryRun ? "[DRY] " : "") . "Repaired: {$article->name} ({$article->slug})\n";
}

echo "\n=== SUMMARY ===\n";
echo "Repaired: $repaired articles\n";
if ($errors) {
    echo "Errors:\n";
    foreach ($errors as $e) echo "  - $e\n";
}
echo "\nDone.\n";
