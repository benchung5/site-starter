-- =============================================================================
-- CREATE OR UPDATE PLANTS: SCHISANDRA, BLACK CHERRY, CHOKE CHERRY
-- =============================================================================
-- Merge only if existing plant has same slug; otherwise create new.
-- Fills only fields that are NULL/empty. Body: replace if empty only (no append).
-- Join tables: add associations only if plant has none.
-- Use ASCII hyphens only (no Unicode) for database compatibility.
-- =============================================================================

SET @mode_id_live = (SELECT id FROM mode WHERE name = 'live' LIMIT 1);
SET @mode_id_live = COALESCE(@mode_id_live, (SELECT id FROM mode ORDER BY id DESC LIMIT 1));
SET @dormancy_cold_moist = (SELECT id FROM dormancy_treatments WHERE LOWER(name) LIKE '%cold%moist%stratification%' OR LOWER(name) LIKE '%cold moist%' LIMIT 1);

-- =============================================================================
-- PLANT 1: SCHISANDRA (Schisandra chinensis)
-- =============================================================================

SET @slug = 'schisandra';
SET @existing_tree_id = (SELECT id FROM trees WHERE slug = @slug LIMIT 1);
SET @family_name = 'Schisandraceae';
SET @genus_name = 'Schisandra';
SET @common_name = 'Schisandra';
SET @other_common_names = 'Five-flavor berry, magnolia vine, wu wei zi';
SET @specific_epithet = 'chinensis';
SET @other_species = NULL;
SET @medicinal_species = 'Schisandra chinensis';
SET @zone_id = (SELECT id FROM zones WHERE name LIKE '%4%' OR name = '4' OR id = 4 ORDER BY id LIMIT 1);
SET @height_min = 10;
SET @height_max = 30;
SET @width_min = 4;
SET @width_max = 10;
SET @growth_rate = 'medium';
SET @lifespan_min = 20;
SET @lifespan_max = 50;
SET @reproduction_type_id = (SELECT id FROM reproduction_types WHERE LOWER(name) LIKE '%dioecious%' LIMIT 1);
SET @dormancy_treatment_id = @dormancy_cold_moist;
SET @growing_instructions = 'Schisandra grows best in moist, fertile soil with good drainage and partial shade. Vines benefit from a trellis or arbor for support and should be protected from strong winds. Seeds require cold stratification before germination. Consistent moisture encourages vigorous growth and fruit production, though mature vines tolerate short dry periods. Planting male and female vines improves berry yields in dioecious varieties. Mulch helps conserve soil moisture and maintain stable soil temperatures around the roots.';
SET @special_chemistry = NULL;
SET @signature = NULL;
SET @precautions = 'Generally safe when used appropriately. Avoid excessive doses during pregnancy. People with acute infections or ulcers should consult a practitioner before use, as schisandra''s astringent properties may trap pathogens in early illness.';
SET @combinations = 'Often combined with ginseng, astragalus, or reishi mushroom for energy and immune support. Liver-support formulas may include schisandra with milk thistle or turmeric. For respiratory conditions it is sometimes paired with licorice root or magnolia bark.';
SET @folk_use = 'Schisandra berries have been valued in traditional East Asian herbalism for thousands of years as a tonic for vitality and longevity. The berries were consumed dried, brewed into teas, or powdered and added to herbal preparations. Folk practitioners used schisandra to strengthen endurance, improve concentration, and support recovery from fatigue or illness. Hunters and travelers sometimes carried the berries as an energizing food believed to reduce thirst and increase stamina during long journeys.';
SET @chinese_medicine = 'Known as Wu Wei Zi, schisandra is a classical herb in Traditional Chinese Medicine. It is considered warm and sour with all five flavors, acting primarily on the Lung, Heart, and Kidney meridians. It is used to tonify Qi, nourish Yin, and stabilize the essence. Schisandra is commonly prescribed for chronic cough, fatigue, stress, insomnia, and to support liver health.';

SET @body = '<p>Schisandra (<em>Schisandra chinensis</em>) is a climbing vine native to the cool forests of northeastern Asia. Its slender stems wind through shrubs and small trees, producing glossy green leaves that form a lush curtain of foliage during the growing season. In late spring, delicate white or pale pink flowers appear, releasing a subtle fragrance that attracts pollinators. By late summer and autumn, clusters of bright red berries hang from the vine like strings of small jewels.</p><p>The fruit of schisandra is famous for its complex flavor profile: sweet, sour, salty, bitter, and pungent, earning the plant its traditional name "five-flavor berry." In herbal traditions throughout China, Korea, and Russia, these berries are prized as an adaptogenic tonic believed to strengthen the body''s resistance to stress and fatigue.</p><p>Beyond its medicinal reputation, schisandra adds ornamental value to woodland gardens and edible landscapes. The vines grow vigorously when provided with support and dappled light, producing abundant berries under favorable conditions. As both a functional herb and a graceful climbing plant, schisandra bridges the worlds of ornamental horticulture and traditional medicine, offering beauty as well as a long history of cultural use.</p>';

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

SET @trees_category_id = (SELECT id FROM trees_category WHERE LOWER(name) LIKE '%vine%' OR LOWER(name) LIKE '%climber%' OR LOWER(slug) LIKE '%vine%' LIMIT 1);
INSERT INTO trees_categories (tree_id, trees_category_id) SELECT @tree_id, @trees_category_id FROM DUAL WHERE @tree_id IS NOT NULL AND @trees_category_id IS NOT NULL AND (SELECT COUNT(*) FROM trees_categories WHERE tree_id = @tree_id AND trees_category_id = @trees_category_id) = 0;

INSERT IGNORE INTO trees_eco_benefits (tree_id, eco_benefit_id) SELECT @tree_id, id FROM eco_benefits WHERE @eco_cnt = 0 AND LOWER(name) LIKE '%medicinal%' LIMIT 1;
INSERT IGNORE INTO trees_eco_benefits (tree_id, eco_benefit_id) SELECT @tree_id, id FROM eco_benefits WHERE @eco_cnt = 0 AND (LOWER(name) LIKE '%attracts%pollinator%' OR LOWER(name) LIKE '%pollinator%') LIMIT 1;
INSERT IGNORE INTO trees_eco_benefits (tree_id, eco_benefit_id) SELECT @tree_id, id FROM eco_benefits WHERE @eco_cnt = 0 AND (LOWER(name) LIKE '%edible%fruit%' OR LOWER(name) LIKE '%edible fruit%' OR LOWER(name) LIKE '%edible%part%') LIMIT 1;

INSERT IGNORE INTO trees_native_to (tree_id, native_to_id) SELECT @tree_id, id FROM native_to WHERE @native_cnt = 0 AND (LOWER(name) LIKE '%east%asia%' OR LOWER(name) LIKE '%east asia%' OR LOWER(name) LIKE '%asia%') LIMIT 1;

INSERT IGNORE INTO trees_natural_habitat (tree_id, natural_habitat_id) SELECT @tree_id, id FROM natural_habitat WHERE @habitat_cnt = 0 AND (LOWER(name) LIKE '%forest%edge%' OR LOWER(name) LIKE '%forest edge%') LIMIT 1;
INSERT IGNORE INTO trees_natural_habitat (tree_id, natural_habitat_id) SELECT @tree_id, id FROM natural_habitat WHERE @habitat_cnt = 0 AND (LOWER(name) LIKE '%inner%forest%' OR LOWER(name) LIKE '%forest%') LIMIT 1;
INSERT IGNORE INTO trees_natural_habitat (tree_id, natural_habitat_id) SELECT @tree_id, id FROM natural_habitat WHERE @habitat_cnt = 0 AND (LOWER(name) LIKE '%mountain%') LIMIT 1;

INSERT IGNORE INTO trees_shapes (tree_id, shape_id) SELECT @tree_id, id FROM shapes WHERE @shapes_cnt = 0 AND (LOWER(name) LIKE '%vine%' OR LOWER(name) LIKE '%climb%') LIMIT 1;
INSERT IGNORE INTO trees_shapes (tree_id, shape_id) SELECT @tree_id, id FROM shapes WHERE @shapes_cnt = 0 AND (LOWER(name) LIKE '%twin%') LIMIT 1;

INSERT IGNORE INTO trees_light (tree_id, light_id) SELECT @tree_id, id FROM light WHERE @light_cnt = 0 AND (LOWER(name) LIKE '%full%sun%' OR LOWER(name) LIKE '%full sun%') LIMIT 1;
INSERT IGNORE INTO trees_light (tree_id, light_id) SELECT @tree_id, id FROM light WHERE @light_cnt = 0 AND (LOWER(name) LIKE '%partial%shade%' OR LOWER(name) LIKE '%partial shade%') LIMIT 1;

INSERT IGNORE INTO trees_soil (tree_id, soil_id) SELECT @tree_id, id FROM soil WHERE @soil_cnt = 0 AND (LOWER(name) LIKE '%moist%' OR LOWER(name) LIKE '%fertile%') LIMIT 1;
INSERT IGNORE INTO trees_soil (tree_id, soil_id) SELECT @tree_id, id FROM soil WHERE @soil_cnt = 0 AND (LOWER(name) LIKE '%well%drain%' OR LOWER(name) LIKE '%drained%') LIMIT 1;
INSERT IGNORE INTO trees_soil (tree_id, soil_id) SELECT @tree_id, id FROM soil WHERE @soil_cnt = 0 AND (LOWER(name) LIKE '%acid%' OR LOWER(name) LIKE '%acidic%') LIMIT 1;

INSERT IGNORE INTO trees_common_uses (tree_id, common_use_id) SELECT @tree_id, id FROM common_uses WHERE @uses_cnt = 0 AND (LOWER(name) LIKE '%trellis%') LIMIT 1;
INSERT IGNORE INTO trees_common_uses (tree_id, common_use_id) SELECT @tree_id, id FROM common_uses WHERE @uses_cnt = 0 AND (LOWER(name) LIKE '%edible%garden%' OR LOWER(name) LIKE '%edible garden%') LIMIT 1;
INSERT IGNORE INTO trees_common_uses (tree_id, common_use_id) SELECT @tree_id, id FROM common_uses WHERE @uses_cnt = 0 AND (LOWER(name) LIKE '%medicinal%garden%' OR LOWER(name) LIKE '%medicinal garden%') LIMIT 1;
INSERT IGNORE INTO trees_common_uses (tree_id, common_use_id) SELECT @tree_id, id FROM common_uses WHERE @uses_cnt = 0 AND (LOWER(name) LIKE '%naturalized%' OR LOWER(name) LIKE '%natural%') LIMIT 1;

INSERT IGNORE INTO trees_transplanting (tree_id, transplanting_id) SELECT @tree_id, id FROM transplanting WHERE @trans_cnt = 0 AND (LOWER(name) LIKE '%moderate%' OR LOWER(name) LIKE '%medium%') LIMIT 1;
INSERT IGNORE INTO trees_transplanting (tree_id, transplanting_id) SELECT @tree_id, id FROM transplanting WHERE @trans_cnt = 0 AND LOWER(name) LIKE '%spring%' LIMIT 1;
INSERT IGNORE INTO trees_transplanting (tree_id, transplanting_id) SELECT @tree_id, id FROM transplanting WHERE @trans_cnt = 0 AND LOWER(name) LIKE '%fall%' LIMIT 1;

INSERT IGNORE INTO trees_unique_attractions (tree_id, unique_attraction_id) SELECT @tree_id, id FROM unique_attractions WHERE @attract_cnt = 0 AND LOWER(name) LIKE '%fruit%' LIMIT 1;
INSERT IGNORE INTO trees_unique_attractions (tree_id, unique_attraction_id) SELECT @tree_id, id FROM unique_attractions WHERE @attract_cnt = 0 AND (LOWER(name) LIKE '%leaf%' OR LOWER(name) LIKE '%leaves%') LIMIT 1;
INSERT IGNORE INTO trees_unique_attractions (tree_id, unique_attraction_id) SELECT @tree_id, id FROM unique_attractions WHERE @attract_cnt = 0 AND (LOWER(name) LIKE '%berr%' OR LOWER(name) LIKE '%berry%') LIMIT 1;

INSERT IGNORE INTO trees_tolerances (tree_id, tolerance_id) SELECT @tree_id, id FROM tolerances WHERE @toler_cnt = 0 AND (LOWER(name) LIKE '%cold%' OR LOWER(name) LIKE '%hardy%') LIMIT 1;

INSERT IGNORE INTO plants_tastes (tree_id, taste_id) SELECT @tree_id, id FROM tastes WHERE @tastes_cnt = 0 AND LOWER(name) LIKE '%sweet%' LIMIT 1;
INSERT IGNORE INTO plants_tastes (tree_id, taste_id) SELECT @tree_id, id FROM tastes WHERE @tastes_cnt = 0 AND LOWER(name) LIKE '%sour%' LIMIT 1;
INSERT IGNORE INTO plants_tastes (tree_id, taste_id) SELECT @tree_id, id FROM tastes WHERE @tastes_cnt = 0 AND LOWER(name) LIKE '%bitter%' LIMIT 1;
INSERT IGNORE INTO plants_tastes (tree_id, taste_id) SELECT @tree_id, id FROM tastes WHERE @tastes_cnt = 0 AND (LOWER(name) LIKE '%pungent%' OR LOWER(name) LIKE '%acrid%') LIMIT 1;
INSERT IGNORE INTO plants_tastes (tree_id, taste_id) SELECT @tree_id, id FROM tastes WHERE @tastes_cnt = 0 AND LOWER(name) LIKE '%salty%' LIMIT 1;

INSERT IGNORE INTO plants_organ_systems (tree_id, organ_system_id) SELECT @tree_id, id FROM organ_systems WHERE @organ_cnt = 0 AND (LOWER(name) LIKE '%nervous%' OR LOWER(name) LIKE '%nervous system%') LIMIT 1;
INSERT IGNORE INTO plants_organ_systems (tree_id, organ_system_id) SELECT @tree_id, id FROM organ_systems WHERE @organ_cnt = 0 AND (LOWER(name) LIKE '%respiratory%' OR LOWER(name) LIKE '%lung%') LIMIT 1;
INSERT IGNORE INTO plants_organ_systems (tree_id, organ_system_id) SELECT @tree_id, id FROM organ_systems WHERE @organ_cnt = 0 AND (LOWER(name) LIKE '%liver%' OR LOWER(name) LIKE '%hepatic%') LIMIT 1;
INSERT IGNORE INTO plants_organ_systems (tree_id, organ_system_id) SELECT @tree_id, id FROM organ_systems WHERE @organ_cnt = 0 AND (LOWER(name) LIKE '%immune%' OR LOWER(name) LIKE '%lymphatic%') LIMIT 1;

INSERT IGNORE INTO plants_thermal_nature (tree_id, thermal_nature_id) SELECT @tree_id, id FROM thermal_nature WHERE @thermal_cnt = 0 AND LOWER(name) LIKE '%warm%' LIMIT 1;
INSERT IGNORE INTO plants_moisture (tree_id, moisture_id) SELECT @tree_id, id FROM moisture WHERE @moist_cnt = 0 AND (LOWER(name) LIKE '%moisten%' OR LOWER(name) LIKE '%moistening%') LIMIT 1;

INSERT IGNORE INTO plants_parts_used (tree_id, parts_used_id) SELECT @tree_id, id FROM parts_used WHERE @parts_cnt = 0 AND (LOWER(name) LIKE '%berr%' OR LOWER(name) LIKE '%berry%') LIMIT 1;
INSERT IGNORE INTO plants_parts_used (tree_id, parts_used_id) SELECT @tree_id, id FROM parts_used WHERE @parts_cnt = 0 AND (LOWER(name) LIKE '%seed%') LIMIT 1;

INSERT IGNORE INTO plants_preparations (tree_id, preparation_id) SELECT @tree_id, id FROM preparations WHERE @prep_cnt = 0 AND (LOWER(name) LIKE '%tea%' OR LOWER(name) LIKE '%infusion%') LIMIT 1;
INSERT IGNORE INTO plants_preparations (tree_id, preparation_id) SELECT @tree_id, id FROM preparations WHERE @prep_cnt = 0 AND LOWER(name) LIKE '%tincture%' LIMIT 1;
INSERT IGNORE INTO plants_preparations (tree_id, preparation_id) SELECT @tree_id, id FROM preparations WHERE @prep_cnt = 0 AND LOWER(name) LIKE '%powder%' LIMIT 1;
INSERT IGNORE INTO plants_preparations (tree_id, preparation_id) SELECT @tree_id, id FROM preparations WHERE @prep_cnt = 0 AND LOWER(name) LIKE '%extract%' LIMIT 1;

INSERT IGNORE INTO plants_organs_and_tissue (tree_id, organ_and_tissue_id) SELECT @tree_id, id FROM organs_and_tissue WHERE @organs_tissue_cnt = 0 AND (LOWER(name) LIKE '%lung%' OR LOWER(name) LIKE '%lungs%') LIMIT 1;
INSERT IGNORE INTO plants_organs_and_tissue (tree_id, organ_and_tissue_id) SELECT @tree_id, id FROM organs_and_tissue WHERE @organs_tissue_cnt = 0 AND (LOWER(name) LIKE '%liver%') LIMIT 1;
INSERT IGNORE INTO plants_organs_and_tissue (tree_id, organ_and_tissue_id) SELECT @tree_id, id FROM organs_and_tissue WHERE @organs_tissue_cnt = 0 AND LOWER(name) LIKE '%blood%' LIMIT 1;
INSERT IGNORE INTO plants_organs_and_tissue (tree_id, organ_and_tissue_id) SELECT @tree_id, id FROM organs_and_tissue WHERE @organs_tissue_cnt = 0 AND (LOWER(name) LIKE '%nerve%' OR LOWER(name) LIKE '%nerves%') LIMIT 1;

-- =============================================================================
-- PLANT 2: BLACK CHERRY (Prunus serotina)
-- =============================================================================

SET @slug = 'black-cherry';
SET @existing_tree_id = (SELECT id FROM trees WHERE slug = @slug LIMIT 1);
SET @family_name = 'Rosaceae';
SET @genus_name = 'Prunus';
SET @common_name = 'Black cherry';
SET @other_common_names = 'Wild black cherry, rum cherry';
SET @specific_epithet = 'serotina';
SET @other_species = NULL;
SET @medicinal_species = 'Prunus serotina';
SET @zone_id = (SELECT id FROM zones WHERE name LIKE '%3%' OR name = '3' OR id = 3 ORDER BY id LIMIT 1);
SET @height_min = 40;
SET @height_max = 80;
SET @width_min = 25;
SET @width_max = 40;
SET @growth_rate = 'medium';
SET @lifespan_min = 60;
SET @lifespan_max = 200;
SET @reproduction_type_id = NULL;
SET @dormancy_treatment_id = @dormancy_cold_moist;
SET @growing_instructions = 'Black cherry thrives in well-drained soils with full sun to partial shade. It establishes readily from seed and grows relatively quickly compared with many native trees. Young trees benefit from protection against browsing animals. Once mature, the species tolerates a range of soil conditions and produces abundant fruit that attracts wildlife.';
SET @special_chemistry = NULL;
SET @signature = NULL;
SET @precautions = 'Leaves and seeds contain cyanogenic compounds and should not be consumed. Medicinal preparations use properly processed bark only. Avoid excessive use.';
SET @combinations = 'Often combined with mullein, licorice root, or marshmallow root in respiratory formulas. Cough syrups traditionally include black cherry bark with wild cherry, honey, and warming herbs like ginger.';
SET @folk_use = 'Black cherry bark has long been used in North American herbal traditions as a soothing remedy for coughs and respiratory irritation. Indigenous peoples prepared bark decoctions to ease bronchial congestion and calm persistent coughs. Settlers later adopted the practice, producing syrups that became common ingredients in traditional cough medicines.';
SET @chinese_medicine = 'Black cherry is not a classical herb in TCM, but its bark is interpreted as mildly cooling and moistening to the Lung system. In integrative herbal practice it may be used to soothe dry coughs or throat irritation.';

SET @body = '<p>Black cherry (<em>Prunus serotina</em>) is one of the most recognizable native trees of eastern North America. Rising tall and straight, it develops a dark, flaky bark that becomes deeply ridged with age. In spring, the tree produces long, graceful clusters of small white flowers that fill woodland edges with delicate fragrance and attract a variety of pollinating insects.</p><p>As summer progresses, these flowers mature into small dark purple cherries. The fruit is enjoyed by birds, mammals, and people alike, though its flavor is tart when fresh. Wildlife depend heavily on the tree for both food and shelter, making black cherry an important component of many forest ecosystems.</p><p>The bark of black cherry has a long history of medicinal use. Herbalists value it as a gentle respiratory tonic that helps calm coughs and soothe irritated lungs. Traditionally prepared as a syrup or decoction, it became a well-known ingredient in classic cough remedies. With its tall form, ecological importance, and rich cultural history, black cherry remains a familiar and valued tree across much of its native range.</p>';

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
INSERT IGNORE INTO trees_eco_benefits (tree_id, eco_benefit_id) SELECT @tree_id, id FROM eco_benefits WHERE @eco_cnt = 0 AND (LOWER(name) LIKE '%attracts%wildlife%' OR LOWER(name) LIKE '%wildlife%') LIMIT 1;
INSERT IGNORE INTO trees_eco_benefits (tree_id, eco_benefit_id) SELECT @tree_id, id FROM eco_benefits WHERE @eco_cnt = 0 AND (LOWER(name) LIKE '%edible%fruit%' OR LOWER(name) LIKE '%edible fruit%' OR LOWER(name) LIKE '%edible%part%') LIMIT 1;
INSERT IGNORE INTO trees_eco_benefits (tree_id, eco_benefit_id) SELECT @tree_id, id FROM eco_benefits WHERE @eco_cnt = 0 AND (LOWER(name) LIKE '%pollinator%') LIMIT 1;

INSERT IGNORE INTO trees_native_to (tree_id, native_to_id) SELECT @tree_id, id FROM native_to WHERE @native_cnt = 0 AND (LOWER(name) LIKE '%eastern%north%america%' OR LOWER(name) LIKE '%eastern north america%') LIMIT 1;
INSERT IGNORE INTO trees_native_to (tree_id, native_to_id) SELECT @tree_id, id FROM native_to WHERE @native_cnt = 0 AND (LOWER(name) LIKE '%western%north%america%' OR LOWER(name) LIKE '%western north america%') LIMIT 1;

INSERT IGNORE INTO trees_natural_habitat (tree_id, natural_habitat_id) SELECT @tree_id, id FROM natural_habitat WHERE @habitat_cnt = 0 AND (LOWER(name) LIKE '%forest%edge%' OR LOWER(name) LIKE '%forest edge%') LIMIT 1;
INSERT IGNORE INTO trees_natural_habitat (tree_id, natural_habitat_id) SELECT @tree_id, id FROM natural_habitat WHERE @habitat_cnt = 0 AND (LOWER(name) LIKE '%open%wood%' OR LOWER(name) LIKE '%open wood%') LIMIT 1;
INSERT IGNORE INTO trees_natural_habitat (tree_id, natural_habitat_id) SELECT @tree_id, id FROM natural_habitat WHERE @habitat_cnt = 0 AND (LOWER(name) LIKE '%hillside%' OR LOWER(name) LIKE '%upland%') LIMIT 1;

INSERT IGNORE INTO trees_shapes (tree_id, shape_id) SELECT @tree_id, id FROM shapes WHERE @shapes_cnt = 0 AND (LOWER(name) LIKE '%single%trunk%' OR LOWER(name) LIKE '%single trunk%') LIMIT 1;
INSERT IGNORE INTO trees_shapes (tree_id, shape_id) SELECT @tree_id, id FROM shapes WHERE @shapes_cnt = 0 AND LOWER(name) LIKE '%upright%' LIMIT 1;
INSERT IGNORE INTO trees_shapes (tree_id, shape_id) SELECT @tree_id, id FROM shapes WHERE @shapes_cnt = 0 AND (LOWER(name) LIKE '%spread%' OR LOWER(name) LIKE '%spreading%') LIMIT 1;

INSERT IGNORE INTO trees_light (tree_id, light_id) SELECT @tree_id, id FROM light WHERE @light_cnt = 0 AND (LOWER(name) LIKE '%full%sun%' OR LOWER(name) LIKE '%full sun%') LIMIT 1;
INSERT IGNORE INTO trees_light (tree_id, light_id) SELECT @tree_id, id FROM light WHERE @light_cnt = 0 AND (LOWER(name) LIKE '%partial%shade%' OR LOWER(name) LIKE '%partial shade%') LIMIT 1;

INSERT IGNORE INTO trees_soil (tree_id, soil_id) SELECT @tree_id, id FROM soil WHERE @soil_cnt = 0 AND (LOWER(name) LIKE '%well%drain%' OR LOWER(name) LIKE '%drained%') LIMIT 1;
INSERT IGNORE INTO trees_soil (tree_id, soil_id) SELECT @tree_id, id FROM soil WHERE @soil_cnt = 0 AND (LOWER(name) LIKE '%loam%') LIMIT 1;
INSERT IGNORE INTO trees_soil (tree_id, soil_id) SELECT @tree_id, id FROM soil WHERE @soil_cnt = 0 AND (LOWER(name) LIKE '%adapt%' OR LOWER(name) LIKE '%adaptable%') LIMIT 1;

INSERT IGNORE INTO trees_common_uses (tree_id, common_use_id) SELECT @tree_id, id FROM common_uses WHERE @uses_cnt = 0 AND (LOWER(name) LIKE '%wildlife%' OR LOWER(name) LIKE '%naturalized%') LIMIT 1;
INSERT IGNORE INTO trees_common_uses (tree_id, common_use_id) SELECT @tree_id, id FROM common_uses WHERE @uses_cnt = 0 AND (LOWER(name) LIKE '%shade%' OR LOWER(name) LIKE '%shade tree%') LIMIT 1;

INSERT IGNORE INTO trees_unique_attractions (tree_id, unique_attraction_id) SELECT @tree_id, id FROM unique_attractions WHERE @attract_cnt = 0 AND LOWER(name) LIKE '%flower%' LIMIT 1;
INSERT IGNORE INTO trees_unique_attractions (tree_id, unique_attraction_id) SELECT @tree_id, id FROM unique_attractions WHERE @attract_cnt = 0 AND LOWER(name) LIKE '%fruit%' LIMIT 1;
INSERT IGNORE INTO trees_unique_attractions (tree_id, unique_attraction_id) SELECT @tree_id, id FROM unique_attractions WHERE @attract_cnt = 0 AND (LOWER(name) LIKE '%bark%') LIMIT 1;

INSERT IGNORE INTO plants_tastes (tree_id, taste_id) SELECT @tree_id, id FROM tastes WHERE @tastes_cnt = 0 AND LOWER(name) LIKE '%bitter%' LIMIT 1;
INSERT IGNORE INTO plants_tastes (tree_id, taste_id) SELECT @tree_id, id FROM tastes WHERE @tastes_cnt = 0 AND LOWER(name) LIKE '%sweet%' LIMIT 1;

INSERT IGNORE INTO plants_organ_systems (tree_id, organ_system_id) SELECT @tree_id, id FROM organ_systems WHERE @organ_cnt = 0 AND (LOWER(name) LIKE '%respiratory%' OR LOWER(name) LIKE '%lung%') LIMIT 1;
INSERT IGNORE INTO plants_organ_systems (tree_id, organ_system_id) SELECT @tree_id, id FROM organ_systems WHERE @organ_cnt = 0 AND LOWER(name) LIKE '%digestive%' LIMIT 1;

INSERT IGNORE INTO plants_thermal_nature (tree_id, thermal_nature_id) SELECT @tree_id, id FROM thermal_nature WHERE @thermal_cnt = 0 AND LOWER(name) LIKE '%cool%' LIMIT 1;
INSERT IGNORE INTO plants_moisture (tree_id, moisture_id) SELECT @tree_id, id FROM moisture WHERE @moist_cnt = 0 AND (LOWER(name) LIKE '%moisten%' OR LOWER(name) LIKE '%moistening%') LIMIT 1;

INSERT IGNORE INTO plants_parts_used (tree_id, parts_used_id) SELECT @tree_id, id FROM parts_used WHERE @parts_cnt = 0 AND (LOWER(name) LIKE '%bark%') LIMIT 1;
INSERT IGNORE INTO plants_parts_used (tree_id, parts_used_id) SELECT @tree_id, id FROM parts_used WHERE @parts_cnt = 0 AND LOWER(name) LIKE '%fruit%' LIMIT 1;

INSERT IGNORE INTO plants_preparations (tree_id, preparation_id) SELECT @tree_id, id FROM preparations WHERE @prep_cnt = 0 AND (LOWER(name) LIKE '%tea%' OR LOWER(name) LIKE '%infusion%') LIMIT 1;
INSERT IGNORE INTO plants_preparations (tree_id, preparation_id) SELECT @tree_id, id FROM preparations WHERE @prep_cnt = 0 AND LOWER(name) LIKE '%decoction%' LIMIT 1;
INSERT IGNORE INTO plants_preparations (tree_id, preparation_id) SELECT @tree_id, id FROM preparations WHERE @prep_cnt = 0 AND LOWER(name) LIKE '%syrup%' LIMIT 1;
INSERT IGNORE INTO plants_preparations (tree_id, preparation_id) SELECT @tree_id, id FROM preparations WHERE @prep_cnt = 0 AND LOWER(name) LIKE '%tincture%' LIMIT 1;

INSERT IGNORE INTO plants_organs_and_tissue (tree_id, organ_and_tissue_id) SELECT @tree_id, id FROM organs_and_tissue WHERE @organs_tissue_cnt = 0 AND (LOWER(name) LIKE '%lung%' OR LOWER(name) LIKE '%lungs%') LIMIT 1;
INSERT IGNORE INTO plants_organs_and_tissue (tree_id, organ_and_tissue_id) SELECT @tree_id, id FROM organs_and_tissue WHERE @organs_tissue_cnt = 0 AND (LOWER(name) LIKE '%throat%') LIMIT 1;

-- =============================================================================
-- PLANT 3: CHOKE CHERRY (Prunus virginiana)
-- =============================================================================

SET @slug = 'choke-cherry';
SET @existing_tree_id = (SELECT id FROM trees WHERE slug = @slug LIMIT 1);
SET @family_name = 'Rosaceae';
SET @genus_name = 'Prunus';
SET @common_name = 'Choke cherry';
SET @other_common_names = 'Virginia bird cherry, western chokecherry';
SET @specific_epithet = 'virginiana';
SET @other_species = NULL;
SET @medicinal_species = 'Prunus virginiana';
SET @zone_id = (SELECT id FROM zones WHERE name LIKE '%2%' OR name = '2' OR id = 2 ORDER BY id LIMIT 1);
SET @height_min = 6;
SET @height_max = 20;
SET @width_min = 6;
SET @width_max = 15;
SET @growth_rate = 'fast';
SET @lifespan_min = 30;
SET @lifespan_max = 80;
SET @reproduction_type_id = NULL;
SET @dormancy_treatment_id = @dormancy_cold_moist;
SET @growing_instructions = 'Choke cherry grows readily in a wide range of soils and climates. It prefers full sun but tolerates partial shade and establishes quickly from seed or suckering roots. Regular pruning can help maintain shape when used as a hedge or landscape shrub. Once established, the plant is drought tolerant and resilient.';
SET @special_chemistry = NULL;
SET @signature = NULL;
SET @precautions = 'Seeds and leaves contain cyanogenic compounds and should not be consumed raw. Only properly prepared fruit and bark should be used medicinally.';
SET @combinations = 'Often used with elderberry, hawthorn, or wild rose hips in syrups and preserves. Respiratory formulas may combine choke cherry bark with mullein or licorice root.';
SET @folk_use = 'Choke cherries were widely used by Indigenous peoples across North America as both food and medicine. The fruits were dried, cooked, or combined with meat to produce traditional pemmican. Medicinally, bark teas were prepared for coughs and digestive discomfort, while fruit syrups were used as mild tonics.';
SET @chinese_medicine = 'Not a classical TCM herb, but its astringent fruit is interpreted as cooling and supportive to digestive and respiratory systems in integrative herbal practice.';

SET @body = '<p>Choke cherry (<em>Prunus virginiana</em>) is a hardy shrub or small tree found across much of North America, thriving along riverbanks, forest edges, and open plains. In spring, clusters of fragrant white flowers appear along slender branches, drawing bees and other pollinators to the landscape. These blossoms give way to small round berries that ripen from red to deep purple or nearly black by late summer.</p><p>Although the fruit is quite astringent when eaten fresh, it becomes pleasantly tart and flavorful when cooked. For generations, people have used choke cherries to make syrups, jams, and traditional foods. Wildlife also rely heavily on the fruit, with birds and mammals eagerly feeding on the berries as they ripen.</p><p>The plant spreads readily through suckers, often forming dense thickets that provide shelter for birds and small animals. Its adaptability and resilience allow it to grow in a wide variety of climates and soils. With showy spring flowers, useful fruit, and ecological importance, choke cherry remains an enduring and valuable component of natural landscapes.</p>';

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

SET @trees_category_id = (SELECT id FROM trees_category WHERE (LOWER(name) LIKE '%shrub%' OR LOWER(name) LIKE '%small%tree%') LIMIT 1);
INSERT INTO trees_categories (tree_id, trees_category_id) SELECT @tree_id, @trees_category_id FROM DUAL WHERE @tree_id IS NOT NULL AND @trees_category_id IS NOT NULL AND (SELECT COUNT(*) FROM trees_categories WHERE tree_id = @tree_id AND trees_category_id = @trees_category_id) = 0;

INSERT IGNORE INTO trees_eco_benefits (tree_id, eco_benefit_id) SELECT @tree_id, id FROM eco_benefits WHERE @eco_cnt = 0 AND LOWER(name) LIKE '%medicinal%' LIMIT 1;
INSERT IGNORE INTO trees_eco_benefits (tree_id, eco_benefit_id) SELECT @tree_id, id FROM eco_benefits WHERE @eco_cnt = 0 AND (LOWER(name) LIKE '%attracts%wildlife%' OR LOWER(name) LIKE '%wildlife%') LIMIT 1;
INSERT IGNORE INTO trees_eco_benefits (tree_id, eco_benefit_id) SELECT @tree_id, id FROM eco_benefits WHERE @eco_cnt = 0 AND (LOWER(name) LIKE '%edible%fruit%' OR LOWER(name) LIKE '%edible fruit%' OR LOWER(name) LIKE '%edible%part%') LIMIT 1;
INSERT IGNORE INTO trees_eco_benefits (tree_id, eco_benefit_id) SELECT @tree_id, id FROM eco_benefits WHERE @eco_cnt = 0 AND (LOWER(name) LIKE '%pollinator%') LIMIT 1;

INSERT IGNORE INTO trees_native_to (tree_id, native_to_id) SELECT @tree_id, id FROM native_to WHERE @native_cnt = 0 AND (LOWER(name) LIKE '%eastern%north%america%' OR LOWER(name) LIKE '%eastern north america%') LIMIT 1;
INSERT IGNORE INTO trees_native_to (tree_id, native_to_id) SELECT @tree_id, id FROM native_to WHERE @native_cnt = 0 AND (LOWER(name) LIKE '%western%north%america%' OR LOWER(name) LIKE '%western north america%') LIMIT 1;

INSERT IGNORE INTO trees_natural_habitat (tree_id, natural_habitat_id) SELECT @tree_id, id FROM natural_habitat WHERE @habitat_cnt = 0 AND (LOWER(name) LIKE '%forest%edge%' OR LOWER(name) LIKE '%forest edge%') LIMIT 1;
INSERT IGNORE INTO trees_natural_habitat (tree_id, natural_habitat_id) SELECT @tree_id, id FROM natural_habitat WHERE @habitat_cnt = 0 AND (LOWER(name) LIKE '%river%' OR LOWER(name) LIKE '%riparian%') LIMIT 1;
INSERT IGNORE INTO trees_natural_habitat (tree_id, natural_habitat_id) SELECT @tree_id, id FROM natural_habitat WHERE @habitat_cnt = 0 AND (LOWER(name) LIKE '%prairie%') LIMIT 1;
INSERT IGNORE INTO trees_natural_habitat (tree_id, natural_habitat_id) SELECT @tree_id, id FROM natural_habitat WHERE @habitat_cnt = 0 AND (LOWER(name) LIKE '%hillside%' OR LOWER(name) LIKE '%upland%') LIMIT 1;

INSERT IGNORE INTO trees_shapes (tree_id, shape_id) SELECT @tree_id, id FROM shapes WHERE @shapes_cnt = 0 AND (LOWER(name) LIKE '%multi%stem%' OR LOWER(name) LIKE '%multistem%') LIMIT 1;
INSERT IGNORE INTO trees_shapes (tree_id, shape_id) SELECT @tree_id, id FROM shapes WHERE @shapes_cnt = 0 AND (LOWER(name) LIKE '%small%tree%' OR LOWER(name) LIKE '%small tree%') LIMIT 1;

INSERT IGNORE INTO trees_light (tree_id, light_id) SELECT @tree_id, id FROM light WHERE @light_cnt = 0 AND (LOWER(name) LIKE '%full%sun%' OR LOWER(name) LIKE '%full sun%') LIMIT 1;
INSERT IGNORE INTO trees_light (tree_id, light_id) SELECT @tree_id, id FROM light WHERE @light_cnt = 0 AND (LOWER(name) LIKE '%partial%shade%' OR LOWER(name) LIKE '%partial shade%') LIMIT 1;

INSERT IGNORE INTO trees_soil (tree_id, soil_id) SELECT @tree_id, id FROM soil WHERE @soil_cnt = 0 AND (LOWER(name) LIKE '%adapt%' OR LOWER(name) LIKE '%adaptable%') LIMIT 1;
INSERT IGNORE INTO trees_soil (tree_id, soil_id) SELECT @tree_id, id FROM soil WHERE @soil_cnt = 0 AND (LOWER(name) LIKE '%well%drain%' OR LOWER(name) LIKE '%drained%') LIMIT 1;
INSERT IGNORE INTO trees_soil (tree_id, soil_id) SELECT @tree_id, id FROM soil WHERE @soil_cnt = 0 AND (LOWER(name) LIKE '%clay%') LIMIT 1;

INSERT IGNORE INTO trees_common_uses (tree_id, common_use_id) SELECT @tree_id, id FROM common_uses WHERE @uses_cnt = 0 AND LOWER(name) LIKE '%hedge%' LIMIT 1;
INSERT IGNORE INTO trees_common_uses (tree_id, common_use_id) SELECT @tree_id, id FROM common_uses WHERE @uses_cnt = 0 AND (LOWER(name) LIKE '%wildlife%' OR LOWER(name) LIKE '%naturalized%') LIMIT 1;
INSERT IGNORE INTO trees_common_uses (tree_id, common_use_id) SELECT @tree_id, id FROM common_uses WHERE @uses_cnt = 0 AND (LOWER(name) LIKE '%edible%' OR LOWER(name) LIKE '%edible landscape%') LIMIT 1;

INSERT IGNORE INTO trees_unique_attractions (tree_id, unique_attraction_id) SELECT @tree_id, id FROM unique_attractions WHERE @attract_cnt = 0 AND LOWER(name) LIKE '%flower%' LIMIT 1;
INSERT IGNORE INTO trees_unique_attractions (tree_id, unique_attraction_id) SELECT @tree_id, id FROM unique_attractions WHERE @attract_cnt = 0 AND LOWER(name) LIKE '%fruit%' LIMIT 1;

INSERT IGNORE INTO plants_tastes (tree_id, taste_id) SELECT @tree_id, id FROM tastes WHERE @tastes_cnt = 0 AND LOWER(name) LIKE '%astringent%' LIMIT 1;
INSERT IGNORE INTO plants_tastes (tree_id, taste_id) SELECT @tree_id, id FROM tastes WHERE @tastes_cnt = 0 AND LOWER(name) LIKE '%bitter%' LIMIT 1;

INSERT IGNORE INTO plants_organ_systems (tree_id, organ_system_id) SELECT @tree_id, id FROM organ_systems WHERE @organ_cnt = 0 AND LOWER(name) LIKE '%digestive%' LIMIT 1;
INSERT IGNORE INTO plants_organ_systems (tree_id, organ_system_id) SELECT @tree_id, id FROM organ_systems WHERE @organ_cnt = 0 AND (LOWER(name) LIKE '%respiratory%' OR LOWER(name) LIKE '%lung%') LIMIT 1;

INSERT IGNORE INTO plants_thermal_nature (tree_id, thermal_nature_id) SELECT @tree_id, id FROM thermal_nature WHERE @thermal_cnt = 0 AND LOWER(name) LIKE '%cool%' LIMIT 1;
INSERT IGNORE INTO plants_moisture (tree_id, moisture_id) SELECT @tree_id, id FROM moisture WHERE @moist_cnt = 0 AND (LOWER(name) LIKE '%dry%' OR LOWER(name) LIKE '%drying%') LIMIT 1;

INSERT IGNORE INTO plants_parts_used (tree_id, parts_used_id) SELECT @tree_id, id FROM parts_used WHERE @parts_cnt = 0 AND LOWER(name) LIKE '%fruit%' LIMIT 1;
INSERT IGNORE INTO plants_parts_used (tree_id, parts_used_id) SELECT @tree_id, id FROM parts_used WHERE @parts_cnt = 0 AND (LOWER(name) LIKE '%bark%') LIMIT 1;

INSERT IGNORE INTO plants_preparations (tree_id, preparation_id) SELECT @tree_id, id FROM preparations WHERE @prep_cnt = 0 AND (LOWER(name) LIKE '%tea%' OR LOWER(name) LIKE '%infusion%') LIMIT 1;
INSERT IGNORE INTO plants_preparations (tree_id, preparation_id) SELECT @tree_id, id FROM preparations WHERE @prep_cnt = 0 AND LOWER(name) LIKE '%syrup%' LIMIT 1;
INSERT IGNORE INTO plants_preparations (tree_id, preparation_id) SELECT @tree_id, id FROM preparations WHERE @prep_cnt = 0 AND (LOWER(name) LIKE '%jam%') LIMIT 1;
INSERT IGNORE INTO plants_preparations (tree_id, preparation_id) SELECT @tree_id, id FROM preparations WHERE @prep_cnt = 0 AND LOWER(name) LIKE '%decoction%' LIMIT 1;

INSERT IGNORE INTO plants_organs_and_tissue (tree_id, organ_and_tissue_id) SELECT @tree_id, id FROM organs_and_tissue WHERE @organs_tissue_cnt = 0 AND (LOWER(name) LIKE '%lung%' OR LOWER(name) LIKE '%lungs%') LIMIT 1;
INSERT IGNORE INTO plants_organs_and_tissue (tree_id, organ_and_tissue_id) SELECT @tree_id, id FROM organs_and_tissue WHERE @organs_tissue_cnt = 0 AND LOWER(name) LIKE '%stomach%' LIMIT 1;

-- -----------------------------------------------------------------------------
-- DONE. Verify with:
-- SELECT id, common_name, slug FROM trees WHERE slug IN ('schisandra','black-cherry','choke-cherry');
-- -----------------------------------------------------------------------------
