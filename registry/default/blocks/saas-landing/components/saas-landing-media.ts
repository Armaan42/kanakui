/**
 * Photos used by the template. All are from Unsplash (https://unsplash.com),
 * free to use under the Unsplash License, and loaded from Unsplash's image
 * CDN. Replace them with your own photos before you launch.
 */
function unsplash(id: string, width: number, height: number, faces = false) {
  const crop = faces ? "&crop=faces" : ""
  return `https://images.unsplash.com/photo-${id}?w=${width}&h=${height}&fit=crop${crop}&auto=format&q=80`
}

export function portrait(id: string, size = 96) {
  return unsplash(id, size, size, true)
}

export const photos = {
  caseStudy: unsplash("1600880292203-757bb62b4baf", 1200, 900),
  cta: unsplash("1522071820081-009f0129c71c", 1600, 900),
}

/** Faces in the hero's "rated by" row. */
export const heroAvatars = [
  "1531123897727-8f129e1688ce",
  "1500648767791-00dcc994a43e",
  "1544005313-94ddf0286df2",
  "1560250097-0b93528c311a",
  "1517841905240-472988babdf9",
]
