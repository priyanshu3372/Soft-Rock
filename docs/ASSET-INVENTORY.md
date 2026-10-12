# Asset inventory & research log

Research date: 12 October 2026.

## Sources

| Source | Status |
| --- | --- |
| YouTube: [youtube.com/@softrockband](https://www.youtube.com/@softrockband) (channel "SoftRock Band", ID `UCBFaQ0K3Itpkk6cG96D0Wew`) | ✅ Public. Channel page, RSS feed and video descriptions read. oEmbed confirms every video below is authored by "SoftRock Band" and embeddable. |
| Instagram: [instagram.com/softrock_band](https://www.instagram.com/softrock_band/) | ⚠️ Requires login for profile content. Not scraped; linked only. Linked from the band's own YouTube descriptions, which confirms the handle. |

## Verified facts used on the site

| Fact | Where it was published |
| --- | --- |
| "Sufi-Rock Fusion Band." | YouTube channel description |
| Based in Delhi NCR | Showreel & Dhol Sessions descriptions ("SoftRock Band – Delhi NCR") |
| Repertoire: Rock, Bollywood, Sufi, Commercial | Showreel & Dhol Sessions descriptions |
| Show types: concerts, weddings, corporate events, private parties, premium venues | Showreel & Dhol Sessions descriptions |
| Instruments: vocals, electric guitars, bass, keyboards, drums; dholak & tabla | Showreel description; Andaz E Karam credits |
| Bairagi, "A Sufi Project" by SoftRock Band; quote "We wanted to blend the soulful depth of traditional Sufi music with the energy of a Softrock band" | Andaz E Karam X Dillagi description |
| Credits: Sushil (vocals), Daksh (electric guitars), Aman (keyboard, dholak, backing vocals), V.N Shukla (drums), Kartikey Singh (bass), Priyanshu Sinha (tabla), Suhan (backing vocals); Music direction: Softrock Live; Production/mix/master: Mayank Soni (Soni's Records) | Andaz E Karam X Dillagi description. Shown as credits for that recording, not as a fixed line-up. Photos are deliberately not matched to names. |
| Booking contact: softrocklive@gmail.com, 9548260625 | Several video descriptions ("For Band Booking & Business Queries…") |
| Past performances: Bareilly; private events 2024; a wedding 2024; Bairagi Live 2026 | Video titles only. No venues or dates invented. |

Not found, so not shown: founding year, hometown story, member bios, discography, awards, statistics, upcoming dates. The upcoming-shows list is empty by design.

## Videos (all official, embedded via youtube-nocookie)

Long-form: `2Txv6byfx9o` Andaz E Karam X Dillagi (featured) · `5XO-AM4p7Kc` Bairagi Live showreel · `JvdD9eNfiSk` Dhol Sessions · `8pSPAa2Zj54` Wedding Diaries Raw 2024 · `QY0_X81BeNg` Live Rocking Sessions 2024 · `4A9ZzpMCDoU` Dil Mein Bazi Guitar soundcheck.

Shorts: `pG_VfHe16ts`, `HTyDq8TxYRM`, `BWpXqgyr8F4`, `PTJRRIrGhgg`, `wETp0P13ru4`, `j_nybWc1HEE`, `3zmfqcRo9ow`, `yQq6i9Beurw`, `z_w88ci06qI`, `yxuzXpOMcJ0`, `3rA5d7x_BNA`, `DhOVxgLELaE`.
Excluded: `iRuJ_IfGJn8` (a landscape clip with no band content).

Video thumbnails are loaded from YouTube's image CDN at runtime (`i.ytimg.com`), not rehosted.

## Images

All photos are official Softrock content, converted to WebP in `public/images/photos/`. Every file's alt text, caption and category is in `src/data/gallery.ts`.

**Band photographs (supplied by the band, October 2026).** 25 originals (JPEG, PNG phone screenshots, one HEIF) were resized to a 2400px long edge (2000px for portrait shots) and converted to WebP at quality 80, about 5 MB in total. Black bars on the phone screenshots were trimmed. The raw originals (about 230 MB) were moved out of `public/` to `/photo-originals/`, which is git-ignored. Back them up separately.

| File (`photos/…`) | Used for |
| --- | --- |
| `stage-softrock-logo` | Home hero, structured-data image, "Live Rocking Sessions" card, gallery |
| `stage-round-band` | Home live section, Contact hero, gallery |
| `band-portrait-suits` | Band page hero, home mosaic, gallery |
| `band-portrait-white` | Band page group photo, home mosaic, gallery |
| `sufi-set-wide` | Music hero, home mosaic, gallery |
| `sufi-set-2` | Home "About" main image, gallery |
| `drums-stage` | Home "About" inset, Band page strip, gallery |
| `studio-xo-1`, `studio-xo-2` | Home live section, Gallery hero, gallery |
| `bairagi-stage-vocals`, `bass-1`, `vocals-velvet`, `crowd-wedding-front` | Home mosaic, gallery (`crowd-wedding-front` also on the "Wedding Diaries" card) |
| `vocals-stripes-1`, `bass-2`, `sufi-set-3` | Band page strip (and gallery, except `bass-2`, which is a near-duplicate of `bass-1`) |
| `stage-white-suit`, `crowd-chandelier`, `vocals-mono`, `vocals-neon` | Live Shows photo band, gallery |
| `drums-closeup` | "Live at Bareilly" card, gallery |
| `sufi-set-1`, `vocals-stripes-2`, `soundcheck-open-air`, `soundcheck-drums` | Gallery |

**YouTube stills (kept from the first build).** Each is a frame from an official upload, and its source video is recorded in `sourceVideoId`.

| File (`photos/…`) | Source video | Used for |
| --- | --- | --- |
| `bairagi-heritage-3.webp` | `2Txv6byfx9o` | Featured-video poster (home and Music), gallery |
| `crowd-dance-2.webp` | `5XO-AM4p7Kc` | Live Shows hero, home live section, gallery |
| `bairagi-night-stage.webp` | `5XO-AM4p7Kc` | "Bairagi Live" card, gallery |
| `backdrop-night-bokeh.webp` | `5XO-AM4p7Kc` (heavily blurred) | Booking call-to-action background |
| `dhol-session-stage.webp` | `JvdD9eNfiSk` | Gallery |
| `portrait-vocals-1/2`, `portrait-heritage-arch`, `portrait-stripes`, `portrait-night-crowd` | Shorts `pG_VfHe16ts`, `HTyDq8TxYRM`, `PTJRRIrGhgg`, `BWpXqgyr8F4` | Band page Bairagi section, gallery |

`brand/softrock-logo.png` is the channel avatar (the official logo), with its black field converted to transparency. It is used in the header, footer, icons and OG image.

### Notes
- The lightbox's "Source video" link appears only on YouTube stills.
- Captions on band photographs are descriptive ("Live on stage", "Sufi set", "Studio XO"). No event names or dates were invented. Add them in `gallery.ts` once known.
- Three of the four documented-performance cards on Live Shows (Wedding Diaries, Live Rocking Sessions, Live at Bareilly) now use representative band photos. They are not frames from those videos. The "Bairagi Live" card still uses a frame from its own video.
