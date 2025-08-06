# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

帆書聽書 (Fan Shu) Landing Page - A Chinese audiobook platform landing page featuring books, audiobooks, courses, and community features. This is a static website with JSON-based data management and client-side rendering.

## Development Commands

Since this is a static website, there are no build scripts or package.json. The site runs directly in a browser or local server:

```bash
# Serve locally (using Python)
python3 -m http.server 8000

# Or using Node.js
npx http-server .
```

## Architecture Overview

### Data Management Architecture
The project uses a JSON-based data structure with a specific folder naming convention:

- **Books**: `/books/` directory with `books.json` and individual numbered folders (`0001_bookname`, `0002_bookname`, etc.)
- **Audiobooks**: `/audiobooks/` directory with same structure
- **Courses**: `/courses/` directory with same structure
- **Community**: `/community/` directory with `community.json`

Each content item has:
- `books.json` or equivalent with metadata
- Individual folders containing `image.png` and `intro.txt`
- Featured content in `featured/` subdirectory with `featured.json`

### Critical JSON Structure
Each book/audiobook/course entry must include:
```json
{
    "name": "Display name",
    "title": "Full title", 
    "speaker": "Speaker/Author",
    "price": "99 NTD",
    "category": "Category name",
    "image": "path/to/folder/image.png",
    "folder": "parent_folder_name",
    "folderName": "0001_actual_folder_name"
}
```

**IMPORTANT**: The `folderName` field is crucial for loading `intro.txt` files. It maps to the actual numbered folder name on disk.

### JavaScript Module System
- `utils_books.js` - Core data fetching and book display utilities
- `utils_carousel.js` - Carousel/slider functionality  
- `utils_mobile_menu.js` - Mobile navigation
- Page-specific JS files (`index.js`, `books.js`, `audiobooks.js`, etc.)

### Content Loading Flow
1. Page JS loads → calls `fetchAllBooks(folder)` or `fetchFeaturedBooks(folder)`
2. `utils_books.js` fetches JSON data
3. `displayBooks()` renders content with `onclick="openBookDetail()"`
4. Detail page loads → `book-detail.js` fetches individual `intro.txt` using `folderName`

### CSS Architecture
- CSS custom properties for theming in `:root`
- Color scheme: `#BDA588` (primary), `#767064` (secondary), `#DDDBDA` (light)
- Mobile-first responsive design with desktop overrides
- Category filtering with both desktop buttons and mobile dropdown

## Key Patterns

### Adding New Content
1. Create numbered folder (e.g., `0031_new_book`)
2. Add `image.png` and `intro.txt` to folder
3. Update corresponding `books.json` with all required fields including `folderName`
4. For featured content, also update `featured/featured.json`

### File Path Resolution
The system tries multiple paths for `intro.txt`:
1. `folder/folderName/intro.txt` (primary)
2. `folder/featured/folderName/intro.txt` (fallback)
3. Legacy encoded paths (backward compatibility)

### Category Filtering
- Implemented in `audiobooks.js` and similar pages
- Dynamic filter generation from JSON data
- Supports both desktop button UI and mobile dropdown

## Common Issues

### 404 Errors for intro.txt
- Ensure `folderName` in JSON matches actual folder name exactly
- Check folder naming follows `0001_name` pattern
- Verify `intro.txt` exists in the numbered folder

### Image Loading Issues  
- Images should be in same folder as `intro.txt`
- Path in JSON should match folder structure exactly
- Fallback SVG placeholder is automatically used for missing images

### Mobile Menu Issues
- Hamburger menu controlled by `utils_mobile_menu.js`
- Toggle functionality depends on proper CSS classes and event listeners

## Content Structure Requirements

All content folders must follow this structure:
```
content_type/
├── books.json                 # Main content index
├── 0001_item_name/
│   ├── image.png             # Required image
│   └── intro.txt             # Required description
├── 0002_item_name/
└── featured/
    ├── featured.json         # Featured items index
    └── item_folders...       # Same structure as parent
```