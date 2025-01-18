# Personal Site & AI-Enhanced Blog Platform

A modern, markdown-based static site that will evolve into an AI-enhanced platform for sharing insights about growth, marketing, and technology.

## Project Vision

This project is being developed in multiple phases:

1. **Phase 1: Technical Foundation** _(Current)_
   - Static site generation from markdown
   - Clean, modern UI with app-like navigation
   - Responsive design and optimal reading experience

2. **Phase 2: AI Integration** _(Planned)_
   - Recommendation engine for content discovery
   - AI-assisted writing and editing tools
   - Smart content organization

3. **Phase 3: Distribution & Engagement** _(Planned)_
   - Automated social media distribution
   - Email newsletter integration
   - Analytics and engagement tracking

4. **Phase 4: Meta Layer** _(Planned)_
   - Behind-the-scenes explanations of tech choices
   - Transparent AI system documentation
   - Learning resources and tutorials

## Current Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Build System:** Node.js-based static site generator
- **Content:** Markdown with YAML front matter
- **Development Server:** http-server

## Project Structure

```
.
├── src/
│   ├── pages/          # Markdown content
│   ├── templates/      # HTML templates
│   ├── styles/         # CSS files
│   └── scripts/        # JavaScript files
├── public/            # Built site (generated)
├── build.js           # Static site generator
└── server.js          # Development server
```

## Getting Started

1. **Installation**
   ```bash
   npm install
   ```

2. **Development**
   ```bash
   # Build the site
   npm run build

   # Start local server
   npm run serve
   ```

3. **View the Site**
   - Open http://localhost:3000 in your browser

## Future Development

- Integration with AI services (OpenAI, Anthropic)
- Express/serverless backend for dynamic features
- Enhanced content management and distribution tools

## Contributing

This is a personal project, but I welcome feedback and suggestions! Feel free to:
1. Open an issue for bugs or feature requests
2. Submit a pull request for improvements
3. Reach out with questions or ideas

## License

ISC License - See LICENSE file for details