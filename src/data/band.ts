/**
 * Band story content.
 *
 * Only verified statements are used. Quoted copy is taken from the band's own
 * YouTube descriptions; everything else is presentation copy that makes no
 * factual claims (no founding date, hometown story, awards or statistics).
 * Edit freely once the band supplies an official biography.
 */

export const bandIntro = {
  eyebrow: "Sufi-Rock Fusion · Delhi NCR",
  lead:
    "Softrock is a live band from Delhi NCR that plays where the soulful depth of Sufi music meets the drive of a rock band.",
  body: [
    "Powerful vocals, electric guitars, grooving bass, keyboards and hard-hitting drums sit alongside dholak and tabla. The set moves from rock and Bollywood to Sufi and commercial hits, and it is built for the room it is played in.",
    "You'll find the band on stage at concerts, weddings, corporate events, private parties and premium venues, playing the songs people came to sing along to.",
  ],
} as const;

export const bairagi = {
  name: "Bairagi",
  subtitle: "A Sufi Project by Softrock",
  /** Verbatim from the "Andaz E Karam X Dillagi" video description. */
  quote:
    "We wanted to blend the soulful depth of traditional Sufi music with the energy of a Softrock band.",
  quoteSource: "Softrock, on Andaz E Karam X Dillagi",
  body:
    "Bairagi is Softrock's Sufi project. On stage, Bairagi Live brings qawwali-rooted classics to a full rock line-up. On record, its centrepiece is the mashup Andaz E Karam X Dillagi, recorded, mixed and mastered at Soni's Records.",
} as const;

/**
 * Musicians credited in the description of "Andaz E Karam X Dillagi | Bairagi"
 * (youtube.com/watch?v=2Txv6byfx9o). These are credits for that recording.
 * They are not presented as a permanent line-up, and photos are deliberately
 * not matched to names.
 */
export const performanceCredits = {
  source: {
    label: "Andaz E Karam X Dillagi · Bairagi (A Sufi Project)",
    videoId: "2Txv6byfx9o",
  },
  musicians: [
    { name: "Sushil", role: "Vocals" },
    { name: "Daksh", role: "Electric guitars" },
    { name: "Aman", role: "Keyboard, dholak & backing vocals" },
    { name: "V.N Shukla", role: "Drums" },
    { name: "Kartikey Singh", role: "Bass" },
    { name: "Priyanshu Sinha", role: "Tabla" },
    { name: "Suhan", role: "Backing vocals" },
  ],
  production: [
    { name: "Softrock Live", role: "Music direction" },
    { name: "Mayank Soni (Soni's Records)", role: "Production, mixing & mastering" },
  ],
} as const;

/** The live experience, from the band's showreel descriptions. */
export const liveExperience = [
  {
    title: "The full band",
    text: "Vocals, electric guitars, bass, keyboards and drums: a complete live rock line-up on stage.",
  },
  {
    title: "Sufi & folk percussion",
    text: "Dholak, tabla and dhol sessions bring a texture to the set that you won't get from a standard cover band.",
  },
  {
    title: "Rock · Bollywood · Sufi · Commercial",
    text: "One set that moves from qawwali classics to Bollywood singalongs and rock energy.",
  },
] as const;
