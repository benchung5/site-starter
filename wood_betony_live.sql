START TRANSACTION;

-- ---------------------------------------------------------------------------
-- Genus: Stachys (Lamiaceae = family_id 78)
-- ---------------------------------------------------------------------------
INSERT INTO genuses (name, family_id)
SELECT 'Stachys', 78
WHERE NOT EXISTS (SELECT 1 FROM genuses WHERE name = 'Stachys');

SET @genus_id := (SELECT id FROM genuses WHERE name = 'Stachys' LIMIT 1);

-- ---------------------------------------------------------------------------
-- Missing lookups (create if needed)
-- ---------------------------------------------------------------------------
INSERT INTO eco_benefits (id, slug, name)
SELECT COALESCE((SELECT MAX(id) FROM eco_benefits), 0) + 1, 'attracts-beneficial-insects', 'attracts beneficial insects'
WHERE NOT EXISTS (SELECT 1 FROM eco_benefits WHERE name = 'attracts beneficial insects');

INSERT INTO native_to (id, slug, name)
SELECT COALESCE((SELECT MAX(id) FROM native_to), 0) + 1, 'western-asia', 'Western Asia'
WHERE NOT EXISTS (SELECT 1 FROM native_to WHERE name = 'Western Asia');

INSERT INTO natural_habitat (id, slug, name)
SELECT COALESCE((SELECT MAX(id) FROM natural_habitat), 0) + 1, 'meadows', 'meadows'
WHERE NOT EXISTS (SELECT 1 FROM natural_habitat WHERE name = 'meadows');

INSERT INTO natural_habitat (id, slug, name)
SELECT COALESCE((SELECT MAX(id) FROM natural_habitat), 0) + 1, 'open-woodland', 'open woodland'
WHERE NOT EXISTS (SELECT 1 FROM natural_habitat WHERE name = 'open woodland');

INSERT INTO natural_habitat (id, slug, name)
SELECT COALESCE((SELECT MAX(id) FROM natural_habitat), 0) + 1, 'grasslands', 'grasslands'
WHERE NOT EXISTS (SELECT 1 FROM natural_habitat WHERE name = 'grasslands');

INSERT INTO soil (id, slug, name)
SELECT COALESCE((SELECT MAX(id) FROM soil), 0) + 1, 'loamy', 'loamy'
WHERE NOT EXISTS (SELECT 1 FROM soil WHERE name = 'loamy');

INSERT INTO soil (id, slug, name)
SELECT COALESCE((SELECT MAX(id) FROM soil), 0) + 1, 'rich-organic', 'rich organic'
WHERE NOT EXISTS (SELECT 1 FROM soil WHERE name = 'rich organic');

INSERT INTO common_uses (id, slug, name)
SELECT COALESCE((SELECT MAX(id) FROM common_uses), 0) + 1, 'medicinal-gardens', 'medicinal gardens'
WHERE NOT EXISTS (SELECT 1 FROM common_uses WHERE name = 'medicinal gardens');

INSERT INTO common_uses (id, slug, name)
SELECT COALESCE((SELECT MAX(id) FROM common_uses), 0) + 1, 'pollinator-gardens', 'pollinator gardens'
WHERE NOT EXISTS (SELECT 1 FROM common_uses WHERE name = 'pollinator gardens');

INSERT INTO common_uses (id, slug, name)
SELECT COALESCE((SELECT MAX(id) FROM common_uses), 0) + 1, 'cottage-gardens', 'cottage gardens'
WHERE NOT EXISTS (SELECT 1 FROM common_uses WHERE name = 'cottage gardens');

INSERT INTO tolerances (id, slug, name)
SELECT COALESCE((SELECT MAX(id) FROM tolerances), 0) + 1, 'cold-hardy', 'cold hardy'
WHERE NOT EXISTS (SELECT 1 FROM tolerances WHERE name = 'cold hardy');

INSERT INTO parts_used (id, name)
SELECT COALESCE((SELECT MAX(id) FROM parts_used), 0) + 1, 'flowering tops'
WHERE NOT EXISTS (SELECT 1 FROM parts_used WHERE name = 'flowering tops');

INSERT INTO preparations (id, name)
SELECT COALESCE((SELECT MAX(id) FROM preparations), 0) + 1, 'poultice'
WHERE NOT EXISTS (SELECT 1 FROM preparations WHERE name = 'poultice');

INSERT INTO organs_and_tissue (id, name)
SELECT COALESCE((SELECT MAX(id) FROM organs_and_tissue), 0) + 1, 'blood vessels'
WHERE NOT EXISTS (SELECT 1 FROM organs_and_tissue WHERE name = 'blood vessels');

-- Long text fields
SET @growing_instructions := '<p>Wood betony is a hardy perennial that grows best in full sun to partial shade in fertile, well-drained soils rich in organic matter. Although adaptable to a variety of soil types, it performs particularly well in moderately moist loams where competition from aggressive plants is limited. Once established, it tolerates short periods of drought but flowers most abundantly when soil moisture remains reasonably consistent throughout the growing season.</p>

<p>Seeds benefit from approximately 60-90 days of cold moist stratification before spring sowing. Plants may also be propagated by dividing established clumps in spring or early autumn, a method that quickly produces vigorous flowering specimens. Mature plants gradually form tidy clumps topped with upright spikes of attractive purple-pink flowers that are highly attractive to bees, butterflies and numerous beneficial insects.</p>

<p>The flowering tops and leaves are traditionally harvested as the first flowers open, while roots may be collected during autumn after the aerial growth has died back. Dry harvested material promptly in a shaded, well-ventilated location to preserve colour and medicinal quality. Regular removal of spent flower spikes encourages prolonged blooming and helps maintain vigorous plants for many years.</p>';

SET @folk_use := '<p>Wood betony was one of the most highly esteemed medicinal herbs of medieval Europe. Ancient Roman physicians praised the plant, and by the Middle Ages it was believed to protect against numerous illnesses, earning the famous saying, "Sell your coat and buy betony." Herbalists prepared infusions, powders and tinctures from the flowering herb to support headaches, nervous tension, digestive weakness and general debility.</p>

<p>Throughout European folk medicine, betony became especially associated with disorders of the head and nervous system. It was traditionally recommended for headaches, dizziness, anxiety and disturbed sleep while also supporting digestion influenced by nervous tension. The mildly bitter and astringent herb was believed to strengthen the body while calming the mind, making it a valued tonic for individuals recovering from illness or prolonged stress.</p>

<p>Modern Western herbalists continue to appreciate wood betony as a gentle nervine and digestive tonic. Although no longer regarded as the universal remedy once described by medieval herbalists, it remains respected for supporting relaxation, healthy digestion and overall nervous system balance, particularly when emotional stress contributes to physical discomfort.</p>';

SET @chinese_medicine := '<p>Wood betony (<em>Stachys officinalis</em>) is not a traditional herb of the classical Chinese Materia Medica and has no established place within ancient Traditional Chinese Medicine. Native to Europe and western Asia, its medicinal reputation developed through Greek, Roman and later European herbal traditions rather than within the Chinese pharmacopoeia. Consequently, there are no classical channel associations, standard TCM formulas or traditional dosage recommendations recorded for this species.</p>

<p>From a modern energetic perspective, wood betony is considered neutral to slightly warm, bitter and gently drying, with a particular affinity for the Head, Liver and nervous system. Western herbalists have traditionally employed it to calm nervous tension, relieve headaches associated with stress and support healthy digestion when emotional strain affects the stomach. Within an integrative framework, its actions resemble the TCM concepts of smoothing Liver Qi, calming the Shen and gently supporting the Spleen. Unlike strongly sedating herbs, wood betony is regarded as balancing rather than suppressive, helping restore harmony between the nervous and digestive systems.</p>

<p>Practitioners integrating Western herbs with Traditional Chinese Medicine generally regard wood betony as a gentle constitutional herb for individuals whose emotional stress manifests physically through headaches, digestive tension or muscular tightness. Although not a classical TCM herb, its long history of use as a calming tonic makes it compatible with modern integrative herbal practice where appropriate.</p>';

SET @special_chemistry := '<p>Wood betony contains iridoid glycosides, including harpagide and aucubin, together with tannins, phenolic acids, flavonoids, diterpenes and small amounts of volatile oils. Rosmarinic acid contributes antioxidant activity, while the tannins account for the herb''s mild astringent properties. Collectively, these constituents are believed to contribute to its traditional reputation for supporting the nervous system, digestion and healthy inflammatory balance.</p>';

SET @signature := '<p>The sturdy upright flower spikes rising above a compact leafy rosette suggest steadiness, balance and resilience. The plant''s calming purple blossoms have long symbolized peace of mind, while its strong square stems reflect stability during times of physical or emotional strain. Growing quietly in woodland clearings and meadows, wood betony mirrors its traditional role of restoring calm without diminishing vitality.</p>';

SET @combinations := '<p>Wood betony combines well with <a href="https://naturewithus.com/plants/herbaceous-plants/chamomile">Chamomile</a> for nervous digestion and relaxation, with <a href="https://naturewithus.com/plants/herbaceous-plants/lemon-balm">Lemon Balm</a> for stress-related tension, and with <a href="https://naturewithus.com/plants/herbaceous-plants/skullcap">Skullcap</a> when muscular tightness accompanies nervous exhaustion. It is also traditionally blended with bitter digestive herbs to support healthy digestion during periods of emotional stress.</p>';

SET @precautions := '<p>Wood betony has an excellent reputation for safety and is generally well tolerated when consumed in traditional medicinal amounts. Occasional mild digestive upset may occur in sensitive individuals because of its bitter constituents. There are no well-documented serious adverse effects associated with normal use, although pregnancy and breastfeeding warrant the usual precaution due to limited modern safety data. As with all medicinal herbs, prolonged therapeutic use should ideally be guided by a qualified healthcare practitioner.</p>';

SET @body := '<p>Wood betony (<em>Stachys officinalis</em>), formerly known botanically as <em>Betonica officinalis</em>, is a perennial herb in the mint family (Lamiaceae) that has been revered throughout Europe for over two thousand years. Native to meadows, woodland clearings and open forests from Britain across central Europe into western Asia, it has long been regarded as one of the great restorative herbs of traditional Western herbalism. Ancient Roman physicians praised its medicinal virtues, while medieval herbalists considered it so valuable that an old proverb advised, "Sell your coat and buy betony." Although modern herbalism takes a more measured view, wood betony remains highly respected as a gentle tonic for the nervous and digestive systems.</p>

<p>The plant forms a neat basal rosette of softly hairy, deeply veined leaves from which rise sturdy square stems bearing dense spikes of rosy-purple flowers during early to midsummer. These nectar-rich blossoms attract bees, butterflies and numerous beneficial insects, making wood betony an excellent addition to pollinator and medicinal gardens alike. Hardy and long-lived, it thrives in well-drained soils under full sun or partial shade and gradually develops into attractive clumps that require little maintenance beyond occasional division every few years.</p>

<p>For centuries, the flowering tops and leaves were gathered as the plant came into bloom and prepared as teas, tinctures and powders. Traditional European herbalists recommended wood betony for headaches, nervous exhaustion, anxiety, dizziness and digestive complaints, particularly when emotional stress contributed to physical symptoms. The herb also earned a reputation for easing muscular tension, promoting restful sleep and supporting recovery after prolonged illness. Although once believed capable of treating almost every ailment, its greatest strength is now recognized as its ability to gently restore balance between the mind and body rather than acting as a dramatic or fast-acting remedy.</p>

<p>Modern Western herbalists continue to value wood betony as a mild nervine, digestive bitter and relaxing tonic. It is especially appreciated for individuals whose stress manifests as headaches, neck and shoulder tension or digestive discomfort. The herb is frequently combined with calming plants such as <a href="https://naturewithus.com/plants/herbaceous-plants/chamomile">Chamomile</a> and <a href="https://naturewithus.com/plants/herbaceous-plants/lemon-balm">Lemon Balm</a> to encourage relaxation while maintaining mental clarity. Combining remarkable historical significance with gentle therapeutic action and excellent garden value, wood betony remains one of Europe''s classic medicinal herbs and a fitting symbol of the enduring wisdom of traditional herbal medicine.</p>';

-- ---------------------------------------------------------------------------
-- Insert Wood Betony if missing
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
  'wood-betony',
  'Wood Betony',
  'Betony, Bishopwort, Common Betony',
  @genus_id,
  'officinalis',
  5,              -- zone 4
  1,              -- monoacious
  1, 2, 1, 2,
  'medium',       -- moderate
  10, 30,
  '2',            -- Cold Moist Stratification
  @growing_instructions,
  @body,
  @special_chemistry,
  @signature,
  @precautions,
  @combinations,
  @chinese_medicine,
  'Stachys officinalis',
  2,              -- live
  @folk_use
WHERE NOT EXISTS (SELECT 1 FROM trees WHERE slug = 'wood-betony');

SET @tree_id := (SELECT id FROM trees WHERE slug = 'wood-betony' LIMIT 1);

-- ---------------------------------------------------------------------------
-- If plant already exists: fill only empty scalar fields; always set mode=live
-- ---------------------------------------------------------------------------
UPDATE trees SET
  common_name = IF(common_name IS NULL OR common_name = '', 'Wood Betony', common_name),
  other_common_names = IF(other_common_names IS NULL OR other_common_names = '', 'Betony, Bishopwort, Common Betony', other_common_names),
  genus_id = IF(genus_id IS NULL OR genus_id = 0, @genus_id, genus_id),
  specific_epithet = IF(specific_epithet IS NULL OR specific_epithet = '', 'officinalis', specific_epithet),
  zone_id = IF(zone_id IS NULL OR zone_id = 0, 5, zone_id),
  reproduction_type_id = IF(reproduction_type_id IS NULL OR reproduction_type_id = 0, 1, reproduction_type_id),
  height_min = IF(height_min IS NULL OR height_min = 0, 1, height_min),
  height_max = IF(height_max IS NULL OR height_max = 0, 2, height_max),
  width_min = IF(width_min IS NULL OR width_min = 0, 1, width_min),
  width_max = IF(width_max IS NULL OR width_max = 0, 2, width_max),
  growth_rate = IF(growth_rate IS NULL OR growth_rate = '', 'medium', growth_rate),
  lifespan_min = IF(lifespan_min IS NULL OR lifespan_min = 0, 10, lifespan_min),
  lifespan_max = IF(lifespan_max IS NULL OR lifespan_max = 0, 30, lifespan_max),
  dormancy_treatment_id = IF(dormancy_treatment_id IS NULL OR dormancy_treatment_id = '', '2', dormancy_treatment_id),
  growing_instructions = IF(growing_instructions IS NULL OR growing_instructions = '', @growing_instructions, growing_instructions),
  body = IF(body IS NULL OR body = '', @body, body),
  special_chemistry = IF(special_chemistry IS NULL OR special_chemistry = '', @special_chemistry, special_chemistry),
  signature = IF(signature IS NULL OR signature = '', @signature, signature),
  precautions = IF(precautions IS NULL OR precautions = '', @precautions, precautions),
  combinations = IF(combinations IS NULL OR combinations = '', @combinations, combinations),
  chinese_medicine = IF(chinese_medicine IS NULL OR chinese_medicine = '', @chinese_medicine, chinese_medicine),
  medicinal_species = IF(medicinal_species IS NULL OR medicinal_species = '', 'Stachys officinalis', medicinal_species),
  folk_use = IF(folk_use IS NULL OR folk_use = '', @folk_use, folk_use),
  mode_id = 2
WHERE id = @tree_id;

-- ---------------------------------------------------------------------------
-- Junction rows (add missing only)
-- ---------------------------------------------------------------------------
INSERT INTO trees_categories (tree_id, trees_category_id)
SELECT @tree_id, 7
WHERE NOT EXISTS (
  SELECT 1 FROM trees_categories WHERE tree_id = @tree_id AND trees_category_id = 7
);

INSERT INTO trees_eco_benefits (tree_id, eco_benefit_id)
SELECT @tree_id, e.id FROM eco_benefits e
WHERE e.name IN ('attracts pollinators', 'attracts beneficial insects', 'medicinal')
AND NOT EXISTS (
  SELECT 1 FROM trees_eco_benefits x WHERE x.tree_id = @tree_id AND x.eco_benefit_id = e.id
);

INSERT INTO trees_native_to (tree_id, native_to_id)
SELECT @tree_id, n.id FROM native_to n
WHERE n.name IN ('Europe', 'Western Asia')
AND NOT EXISTS (
  SELECT 1 FROM trees_native_to x WHERE x.tree_id = @tree_id AND x.native_to_id = n.id
);

INSERT INTO trees_natural_habitat (tree_id, natural_habitat_id)
SELECT @tree_id, h.id FROM natural_habitat h
WHERE h.name IN ('meadows', 'open woodland', 'grasslands', 'forest edge')
AND NOT EXISTS (
  SELECT 1 FROM trees_natural_habitat x WHERE x.tree_id = @tree_id AND x.natural_habitat_id = h.id
);

INSERT INTO trees_shapes (tree_id, shape_id)
SELECT @tree_id, s.id FROM shapes s
WHERE s.name IN ('upright', 'clump')
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
WHERE s.name IN ('well drained', 'loamy', 'sandy', 'rich organic', 'ph adaptable')
AND NOT EXISTS (
  SELECT 1 FROM trees_soil x WHERE x.tree_id = @tree_id AND x.soil_id = s.id
);

INSERT INTO trees_common_uses (tree_id, common_use_id)
SELECT @tree_id, c.id FROM common_uses c
WHERE c.name IN ('medicinal gardens', 'pollinator gardens', 'cottage gardens')
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
WHERE u.name = 'flowers'
AND NOT EXISTS (
  SELECT 1 FROM trees_unique_attractions x WHERE x.tree_id = @tree_id AND x.unique_attraction_id = u.id
);

INSERT INTO trees_tolerances (tree_id, tolerance_id)
SELECT @tree_id, t.id FROM tolerances t
WHERE t.name = 'cold hardy'
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
WHERE o.name IN ('nervous', 'digestive', 'circulatory', 'respiratory')
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
WHERE p.name IN ('leaves', 'flowering tops', 'roots')
AND NOT EXISTS (
  SELECT 1 FROM plants_parts_used x WHERE x.tree_id = @tree_id AND x.parts_used_id = p.id
);

INSERT INTO plants_preparations (tree_id, preparation_id)
SELECT @tree_id, p.id FROM preparations p
WHERE p.name IN ('tea/infusion', 'tincture', 'powder', 'poultice')
AND NOT EXISTS (
  SELECT 1 FROM plants_preparations x WHERE x.tree_id = @tree_id AND x.preparation_id = p.id
);

INSERT INTO plants_organs_and_tissue (tree_id, organ_and_tissue_id)
SELECT @tree_id, o.id FROM organs_and_tissue o
WHERE o.name IN ('brain', 'stomach', 'liver', 'blood vessels')
AND NOT EXISTS (
  SELECT 1 FROM plants_organs_and_tissue x WHERE x.tree_id = @tree_id AND x.organ_and_tissue_id = o.id
);

COMMIT;
