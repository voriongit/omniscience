'use client';

import { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LexiconCard } from './lexicon-card';
import { staticLexicon, getCategories, filterLexicon } from '@/lib/lexicon-data';
import type { LexiconTerm, KnowledgeLevel } from '@/types';

interface LexiconBrowserProps {
  onSelectTerm?: (term: LexiconTerm) => void;
}

export function LexiconBrowser({ onSelectTerm }: LexiconBrowserProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<KnowledgeLevel | null>(null);

  const categories = useMemo(() => getCategories(), []);

  const filteredTerms = useMemo(() => {
    let terms = filterLexicon(search);

    if (selectedCategory) {
      terms = terms.filter(t => t.category === selectedCategory);
    }

    if (selectedLevel) {
      terms = terms.filter(t => t.level === selectedLevel);
    }

    return terms.sort((a, b) => a.term.localeCompare(b.term));
  }, [search, selectedCategory, selectedLevel]);

  const levels: KnowledgeLevel[] = ['novice', 'intermediate', 'expert', 'theoretical'];

  return (
    <div className="fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-6 border-b border-gray-800 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Knowledge Graph</h2>
          <p className="text-xs text-gray-500 font-mono mt-1">
            {filteredTerms.length} NODES • PRIMARY LOCAL STORAGE
          </p>
        </div>

        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Filter nodes..."
              className="pl-9 w-48"
            />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <div className="flex gap-1 items-center">
          <Filter className="w-4 h-4 text-gray-500 mr-1" />
          <Button
            variant={selectedCategory === null ? 'neon' : 'ghost'}
            size="sm"
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Button>
          {categories.map(cat => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'neon' : 'ghost'}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>

        <div className="w-px h-6 bg-gray-700 mx-2" />

        <div className="flex gap-1">
          {levels.map(level => (
            <Button
              key={level}
              variant={selectedLevel === level ? 'neon' : 'ghost'}
              size="sm"
              onClick={() => setSelectedLevel(selectedLevel === level ? null : level)}
              className={`badge-${level} border`}
            >
              {level}
            </Button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTerms.map(term => (
          <LexiconCard
            key={term.term}
            term={term}
            onClick={() => onSelectTerm?.(term)}
          />
        ))}
      </div>

      {filteredTerms.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p>No matching terms found.</p>
          <p className="text-xs mt-2">Try a different search or filter.</p>
        </div>
      )}
    </div>
  );
}
