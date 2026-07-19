START TRANSACTION;

-- ---------------------------------------------------------------------------
-- Family + genus: Nymphaeaceae / Nuphar
-- ---------------------------------------------------------------------------
INSERT INTO families (id, name)
SELECT COALESCE((SELECT MAX(id) FROM families), 0) + 1, 'Nymphaeaceae'
WHERE NOT EXISTS (SELECT 1 FROM families WHERE name = 'Nymphaeaceae');

SET @family_id := (SELECT id FROM families WHERE name = 'Nymphaeaceae' LIMIT 1);

INSERT INTO genuses (name, family_id)
SELECT 'Nuphar', @family_id
WHERE NOT EXISTS (SELECT 1 FROM genuses WHERE name = 'Nuphar');

SET @genus_id := (SELECT id FROM genuses WHERE name = 'Nuphar' LIMIT 1);

-- ---------------------------------------------------------------------------
-- Missing lookups (create if needed)
-- ---------------------------------------------------------------------------
INSERT INTO trees_category (id, slug, name)
SELECT COALESCE((SELECT MAX(id) FROM trees_category), 0) + 1, 'aquatic-plants', 'Aquatic Plants'
WHERE NOT EXISTS (SELECT 1 FROM trees_category WHERE name = 'Aquatic Plants');

INSERT INTO eco_benefits (id, slug, name)
SELECT COALESCE((SELECT MAX(id) FROM eco_benefits), 0) + 1, 'aquatic-habitat', 'aquatic habitat'
WHERE NOT EXISTS (SELECT 1 FROM eco_benefits WHERE name = 'aquatic habitat');

INSERT INTO eco_benefits (id, slug, name)
SELECT COALESCE((SELECT MAX(id) FROM eco_benefits), 0) + 1, 'supports-pollinators', 'supports pollinators'
WHERE NOT EXISTS (SELECT 1 FROM eco_benefits WHERE name = 'supports pollinators');

INSERT INTO eco_benefits (id, slug, name)
SELECT COALESCE((SELECT MAX(id) FROM eco_benefits), 0) + 1, 'wildlife-food', 'wildlife food'
WHERE NOT EXISTS (SELECT 1 FROM eco_benefits WHERE name = 'wildlife food');

INSERT INTO native_to (id, slug, name)
SELECT COALESCE((SELECT MAX(id) FROM native_to), 0) + 1, 'north-america', 'North America'
WHERE NOT EXISTS (SELECT 1 FROM native_to WHERE name = 'North America');

INSERT INTO natural_habitat (id, slug, name)
SELECT COALESCE((SELECT MAX(id) FROM natural_habitat), 0) + 1, 'ponds', 'ponds'
WHERE NOT EXISTS (SELECT 1 FROM natural_habitat WHERE name = 'ponds');

INSERT INTO natural_habitat (id, slug, name)
SELECT COALESCE((SELECT MAX(id) FROM natural_habitat), 0) + 1, 'lakes', 'lakes'
WHERE NOT EXISTS (SELECT 1 FROM natural_habitat WHERE name = 'lakes');

INSERT INTO natural_habitat (id, slug, name)
SELECT COALESCE((SELECT MAX(id) FROM natural_habitat), 0) + 1, 'slow-moving-rivers', 'slow-moving rivers'
WHERE NOT EXISTS (SELECT 1 FROM natural_habitat WHERE name = 'slow-moving rivers');

INSERT INTO natural_habitat (id, slug, name)
SELECT COALESCE((SELECT MAX(id) FROM natural_habitat), 0) + 1, 'marshes', 'marshes'
WHERE NOT EXISTS (SELECT 1 FROM natural_habitat WHERE name = 'marshes');

INSERT INTO natural_habitat (id, slug, name)
SELECT COALESCE((SELECT MAX(id) FROM natural_habitat), 0) + 1, 'wetlands', 'wetlands'
WHERE NOT EXISTS (SELECT 1 FROM natural_habitat WHERE name = 'wetlands');

INSERT INTO shapes (id, slug, name)
SELECT COALESCE((SELECT MAX(id) FROM shapes), 0) + 1, 'floating', 'floating'
WHERE NOT EXISTS (SELECT 1 FROM shapes WHERE name = 'floating');

INSERT INTO shapes (id, slug, name)
SELECT COALESCE((SELECT MAX(id) FROM shapes), 0) + 1, 'colony', 'colony'
WHERE NOT EXISTS (SELECT 1 FROM shapes WHERE name = 'colony');

INSERT INTO soil (id, slug, name)
SELECT COALESCE((SELECT MAX(id) FROM soil), 0) + 1, 'rich-organic', 'rich organic'
WHERE NOT EXISTS (SELECT 1 FROM soil WHERE name = 'rich organic');

INSERT INTO soil (id, slug, name)
SELECT COALESCE((SELECT MAX(id) FROM soil), 0) + 1, 'mucky', 'mucky'
WHERE NOT EXISTS (SELECT 1 FROM soil WHERE name = 'mucky');

INSERT INTO soil (id, slug, name)
SELECT COALESCE((SELECT MAX(id) FROM soil), 0) + 1, 'clay', 'clay'
WHERE NOT EXISTS (SELECT 1 FROM soil WHERE name = 'clay');

INSERT INTO soil (id, slug, name)
SELECT COALESCE((SELECT MAX(id) FROM soil), 0) + 1, 'submerged-aquatic-soil', 'submerged aquatic soil'
WHERE NOT EXISTS (SELECT 1 FROM soil WHERE name = 'submerged aquatic soil');

INSERT INTO common_uses (id, slug, name)
SELECT COALESCE((SELECT MAX(id) FROM common_uses), 0) + 1, 'wildlife-ponds', 'wildlife ponds'
WHERE NOT EXISTS (SELECT 1 FROM common_uses WHERE name = 'wildlife ponds');

INSERT INTO common_uses (id, slug, name)
SELECT COALESCE((SELECT MAX(id) FROM common_uses), 0) + 1, 'naturalized-wetlands', 'naturalized wetlands'
WHERE NOT EXISTS (SELECT 1 FROM common_uses WHERE name = 'naturalized wetlands');

INSERT INTO common_uses (id, slug, name)
SELECT COALESCE((SELECT MAX(id) FROM common_uses), 0) + 1, 'restoration-planting', 'restoration planting'
WHERE NOT EXISTS (SELECT 1 FROM common_uses WHERE name = 'restoration planting');

INSERT INTO transplanting (id, name)
SELECT COALESCE((SELECT MAX(id) FROM transplanting), 0) + 1, 'moderate'
WHERE NOT EXISTS (SELECT 1 FROM transplanting WHERE name = 'moderate');

INSERT INTO unique_attractions (id, name)
SELECT COALESCE((SELECT MAX(id) FROM unique_attractions), 0) + 1, 'floating leaves'
WHERE NOT EXISTS (SELECT 1 FROM unique_attractions WHERE name = 'floating leaves');

INSERT INTO unique_attractions (id, name)
SELECT COALESCE((SELECT MAX(id) FROM unique_attractions), 0) + 1, 'wildlife value'
WHERE NOT EXISTS (SELECT 1 FROM unique_attractions WHERE name = 'wildlife value');

INSERT INTO tolerances (id, slug, name)
SELECT COALESCE((SELECT MAX(id) FROM tolerances), 0) + 1, 'flood-tolerant', 'flood tolerant'
WHERE NOT EXISTS (SELECT 1 FROM tolerances WHERE name = 'flood tolerant');

INSERT INTO tolerances (id, slug, name)
SELECT COALESCE((SELECT MAX(id) FROM tolerances), 0) + 1, 'cold-hardy', 'cold hardy'
WHERE NOT EXISTS (SELECT 1 FROM tolerances WHERE name = 'cold hardy');

INSERT INTO parts_used (id, name)
SELECT COALESCE((SELECT MAX(id) FROM parts_used), 0) + 1, 'rhizomes'
WHERE NOT EXISTS (SELECT 1 FROM parts_used WHERE name = 'rhizomes');

INSERT INTO preparations (id, name)
SELECT COALESCE((SELECT MAX(id) FROM preparations), 0) + 1, 'poultice'
WHERE NOT EXISTS (SELECT 1 FROM preparations WHERE name = 'poultice');

INSERT INTO organs_and_tissue (id, name)
SELECT COALESCE((SELECT MAX(id) FROM organs_and_tissue), 0) + 1, 'digestive tract'
WHERE NOT EXISTS (SELECT 1 FROM organs_and_tissue WHERE name = 'digestive tract');

INSERT INTO organs_and_tissue (id, name)
SELECT COALESCE((SELECT MAX(id) FROM organs_and_tissue), 0) + 1, 'skin'
WHERE NOT EXISTS (SELECT 1 FROM organs_and_tissue WHERE name = 'skin');

INSERT INTO organs_and_tissue (id, name)
SELECT COALESCE((SELECT MAX(id) FROM organs_and_tissue), 0) + 1, 'reproductive tissues'
WHERE NOT EXISTS (SELECT 1 FROM organs_and_tissue WHERE name = 'reproductive tissues');

INSERT INTO dormancy_treatments (id, name)
SELECT COALESCE((SELECT MAX(id) FROM dormancy_treatments), 0) + 1, 'None required'
WHERE NOT EXISTS (SELECT 1 FROM dormancy_treatments WHERE name = 'None required');

SET @dormancy_id := (SELECT id FROM dormancy_treatments WHERE name = 'None required' LIMIT 1);
SET @category_id := (SELECT id FROM trees_category WHERE name = 'Aquatic Plants' LIMIT 1);

-- Long text fields
SET @growing_instructions := '<p>Yellow pond lily is a hardy aquatic perennial that grows naturally in shallow ponds, marshes, slow-moving streams and sheltered lake margins. Thick creeping rhizomes anchor the plant securely within soft organic sediments while long leaf stalks carry floating heart-shaped leaves to the water''s surface. Plants thrive in full sun but tolerate partial shade, provided they receive several hours of direct light each day. Calm water between six inches and six feet deep provides ideal growing conditions.</p>

<p>Propagation is most commonly achieved by dividing rhizomes during spring before vigorous growth begins. Each division should retain healthy buds and several roots before being replanted into heavy aquatic soil or submerged clay. Fresh seed may also be sown immediately after collection, although vegetative division establishes much more rapidly. Once established, colonies gradually expand through creeping rhizomes, stabilizing pond sediments while providing valuable habitat for aquatic wildlife.</p>

<p>The bright yellow cup-shaped flowers bloom throughout summer and attract numerous native pollinating insects. Floating leaves provide shade for fish, amphibians and aquatic invertebrates while helping moderate water temperature. Medicinal rhizomes are traditionally harvested during late summer or autumn when stored nutrients have accumulated. Because aquatic ecosystems are easily disturbed, harvesting should always be conservative, leaving large portions of each colony intact to ensure continued ecological health.</p>';

SET @folk_use := '<p>Yellow pond lily has been used medicinally for centuries by Indigenous peoples throughout North America and by traditional herbalists in Europe and Asia. The thick rhizomes were commonly prepared as decoctions to address digestive disturbances, while poultices made from fresh plant material were applied externally to minor wounds, skin irritations and inflammatory conditions. The plant''s pronounced astringency also led to its traditional use for helping tone tissues and reduce excessive secretions.</p>

<p>Several Indigenous nations valued the rhizomes as both food and medicine after careful preparation to reduce bitterness. The nutritious seeds were also collected and roasted or ground into flour in some regions. Herbalists frequently reserved the plant for situations requiring a strongly astringent botanical, particularly where soothing and tissue toning were desired simultaneously. Although highly respected, yellow pond lily was generally used with moderation because of its potent constituents.</p>

<p>Today, yellow pond lily is encountered more frequently in ecological restoration and native wetland conservation than in everyday herbal practice. Nevertheless, it remains an important traditional medicinal plant whose history reflects the close relationship between healthy aquatic ecosystems and Indigenous botanical knowledge.</p>';

SET @chinese_medicine := '<p>Yellow pond lily (<em>Nuphar</em> spp.) is not a traditional herb of the classical Chinese Materia Medica and has no established place within ancient Traditional Chinese Medicine. Although species of <em>Nuphar</em> occur naturally throughout parts of Asia, Europe and North America, they were never incorporated into the core TCM pharmacopoeia. Their medicinal reputation instead developed independently among Indigenous peoples of North America and within various European folk traditions. Consequently, there are no classical channel associations, standard formulas or traditional dosage recommendations recorded for these species.</p>

<p>From a modern energetic perspective, yellow pond lily is considered cool, bitter and strongly astringent, with an affinity for the Stomach, Large Intestine and reproductive tissues. Western herbalists traditionally employed the rhizomes to tone relaxed tissues, reduce excessive secretions and calm inflammatory conditions affecting the digestive tract. Within an integrative framework, these actions resemble the TCM concepts of clearing Damp-Heat, cooling Heat and consolidating leakage. The herb''s cooling, drying nature also reflects its historical use for soothing inflamed mucous membranes and supporting healthy tissue integrity.</p>

<p>Practitioners integrating Western herbs with Traditional Chinese Medicine generally regard yellow pond lily as a specialized astringent rather than a constitutional tonic. When broader patterns of Dampness, Heat or Qi deficiency require treatment, practitioners typically rely upon classical Chinese herbs with far longer histories of documented use. Yellow pond lily therefore remains primarily a traditional North American and European medicinal plant rather than an herb of contemporary integrative practice.</p>';

SET @special_chemistry := '<p>Yellow pond lily rhizomes contain alkaloids including nupharidine, nupharine and related sesquiterpene alkaloids, together with abundant tannins, flavonoids, starches and phenolic compounds. The high tannin content accounts for the plant''s pronounced astringency, while laboratory studies suggest several alkaloids possess antimicrobial and antioxidant activity. The seeds contain carbohydrates, proteins and oils that contributed to their traditional value as a nutritious wild food after proper preparation.</p>';

SET @signature := '<p>Firmly anchored beneath still waters, the thick rhizomes symbolize stability, grounding and quiet resilience. Floating leaves shelter aquatic life while maintaining calm at the water''s surface, reflecting the herb''s traditional ability to soothe inflamed tissues and restore balance. The bright yellow flowers rising above the water suggest vitality emerging from deep, nourishing foundations hidden beneath the surface.</p>';

SET @combinations := '<p>Yellow pond lily has traditionally been combined with other astringent and soothing herbs when supporting irritated mucous membranes or minor skin conditions. External preparations were sometimes blended with demulcent herbs to balance its drying nature. In modern Western herbalism, however, the plant is used relatively infrequently and is generally included as a specialized component within broader formulas rather than as a primary remedy.</p>';

SET @precautions := '<p>Yellow pond lily should be used with moderation because the rhizomes contain biologically active alkaloids as well as significant quantities of tannins. Large doses may cause digestive irritation, nausea or constipation. Medicinal use is not recommended during pregnancy or breastfeeding because adequate safety data are lacking. Harvesting should always be conducted responsibly to avoid damaging sensitive aquatic ecosystems, and only correctly identified <em>Nuphar</em> species should be used, as unrelated aquatic plants may differ greatly in their chemistry and safety.</p>';

SET @body := '<p>Yellow pond lily (<em>Nuphar</em> spp.) is a hardy aquatic perennial in the water lily family (Nymphaeaceae), found throughout the quiet ponds, marshes, lakes and slow-moving rivers of the Northern Hemisphere. In North America, the most widespread medicinal species is <em>Nuphar variegata</em>, while <em>Nuphar lutea</em> fulfills a similar role in Europe. Recognized by their floating heart-shaped leaves and bright yellow cup-shaped flowers, these plants play an essential role in healthy freshwater ecosystems while also possessing a long history of traditional medicinal use. Although less well known today than many terrestrial herbs, yellow pond lilies were valued by Indigenous peoples and early herbalists as important medicinal and food plants, particularly for their nourishing rhizomes and highly astringent properties.</p>

<p>Thick creeping rhizomes anchor the plants securely within soft pond sediments, where they gradually spread to form extensive underwater colonies. Large floating leaves shade the water''s surface, helping regulate water temperature while providing shelter for fish, amphibians, aquatic insects and countless other organisms. During summer, fragrant yellow flowers rise just above the water, attracting bees and a variety of native pollinating insects. As the season progresses, the flowers mature into seed-filled fruits whose nutritious seeds have traditionally been collected as food by several Indigenous cultures after appropriate preparation.</p>

<p>For centuries, Indigenous peoples throughout North America prepared decoctions from the rhizomes to support digestive health, soothe irritated tissues and promote healthy wound healing. Fresh plant material was also applied externally as poultices or washes for minor skin conditions because of its cooling, strongly astringent nature. The cooked rhizomes and roasted seeds additionally served as valuable food sources, especially when other foods were scarce. European herbal traditions similarly recognized yellow pond lily as a tissue-toning herb useful for calming inflammation and reducing excessive secretions, although it was generally employed with moderation because of its potent constituents.</p>

<p>Modern herbalists encounter yellow pond lily less frequently than many classic medicinal herbs, yet it remains an important example of the close relationship between aquatic ecosystems and traditional plant medicine. The rhizomes contain abundant tannins together with distinctive alkaloids that contribute to the plant''s historical medicinal reputation. Today, ethical harvesting is especially important because healthy pond ecosystems are easily disturbed by excessive collection. Conserving natural wetlands while cultivating appropriate medicinal species where practical helps preserve both the remarkable ecological value and the rich ethnobotanical heritage of these distinctive aquatic plants.</p>';

-- ---------------------------------------------------------------------------
-- Insert Yellow Pond Lily if missing
-- ---------------------------------------------------------------------------
INSERT INTO trees (
  slug, common_name, other_common_names, genus_id, specific_epithet,
  zone_id, reproduction_type_id,
  height_min, height_max, width_min, width_max,
  growth_rate, lifespan_min, lifespan_max,
  dormancy_treatment_id,
  growing_instructions, body, special_chemistry, signature, precautions,
  combinations, chinese_medicine, medicinal_species, mode_id, folk_use
)
SELECT
  'yellow-pond-lily',
  'Yellow Pond Lily',
  'Spatterdock, Cow Lily, Yellow Water Lily',
  @genus_id,
  'spp.',
  4,              -- zone 3
  1,              -- monoacious
  1, 3, 3, 10,    -- height_min 0.5 ft stored as 1 (INT)
  'medium',       -- moderate
  20, 100,
  CAST(@dormancy_id AS CHAR),
  @growing_instructions,
  @body,
  @special_chemistry,
  @signature,
  @precautions,
  @combinations,
  @chinese_medicine,
  'Nuphar variegata (North America), Nuphar lutea (Europe)',
  2,              -- live
  @folk_use
WHERE NOT EXISTS (SELECT 1 FROM trees WHERE slug = 'yellow-pond-lily');

SET @tree_id := (SELECT id FROM trees WHERE slug = 'yellow-pond-lily' LIMIT 1);

-- ---------------------------------------------------------------------------
-- If plant already exists: fill only empty scalar fields; always set mode=live
-- ---------------------------------------------------------------------------
UPDATE trees SET
  common_name = IF(common_name IS NULL OR common_name = '', 'Yellow Pond Lily', common_name),
  other_common_names = IF(other_common_names IS NULL OR other_common_names = '', 'Spatterdock, Cow Lily, Yellow Water Lily', other_common_names),
  genus_id = IF(genus_id IS NULL OR genus_id = 0, @genus_id, genus_id),
  specific_epithet = IF(specific_epithet IS NULL OR specific_epithet = '', 'spp.', specific_epithet),
  zone_id = IF(zone_id IS NULL OR zone_id = 0, 4, zone_id),
  reproduction_type_id = IF(reproduction_type_id IS NULL OR reproduction_type_id = 0, 1, reproduction_type_id),
  height_min = IF(height_min IS NULL OR height_min = 0, 1, height_min),
  height_max = IF(height_max IS NULL OR height_max = 0, 3, height_max),
  width_min = IF(width_min IS NULL OR width_min = 0, 3, width_min),
  width_max = IF(width_max IS NULL OR width_max = 0, 10, width_max),
  growth_rate = IF(growth_rate IS NULL OR growth_rate = '', 'medium', growth_rate),
  lifespan_min = IF(lifespan_min IS NULL OR lifespan_min = 0, 20, lifespan_min),
  lifespan_max = IF(lifespan_max IS NULL OR lifespan_max = 0, 100, lifespan_max),
  dormancy_treatment_id = IF(dormancy_treatment_id IS NULL OR dormancy_treatment_id = '', CAST(@dormancy_id AS CHAR), dormancy_treatment_id),
  growing_instructions = IF(growing_instructions IS NULL OR growing_instructions = '', @growing_instructions, growing_instructions),
  body = IF(body IS NULL OR body = '', @body, body),
  special_chemistry = IF(special_chemistry IS NULL OR special_chemistry = '', @special_chemistry, special_chemistry),
  signature = IF(signature IS NULL OR signature = '', @signature, signature),
  precautions = IF(precautions IS NULL OR precautions = '', @precautions, precautions),
  combinations = IF(combinations IS NULL OR combinations = '', @combinations, combinations),
  chinese_medicine = IF(chinese_medicine IS NULL OR chinese_medicine = '', @chinese_medicine, chinese_medicine),
  medicinal_species = IF(medicinal_species IS NULL OR medicinal_species = '', 'Nuphar variegata (North America), Nuphar lutea (Europe)', medicinal_species),
  folk_use = IF(folk_use IS NULL OR folk_use = '', @folk_use, folk_use),
  mode_id = 2
WHERE id = @tree_id;

-- ---------------------------------------------------------------------------
-- Junction rows (add missing only)
-- ---------------------------------------------------------------------------
INSERT INTO trees_categories (tree_id, trees_category_id)
SELECT @tree_id, @category_id
WHERE NOT EXISTS (
  SELECT 1 FROM trees_categories WHERE tree_id = @tree_id AND trees_category_id = @category_id
);

INSERT INTO trees_eco_benefits (tree_id, eco_benefit_id)
SELECT @tree_id, e.id FROM eco_benefits e
WHERE e.name IN ('aquatic habitat', 'supports pollinators', 'wildlife food', 'erosion control', 'medicinal')
AND NOT EXISTS (
  SELECT 1 FROM trees_eco_benefits x WHERE x.tree_id = @tree_id AND x.eco_benefit_id = e.id
);

INSERT INTO trees_native_to (tree_id, native_to_id)
SELECT @tree_id, n.id FROM native_to n
WHERE n.name IN ('North America', 'Europe', 'Asia')
AND NOT EXISTS (
  SELECT 1 FROM trees_native_to x WHERE x.tree_id = @tree_id AND x.native_to_id = n.id
);

INSERT INTO trees_natural_habitat (tree_id, natural_habitat_id)
SELECT @tree_id, h.id FROM natural_habitat h
WHERE h.name IN ('ponds', 'lakes', 'slow-moving rivers', 'marshes', 'wetlands')
AND NOT EXISTS (
  SELECT 1 FROM trees_natural_habitat x WHERE x.tree_id = @tree_id AND x.natural_habitat_id = h.id
);

INSERT INTO trees_shapes (tree_id, shape_id)
SELECT @tree_id, s.id FROM shapes s
WHERE s.name IN ('floating', 'colony')
AND NOT EXISTS (
  SELECT 1 FROM trees_shapes x WHERE x.tree_id = @tree_id AND x.shape_id = s.id
);

INSERT INTO trees_light (tree_id, light_id)
SELECT @tree_id, l.id FROM light l
WHERE l.name IN ('full sun', 'partial shade')
AND NOT EXISTS (
  SELECT 1 FROM trees_light x WHERE x.tree_id = @tree_id AND x.light_id = l.id
);

INSERT INTO trees_soil (tree_id, soil_id)
SELECT @tree_id, s.id FROM soil s
WHERE s.name IN ('rich organic', 'mucky', 'clay', 'submerged aquatic soil')
AND NOT EXISTS (
  SELECT 1 FROM trees_soil x WHERE x.tree_id = @tree_id AND x.soil_id = s.id
);

INSERT INTO trees_common_uses (tree_id, common_use_id)
SELECT @tree_id, c.id FROM common_uses c
WHERE c.name IN ('wildlife ponds', 'naturalized wetlands', 'restoration planting')
AND NOT EXISTS (
  SELECT 1 FROM trees_common_uses x WHERE x.tree_id = @tree_id AND x.common_use_id = c.id
);

INSERT INTO trees_transplanting (tree_id, transplanting_id)
SELECT @tree_id, t.id FROM transplanting t
WHERE t.name IN ('moderate', 'spring')
AND NOT EXISTS (
  SELECT 1 FROM trees_transplanting x WHERE x.tree_id = @tree_id AND x.transplanting_id = t.id
);

INSERT INTO trees_unique_attractions (tree_id, unique_attraction_id)
SELECT @tree_id, u.id FROM unique_attractions u
WHERE u.name IN ('floating leaves', 'flowers', 'wildlife value')
AND NOT EXISTS (
  SELECT 1 FROM trees_unique_attractions x WHERE x.tree_id = @tree_id AND x.unique_attraction_id = u.id
);

INSERT INTO trees_tolerances (tree_id, tolerance_id)
SELECT @tree_id, t.id FROM tolerances t
WHERE t.name IN ('flood tolerant', 'cold hardy')
AND NOT EXISTS (
  SELECT 1 FROM trees_tolerances x WHERE x.tree_id = @tree_id AND x.tolerance_id = t.id
);

INSERT INTO trees_reproduction_types (tree_id, reproduction_type_id)
SELECT @tree_id, 1
WHERE NOT EXISTS (
  SELECT 1 FROM trees_reproduction_types WHERE tree_id = @tree_id AND reproduction_type_id = 1
);

INSERT INTO plants_tastes (tree_id, taste_id)
SELECT @tree_id, t.id FROM tastes t
WHERE t.name IN ('bitter', 'astringent')
AND NOT EXISTS (
  SELECT 1 FROM plants_tastes x WHERE x.tree_id = @tree_id AND x.taste_id = t.id
);

INSERT INTO plants_organ_systems (tree_id, organ_system_id)
SELECT @tree_id, o.id FROM organ_systems o
WHERE o.name IN ('digestive', 'reproductive', 'integumentary (skin, hair, nails)')
AND NOT EXISTS (
  SELECT 1 FROM plants_organ_systems x WHERE x.tree_id = @tree_id AND x.organ_system_id = o.id
);

INSERT INTO plants_thermal_nature (tree_id, thermal_nature_id)
SELECT @tree_id, t.id FROM thermal_nature t
WHERE t.name = 'cool'
AND NOT EXISTS (
  SELECT 1 FROM plants_thermal_nature x WHERE x.tree_id = @tree_id AND x.thermal_nature_id = t.id
);

INSERT INTO plants_moisture (tree_id, moisture_id)
SELECT @tree_id, m.id FROM moisture m
WHERE m.name = 'drying'
AND NOT EXISTS (
  SELECT 1 FROM plants_moisture x WHERE x.tree_id = @tree_id AND x.moisture_id = m.id
);

INSERT INTO plants_parts_used (tree_id, parts_used_id)
SELECT @tree_id, p.id FROM parts_used p
WHERE p.name IN ('rhizomes', 'roots', 'seeds', 'leaves')
AND NOT EXISTS (
  SELECT 1 FROM plants_parts_used x WHERE x.tree_id = @tree_id AND x.parts_used_id = p.id
);

INSERT INTO plants_preparations (tree_id, preparation_id)
SELECT @tree_id, p.id FROM preparations p
WHERE p.name IN ('decoction', 'poultice', 'powder', 'wash')
AND NOT EXISTS (
  SELECT 1 FROM plants_preparations x WHERE x.tree_id = @tree_id AND x.preparation_id = p.id
);

INSERT INTO plants_organs_and_tissue (tree_id, organ_and_tissue_id)
SELECT @tree_id, o.id FROM organs_and_tissue o
WHERE o.name IN ('digestive tract', 'skin', 'reproductive tissues')
AND NOT EXISTS (
  SELECT 1 FROM plants_organs_and_tissue x WHERE x.tree_id = @tree_id AND x.organ_and_tissue_id = o.id
);

COMMIT;
