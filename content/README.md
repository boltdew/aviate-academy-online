
# Content Directory Structure

This directory should contain your markdown files organized by ATA chapters and subsections.

## Expected Structure:
```
content/
├── 21/                          # ATA Chapter 21 - Air Conditioning
│   ├── basics/
│   │   ├── introduction.md
│   │   └── components.md
│   ├── systems/
│   │   ├── pack-systems.md
│   │   └── distribution.md
│   └── troubleshooting.md
├── 24/                          # ATA Chapter 24 - Electrical Power
│   ├── fundamentals/
│   │   └── ac-dc-systems.md
│   └── generators.md
└── 29/                          # ATA Chapter 29 - Hydraulic Power
    ├── basics/
    │   └── principles.md
    └── components/
        ├── pumps.md
        └── reservoirs.md
```

## Expected Frontmatter Format:
```yaml
---
title: "Hydraulic System Fundamentals"
difficulty: "Beginner"
duration: 45
description: "Introduction to hydraulic principles in aircraft systems"
tags: ["hydraulics", "fundamentals", "systems"]
author: "AeroLearn Team"
lastUpdated: "2024-01-15"
---
```

## Notes:
- Files are processed at build time by the Vite plugin
- Directory names become ATA chapters and subsections
- Frontmatter is parsed and stored as metadata
- Content is indexed for fast searching and filtering
