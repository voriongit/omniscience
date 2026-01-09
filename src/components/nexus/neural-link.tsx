'use client';

import { useState } from 'react';
import { PenLine, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { KnowledgeLevel } from '@/types';

interface NeuralLinkProps {
  onSubmit?: (data: { term: string; definition: string; level: KnowledgeLevel }) => void;
}

export function NeuralLink({ onSubmit }: NeuralLinkProps) {
  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState('');
  const [level, setLevel] = useState<KnowledgeLevel>('novice');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!term.trim() || !definition.trim()) return;

    setIsSubmitting(true);

    // Simulate submission (replace with actual Firebase/API call)
    await new Promise(r => setTimeout(r, 1000));

    onSubmit?.({ term, definition, level });

    // Reset form
    setTerm('');
    setDefinition('');
    setLevel('novice');
    setIsSubmitting(false);
  };

  return (
    <div className="fade-in">
      <div className="max-w-2xl mx-auto glass p-8 rounded-xl border border-purple-500/20">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center">
          <PenLine className="w-5 h-5 mr-3 text-purple-400" />
          Manual Ingestion
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={term}
              onChange={e => setTerm(e.target.value)}
              placeholder="Term Name"
              required
              className="focus:border-purple-500"
            />
            <select
              value={level}
              onChange={e => setLevel(e.target.value as KnowledgeLevel)}
              className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-purple-500"
            >
              <option value="novice">Novice</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
              <option value="theoretical">Theoretical</option>
            </select>
          </div>

          <textarea
            value={definition}
            onChange={e => setDefinition(e.target.value)}
            rows={4}
            placeholder="Definition..."
            required
            className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500 resize-none"
          />

          <Button
            type="submit"
            disabled={isSubmitting || !term.trim() || !definition.trim()}
            className="w-full bg-purple-600 hover:bg-purple-500 font-bold tracking-wide"
          >
            {isSubmitting ? (
              <>
                <Upload className="w-4 h-4 mr-2 animate-pulse" />
                UPLOADING...
              </>
            ) : (
              'COMMIT TO MEMORY'
            )}
          </Button>
        </form>

        <p className="text-xs text-gray-500 mt-4 text-center">
          Terms added here will sync to the cloud when Firebase is connected.
        </p>
      </div>
    </div>
  );
}
