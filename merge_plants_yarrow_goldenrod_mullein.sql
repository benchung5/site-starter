-- Yarrow (`yarrow`): merge only — always replaces `body`; other `trees` columns filled only when empty (NULL/blank). Does not change `slug`, `common_name`, or any taxonomy columns.
-- Goldenrod (`goldenrod`), Mullein (`mullein`): insert row if missing, then same merge UPDATEs + INSERT IGNORE on junction/`plants_*` tables.
-- Reference lookup IDs from `test1_db (4).sql`; `Verbascum` genus is added if missing (uses `family_id` 98 = Verbenaceae in that dump — adjust if your live DB maps mullein differently).
-- Zone “3” → `zone_id` 4 per prior scripts.

SET NAMES utf8mb4;

INSERT INTO `genuses` (`id`, `name`, `family_id`)
SELECT (SELECT IFNULL(MAX(`g2`.`id`), 0) + 1 FROM `genuses` `g2`), 'Verbascum', 98
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM `genuses` `g` WHERE `g`.`name` = 'Verbascum' LIMIT 1);

INSERT INTO `trees` (`id`, `slug`, `common_name`, `other_common_names`, `genus_id`, `specific_epithet`, `other_species`, `subspecies`, `variety`, `cultivar`, `zone_id`, `reproduction_type_id`, `height_min`, `height_max`, `width_min`, `width_max`, `growth_rate`, `lifespan_min`, `lifespan_max`, `seeds_packet`, `seeds_gram`, `cost_gram`, `dormancy_treatment_id`, `growing_instructions`, `body`, `special_chemistry`, `signature`, `precautions`, `combinations`, `chinese_medicine`, `medicinal_species`, `images`, `mode_id`, `folk_use`)
SELECT (SELECT IFNULL(MAX(`t2`.`id`), 0) + 1 FROM `trees` `t2`), 'goldenrod', 'Goldenrod', '', (SELECT `id` FROM `genuses` WHERE `name` = 'Solidago' LIMIT 1), 'spp.', '', '', '', '', 4, 0, 2, 6, 1, 3, 'fast', 5, 20, NULL, NULL, NULL, '2', 'Goldenrod grows easily in full sun and well-drained soils. Seeds benefit from cold stratification. It spreads readily and can form large colonies.', '<p>Goldenrod (<em>Solidago spp.</em>) is a bright and abundant perennial known for its tall stems and clusters of vivid yellow flowers that bloom in late summer and early fall. It is a common sight in meadows, fields, and open landscapes, where it provides an important nectar source for pollinators.</p>\r\n\r\n<p>The plant grows vigorously and can form large stands, contributing to the structure and biodiversity of natural ecosystems. Its upright form and late-season flowering make it a key species for supporting insects as other plants begin to fade.</p>\r\n\r\n<p>Goldenrod has a long history of use in traditional herbal practices, particularly in relation to the urinary system. It has been valued for supporting kidney and bladder function, as well as for its role in addressing seasonal imbalances.</p>\r\n\r\n<p>Despite often being blamed for seasonal allergies, goldenrod is not typically responsible, as its pollen is too heavy to travel far in the air. Instead, it plays a beneficial ecological role while also maintaining a place in herbal traditions as a supportive and restorative plant.</p>', NULL, NULL, 'Generally safe. Often mistaken for ragweed but does not typically cause allergies.', 'Often combined with nettle or cleavers for urinary support, and with elderflower for respiratory blends.', 'Not a classical TCM herb.', 'Solidago canadensis, Solidago virgaurea', '[]', NULL, 'Goldenrod has been traditionally used to support urinary health and reduce inflammation. It has also been used for seasonal respiratory issues.'
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM `trees` `t` WHERE `t`.`slug` = 'goldenrod' LIMIT 1);

INSERT INTO `trees` (`id`, `slug`, `common_name`, `other_common_names`, `genus_id`, `specific_epithet`, `other_species`, `subspecies`, `variety`, `cultivar`, `zone_id`, `reproduction_type_id`, `height_min`, `height_max`, `width_min`, `width_max`, `growth_rate`, `lifespan_min`, `lifespan_max`, `seeds_packet`, `seeds_gram`, `cost_gram`, `dormancy_treatment_id`, `growing_instructions`, `body`, `special_chemistry`, `signature`, `precautions`, `combinations`, `chinese_medicine`, `medicinal_species`, `images`, `mode_id`, `folk_use`)
SELECT (SELECT IFNULL(MAX(`t2`.`id`), 0) + 1 FROM `trees` `t2`), 'mullein', 'Mullein', 'Common mullein, great mullein', (SELECT `id` FROM `genuses` WHERE `name` = 'Verbascum' LIMIT 1), 'thapsus', '', '', '', '', 4, 0, 2, 7, 1, 2, 'fast', 2, 2, NULL, NULL, NULL, '2', 'Mullein prefers full sun and well-drained soil. Seeds require light to germinate and benefit from cold stratification. It often self-seeds and thrives in poor soils.', '<p>Mullein (<em>Verbascum thapsus</em>) is a distinctive biennial plant known for its tall flowering spike and soft, woolly leaves. In its first year, it forms a low-growing rosette of thick, fuzzy leaves that spread close to the ground. In its second year, it sends up a tall central stalk covered in small yellow flowers.</p>\r\n\r\n<p>The plant thrives in disturbed soils and open, sunny areas, often appearing in roadsides and fields. Its ability to grow in poor soil conditions makes it a resilient and widely distributed species.</p>\r\n\r\n<p>Mullein has a long history of use as a respiratory herb, valued for its soothing and protective qualities. The leaves and flowers have been used to support lung health and ease irritation, particularly in cases of cough and dryness.</p>\r\n\r\n<p>With its tall, striking form and soft-textured foliage, mullein stands out in the landscape while also maintaining a strong connection to traditional herbal practices focused on supporting the respiratory system.</p>', NULL, NULL, 'Leaves may irritate the throat if not properly strained due to fine hairs.', 'Often combined with coltsfoot, licorice, or thyme for respiratory support.', 'Not a classical TCM herb.', 'Verbascum thapsus', '[]', NULL, 'Mullein has been widely used for respiratory support, particularly for coughs and lung irritation. It has been used as a soothing herb for the respiratory tract.'
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM `trees` `t` WHERE `t`.`slug` = 'mullein' LIMIT 1);

-- --- Yarrow: body always replaced; other columns only when empty ---
UPDATE `trees` SET
  `body` = '<p>Yarrow (<em>Achillea millefolium</em>) is a resilient and widely distributed perennial known for its finely divided, feathery leaves and clusters of small white flowers. It thrives in open, sunny environments such as meadows and roadsides, where it spreads easily and forms dense patches over time.</p>\r\n\r\n<p>This plant has a long-standing reputation as a foundational medicinal herb across many cultures. Traditionally, it has been used as a wound herb, applied fresh to cuts to help stop bleeding and support tissue repair. Its historical association with battlefield use reflects this role, and it continues to be recognized for its relationship with the skin and circulatory system.</p>\r\n\r\n<p>Yarrow also demonstrates a broad range of internal actions. It has been used to support digestion through its bitter and aromatic qualities, helping to stimulate digestive processes and ease discomfort. Its influence on circulation allows it to act as both a warming and cooling herb—encouraging blood flow while also helping the body regulate temperature through sweating during fevers.</p>\r\n\r\n<p>In addition, yarrow has been associated with supporting the cardiovascular system and maintaining healthy vascular tone, while also being used traditionally for menstrual regulation and mild nervous system support.</p>\r\n\r\n<p>With its ability to act across multiple systems—particularly the skin, blood, and digestion—yarrow represents a highly versatile herb, balancing movement and protection within the body while remaining deeply connected to its ecological role in open landscapes.</p>',
  `other_common_names` = IF(TRIM(COALESCE(`other_common_names`, '')) = '', 'Common yarrow, milfoil', `other_common_names`),
  `height_min` = COALESCE(`height_min`, 1),
  `height_max` = COALESCE(`height_max`, 3),
  `width_min` = COALESCE(`width_min`, 1),
  `width_max` = COALESCE(`width_max`, 3),
  `growth_rate` = COALESCE(`growth_rate`, 'fast'),
  `lifespan_min` = COALESCE(`lifespan_min`, 5),
  `lifespan_max` = COALESCE(`lifespan_max`, 20),
  `zone_id` = COALESCE(`zone_id`, 4),
  `dormancy_treatment_id` = IF(`dormancy_treatment_id` IS NULL OR TRIM(`dormancy_treatment_id`) = '', '2', `dormancy_treatment_id`),
  `growing_instructions` = IF(TRIM(COALESCE(`growing_instructions`, '')) = '', 'Yarrow grows easily in full sun and well-drained soil. Seeds benefit from cold stratification. It is drought tolerant and spreads readily, forming colonies through rhizomes.', `growing_instructions`),
  `folk_use` = IF(TRIM(COALESCE(`folk_use`, '')) = '', 'Yarrow has been widely used as a wound herb, traditionally applied to cuts to help stop bleeding and support healing. It has also been used for fevers, digestive issues, and menstrual regulation.', `folk_use`),
  `chinese_medicine` = IF(TRIM(COALESCE(`chinese_medicine`, '')) = '', 'Not a classical TCM herb, though its ability to move blood and regulate heat aligns with similar functional categories.', `chinese_medicine`),
  `combinations` = IF(TRIM(COALESCE(`combinations`, '')) = '', 'Often combined with elderflower or peppermint for fevers, and with chamomile for digestion.', `combinations`),
  `precautions` = IF(TRIM(COALESCE(`precautions`, '')) = '', 'Avoid during pregnancy. May cause sensitivity in some individuals.', `precautions`),
  `medicinal_species` = IF(TRIM(COALESCE(`medicinal_species`, '')) = '', 'Achillea millefolium', `medicinal_species`)
WHERE `slug` = 'yarrow';

UPDATE `trees` SET
  `body` = '<p>Goldenrod (<em>Solidago spp.</em>) is a bright and abundant perennial known for its tall stems and clusters of vivid yellow flowers that bloom in late summer and early fall. It is a common sight in meadows, fields, and open landscapes, where it provides an important nectar source for pollinators.</p>\r\n\r\n<p>The plant grows vigorously and can form large stands, contributing to the structure and biodiversity of natural ecosystems. Its upright form and late-season flowering make it a key species for supporting insects as other plants begin to fade.</p>\r\n\r\n<p>Goldenrod has a long history of use in traditional herbal practices, particularly in relation to the urinary system. It has been valued for supporting kidney and bladder function, as well as for its role in addressing seasonal imbalances.</p>\r\n\r\n<p>Despite often being blamed for seasonal allergies, goldenrod is not typically responsible, as its pollen is too heavy to travel far in the air. Instead, it plays a beneficial ecological role while also maintaining a place in herbal traditions as a supportive and restorative plant.</p>',
  `other_common_names` = IF(TRIM(COALESCE(`other_common_names`, '')) = '', '', `other_common_names`),
  `height_min` = COALESCE(`height_min`, 2),
  `height_max` = COALESCE(`height_max`, 6),
  `width_min` = COALESCE(`width_min`, 1),
  `width_max` = COALESCE(`width_max`, 3),
  `growth_rate` = COALESCE(`growth_rate`, 'fast'),
  `lifespan_min` = COALESCE(`lifespan_min`, 5),
  `lifespan_max` = COALESCE(`lifespan_max`, 20),
  `zone_id` = COALESCE(`zone_id`, 4),
  `dormancy_treatment_id` = IF(`dormancy_treatment_id` IS NULL OR TRIM(`dormancy_treatment_id`) = '', '2', `dormancy_treatment_id`),
  `growing_instructions` = IF(TRIM(COALESCE(`growing_instructions`, '')) = '', 'Goldenrod grows easily in full sun and well-drained soils. Seeds benefit from cold stratification. It spreads readily and can form large colonies.', `growing_instructions`),
  `folk_use` = IF(TRIM(COALESCE(`folk_use`, '')) = '', 'Goldenrod has been traditionally used to support urinary health and reduce inflammation. It has also been used for seasonal respiratory issues.', `folk_use`),
  `chinese_medicine` = IF(TRIM(COALESCE(`chinese_medicine`, '')) = '', 'Not a classical TCM herb.', `chinese_medicine`),
  `combinations` = IF(TRIM(COALESCE(`combinations`, '')) = '', 'Often combined with nettle or cleavers for urinary support, and with elderflower for respiratory blends.', `combinations`),
  `precautions` = IF(TRIM(COALESCE(`precautions`, '')) = '', 'Generally safe. Often mistaken for ragweed but does not typically cause allergies.', `precautions`),
  `medicinal_species` = IF(TRIM(COALESCE(`medicinal_species`, '')) = '', 'Solidago canadensis, Solidago virgaurea', `medicinal_species`)
WHERE `slug` = 'goldenrod';

UPDATE `trees` SET
  `body` = '<p>Mullein (<em>Verbascum thapsus</em>) is a distinctive biennial plant known for its tall flowering spike and soft, woolly leaves. In its first year, it forms a low-growing rosette of thick, fuzzy leaves that spread close to the ground. In its second year, it sends up a tall central stalk covered in small yellow flowers.</p>\r\n\r\n<p>The plant thrives in disturbed soils and open, sunny areas, often appearing in roadsides and fields. Its ability to grow in poor soil conditions makes it a resilient and widely distributed species.</p>\r\n\r\n<p>Mullein has a long history of use as a respiratory herb, valued for its soothing and protective qualities. The leaves and flowers have been used to support lung health and ease irritation, particularly in cases of cough and dryness.</p>\r\n\r\n<p>With its tall, striking form and soft-textured foliage, mullein stands out in the landscape while also maintaining a strong connection to traditional herbal practices focused on supporting the respiratory system.</p>',
  `other_common_names` = IF(TRIM(COALESCE(`other_common_names`, '')) = '', 'Common mullein, great mullein', `other_common_names`),
  `height_min` = COALESCE(`height_min`, 2),
  `height_max` = COALESCE(`height_max`, 7),
  `width_min` = COALESCE(`width_min`, 1),
  `width_max` = COALESCE(`width_max`, 2),
  `growth_rate` = COALESCE(`growth_rate`, 'fast'),
  `lifespan_min` = COALESCE(`lifespan_min`, 2),
  `lifespan_max` = COALESCE(`lifespan_max`, 2),
  `zone_id` = COALESCE(`zone_id`, 4),
  `dormancy_treatment_id` = IF(`dormancy_treatment_id` IS NULL OR TRIM(`dormancy_treatment_id`) = '', '2', `dormancy_treatment_id`),
  `growing_instructions` = IF(TRIM(COALESCE(`growing_instructions`, '')) = '', 'Mullein prefers full sun and well-drained soil. Seeds require light to germinate and benefit from cold stratification. It often self-seeds and thrives in poor soils.', `growing_instructions`),
  `folk_use` = IF(TRIM(COALESCE(`folk_use`, '')) = '', 'Mullein has been widely used for respiratory support, particularly for coughs and lung irritation. It has been used as a soothing herb for the respiratory tract.', `folk_use`),
  `chinese_medicine` = IF(TRIM(COALESCE(`chinese_medicine`, '')) = '', 'Not a classical TCM herb.', `chinese_medicine`),
  `combinations` = IF(TRIM(COALESCE(`combinations`, '')) = '', 'Often combined with coltsfoot, licorice, or thyme for respiratory support.', `combinations`),
  `precautions` = IF(TRIM(COALESCE(`precautions`, '')) = '', 'Leaves may irritate the throat if not properly strained due to fine hairs.', `precautions`),
  `medicinal_species` = IF(TRIM(COALESCE(`medicinal_species`, '')) = '', 'Verbascum thapsus', `medicinal_species`)
WHERE `slug` = 'mullein';

INSERT IGNORE INTO `trees_categories` (`tree_id`, `trees_category_id`)
SELECT `id`, 7 FROM `trees` WHERE `slug` IN ('yarrow', 'goldenrod', 'mullein');

INSERT IGNORE INTO `trees_native_to` (`tree_id`, `native_to_id`)
SELECT `id`, 5 FROM `trees` WHERE `slug` = 'yarrow'
UNION ALL SELECT `id`, 4 FROM `trees` WHERE `slug` = 'yarrow'
UNION ALL SELECT `id`, 1 FROM `trees` WHERE `slug` = 'yarrow'
UNION ALL SELECT `id`, 2 FROM `trees` WHERE `slug` = 'yarrow'
UNION ALL SELECT `id`, 3 FROM `trees` WHERE `slug` = 'yarrow'
UNION ALL SELECT `id`, 1 FROM `trees` WHERE `slug` = 'goldenrod'
UNION ALL SELECT `id`, 2 FROM `trees` WHERE `slug` = 'goldenrod'
UNION ALL SELECT `id`, 3 FROM `trees` WHERE `slug` = 'goldenrod'
UNION ALL SELECT `id`, 5 FROM `trees` WHERE `slug` = 'mullein'
UNION ALL SELECT `id`, 4 FROM `trees` WHERE `slug` = 'mullein'
UNION ALL SELECT `id`, 1 FROM `trees` WHERE `slug` = 'mullein'
UNION ALL SELECT `id`, 2 FROM `trees` WHERE `slug` = 'mullein'
UNION ALL SELECT `id`, 3 FROM `trees` WHERE `slug` = 'mullein';

INSERT IGNORE INTO `trees_natural_habitat` (`tree_id`, `natural_habitat_id`)
SELECT `id`, 3 FROM `trees` WHERE `slug` = 'yarrow'
UNION ALL SELECT `id`, 4 FROM `trees` WHERE `slug` = 'yarrow'
UNION ALL SELECT `id`, 15 FROM `trees` WHERE `slug` = 'yarrow'
UNION ALL SELECT `id`, 3 FROM `trees` WHERE `slug` = 'goldenrod'
UNION ALL SELECT `id`, 4 FROM `trees` WHERE `slug` = 'goldenrod'
UNION ALL SELECT `id`, 4 FROM `trees` WHERE `slug` = 'mullein'
UNION ALL SELECT `id`, 15 FROM `trees` WHERE `slug` = 'mullein';

INSERT IGNORE INTO `trees_light` (`tree_id`, `light_id`)
SELECT `id`, 1 FROM `trees` WHERE `slug` IN ('yarrow', 'goldenrod', 'mullein');

INSERT IGNORE INTO `trees_shapes` (`tree_id`, `shape_id`)
SELECT `id`, 15 FROM `trees` WHERE `slug` IN ('yarrow', 'goldenrod', 'mullein')
UNION ALL SELECT `id`, 10 FROM `trees` WHERE `slug` = 'yarrow'
UNION ALL SELECT `id`, 9 FROM `trees` WHERE `slug` IN ('goldenrod', 'mullein');

INSERT IGNORE INTO `trees_soil` (`tree_id`, `soil_id`)
SELECT `id`, 2 FROM `trees` WHERE `slug` IN ('yarrow', 'goldenrod', 'mullein')
UNION ALL SELECT `id`, 12 FROM `trees` WHERE `slug` IN ('yarrow', 'goldenrod', 'mullein')
UNION ALL SELECT `id`, 5 FROM `trees` WHERE `slug` IN ('yarrow', 'goldenrod', 'mullein')
UNION ALL SELECT `id`, 17 FROM `trees` WHERE `slug` IN ('yarrow', 'goldenrod', 'mullein');

INSERT IGNORE INTO `trees_eco_benefits` (`tree_id`, `eco_benefit_id`)
SELECT `id`, 6 FROM `trees` WHERE `slug` IN ('yarrow', 'goldenrod', 'mullein')
UNION ALL SELECT `id`, 1 FROM `trees` WHERE `slug` IN ('yarrow', 'goldenrod');

INSERT IGNORE INTO `trees_common_uses` (`tree_id`, `common_use_id`)
SELECT `id`, 4 FROM `trees` WHERE `slug` IN ('yarrow', 'goldenrod', 'mullein')
UNION ALL SELECT `id`, 7 FROM `trees` WHERE `slug` IN ('yarrow', 'goldenrod', 'mullein')
UNION ALL SELECT `id`, 9 FROM `trees` WHERE `slug` = 'yarrow';

INSERT IGNORE INTO `trees_unique_attractions` (`tree_id`, `unique_attraction_id`)
SELECT `id`, 4 FROM `trees` WHERE `slug` IN ('yarrow', 'goldenrod', 'mullein')
UNION ALL SELECT `id`, 2 FROM `trees` WHERE `slug` = 'mullein';

INSERT IGNORE INTO `trees_tolerances` (`tree_id`, `tolerance_id`)
SELECT `id`, 8 FROM `trees` WHERE `slug` IN ('yarrow', 'goldenrod');

INSERT IGNORE INTO `trees_transplanting` (`tree_id`, `transplanting_id`)
SELECT `id`, 1 FROM `trees` WHERE `slug` IN ('yarrow', 'goldenrod')
UNION ALL SELECT `id`, 2 FROM `trees` WHERE `slug` = 'mullein';

INSERT IGNORE INTO `plants_moisture` (`tree_id`, `moisture_id`)
SELECT `id`, 1 FROM `trees` WHERE `slug` IN ('yarrow', 'goldenrod')
UNION ALL SELECT `id`, 2 FROM `trees` WHERE `slug` = 'mullein';

INSERT IGNORE INTO `plants_tastes` (`tree_id`, `taste_id`)
SELECT `id`, 1 FROM `trees` WHERE `slug` IN ('yarrow', 'goldenrod', 'mullein')
UNION ALL SELECT `id`, 6 FROM `trees` WHERE `slug` IN ('yarrow', 'goldenrod')
UNION ALL SELECT `id`, 5 FROM `trees` WHERE `slug` = 'yarrow'
UNION ALL SELECT `id`, 2 FROM `trees` WHERE `slug` = 'mullein';

INSERT IGNORE INTO `plants_organ_systems` (`tree_id`, `organ_system_id`)
SELECT `id`, 1 FROM `trees` WHERE `slug` = 'yarrow'
UNION ALL SELECT `id`, 2 FROM `trees` WHERE `slug` = 'yarrow'
UNION ALL SELECT `id`, 11 FROM `trees` WHERE `slug` = 'yarrow'
UNION ALL SELECT `id`, 14 FROM `trees` WHERE `slug` = 'yarrow'
UNION ALL SELECT `id`, 7 FROM `trees` WHERE `slug` = 'goldenrod'
UNION ALL SELECT `id`, 4 FROM `trees` WHERE `slug` = 'goldenrod'
UNION ALL SELECT `id`, 4 FROM `trees` WHERE `slug` = 'mullein';

INSERT IGNORE INTO `plants_thermal_nature` (`tree_id`, `thermal_nature_id`)
SELECT `id`, 5 FROM `trees` WHERE `slug` IN ('yarrow', 'goldenrod')
UNION ALL SELECT `id`, 2 FROM `trees` WHERE `slug` = 'mullein';

INSERT IGNORE INTO `plants_parts_used` (`tree_id`, `parts_used_id`)
SELECT `id`, 5 FROM `trees` WHERE `slug` IN ('yarrow', 'goldenrod', 'mullein')
UNION ALL SELECT `id`, 6 FROM `trees` WHERE `slug` IN ('yarrow', 'goldenrod', 'mullein')
UNION ALL SELECT `id`, 2 FROM `trees` WHERE `slug` = 'goldenrod';

INSERT IGNORE INTO `plants_preparations` (`tree_id`, `preparation_id`)
SELECT `id`, 6 FROM `trees` WHERE `slug` IN ('yarrow', 'goldenrod', 'mullein')
UNION ALL SELECT `id`, 7 FROM `trees` WHERE `slug` IN ('yarrow', 'goldenrod', 'mullein')
UNION ALL SELECT `id`, 17 FROM `trees` WHERE `slug` = 'yarrow'
UNION ALL SELECT `id`, 12 FROM `trees` WHERE `slug` = 'yarrow'
UNION ALL SELECT `id`, 4 FROM `trees` WHERE `slug` = 'mullein';

INSERT IGNORE INTO `plants_organs_and_tissue` (`tree_id`, `organ_and_tissue_id`)
SELECT `id`, 22 FROM `trees` WHERE `slug` = 'yarrow'
UNION ALL SELECT `id`, 21 FROM `trees` WHERE `slug` = 'yarrow'
UNION ALL SELECT `id`, 4 FROM `trees` WHERE `slug` = 'yarrow'
UNION ALL SELECT `id`, 9 FROM `trees` WHERE `slug` = 'goldenrod'
UNION ALL SELECT `id`, 10 FROM `trees` WHERE `slug` = 'goldenrod'
UNION ALL SELECT `id`, 1 FROM `trees` WHERE `slug` = 'goldenrod'
UNION ALL SELECT `id`, 18 FROM `trees` WHERE `slug` = 'goldenrod'
UNION ALL SELECT `id`, 1 FROM `trees` WHERE `slug` = 'mullein'
UNION ALL SELECT `id`, 18 FROM `trees` WHERE `slug` = 'mullein';
