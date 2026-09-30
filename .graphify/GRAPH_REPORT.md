# Graph Report - .  (2026-09-30)

## Corpus Check
- Corpus is ~1,150 words - fits in a single context window. You may not need a graph.

## Summary
- 17 nodes · 12 edges · 5 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output
- Edge kinds: contains: 12


## Input Scope
- Requested: committed
- Resolved: committed (source: cli)
- Included files: 5 · Candidates: 19
- Excluded: 11 untracked · 40677 ignored · 0 sensitive · 0 missing committed
- Recommendation: Use --scope all or graphify.yaml inputs.corpus for a knowledge-base folder.

## Graph Freshness
- Built from Git commit: `b851c1f`
- Compare this hash to `git rev-parse HEAD` before trusting freshness-sensitive graph output.
## God Nodes (most connected - your core abstractions)
1. `eslintConfig` - 1 edges
2. `nextConfig` - 1 edges
3. `config` - 1 edges
4. `geistSans` - 1 edges
5. `geistMono` - 1 edges
6. `metadata` - 1 edges
7. `Project` - 1 edges
8. `initialProviders` - 1 edges
9. `initialProjects` - 1 edges
10. `initialSteps` - 1 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Communities

### Community 0 - "Community 0"
Cohesion: 0.33
Nodes (4): initialProjects, initialProviders, initialSteps, Project

### Community 1 - "Community 1"
Cohesion: 0.40
Nodes (3): geistMono, geistSans, metadata

### Community 2 - "Community 2"
Cohesion: 1.00
Nodes (1): eslintConfig

### Community 3 - "Community 3"
Cohesion: 1.00
Nodes (1): nextConfig

### Community 4 - "Community 4"
Cohesion: 1.00
Nodes (1): config

## Knowledge Gaps
- **10 isolated node(s):** `eslintConfig`, `nextConfig`, `config`, `geistSans`, `geistMono` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 2`** (1 nodes): `eslintConfig`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 3`** (1 nodes): `nextConfig`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 4`** (1 nodes): `config`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What connects `eslintConfig`, `nextConfig`, `config` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._