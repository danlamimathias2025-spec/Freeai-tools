/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { ExternalLink, Search, Cpu, Globe, Code, Box, Layers, Sparkles, Info, Shield } from 'lucide-react';

const tools = [
  // Local & Downloadable
  {
    name: 'Stable Diffusion (Automatic1111)',
    description: 'Professional-grade AI image generation.',
    url: 'https://github.com/AUTOMATIC1111/stable-diffusion-webui',
    category: 'Local & Downloadable',
    icon: <Box className="w-6 h-6" />
  },
  {
    name: 'Llama.cpp / Ollama',
    description: 'Allows you to run LLMs like Llama 3, Mistral, and Phi-3 locally for private chatting and coding.',
    url: 'https://ollama.com/',
    category: 'Local & Downloadable',
    icon: <Cpu className="w-6 h-6" />
  },
  {
    name: 'OpenAI Whisper',
    description: 'The gold standard for speech-to-text transcription. Free to download and use indefinitely.',
    url: 'https://github.com/openai/whisper',
    category: 'Local & Downloadable',
    icon: <Cpu className="w-6 h-6" />
  },
  {
    name: 'Audacity (with Intel OpenVINO)',
    description: 'A free audio editor that adds AI features like noise suppression and transcription via plugins.',
    url: 'https://www.audacityteam.org/',
    category: 'Local & Downloadable',
    icon: <Box className="w-6 h-6" />
  },
  {
    name: 'Blender',
    description: 'A massive 3D creation suite. Entirely free and open-source with built-in AI rendering and animation tools.',
    url: 'https://www.blender.org/',
    category: 'Local & Downloadable',
    icon: <Box className="w-6 h-6" />
  },
  {
    name: 'LM Studio',
    description: 'Discover, download, and run local LLMs completely offline.',
    url: 'https://lmstudio.ai/',
    category: 'Local & Downloadable',
    icon: <Cpu className="w-6 h-6" />
  },
  {
    name: 'GPT4All',
    description: 'A free-to-use, locally running, privacy-aware chatbot. No GPU or internet required.',
    url: 'https://gpt4all.io/',
    category: 'Local & Downloadable',
    icon: <Cpu className="w-6 h-6" />
  },
  {
    name: 'ComfyUI',
    description: 'A powerful and modular stable diffusion GUI with a node-based interface.',
    url: 'https://github.com/comfyanonymous/ComfyUI',
    category: 'Local & Downloadable',
    icon: <Layers className="w-6 h-6" />
  },
  {
    name: 'Jan',
    description: 'Open-source ChatGPT alternative that runs 100% offline on your computer.',
    url: 'https://jan.ai/',
    category: 'Local & Downloadable',
    icon: <Cpu className="w-6 h-6" />
  },

  // Web-Based & Accessible
  {
    name: 'DeepSeek-R1',
    description: 'A powerful reasoning model (comparable to GPT-4o) that is currently free for public use via their web interface.',
    url: 'https://chat.deepseek.com/',
    category: 'Web-Based & Accessible',
    icon: <Globe className="w-6 h-6" />
  },
  {
    name: 'DuckDuckGo AI Chat',
    description: 'Provides anonymous access to models like GPT-4o mini and Claude 3 Haiku without accounts or fees.',
    url: 'https://duckduckgo.com/chat',
    category: 'Web-Based & Accessible',
    icon: <Globe className="w-6 h-6" />
  },
  {
    name: 'Hugging Face Chat',
    description: 'A platform to test hundreds of open-source models (like Llama and Qwen) from various creators at zero cost.',
    url: 'https://huggingface.co/chat/',
    category: 'Web-Based & Accessible',
    icon: <Globe className="w-6 h-6" />
  },
  {
    name: 'Google NotebookLM',
    description: 'A research and note-taking assistant. While part of the Google ecosystem, it does not currently have a separate "Pro" tier.',
    url: 'https://notebooklm.google.com/',
    category: 'Web-Based & Accessible',
    icon: <Globe className="w-6 h-6" />
  },
  {
    name: 'AIFreeForever',
    description: 'A web portal offering simple AI writing, image generation, and editing tools without registration.',
    url: 'https://aifreeforever.com/',
    category: 'Web-Based & Accessible',
    icon: <Globe className="w-6 h-6" />
  },
  {
    name: 'Civitai',
    description: 'A platform to share and discover AI art models, LoRAs, and embeddings (mostly free to download).',
    url: 'https://civitai.com/',
    category: 'Web-Based & Accessible',
    icon: <Globe className="w-6 h-6" />
  },

  // Developer & Technical Libraries
  {
    name: 'PyTorch / TensorFlow',
    description: 'The foundation libraries for all modern AI. 100% free for building and training your own models.',
    url: 'https://pytorch.org/',
    category: 'Developer & Technical Libraries',
    icon: <Code className="w-6 h-6" />
  },
  {
    name: 'Scikit-learn',
    description: 'Free Python library used for data mining, data analysis, and basic machine learning.',
    url: 'https://scikit-learn.org/',
    category: 'Developer & Technical Libraries',
    icon: <Code className="w-6 h-6" />
  },
  {
    name: 'OpenCV',
    description: 'The primary open-source library for computer vision (facial recognition, object detection, etc).',
    url: 'https://opencv.org/',
    category: 'Developer & Technical Libraries',
    icon: <Code className="w-6 h-6" />
  },
  {
    name: 'Transformers (Hugging Face)',
    description: 'APIs and tools to easily download and train state-of-the-art pretrained models.',
    url: 'https://huggingface.co/docs/transformers/index',
    category: 'Developer & Technical Libraries',
    icon: <Code className="w-6 h-6" />
  }
];

const categories = Array.from(new Set(tools.map(t => t.category)));

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentView, setCurrentView] = useState<'home' | 'about' | 'privacy'>('home');

  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || tool.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-indigo-500/30 flex flex-col">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center justify-between w-full md:w-auto">
              <div 
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => setCurrentView('home')}
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-white group-hover:text-indigo-400 transition-colors">FreeAi</h1>
                  <p className="text-sm text-zinc-400 hidden sm:block">Unlimited AI tools with no paid plans</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
              <nav className="flex items-center gap-4 sm:gap-6 text-sm font-medium text-zinc-400">
                <button onClick={() => setCurrentView('home')} className={`hover:text-zinc-100 transition-colors flex items-center gap-1.5 ${currentView === 'home' ? 'text-zinc-100' : ''}`}>
                  Home
                </button>
                <button onClick={() => setCurrentView('about')} className={`hover:text-zinc-100 transition-colors flex items-center gap-1.5 ${currentView === 'about' ? 'text-zinc-100' : ''}`}>
                  <Info className="w-4 h-4" /> About
                </button>
                <button onClick={() => setCurrentView('privacy')} className={`hover:text-zinc-100 transition-colors flex items-center gap-1.5 ${currentView === 'privacy' ? 'text-zinc-100' : ''}`}>
                  <Shield className="w-4 h-4" /> Privacy
                </button>
              </nav>

              {currentView === 'home' && (
                <div className="relative w-full sm:w-64 md:w-80">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-zinc-500" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-9 pr-3 py-2 border border-zinc-800 rounded-xl leading-5 bg-zinc-900 text-zinc-300 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all"
                    placeholder="Search tools..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {currentView === 'home' && (
          <>
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-10">
              <button
                onClick={() => setActiveCategory('All')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === 'All' 
                    ? 'bg-zinc-100 text-zinc-900' 
                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 border border-zinc-800'
                }`}
              >
                All Tools
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category 
                      ? 'bg-zinc-100 text-zinc-900' 
                      : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 border border-zinc-800'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Grid */}
            {filteredTools.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTools.map((tool, index) => (
                  <a
                    key={index}
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex flex-col items-start justify-between p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-indigo-500/50 hover:bg-zinc-800/50 transition-all duration-300 overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0">
                      <ExternalLink className="w-5 h-5 text-indigo-400" />
                    </div>
                    
                    <div className="w-full">
                      <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center mb-6 text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500/10 transition-all duration-300">
                        {tool.icon}
                      </div>
                      
                      <h3 className="text-lg font-semibold text-zinc-100 mb-2 group-hover:text-indigo-300 transition-colors">
                        {tool.name}
                      </h3>
                      
                      <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                        {tool.description}
                      </p>
                    </div>
                    
                    <div className="mt-auto">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-800 text-zinc-300 border border-zinc-700">
                        {tool.category}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-900 mb-4">
                  <Search className="w-8 h-8 text-zinc-600" />
                </div>
                <h3 className="text-lg font-medium text-zinc-300 mb-1">No tools found</h3>
                <p className="text-zinc-500">We couldn't find any tools matching your search.</p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('All');
                  }}
                  className="mt-6 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg transition-colors text-sm font-medium"
                >
                  Clear filters
                </button>
              </div>
            )}
          </>
        )}

        {currentView === 'about' && (
          <div className="max-w-3xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-8 md:p-12">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 mb-6">
              <Info className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-6">About FreeAi</h2>
            
            <div className="space-y-6 text-zinc-300 leading-relaxed">
              <section>
                <h3 className="text-xl font-semibold text-zinc-100 mb-3">Our Mission</h3>
                <p>
                  The AI landscape is evolving rapidly, but many powerful tools are locked behind expensive subscription tiers or confusing usage limits. <strong>FreeAi</strong> was created with a simple mission: to curate and maintain a definitive list of truly free AI tools. 
                </p>
                <p className="mt-3">
                  We focus on tools that have no hidden "Pro" plans, no arbitrary paywalls, and no bait-and-switch pricing. Whether it's open-source software you can run locally, or web-based tools provided freely by researchers and organizations, if it's on FreeAi, it's free to use.
                </p>
              </section>

              <section className="pt-4 border-t border-zinc-800">
                <h3 className="text-xl font-semibold text-zinc-100 mb-3">What We Include</h3>
                <ul className="list-disc pl-5 space-y-2 text-zinc-400">
                  <li><strong>Local & Downloadable:</strong> Open-source software you can run on your own hardware.</li>
                  <li><strong>Web-Based:</strong> Online platforms that offer full access without subscription tiers.</li>
                  <li><strong>Libraries:</strong> Frameworks and tools for developers building the next generation of AI.</li>
                </ul>
              </section>

              <section className="pt-4 border-t border-zinc-800">
                <h3 className="text-xl font-semibold text-zinc-100 mb-3">Contribute & Feedback</h3>
                <p>
                  FreeAi is a community-driven effort. If you know of a fantastic, genuinely free AI tool that we missed, or if a tool on our list has introduced a mandatory paid tier, we want to hear from you!
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <a href="mailto:hello@freeai.example.com" className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-medium transition-colors">
                    Email Us
                  </a>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-medium transition-colors border border-zinc-700">
                    Submit on GitHub
                  </a>
                </div>
              </section>
            </div>
          </div>
        )}

        {currentView === 'privacy' && (
          <div className="max-w-3xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-8 md:p-12">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 mb-6">
              <Shield className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-6">Privacy Policy</h2>
            
            <div className="space-y-6 text-zinc-300 leading-relaxed">
              <p className="text-sm text-zinc-500">Last updated: March 26, 2026</p>
              
              <section>
                <h3 className="text-xl font-semibold text-zinc-100 mb-3">1. Information We Do Not Collect</h3>
                <p>
                  FreeAi is designed to be a simple directory. We respect your privacy and <strong>do not collect, store, or process any personal data</strong>. You do not need to create an account to use our site, and we do not track your individual browsing behavior across the web.
                </p>
              </section>

              <section className="pt-4 border-t border-zinc-800">
                <h3 className="text-xl font-semibold text-zinc-100 mb-3">2. External Links</h3>
                <p>
                  Our website contains links to external AI tools and platforms. Please be aware that we are not responsible for the content or privacy practices of such other sites. We encourage our users to be aware when they leave our site and to read the privacy statements of any other site that collects personally identifiable information.
                </p>
              </section>

              <section className="pt-4 border-t border-zinc-800">
                <h3 className="text-xl font-semibold text-zinc-100 mb-3">3. Analytics and Cookies</h3>
                <p>
                  We may use basic, privacy-friendly analytics to understand aggregate traffic (e.g., how many people visit the site). These tools do not identify you personally and do not use invasive tracking cookies.
                </p>
              </section>

              <section className="pt-4 border-t border-zinc-800">
                <h3 className="text-xl font-semibold text-zinc-100 mb-3">4. Changes to This Policy</h3>
                <p>
                  We may update our Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
                </p>
              </section>

              <section className="pt-4 border-t border-zinc-800">
                <h3 className="text-xl font-semibold text-zinc-100 mb-3">5. Contact Us</h3>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@freeai.example.com" className="text-indigo-400 hover:underline">privacy@freeai.example.com</a>.
                </p>
              </section>
            </div>
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-zinc-950 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-sm">
            &copy; {new Date().getFullYear()} FreeAi. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-zinc-500">
            <a href="https://illuminationacceptedkeynote.com/xum0v2wqd?key=5ffe66705cf9180a523d6167e6a3a02f" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-300 transition-colors">Partners</a>
            <button onClick={() => setCurrentView('about')} className="hover:text-zinc-300 transition-colors">About</button>
            <button onClick={() => setCurrentView('privacy')} className="hover:text-zinc-300 transition-colors">Privacy Policy</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
