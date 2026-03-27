-- Fireweed: merge only — fills NULL/blank `trees` fields; does **not** change `body`, `slug`, `common_name`, or taxonomy columns. Matches `slug` `fireweed` and/or `fireweed-chamerion-angustifolium` (reference dump uses `fireweed`).
-- Shepherd's purse & Marshmallow: insert `trees` row if missing (`genuses` Capsella / Althaea added if missing), then merge (fill empty fields only, including `body` only when empty) + INSERT IGNORE junctions.
-- Zone N → `zone_id` N+1 (e.g. zone 2 → 3, zone 3 → 4, zone 4 → 5). Heights are whole feet (0.5 ft → 1).

SET NAMES utf8mb4;

INSERT INTO `genuses` (`id`, `name`, `family_id`)
SELECT (SELECT IFNULL(MAX(`g2`.`id`), 0) + 1 FROM `genuses` `g2`), 'Capsella', 94
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM `genuses` `g` WHERE `g`.`name` = 'Capsella' LIMIT 1);

INSERT INTO `genuses` (`id`, `name`, `family_id`)
SELECT (SELECT IFNULL(MAX(`g2`.`id`), 0) + 1 FROM `genuses` `g2`), 'Althaea', 23
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM `genuses` `g` WHERE `g`.`name` = 'Althaea' LIMIT 1);

INSERT INTO `trees` (`id`, `slug`, `common_name`, `other_common_names`, `genus_id`, `specific_epithet`, `other_species`, `subspecies`, `variety`, `cultivar`, `zone_id`, `reproduction_type_id`, `height_min`, `height_max`, `width_min`, `width_max`, `growth_rate`, `lifespan_min`, `lifespan_max`, `seeds_packet`, `seeds_gram`, `cost_gram`, `dormancy_treatment_id`, `growing_instructions`, `body`, `special_chemistry`, `signature`, `precautions`, `combinations`, `chinese_medicine`, `medicinal_species`, `images`, `mode_id`, `folk_use`)
SELECT (SELECT IFNULL(MAX(`t2`.`id`), 0) + 1 FROM `trees` `t2`), 'shepherds-purse-capsella-bursa-pastoris', 'Shepherd''s purse', '', (SELECT `id` FROM `genuses` WHERE `name` = 'Capsella' LIMIT 1), 'bursa-pastoris', '', '', '', '', 4, 1, 1, 2, 1, 2, 'fast', 1, 2, NULL, NULL, NULL, '2', 'Shepherd''s purse is a hardy annual or biennial that readily colonizes disturbed soils. Seeds germinate best when exposed to light and cool temperatures, making early spring or fall sowing ideal. It thrives in a wide range of soil types, including compacted or nutrient-poor soils, and requires minimal care once established. The plant self-seeds readily and can become naturalized in suitable environments. Thin seedlings to prevent overcrowding and allow airflow. It prefers open conditions but tolerates partial shade.', '<p>Shepherd''s purse (<em>Capsella bursa-pastoris</em>) is a common annual or biennial mustard-family plant found in fields, roadsides, and disturbed ground. It forms a basal rosette of lobed leaves and sends up slender stems bearing small white flowers and distinctive heart-shaped seed pods.</p>', 'Shepherd''s purse contains flavonoids, alkaloids, amines such as choline, and tannins. These compounds contribute to its hemostatic and vasoconstrictive effects. The presence of bioactive amines is thought to influence smooth muscle tone, particularly in the uterus. Tannins provide astringency, while flavonoids contribute antioxidant and anti-inflammatory activity, supporting its traditional uses in circulatory and reproductive health.', 'The plant''s distinctive heart-shaped seed pods resemble a traditional purse, symbolizing containment and control. This signature aligns with its historical use in controlling bleeding and excess flow. Its modest appearance and ability to thrive in disturbed environments reflect adaptability and resilience, reinforcing its role as a stabilizing herb.', 'Avoid excessive or prolonged use during pregnancy unless under professional guidance, as shepherd''s purse can stimulate uterine activity. Individuals with low blood pressure or those on anticoagulant medications should use caution due to its effects on circulation and clotting. Always ensure proper identification before use, as misidentification can occur with similar small flowering plants.', 'Shepherd''s purse is often combined with other astringent and hemostatic herbs such as <a href="https://naturewithus.com/plants/herbaceous-plants/yarrow">yarrow</a> for bleeding control, or with uterine tonics like <a href="https://naturewithus.com/plants/shrubs-woody-plants/raspberry">raspberry leaf</a> in reproductive health formulas. It may also be paired with cooling herbs like peppermint for heat-related conditions.', 'In traditional Chinese medicine, shepherd''s purse (known as Ji Cai) is used to cool the blood and stop bleeding. It is often applied in cases of uterine bleeding, postpartum hemorrhage, and other conditions involving excess heat in the blood. It is also considered beneficial for supporting digestion and reducing inflammation in the gastrointestinal tract. Its use aligns with herbs that clear heat and stabilize bleeding patterns.', 'Capsella bursa-pastoris', '[]', NULL, 'Shepherd''s purse has a long history of use as a hemostatic herb, traditionally used to help control bleeding from wounds, nosebleeds, and heavy menstrual flow. It has also been used to support uterine tone and regulate menstrual cycles. In folk traditions, it was commonly prepared as a tea or tincture for internal use and as a wash for external application. Its astringent properties make it useful for tightening tissues and reducing excess discharge.'
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM `trees` `t` WHERE `t`.`slug` = 'shepherds-purse-capsella-bursa-pastoris' LIMIT 1);

INSERT INTO `trees` (`id`, `slug`, `common_name`, `other_common_names`, `genus_id`, `specific_epithet`, `other_species`, `subspecies`, `variety`, `cultivar`, `zone_id`, `reproduction_type_id`, `height_min`, `height_max`, `width_min`, `width_max`, `growth_rate`, `lifespan_min`, `lifespan_max`, `seeds_packet`, `seeds_gram`, `cost_gram`, `dormancy_treatment_id`, `growing_instructions`, `body`, `special_chemistry`, `signature`, `precautions`, `combinations`, `chinese_medicine`, `medicinal_species`, `images`, `mode_id`, `folk_use`)
SELECT (SELECT IFNULL(MAX(`t2`.`id`), 0) + 1 FROM `trees` `t2`), 'marshmallow-althaea-officinalis', 'Marshmallow', '', (SELECT `id` FROM `genuses` WHERE `name` = 'Althaea' LIMIT 1), 'officinalis', '', '', '', '', 5, 1, 3, 5, 2, 4, 'medium', 2, 5, NULL, NULL, NULL, '2', 'Marshmallow prefers moist, rich soils and thrives in full sun to partial shade. Seeds should be sown shallowly and kept consistently moist during germination. Cold stratification improves germination rates. Once established, the plant develops deep roots that access water and stabilize soil in wet environments. It is well suited for rain gardens, wetland edges, and restoration projects. Regular watering is important in drier conditions, though the plant is naturally adapted to high moisture environments. It can be propagated by seed or root division.', '<p>Marshmallow (<em>Althaea officinalis</em>) is a tall perennial herb of wet meadows and river margins, valued for its soft leaves and pale flowers. The root is rich in mucilage and has a long history of use as a soothing demulcent.</p>', 'Marshmallow root contains high levels of mucilage polysaccharides, which swell in water to form a soothing gel-like substance. It also contains pectins, flavonoids, and small amounts of tannins. The mucilage is responsible for its demulcent and protective effects on mucous membranes. These compounds help reduce irritation, promote tissue hydration, and support gentle healing processes in both internal and external applications.', 'The plant''s soft, moist-growing nature and mucilaginous texture reflect its signature of soothing and hydration. Its affinity for wet environments and its ability to produce a cooling, gel-like substance when prepared in water symbolize its role in calming and moistening dry or inflamed tissues. The pale, delicate flowers further reflect its gentle energetic profile.', 'Marshmallow is generally considered very safe. Because its mucilage can slow absorption of medications, it is recommended to take it at least one hour apart from pharmaceutical drugs. Individuals with allergies to plants in the Malvaceae family should exercise caution. Overuse is uncommon, but extremely high intake may cause mild digestive effects due to its fiber-like properties.', 'Marshmallow combines well with other demulcent herbs such as <a href="https://naturewithus.com/plants/herbaceous-plants/slippery-elm">slippery elm</a> and <a href="https://naturewithus.com/plants/herbaceous-plants/plantain">plantain</a> for respiratory and digestive support. It is often used alongside anti-inflammatory herbs like chamomile for soothing blends. In urinary formulas, it may be paired with <a href="https://naturewithus.com/plants/shrubs-woody-plants/bearberry">bearberry</a> to support urinary tract comfort.', 'While not a classical herb in traditional Chinese medicine, marshmallow aligns with the concept of moistening dryness and nourishing yin. Its demulcent qualities are consistent with herbs used to support lung and stomach yin, helping relieve dry cough, throat irritation, and dryness in the digestive tract. It is considered gentle and suitable for long-term use in supportive roles.', 'Althaea officinalis', '[]', NULL, 'Marshmallow has been widely used as a demulcent herb for soothing irritated mucous membranes. The roots, leaves, and flowers are traditionally prepared as teas, syrups, or poultices to support conditions such as coughs, sore throats, digestive irritation, and skin inflammation. Its mucilaginous nature makes it especially useful for coating and protecting tissues. Historically, the root was also used as a food source and for making confections similar to modern marshmallows.'
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM `trees` `t` WHERE `t`.`slug` = 'marshmallow-althaea-officinalis' LIMIT 1);

-- Fireweed: never update `body`
UPDATE `trees` SET
  `height_min` = COALESCE(`height_min`, 2),
  `height_max` = COALESCE(`height_max`, 6),
  `width_min` = COALESCE(`width_min`, 1),
  `width_max` = COALESCE(`width_max`, 3),
  `growth_rate` = COALESCE(`growth_rate`, 'fast'),
  `lifespan_min` = COALESCE(`lifespan_min`, 2),
  `lifespan_max` = COALESCE(`lifespan_max`, 5),
  `zone_id` = COALESCE(`zone_id`, 3),
  `reproduction_type_id` = IF(`reproduction_type_id` IS NULL OR `reproduction_type_id` = 0, 1, `reproduction_type_id`),
  `dormancy_treatment_id` = IF(`dormancy_treatment_id` IS NULL OR TRIM(`dormancy_treatment_id`) = '', '2', `dormancy_treatment_id`),
  `growing_instructions` = IF(TRIM(COALESCE(`growing_instructions`, '')) = '', 'Fireweed thrives in disturbed soils and open, sunny environments, often appearing after forest fires or land clearing. Seeds require light to germinate and benefit from cold stratification. Sow on the surface of a moist, well-drained medium and avoid covering the seed deeply. It spreads readily via wind-dispersed seeds and underground rhizomes, forming dense colonies over time. In cultivation, fireweed prefers low competition and may be short-lived in heavily shaded or densely vegetated areas. It is an excellent pioneer species for ecological restoration and soil stabilization projects.', `growing_instructions`),
  `folk_use` = IF(TRIM(COALESCE(`folk_use`, '')) = '', 'Traditionally, fireweed has been used by various Indigenous groups for both food and medicine. Young shoots can be eaten like asparagus, while leaves are often dried for tea. Medicinally, it has been used as a mild astringent and anti-inflammatory herb, commonly applied to soothe digestive upset, skin irritations, and minor wounds. It has also been used as a general tonic herb to support recovery after illness. The inner pith of young stems has occasionally been used as a survival food source.', `folk_use`),
  `chinese_medicine` = IF(TRIM(COALESCE(`chinese_medicine`, '')) = '', 'While not a classical staple in traditional Chinese medicine, related species and preparations of Chamerion angustifolium have been used in modern herbal practice as a cooling, detoxifying herb. It is considered helpful for clearing heat, supporting urinary tract function, and reducing mild inflammation. Its astringent properties align with herbs used to stabilize leakage conditions such as mild diarrhea or excessive urination.', `chinese_medicine`),
  `special_chemistry` = IF(TRIM(COALESCE(`special_chemistry`, '')) = '', 'Fireweed contains flavonoids, tannins, mucilage, and phenolic compounds that contribute to its astringent and anti-inflammatory properties. It is also known for its high levels of vitamins A and C in young shoots and leaves. The presence of mucilage gives it a soothing effect on mucous membranes, while tannins contribute to tissue toning effects. These compounds collectively support its traditional use as a gentle restorative and soothing herb.', `special_chemistry`),
  `signature` = IF(TRIM(COALESCE(`signature`, '')) = '', 'Fireweed is often associated with resilience and renewal, as it is one of the first plants to colonize burned or disturbed land. Its tall, upright growth habit and vibrant pink-purple flowers reflect upward movement and regeneration. The plant''s rapid spread in open areas aligns with themes of recovery, transformation, and ecological succession.', `signature`),
  `combinations` = IF(TRIM(COALESCE(`combinations`, '')) = '', 'Fireweed is often combined with soothing demulcent herbs such as <a href="https://naturewithus.com/plants/herbaceous-plants/marshmallow">marshmallow</a> or <a href="https://naturewithus.com/plants/herbaceous-plants/plantain">plantain</a> for digestive or mucosal support. It may also be paired with astringent herbs like <a href="https://naturewithus.com/plants/shrubs-woody-plants/bearberry">bearberry</a> for urinary support blends. In topical applications, it blends well with calendula for skin soothing preparations.', `combinations`),
  `precautions` = IF(TRIM(COALESCE(`precautions`, '')) = '', 'Fireweed is generally considered safe when used in moderate amounts as food or tea. Individuals with sensitivities to astringent herbs may experience mild digestive tightening. Overconsumption may lead to mild constipation due to its tannin content. As with any wild-harvested plant, proper identification is important to avoid confusion with similar species. Pregnant or nursing individuals should consult a qualified practitioner before medicinal use.', `precautions`),
  `medicinal_species` = IF(TRIM(COALESCE(`medicinal_species`, '')) = '', 'Chamerion angustifolium', `medicinal_species`)
WHERE `slug` IN ('fireweed-chamerion-angustifolium', 'fireweed');

UPDATE `trees` SET
  `height_min` = COALESCE(`height_min`, 1),
  `height_max` = COALESCE(`height_max`, 2),
  `width_min` = COALESCE(`width_min`, 1),
  `width_max` = COALESCE(`width_max`, 2),
  `growth_rate` = COALESCE(`growth_rate`, 'fast'),
  `lifespan_min` = COALESCE(`lifespan_min`, 1),
  `lifespan_max` = COALESCE(`lifespan_max`, 2),
  `zone_id` = COALESCE(`zone_id`, 4),
  `reproduction_type_id` = IF(`reproduction_type_id` IS NULL OR `reproduction_type_id` = 0, 1, `reproduction_type_id`),
  `dormancy_treatment_id` = IF(`dormancy_treatment_id` IS NULL OR TRIM(`dormancy_treatment_id`) = '', '2', `dormancy_treatment_id`),
  `growing_instructions` = IF(TRIM(COALESCE(`growing_instructions`, '')) = '', 'Shepherd''s purse is a hardy annual or biennial that readily colonizes disturbed soils. Seeds germinate best when exposed to light and cool temperatures, making early spring or fall sowing ideal. It thrives in a wide range of soil types, including compacted or nutrient-poor soils, and requires minimal care once established. The plant self-seeds readily and can become naturalized in suitable environments. Thin seedlings to prevent overcrowding and allow airflow. It prefers open conditions but tolerates partial shade.', `growing_instructions`),
  `body` = IF(TRIM(COALESCE(`body`, '')) = '', '<p>Shepherd''s purse (<em>Capsella bursa-pastoris</em>) is a common annual or biennial mustard-family plant found in fields, roadsides, and disturbed ground. It forms a basal rosette of lobed leaves and sends up slender stems bearing small white flowers and distinctive heart-shaped seed pods.</p>', `body`),
  `folk_use` = IF(TRIM(COALESCE(`folk_use`, '')) = '', 'Shepherd''s purse has a long history of use as a hemostatic herb, traditionally used to help control bleeding from wounds, nosebleeds, and heavy menstrual flow. It has also been used to support uterine tone and regulate menstrual cycles. In folk traditions, it was commonly prepared as a tea or tincture for internal use and as a wash for external application. Its astringent properties make it useful for tightening tissues and reducing excess discharge.', `folk_use`),
  `chinese_medicine` = IF(TRIM(COALESCE(`chinese_medicine`, '')) = '', 'In traditional Chinese medicine, shepherd''s purse (known as Ji Cai) is used to cool the blood and stop bleeding. It is often applied in cases of uterine bleeding, postpartum hemorrhage, and other conditions involving excess heat in the blood. It is also considered beneficial for supporting digestion and reducing inflammation in the gastrointestinal tract. Its use aligns with herbs that clear heat and stabilize bleeding patterns.', `chinese_medicine`),
  `special_chemistry` = IF(TRIM(COALESCE(`special_chemistry`, '')) = '', 'Shepherd''s purse contains flavonoids, alkaloids, amines such as choline, and tannins. These compounds contribute to its hemostatic and vasoconstrictive effects. The presence of bioactive amines is thought to influence smooth muscle tone, particularly in the uterus. Tannins provide astringency, while flavonoids contribute antioxidant and anti-inflammatory activity, supporting its traditional uses in circulatory and reproductive health.', `special_chemistry`),
  `signature` = IF(TRIM(COALESCE(`signature`, '')) = '', 'The plant''s distinctive heart-shaped seed pods resemble a traditional purse, symbolizing containment and control. This signature aligns with its historical use in controlling bleeding and excess flow. Its modest appearance and ability to thrive in disturbed environments reflect adaptability and resilience, reinforcing its role as a stabilizing herb.', `signature`),
  `combinations` = IF(TRIM(COALESCE(`combinations`, '')) = '', 'Shepherd''s purse is often combined with other astringent and hemostatic herbs such as <a href="https://naturewithus.com/plants/herbaceous-plants/yarrow">yarrow</a> for bleeding control, or with uterine tonics like <a href="https://naturewithus.com/plants/shrubs-woody-plants/raspberry">raspberry leaf</a> in reproductive health formulas. It may also be paired with cooling herbs like peppermint for heat-related conditions.', `combinations`),
  `precautions` = IF(TRIM(COALESCE(`precautions`, '')) = '', 'Avoid excessive or prolonged use during pregnancy unless under professional guidance, as shepherd''s purse can stimulate uterine activity. Individuals with low blood pressure or those on anticoagulant medications should use caution due to its effects on circulation and clotting. Always ensure proper identification before use, as misidentification can occur with similar small flowering plants.', `precautions`),
  `medicinal_species` = IF(TRIM(COALESCE(`medicinal_species`, '')) = '', 'Capsella bursa-pastoris', `medicinal_species`)
WHERE `slug` = 'shepherds-purse-capsella-bursa-pastoris';

UPDATE `trees` SET
  `height_min` = COALESCE(`height_min`, 3),
  `height_max` = COALESCE(`height_max`, 5),
  `width_min` = COALESCE(`width_min`, 2),
  `width_max` = COALESCE(`width_max`, 4),
  `growth_rate` = COALESCE(`growth_rate`, 'medium'),
  `lifespan_min` = COALESCE(`lifespan_min`, 2),
  `lifespan_max` = COALESCE(`lifespan_max`, 5),
  `zone_id` = COALESCE(`zone_id`, 5),
  `reproduction_type_id` = IF(`reproduction_type_id` IS NULL OR `reproduction_type_id` = 0, 1, `reproduction_type_id`),
  `dormancy_treatment_id` = IF(`dormancy_treatment_id` IS NULL OR TRIM(`dormancy_treatment_id`) = '', '2', `dormancy_treatment_id`),
  `growing_instructions` = IF(TRIM(COALESCE(`growing_instructions`, '')) = '', 'Marshmallow prefers moist, rich soils and thrives in full sun to partial shade. Seeds should be sown shallowly and kept consistently moist during germination. Cold stratification improves germination rates. Once established, the plant develops deep roots that access water and stabilize soil in wet environments. It is well suited for rain gardens, wetland edges, and restoration projects. Regular watering is important in drier conditions, though the plant is naturally adapted to high moisture environments. It can be propagated by seed or root division.', `growing_instructions`),
  `body` = IF(TRIM(COALESCE(`body`, '')) = '', '<p>Marshmallow (<em>Althaea officinalis</em>) is a tall perennial herb of wet meadows and river margins, valued for its soft leaves and pale flowers. The root is rich in mucilage and has a long history of use as a soothing demulcent.</p>', `body`),
  `folk_use` = IF(TRIM(COALESCE(`folk_use`, '')) = '', 'Marshmallow has been widely used as a demulcent herb for soothing irritated mucous membranes. The roots, leaves, and flowers are traditionally prepared as teas, syrups, or poultices to support conditions such as coughs, sore throats, digestive irritation, and skin inflammation. Its mucilaginous nature makes it especially useful for coating and protecting tissues. Historically, the root was also used as a food source and for making confections similar to modern marshmallows.', `folk_use`),
  `chinese_medicine` = IF(TRIM(COALESCE(`chinese_medicine`, '')) = '', 'While not a classical herb in traditional Chinese medicine, marshmallow aligns with the concept of moistening dryness and nourishing yin. Its demulcent qualities are consistent with herbs used to support lung and stomach yin, helping relieve dry cough, throat irritation, and dryness in the digestive tract. It is considered gentle and suitable for long-term use in supportive roles.', `chinese_medicine`),
  `special_chemistry` = IF(TRIM(COALESCE(`special_chemistry`, '')) = '', 'Marshmallow root contains high levels of mucilage polysaccharides, which swell in water to form a soothing gel-like substance. It also contains pectins, flavonoids, and small amounts of tannins. The mucilage is responsible for its demulcent and protective effects on mucous membranes. These compounds help reduce irritation, promote tissue hydration, and support gentle healing processes in both internal and external applications.', `special_chemistry`),
  `signature` = IF(TRIM(COALESCE(`signature`, '')) = '', 'The plant''s soft, moist-growing nature and mucilaginous texture reflect its signature of soothing and hydration. Its affinity for wet environments and its ability to produce a cooling, gel-like substance when prepared in water symbolize its role in calming and moistening dry or inflamed tissues. The pale, delicate flowers further reflect its gentle energetic profile.', `signature`),
  `combinations` = IF(TRIM(COALESCE(`combinations`, '')) = '', 'Marshmallow combines well with other demulcent herbs such as <a href="https://naturewithus.com/plants/herbaceous-plants/slippery-elm">slippery elm</a> and <a href="https://naturewithus.com/plants/herbaceous-plants/plantain">plantain</a> for respiratory and digestive support. It is often used alongside anti-inflammatory herbs like chamomile for soothing blends. In urinary formulas, it may be paired with <a href="https://naturewithus.com/plants/shrubs-woody-plants/bearberry">bearberry</a> to support urinary tract comfort.', `combinations`),
  `precautions` = IF(TRIM(COALESCE(`precautions`, '')) = '', 'Marshmallow is generally considered very safe. Because its mucilage can slow absorption of medications, it is recommended to take it at least one hour apart from pharmaceutical drugs. Individuals with allergies to plants in the Malvaceae family should exercise caution. Overuse is uncommon, but extremely high intake may cause mild digestive effects due to its fiber-like properties.', `precautions`),
  `medicinal_species` = IF(TRIM(COALESCE(`medicinal_species`, '')) = '', 'Althaea officinalis', `medicinal_species`)
WHERE `slug` = 'marshmallow-althaea-officinalis';

INSERT IGNORE INTO `trees_categories` (`tree_id`, `trees_category_id`)
SELECT `id`, 7 FROM `trees` WHERE `slug` IN ('fireweed-chamerion-angustifolium', 'fireweed', 'shepherds-purse-capsella-bursa-pastoris', 'marshmallow-althaea-officinalis');

INSERT IGNORE INTO `trees_native_to` (`tree_id`, `native_to_id`)
SELECT `id`, 4 FROM `trees` WHERE `slug` IN ('fireweed-chamerion-angustifolium', 'fireweed')
UNION ALL SELECT `id`, 1 FROM `trees` WHERE `slug` IN ('fireweed-chamerion-angustifolium', 'fireweed')
UNION ALL SELECT `id`, 3 FROM `trees` WHERE `slug` IN ('fireweed-chamerion-angustifolium', 'fireweed')
UNION ALL SELECT `id`, 5 FROM `trees` WHERE `slug` = 'shepherds-purse-capsella-bursa-pastoris'
UNION ALL SELECT `id`, 4 FROM `trees` WHERE `slug` = 'shepherds-purse-capsella-bursa-pastoris'
UNION ALL SELECT `id`, 5 FROM `trees` WHERE `slug` = 'marshmallow-althaea-officinalis'
UNION ALL SELECT `id`, 4 FROM `trees` WHERE `slug` = 'marshmallow-althaea-officinalis';

INSERT IGNORE INTO `trees_natural_habitat` (`tree_id`, `natural_habitat_id`)
SELECT `id`, 4 FROM `trees` WHERE `slug` IN ('fireweed-chamerion-angustifolium', 'fireweed')
UNION ALL SELECT `id`, 15 FROM `trees` WHERE `slug` IN ('fireweed-chamerion-angustifolium', 'fireweed')
UNION ALL SELECT `id`, 9 FROM `trees` WHERE `slug` IN ('fireweed-chamerion-angustifolium', 'fireweed')
UNION ALL SELECT `id`, 5 FROM `trees` WHERE `slug` IN ('fireweed-chamerion-angustifolium', 'fireweed')
UNION ALL SELECT `id`, 4 FROM `trees` WHERE `slug` = 'shepherds-purse-capsella-bursa-pastoris'
UNION ALL SELECT `id`, 15 FROM `trees` WHERE `slug` = 'shepherds-purse-capsella-bursa-pastoris'
UNION ALL SELECT `id`, 3 FROM `trees` WHERE `slug` = 'shepherds-purse-capsella-bursa-pastoris'
UNION ALL SELECT `id`, 7 FROM `trees` WHERE `slug` = 'marshmallow-althaea-officinalis'
UNION ALL SELECT `id`, 1 FROM `trees` WHERE `slug` = 'marshmallow-althaea-officinalis'
UNION ALL SELECT `id`, 12 FROM `trees` WHERE `slug` = 'marshmallow-althaea-officinalis';

INSERT IGNORE INTO `trees_light` (`tree_id`, `light_id`)
SELECT `id`, 1 FROM `trees` WHERE `slug` IN ('fireweed-chamerion-angustifolium', 'fireweed', 'shepherds-purse-capsella-bursa-pastoris', 'marshmallow-althaea-officinalis')
UNION ALL SELECT `id`, 2 FROM `trees` WHERE `slug` IN ('fireweed-chamerion-angustifolium', 'fireweed', 'shepherds-purse-capsella-bursa-pastoris', 'marshmallow-althaea-officinalis');

INSERT IGNORE INTO `trees_shapes` (`tree_id`, `shape_id`)
SELECT `id`, 15 FROM `trees` WHERE `slug` IN ('fireweed-chamerion-angustifolium', 'fireweed', 'shepherds-purse-capsella-bursa-pastoris', 'marshmallow-althaea-officinalis')
UNION ALL SELECT `id`, 9 FROM `trees` WHERE `slug` IN ('fireweed-chamerion-angustifolium', 'fireweed', 'shepherds-purse-capsella-bursa-pastoris', 'marshmallow-althaea-officinalis');

INSERT IGNORE INTO `trees_soil` (`tree_id`, `soil_id`)
SELECT `id`, 15 FROM `trees` WHERE `slug` IN ('fireweed-chamerion-angustifolium', 'fireweed', 'shepherds-purse-capsella-bursa-pastoris')
UNION ALL SELECT `id`, 1 FROM `trees` WHERE `slug` IN ('fireweed-chamerion-angustifolium', 'fireweed', 'shepherds-purse-capsella-bursa-pastoris', 'marshmallow-althaea-officinalis')
UNION ALL SELECT `id`, 2 FROM `trees` WHERE `slug` IN ('fireweed-chamerion-angustifolium', 'fireweed', 'shepherds-purse-capsella-bursa-pastoris', 'marshmallow-althaea-officinalis')
UNION ALL SELECT `id`, 12 FROM `trees` WHERE `slug` IN ('fireweed-chamerion-angustifolium', 'fireweed', 'shepherds-purse-capsella-bursa-pastoris', 'marshmallow-althaea-officinalis')
UNION ALL SELECT `id`, 4 FROM `trees` WHERE `slug` = 'marshmallow-althaea-officinalis';

INSERT IGNORE INTO `trees_eco_benefits` (`tree_id`, `eco_benefit_id`)
SELECT `id`, 1 FROM `trees` WHERE `slug` IN ('fireweed-chamerion-angustifolium', 'fireweed', 'shepherds-purse-capsella-bursa-pastoris', 'marshmallow-althaea-officinalis')
UNION ALL SELECT `id`, 12 FROM `trees` WHERE `slug` IN ('fireweed-chamerion-angustifolium', 'fireweed', 'shepherds-purse-capsella-bursa-pastoris', 'marshmallow-althaea-officinalis')
UNION ALL SELECT `id`, 3 FROM `trees` WHERE `slug` IN ('fireweed-chamerion-angustifolium', 'fireweed')
UNION ALL SELECT `id`, 2 FROM `trees` WHERE `slug` = 'marshmallow-althaea-officinalis';

INSERT IGNORE INTO `trees_common_uses` (`tree_id`, `common_use_id`)
SELECT `id`, 7 FROM `trees` WHERE `slug` IN ('fireweed-chamerion-angustifolium', 'fireweed', 'shepherds-purse-capsella-bursa-pastoris', 'marshmallow-althaea-officinalis')
UNION ALL SELECT `id`, 4 FROM `trees` WHERE `slug` IN ('fireweed-chamerion-angustifolium', 'fireweed', 'shepherds-purse-capsella-bursa-pastoris', 'marshmallow-althaea-officinalis')
UNION ALL SELECT `id`, 3 FROM `trees` WHERE `slug` IN ('fireweed-chamerion-angustifolium', 'fireweed')
UNION ALL SELECT `id`, 10 FROM `trees` WHERE `slug` = 'marshmallow-althaea-officinalis';

INSERT IGNORE INTO `trees_unique_attractions` (`tree_id`, `unique_attraction_id`)
SELECT `id`, 4 FROM `trees` WHERE `slug` IN ('fireweed-chamerion-angustifolium', 'fireweed', 'shepherds-purse-capsella-bursa-pastoris', 'marshmallow-althaea-officinalis')
UNION ALL SELECT `id`, 2 FROM `trees` WHERE `slug` IN ('fireweed-chamerion-angustifolium', 'fireweed', 'shepherds-purse-capsella-bursa-pastoris', 'marshmallow-althaea-officinalis')
UNION ALL SELECT `id`, 1 FROM `trees` WHERE `slug` IN ('fireweed-chamerion-angustifolium', 'fireweed');

INSERT IGNORE INTO `trees_tolerances` (`tree_id`, `tolerance_id`)
SELECT `id`, 11 FROM `trees` WHERE `slug` IN ('fireweed-chamerion-angustifolium', 'fireweed')
UNION ALL SELECT `id`, 8 FROM `trees` WHERE `slug` IN ('fireweed-chamerion-angustifolium', 'fireweed', 'shepherds-purse-capsella-bursa-pastoris')
UNION ALL SELECT `id`, 14 FROM `trees` WHERE `slug` = 'shepherds-purse-capsella-bursa-pastoris';

INSERT IGNORE INTO `trees_transplanting` (`tree_id`, `transplanting_id`)
SELECT `id`, 1 FROM `trees` WHERE `slug` IN ('fireweed-chamerion-angustifolium', 'fireweed', 'shepherds-purse-capsella-bursa-pastoris', 'marshmallow-althaea-officinalis')
UNION ALL SELECT `id`, 3 FROM `trees` WHERE `slug` IN ('fireweed-chamerion-angustifolium', 'fireweed', 'shepherds-purse-capsella-bursa-pastoris', 'marshmallow-althaea-officinalis')
UNION ALL SELECT `id`, 4 FROM `trees` WHERE `slug` IN ('fireweed-chamerion-angustifolium', 'fireweed', 'marshmallow-althaea-officinalis');

INSERT IGNORE INTO `trees_reproduction_types` (`tree_id`, `reproduction_type_id`)
SELECT `id`, 1 FROM `trees` WHERE `slug` IN ('fireweed-chamerion-angustifolium', 'fireweed', 'shepherds-purse-capsella-bursa-pastoris', 'marshmallow-althaea-officinalis');

INSERT IGNORE INTO `plants_moisture` (`tree_id`, `moisture_id`)
SELECT `id`, 1 FROM `trees` WHERE `slug` IN ('fireweed-chamerion-angustifolium', 'fireweed', 'shepherds-purse-capsella-bursa-pastoris')
UNION ALL SELECT `id`, 2 FROM `trees` WHERE `slug` = 'marshmallow-althaea-officinalis';

INSERT IGNORE INTO `plants_tastes` (`tree_id`, `taste_id`)
SELECT `id`, 6 FROM `trees` WHERE `slug` IN ('fireweed-chamerion-angustifolium', 'fireweed', 'shepherds-purse-capsella-bursa-pastoris')
UNION ALL SELECT `id`, 1 FROM `trees` WHERE `slug` IN ('fireweed-chamerion-angustifolium', 'fireweed', 'shepherds-purse-capsella-bursa-pastoris')
UNION ALL SELECT `id`, 2 FROM `trees` WHERE `slug` = 'marshmallow-althaea-officinalis'
UNION ALL SELECT `id`, 7 FROM `trees` WHERE `slug` = 'marshmallow-althaea-officinalis';

INSERT IGNORE INTO `plants_organ_systems` (`tree_id`, `organ_system_id`)
SELECT `id`, 2 FROM `trees` WHERE `slug` IN ('fireweed-chamerion-angustifolium', 'fireweed')
UNION ALL SELECT `id`, 8 FROM `trees` WHERE `slug` IN ('fireweed-chamerion-angustifolium', 'fireweed')
UNION ALL SELECT `id`, 14 FROM `trees` WHERE `slug` IN ('fireweed-chamerion-angustifolium', 'fireweed')
UNION ALL SELECT `id`, 7 FROM `trees` WHERE `slug` IN ('fireweed-chamerion-angustifolium', 'fireweed')
UNION ALL SELECT `id`, 11 FROM `trees` WHERE `slug` = 'shepherds-purse-capsella-bursa-pastoris'
UNION ALL SELECT `id`, 7 FROM `trees` WHERE `slug` = 'shepherds-purse-capsella-bursa-pastoris'
UNION ALL SELECT `id`, 1 FROM `trees` WHERE `slug` = 'shepherds-purse-capsella-bursa-pastoris'
UNION ALL SELECT `id`, 2 FROM `trees` WHERE `slug` = 'marshmallow-althaea-officinalis'
UNION ALL SELECT `id`, 4 FROM `trees` WHERE `slug` = 'marshmallow-althaea-officinalis'
UNION ALL SELECT `id`, 7 FROM `trees` WHERE `slug` = 'marshmallow-althaea-officinalis'
UNION ALL SELECT `id`, 14 FROM `trees` WHERE `slug` = 'marshmallow-althaea-officinalis';

INSERT IGNORE INTO `plants_thermal_nature` (`tree_id`, `thermal_nature_id`)
SELECT `id`, 2 FROM `trees` WHERE `slug` IN ('fireweed-chamerion-angustifolium', 'fireweed', 'shepherds-purse-capsella-bursa-pastoris', 'marshmallow-althaea-officinalis');

INSERT IGNORE INTO `plants_parts_used` (`tree_id`, `parts_used_id`)
SELECT `id`, 5 FROM `trees` WHERE `slug` IN ('fireweed-chamerion-angustifolium', 'fireweed', 'shepherds-purse-capsella-bursa-pastoris', 'marshmallow-althaea-officinalis')
UNION ALL SELECT `id`, 6 FROM `trees` WHERE `slug` IN ('fireweed-chamerion-angustifolium', 'fireweed', 'marshmallow-althaea-officinalis')
UNION ALL SELECT `id`, 2 FROM `trees` WHERE `slug` IN ('fireweed-chamerion-angustifolium', 'fireweed', 'shepherds-purse-capsella-bursa-pastoris')
UNION ALL SELECT `id`, 9 FROM `trees` WHERE `slug` = 'shepherds-purse-capsella-bursa-pastoris'
UNION ALL SELECT `id`, 1 FROM `trees` WHERE `slug` = 'marshmallow-althaea-officinalis';

INSERT IGNORE INTO `plants_preparations` (`tree_id`, `preparation_id`)
SELECT `id`, 6 FROM `trees` WHERE `slug` IN ('fireweed-chamerion-angustifolium', 'fireweed', 'shepherds-purse-capsella-bursa-pastoris', 'marshmallow-althaea-officinalis')
UNION ALL SELECT `id`, 7 FROM `trees` WHERE `slug` IN ('fireweed-chamerion-angustifolium', 'fireweed', 'shepherds-purse-capsella-bursa-pastoris', 'marshmallow-althaea-officinalis')
UNION ALL SELECT `id`, 12 FROM `trees` WHERE `slug` IN ('fireweed-chamerion-angustifolium', 'fireweed', 'shepherds-purse-capsella-bursa-pastoris')
UNION ALL SELECT `id`, 2 FROM `trees` WHERE `slug` = 'shepherds-purse-capsella-bursa-pastoris'
UNION ALL SELECT `id`, 1 FROM `trees` WHERE `slug` = 'marshmallow-althaea-officinalis'
UNION ALL SELECT `id`, 16 FROM `trees` WHERE `slug` = 'marshmallow-althaea-officinalis'
UNION ALL SELECT `id`, 11 FROM `trees` WHERE `slug` = 'marshmallow-althaea-officinalis'
UNION ALL SELECT `id`, 5 FROM `trees` WHERE `slug` = 'marshmallow-althaea-officinalis';

INSERT IGNORE INTO `plants_organs_and_tissue` (`tree_id`, `organ_and_tissue_id`)
SELECT `id`, 3 FROM `trees` WHERE `slug` IN ('fireweed-chamerion-angustifolium', 'fireweed')
UNION ALL SELECT `id`, 21 FROM `trees` WHERE `slug` IN ('fireweed-chamerion-angustifolium', 'fireweed')
UNION ALL SELECT `id`, 9 FROM `trees` WHERE `slug` IN ('fireweed-chamerion-angustifolium', 'fireweed')
UNION ALL SELECT `id`, 17 FROM `trees` WHERE `slug` = 'shepherds-purse-capsella-bursa-pastoris'
UNION ALL SELECT `id`, 22 FROM `trees` WHERE `slug` = 'shepherds-purse-capsella-bursa-pastoris'
UNION ALL SELECT `id`, 1 FROM `trees` WHERE `slug` = 'marshmallow-althaea-officinalis'
UNION ALL SELECT `id`, 18 FROM `trees` WHERE `slug` = 'marshmallow-althaea-officinalis'
UNION ALL SELECT `id`, 3 FROM `trees` WHERE `slug` = 'marshmallow-althaea-officinalis'
UNION ALL SELECT `id`, 9 FROM `trees` WHERE `slug` = 'marshmallow-althaea-officinalis'
UNION ALL SELECT `id`, 21 FROM `trees` WHERE `slug` = 'marshmallow-althaea-officinalis';
