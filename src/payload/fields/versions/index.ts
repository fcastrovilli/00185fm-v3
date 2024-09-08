export const versionsField = () => {
  return {
    versions: {
      drafts: {
        autosave: {
          interval: 100, // We set this interval for optimal live preview
        },
      },
      maxPerDoc: 20,
    },
  }
}
