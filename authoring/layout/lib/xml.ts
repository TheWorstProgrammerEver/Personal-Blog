const xmlEscapes = new Map([
  ["&", "&amp;"],
  ["<", "&lt;"],
  [">", "&gt;"],
  ['"', "&quot;"],
  ["'", "&apos;"]
])

export const escapeXml = (value: string) =>
  value.replace(/[&<>"']/g, (character) => xmlEscapes.get(character) ?? character)

export const xmlResponse = (content: string) =>
  new Response(content, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  })
