START TRANSACTION;

-- ---------------------------------------------------------------------------
-- Genus: Rubus (Rosaceae = family_id 33) — already in dump, ensure present
-- ---------------------------------------------------------------------------
INSERT INTO genuses (name, family_id)
SELECT 'Rubus', 33
WHERE NOT EXISTS (SELECT 1 FROM genuses WHERE name = 'Rubus');

SET @genus_id := (SELECT id FROM genuses WHERE name = 'Rubus' LIMIT 1);

-- ---------------------------------------------------------------------------
-- Missing lookups (create if needed)
-- ---------------------------------------------------------------------------
INSERT INTO eco_benefits (id, slug, name)
SELECT COALESCE((SELECT MAX(id) FROM eco_benefits), 0) + 1, 'supports-pollinators', 'supports pollinators'
WHERE NOT EXISTS (SELECT 1 FROM eco_benefits WHERE name = 'supports pollinators');

INSERT INTO eco_benefits (id, slug, name)
SELECT COALESCE((SELECT MAX(id) FROM eco_benefits), 0) + 1, 'wildlife-food', 'wildlife food'
WHERE NOT EXISTS (SELECT 1 FROM eco_benefits WHERE name = 'wildlife food');

INSERT INTO eco_benefits (id, slug, name)
SELECT COALESCE((SELECT MAX(id) FROM eco_benefits), 0) + 1, 'host-plant', 'host plant'
WHERE NOT EXISTS (SELECT 1 FROM eco_benefits WHERE name = 'host plant');

INSERT INTO native_to (id, slug, name)
SELECT COALESCE((SELECT MAX(id) FROM native_to), 0) + 1, 'western-asia', 'Western Asia'
WHERE NOT EXISTS (SELECT 1 FROM native_to WHERE name = 'Western Asia');

INSERT INTO native_to (id, slug, name)
SELECT COALESCE((SELECT MAX(id) FROM native_to), 0) + 1, 'north-america', 'North America'
WHERE NOT EXISTS (SELECT 1 FROM native_to WHERE name = 'North America');

INSERT INTO natural_habitat (id, slug, name)
SELECT COALESCE((SELECT MAX(id) FROM natural_habitat), 0) + 1, 'meadows', 'meadows'
WHERE NOT EXISTS (SELECT 1 FROM natural_habitat WHERE name = 'meadows');

INSERT INTO natural_habitat (id, slug, name)
SELECT COALESCE((SELECT MAX(id) FROM natural_habitat), 0) + 1, 'hedgerows', 'hedgerows'
WHERE NOT EXISTS (SELECT 1 FROM natural_habitat WHERE name = 'hedgerows');

INSERT INTO natural_habitat (id, slug, name)
SELECT COALESCE((SELECT MAX(id) FROM natural_habitat), 0) + 1, 'disturbed-ground', 'disturbed ground'
WHERE NOT EXISTS (SELECT 1 FROM natural_habitat WHERE name = 'disturbed ground');

INSERT INTO shapes (id, slug, name)
SELECT COALESCE((SELECT MAX(id) FROM shapes), 0) + 1, 'arching', 'arching'
WHERE NOT EXISTS (SELECT 1 FROM shapes WHERE name = 'arching');

INSERT INTO shapes (id, slug, name)
SELECT COALESCE((SELECT MAX(id) FROM shapes), 0) + 1, 'thicket', 'thicket'
WHERE NOT EXISTS (SELECT 1 FROM shapes WHERE name = 'thicket');

INSERT INTO soil (id, slug, name)
SELECT COALESCE((SELECT MAX(id) FROM soil), 0) + 1, 'loamy', 'loamy'
WHERE NOT EXISTS (SELECT 1 FROM soil WHERE name = 'loamy');

INSERT INTO soil (id, slug, name)
SELECT COALESCE((SELECT MAX(id) FROM soil), 0) + 1, 'rich-organic', 'rich organic'
WHERE NOT EXISTS (SELECT 1 FROM soil WHERE name = 'rich organic');

INSERT INTO common_uses (id, slug, name)
SELECT COALESCE((SELECT MAX(id) FROM common_uses), 0) + 1, 'edible-landscaping', 'edible landscaping'
WHERE NOT EXISTS (SELECT 1 FROM common_uses WHERE name = 'edible landscaping');

INSERT INTO common_uses (id, slug, name)
SELECT COALESCE((SELECT MAX(id) FROM common_uses), 0) + 1, 'wildlife-habitat', 'wildlife habitat'
WHERE NOT EXISTS (SELECT 1 FROM common_uses WHERE name = 'wildlife habitat');

INSERT INTO common_uses (id, slug, name)
SELECT COALESCE((SELECT MAX(id) FROM common_uses), 0) + 1, 'hedgerows', 'hedgerows'
WHERE NOT EXISTS (SELECT 1 FROM common_uses WHERE name = 'hedgerows');

INSERT INTO common_uses (id, slug, name)
SELECT COALESCE((SELECT MAX(id) FROM common_uses), 0) + 1, 'medicinal', 'medicinal'
WHERE NOT EXISTS (SELECT 1 FROM common_uses WHERE name = 'medicinal');

INSERT INTO unique_attractions (id, name)
SELECT COALESCE((SELECT MAX(id) FROM unique_attractions), 0) + 1, 'berries'
WHERE NOT EXISTS (SELECT 1 FROM unique_attractions WHERE name = 'berries');

INSERT INTO unique_attractions (id, name)
SELECT COALESCE((SELECT MAX(id) FROM unique_attractions), 0) + 1, 'wildlife value'
WHERE NOT EXISTS (SELECT 1 FROM unique_attractions WHERE name = 'wildlife value');

INSERT INTO tolerances (id, slug, name)
SELECT COALESCE((SELECT MAX(id) FROM tolerances), 0) + 1, 'cold-hardy', 'cold hardy'
WHERE NOT EXISTS (SELECT 1 FROM tolerances WHERE name = 'cold hardy');

-- drought tolerant already exists under soil (id 5); also add as tolerance if missing
INSERT INTO tolerances (id, slug, name)
SELECT COALESCE((SELECT MAX(id) FROM tolerances), 0) + 1, 'drought-tolerant', 'drought tolerant'
WHERE NOT EXISTS (SELECT 1 FROM tolerances WHERE name = 'drought tolerant');

INSERT INTO preparations (id, name)
SELECT COALESCE((SELECT MAX(id) FROM preparations), 0) + 1, 'poultice'
WHERE NOT EXISTS (SELECT 1 FROM preparations WHERE name = 'poultice');

INSERT INTO organs_and_tissue (id, name)
SELECT COALESCE((SELECT MAX(id) FROM organs_and_tissue), 0) + 1, 'digestive tract'
WHERE NOT EXISTS (SELECT 1 FROM organs_and_tissue WHERE name = 'digestive tract');

INSERT INTO organs_and_tissue (id, name)
SELECT COALESCE((SELECT MAX(id) FROM organs_and_tissue), 0) + 1, 'mouth'
WHERE NOT EXISTS (SELECT 1 FROM organs_and_tissue WHERE name = 'mouth');

INSERT INTO organs_and_tissue (id, name)
SELECT COALESCE((SELECT MAX(id) FROM organs_and_tissue), 0) + 1, 'throat'
WHERE NOT EXISTS (SELECT 1 FROM organs_and_tissue WHERE name = 'throat');

INSERT INTO organs_and_tissue (id, name)
SELECT COALESCE((SELECT MAX(id) FROM organs_and_tissue), 0) + 1, 'skin'
WHERE NOT EXISTS (SELECT 1 FROM organs_and_tissue WHERE name = 'skin');

INSERT INTO reproduction_types (id, name)
SELECT COALESCE((SELECT MAX(id) FROM reproduction_types), 0) + 1, 'hermaphroditic'
WHERE NOT EXISTS (SELECT 1 FROM reproduction_types WHERE name = 'hermaphroditic');

SET @repro_id := (SELECT id FROM reproduction_types WHERE name = 'hermaphroditic' LIMIT 1);

-- Long text fields
SET @growing_instructions := '<p>Blackberries are vigorous perennial shrubs that thrive in full sun and fertile, well-drained soils rich in organic matter. Although highly adaptable, they produce the greatest yields where consistent moisture is available during flowering and fruit development. Canes are biennial, producing vegetative growth during their first year (primocanes) and flowering and fruiting during their second year (floricanes), after which they naturally die back. Annual pruning of spent floricanes encourages healthy growth and abundant future harvests.</p>
<p>Propagation is exceptionally easy through tip layering, root suckers or stem cuttings. Seeds benefit from approximately 90-120 days of cold moist stratification but are seldom used because vegetative propagation preserves desirable fruit characteristics. Plants gradually form productive thickets that provide excellent wildlife habitat while stabilizing soils along woodland edges and open fields.</p>
<p>White to pale pink flowers bloom from late spring into early summer, attracting numerous native bees and other pollinating insects. Fruits ripen from midsummer into early autumn, providing valuable food for birds, bears and countless other animals. Medicinal leaves are traditionally harvested during late spring or early summer before becoming coarse, while roots are generally collected during autumn after the plants become dormant.</p>';

SET @folk_use := '<p>Blackberry has served as both food and medicine throughout Europe and North America for centuries. Indigenous peoples and early settlers prepared infusions from the young leaves and decoctions from the roots to support digestive health, soothe sore throats and help manage diarrhea because of their naturally high tannin content. Fresh leaves were also applied externally to minor wounds, ulcers and skin irritations to encourage healing.</p>
<p>The sweet, nutritious berries have long been valued as an important seasonal food rich in vitamins and antioxidants. Syrups prepared from the fruit were traditionally used to soothe sore throats, while the roots gained a reputation for supporting intestinal health during episodes of digestive upset. Blackberry leaf tea became especially respected as a gentle astringent suitable for both adults and children.</p>
<p>Modern Western herbalists continue to value blackberry leaves as one of the classic mild astringent herbs. Although the fruit is appreciated primarily as a nutritious food, the leaves remain widely employed for supporting healthy digestion, maintaining oral health and soothing inflamed mucous membranes.</p>';

SET @chinese_medicine := '<p>Blackberry (<em>Rubus</em> spp.) is not a traditional herb of the classical Chinese Materia Medica, although several native Asian <em>Rubus</em> species are used in Traditional Chinese Medicine. The European blackberry (<em>Rubus fruticosus</em> aggregate) and North American blackberries developed their medicinal reputation independently through European folk medicine and Indigenous North American traditions. Consequently, there are no classical TCM formulas or channel associations recorded specifically for these species.</p>
<p>From a modern energetic perspective, blackberry leaf is considered neutral to slightly cool, astringent and drying, with a primary affinity for the Stomach, Large Intestine and mucous membranes. Traditional Western herbalists employed the leaves to tone relaxed tissues, reduce excessive secretions and support healthy digestion during occasional diarrhea. Within an integrative framework, these actions resemble the TCM concepts of consolidating Qi, stabilizing fluids and clearing mild Damp-Heat affecting the digestive tract. The antioxidant-rich berries, while valued primarily as food, are regarded as gently nourishing and supportive of healthy Blood and body fluids.</p>
<p>Practitioners integrating Western herbs with Traditional Chinese Medicine generally view blackberry leaf as a mild astringent for acute digestive support rather than a constitutional tonic. For complex digestive patterns or chronic deficiencies, practitioners typically rely upon classical Chinese herbs with much longer histories of documented use. Blackberry therefore remains primarily a traditional Western medicinal and nutritional plant.</p>';

SET @special_chemistry := '<p>Blackberry leaves contain abundant tannins, ellagitannins, flavonoids, phenolic acids and small amounts of volatile compounds that contribute to their traditional astringent properties. The berries are exceptionally rich in anthocyanins, vitamin C, dietary fibre, ellagic acid and numerous antioxidant polyphenols. Together, these compounds contribute antioxidant activity while supporting the plant''s longstanding reputation as both a nourishing food and a gentle medicinal herb.</p>';

SET @signature := '<p>The vigorous thorny canes protect clusters of sweet, nourishing fruit, symbolizing the idea that valuable gifts often require patience and care to obtain. The firm berries develop from delicate blossoms into nutrient-rich fruits, reflecting nourishment following maturity and perseverance. The leaves'' distinctly astringent taste mirrors their traditional role in toning tissues and restoring balance when excessive looseness or irritation is present.</p>';

SET @combinations := '<p>Blackberry leaf combines well with <a href="https://naturewithus.com/plants/herbaceous-plants/chamomile">Chamomile</a> for digestive comfort, with <a href="https://naturewithus.com/plants/herbaceous-plants/marshmallow">Marshmallow</a> to balance its drying properties when soothing irritated mucous membranes, and with <a href="https://naturewithus.com/plants/herbaceous-plants/yarrow">Yarrow</a> in traditional formulas supporting digestive and oral health. The antioxidant-rich berries also pair well with other deeply coloured fruits in nourishing syrups and preserves.</p>';

SET @precautions := '<p>Blackberry leaves are considered very safe when consumed in traditional medicinal amounts. Because of their high tannin content, excessive consumption may occasionally contribute to mild digestive discomfort or constipation in sensitive individuals. The ripe berries are widely recognized as safe and nutritious foods. Individuals harvesting wild blackberries should avoid plants growing along heavily sprayed roadsides or contaminated sites and should carefully distinguish edible blackberries from superficially similar but potentially harmful plants.</p>';

SET @body := '<p>Blackberry (<em>Rubus</em> spp.) is a vigorous deciduous bramble in the rose family (Rosaceae), celebrated throughout the temperate world for its delicious fruit, ecological importance and longstanding medicinal value. While numerous species occur across Europe, Asia and North America, they share many botanical and herbal characteristics, making blackberry one of the most familiar medicinal shrubs in traditional Western herbalism. Dense arching canes armed with curved prickles form protective thickets along woodland edges, open fields and hedgerows, providing shelter and food for countless birds, mammals and beneficial insects. Although the berries are the best-known part of the plant, herbalists have long regarded the leaves and roots as valuable medicines in their own right.</p>
<p>Blackberry plants produce vigorous first-year canes, known as primocanes, followed by fruit-bearing second-year floricanes that bloom with clusters of delicate white to pale pink flowers. These blossoms attract bees and many other native pollinators before developing into the familiar aggregate fruits that ripen from green to deep purple-black during midsummer and early autumn. Rich in vitamins, minerals, fibre and antioxidant pigments, the berries have nourished people and wildlife for thousands of years. Bears, birds, foxes and numerous small mammals depend upon blackberry crops as an important seasonal food source, while the dense thorny thickets provide excellent nesting and protective cover.</p>
<p>Medicinally, blackberry has a distinguished history extending from Indigenous North American traditions to European folk medicine. The young leaves, harvested before they become coarse, were prepared as teas to soothe sore throats, support digestive health and reduce occasional diarrhea because of their natural astringency. Decoctions of the roots were similarly valued for digestive complaints, while crushed leaves were applied externally to minor wounds, ulcers and irritated skin. The sweet berries were enjoyed fresh, dried or preserved as nourishing foods and were often prepared as syrups for soothing the throat during seasonal illnesses.</p>
<p>Modern Western herbalists continue to regard blackberry leaf as one of the classic gentle astringent herbs, especially useful for supporting healthy digestion and maintaining comfortable mucous membranes. The antioxidant-rich berries remain prized as both food and medicine, contributing valuable nutrients while complementing a balanced diet. Combining exceptional wildlife value, abundant harvests and centuries of trusted medicinal use, blackberry stands among the most versatile and rewarding shrubs found throughout the temperate landscape.</p>';

-- ---------------------------------------------------------------------------
-- Insert Blackberry if missing
-- ---------------------------------------------------------------------------
INSERT INTO trees (
  slug, common_name, other_common_names, genus_id, specific_epithet,
  subspecies,
  zone_id, reproduction_type_id,
  height_min, height_max, width_min, width_max,
  growth_rate, lifespan_min, lifespan_max,
  dormancy_treatment_id,
  growing_instructions, body, special_chemistry, signature, precautions,
  combinations, chinese_medicine, medicinal_species, mode_id, folk_use
)
SELECT
  'blackberry',
  'Blackberry',
  'Common Blackberry, European Blackberry, Bramble',
  @genus_id,
  'fruticosus',
  'aggregate',
  4,              -- zone 3
  @repro_id,      -- hermaphroditic
  3, 10, 3, 12,
  'fast',
  15, 40,
  '2',            -- Cold Moist Stratification
  @growing_instructions,
  @body,
  @special_chemistry,
  @signature,
  @precautions,
  @combinations,
  @chinese_medicine,
  'Rubus fruticosus (aggregate), Rubus allegheniensis, Rubus armeniacus (traditional use)',
  2,              -- live
  @folk_use
WHERE NOT EXISTS (SELECT 1 FROM trees WHERE slug = 'blackberry');

SET @tree_id := (SELECT id FROM trees WHERE slug = 'blackberry' LIMIT 1);

-- ---------------------------------------------------------------------------
-- If plant already exists: fill only empty scalar fields; always set mode=live
-- ---------------------------------------------------------------------------
UPDATE trees SET
  common_name = IF(common_name IS NULL OR common_name = '', 'Blackberry', common_name),
  other_common_names = IF(other_common_names IS NULL OR other_common_names = '', 'Common Blackberry, European Blackberry, Bramble', other_common_names),
  genus_id = IF(genus_id IS NULL OR genus_id = 0, @genus_id, genus_id),
  specific_epithet = IF(specific_epithet IS NULL OR specific_epithet = '', 'fruticosus', specific_epithet),
  subspecies = IF(subspecies IS NULL OR subspecies = '', 'aggregate', subspecies),
  zone_id = IF(zone_id IS NULL OR zone_id = 0, 4, zone_id),
  reproduction_type_id = IF(reproduction_type_id IS NULL OR reproduction_type_id = 0, @repro_id, reproduction_type_id),
  height_min = IF(height_min IS NULL OR height_min = 0, 3, height_min),
  height_max = IF(height_max IS NULL OR height_max = 0, 10, height_max),
  width_min = IF(width_min IS NULL OR width_min = 0, 3, width_min),
  width_max = IF(width_max IS NULL OR width_max = 0, 12, width_max),
  growth_rate = IF(growth_rate IS NULL OR growth_rate = '', 'fast', growth_rate),
  lifespan_min = IF(lifespan_min IS NULL OR lifespan_min = 0, 15, lifespan_min),
  lifespan_max = IF(lifespan_max IS NULL OR lifespan_max = 0, 40, lifespan_max),
  dormancy_treatment_id = IF(dormancy_treatment_id IS NULL OR dormancy_treatment_id = '', '2', dormancy_treatment_id),
  growing_instructions = IF(growing_instructions IS NULL OR growing_instructions = '', @growing_instructions, growing_instructions),
  body = IF(body IS NULL OR body = '', @body, body),
  special_chemistry = IF(special_chemistry IS NULL OR special_chemistry = '', @special_chemistry, special_chemistry),
  signature = IF(signature IS NULL OR signature = '', @signature, signature),
  precautions = IF(precautions IS NULL OR precautions = '', @precautions, precautions),
  combinations = IF(combinations IS NULL OR combinations = '', @combinations, combinations),
  chinese_medicine = IF(chinese_medicine IS NULL OR chinese_medicine = '', @chinese_medicine, chinese_medicine),
  medicinal_species = IF(medicinal_species IS NULL OR medicinal_species = '', 'Rubus fruticosus (aggregate), Rubus allegheniensis, Rubus armeniacus (traditional use)', medicinal_species),
  folk_use = IF(folk_use IS NULL OR folk_use = '', @folk_use, folk_use),
  mode_id = 2
WHERE id = @tree_id;

-- ---------------------------------------------------------------------------
-- Junction rows (add missing only)
-- ---------------------------------------------------------------------------
INSERT INTO trees_categories (tree_id, trees_category_id)
SELECT @tree_id, 6
WHERE NOT EXISTS (
  SELECT 1 FROM trees_categories WHERE tree_id = @tree_id AND trees_category_id = 6
);

INSERT INTO trees_eco_benefits (tree_id, eco_benefit_id)
SELECT @tree_id, e.id FROM eco_benefits e
WHERE e.name IN ('supports pollinators', 'wildlife food', 'host plant', 'erosion control', 'medicinal')
AND NOT EXISTS (
  SELECT 1 FROM trees_eco_benefits x WHERE x.tree_id = @tree_id AND x.eco_benefit_id = e.id
);

INSERT INTO trees_native_to (tree_id, native_to_id)
SELECT @tree_id, n.id FROM native_to n
WHERE n.name IN ('Europe', 'Western Asia', 'North America')
AND NOT EXISTS (
  SELECT 1 FROM trees_native_to x WHERE x.tree_id = @tree_id AND x.native_to_id = n.id
);

INSERT INTO trees_natural_habitat (tree_id, natural_habitat_id)
SELECT @tree_id, h.id FROM natural_habitat h
WHERE h.name IN ('forest edge', 'meadows', 'hedgerows', 'disturbed ground')
AND NOT EXISTS (
  SELECT 1 FROM trees_natural_habitat x WHERE x.tree_id = @tree_id AND x.natural_habitat_id = h.id
);

INSERT INTO trees_shapes (tree_id, shape_id)
SELECT @tree_id, s.id FROM shapes s
WHERE s.name IN ('arching', 'thicket')
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
WHERE s.name IN ('well drained', 'loamy', 'sandy', 'rich organic', 'ph adaptable', 'drought tolerant')
AND NOT EXISTS (
  SELECT 1 FROM trees_soil x WHERE x.tree_id = @tree_id AND x.soil_id = s.id
);

INSERT INTO trees_common_uses (tree_id, common_use_id)
SELECT @tree_id, c.id FROM common_uses c
WHERE c.name IN ('edible landscaping', 'wildlife habitat', 'hedgerows', 'medicinal')
AND NOT EXISTS (
  SELECT 1 FROM trees_common_uses x WHERE x.tree_id = @tree_id AND x.common_use_id = c.id
);

INSERT INTO trees_transplanting (tree_id, transplanting_id)
SELECT @tree_id, t.id FROM transplanting t
WHERE t.name IN ('easy', 'spring', 'fall')
AND NOT EXISTS (
  SELECT 1 FROM trees_transplanting x WHERE x.tree_id = @tree_id AND x.transplanting_id = t.id
);

INSERT INTO trees_unique_attractions (tree_id, unique_attraction_id)
SELECT @tree_id, u.id FROM unique_attractions u
WHERE u.name IN ('berries', 'flowers', 'wildlife value')
AND NOT EXISTS (
  SELECT 1 FROM trees_unique_attractions x WHERE x.tree_id = @tree_id AND x.unique_attraction_id = u.id
);

INSERT INTO trees_tolerances (tree_id, tolerance_id)
SELECT @tree_id, t.id FROM tolerances t
WHERE t.name IN ('cold hardy', 'drought tolerant')
AND NOT EXISTS (
  SELECT 1 FROM trees_tolerances x WHERE x.tree_id = @tree_id AND x.tolerance_id = t.id
);

INSERT INTO trees_reproduction_types (tree_id, reproduction_type_id)
SELECT @tree_id, @repro_id
WHERE NOT EXISTS (
  SELECT 1 FROM trees_reproduction_types WHERE tree_id = @tree_id AND reproduction_type_id = @repro_id
);

INSERT INTO plants_tastes (tree_id, taste_id)
SELECT @tree_id, t.id FROM tastes t
WHERE t.name IN ('sweet', 'sour', 'astringent')
AND NOT EXISTS (
  SELECT 1 FROM plants_tastes x WHERE x.tree_id = @tree_id AND x.taste_id = t.id
);

INSERT INTO plants_organ_systems (tree_id, organ_system_id)
SELECT @tree_id, o.id FROM organ_systems o
WHERE o.name IN ('digestive', 'reproductive', 'integumentary (skin, hair, nails)', 'immune/lymphatic')
AND NOT EXISTS (
  SELECT 1 FROM plants_organ_systems x WHERE x.tree_id = @tree_id AND x.organ_system_id = o.id
);

INSERT INTO plants_thermal_nature (tree_id, thermal_nature_id)
SELECT @tree_id, t.id FROM thermal_nature t
WHERE t.name = 'neutral'
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
WHERE p.name IN ('leaves', 'roots', 'berries')
AND NOT EXISTS (
  SELECT 1 FROM plants_parts_used x WHERE x.tree_id = @tree_id AND x.parts_used_id = p.id
);

INSERT INTO plants_preparations (tree_id, preparation_id)
SELECT @tree_id, p.id FROM preparations p
WHERE p.name IN ('tea/infusion', 'tincture', 'decoction', 'syrup', 'poultice')
AND NOT EXISTS (
  SELECT 1 FROM plants_preparations x WHERE x.tree_id = @tree_id AND x.preparation_id = p.id
);

INSERT INTO plants_organs_and_tissue (tree_id, organ_and_tissue_id)
SELECT @tree_id, o.id FROM organs_and_tissue o
WHERE o.name IN ('digestive tract', 'mouth', 'throat', 'skin')
AND NOT EXISTS (
  SELECT 1 FROM plants_organs_and_tissue x WHERE x.tree_id = @tree_id AND x.organ_and_tissue_id = o.id
);

COMMIT;
