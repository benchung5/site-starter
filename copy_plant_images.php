<?php
/**
 * Move and rename plant images from uploads/trees/ to uploads/articles/
 * Run this script ON THE SERVER to move images from plant pages to article pages.
 * After running, images will no longer be available to plants—only to articles.
 *
 * Run via SSH: php copy_plant_images.php
 * Or via browser: copy_plant_images.php?run=1 (delete this file afterward)
 */

if (php_sapi_name() !== 'cli' && (!isset($_GET['run']) || $_GET['run'] !== '1')) {
    die('Run via SSH: php copy_plant_images.php — or add ?run=1 to the URL. Delete this file after running.');
}

$baseDir = __DIR__;
$sourceDir = $baseDir . '/uploads/trees';
$destDir = $baseDir . '/uploads/articles';

// Mapping: source_filename => dest_filename (in articles folder)
$mappings = [
    // Service Berry (74)
    'service-berry-128.jpg' => 'service-berry-128.jpg',
    'service-berry-flowers-129.jpg' => 'service-berry-flowers-129.jpg',
    'service-berry-1-130.jpg' => 'service-berry-1-130.jpg',
    'service-berry-leaves-131.jpg' => 'service-berry-leaves-131.jpg',
    // Trembling Aspen (108)
    'DSC_7848-524.JPG' => 'trembling-aspen-524.jpg',
    'original-525.jpg' => 'trembling-aspen-525.jpg',
    'original-526.jpg' => 'trembling-aspen-526.jpg',
    'original-527.jpg' => 'trembling-aspen-527.jpg',
    'original-528.jpg' => 'trembling-aspen-528.jpg',
    // Balsam Poplar (116)
    'balsam-poplar-288.jpg' => 'balsam-poplar-288.jpg',
    // Highbush Cranberry (118)
    '1024px-Viburnum_trilobum_CT_05-405.jpg' => 'highbush-cranberry-405.jpg',
    'original-406.jpg' => 'highbush-cranberry-406.jpg',
    'fruit-407.jpg' => 'highbush-cranberry-407.jpg',
    // Sandbar Willow (120)
    'original-486.jpg' => 'sandbar-willow-486.jpg',
    'original-487.jpg' => 'sandbar-willow-487.jpg',
    // Pussy Willow (121)
    'original3-453.jpg' => 'pussy-willow-453.jpg',
    'original4-454.jpg' => 'pussy-willow-454.jpg',
    'original-455.jpg' => 'pussy-willow-455.jpg',
    // Bebb Willow (123)
    'original-331.jpg' => 'bebb-willow-331.jpg',
    '1024px-Salix_bebbiana_-_Bebb_willow_-_Flickr_-_Matt_Lavin-332.jpg' => 'bebb-willow-332.jpg',
    'original-333.jpg' => 'bebb-willow-333.jpg',
    'original-334.jpg' => 'bebb-willow-334.jpg',
    // Sageleaf Willow (124)
    'original2-465.jpg' => 'sageleaf-willow-465.jpg',
    'original1-466.jpg' => 'sageleaf-willow-466.jpg',
    'original5-467.jpg' => 'sageleaf-willow-467.jpg',
    // Pacific Willow (127)
    'PXL_20240610_185059415-1046.jpg' => 'pacific-willow-1046.jpg',
    'PXL_20240610_190132548-1047.jpg' => 'pacific-willow-1047.jpg',
    'PXL_20240610_190119473-1048.jpg' => 'pacific-willow-1048.jpg',
    'PXL_20240706_180340364-1049.jpg' => 'pacific-willow-1049.jpg',
    'PXL_20240706_180411005.MP-1050.jpg' => 'pacific-willow-1050.jpg',
    // Bog Willow (132)
    'Salix_pedicellaris_5472344-357.jpg' => 'bog-willow-357.jpg',
    '1024px-Salix_pedicellaris_5497216-358.jpg' => 'bog-willow-358.jpg',
    'Salix_pedicellaris_5496731-359.jpg' => 'bog-willow-359.jpg',
    'Salix_pedicellaris_5497946-360.jpg' => 'bog-willow-360.jpg',
    // Autumn Willow (135)
    'original-318.jpg' => 'autumn-willow-318.jpg',
    'autumn-willow-in-field-319.jpg' => 'autumn-willow-319.jpg',
    'autumn-willow-in-field-320.jpg' => 'autumn-willow-320.jpg',
    // Choke Cherry (141)
    'original-379.jpg' => 'choke-cherry-379.jpg',
    'original-380.jpg' => 'choke-cherry-380.jpg',
    'original-381.jpg' => 'choke-cherry-381.jpg',
];

// Check both trees root and trees/temp (upload paths vary)
$sourcePaths = [$sourceDir, $sourceDir . '/temp'];

if (!is_dir($destDir)) {
    mkdir($destDir, 0755, true);
    echo "Created $destDir\n";
}

$moved = 0;
$missing = [];

// Helper: get -med or -sml variant of filename (e.g. image.jpg -> image-med.jpg)
$variant = function ($base, $suffix) {
    return preg_replace('/(\.[\w\d_-]+)$/i', '-' . $suffix . '$1', $base);
};

foreach ($mappings as $sourceFile => $destFile) {
    $variants = [
        ['src' => $sourceFile, 'dest' => $destFile],
        ['src' => $variant($sourceFile, 'med'), 'dest' => $variant($destFile, 'med')],
        ['src' => $variant($sourceFile, 'sml'), 'dest' => $variant($destFile, 'sml')],
    ];

    foreach ($variants as $v) {
        $destPath = $destDir . '/' . $v['dest'];
        $found = false;
        $srcPath = null;

        foreach ($sourcePaths as $srcBase) {
            $srcPath = $srcBase . '/' . $v['src'];
            if (file_exists($srcPath)) {
                $found = true;
                break;
            }
            $glob = glob($srcBase . '/' . pathinfo($v['src'], PATHINFO_FILENAME) . '.*');
            if ($glob) {
                $srcPath = $glob[0];
                $found = true;
                break;
            }
        }

        if ($found && $srcPath) {
            if (rename($srcPath, $destPath)) {
                $moved++;
                echo "Moved: " . basename($srcPath) . " -> {$v['dest']}\n";
            } else {
                if (copy($srcPath, $destPath)) {
                    unlink($srcPath);
                    $moved++;
                    echo "Moved (copy+delete): " . basename($srcPath) . " -> {$v['dest']}\n";
                } else {
                    echo "FAIL: {$v['src']}\n";
                }
            }
        } elseif ($v['src'] === $sourceFile) {
            $missing[] = $sourceFile;
        }
    }
}

echo "\nMoved: $moved / " . count($mappings) . "\n";
if ($missing) {
    echo "Missing (not found in uploads/trees/ or uploads/trees/temp/):\n";
    foreach ($missing as $m) echo "  - $m\n";
}

echo "\nDone. Images are now in uploads/articles/ and removed from plant pages. Delete this script after running.\n";
