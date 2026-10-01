# Brand logos — manufacturer partner assets

**Do not download logos by scraping manufacturer websites.** Use the official partner / dealer / contractor-program asset packs. Most manufacturers publish approved logo files in their contractor portal. Those files include the correct trademark registration marks (®/™) and the usage rules you have to follow to keep the right to display them.

## Required file format

- SVG preferred (scales cleanly; keep ≤ 20KB each)
- PNG at 2× size as fallback (transparent background, ~400px wide)
- One file per brand, named exactly matching the `src` field in `src/content-model/brands.ts`

## Expected files (add real licensed assets from the manufacturer)

| Filename | Brand | Where to request the asset |
|---|---|---|
| `anlin.svg` | Anlin Windows & Doors | Anlin dealer portal |
| `ply-gem.svg` | Ply Gem | Ply Gem contractor resources |
| `milgard.svg` | Milgard | Milgard pro portal |
| `james-hardie.svg` | James Hardie | James Hardie Contractor Alliance program kit |
| `andersen.svg` | Andersen Windows & Doors | Andersen dealer resources |
| `lp-smartside.svg` | LP SmartSide | LP contractor portal |
| `marvin.svg` | Marvin | Marvin pro resources |
| `pella.svg` | Pella | Pella Pro program kit |
| `certainteed.svg` | CertainTeed | CertainTeed SELECT ShingleMaster materials |
| `simpson-doors.svg` | Simpson Door Company | Simpson door dealer kit |
| `tyvek.svg` | DuPont Tyvek | DuPont building envelope contractor kit |
| `boral-truexterior.svg` | Boral TruExterior | Boral pro resources |

## Usage rules (common across manufacturers)

- Logos must appear with their registered marks (®/™).
- Clear-space requirements vary; honor each manufacturer's spec.
- No color recoloring unless the brand kit explicitly permits a monochrome variant.
- Logo should link to the manufacturer's product page or stay un-linked — never link into the Teddy quote funnel.
- If the Teddy relationship with a brand changes (installer-program lapses, product discontinued), remove the logo from `brands.ts` and delete the asset.

## Automatic fallback

The `BrandMarquee` component renders a text wordmark in Fraunces display at the slot size when no SVG is present. Shipping the component without logos is safe — the fallback reads as an intentional "brands we install" typographic list.
