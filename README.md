# Smart Kanban

A Kanban board plugin for [Obsidian](https://obsidian.md) that turns your notes and tasks into an interactive board — powered by frontmatter and inline fields.

## Features

### Views
- **Board** — drag & drop cards between lanes
- **Table** — sortable spreadsheet view
- **List** — grouped by status
- **Feed** — flat chronological list

### Data Sources
- **Notes mode** — each note is a card, status/priority/tags come from frontmatter
- **Tasks mode** — checklist items with `[Field:: value]` inline fields become cards

### Multi-Board
- Create independent boards with their own source folders and settings
- Create **filtered views** that inherit from a parent board but show only selected statuses
- Per-board setting overrides (colors, fields, sort, WIP limits, etc.)

### Organization
- Filter by category, priority, or tag via dropdown filters
- Click any badge to instantly filter by that value
- Save and load **filter presets**
- Sort by priority, due date, or title (header controls)
- **WIP limits** per lane with visual warnings

### Appearance
- 5 built-in theme presets: Default, Warm, Graphite, Ocean Mist, Midnight Pro
- Per-lane header colors (preset defaults + custom overrides)
- Custom tag and category badge colors
- Full theme override support (card, lane, board, tag, priority colors)

### Dates
- Due date badges with relative labels ("Due tomorrow", "Overdue 3d")
- Configurable date save format and display format
- Toggle between relative and absolute date display

### Other
- **Note templates** — new cards use a template file with `{{title}}` and `{{date}}` tokens
- **Quick-add** — inline input at the bottom of each lane
- **Custom fields** — display any frontmatter key as a badge on cards
- **Auto-archive** — hide completed cards older than N days
- **i18n** — English and Turkish

## Installation

### From Community Plugins (recommended)

1. Open **Settings → Community Plugins → Browse**
2. Search for **Smart Kanban**
3. Click **Install**, then **Enable**

### Manual

1. Download `main.js`, `manifest.json`, and `styles.css` from the [latest release](https://github.com/ramazanayyildiz/obsidian-smart-kanban/releases/latest)
2. Create a folder: `<vault>/.obsidian/plugins/obsidian-smart-kanban/`
3. Place the three files inside it
4. Enable the plugin in **Settings → Community Plugins**

## Quick Start

1. Create a folder (e.g. `Tasks/`) and add some notes with frontmatter:

```yaml
---
Status: Todo
Priority: High
Category: Work
Tags: design, ui
Due Date: 2025-04-15
---

# My Task
Details here...
```

2. Open the command palette and run **Open Smart Kanban**
3. Go to **Settings → Smart Kanban** to configure your source folder and fields

## Settings

| Setting | Description | Default |
|---------|-------------|---------|
| Source mode | `notes` (one note = one card) or `tasks` (checklist items) | `notes` |
| Source folder | Folder to scan for cards | `Tasks` |
| Include subfolders | Scan nested folders | `false` |
| Status field | Frontmatter key for lane assignment | `Status` |
| Category field | Frontmatter key for category badge | `Category` |
| Priority field | Frontmatter key for priority badge | `Priority` |
| Tags field | Frontmatter key for tags | `Tags` |
| Due Date field | Frontmatter key for due dates | `Due Date` |
| Status order | Lane order on the board | `Backlog, Todo, In Progress, ...` |
| Priority order | Priority ranking | `Urgent, High, Medium, Low` |
| WIP limits | Max cards per lane (e.g. `In Progress: 3`) | — |
| Theme preset | Visual theme | `default` |
| Date format | Storage format | `YYYY-MM-DD` |
| Show relative dates | "Due in 3d" vs absolute date | `true` |
| Note template | Template file path for new cards | — |
| Language | UI language | `en` |

All settings (except language) can be overridden per board.

## Task Mode

In task mode, cards come from checklist lines with inline fields:

```markdown
- [ ] Design the homepage [Status:: Todo] [Priority:: High] [Tags:: design, ui]
- [x] Fix login bug [Status:: Done] [Category:: Backend]
```

Set **Task inbox file** to the file where new tasks are appended.

## License

[MIT](LICENSE)
