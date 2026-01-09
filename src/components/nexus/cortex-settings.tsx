'use client';

import { CheckCircle, AlertTriangle, Lock, Key } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { providerStatus } from '@/lib/ai-providers';

export function CortexSettings() {
  return (
    <div className="fade-in">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Active Mode */}
        <div className="glass p-6 rounded-xl border-l-4 border-green-500">
          <h2 className="text-lg font-bold text-white mb-2">
            Simulation Mode (Active)
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            Currently, Nexus uses Google Gemini to{' '}
            <strong className="text-white">simulate</strong> the perspectives of
            Claude and Grok for synthesis. This ensures functionality without
            requiring extra API keys.
          </p>
          <div className="flex items-center space-x-2 text-xs font-mono text-green-400">
            <CheckCircle className="w-4 h-4" />
            <span>CORE ENGINE ONLINE</span>
          </div>
        </div>

        {/* Provider Status */}
        <div className="glass p-6 rounded-xl">
          <h2 className="text-lg font-bold text-white mb-4">Provider Status</h2>
          <div className="space-y-3">
            {Object.entries(providerStatus).map(([model, status]) => (
              <div
                key={model}
                className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      status.available && !status.simulated
                        ? 'bg-green-500'
                        : status.simulated
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                  />
                  <span className="font-mono text-sm text-white uppercase">
                    {model}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {status.available && !status.simulated
                    ? 'Native'
                    : status.simulated
                    ? 'Simulated'
                    : 'Offline'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* API Keys (Coming Soon) */}
        <div className="glass p-6 rounded-xl opacity-50 pointer-events-none">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Key className="w-4 h-4" />
              External API Keys
            </h2>
            <span className="text-[10px] bg-red-900 text-red-300 px-2 py-1 rounded flex items-center gap-1">
              <Lock className="w-3 h-3" />
              COMING SOON
            </span>
          </div>
          <p className="text-xs text-gray-500 mb-4">
            Direct browser integration for Anthropic/xAI keys requires a backend
            proxy due to CORS restrictions. This feature will be available when
            the backend service is deployed.
          </p>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">
                Anthropic (Claude)
              </label>
              <Input
                type="password"
                placeholder="sk-ant-..."
                disabled
                className="opacity-50"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">xAI (Grok)</label>
              <Input
                type="password"
                placeholder="xai-..."
                disabled
                className="opacity-50"
              />
            </div>
          </div>
        </div>

        {/* Environment Notice */}
        <div className="glass p-4 rounded-xl border border-yellow-500/30">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-yellow-400 mb-1">
                Backend Required for Full Triad
              </h3>
              <p className="text-xs text-gray-400">
                To enable true multi-model synthesis with actual Claude and Grok
                APIs, deploy the backend service with your API keys configured as
                environment variables.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
