-- =============================================================================
-- CREATE OR UPDATE PLANTS: EASTERN HEMLOCK, PRICKLY ASH, HORSE CHESTNUT
-- =============================================================================
-- Merge only if existing plant has same slug; otherwise create new.
-- Fills only fields that are NULL/empty. Body: replace if empty only (no append).
-- Join tables: add associations only if plant has none.
-- =============================================================================

SET @mode_id_live = (SELECT id FROM mode WHERE name = 'live' LIMIT 1);
SET @mode_id_live = COALESCE(@mode_id_live, (SELECT id FROM mode ORDER BY id DESC LIMIT 1));
SET @dormancy_cold_moist = (SELECT id FROM dormancy_treatments WHERE LOWER(name) LIKE '%cold%moist%stratification%' OR LOWER(name) LIKE '%cold moist%' LIMIT 1);

-- =============================================================================
-- PLANT 1: EASTERN HEMLOCK (Tsuga canadensis)
-- =============================================================================

SET @slug = 'eastern-hemlock';
SET @existing_tree_id = (SELECT id FROM trees WHERE slug = @slug LIMIT 1);
SET @family_name = 'Pinaceae';
SET @genus_name = 'Tsuga';
SET @common_name = 'Eastern hemlock';
SET @other_common_names = 'Canadian hemlock, eastern hemlock fir';
SET @specific_epithet = 'canadensis';
SET @other_species = NULL;
SET @medicinal_species = 'Tsuga canadensis';
SET @zone_id = (SELECT id FROM zones WHERE name LIKE '%3%' OR name = '3' OR id = 3 ORDER BY id LIMIT 1);
SET @height_min = 40;
SET @height_max = 100;
SET @width_min = 20;
SET @width_max = 40;
SET @growth_rate = 'slow';
SET @lifespan_min = 200;
SET @lifespan_max = 800;
SET @reproduction_type_id = (SELECT id FROM reproduction_types WHERE LOWER(name) LIKE '%monoacious%' OR LOWER(name) LIKE '%monoecious%' LIMIT 1);
SET @dormancy_treatment_id = @dormancy_cold_moist;
SET @growing_instructions = 'Eastern hemlock thrives in cool, moist soils rich in organic matter. It prefers shaded sites or forest understory environments and should be protected from hot, dry winds. Hemlocks benefit from evenly moist but well-drained conditions; they tolerate wet feet but resent prolonged drought. Nursery stock establishes best when planted in early spring or fall with root collars set slightly above soil level. Mulch conserves moisture and moderates soil temperature. Slow growth and a shallow root system mean young trees require regular watering and protection from competition. Over time, established hemlocks form an evergreen canopy that provides shelter and structure in woodland plantings.';
SET @special_chemistry = NULL;
SET @signature = NULL;
SET @precautions = 'Use with caution in cases of known allergies to coniferous trees. Avoid large doses during pregnancy. Fresh bark or needles may be irritating to sensitive skin if applied directly without preparation. Not recommended for long-term high-dose internal use without supervision.';
SET @combinations = 'Eastern hemlock is often combined with herbs that support respiratory function and immunity, such as elderflower, licorice root, mullein, or yarrow. A combination of hemlock needles with pine or spruce tips enhances vitamin C content and antiviral support. Topical resin applications are often blended with comfrey or plantain for wound care.';
SET @folk_use = 'Native American communities and early herbalists brewed teas from Eastern hemlock needles and bark to treat respiratory ailments, such as coughs, colds, and bronchitis. Infusions were sometimes used as a mild stimulant and to promote blood circulation. The resin was also applied topically to soothe minor cuts and skin irritations. Needles were steeped in water as a vitamin C-rich tonic to prevent scurvy during long winters. Because of its gentle, tonic qualities, hemlock preparations were valued as a strengthening herb in times of fatigue or general weakness.';
SET @chinese_medicine = 'Though not a classical TCM herb, Eastern hemlock is interpreted in modern integrative Chinese herbal practice as slightly cooling with bitter, resinous properties. It acts on the Lung and Liver channels, supporting respiratory health, reducing inflammation, and tonifying the blood. Infusions or decoctions are used to soothe coughs, ease shortness of breath, and support overall vitality, particularly in cold, damp climates.';

SET @body = '<p>Eastern hemlock (<em>Tsuga canadensis</em>) is a graceful evergreen conifer that defines the shaded forests of eastern North America. Its slender, drooping branches support short, soft needles that cast deep shade beneath a stately, pyramidal crown. Mature trees can reach towering heights over 80 feet and live for many centuries, creating cool, secluded stands that support rich forest ecology. The bark is deeply furrowed and reddish-brown, adding textural interest through all seasons. In spring, delicate pollen cones appear, and in fall, tight, oval seed cones mature among the evergreen foliage.</p><p>Hemlock''s presence in the landscape is subtle yet striking: its soft, dark green canopy contrasts with deciduous neighbors, and its dense shade supports moisture-loving understory plants. Birds, deer, and small mammals find shelter amid its layered boughs. Traditionally, Indigenous communities prepared needle teas for respiratory support and immune strengthening. Today, Eastern hemlock is appreciated in naturalized plantings, woodland gardens, and reforestation projects for its long-lived beauty and ecological value. Because it thrives in shade and creates microclimates beneath its limbs, it fosters diverse plant communities and cool summer retreats in forested landscapes.</p>';

INSERT INTO families (name) SELECT @family_name FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM families WHERE name = @family_name);
INSERT INTO genuses (name, family_id) SELECT @genus_name, (SELECT id FROM families WHERE name = @family_name LIMIT 1) FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM genuses WHERE name = @genus_name);
SET @genus_id = (SELECT id FROM genuses WHERE name = @genus_name LIMIT 1);
SET @tree_id = @existing_tree_id;

SET @eco_cnt = (SELECT COUNT(*) FROM trees_eco_benefits WHERE tree_id = @tree_id);
SET @native_cnt = (SELECT COUNT(*) FROM trees_native_to WHERE tree_id = @tree_id);
SET @habitat_cnt = (SELECT COUNT(*) FROM trees_natural_habitat WHERE tree_id = @tree_id);
SET @shapes_cnt = (SELECT COUNT(*) FROM trees_shapes WHERE tree_id = @tree_id);
SET @light_cnt = (SELECT COUNT(*) FROM trees_light WHERE tree_id = @tree_id);
SET @soil_cnt = (SELECT COUNT(*) FROM trees_soil WHERE tree_id = @tree_id);
SET @uses_cnt = (SELECT COUNT(*) FROM trees_common_uses WHERE tree_id = @tree_id);
SET @trans_cnt = (SELECT COUNT(*) FROM trees_transplanting WHERE tree_id = @tree_id);
SET @attract_cnt = (SELECT COUNT(*) FROM trees_unique_attractions WHERE tree_id = @tree_id);
SET @toler_cnt = (SELECT COUNT(*) FROM trees_tolerances WHERE tree_id = @tree_id);
SET @tastes_cnt = (SELECT COUNT(*) FROM plants_tastes WHERE tree_id = @tree_id);
SET @organ_cnt = (SELECT COUNT(*) FROM plants_organ_systems WHERE tree_id = @tree_id);
SET @thermal_cnt = (SELECT COUNT(*) FROM plants_thermal_nature WHERE tree_id = @tree_id);
SET @moist_cnt = (SELECT COUNT(*) FROM plants_moisture WHERE tree_id = @tree_id);
SET @parts_cnt = (SELECT COUNT(*) FROM plants_parts_used WHERE tree_id = @tree_id);
SET @prep_cnt = (SELECT COUNT(*) FROM plants_preparations WHERE tree_id = @tree_id);
SET @organs_tissue_cnt = (SELECT COUNT(*) FROM plants_organs_and_tissue WHERE tree_id = @tree_id);

UPDATE trees SET slug = @slug, common_name = COALESCE(NULLIF(TRIM(common_name), ''), @common_name), other_common_names = COALESCE(NULLIF(TRIM(other_common_names), ''), @other_common_names), genus_id = COALESCE(genus_id, @genus_id), specific_epithet = COALESCE(NULLIF(TRIM(specific_epithet), ''), @specific_epithet), other_species = COALESCE(NULLIF(TRIM(other_species), ''), @other_species), medicinal_species = COALESCE(NULLIF(TRIM(medicinal_species), ''), @medicinal_species), zone_id = COALESCE(zone_id, @zone_id), reproduction_type_id = COALESCE(reproduction_type_id, @reproduction_type_id), height_min = COALESCE(height_min, @height_min), height_max = COALESCE(height_max, @height_max), width_min = COALESCE(width_min, @width_min), width_max = COALESCE(width_max, @width_max), growth_rate = COALESCE(NULLIF(TRIM(growth_rate), ''), @growth_rate), lifespan_min = COALESCE(lifespan_min, @lifespan_min), lifespan_max = COALESCE(lifespan_max, @lifespan_max), dormancy_treatment_id = COALESCE(dormancy_treatment_id, @dormancy_treatment_id), growing_instructions = COALESCE(NULLIF(TRIM(growing_instructions), ''), @growing_instructions), special_chemistry = COALESCE(NULLIF(TRIM(special_chemistry), ''), @special_chemistry), signature = COALESCE(NULLIF(TRIM(signature), ''), @signature), precautions = COALESCE(NULLIF(TRIM(precautions), ''), @precautions), combinations = COALESCE(NULLIF(TRIM(combinations), ''), @combinations), folk_use = COALESCE(NULLIF(TRIM(folk_use), ''), @folk_use), chinese_medicine = COALESCE(NULLIF(TRIM(chinese_medicine), ''), @chinese_medicine), body = COALESCE(NULLIF(TRIM(body), ''), @body), mode_id = COALESCE(mode_id, @mode_id_live) WHERE id = @existing_tree_id AND @existing_tree_id IS NOT NULL;

INSERT INTO trees (common_name, slug, other_common_names, genus_id, specific_epithet, other_species, medicinal_species, zone_id, reproduction_type_id, height_min, height_max, width_min, width_max, growth_rate, lifespan_min, lifespan_max, dormancy_treatment_id, growing_instructions, special_chemistry, signature, precautions, combinations, folk_use, chinese_medicine, body, mode_id, images)
SELECT @common_name, @slug, @other_common_names, @genus_id, @specific_epithet, @other_species, @medicinal_species, @zone_id, @reproduction_type_id, @height_min, @height_max, @width_min, @width_max, @growth_rate, @lifespan_min, @lifespan_max, @dormancy_treatment_id, @growing_instructions, @special_chemistry, @signature, @precautions, @combinations, @folk_use, @chinese_medicine, @body, @mode_id_live, '[]' FROM DUAL WHERE @existing_tree_id IS NULL;

SET @tree_id = COALESCE(@existing_tree_id, LAST_INSERT_ID());
SET @eco_cnt = (SELECT COUNT(*) FROM trees_eco_benefits WHERE tree_id = @tree_id);
SET @native_cnt = (SELECT COUNT(*) FROM trees_native_to WHERE tree_id = @tree_id);
SET @habitat_cnt = (SELECT COUNT(*) FROM trees_natural_habitat WHERE tree_id = @tree_id);
SET @shapes_cnt = (SELECT COUNT(*) FROM trees_shapes WHERE tree_id = @tree_id);
SET @light_cnt = (SELECT COUNT(*) FROM trees_light WHERE tree_id = @tree_id);
SET @soil_cnt = (SELECT COUNT(*) FROM trees_soil WHERE tree_id = @tree_id);
SET @uses_cnt = (SELECT COUNT(*) FROM trees_common_uses WHERE tree_id = @tree_id);
SET @trans_cnt = (SELECT COUNT(*) FROM trees_transplanting WHERE tree_id = @tree_id);
SET @attract_cnt = (SELECT COUNT(*) FROM trees_unique_attractions WHERE tree_id = @tree_id);
SET @toler_cnt = (SELECT COUNT(*) FROM trees_tolerances WHERE tree_id = @tree_id);
SET @tastes_cnt = (SELECT COUNT(*) FROM plants_tastes WHERE tree_id = @tree_id);
SET @organ_cnt = (SELECT COUNT(*) FROM plants_organ_systems WHERE tree_id = @tree_id);
SET @thermal_cnt = (SELECT COUNT(*) FROM plants_thermal_nature WHERE tree_id = @tree_id);
SET @moist_cnt = (SELECT COUNT(*) FROM plants_moisture WHERE tree_id = @tree_id);
SET @parts_cnt = (SELECT COUNT(*) FROM plants_parts_used WHERE tree_id = @tree_id);
SET @prep_cnt = (SELECT COUNT(*) FROM plants_preparations WHERE tree_id = @tree_id);
SET @organs_tissue_cnt = (SELECT COUNT(*) FROM plants_organs_and_tissue WHERE tree_id = @tree_id);

SET @trees_category_id = (SELECT id FROM trees_category WHERE LOWER(name) LIKE '%coniferous%' OR LOWER(slug) LIKE '%coniferous%' LIMIT 1);
INSERT INTO trees_categories (tree_id, trees_category_id) SELECT @tree_id, @trees_category_id FROM DUAL WHERE @tree_id IS NOT NULL AND @trees_category_id IS NOT NULL AND (SELECT COUNT(*) FROM trees_categories WHERE tree_id = @tree_id AND trees_category_id = @trees_category_id) = 0;

INSERT IGNORE INTO trees_eco_benefits (tree_id, eco_benefit_id) SELECT @tree_id, id FROM eco_benefits WHERE @eco_cnt = 0 AND LOWER(name) LIKE '%medicinal%' LIMIT 1;
INSERT IGNORE INTO trees_eco_benefits (tree_id, eco_benefit_id) SELECT @tree_id, id FROM eco_benefits WHERE @eco_cnt = 0 AND (LOWER(name) LIKE '%valuable%wood%' OR LOWER(name) LIKE '%wood%') LIMIT 1;
INSERT IGNORE INTO trees_eco_benefits (tree_id, eco_benefit_id) SELECT @tree_id, id FROM eco_benefits WHERE @eco_cnt = 0 AND (LOWER(name) LIKE '%attracts%wildlife%' OR LOWER(name) LIKE '%wildlife%') LIMIT 1;
INSERT IGNORE INTO trees_eco_benefits (tree_id, eco_benefit_id) SELECT @tree_id, id FROM eco_benefits WHERE @eco_cnt = 0 AND (LOWER(name) LIKE '%erosion%' OR LOWER(name) LIKE '%erosion control%') LIMIT 1;

INSERT IGNORE INTO trees_native_to (tree_id, native_to_id) SELECT @tree_id, id FROM native_to WHERE @native_cnt = 0 AND (LOWER(name) LIKE '%eastern%north%america%' OR LOWER(name) LIKE '%eastern north america%') LIMIT 1;

INSERT IGNORE INTO trees_natural_habitat (tree_id, natural_habitat_id) SELECT @tree_id, id FROM natural_habitat WHERE @habitat_cnt = 0 AND (LOWER(name) LIKE '%inner%forest%' OR LOWER(name) LIKE '%forest%') LIMIT 1;
INSERT IGNORE INTO trees_natural_habitat (tree_id, natural_habitat_id) SELECT @tree_id, id FROM natural_habitat WHERE @habitat_cnt = 0 AND (LOWER(name) LIKE '%forest%edge%' OR LOWER(name) LIKE '%forest edge%') LIMIT 1;
INSERT IGNORE INTO trees_natural_habitat (tree_id, natural_habitat_id) SELECT @tree_id, id FROM natural_habitat WHERE @habitat_cnt = 0 AND (LOWER(name) LIKE '%mountain%') LIMIT 1;
INSERT IGNORE INTO trees_natural_habitat (tree_id, natural_habitat_id) SELECT @tree_id, id FROM natural_habitat WHERE @habitat_cnt = 0 AND (LOWER(name) LIKE '%floodplain%' OR LOWER(name) LIKE '%flood plain%') LIMIT 1;

INSERT IGNORE INTO trees_shapes (tree_id, shape_id) SELECT @tree_id, id FROM shapes WHERE @shapes_cnt = 0 AND (LOWER(name) LIKE '%single%trunk%' OR LOWER(name) LIKE '%single trunk%') LIMIT 1;
INSERT IGNORE INTO trees_shapes (tree_id, shape_id) SELECT @tree_id, id FROM shapes WHERE @shapes_cnt = 0 AND (LOWER(name) LIKE '%conical%' OR LOWER(name) LIKE '%pyramid%') LIMIT 1;

INSERT IGNORE INTO trees_light (tree_id, light_id) SELECT @tree_id, id FROM light WHERE @light_cnt = 0 AND (LOWER(name) LIKE '%full%shade%' OR LOWER(name) LIKE '%full shade%') LIMIT 1;
INSERT IGNORE INTO trees_light (tree_id, light_id) SELECT @tree_id, id FROM light WHERE @light_cnt = 0 AND (LOWER(name) LIKE '%partial%shade%' OR LOWER(name) LIKE '%partial shade%') LIMIT 1;

INSERT IGNORE INTO trees_soil (tree_id, soil_id) SELECT @tree_id, id FROM soil WHERE @soil_cnt = 0 AND (LOWER(name) LIKE '%moist%' OR LOWER(name) LIKE '%fertile%') LIMIT 1;
INSERT IGNORE INTO trees_soil (tree_id, soil_id) SELECT @tree_id, id FROM soil WHERE @soil_cnt = 0 AND (LOWER(name) LIKE '%well%drain%' OR LOWER(name) LIKE '%drained%') LIMIT 1;
INSERT IGNORE INTO trees_soil (tree_id, soil_id) SELECT @tree_id, id FROM soil WHERE @soil_cnt = 0 AND (LOWER(name) LIKE '%wet%feet%' OR LOWER(name) LIKE '%wet feet%') LIMIT 1;
INSERT IGNORE INTO trees_soil (tree_id, soil_id) SELECT @tree_id, id FROM soil WHERE @soil_cnt = 0 AND (LOWER(name) LIKE '%acid%' OR LOWER(name) LIKE '%acidic%') LIMIT 1;

INSERT IGNORE INTO trees_common_uses (tree_id, common_use_id) SELECT @tree_id, id FROM common_uses WHERE @uses_cnt = 0 AND (LOWER(name) LIKE '%shade%garden%' OR LOWER(name) LIKE '%shade garden%') LIMIT 1;
INSERT IGNORE INTO trees_common_uses (tree_id, common_use_id) SELECT @tree_id, id FROM common_uses WHERE @uses_cnt = 0 AND (LOWER(name) LIKE '%reforest%') LIMIT 1;
INSERT IGNORE INTO trees_common_uses (tree_id, common_use_id) SELECT @tree_id, id FROM common_uses WHERE @uses_cnt = 0 AND LOWER(name) LIKE '%specimen%' LIMIT 1;
INSERT IGNORE INTO trees_common_uses (tree_id, common_use_id) SELECT @tree_id, id FROM common_uses WHERE @uses_cnt = 0 AND (LOWER(name) LIKE '%naturalized%' OR LOWER(name) LIKE '%natural%') LIMIT 1;

INSERT IGNORE INTO trees_transplanting (tree_id, transplanting_id) SELECT @tree_id, id FROM transplanting WHERE @trans_cnt = 0 AND (LOWER(name) LIKE '%difficult%' OR LOWER(name) LIKE '%challenging%') LIMIT 1;
INSERT IGNORE INTO trees_transplanting (tree_id, transplanting_id) SELECT @tree_id, id FROM transplanting WHERE @trans_cnt = 0 AND LOWER(name) LIKE '%spring%' LIMIT 1;
INSERT IGNORE INTO trees_transplanting (tree_id, transplanting_id) SELECT @tree_id, id FROM transplanting WHERE @trans_cnt = 0 AND LOWER(name) LIKE '%fall%' LIMIT 1;

INSERT IGNORE INTO trees_unique_attractions (tree_id, unique_attraction_id) SELECT @tree_id, id FROM unique_attractions WHERE @attract_cnt = 0 AND (LOWER(name) LIKE '%branch%' OR LOWER(name) LIKE '%branches%') LIMIT 1;
INSERT IGNORE INTO trees_unique_attractions (tree_id, unique_attraction_id) SELECT @tree_id, id FROM unique_attractions WHERE @attract_cnt = 0 AND (LOWER(name) LIKE '%winter%interest%' OR LOWER(name) LIKE '%winter interest%') LIMIT 1;
INSERT IGNORE INTO trees_unique_attractions (tree_id, unique_attraction_id) SELECT @tree_id, id FROM unique_attractions WHERE @attract_cnt = 0 AND (LOWER(name) LIKE '%bark%') LIMIT 1;

INSERT IGNORE INTO trees_tolerances (tree_id, tolerance_id) SELECT @tree_id, id FROM tolerances WHERE @toler_cnt = 0 AND (LOWER(name) LIKE '%deer%' OR LOWER(name) LIKE '%deer resistant%') LIMIT 1;
INSERT IGNORE INTO trees_tolerances (tree_id, tolerance_id) SELECT @tree_id, id FROM tolerances WHERE @toler_cnt = 0 AND (LOWER(name) LIKE '%prun%' OR LOWER(name) LIKE '%pruning%') LIMIT 1;

INSERT IGNORE INTO plants_tastes (tree_id, taste_id) SELECT @tree_id, id FROM tastes WHERE @tastes_cnt = 0 AND LOWER(name) LIKE '%bitter%' LIMIT 1;
INSERT IGNORE INTO plants_tastes (tree_id, taste_id) SELECT @tree_id, id FROM tastes WHERE @tastes_cnt = 0 AND (LOWER(name) LIKE '%resinous%' OR LOWER(name) LIKE '%resin%') LIMIT 1;

INSERT IGNORE INTO plants_organ_systems (tree_id, organ_system_id) SELECT @tree_id, id FROM organ_systems WHERE @organ_cnt = 0 AND (LOWER(name) LIKE '%immune%' OR LOWER(name) LIKE '%lymphatic%') LIMIT 1;
INSERT IGNORE INTO plants_organ_systems (tree_id, organ_system_id) SELECT @tree_id, id FROM organ_systems WHERE @organ_cnt = 0 AND (LOWER(name) LIKE '%respiratory%' OR LOWER(name) LIKE '%lung%') LIMIT 1;
INSERT IGNORE INTO plants_organ_systems (tree_id, organ_system_id) SELECT @tree_id, id FROM organ_systems WHERE @organ_cnt = 0 AND LOWER(name) LIKE '%circulatory%' LIMIT 1;

INSERT IGNORE INTO plants_thermal_nature (tree_id, thermal_nature_id) SELECT @tree_id, id FROM thermal_nature WHERE @thermal_cnt = 0 AND LOWER(name) LIKE '%cool%' LIMIT 1;
INSERT IGNORE INTO plants_moisture (tree_id, moisture_id) SELECT @tree_id, id FROM moisture WHERE @moist_cnt = 0 AND (LOWER(name) LIKE '%moisten%' OR LOWER(name) LIKE '%moistening%') LIMIT 1;

INSERT IGNORE INTO plants_parts_used (tree_id, parts_used_id) SELECT @tree_id, id FROM parts_used WHERE @parts_cnt = 0 AND (LOWER(name) LIKE '%needle%' OR LOWER(name) LIKE '%needles%') LIMIT 1;
INSERT IGNORE INTO plants_parts_used (tree_id, parts_used_id) SELECT @tree_id, id FROM parts_used WHERE @parts_cnt = 0 AND (LOWER(name) LIKE '%bark%') LIMIT 1;
INSERT IGNORE INTO plants_parts_used (tree_id, parts_used_id) SELECT @tree_id, id FROM parts_used WHERE @parts_cnt = 0 AND (LOWER(name) LIKE '%bud%') LIMIT 1;

INSERT IGNORE INTO plants_preparations (tree_id, preparation_id) SELECT @tree_id, id FROM preparations WHERE @prep_cnt = 0 AND (LOWER(name) LIKE '%tea%' OR LOWER(name) LIKE '%infusion%') LIMIT 1;
INSERT IGNORE INTO plants_preparations (tree_id, preparation_id) SELECT @tree_id, id FROM preparations WHERE @prep_cnt = 0 AND LOWER(name) LIKE '%decoction%' LIMIT 1;
INSERT IGNORE INTO plants_preparations (tree_id, preparation_id) SELECT @tree_id, id FROM preparations WHERE @prep_cnt = 0 AND LOWER(name) LIKE '%extract%' LIMIT 1;

INSERT IGNORE INTO plants_organs_and_tissue (tree_id, organ_and_tissue_id) SELECT @tree_id, id FROM organs_and_tissue WHERE @organs_tissue_cnt = 0 AND (LOWER(name) LIKE '%lung%' OR LOWER(name) LIKE '%lungs%') LIMIT 1;
INSERT IGNORE INTO plants_organs_and_tissue (tree_id, organ_and_tissue_id) SELECT @tree_id, id FROM organs_and_tissue WHERE @organs_tissue_cnt = 0 AND LOWER(name) LIKE '%blood%' LIMIT 1;
INSERT IGNORE INTO plants_organs_and_tissue (tree_id, organ_and_tissue_id) SELECT @tree_id, id FROM organs_and_tissue WHERE @organs_tissue_cnt = 0 AND LOWER(name) LIKE '%mucosa%' LIMIT 1;

-- =============================================================================
-- PLANT 2: PRICKLY ASH (Zanthoxylum americanum)
-- =============================================================================

SET @slug = 'prickly-ash';
SET @existing_tree_id = (SELECT id FROM trees WHERE slug = @slug LIMIT 1);
SET @family_name = 'Rutaceae';
SET @genus_name = 'Zanthoxylum';
SET @common_name = 'Prickly ash';
SET @other_common_names = 'Northern prickly ash, toothache tree';
SET @specific_epithet = 'americanum';
SET @other_species = NULL;
SET @medicinal_species = 'Zanthoxylum americanum';
SET @zone_id = (SELECT id FROM zones WHERE name LIKE '%3%' OR name = '3' OR id = 3 ORDER BY id LIMIT 1);
SET @height_min = 4;
SET @height_max = 10;
SET @width_min = 4;
SET @width_max = 8;
SET @growth_rate = 'medium';
SET @lifespan_min = 20;
SET @lifespan_max = 50;
SET @reproduction_type_id = (SELECT id FROM reproduction_types WHERE LOWER(name) LIKE '%dioecious%' LIMIT 1);
SET @dormancy_treatment_id = @dormancy_cold_moist;
SET @growing_instructions = 'Prickly ash grows well in full sun to partial shade with well-drained soil. It tolerates a range of soil types, including sandy or clay soils, and is hardy in cold climates. Seeds benefit from cold stratification, and planting in spring gives best establishment. Prickly ash can also be propagated by semi-hardwood cuttings. Mulching helps retain moisture during dry spells. Once established, plants are relatively low-maintenance and form attractive multi-stemmed shrubs that support both wildlife and pollinators.';
SET @special_chemistry = NULL;
SET @signature = NULL;
SET @precautions = 'Avoid in pregnancy or breastfeeding in large amounts. Can cause skin irritation in sensitive individuals. Excessive internal use may overstimulate circulation or digestion. Not for children without supervision.';
SET @combinations = 'Often paired with ginger, cinnamon bark, ginseng, or black pepper to enhance circulation and digestion. External applications may combine prickly ash with cayenne or comfrey for musculoskeletal pain relief. Digestive formulas can also include fennel or cardamom.';
SET @folk_use = 'Prickly ash has a long history as a digestive and circulatory stimulant. Native peoples chewed the bark or leaves to relieve toothache and oral discomfort, giving the plant its common name "toothache tree." Decoctions of bark or berries were taken for indigestion, colic, and mild circulation problems. The spicy, pungent properties were also used externally in poultices for joint pain or muscular soreness. Folk traditions emphasized its warming, stimulating qualities for people with cold extremities or sluggish circulation.';
SET @chinese_medicine = 'Modern TCM interprets prickly ash as warm, acrid, and slightly bitter, acting on the Liver, Stomach, and Heart channels. It is used to stimulate circulation, relieve digestive stagnation, and ease mild nerve or muscular pain. Decoctions of the bark and berries are sometimes combined with warming herbs to improve circulation and reduce cold sensations.';

SET @body = '<p>Prickly ash (<em>Zanthoxylum americanum</em>) is a spiny shrub native to woodlands and open slopes of eastern North America. Branched stems are lined with sharp prickles, giving the plant its common name, and aromatic leaves release a citrus-tinged scent when crushed. In late spring and early summer, clusters of small greenish flowers appear, followed by round, yellow-orange berries that hang like tiny ornaments well into autumn.</p><p>The bark, berries, and leaves of prickly ash have long been used in traditional medicine. Early settlers and Indigenous peoples brewed teas from the bark for digestive discomfort and circulatory support. The berries were sometimes chewed or steeped to relieve toothache. Ecologically, prickly ash provides nectar for pollinators and food for birds that eat the berries. Its sturdy form and seasonal interest make it a valuable addition to naturalized gardens or open woodlands. Though its spines require careful handling, many appreciate prickly ash for its rugged beauty and historical importance.</p>';

INSERT INTO families (name) SELECT @family_name FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM families WHERE name = @family_name);
INSERT INTO genuses (name, family_id) SELECT @genus_name, (SELECT id FROM families WHERE name = @family_name LIMIT 1) FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM genuses WHERE name = @genus_name);
SET @genus_id = (SELECT id FROM genuses WHERE name = @genus_name LIMIT 1);
SET @tree_id = @existing_tree_id;

SET @eco_cnt = (SELECT COUNT(*) FROM trees_eco_benefits WHERE tree_id = @tree_id);
SET @native_cnt = (SELECT COUNT(*) FROM trees_native_to WHERE tree_id = @tree_id);
SET @habitat_cnt = (SELECT COUNT(*) FROM trees_natural_habitat WHERE tree_id = @tree_id);
SET @shapes_cnt = (SELECT COUNT(*) FROM trees_shapes WHERE tree_id = @tree_id);
SET @light_cnt = (SELECT COUNT(*) FROM trees_light WHERE tree_id = @tree_id);
SET @soil_cnt = (SELECT COUNT(*) FROM trees_soil WHERE tree_id = @tree_id);
SET @uses_cnt = (SELECT COUNT(*) FROM trees_common_uses WHERE tree_id = @tree_id);
SET @trans_cnt = (SELECT COUNT(*) FROM trees_transplanting WHERE tree_id = @tree_id);
SET @attract_cnt = (SELECT COUNT(*) FROM trees_unique_attractions WHERE tree_id = @tree_id);
SET @toler_cnt = (SELECT COUNT(*) FROM trees_tolerances WHERE tree_id = @tree_id);
SET @tastes_cnt = (SELECT COUNT(*) FROM plants_tastes WHERE tree_id = @tree_id);
SET @organ_cnt = (SELECT COUNT(*) FROM plants_organ_systems WHERE tree_id = @tree_id);
SET @thermal_cnt = (SELECT COUNT(*) FROM plants_thermal_nature WHERE tree_id = @tree_id);
SET @moist_cnt = (SELECT COUNT(*) FROM plants_moisture WHERE tree_id = @tree_id);
SET @parts_cnt = (SELECT COUNT(*) FROM plants_parts_used WHERE tree_id = @tree_id);
SET @prep_cnt = (SELECT COUNT(*) FROM plants_preparations WHERE tree_id = @tree_id);
SET @organs_tissue_cnt = (SELECT COUNT(*) FROM plants_organs_and_tissue WHERE tree_id = @tree_id);

UPDATE trees SET slug = @slug, common_name = COALESCE(NULLIF(TRIM(common_name), ''), @common_name), other_common_names = COALESCE(NULLIF(TRIM(other_common_names), ''), @other_common_names), genus_id = COALESCE(genus_id, @genus_id), specific_epithet = COALESCE(NULLIF(TRIM(specific_epithet), ''), @specific_epithet), other_species = COALESCE(NULLIF(TRIM(other_species), ''), @other_species), medicinal_species = COALESCE(NULLIF(TRIM(medicinal_species), ''), @medicinal_species), zone_id = COALESCE(zone_id, @zone_id), reproduction_type_id = COALESCE(reproduction_type_id, @reproduction_type_id), height_min = COALESCE(height_min, @height_min), height_max = COALESCE(height_max, @height_max), width_min = COALESCE(width_min, @width_min), width_max = COALESCE(width_max, @width_max), growth_rate = COALESCE(NULLIF(TRIM(growth_rate), ''), @growth_rate), lifespan_min = COALESCE(lifespan_min, @lifespan_min), lifespan_max = COALESCE(lifespan_max, @lifespan_max), dormancy_treatment_id = COALESCE(dormancy_treatment_id, @dormancy_treatment_id), growing_instructions = COALESCE(NULLIF(TRIM(growing_instructions), ''), @growing_instructions), special_chemistry = COALESCE(NULLIF(TRIM(special_chemistry), ''), @special_chemistry), signature = COALESCE(NULLIF(TRIM(signature), ''), @signature), precautions = COALESCE(NULLIF(TRIM(precautions), ''), @precautions), combinations = COALESCE(NULLIF(TRIM(combinations), ''), @combinations), folk_use = COALESCE(NULLIF(TRIM(folk_use), ''), @folk_use), chinese_medicine = COALESCE(NULLIF(TRIM(chinese_medicine), ''), @chinese_medicine), body = COALESCE(NULLIF(TRIM(body), ''), @body), mode_id = COALESCE(mode_id, @mode_id_live) WHERE id = @existing_tree_id AND @existing_tree_id IS NOT NULL;

INSERT INTO trees (common_name, slug, other_common_names, genus_id, specific_epithet, other_species, medicinal_species, zone_id, reproduction_type_id, height_min, height_max, width_min, width_max, growth_rate, lifespan_min, lifespan_max, dormancy_treatment_id, growing_instructions, special_chemistry, signature, precautions, combinations, folk_use, chinese_medicine, body, mode_id, images)
SELECT @common_name, @slug, @other_common_names, @genus_id, @specific_epithet, @other_species, @medicinal_species, @zone_id, @reproduction_type_id, @height_min, @height_max, @width_min, @width_max, @growth_rate, @lifespan_min, @lifespan_max, @dormancy_treatment_id, @growing_instructions, @special_chemistry, @signature, @precautions, @combinations, @folk_use, @chinese_medicine, @body, @mode_id_live, '[]' FROM DUAL WHERE @existing_tree_id IS NULL;

SET @tree_id = COALESCE(@existing_tree_id, LAST_INSERT_ID());
SET @eco_cnt = (SELECT COUNT(*) FROM trees_eco_benefits WHERE tree_id = @tree_id);
SET @native_cnt = (SELECT COUNT(*) FROM trees_native_to WHERE tree_id = @tree_id);
SET @habitat_cnt = (SELECT COUNT(*) FROM trees_natural_habitat WHERE tree_id = @tree_id);
SET @shapes_cnt = (SELECT COUNT(*) FROM trees_shapes WHERE tree_id = @tree_id);
SET @light_cnt = (SELECT COUNT(*) FROM trees_light WHERE tree_id = @tree_id);
SET @soil_cnt = (SELECT COUNT(*) FROM trees_soil WHERE tree_id = @tree_id);
SET @uses_cnt = (SELECT COUNT(*) FROM trees_common_uses WHERE tree_id = @tree_id);
SET @trans_cnt = (SELECT COUNT(*) FROM trees_transplanting WHERE tree_id = @tree_id);
SET @attract_cnt = (SELECT COUNT(*) FROM trees_unique_attractions WHERE tree_id = @tree_id);
SET @toler_cnt = (SELECT COUNT(*) FROM trees_tolerances WHERE tree_id = @tree_id);
SET @tastes_cnt = (SELECT COUNT(*) FROM plants_tastes WHERE tree_id = @tree_id);
SET @organ_cnt = (SELECT COUNT(*) FROM plants_organ_systems WHERE tree_id = @tree_id);
SET @thermal_cnt = (SELECT COUNT(*) FROM plants_thermal_nature WHERE tree_id = @tree_id);
SET @moist_cnt = (SELECT COUNT(*) FROM plants_moisture WHERE tree_id = @tree_id);
SET @parts_cnt = (SELECT COUNT(*) FROM plants_parts_used WHERE tree_id = @tree_id);
SET @prep_cnt = (SELECT COUNT(*) FROM plants_preparations WHERE tree_id = @tree_id);
SET @organs_tissue_cnt = (SELECT COUNT(*) FROM plants_organs_and_tissue WHERE tree_id = @tree_id);

SET @trees_category_id = (SELECT id FROM trees_category WHERE LOWER(name) LIKE '%shrubs%woody%' OR LOWER(slug) LIKE '%shrubs%woody%' LIMIT 1);
INSERT INTO trees_categories (tree_id, trees_category_id) SELECT @tree_id, @trees_category_id FROM DUAL WHERE @tree_id IS NOT NULL AND @trees_category_id IS NOT NULL AND (SELECT COUNT(*) FROM trees_categories WHERE tree_id = @tree_id AND trees_category_id = @trees_category_id) = 0;

INSERT IGNORE INTO trees_eco_benefits (tree_id, eco_benefit_id) SELECT @tree_id, id FROM eco_benefits WHERE @eco_cnt = 0 AND LOWER(name) LIKE '%medicinal%' LIMIT 1;
INSERT IGNORE INTO trees_eco_benefits (tree_id, eco_benefit_id) SELECT @tree_id, id FROM eco_benefits WHERE @eco_cnt = 0 AND (LOWER(name) LIKE '%attracts%pollinator%' OR LOWER(name) LIKE '%pollinator%') LIMIT 1;
INSERT IGNORE INTO trees_eco_benefits (tree_id, eco_benefit_id) SELECT @tree_id, id FROM eco_benefits WHERE @eco_cnt = 0 AND (LOWER(name) LIKE '%edible%part%' OR LOWER(name) LIKE '%edible part%') LIMIT 1;

INSERT IGNORE INTO trees_native_to (tree_id, native_to_id) SELECT @tree_id, id FROM native_to WHERE @native_cnt = 0 AND (LOWER(name) LIKE '%eastern%north%america%' OR LOWER(name) LIKE '%eastern north america%') LIMIT 1;

INSERT IGNORE INTO trees_natural_habitat (tree_id, natural_habitat_id) SELECT @tree_id, id FROM natural_habitat WHERE @habitat_cnt = 0 AND (LOWER(name) LIKE '%forest%edge%' OR LOWER(name) LIKE '%forest edge%') LIMIT 1;
INSERT IGNORE INTO trees_natural_habitat (tree_id, natural_habitat_id) SELECT @tree_id, id FROM natural_habitat WHERE @habitat_cnt = 0 AND (LOWER(name) LIKE '%hillside%' OR LOWER(name) LIKE '%upland%') LIMIT 1;
INSERT IGNORE INTO trees_natural_habitat (tree_id, natural_habitat_id) SELECT @tree_id, id FROM natural_habitat WHERE @habitat_cnt = 0 AND (LOWER(name) LIKE '%prairie%') LIMIT 1;
INSERT IGNORE INTO trees_natural_habitat (tree_id, natural_habitat_id) SELECT @tree_id, id FROM natural_habitat WHERE @habitat_cnt = 0 AND (LOWER(name) LIKE '%rocky%' OR LOWER(name) LIKE '%slope%') LIMIT 1;

INSERT IGNORE INTO trees_shapes (tree_id, shape_id) SELECT @tree_id, id FROM shapes WHERE @shapes_cnt = 0 AND LOWER(name) LIKE '%upright%' LIMIT 1;
INSERT IGNORE INTO trees_shapes (tree_id, shape_id) SELECT @tree_id, id FROM shapes WHERE @shapes_cnt = 0 AND (LOWER(name) LIKE '%multi%stem%' OR LOWER(name) LIKE '%multistem%') LIMIT 1;
INSERT IGNORE INTO trees_shapes (tree_id, shape_id) SELECT @tree_id, id FROM shapes WHERE @shapes_cnt = 0 AND (LOWER(name) LIKE '%wide%spread%' OR LOWER(name) LIKE '%spreading%') LIMIT 1;

INSERT IGNORE INTO trees_light (tree_id, light_id) SELECT @tree_id, id FROM light WHERE @light_cnt = 0 AND (LOWER(name) LIKE '%full%sun%' OR LOWER(name) LIKE '%full sun%') LIMIT 1;
INSERT IGNORE INTO trees_light (tree_id, light_id) SELECT @tree_id, id FROM light WHERE @light_cnt = 0 AND (LOWER(name) LIKE '%partial%shade%' OR LOWER(name) LIKE '%partial shade%') LIMIT 1;

INSERT IGNORE INTO trees_soil (tree_id, soil_id) SELECT @tree_id, id FROM soil WHERE @soil_cnt = 0 AND (LOWER(name) LIKE '%moist%' OR LOWER(name) LIKE '%fertile%') LIMIT 1;
INSERT IGNORE INTO trees_soil (tree_id, soil_id) SELECT @tree_id, id FROM soil WHERE @soil_cnt = 0 AND (LOWER(name) LIKE '%well%drain%' OR LOWER(name) LIKE '%drained%') LIMIT 1;
INSERT IGNORE INTO trees_soil (tree_id, soil_id) SELECT @tree_id, id FROM soil WHERE @soil_cnt = 0 AND (LOWER(name) LIKE '%sandy%') LIMIT 1;
INSERT IGNORE INTO trees_soil (tree_id, soil_id) SELECT @tree_id, id FROM soil WHERE @soil_cnt = 0 AND (LOWER(name) LIKE '%clay%') LIMIT 1;

INSERT IGNORE INTO trees_common_uses (tree_id, common_use_id) SELECT @tree_id, id FROM common_uses WHERE @uses_cnt = 0 AND LOWER(name) LIKE '%hedge%' LIMIT 1;
INSERT IGNORE INTO trees_common_uses (tree_id, common_use_id) SELECT @tree_id, id FROM common_uses WHERE @uses_cnt = 0 AND (LOWER(name) LIKE '%landscap%') LIMIT 1;
INSERT IGNORE INTO trees_common_uses (tree_id, common_use_id) SELECT @tree_id, id FROM common_uses WHERE @uses_cnt = 0 AND LOWER(name) LIKE '%specimen%' LIMIT 1;
INSERT IGNORE INTO trees_common_uses (tree_id, common_use_id) SELECT @tree_id, id FROM common_uses WHERE @uses_cnt = 0 AND (LOWER(name) LIKE '%naturalized%' OR LOWER(name) LIKE '%natural%') LIMIT 1;

INSERT IGNORE INTO trees_transplanting (tree_id, transplanting_id) SELECT @tree_id, id FROM transplanting WHERE @trans_cnt = 0 AND LOWER(name) LIKE '%easy%' LIMIT 1;
INSERT IGNORE INTO trees_transplanting (tree_id, transplanting_id) SELECT @tree_id, id FROM transplanting WHERE @trans_cnt = 0 AND LOWER(name) LIKE '%spring%' LIMIT 1;
INSERT IGNORE INTO trees_transplanting (tree_id, transplanting_id) SELECT @tree_id, id FROM transplanting WHERE @trans_cnt = 0 AND LOWER(name) LIKE '%fall%' LIMIT 1;

INSERT IGNORE INTO trees_unique_attractions (tree_id, unique_attraction_id) SELECT @tree_id, id FROM unique_attractions WHERE @attract_cnt = 0 AND LOWER(name) LIKE '%fruit%' LIMIT 1;
INSERT IGNORE INTO trees_unique_attractions (tree_id, unique_attraction_id) SELECT @tree_id, id FROM unique_attractions WHERE @attract_cnt = 0 AND (LOWER(name) LIKE '%leaf%' OR LOWER(name) LIKE '%leaves%') LIMIT 1;
INSERT IGNORE INTO trees_unique_attractions (tree_id, unique_attraction_id) SELECT @tree_id, id FROM unique_attractions WHERE @attract_cnt = 0 AND (LOWER(name) LIKE '%bark%') LIMIT 1;

INSERT IGNORE INTO trees_tolerances (tree_id, tolerance_id) SELECT @tree_id, id FROM tolerances WHERE @toler_cnt = 0 AND (LOWER(name) LIKE '%deer%' OR LOWER(name) LIKE '%deer resistant%') LIMIT 1;
INSERT IGNORE INTO trees_tolerances (tree_id, tolerance_id) SELECT @tree_id, id FROM tolerances WHERE @toler_cnt = 0 AND (LOWER(name) LIKE '%pest%' OR LOWER(name) LIKE '%disease%') LIMIT 1;

INSERT IGNORE INTO plants_tastes (tree_id, taste_id) SELECT @tree_id, id FROM tastes WHERE @tastes_cnt = 0 AND (LOWER(name) LIKE '%acrid%' OR LOWER(name) LIKE '%pungent%') LIMIT 1;
INSERT IGNORE INTO plants_tastes (tree_id, taste_id) SELECT @tree_id, id FROM tastes WHERE @tastes_cnt = 0 AND LOWER(name) LIKE '%bitter%' LIMIT 1;

INSERT IGNORE INTO plants_organ_systems (tree_id, organ_system_id) SELECT @tree_id, id FROM organ_systems WHERE @organ_cnt = 0 AND LOWER(name) LIKE '%digestive%' LIMIT 1;
INSERT IGNORE INTO plants_organ_systems (tree_id, organ_system_id) SELECT @tree_id, id FROM organ_systems WHERE @organ_cnt = 0 AND LOWER(name) LIKE '%circulatory%' LIMIT 1;
INSERT IGNORE INTO plants_organ_systems (tree_id, organ_system_id) SELECT @tree_id, id FROM organ_systems WHERE @organ_cnt = 0 AND (LOWER(name) LIKE '%nervous%' OR LOWER(name) LIKE '%nervous system%') LIMIT 1;

INSERT IGNORE INTO plants_thermal_nature (tree_id, thermal_nature_id) SELECT @tree_id, id FROM thermal_nature WHERE @thermal_cnt = 0 AND LOWER(name) LIKE '%warm%' LIMIT 1;
INSERT IGNORE INTO plants_moisture (tree_id, moisture_id) SELECT @tree_id, id FROM moisture WHERE @moist_cnt = 0 AND (LOWER(name) LIKE '%moisten%' OR LOWER(name) LIKE '%moistening%') LIMIT 1;

INSERT IGNORE INTO plants_parts_used (tree_id, parts_used_id) SELECT @tree_id, id FROM parts_used WHERE @parts_cnt = 0 AND (LOWER(name) LIKE '%bark%') LIMIT 1;
INSERT IGNORE INTO plants_parts_used (tree_id, parts_used_id) SELECT @tree_id, id FROM parts_used WHERE @parts_cnt = 0 AND (LOWER(name) LIKE '%berr%') LIMIT 1;
INSERT IGNORE INTO plants_parts_used (tree_id, parts_used_id) SELECT @tree_id, id FROM parts_used WHERE @parts_cnt = 0 AND (LOWER(name) LIKE '%leaf%' OR LOWER(name) LIKE '%leaves%') LIMIT 1;

INSERT IGNORE INTO plants_preparations (tree_id, preparation_id) SELECT @tree_id, id FROM preparations WHERE @prep_cnt = 0 AND (LOWER(name) LIKE '%tea%' OR LOWER(name) LIKE '%infusion%') LIMIT 1;
INSERT IGNORE INTO plants_preparations (tree_id, preparation_id) SELECT @tree_id, id FROM preparations WHERE @prep_cnt = 0 AND LOWER(name) LIKE '%decoction%' LIMIT 1;
INSERT IGNORE INTO plants_preparations (tree_id, preparation_id) SELECT @tree_id, id FROM preparations WHERE @prep_cnt = 0 AND LOWER(name) LIKE '%tincture%' LIMIT 1;
INSERT IGNORE INTO plants_preparations (tree_id, preparation_id) SELECT @tree_id, id FROM preparations WHERE @prep_cnt = 0 AND LOWER(name) LIKE '%extract%' LIMIT 1;
INSERT IGNORE INTO plants_preparations (tree_id, preparation_id) SELECT @tree_id, id FROM preparations WHERE @prep_cnt = 0 AND LOWER(name) LIKE '%powder%' LIMIT 1;

INSERT IGNORE INTO plants_organs_and_tissue (tree_id, organ_and_tissue_id) SELECT @tree_id, id FROM organs_and_tissue WHERE @organs_tissue_cnt = 0 AND LOWER(name) LIKE '%stomach%' LIMIT 1;
INSERT IGNORE INTO plants_organs_and_tissue (tree_id, organ_and_tissue_id) SELECT @tree_id, id FROM organs_and_tissue WHERE @organs_tissue_cnt = 0 AND LOWER(name) LIKE '%blood%' LIMIT 1;
INSERT IGNORE INTO plants_organs_and_tissue (tree_id, organ_and_tissue_id) SELECT @tree_id, id FROM organs_and_tissue WHERE @organs_tissue_cnt = 0 AND (LOWER(name) LIKE '%nerve%' OR LOWER(name) LIKE '%nerves%') LIMIT 1;

-- =============================================================================
-- PLANT 3: HORSE CHESTNUT (Aesculus hippocastanum)
-- =============================================================================

SET @slug = 'horse-chestnut';
SET @existing_tree_id = (SELECT id FROM trees WHERE slug = @slug LIMIT 1);
SET @family_name = 'Sapindaceae';
SET @genus_name = 'Aesculus';
SET @common_name = 'Horse chestnut';
SET @other_common_names = 'Conker tree';
SET @specific_epithet = 'hippocastanum';
SET @other_species = NULL;
SET @medicinal_species = 'Aesculus hippocastanum';
SET @zone_id = (SELECT id FROM zones WHERE name LIKE '%3%' OR name = '3' OR id = 3 ORDER BY id LIMIT 1);
SET @height_min = 30;
SET @height_max = 60;
SET @width_min = 25;
SET @width_max = 50;
SET @growth_rate = 'medium';
SET @lifespan_min = 80;
SET @lifespan_max = 250;
SET @reproduction_type_id = (SELECT id FROM reproduction_types WHERE LOWER(name) LIKE '%monoacious%' OR LOWER(name) LIKE '%monoecious%' LIMIT 1);
SET @dormancy_treatment_id = @dormancy_cold_moist;
SET @growing_instructions = 'Horse chestnut thrives in full sun to partial shade with rich, well-drained soils. Seeds require cold stratification for germination. Trees establish best when planted in spring or fall with ample space for their spreading canopy. Mulch helps conserve soil moisture, and young trees benefit from protection against wind or frost. Once mature, horse chestnut develops a broad, open crown that provides strong shade and landscape presence.';
SET @special_chemistry = NULL;
SET @signature = NULL;
SET @precautions = 'Raw seeds are toxic if ingested. Use standardized extracts only. Avoid during pregnancy or lactation, and in cases of bleeding disorders or anticoagulant therapy without medical supervision. Skin may react to direct contact with raw plant material.';
SET @combinations = 'Frequently combined with witch hazel, horse chestnut flower extracts, ginkgo, or bilberry for vascular support. Topical creams may include comfrey, arnica, or calendula to enhance anti-inflammatory effects.';
SET @folk_use = 'Horse chestnut seeds, bark, and leaves have been used in European folk medicine for centuries. Seed extracts were traditionally applied to improve venous circulation, reduce swelling, and relieve varicose veins. Bark and leaf decoctions were occasionally used to soothe inflammation or support skin health. Preparations of seeds were also taken to strengthen blood vessels and promote healthy circulation, while the leaves were sometimes applied externally as compresses for minor injuries or swelling.';
SET @chinese_medicine = 'In integrative TCM approaches, horse chestnut is considered slightly cooling and bitter, acting on the Liver and Circulatory systems. Extracts of seeds and bark help improve blood vessel tone, reduce edema, and support overall circulatory health. Topical applications may calm inflammation or relieve minor venous discomfort.';

SET @body = '<p>Horse chestnut (<em>Aesculus hippocastanum</em>) is a stately deciduous tree native to southeastern Europe and widely planted across temperate landscapes for its ornamental beauty. In spring, showy upright clusters of creamy white flowers with hints of pink attract pollinators and enliven parks, avenues, and woodland edges. By autumn, large, glossy green leaves turn a soft yellow before falling, and spiky green husks release shiny brown seeds known as conkers.</p><p>The tree''s seeds, bark, and leaves have long been used in herbal medicine, particularly for venous health. Extracts of horse chestnut seeds are widely recognized for supporting healthy circulation and reducing swelling associated with varicose veins. The broad canopy provides shade and shelter for birds and insects, while flowers supply early-season nectar. Though the seeds are inedible raw, they remain a significant historical source of medicinal compounds. Its combination of seasonal interest, medicinal value, and strong architectural form has made horse chestnut a beloved landscape tree in gardens and public spaces.</p>';

INSERT INTO families (name) SELECT @family_name FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM families WHERE name = @family_name);
INSERT INTO genuses (name, family_id) SELECT @genus_name, (SELECT id FROM families WHERE name = @family_name LIMIT 1) FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM genuses WHERE name = @genus_name);
SET @genus_id = (SELECT id FROM genuses WHERE name = @genus_name LIMIT 1);
SET @tree_id = @existing_tree_id;

SET @eco_cnt = (SELECT COUNT(*) FROM trees_eco_benefits WHERE tree_id = @tree_id);
SET @native_cnt = (SELECT COUNT(*) FROM trees_native_to WHERE tree_id = @tree_id);
SET @habitat_cnt = (SELECT COUNT(*) FROM trees_natural_habitat WHERE tree_id = @tree_id);
SET @shapes_cnt = (SELECT COUNT(*) FROM trees_shapes WHERE tree_id = @tree_id);
SET @light_cnt = (SELECT COUNT(*) FROM trees_light WHERE tree_id = @tree_id);
SET @soil_cnt = (SELECT COUNT(*) FROM trees_soil WHERE tree_id = @tree_id);
SET @uses_cnt = (SELECT COUNT(*) FROM trees_common_uses WHERE tree_id = @tree_id);
SET @trans_cnt = (SELECT COUNT(*) FROM trees_transplanting WHERE tree_id = @tree_id);
SET @attract_cnt = (SELECT COUNT(*) FROM trees_unique_attractions WHERE tree_id = @tree_id);
SET @toler_cnt = (SELECT COUNT(*) FROM trees_tolerances WHERE tree_id = @tree_id);
SET @tastes_cnt = (SELECT COUNT(*) FROM plants_tastes WHERE tree_id = @tree_id);
SET @organ_cnt = (SELECT COUNT(*) FROM plants_organ_systems WHERE tree_id = @tree_id);
SET @thermal_cnt = (SELECT COUNT(*) FROM plants_thermal_nature WHERE tree_id = @tree_id);
SET @moist_cnt = (SELECT COUNT(*) FROM plants_moisture WHERE tree_id = @tree_id);
SET @parts_cnt = (SELECT COUNT(*) FROM plants_parts_used WHERE tree_id = @tree_id);
SET @prep_cnt = (SELECT COUNT(*) FROM plants_preparations WHERE tree_id = @tree_id);
SET @organs_tissue_cnt = (SELECT COUNT(*) FROM plants_organs_and_tissue WHERE tree_id = @tree_id);

UPDATE trees SET slug = @slug, common_name = COALESCE(NULLIF(TRIM(common_name), ''), @common_name), other_common_names = COALESCE(NULLIF(TRIM(other_common_names), ''), @other_common_names), genus_id = COALESCE(genus_id, @genus_id), specific_epithet = COALESCE(NULLIF(TRIM(specific_epithet), ''), @specific_epithet), other_species = COALESCE(NULLIF(TRIM(other_species), ''), @other_species), medicinal_species = COALESCE(NULLIF(TRIM(medicinal_species), ''), @medicinal_species), zone_id = COALESCE(zone_id, @zone_id), reproduction_type_id = COALESCE(reproduction_type_id, @reproduction_type_id), height_min = COALESCE(height_min, @height_min), height_max = COALESCE(height_max, @height_max), width_min = COALESCE(width_min, @width_min), width_max = COALESCE(width_max, @width_max), growth_rate = COALESCE(NULLIF(TRIM(growth_rate), ''), @growth_rate), lifespan_min = COALESCE(lifespan_min, @lifespan_min), lifespan_max = COALESCE(lifespan_max, @lifespan_max), dormancy_treatment_id = COALESCE(dormancy_treatment_id, @dormancy_treatment_id), growing_instructions = COALESCE(NULLIF(TRIM(growing_instructions), ''), @growing_instructions), special_chemistry = COALESCE(NULLIF(TRIM(special_chemistry), ''), @special_chemistry), signature = COALESCE(NULLIF(TRIM(signature), ''), @signature), precautions = COALESCE(NULLIF(TRIM(precautions), ''), @precautions), combinations = COALESCE(NULLIF(TRIM(combinations), ''), @combinations), folk_use = COALESCE(NULLIF(TRIM(folk_use), ''), @folk_use), chinese_medicine = COALESCE(NULLIF(TRIM(chinese_medicine), ''), @chinese_medicine), body = COALESCE(NULLIF(TRIM(body), ''), @body), mode_id = COALESCE(mode_id, @mode_id_live) WHERE id = @existing_tree_id AND @existing_tree_id IS NOT NULL;

INSERT INTO trees (common_name, slug, other_common_names, genus_id, specific_epithet, other_species, medicinal_species, zone_id, reproduction_type_id, height_min, height_max, width_min, width_max, growth_rate, lifespan_min, lifespan_max, dormancy_treatment_id, growing_instructions, special_chemistry, signature, precautions, combinations, folk_use, chinese_medicine, body, mode_id, images)
SELECT @common_name, @slug, @other_common_names, @genus_id, @specific_epithet, @other_species, @medicinal_species, @zone_id, @reproduction_type_id, @height_min, @height_max, @width_min, @width_max, @growth_rate, @lifespan_min, @lifespan_max, @dormancy_treatment_id, @growing_instructions, @special_chemistry, @signature, @precautions, @combinations, @folk_use, @chinese_medicine, @body, @mode_id_live, '[]' FROM DUAL WHERE @existing_tree_id IS NULL;

SET @tree_id = COALESCE(@existing_tree_id, LAST_INSERT_ID());
SET @eco_cnt = (SELECT COUNT(*) FROM trees_eco_benefits WHERE tree_id = @tree_id);
SET @native_cnt = (SELECT COUNT(*) FROM trees_native_to WHERE tree_id = @tree_id);
SET @habitat_cnt = (SELECT COUNT(*) FROM trees_natural_habitat WHERE tree_id = @tree_id);
SET @shapes_cnt = (SELECT COUNT(*) FROM trees_shapes WHERE tree_id = @tree_id);
SET @light_cnt = (SELECT COUNT(*) FROM trees_light WHERE tree_id = @tree_id);
SET @soil_cnt = (SELECT COUNT(*) FROM trees_soil WHERE tree_id = @tree_id);
SET @uses_cnt = (SELECT COUNT(*) FROM trees_common_uses WHERE tree_id = @tree_id);
SET @trans_cnt = (SELECT COUNT(*) FROM trees_transplanting WHERE tree_id = @tree_id);
SET @attract_cnt = (SELECT COUNT(*) FROM trees_unique_attractions WHERE tree_id = @tree_id);
SET @toler_cnt = (SELECT COUNT(*) FROM trees_tolerances WHERE tree_id = @tree_id);
SET @tastes_cnt = (SELECT COUNT(*) FROM plants_tastes WHERE tree_id = @tree_id);
SET @organ_cnt = (SELECT COUNT(*) FROM plants_organ_systems WHERE tree_id = @tree_id);
SET @thermal_cnt = (SELECT COUNT(*) FROM plants_thermal_nature WHERE tree_id = @tree_id);
SET @moist_cnt = (SELECT COUNT(*) FROM plants_moisture WHERE tree_id = @tree_id);
SET @parts_cnt = (SELECT COUNT(*) FROM plants_parts_used WHERE tree_id = @tree_id);
SET @prep_cnt = (SELECT COUNT(*) FROM plants_preparations WHERE tree_id = @tree_id);
SET @organs_tissue_cnt = (SELECT COUNT(*) FROM plants_organs_and_tissue WHERE tree_id = @tree_id);

SET @trees_category_id = (SELECT id FROM trees_category WHERE LOWER(name) LIKE '%deciduous%' OR LOWER(slug) LIKE '%deciduous%' LIMIT 1);
INSERT INTO trees_categories (tree_id, trees_category_id) SELECT @tree_id, @trees_category_id FROM DUAL WHERE @tree_id IS NOT NULL AND @trees_category_id IS NOT NULL AND (SELECT COUNT(*) FROM trees_categories WHERE tree_id = @tree_id AND trees_category_id = @trees_category_id) = 0;

INSERT IGNORE INTO trees_eco_benefits (tree_id, eco_benefit_id) SELECT @tree_id, id FROM eco_benefits WHERE @eco_cnt = 0 AND LOWER(name) LIKE '%medicinal%' LIMIT 1;
INSERT IGNORE INTO trees_eco_benefits (tree_id, eco_benefit_id) SELECT @tree_id, id FROM eco_benefits WHERE @eco_cnt = 0 AND (LOWER(name) LIKE '%attracts%pollinator%' OR LOWER(name) LIKE '%pollinator%') LIMIT 1;
INSERT IGNORE INTO trees_eco_benefits (tree_id, eco_benefit_id) SELECT @tree_id, id FROM eco_benefits WHERE @eco_cnt = 0 AND (LOWER(name) LIKE '%shade%' OR LOWER(name) LIKE '%provides shade%') LIMIT 1;

INSERT IGNORE INTO trees_native_to (tree_id, native_to_id) SELECT @tree_id, id FROM native_to WHERE @native_cnt = 0 AND LOWER(name) LIKE '%europe%' LIMIT 1;

INSERT IGNORE INTO trees_natural_habitat (tree_id, natural_habitat_id) SELECT @tree_id, id FROM natural_habitat WHERE @habitat_cnt = 0 AND (LOWER(name) LIKE '%forest%edge%' OR LOWER(name) LIKE '%forest edge%') LIMIT 1;
INSERT IGNORE INTO trees_natural_habitat (tree_id, natural_habitat_id) SELECT @tree_id, id FROM natural_habitat WHERE @habitat_cnt = 0 AND (LOWER(name) LIKE '%hillside%' OR LOWER(name) LIKE '%upland%') LIMIT 1;
INSERT IGNORE INTO trees_natural_habitat (tree_id, natural_habitat_id) SELECT @tree_id, id FROM natural_habitat WHERE @habitat_cnt = 0 AND (LOWER(name) LIKE '%park%' OR LOWER(name) LIKE '%open%woodland%') LIMIT 1;

INSERT IGNORE INTO trees_shapes (tree_id, shape_id) SELECT @tree_id, id FROM shapes WHERE @shapes_cnt = 0 AND (LOWER(name) LIKE '%single%trunk%' OR LOWER(name) LIKE '%single trunk%') LIMIT 1;
INSERT IGNORE INTO trees_shapes (tree_id, shape_id) SELECT @tree_id, id FROM shapes WHERE @shapes_cnt = 0 AND (LOWER(name) LIKE '%wide%spread%' OR LOWER(name) LIKE '%spreading%') LIMIT 1;
INSERT IGNORE INTO trees_shapes (tree_id, shape_id) SELECT @tree_id, id FROM shapes WHERE @shapes_cnt = 0 AND LOWER(name) LIKE '%upright%' LIMIT 1;

INSERT IGNORE INTO trees_light (tree_id, light_id) SELECT @tree_id, id FROM light WHERE @light_cnt = 0 AND (LOWER(name) LIKE '%full%sun%' OR LOWER(name) LIKE '%full sun%') LIMIT 1;
INSERT IGNORE INTO trees_light (tree_id, light_id) SELECT @tree_id, id FROM light WHERE @light_cnt = 0 AND (LOWER(name) LIKE '%partial%shade%' OR LOWER(name) LIKE '%partial shade%') LIMIT 1;

INSERT IGNORE INTO trees_soil (tree_id, soil_id) SELECT @tree_id, id FROM soil WHERE @soil_cnt = 0 AND (LOWER(name) LIKE '%moist%' OR LOWER(name) LIKE '%fertile%') LIMIT 1;
INSERT IGNORE INTO trees_soil (tree_id, soil_id) SELECT @tree_id, id FROM soil WHERE @soil_cnt = 0 AND (LOWER(name) LIKE '%well%drain%' OR LOWER(name) LIKE '%drained%') LIMIT 1;
INSERT IGNORE INTO trees_soil (tree_id, soil_id) SELECT @tree_id, id FROM soil WHERE @soil_cnt = 0 AND (LOWER(name) LIKE '%ph%adapt%' OR LOWER(name) LIKE '%adaptable%') LIMIT 1;

INSERT IGNORE INTO trees_common_uses (tree_id, common_use_id) SELECT @tree_id, id FROM common_uses WHERE @uses_cnt = 0 AND LOWER(name) LIKE '%specimen%' LIMIT 1;
INSERT IGNORE INTO trees_common_uses (tree_id, common_use_id) SELECT @tree_id, id FROM common_uses WHERE @uses_cnt = 0 AND (LOWER(name) LIKE '%landscap%') LIMIT 1;
INSERT IGNORE INTO trees_common_uses (tree_id, common_use_id) SELECT @tree_id, id FROM common_uses WHERE @uses_cnt = 0 AND (LOWER(name) LIKE '%shade%garden%' OR LOWER(name) LIKE '%shade garden%') LIMIT 1;
INSERT IGNORE INTO trees_common_uses (tree_id, common_use_id) SELECT @tree_id, id FROM common_uses WHERE @uses_cnt = 0 AND (LOWER(name) LIKE '%naturalized%' OR LOWER(name) LIKE '%natural%') LIMIT 1;

INSERT IGNORE INTO trees_transplanting (tree_id, transplanting_id) SELECT @tree_id, id FROM transplanting WHERE @trans_cnt = 0 AND (LOWER(name) LIKE '%difficult%' OR LOWER(name) LIKE '%challenging%') LIMIT 1;
INSERT IGNORE INTO trees_transplanting (tree_id, transplanting_id) SELECT @tree_id, id FROM transplanting WHERE @trans_cnt = 0 AND LOWER(name) LIKE '%spring%' LIMIT 1;
INSERT IGNORE INTO trees_transplanting (tree_id, transplanting_id) SELECT @tree_id, id FROM transplanting WHERE @trans_cnt = 0 AND LOWER(name) LIKE '%fall%' LIMIT 1;

INSERT IGNORE INTO trees_unique_attractions (tree_id, unique_attraction_id) SELECT @tree_id, id FROM unique_attractions WHERE @attract_cnt = 0 AND LOWER(name) LIKE '%flower%' LIMIT 1;
INSERT IGNORE INTO trees_unique_attractions (tree_id, unique_attraction_id) SELECT @tree_id, id FROM unique_attractions WHERE @attract_cnt = 0 AND LOWER(name) LIKE '%fruit%' LIMIT 1;
INSERT IGNORE INTO trees_unique_attractions (tree_id, unique_attraction_id) SELECT @tree_id, id FROM unique_attractions WHERE @attract_cnt = 0 AND (LOWER(name) LIKE '%bark%') LIMIT 1;
INSERT IGNORE INTO trees_unique_attractions (tree_id, unique_attraction_id) SELECT @tree_id, id FROM unique_attractions WHERE @attract_cnt = 0 AND (LOWER(name) LIKE '%leaf%' OR LOWER(name) LIKE '%leaves%') LIMIT 1;

INSERT IGNORE INTO trees_tolerances (tree_id, tolerance_id) SELECT @tree_id, id FROM tolerances WHERE @toler_cnt = 0 AND (LOWER(name) LIKE '%deer%' OR LOWER(name) LIKE '%deer resistant%') LIMIT 1;
INSERT IGNORE INTO trees_tolerances (tree_id, tolerance_id) SELECT @tree_id, id FROM tolerances WHERE @toler_cnt = 0 AND (LOWER(name) LIKE '%pest%' OR LOWER(name) LIKE '%disease%') LIMIT 1;

INSERT IGNORE INTO plants_tastes (tree_id, taste_id) SELECT @tree_id, id FROM tastes WHERE @tastes_cnt = 0 AND LOWER(name) LIKE '%bitter%' LIMIT 1;
INSERT IGNORE INTO plants_tastes (tree_id, taste_id) SELECT @tree_id, id FROM tastes WHERE @tastes_cnt = 0 AND LOWER(name) LIKE '%astringent%' LIMIT 1;

INSERT IGNORE INTO plants_organ_systems (tree_id, organ_system_id) SELECT @tree_id, id FROM organ_systems WHERE @organ_cnt = 0 AND LOWER(name) LIKE '%circulatory%' LIMIT 1;
INSERT IGNORE INTO plants_organ_systems (tree_id, organ_system_id) SELECT @tree_id, id FROM organ_systems WHERE @organ_cnt = 0 AND (LOWER(name) LIKE '%integumentary%' OR LOWER(name) LIKE '%skin%') LIMIT 1;

INSERT IGNORE INTO plants_thermal_nature (tree_id, thermal_nature_id) SELECT @tree_id, id FROM thermal_nature WHERE @thermal_cnt = 0 AND LOWER(name) LIKE '%cool%' LIMIT 1;
INSERT IGNORE INTO plants_moisture (tree_id, moisture_id) SELECT @tree_id, id FROM moisture WHERE @moist_cnt = 0 AND (LOWER(name) LIKE '%moisten%' OR LOWER(name) LIKE '%moistening%') LIMIT 1;

INSERT IGNORE INTO plants_parts_used (tree_id, parts_used_id) SELECT @tree_id, id FROM parts_used WHERE @parts_cnt = 0 AND (LOWER(name) LIKE '%seed%' OR LOWER(name) LIKE '%seeds%') LIMIT 1;
INSERT IGNORE INTO plants_parts_used (tree_id, parts_used_id) SELECT @tree_id, id FROM parts_used WHERE @parts_cnt = 0 AND (LOWER(name) LIKE '%bark%') LIMIT 1;
INSERT IGNORE INTO plants_parts_used (tree_id, parts_used_id) SELECT @tree_id, id FROM parts_used WHERE @parts_cnt = 0 AND (LOWER(name) LIKE '%leaf%' OR LOWER(name) LIKE '%leaves%') LIMIT 1;

INSERT IGNORE INTO plants_preparations (tree_id, preparation_id) SELECT @tree_id, id FROM preparations WHERE @prep_cnt = 0 AND LOWER(name) LIKE '%extract%' LIMIT 1;
INSERT IGNORE INTO plants_preparations (tree_id, preparation_id) SELECT @tree_id, id FROM preparations WHERE @prep_cnt = 0 AND LOWER(name) LIKE '%tincture%' LIMIT 1;
INSERT IGNORE INTO plants_preparations (tree_id, preparation_id) SELECT @tree_id, id FROM preparations WHERE @prep_cnt = 0 AND (LOWER(name) LIKE '%cream%') LIMIT 1;
INSERT IGNORE INTO plants_preparations (tree_id, preparation_id) SELECT @tree_id, id FROM preparations WHERE @prep_cnt = 0 AND LOWER(name) LIKE '%salve%' LIMIT 1;

INSERT IGNORE INTO plants_organs_and_tissue (tree_id, organ_and_tissue_id) SELECT @tree_id, id FROM organs_and_tissue WHERE @organs_tissue_cnt = 0 AND LOWER(name) LIKE '%blood%' LIMIT 1;
INSERT IGNORE INTO plants_organs_and_tissue (tree_id, organ_and_tissue_id) SELECT @tree_id, id FROM organs_and_tissue WHERE @organs_tissue_cnt = 0 AND (LOWER(name) LIKE '%vein%') LIMIT 1;
INSERT IGNORE INTO plants_organs_and_tissue (tree_id, organ_and_tissue_id) SELECT @tree_id, id FROM organs_and_tissue WHERE @organs_tissue_cnt = 0 AND LOWER(name) LIKE '%skin%' LIMIT 1;

-- -----------------------------------------------------------------------------
-- DONE. Verify with:
-- SELECT id, common_name, slug FROM trees WHERE slug IN ('eastern-hemlock','prickly-ash','horse-chestnut');
-- -----------------------------------------------------------------------------
