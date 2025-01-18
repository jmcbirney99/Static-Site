# Technical Decisions Log

## Architecture Decisions

### Static Site Generator (Custom) - 2024-03-20
- **Decision:** Built a custom static site generator using Node.js instead of using Next.js or Astro
- **Rationale:** 
  - Simpler architecture for Phase 1
  - Better learning opportunity
  - Easier to explain in the meta-layer
  - Can be extended or migrated as needed

### App-Like Navigation - 2024-03-20
- **Decision:** Implemented a left-aligned, app-style navigation
- **Rationale:**
  - Better user experience for content-heavy site
  - Familiar interface pattern from tools like Notion
  - Easy access to all sections
  - Scales well for future features

### Markdown with YAML Front Matter - 2024-03-20
- **Decision:** Using markdown files with YAML front matter for content
- **Rationale:**
  - Easy to write and maintain content
  - Structured metadata for future AI processing
  - Version control friendly
  - Can be extended with custom fields

## Future Considerations

### API Integration (Planned)
- Will need Express.js or serverless functions for:
  - OpenAI/Anthropic API calls
  - ConvertKit integration
  - Analytics tracking

### Database (Planned)
- Considering lightweight options:
  - Supabase for structured data
  - MongoDB for flexible document storage
  - Will decide based on data modeling needs 