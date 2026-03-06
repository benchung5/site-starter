-- =============================================================================
-- CREATE OR UPDATE PLANT - SQL Script
-- =============================================================================
-- Paste your plant data in the USER VARIABLES section below, then run this script.
-- If your DB uses a table prefix (e.g. "nwu_"), add it to table names: nwu_trees, etc.
--
-- Behavior:
-- 1. Creates family if it doesn't exist
-- 2. Creates genus if it doesn't exist (linked to family)
-- 3. If plant already exists (matched by slug): UPDATEs with COALESCE (fills only empty fields)
-- 4. If plant doesn't exist: INSERTs new plant
-- 5. Sets mode_id to LIVE
-- 6. For body: If existing plant has short body, you must provide expanded @body below
--    (SQL cannot generate content - paste your expanded body text)
-- =============================================================================

-- -----------------------------------------------------------------------------
-- USER VARIABLES - REPLACE THESE WITH YOUR PLANT DATA
-- -----------------------------------------------------------------------------

SET @family_name   = 'FamilyName';           -- e.g. 'Rosaceae', 'Asteraceae'
SET @genus_name    = 'GenusName';             -- e.g. 'Rosa', 'Achillea'
SET @common_name   = 'Common Plant Name';     -- e.g. 'Wild Rose'
SET @slug          = 'wild-rose';             -- URL slug, lowercase-hyphenated
SET @specific_epithet = 'species';            -- e.g. 'acicularis', 'millefolium'
SET @other_common_names = NULL;                -- optional, e.g. 'Prickly Rose'
SET @other_species = NULL;                    -- optional
SET @subspecies    = NULL;                    -- optional
SET @variety       = NULL;                    -- optional
SET @cultivar     = NULL;                     -- optional
SET @zone_id       = NULL;                    -- optional, FK to zones
SET @reproduction_type_id = NULL;             -- optional
SET @height_min    = NULL;                    -- optional
SET @height_max    = NULL;                    -- optional
SET @width_min     = NULL;                    -- optional
SET @width_max     = NULL;                    -- optional
SET @growth_rate   = NULL;                    -- optional
SET @lifespan_min  = NULL;                    -- optional
SET @lifespan_max  = NULL;                    -- optional
SET @seeds_packet   = NULL;                   -- optional
SET @seeds_gram    = NULL;                    -- optional
SET @cost_gram     = NULL;                    -- optional
SET @dormancy_treatment_id = NULL;             -- optional
SET @growing_instructions = NULL;             -- optional
SET @special_chemistry = NULL;                -- optional
SET @signature     = NULL;                    -- optional
SET @precautions   = NULL;                    -- optional
SET @combinations  = NULL;                    -- optional
SET @folk_use      = NULL;                    -- optional
SET @chinese_medicine = NULL;                  -- optional
SET @medicinal_species = NULL;                 -- optional

-- BODY: Main plant description (HTML allowed). For existing plants with short body,
-- paste your expanded content here. Typical plant bodies are 800-3000+ chars.
SET @body = '<p>Your plant description goes here. Include habitat, appearance, uses, growing info, etc. Match the length/style of other plant entries.</p>';

-- Min body length: if existing plant's body is shorter, it gets replaced with @body above
SET @min_body_length = 800;

-- Category: ID from trees_category. Run: SELECT id, name FROM trees_category;
SET @trees_category_id = 1;                   -- e.g. 1 for native plants, 2 for medicinal

-- -----------------------------------------------------------------------------
-- LIVE MODE: Get mode_id for 'live' (typically id=2)
-- -----------------------------------------------------------------------------
SET @mode_id_live = (SELECT id FROM mode WHERE name = 'live' LIMIT 1);
-- Fallback if mode uses different naming:
SET @mode_id_live = COALESCE(@mode_id_live, (SELECT id FROM mode ORDER BY id DESC LIMIT 1));

-- -----------------------------------------------------------------------------
-- STEP 1: Create family if not exists
-- -----------------------------------------------------------------------------
INSERT INTO families (name)
SELECT @family_name
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM families WHERE name = @family_name);

-- -----------------------------------------------------------------------------
-- STEP 2: Create genus if not exists (linked to family)
-- -----------------------------------------------------------------------------
INSERT INTO genuses (name, family_id)
SELECT @genus_name, (SELECT id FROM families WHERE name = @family_name LIMIT 1)
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM genuses WHERE name = @genus_name);

-- -----------------------------------------------------------------------------
-- STEP 3: Get genus_id
-- -----------------------------------------------------------------------------
SET @genus_id = (SELECT id FROM genuses WHERE name = @genus_name LIMIT 1);

-- -----------------------------------------------------------------------------
-- STEP 4: Check if plant exists (by slug)
-- -----------------------------------------------------------------------------
SET @existing_tree_id = (SELECT id FROM trees WHERE slug = @slug LIMIT 1);

-- -----------------------------------------------------------------------------
-- STEP 5a: If plant EXISTS - UPDATE with COALESCE (fill only empty fields)
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
  medicinal_species     = COALESCE(medicinal_species, @medicinal_species),
  -- Body: use new @body if existing is NULL, empty, or too short
  body                  = CASE
    WHEN body IS NULL OR TRIM(body) = '' THEN @body
    WHEN LENGTH(body) < @min_body_length THEN @body
    ELSE body
  END,
  mode_id               = @mode_id_live
WHERE id = @existing_tree_id AND @existing_tree_id IS NOT NULL;

-- -----------------------------------------------------------------------------
-- STEP 5b: If plant DOES NOT EXIST - INSERT new plant
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

-- Get the tree_id (either existing or newly inserted)
SET @tree_id = COALESCE(@existing_tree_id, LAST_INSERT_ID());

-- -----------------------------------------------------------------------------
-- STEP 6: Link to trees_category (for new plants; for updates, optionally refresh)
-- -----------------------------------------------------------------------------
-- For NEW plants only: insert category link
INSERT IGNORE INTO trees_categories (tree_id, trees_category_id)
SELECT @tree_id, @trees_category_id
FROM DUAL
WHERE @tree_id IS NOT NULL
  AND NOT EXISTS (SELECT 1 FROM trees_categories WHERE tree_id = @tree_id AND trees_category_id = @trees_category_id);

-- For new plants: if no category exists yet, add the default one
INSERT INTO trees_categories (tree_id, trees_category_id)
SELECT @tree_id, @trees_category_id
FROM DUAL
WHERE @tree_id IS NOT NULL
  AND (SELECT COUNT(*) FROM trees_categories WHERE tree_id = @tree_id) = 0;

-- -----------------------------------------------------------------------------
-- DONE. Verify:
-- -----------------------------------------------------------------------------
-- SELECT t.id, t.common_name, t.slug, g.name AS genus, f.name AS family, m.name AS mode
-- FROM trees t
-- JOIN genuses g ON g.id = t.genus_id
-- JOIN families f ON f.id = g.family_id
-- LEFT JOIN mode m ON m.id = t.mode_id
-- WHERE t.slug = @slug;
