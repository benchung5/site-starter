-- =============================================================================
-- CREATE OR UPDATE PLANTS: AMERICAN GINSENG, SIBERIAN GINSENG, ST. JOHN'S WORT
-- =============================================================================
-- Merge only if existing plant has same slug; otherwise create new.
-- Fills only fields that are NULL/empty. Body: replace if empty only (no append).
-- Join tables: add associations only if plant has none.
-- Use ASCII hyphens only (no Unicode) for database compatibility.
-- =============================================================================

SET @mode_id_live = (SELECT id FROM mode WHERE name = 'live' LIMIT 1);
SET @mode_id_live = COALESCE(@mode_id_live, (SELECT id FROM mode ORDER BY id DESC LIMIT 1));
SET @dormancy_cold_moist = (SELECT id FROM dormancy_treatments WHERE LOWER(name) LIKE '%cold%moist%stratification%' OR LOWER(name) LIKE '%cold moist%' LIMIT 1);
SET @dormancy_warm_then_cold = (SELECT id FROM dormancy_treatments WHERE LOWER(name) LIKE '%warm%' AND LOWER(name) LIKE '%cold%' LIMIT 1);

-- =============================================================================
-- PLANT 1: AMERICAN GINSENG (Panax quinquefolius)
-- =============================================================================

SET @slug = 'american-ginseng';
SET @existing_tree_id = (SELECT id FROM trees WHERE slug = @slug LIMIT 1);
SET @family_name = 'Araliaceae';
SET @genus_name = 'Panax';
SET @common_name = 'American ginseng';
SET @other_common_names = 'North American ginseng';
SET @specific_epithet = 'quinquefolius';
SET @other_species = NULL;
SET @medicinal_species = 'Panax quinquefolius';
SET @zone_id = (SELECT id FROM zones WHERE name LIKE '%3%' OR name = '3' OR id = 3 ORDER BY id LIMIT 1);
SET @height_min = 0.5;
SET @height_max = 2;
SET @width_min = 0.5;
SET @width_max = 1.5;
SET @growth_rate = 'slow';
SET @lifespan_min = 20;
SET @lifespan_max = 50;
SET @reproduction_type_id = NULL;
SET @dormancy_treatment_id = COALESCE(@dormancy_warm_then_cold, @dormancy_cold_moist);
SET @growing_instructions = 'American ginseng thrives in rich forest soil with abundant organic matter and consistent moisture. It prefers deep shade under mature hardwood forests where leaf litter maintains cool soil conditions. Seeds require a long stratification period and often take up to 18 months to germinate. Plants grow slowly and may take several years to develop mature roots suitable for harvest. Maintaining a natural woodland environment with minimal disturbance helps ensure healthy growth and longevity.';
SET @special_chemistry = NULL;
SET @signature = NULL;
SET @precautions = 'Avoid excessive use during acute infections with fever. Use cautiously with stimulant medications or blood pressure disorders. Pregnant individuals should consult a practitioner before use.';
SET @combinations = 'Often combined with astragalus, licorice root, or schisandra for immune and energy support. For stress formulas, American ginseng may be paired with reishi mushroom or rhodiola.';
SET @folk_use = 'American ginseng has long been valued by Indigenous peoples and early settlers as a strengthening tonic. Root preparations were traditionally used to improve energy, support immunity, and aid recovery after illness. Decoctions or powdered root were also used to reduce fatigue, soothe coughs, and promote overall vitality.';
SET @chinese_medicine = 'In Traditional Chinese Medicine, American ginseng is considered cooling and nourishing to Yin. It is used to support the Lung and Spleen systems, replenish Qi, and calm internal heat caused by stress or illness. It is often used for fatigue, dryness, and weakened immune function.';

SET @body = '<p>American ginseng (<em>Panax quinquefolius</em>) is a small woodland herb native to the deciduous forests of eastern North America. It grows slowly beneath the canopy of mature hardwood trees, where filtered light and rich forest soil provide the conditions it needs to thrive. The plant produces a slender stem topped with a whorl of five leaflets, giving rise to its species name <em>quinquefolius</em>, meaning "five leaves."</p><p>During summer, small greenish flowers appear at the center of the leaf cluster. These develop into bright red berries that stand out against the forest floor in late season. Beneath the soil lies the plant''s prized root, which has been harvested for centuries for its medicinal value.</p><p>American ginseng is renowned as a gentle tonic herb that supports vitality and resilience. Traditionally gathered from wild forests, it has played an important role in both North American and Asian herbal traditions. Because of its slow growth and high demand, the plant is now often cultivated in woodland gardens and forest farms. Its understated appearance belies its long cultural history and enduring reputation as one of the most valuable medicinal plants of the forest understory.</p>';

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

SET @trees_category_id = (SELECT id FROM trees_category WHERE LOWER(name) LIKE '%herbaceous%' OR LOWER(slug) LIKE '%herbaceous%' LIMIT 1);
INSERT INTO trees_categories (tree_id, trees_category_id) SELECT @tree_id, @trees_category_id FROM DUAL WHERE @tree_id IS NOT NULL AND @trees_category_id IS NOT NULL AND (SELECT COUNT(*) FROM trees_categories WHERE tree_id = @tree_id AND trees_category_id = @trees_category_id) = 0;

INSERT IGNORE INTO trees_eco_benefits (tree_id, eco_benefit_id) SELECT @tree_id, id FROM eco_benefits WHERE @eco_cnt = 0 AND LOWER(name) LIKE '%medicinal%' LIMIT 1;
INSERT IGNORE INTO trees_eco_benefits (tree_id, eco_benefit_id) SELECT @tree_id, id FROM eco_benefits WHERE @eco_cnt = 0 AND (LOWER(name) LIKE '%attracts%pollinator%' OR LOWER(name) LIKE '%pollinator%') LIMIT 1;

INSERT IGNORE INTO trees_native_to (tree_id, native_to_id) SELECT @tree_id, id FROM native_to WHERE @native_cnt = 0 AND (LOWER(name) LIKE '%eastern%north%america%' OR LOWER(name) LIKE '%eastern north america%') LIMIT 1;

INSERT IGNORE INTO trees_natural_habitat (tree_id, natural_habitat_id) SELECT @tree_id, id FROM natural_habitat WHERE @habitat_cnt = 0 AND (LOWER(name) LIKE '%inner%forest%' OR LOWER(name) LIKE '%forest%') LIMIT 1;
INSERT IGNORE INTO trees_natural_habitat (tree_id, natural_habitat_id) SELECT @tree_id, id FROM natural_habitat WHERE @habitat_cnt = 0 AND (LOWER(name) LIKE '%mountain%') LIMIT 1;
INSERT IGNORE INTO trees_natural_habitat (tree_id, natural_habitat_id) SELECT @tree_id, id FROM natural_habitat WHERE @habitat_cnt = 0 AND (LOWER(name) LIKE '%shade%' OR LOWER(name) LIKE '%slope%') LIMIT 1;

INSERT IGNORE INTO trees_shapes (tree_id, shape_id) SELECT @tree_id, id FROM shapes WHERE @shapes_cnt = 0 AND LOWER(name) LIKE '%upright%' LIMIT 1;
INSERT IGNORE INTO trees_shapes (tree_id, shape_id) SELECT @tree_id, id FROM shapes WHERE @shapes_cnt = 0 AND (LOWER(name) LIKE '%clump%' OR LOWER(name) LIKE '%clumping%') LIMIT 1;

INSERT IGNORE INTO trees_light (tree_id, light_id) SELECT @tree_id, id FROM light WHERE @light_cnt = 0 AND (LOWER(name) LIKE '%partial%shade%' OR LOWER(name) LIKE '%partial shade%') LIMIT 1;
INSERT IGNORE INTO trees_light (tree_id, light_id) SELECT @tree_id, id FROM light WHERE @light_cnt = 0 AND (LOWER(name) LIKE '%full%shade%' OR LOWER(name) LIKE '%full shade%') LIMIT 1;

INSERT IGNORE INTO trees_soil (tree_id, soil_id) SELECT @tree_id, id FROM soil WHERE @soil_cnt = 0 AND (LOWER(name) LIKE '%moist%' OR LOWER(name) LIKE '%fertile%') LIMIT 1;
INSERT IGNORE INTO trees_soil (tree_id, soil_id) SELECT @tree_id, id FROM soil WHERE @soil_cnt = 0 AND (LOWER(name) LIKE '%well%drain%' OR LOWER(name) LIKE '%drained%') LIMIT 1;
INSERT IGNORE INTO trees_soil (tree_id, soil_id) SELECT @tree_id, id FROM soil WHERE @soil_cnt = 0 AND (LOWER(name) LIKE '%rich%' OR LOWER(name) LIKE '%woodland%') LIMIT 1;

INSERT IGNORE INTO trees_common_uses (tree_id, common_use_id) SELECT @tree_id, id FROM common_uses WHERE @uses_cnt = 0 AND (LOWER(name) LIKE '%medicinal%garden%' OR LOWER(name) LIKE '%medicinal garden%') LIMIT 1;
INSERT IGNORE INTO trees_common_uses (tree_id, common_use_id) SELECT @tree_id, id FROM common_uses WHERE @uses_cnt = 0 AND (LOWER(name) LIKE '%woodland%garden%' OR LOWER(name) LIKE '%woodland garden%') LIMIT 1;
INSERT IGNORE INTO trees_common_uses (tree_id, common_use_id) SELECT @tree_id, id FROM common_uses WHERE @uses_cnt = 0 AND (LOWER(name) LIKE '%naturalized%' OR LOWER(name) LIKE '%natural%') LIMIT 1;

INSERT IGNORE INTO trees_transplanting (tree_id, transplanting_id) SELECT @tree_id, id FROM transplanting WHERE @trans_cnt = 0 AND (LOWER(name) LIKE '%difficult%' OR LOWER(name) LIKE '%challenging%') LIMIT 1;

INSERT IGNORE INTO trees_unique_attractions (tree_id, unique_attraction_id) SELECT @tree_id, id FROM unique_attractions WHERE @attract_cnt = 0 AND (LOWER(name) LIKE '%berr%' OR LOWER(name) LIKE '%berry%') LIMIT 1;
INSERT IGNORE INTO trees_unique_attractions (tree_id, unique_attraction_id) SELECT @tree_id, id FROM unique_attractions WHERE @attract_cnt = 0 AND (LOWER(name) LIKE '%leaf%' OR LOWER(name) LIKE '%leaves%') LIMIT 1;
INSERT IGNORE INTO trees_unique_attractions (tree_id, unique_attraction_id) SELECT @tree_id, id FROM unique_attractions WHERE @attract_cnt = 0 AND (LOWER(name) LIKE '%root%' OR LOWER(name) LIKE '%roots%') LIMIT 1;

INSERT IGNORE INTO trees_tolerances (tree_id, tolerance_id) SELECT @tree_id, id FROM tolerances WHERE @toler_cnt = 0 AND (LOWER(name) LIKE '%shade%' OR LOWER(name) LIKE '%shade tolerant%') LIMIT 1;

INSERT IGNORE INTO plants_tastes (tree_id, taste_id) SELECT @tree_id, id FROM tastes WHERE @tastes_cnt = 0 AND LOWER(name) LIKE '%bitter%' LIMIT 1;
INSERT IGNORE INTO plants_tastes (tree_id, taste_id) SELECT @tree_id, id FROM tastes WHERE @tastes_cnt = 0 AND LOWER(name) LIKE '%sweet%' LIMIT 1;

INSERT IGNORE INTO plants_organ_systems (tree_id, organ_system_id) SELECT @tree_id, id FROM organ_systems WHERE @organ_cnt = 0 AND (LOWER(name) LIKE '%immune%' OR LOWER(name) LIKE '%lymphatic%') LIMIT 1;
INSERT IGNORE INTO plants_organ_systems (tree_id, organ_system_id) SELECT @tree_id, id FROM organ_systems WHERE @organ_cnt = 0 AND (LOWER(name) LIKE '%nervous%' OR LOWER(name) LIKE '%nervous system%') LIMIT 1;
INSERT IGNORE INTO plants_organ_systems (tree_id, organ_system_id) SELECT @tree_id, id FROM organ_systems WHERE @organ_cnt = 0 AND (LOWER(name) LIKE '%endocrine%') LIMIT 1;
INSERT IGNORE INTO plants_organ_systems (tree_id, organ_system_id) SELECT @tree_id, id FROM organ_systems WHERE @organ_cnt = 0 AND (LOWER(name) LIKE '%respiratory%' OR LOWER(name) LIKE '%lung%') LIMIT 1;

INSERT IGNORE INTO plants_thermal_nature (tree_id, thermal_nature_id) SELECT @tree_id, id FROM thermal_nature WHERE @thermal_cnt = 0 AND LOWER(name) LIKE '%cool%' LIMIT 1;
INSERT IGNORE INTO plants_moisture (tree_id, moisture_id) SELECT @tree_id, id FROM moisture WHERE @moist_cnt = 0 AND (LOWER(name) LIKE '%moisten%' OR LOWER(name) LIKE '%moistening%') LIMIT 1;

INSERT IGNORE INTO plants_parts_used (tree_id, parts_used_id) SELECT @tree_id, id FROM parts_used WHERE @parts_cnt = 0 AND (LOWER(name) LIKE '%root%' OR LOWER(name) LIKE '%roots%') LIMIT 1;

INSERT IGNORE INTO plants_preparations (tree_id, preparation_id) SELECT @tree_id, id FROM preparations WHERE @prep_cnt = 0 AND (LOWER(name) LIKE '%tea%' OR LOWER(name) LIKE '%infusion%') LIMIT 1;
INSERT IGNORE INTO plants_preparations (tree_id, preparation_id) SELECT @tree_id, id FROM preparations WHERE @prep_cnt = 0 AND LOWER(name) LIKE '%decoction%' LIMIT 1;
INSERT IGNORE INTO plants_preparations (tree_id, preparation_id) SELECT @tree_id, id FROM preparations WHERE @prep_cnt = 0 AND LOWER(name) LIKE '%tincture%' LIMIT 1;
INSERT IGNORE INTO plants_preparations (tree_id, preparation_id) SELECT @tree_id, id FROM preparations WHERE @prep_cnt = 0 AND LOWER(name) LIKE '%powder%' LIMIT 1;

INSERT IGNORE INTO plants_organs_and_tissue (tree_id, organ_and_tissue_id) SELECT @tree_id, id FROM organs_and_tissue WHERE @organs_tissue_cnt = 0 AND (LOWER(name) LIKE '%lung%' OR LOWER(name) LIKE '%lungs%') LIMIT 1;
INSERT IGNORE INTO plants_organs_and_tissue (tree_id, organ_and_tissue_id) SELECT @tree_id, id FROM organs_and_tissue WHERE @organs_tissue_cnt = 0 AND LOWER(name) LIKE '%blood%' LIMIT 1;
INSERT IGNORE INTO plants_organs_and_tissue (tree_id, organ_and_tissue_id) SELECT @tree_id, id FROM organs_and_tissue WHERE @organs_tissue_cnt = 0 AND (LOWER(name) LIKE '%adrenal%') LIMIT 1;

-- =============================================================================
-- PLANT 2: SIBERIAN GINSENG / ELEUTHERO (Eleutherococcus senticosus)
-- =============================================================================

SET @slug = 'siberian-ginseng';
SET @existing_tree_id = (SELECT id FROM trees WHERE slug = @slug LIMIT 1);
SET @family_name = 'Araliaceae';
SET @genus_name = 'Eleutherococcus';
SET @common_name = 'Siberian ginseng';
SET @other_common_names = 'Eleuthero';
SET @specific_epithet = 'senticosus';
SET @other_species = NULL;
SET @medicinal_species = 'Eleutherococcus senticosus';
SET @zone_id = (SELECT id FROM zones WHERE name LIKE '%3%' OR name = '3' OR id = 3 ORDER BY id LIMIT 1);
SET @height_min = 6;
SET @height_max = 12;
SET @width_min = 6;
SET @width_max = 10;
SET @growth_rate = 'medium';
SET @lifespan_min = 30;
SET @lifespan_max = 70;
SET @reproduction_type_id = NULL;
SET @dormancy_treatment_id = @dormancy_cold_moist;
SET @growing_instructions = 'Eleuthero grows best in well-drained soils with moderate moisture and partial shade. It tolerates colder climates and a range of soil types. Plants may be propagated from seeds or root cuttings. Once established, shrubs are hardy and require minimal maintenance.';
SET @special_chemistry = NULL;
SET @signature = NULL;
SET @precautions = 'Generally well tolerated, but excessive doses may cause insomnia or irritability in sensitive individuals. Use cautiously in cases of high blood pressure.';
SET @combinations = 'Often combined with rhodiola, schisandra, or ginseng for adaptogenic formulas. It may also be paired with astragalus to support immune resilience.';
SET @folk_use = 'Eleuthero has been used in Russian and East Asian herbal traditions as a tonic herb that improves stamina and resilience. It was traditionally taken to combat fatigue, support endurance, and improve recovery from illness or physical exertion.';
SET @chinese_medicine = 'In Chinese herbal medicine, eleuthero is known as Ci Wu Jia. It tonifies Qi and strengthens the Spleen and Kidney systems. It is commonly used to support vitality, improve stamina, and strengthen the body during stress or chronic fatigue.';

SET @body = '<p>Eleuthero (<em>Eleutherococcus senticosus</em>), often called Siberian ginseng, is a hardy shrub native to the forests of northeastern Asia. The plant forms a dense cluster of upright stems armed with small prickles, giving it a rugged appearance in the landscape. Leaves grow in palmate clusters, while small, rounded flower heads appear in summer and develop into dark berries later in the season.</p><p>Though unrelated to true ginseng, eleuthero gained recognition for its similar tonic properties. During the twentieth century, Russian researchers studied the plant extensively for its ability to enhance endurance and resistance to stress. As a result, it became widely known as an "adaptogen," a class of herbs believed to support the body''s natural balance during physical or emotional strain.</p><p>In gardens, eleuthero thrives in cool climates and woodland edges where soil remains moderately moist. Its dense growth habit provides habitat for birds and insects, while its roots continue to be valued in herbal practice. With its resilience and long history of use, eleuthero stands as an important medicinal shrub in both traditional and modern herbal systems.</p>';

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

SET @trees_category_id = (SELECT id FROM trees_category WHERE (LOWER(name) LIKE '%shrub%' OR LOWER(name) LIKE '%woody%') LIMIT 1);
INSERT INTO trees_categories (tree_id, trees_category_id) SELECT @tree_id, @trees_category_id FROM DUAL WHERE @tree_id IS NOT NULL AND @trees_category_id IS NOT NULL AND (SELECT COUNT(*) FROM trees_categories WHERE tree_id = @tree_id AND trees_category_id = @trees_category_id) = 0;

INSERT IGNORE INTO trees_eco_benefits (tree_id, eco_benefit_id) SELECT @tree_id, id FROM eco_benefits WHERE @eco_cnt = 0 AND LOWER(name) LIKE '%medicinal%' LIMIT 1;
INSERT IGNORE INTO trees_eco_benefits (tree_id, eco_benefit_id) SELECT @tree_id, id FROM eco_benefits WHERE @eco_cnt = 0 AND (LOWER(name) LIKE '%attracts%pollinator%' OR LOWER(name) LIKE '%pollinator%') LIMIT 1;

INSERT IGNORE INTO trees_native_to (tree_id, native_to_id) SELECT @tree_id, id FROM native_to WHERE @native_cnt = 0 AND (LOWER(name) LIKE '%northeast%asia%' OR LOWER(name) LIKE '%northeast asia%' OR LOWER(name) LIKE '%asia%') LIMIT 1;

INSERT IGNORE INTO trees_natural_habitat (tree_id, natural_habitat_id) SELECT @tree_id, id FROM natural_habitat WHERE @habitat_cnt = 0 AND (LOWER(name) LIKE '%forest%edge%' OR LOWER(name) LIKE '%forest edge%') LIMIT 1;
INSERT IGNORE INTO trees_natural_habitat (tree_id, natural_habitat_id) SELECT @tree_id, id FROM natural_habitat WHERE @habitat_cnt = 0 AND (LOWER(name) LIKE '%mountain%') LIMIT 1;
INSERT IGNORE INTO trees_natural_habitat (tree_id, natural_habitat_id) SELECT @tree_id, id FROM natural_habitat WHERE @habitat_cnt = 0 AND (LOWER(name) LIKE '%mixed%wood%' OR LOWER(name) LIKE '%woodland%') LIMIT 1;

INSERT IGNORE INTO trees_shapes (tree_id, shape_id) SELECT @tree_id, id FROM shapes WHERE @shapes_cnt = 0 AND (LOWER(name) LIKE '%multi%stem%' OR LOWER(name) LIKE '%multistem%') LIMIT 1;
INSERT IGNORE INTO trees_shapes (tree_id, shape_id) SELECT @tree_id, id FROM shapes WHERE @shapes_cnt = 0 AND LOWER(name) LIKE '%upright%' LIMIT 1;

INSERT IGNORE INTO trees_light (tree_id, light_id) SELECT @tree_id, id FROM light WHERE @light_cnt = 0 AND (LOWER(name) LIKE '%full%sun%' OR LOWER(name) LIKE '%full sun%') LIMIT 1;
INSERT IGNORE INTO trees_light (tree_id, light_id) SELECT @tree_id, id FROM light WHERE @light_cnt = 0 AND (LOWER(name) LIKE '%partial%shade%' OR LOWER(name) LIKE '%partial shade%') LIMIT 1;

INSERT IGNORE INTO trees_soil (tree_id, soil_id) SELECT @tree_id, id FROM soil WHERE @soil_cnt = 0 AND (LOWER(name) LIKE '%well%drain%' OR LOWER(name) LIKE '%drained%') LIMIT 1;
INSERT IGNORE INTO trees_soil (tree_id, soil_id) SELECT @tree_id, id FROM soil WHERE @soil_cnt = 0 AND (LOWER(name) LIKE '%adapt%' OR LOWER(name) LIKE '%adaptable%') LIMIT 1;
INSERT IGNORE INTO trees_soil (tree_id, soil_id) SELECT @tree_id, id FROM soil WHERE @soil_cnt = 0 AND (LOWER(name) LIKE '%moderate%' OR LOWER(name) LIKE '%fertile%') LIMIT 1;

INSERT IGNORE INTO trees_common_uses (tree_id, common_use_id) SELECT @tree_id, id FROM common_uses WHERE @uses_cnt = 0 AND (LOWER(name) LIKE '%medicinal%garden%' OR LOWER(name) LIKE '%medicinal garden%') LIMIT 1;
INSERT IGNORE INTO trees_common_uses (tree_id, common_use_id) SELECT @tree_id, id FROM common_uses WHERE @uses_cnt = 0 AND LOWER(name) LIKE '%hedge%' LIMIT 1;
INSERT IGNORE INTO trees_common_uses (tree_id, common_use_id) SELECT @tree_id, id FROM common_uses WHERE @uses_cnt = 0 AND (LOWER(name) LIKE '%naturalized%' OR LOWER(name) LIKE '%natural%') LIMIT 1;

INSERT IGNORE INTO trees_unique_attractions (tree_id, unique_attraction_id) SELECT @tree_id, id FROM unique_attractions WHERE @attract_cnt = 0 AND (LOWER(name) LIKE '%berr%' OR LOWER(name) LIKE '%berry%') LIMIT 1;
INSERT IGNORE INTO trees_unique_attractions (tree_id, unique_attraction_id) SELECT @tree_id, id FROM unique_attractions WHERE @attract_cnt = 0 AND (LOWER(name) LIKE '%leaf%' OR LOWER(name) LIKE '%leaves%') LIMIT 1;

INSERT IGNORE INTO plants_tastes (tree_id, taste_id) SELECT @tree_id, id FROM tastes WHERE @tastes_cnt = 0 AND LOWER(name) LIKE '%bitter%' LIMIT 1;
INSERT IGNORE INTO plants_tastes (tree_id, taste_id) SELECT @tree_id, id FROM tastes WHERE @tastes_cnt = 0 AND LOWER(name) LIKE '%sweet%' LIMIT 1;

INSERT IGNORE INTO plants_organ_systems (tree_id, organ_system_id) SELECT @tree_id, id FROM organ_systems WHERE @organ_cnt = 0 AND (LOWER(name) LIKE '%nervous%' OR LOWER(name) LIKE '%nervous system%') LIMIT 1;
INSERT IGNORE INTO plants_organ_systems (tree_id, organ_system_id) SELECT @tree_id, id FROM organ_systems WHERE @organ_cnt = 0 AND (LOWER(name) LIKE '%immune%' OR LOWER(name) LIKE '%lymphatic%') LIMIT 1;
INSERT IGNORE INTO plants_organ_systems (tree_id, organ_system_id) SELECT @tree_id, id FROM organ_systems WHERE @organ_cnt = 0 AND (LOWER(name) LIKE '%endocrine%') LIMIT 1;

INSERT IGNORE INTO plants_thermal_nature (tree_id, thermal_nature_id) SELECT @tree_id, id FROM thermal_nature WHERE @thermal_cnt = 0 AND LOWER(name) LIKE '%neutral%' LIMIT 1;
INSERT IGNORE INTO plants_moisture (tree_id, moisture_id) SELECT @tree_id, id FROM moisture WHERE @moist_cnt = 0 AND (LOWER(name) LIKE '%balanc%' OR LOWER(name) LIKE '%balancing%') LIMIT 1;

INSERT IGNORE INTO plants_parts_used (tree_id, parts_used_id) SELECT @tree_id, id FROM parts_used WHERE @parts_cnt = 0 AND (LOWER(name) LIKE '%root%' OR LOWER(name) LIKE '%roots%') LIMIT 1;

INSERT IGNORE INTO plants_preparations (tree_id, preparation_id) SELECT @tree_id, id FROM preparations WHERE @prep_cnt = 0 AND LOWER(name) LIKE '%decoction%' LIMIT 1;
INSERT IGNORE INTO plants_preparations (tree_id, preparation_id) SELECT @tree_id, id FROM preparations WHERE @prep_cnt = 0 AND LOWER(name) LIKE '%tincture%' LIMIT 1;
INSERT IGNORE INTO plants_preparations (tree_id, preparation_id) SELECT @tree_id, id FROM preparations WHERE @prep_cnt = 0 AND LOWER(name) LIKE '%extract%' LIMIT 1;
INSERT IGNORE INTO plants_preparations (tree_id, preparation_id) SELECT @tree_id, id FROM preparations WHERE @prep_cnt = 0 AND LOWER(name) LIKE '%powder%' LIMIT 1;

INSERT IGNORE INTO plants_organs_and_tissue (tree_id, organ_and_tissue_id) SELECT @tree_id, id FROM organs_and_tissue WHERE @organs_tissue_cnt = 0 AND (LOWER(name) LIKE '%adrenal%') LIMIT 1;
INSERT IGNORE INTO plants_organs_and_tissue (tree_id, organ_and_tissue_id) SELECT @tree_id, id FROM organs_and_tissue WHERE @organs_tissue_cnt = 0 AND LOWER(name) LIKE '%blood%' LIMIT 1;
INSERT IGNORE INTO plants_organs_and_tissue (tree_id, organ_and_tissue_id) SELECT @tree_id, id FROM organs_and_tissue WHERE @organs_tissue_cnt = 0 AND (LOWER(name) LIKE '%nerve%' OR LOWER(name) LIKE '%nerves%') LIMIT 1;

-- =============================================================================
-- PLANT 3: ST. JOHN'S WORT (Hypericum perforatum)
-- =============================================================================

SET @slug = 'st-johns-wort';
SET @existing_tree_id = (SELECT id FROM trees WHERE slug = @slug LIMIT 1);
SET @family_name = 'Hypericaceae';
SET @genus_name = 'Hypericum';
SET @common_name = 'St. John''s wort';
SET @other_common_names = 'Common St. John''s wort';
SET @specific_epithet = 'perforatum';
SET @other_species = NULL;
SET @medicinal_species = 'Hypericum perforatum';
SET @zone_id = (SELECT id FROM zones WHERE name LIKE '%3%' OR name = '3' OR id = 3 ORDER BY id LIMIT 1);
SET @height_min = 1;
SET @height_max = 3;
SET @width_min = 1;
SET @width_max = 2;
SET @growth_rate = 'fast';
SET @lifespan_min = 5;
SET @lifespan_max = 20;
SET @reproduction_type_id = NULL;
SET @dormancy_treatment_id = @dormancy_cold_moist;
SET @growing_instructions = 'St. John''s wort grows readily in full sun and well-drained soil. It tolerates dry conditions and poor soils, making it suitable for naturalized plantings. Seeds benefit from cold stratification before germination. Once established, the plant spreads gradually and requires little maintenance.';
SET @special_chemistry = NULL;
SET @signature = NULL;
SET @precautions = 'St. John''s wort can interact with many medications by affecting liver enzyme metabolism. It may reduce effectiveness of antidepressants, birth control, and other pharmaceuticals. It can also increase photosensitivity in some individuals.';
SET @combinations = 'Often combined with lemon balm, lavender, or skullcap for mood support. Topical oils may include calendula or arnica for wound healing.';
SET @folk_use = 'St. John''s wort has been used in European herbal traditions for centuries to support emotional well-being and soothe nerve pain. Flowering tops were infused in oil to create a bright red medicinal oil used for burns, wounds, and muscle soreness.';
SET @chinese_medicine = 'While not a traditional Chinese herb, St. John''s wort is interpreted in integrative practice as supporting the Liver and Heart systems, helping regulate mood and calm the spirit.';

SET @body = '<p>St. John''s wort (<em>Hypericum perforatum</em>) is a bright flowering herb that thrives in sunny fields, roadsides, and open hillsides. Its upright stems carry narrow green leaves dotted with tiny translucent glands that appear as small perforations when held to the light. In midsummer, the plant produces clusters of vivid yellow flowers with numerous golden stamens that attract bees and other pollinators.</p><p>The flowering tops have long been valued in traditional herbal medicine. When the blossoms are crushed, they release a deep red pigment that colors infused oils used for skin care and wound healing. Herbalists have also used preparations of the plant to support emotional balance and nervous system health.</p><p>St. John''s wort grows easily in well-drained soils and often naturalizes in open landscapes. Its cheerful flowers and resilient nature have helped it spread widely beyond its native range. Though simple in appearance, the plant carries a rich cultural history and remains one of the most widely recognized medicinal herbs in traditional European herbalism.</p>';

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

SET @trees_category_id = (SELECT id FROM trees_category WHERE LOWER(name) LIKE '%herbaceous%' OR LOWER(slug) LIKE '%herbaceous%' LIMIT 1);
INSERT INTO trees_categories (tree_id, trees_category_id) SELECT @tree_id, @trees_category_id FROM DUAL WHERE @tree_id IS NOT NULL AND @trees_category_id IS NOT NULL AND (SELECT COUNT(*) FROM trees_categories WHERE tree_id = @tree_id AND trees_category_id = @trees_category_id) = 0;

INSERT IGNORE INTO trees_eco_benefits (tree_id, eco_benefit_id) SELECT @tree_id, id FROM eco_benefits WHERE @eco_cnt = 0 AND LOWER(name) LIKE '%medicinal%' LIMIT 1;
INSERT IGNORE INTO trees_eco_benefits (tree_id, eco_benefit_id) SELECT @tree_id, id FROM eco_benefits WHERE @eco_cnt = 0 AND (LOWER(name) LIKE '%attracts%pollinator%' OR LOWER(name) LIKE '%pollinator%') LIMIT 1;

INSERT IGNORE INTO trees_native_to (tree_id, native_to_id) SELECT @tree_id, id FROM native_to WHERE @native_cnt = 0 AND (LOWER(name) LIKE '%europe%' OR LOWER(name) LIKE '%asia%') LIMIT 1;

INSERT IGNORE INTO trees_natural_habitat (tree_id, natural_habitat_id) SELECT @tree_id, id FROM natural_habitat WHERE @habitat_cnt = 0 AND (LOWER(name) LIKE '%meadow%') LIMIT 1;
INSERT IGNORE INTO trees_natural_habitat (tree_id, natural_habitat_id) SELECT @tree_id, id FROM natural_habitat WHERE @habitat_cnt = 0 AND (LOWER(name) LIKE '%roadside%' OR LOWER(name) LIKE '%road%') LIMIT 1;
INSERT IGNORE INTO trees_natural_habitat (tree_id, natural_habitat_id) SELECT @tree_id, id FROM natural_habitat WHERE @habitat_cnt = 0 AND (LOWER(name) LIKE '%hillside%' OR LOWER(name) LIKE '%upland%') LIMIT 1;
INSERT IGNORE INTO trees_natural_habitat (tree_id, natural_habitat_id) SELECT @tree_id, id FROM natural_habitat WHERE @habitat_cnt = 0 AND (LOWER(name) LIKE '%open%wood%' OR LOWER(name) LIKE '%woodland%') LIMIT 1;

INSERT IGNORE INTO trees_shapes (tree_id, shape_id) SELECT @tree_id, id FROM shapes WHERE @shapes_cnt = 0 AND LOWER(name) LIKE '%upright%' LIMIT 1;
INSERT IGNORE INTO trees_shapes (tree_id, shape_id) SELECT @tree_id, id FROM shapes WHERE @shapes_cnt = 0 AND (LOWER(name) LIKE '%clump%' OR LOWER(name) LIKE '%clumping%') LIMIT 1;

INSERT IGNORE INTO trees_light (tree_id, light_id) SELECT @tree_id, id FROM light WHERE @light_cnt = 0 AND (LOWER(name) LIKE '%full%sun%' OR LOWER(name) LIKE '%full sun%') LIMIT 1;

INSERT IGNORE INTO trees_soil (tree_id, soil_id) SELECT @tree_id, id FROM soil WHERE @soil_cnt = 0 AND (LOWER(name) LIKE '%well%drain%' OR LOWER(name) LIKE '%drained%') LIMIT 1;
INSERT IGNORE INTO trees_soil (tree_id, soil_id) SELECT @tree_id, id FROM soil WHERE @soil_cnt = 0 AND (LOWER(name) LIKE '%adapt%' OR LOWER(name) LIKE '%adaptable%') LIMIT 1;

INSERT IGNORE INTO trees_common_uses (tree_id, common_use_id) SELECT @tree_id, id FROM common_uses WHERE @uses_cnt = 0 AND (LOWER(name) LIKE '%medicinal%garden%' OR LOWER(name) LIKE '%medicinal garden%') LIMIT 1;
INSERT IGNORE INTO trees_common_uses (tree_id, common_use_id) SELECT @tree_id, id FROM common_uses WHERE @uses_cnt = 0 AND (LOWER(name) LIKE '%naturalized%' OR LOWER(name) LIKE '%natural%') LIMIT 1;

INSERT IGNORE INTO trees_unique_attractions (tree_id, unique_attraction_id) SELECT @tree_id, id FROM unique_attractions WHERE @attract_cnt = 0 AND LOWER(name) LIKE '%flower%' LIMIT 1;

INSERT IGNORE INTO plants_tastes (tree_id, taste_id) SELECT @tree_id, id FROM tastes WHERE @tastes_cnt = 0 AND LOWER(name) LIKE '%bitter%' LIMIT 1;
INSERT IGNORE INTO plants_tastes (tree_id, taste_id) SELECT @tree_id, id FROM tastes WHERE @tastes_cnt = 0 AND LOWER(name) LIKE '%astringent%' LIMIT 1;

INSERT IGNORE INTO plants_organ_systems (tree_id, organ_system_id) SELECT @tree_id, id FROM organ_systems WHERE @organ_cnt = 0 AND (LOWER(name) LIKE '%nervous%' OR LOWER(name) LIKE '%nervous system%') LIMIT 1;
INSERT IGNORE INTO plants_organ_systems (tree_id, organ_system_id) SELECT @tree_id, id FROM organ_systems WHERE @organ_cnt = 0 AND (LOWER(name) LIKE '%skin%' OR LOWER(name) LIKE '%integumentary%') LIMIT 1;
INSERT IGNORE INTO plants_organ_systems (tree_id, organ_system_id) SELECT @tree_id, id FROM organ_systems WHERE @organ_cnt = 0 AND (LOWER(name) LIKE '%immune%' OR LOWER(name) LIKE '%lymphatic%') LIMIT 1;

INSERT IGNORE INTO plants_thermal_nature (tree_id, thermal_nature_id) SELECT @tree_id, id FROM thermal_nature WHERE @thermal_cnt = 0 AND LOWER(name) LIKE '%neutral%' LIMIT 1;
INSERT IGNORE INTO plants_moisture (tree_id, moisture_id) SELECT @tree_id, id FROM moisture WHERE @moist_cnt = 0 AND (LOWER(name) LIKE '%dry%' OR LOWER(name) LIKE '%drying%') LIMIT 1;

INSERT IGNORE INTO plants_parts_used (tree_id, parts_used_id) SELECT @tree_id, id FROM parts_used WHERE @parts_cnt = 0 AND LOWER(name) LIKE '%flower%' LIMIT 1;
INSERT IGNORE INTO plants_parts_used (tree_id, parts_used_id) SELECT @tree_id, id FROM parts_used WHERE @parts_cnt = 0 AND (LOWER(name) LIKE '%aerial%' OR LOWER(name) LIKE '%above%ground%') LIMIT 1;

INSERT IGNORE INTO plants_preparations (tree_id, preparation_id) SELECT @tree_id, id FROM preparations WHERE @prep_cnt = 0 AND (LOWER(name) LIKE '%tea%' OR LOWER(name) LIKE '%infusion%') LIMIT 1;
INSERT IGNORE INTO plants_preparations (tree_id, preparation_id) SELECT @tree_id, id FROM preparations WHERE @prep_cnt = 0 AND LOWER(name) LIKE '%tincture%' LIMIT 1;
INSERT IGNORE INTO plants_preparations (tree_id, preparation_id) SELECT @tree_id, id FROM preparations WHERE @prep_cnt = 0 AND (LOWER(name) LIKE '%oil%' OR LOWER(name) LIKE '%oil infusion%') LIMIT 1;

INSERT IGNORE INTO plants_organs_and_tissue (tree_id, organ_and_tissue_id) SELECT @tree_id, id FROM organs_and_tissue WHERE @organs_tissue_cnt = 0 AND (LOWER(name) LIKE '%nerve%' OR LOWER(name) LIKE '%nerves%') LIMIT 1;
INSERT IGNORE INTO plants_organs_and_tissue (tree_id, organ_and_tissue_id) SELECT @tree_id, id FROM organs_and_tissue WHERE @organs_tissue_cnt = 0 AND (LOWER(name) LIKE '%skin%') LIMIT 1;
INSERT IGNORE INTO plants_organs_and_tissue (tree_id, organ_and_tissue_id) SELECT @tree_id, id FROM organs_and_tissue WHERE @organs_tissue_cnt = 0 AND LOWER(name) LIKE '%blood%' LIMIT 1;

-- -----------------------------------------------------------------------------
-- DONE. Verify with:
-- SELECT id, common_name, slug FROM trees WHERE slug IN ('american-ginseng','siberian-ginseng','st-johns-wort');
-- -----------------------------------------------------------------------------
