<?php
/**
 * List plants in trees table that are eligible for conversion to articles.
 * Excludes: drafts (mode_id=1), skip list, and already-converted plants.
 * Run via: php list_remaining_plants.php
 * Or: http://localhost/1pix_app/list_remaining_plants.php
 */

require_once __DIR__ . '/vendor/autoload.php';

use Config\Config;
use Lib\Db;

Config::define_constants();

$db = (new Db)->connect();

// Already converted (set to draft in convert_all_plants.sql)
$converted_ids = [74, 108, 116, 118, 120, 121, 123, 124, 127, 132, 135, 141];

// Skip list - plants to exclude from conversion
$skip_names = [
    'Bearberry', 'Bunchberry', 'Canada mint', 'Clasping twistedstalk',
    'Common Juniper', 'Fireweed', 'Hawthorns', 'Labrador tea',
    'Shrubby Cinquefoil', 'Soapberry', 'Tamarack', 'Yarrow',
    'Comfrey', 'Common eyebright', 'Echinacea', 'Wormwood', 'Valerian',
    'Cow Parsnip', 'Black Cherry'
];

$placeholders = implode(',', array_fill(0, count($converted_ids), '?'));
$skip_placeholders = implode(',', array_fill(0, count($skip_names), '?'));

$sql = "SELECT t.id, t.slug, t.common_name, t.mode_id, t.images
        FROM trees t
        WHERE t.mode_id != 1
        AND t.id NOT IN ($placeholders)
        AND t.common_name NOT IN ($skip_placeholders)
        ORDER BY t.common_name";

$params = array_merge($converted_ids, $skip_names);
$stmt = $db->pdo->prepare($sql);
$stmt->execute($params);
$rows = $stmt->fetchAll(PDO::FETCH_OBJ);

echo "=== REMAINING PLANTS ELIGIBLE FOR CONVERSION ===\n\n";
echo "Total: " . count($rows) . " plants\n\n";

foreach ($rows as $r) {
    $img_count = 0;
    if ($r->images) {
        $imgs = json_decode($r->images);
        $img_count = is_array($imgs) ? count($imgs) : 0;
    }
    echo sprintf("ID %4d | %-35s | slug: %-30s | %d images\n",
        $r->id, $r->common_name, $r->slug, $img_count);
}

echo "\n=== END ===\n";
