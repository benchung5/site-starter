-- =============================================================================
-- CREATE OR UPDATE PLANT: LINDEN (Tilia spp.)
-- =============================================================================
-- Run this script in phpMyAdmin or MySQL.
-- If lookup names don't match your DB, run: SELECT id, name FROM eco_benefits;
-- (and similar for other tables) to see exact values, then adjust the WHERE clauses.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- USER VARIABLES - LINDEN DATA
-- -----------------------------------------------------------------------------

SET @family_name   = 'Malvaceae';             -- Tiliaceae merged into Malvaceae
SET @genus_name    = 'Tilia';
SET @common_name   = 'Linden';
SET @slug          = 'linden';
SET @specific_epithet = 'spp.';
SET @other_common_names = 'Lime tree, Basswood, Common lime';
SET @other_species = 'Tilia americana (American linden), Tilia cordata (small-leaved linden), Tilia platyphyllos (large-leaved linden)';
SET @subspecies    = NULL;
SET @variety       = NULL;
SET @cultivar      = NULL;
SET @reproduction_type_id = (SELECT id FROM reproduction_types WHERE LOWER(name) LIKE '%monoecious%' OR LOWER(name) LIKE '%monoacious%' LIMIT 1);
SET @height_min    = 40;
SET @height_max    = 80;
SET @width_min     = 30;
SET @width_max     = 60;
SET @growth_rate   = 'medium';
SET @lifespan_min  = 100;
SET @lifespan_max  = 200;
SET @seeds_packet  = NULL;
SET @seeds_gram    = NULL;
SET @cost_gram     = NULL;
SET @dormancy_treatment_id = (SELECT id FROM dormancy_treatments WHERE LOWER(name) LIKE '%cold%moist%stratification%' OR LOWER(name) LIKE '%cold moist%' LIMIT 1);
SET @growing_instructions = 'Sow seeds in autumn after stratification. Prefers fertile, moist, well-drained soil with full sun to partial shade. Protect young seedlings from frost. Mulch to conserve moisture. Prune lightly in early spring to shape.';
SET @special_chemistry = 'Contains flavonoids, mucilage, volatile oils, tannins, and phenolic acids. These compounds contribute to anti-inflammatory, mild sedative, and antioxidant properties.';
SET @signature     = 'The heart-shaped leaves of linden mirror its traditional use for soothing the heart and calming emotions.';
SET @precautions   = 'Generally safe when used in teas and infusions. Avoid excessive doses of concentrated extracts. May interact with sedatives. Pregnant or nursing individuals should consult a healthcare provider before use.';
SET @combinations  = 'Linden pairs well with chamomile, lemon balm, passionflower, and hawthorn in teas for calming and respiratory support.';
SET @folk_use      = 'Linden flowers and leaves have long been used in traditional European herbalism for their calming and soothing properties. Infusions of flowers relieve mild anxiety, promote restful sleep, and reduce stress-related headaches. The tea also helps alleviate colds, fevers, and coughs by promoting sweating and easing congestion. Leaves can be applied topically to soothe minor skin irritations. Inner bark has been used historically as a mild demulcent for digestive discomfort.';
SET @chinese_medicine = 'In traditional Chinese medicine, linden flowers (Tilia spp.) are considered neutral and slightly warm, benefiting the lungs and heart. They help clear heat, relieve tension, and calm the spirit. Linden infusions are used for mild coughs, restlessness, and insomnia. Flowers may be combined with other herbs to support circulation and reduce irritability, while leaves can gently nourish skin and calm the nervous system.';
SET @medicinal_species = NULL;

SET @body = '<p>Linden (Tilia spp.) is a large deciduous tree recognized by its heart-shaped leaves and clusters of fragrant yellowish flowers. Hardy to zone 4, it thrives in well-drained, fertile soils and tolerates urban conditions. Linden can reach 60–80 feet tall with a wide-spreading, rounded crown. Flowers bloom in early summer, attracting bees and other pollinators. Its leaves turn bright yellow in fall, adding ornamental interest. Medicinally, the flowers, leaves, and inner bark are harvested for teas, infusions, and syrups, known for calming the nervous system, reducing mild fevers, and soothing respiratory discomfort. Common species in northern climates include Tilia americana, Tilia cordata, and Tilia platyphyllos, each valued for slightly varying medicinal properties.</p>';

SET @min_body_length = 800;

-- Zone: use zone 3 (minimum hardiness). Adjust if your zones table uses different structure.
SET @zone_id = (SELECT id FROM zones WHERE name LIKE '%3%' OR name = '3' OR id = 3 ORDER BY id LIMIT 1);

-- Category: Deciduous Trees (lookup by slug or name)
SET @trees_category_id = (SELECT id FROM trees_category WHERE slug = 'deciduous-trees' OR LOWER(name) LIKE '%deciduous%tree%' LIMIT 1);

-- -----------------------------------------------------------------------------
-- LIVE MODE
-- -----------------------------------------------------------------------------
SET @mode_id_live = (SELECT id FROM mode WHERE name = 'live' LIMIT 1);
SET @mode_id_live = COALESCE(@mode_id_live, (SELECT id FROM mode ORDER BY id DESC LIMIT 1));

-- -----------------------------------------------------------------------------
-- STEP 1: Create family if not exists
-- -----------------------------------------------------------------------------
INSERT INTO families (name)
SELECT @family_name
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM families WHERE name = @family_name);

-- -----------------------------------------------------------------------------
-- STEP 2: Create genus if not exists
-- -----------------------------------------------------------------------------
INSERT INTO genuses (name, family_id)
SELECT @genus_name, (SELECT id FROM families WHERE name = @family_name LIMIT 1)
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM genuses WHERE name = @genus_name);

SET @genus_id = (SELECT id FROM genuses WHERE name = @genus_name LIMIT 1);

-- -----------------------------------------------------------------------------
-- STEP 3: Check if plant exists
-- -----------------------------------------------------------------------------
SET @existing_tree_id = (SELECT id FROM trees WHERE slug = @slug LIMIT 1);

-- -----------------------------------------------------------------------------
-- STEP 4a: UPDATE if exists
-- -----------------------------------------------------------------------------
UPDATE trees SET
  common_name           = COALESCE(NULLIF(TRIM(common_name), ''), @common_name),
  other_common_names    = COALESCE(other_common_names, @other_common_names),
  genus_id              = COALESCE(genus_id, @genus_id),
  specific_epithet      = COALESCE(NULLIF(TRIM(specific_epithet), ''), @specific_epithet),
  other_species         = COALESCE(other_species, @other_species),
  subspecies            = COALESCE(subspecies, @subspecies),
  variety               = COALESCE(variety, @variety),
  cultivar              = COALESCE(cultivar, @cultivar),
  zone_id               = COALESCE(zone_id, @zone_id),
  reproduction_type_id  = COALESCE(reproduction_type_id, @reproduction_type_id),
  height_min            = COALESCE(height_min, @height_min),
  height_max            = COALESCE(height_max, @height_max),
  width_min             = COALESCE(width_min, @width_min),
  width_max             = COALESCE(width_max, @width_max),
  growth_rate           = COALESCE(growth_rate, @growth_rate),
  lifespan_min          = COALESCE(lifespan_min, @lifespan_min),
  lifespan_max          = COALESCE(lifespan_max, @lifespan_max),
  seeds_packet          = COALESCE(seeds_packet, @seeds_packet),
  seeds_gram            = COALESCE(seeds_gram, @seeds_gram),
  cost_gram             = COALESCE(cost_gram, @cost_gram),
  dormancy_treatment_id = COALESCE(dormancy_treatment_id, @dormancy_treatment_id),
  growing_instructions  = COALESCE(growing_instructions, @growing_instructions),
  special_chemistry     = COALESCE(special_chemistry, @special_chemistry),
  signature             = COALESCE(signature, @signature),
  precautions           = COALESCE(precautions, @precautions),
  combinations          = COALESCE(combinations, @combinations),
  folk_use              = COALESCE(folk_use, @folk_use),
  chinese_medicine      = COALESCE(chinese_medicine, @chinese_medicine),
  medicinal_species    = COALESCE(medicinal_species, @medicinal_species),
  body                  = CASE
    WHEN body IS NULL OR TRIM(body) = '' THEN @body
    WHEN LENGTH(body) < @min_body_length THEN @body
    ELSE body
  END,
  mode_id               = @mode_id_live
WHERE id = @existing_tree_id AND @existing_tree_id IS NOT NULL;

-- -----------------------------------------------------------------------------
-- STEP 4b: INSERT if not exists
-- -----------------------------------------------------------------------------
INSERT INTO trees (
  common_name, slug, other_common_names, genus_id, specific_epithet,
  other_species, subspecies, variety, cultivar, zone_id, reproduction_type_id,
  height_min, height_max, width_min, width_max, growth_rate,
  lifespan_min, lifespan_max, seeds_packet, seeds_gram, cost_gram,
  dormancy_treatment_id, growing_instructions, special_chemistry, signature,
  precautions, combinations, folk_use, chinese_medicine, medicinal_species, body, mode_id, images
)
SELECT
  @common_name, @slug, @other_common_names, @genus_id, @specific_epithet,
  @other_species, @subspecies, @variety, @cultivar, @zone_id, @reproduction_type_id,
  @height_min, @height_max, @width_min, @width_max, @growth_rate,
  @lifespan_min, @lifespan_max, @seeds_packet, @seeds_gram, @cost_gram,
  @dormancy_treatment_id, @growing_instructions, @special_chemistry, @signature,
  @precautions, @combinations, @folk_use, @chinese_medicine, @medicinal_species, @body, @mode_id_live, '[]'
FROM DUAL
WHERE @existing_tree_id IS NULL;

SET @tree_id = COALESCE(@existing_tree_id, LAST_INSERT_ID());

-- -----------------------------------------------------------------------------
-- STEP 5: Trees category
-- -----------------------------------------------------------------------------
INSERT IGNORE INTO trees_categories (tree_id, trees_category_id)
SELECT @tree_id, @trees_category_id FROM DUAL
WHERE @tree_id IS NOT NULL AND @trees_category_id IS NOT NULL
  AND NOT EXISTS (SELECT 1 FROM trees_categories WHERE tree_id = @tree_id AND trees_category_id = @trees_category_id);

INSERT INTO trees_categories (tree_id, trees_category_id)
SELECT @tree_id, @trees_category_id FROM DUAL
WHERE @tree_id IS NOT NULL AND @trees_category_id IS NOT NULL
  AND (SELECT COUNT(*) FROM trees_categories WHERE tree_id = @tree_id) = 0;

-- -----------------------------------------------------------------------------
-- STEP 6: Many-to-many joins - DELETE existing, INSERT new
-- (Match by name - run SELECT id, name FROM eco_benefits; etc. to verify names)
-- -----------------------------------------------------------------------------

DELETE FROM trees_eco_benefits WHERE tree_id = @tree_id;
INSERT IGNORE INTO trees_eco_benefits (tree_id, eco_benefit_id) SELECT @tree_id, id FROM eco_benefits WHERE LOWER(name) LIKE '%attracts%pollinator%' LIMIT 1;
INSERT IGNORE INTO trees_eco_benefits (tree_id, eco_benefit_id) SELECT @tree_id, id FROM eco_benefits WHERE LOWER(name) LIKE '%medicinal%' LIMIT 1;
INSERT IGNORE INTO trees_eco_benefits (tree_id, eco_benefit_id) SELECT @tree_id, id FROM eco_benefits WHERE LOWER(name) LIKE '%valuable%wood%' OR LOWER(name) LIKE '%wood%' LIMIT 1;
INSERT IGNORE INTO trees_eco_benefits (tree_id, eco_benefit_id) SELECT @tree_id, id FROM eco_benefits WHERE LOWER(name) LIKE '%shade%garden%' OR LOWER(name) LIKE '%shade%' LIMIT 1;

DELETE FROM trees_native_to WHERE tree_id = @tree_id;
INSERT IGNORE INTO trees_native_to (tree_id, native_to_id) SELECT @tree_id, id FROM native_to WHERE LOWER(name) LIKE '%asia%' LIMIT 1;
INSERT IGNORE INTO trees_native_to (tree_id, native_to_id) SELECT @tree_id, id FROM native_to WHERE LOWER(name) LIKE '%europe%' LIMIT 1;
INSERT IGNORE INTO trees_native_to (tree_id, native_to_id) SELECT @tree_id, id FROM native_to WHERE LOWER(name) LIKE '%eastern%north%america%' OR LOWER(name) LIKE '%north america%' LIMIT 1;

DELETE FROM trees_natural_habitat WHERE tree_id = @tree_id;
INSERT IGNORE INTO trees_natural_habitat (tree_id, natural_habitat_id) SELECT @tree_id, id FROM natural_habitat WHERE LOWER(name) LIKE '%forest%edge%' OR LOWER(name) LIKE '%forest edge%' LIMIT 1;
INSERT IGNORE INTO trees_natural_habitat (tree_id, natural_habitat_id) SELECT @tree_id, id FROM natural_habitat WHERE LOWER(name) LIKE '%hillside%' OR LOWER(name) LIKE '%upland%' LIMIT 1;
INSERT IGNORE INTO trees_natural_habitat (tree_id, natural_habitat_id) SELECT @tree_id, id FROM natural_habitat WHERE LOWER(name) LIKE '%inner%forest%' OR LOWER(name) LIKE '%forest%' LIMIT 1;
INSERT IGNORE INTO trees_natural_habitat (tree_id, natural_habitat_id) SELECT @tree_id, id FROM natural_habitat WHERE LOWER(name) LIKE '%floodplain%' LIMIT 1;

DELETE FROM trees_shapes WHERE tree_id = @tree_id;
INSERT IGNORE INTO trees_shapes (tree_id, shape_id) SELECT @tree_id, id FROM shapes WHERE LOWER(name) LIKE '%round%' LIMIT 1;
INSERT IGNORE INTO trees_shapes (tree_id, shape_id) SELECT @tree_id, id FROM shapes WHERE LOWER(name) LIKE '%single%trunk%' OR LOWER(name) LIKE '%trunk%' LIMIT 1;
INSERT IGNORE INTO trees_shapes (tree_id, shape_id) SELECT @tree_id, id FROM shapes WHERE LOWER(name) LIKE '%wide%spread%' OR LOWER(name) LIKE '%spreading%' LIMIT 1;
INSERT IGNORE INTO trees_shapes (tree_id, shape_id) SELECT @tree_id, id FROM shapes WHERE LOWER(name) LIKE '%overarch%' LIMIT 1;

DELETE FROM trees_light WHERE tree_id = @tree_id;
INSERT IGNORE INTO trees_light (tree_id, light_id) SELECT @tree_id, id FROM light WHERE LOWER(name) LIKE '%full%sun%' OR LOWER(name) LIKE '%full sun%' LIMIT 1;
INSERT IGNORE INTO trees_light (tree_id, light_id) SELECT @tree_id, id FROM light WHERE LOWER(name) LIKE '%partial%shade%' OR LOWER(name) LIKE '%partial shade%' LIMIT 1;

DELETE FROM trees_soil WHERE tree_id = @tree_id;
INSERT IGNORE INTO trees_soil (tree_id, soil_id) SELECT @tree_id, id FROM soil WHERE LOWER(name) LIKE '%moist%fertile%' OR LOWER(name) LIKE '%moist%' LIMIT 1;
INSERT IGNORE INTO trees_soil (tree_id, soil_id) SELECT @tree_id, id FROM soil WHERE LOWER(name) LIKE '%well%drain%' OR LOWER(name) LIKE '%drained%' LIMIT 1;
INSERT IGNORE INTO trees_soil (tree_id, soil_id) SELECT @tree_id, id FROM soil WHERE LOWER(name) LIKE '%clay%' LIMIT 1;
INSERT IGNORE INTO trees_soil (tree_id, soil_id) SELECT @tree_id, id FROM soil WHERE LOWER(name) LIKE '%ph%adapt%' OR LOWER(name) LIKE '%ph adaptable%' LIMIT 1;

DELETE FROM trees_common_uses WHERE tree_id = @tree_id;
INSERT IGNORE INTO trees_common_uses (tree_id, common_use_id) SELECT @tree_id, id FROM common_uses WHERE LOWER(name) LIKE '%shade%garden%' OR LOWER(name) LIKE '%shade%' LIMIT 1;
INSERT IGNORE INTO trees_common_uses (tree_id, common_use_id) SELECT @tree_id, id FROM common_uses WHERE LOWER(name) LIKE '%landscap%' LIMIT 1;
INSERT IGNORE INTO trees_common_uses (tree_id, common_use_id) SELECT @tree_id, id FROM common_uses WHERE LOWER(name) LIKE '%specimen%' LIMIT 1;
INSERT IGNORE INTO trees_common_uses (tree_id, common_use_id) SELECT @tree_id, id FROM common_uses WHERE LOWER(name) LIKE '%cityscape%' OR LOWER(name) LIKE '%city%' LIMIT 1;
INSERT IGNORE INTO trees_common_uses (tree_id, common_use_id) SELECT @tree_id, id FROM common_uses WHERE LOWER(name) LIKE '%reforest%' LIMIT 1;

DELETE FROM trees_transplanting WHERE tree_id = @tree_id;
INSERT IGNORE INTO trees_transplanting (tree_id, transplanting_id) SELECT @tree_id, id FROM transplanting WHERE LOWER(name) LIKE '%spring%' LIMIT 1;
INSERT IGNORE INTO trees_transplanting (tree_id, transplanting_id) SELECT @tree_id, id FROM transplanting WHERE LOWER(name) LIKE '%easy%' LIMIT 1;

DELETE FROM trees_unique_attractions WHERE tree_id = @tree_id;
INSERT IGNORE INTO trees_unique_attractions (tree_id, unique_attraction_id) SELECT @tree_id, id FROM unique_attractions WHERE LOWER(name) LIKE '%flower%' LIMIT 1;
INSERT IGNORE INTO trees_unique_attractions (tree_id, unique_attraction_id) SELECT @tree_id, id FROM unique_attractions WHERE LOWER(name) LIKE '%leaf%' OR LOWER(name) LIKE '%leaves%' LIMIT 1;
INSERT IGNORE INTO trees_unique_attractions (tree_id, unique_attraction_id) SELECT @tree_id, id FROM unique_attractions WHERE LOWER(name) LIKE '%bark%' LIMIT 1;
INSERT IGNORE INTO trees_unique_attractions (tree_id, unique_attraction_id) SELECT @tree_id, id FROM unique_attractions WHERE LOWER(name) LIKE '%fall%colour%' OR LOWER(name) LIKE '%fall%color%' LIMIT 1;

DELETE FROM trees_tolerances WHERE tree_id = @tree_id;
INSERT IGNORE INTO trees_tolerances (tree_id, tolerance_id) SELECT @tree_id, id FROM tolerances WHERE LOWER(name) LIKE '%air%pollution%' OR LOWER(name) LIKE '%pollution%' LIMIT 1;
INSERT IGNORE INTO trees_tolerances (tree_id, tolerance_id) SELECT @tree_id, id FROM tolerances WHERE LOWER(name) LIKE '%prun%' LIMIT 1;
INSERT IGNORE INTO trees_tolerances (tree_id, tolerance_id) SELECT @tree_id, id FROM tolerances WHERE LOWER(name) LIKE '%pest%' OR LOWER(name) LIKE '%disease%' LIMIT 1;
INSERT IGNORE INTO trees_tolerances (tree_id, tolerance_id) SELECT @tree_id, id FROM tolerances WHERE LOWER(name) LIKE '%soil%compact%' OR LOWER(name) LIKE '%compaction%' LIMIT 1;

DELETE FROM plants_tastes WHERE tree_id = @tree_id;
INSERT IGNORE INTO plants_tastes (tree_id, taste_id) SELECT @tree_id, id FROM tastes WHERE LOWER(name) LIKE '%sweet%' LIMIT 1;
INSERT IGNORE INTO plants_tastes (tree_id, taste_id) SELECT @tree_id, id FROM tastes WHERE LOWER(name) LIKE '%bland%' LIMIT 1;
INSERT IGNORE INTO plants_tastes (tree_id, taste_id) SELECT @tree_id, id FROM tastes WHERE LOWER(name) LIKE '%astringent%' LIMIT 1;

DELETE FROM plants_organ_systems WHERE tree_id = @tree_id;
INSERT IGNORE INTO plants_organ_systems (tree_id, organ_system_id) SELECT @tree_id, id FROM organ_systems WHERE LOWER(name) LIKE '%nervous%' LIMIT 1;
INSERT IGNORE INTO plants_organ_systems (tree_id, organ_system_id) SELECT @tree_id, id FROM organ_systems WHERE LOWER(name) LIKE '%respiratory%' LIMIT 1;
INSERT IGNORE INTO plants_organ_systems (tree_id, organ_system_id) SELECT @tree_id, id FROM organ_systems WHERE LOWER(name) LIKE '%integumentary%' OR LOWER(name) LIKE '%skin%' LIMIT 1;

DELETE FROM plants_thermal_nature WHERE tree_id = @tree_id;
INSERT IGNORE INTO plants_thermal_nature (tree_id, thermal_nature_id) SELECT @tree_id, id FROM thermal_nature WHERE LOWER(name) LIKE '%neutral%' LIMIT 1;
INSERT IGNORE INTO plants_thermal_nature (tree_id, thermal_nature_id) SELECT @tree_id, id FROM thermal_nature WHERE LOWER(name) LIKE '%warm%' LIMIT 1;

DELETE FROM plants_moisture WHERE tree_id = @tree_id;
INSERT IGNORE INTO plants_moisture (tree_id, moisture_id) SELECT @tree_id, id FROM moisture WHERE LOWER(name) LIKE '%moisten%' LIMIT 1;

DELETE FROM plants_parts_used WHERE tree_id = @tree_id;
INSERT IGNORE INTO plants_parts_used (tree_id, parts_used_id) SELECT @tree_id, id FROM parts_used WHERE LOWER(name) LIKE '%flower%' LIMIT 1;
INSERT IGNORE INTO plants_parts_used (tree_id, parts_used_id) SELECT @tree_id, id FROM parts_used WHERE LOWER(name) LIKE '%leaf%' OR LOWER(name) LIKE '%leaves%' LIMIT 1;
INSERT IGNORE INTO plants_parts_used (tree_id, parts_used_id) SELECT @tree_id, id FROM parts_used WHERE LOWER(name) LIKE '%inner%bark%' OR LOWER(name) LIKE '%bark%' LIMIT 1;

DELETE FROM plants_preparations WHERE tree_id = @tree_id;
INSERT IGNORE INTO plants_preparations (tree_id, preparation_id) SELECT @tree_id, id FROM preparations WHERE LOWER(name) LIKE '%tea%' OR LOWER(name) LIKE '%infusion%' LIMIT 1;
INSERT IGNORE INTO plants_preparations (tree_id, preparation_id) SELECT @tree_id, id FROM preparations WHERE LOWER(name) LIKE '%syrup%' LIMIT 1;
INSERT IGNORE INTO plants_preparations (tree_id, preparation_id) SELECT @tree_id, id FROM preparations WHERE LOWER(name) LIKE '%decoction%' LIMIT 1;
INSERT IGNORE INTO plants_preparations (tree_id, preparation_id) SELECT @tree_id, id FROM preparations WHERE LOWER(name) LIKE '%tincture%' LIMIT 1;
INSERT IGNORE INTO plants_preparations (tree_id, preparation_id) SELECT @tree_id, id FROM preparations WHERE LOWER(name) LIKE '%bath%' LIMIT 1;

DELETE FROM plants_organs_and_tissue WHERE tree_id = @tree_id;
INSERT IGNORE INTO plants_organs_and_tissue (tree_id, organ_and_tissue_id) SELECT @tree_id, id FROM organs_and_tissue WHERE LOWER(name) LIKE '%lung%' LIMIT 1;
INSERT IGNORE INTO plants_organs_and_tissue (tree_id, organ_and_tissue_id) SELECT @tree_id, id FROM organs_and_tissue WHERE LOWER(name) LIKE '%skin%' LIMIT 1;
INSERT IGNORE INTO plants_organs_and_tissue (tree_id, organ_and_tissue_id) SELECT @tree_id, id FROM organs_and_tissue WHERE LOWER(name) LIKE '%heart%' LIMIT 1;
INSERT IGNORE INTO plants_organs_and_tissue (tree_id, organ_and_tissue_id) SELECT @tree_id, id FROM organs_and_tissue WHERE LOWER(name) LIKE '%brain%' LIMIT 1;

-- -----------------------------------------------------------------------------
-- DONE. Verify with:
-- -----------------------------------------------------------------------------
-- SELECT t.id, t.common_name, t.slug, g.name AS genus, f.name AS family, m.name AS mode
-- FROM trees t
-- JOIN genuses g ON g.id = t.genus_id
-- JOIN families f ON f.id = g.family_id
-- LEFT JOIN mode m ON m.id = t.mode_id
-- WHERE t.slug = 'linden';
