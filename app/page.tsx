'use client';
import { useState } from 'react';

export default function CitationFormatterPage() {
  const [citationStyle, setCitationStyle] = useState('APA');
  const [sourceType, setSourceType] = useState('journal');
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [journal, setJournal] = useState('');
  const [volume, setVolume] = useState('');
  const [issue, setIssue] = useState('');
  const [pages, setPages] = useState('');
  const [doi, setDoi] = useState('');
  const [url, setUrl] = useState('');
  const [publisher, setPublisher] = useState('');
  const [location, setLocation] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !title.trim()) return;
    setLoading(true); setError(''); setResult('');
    const prompt = `Format the following source as a complete bibliographic citation AND in-text citation in ${citationStyle} style.

Source Type: ${sourceType}
Citation Style: ${citationStyle}

Source Details:
Author(s): ${author}
Title: ${title}
Year: ${year || 'n.d.'}
Journal Name: ${journal || 'N/A'}
Volume: ${volume || 'N/A'}
Issue: ${issue || 'N/A'}
Pages: ${pages || 'N/A'}
DOI: ${doi || 'N/A'}
URL: ${url || 'N/A'}
Publisher: ${publisher || 'N/A'}
Location: ${location || 'N/A'}

Provide:
1. **Bibliographic Entry** — full citation formatted correctly
2. **In-Text Citation** — short form for use in body
3. **DOI/URL format** — properly abbreviated if applicable
4. **Style Notes** — any special rules applied`;
    try {
      const res = await fetch('/api/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResult(data.result);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-2xl">📖</div>
            <h1 className="text-3xl font-bold text-white">AI Citation Formatter</h1>
          </div>
          <p className="text-gray-400 text-sm ml-13">Format bibliographic citations in APA, MLA, and Chicago styles</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="bg-gray-900/60 border border-gray-700/50 rounded-2xl p-5 backdrop-blur-sm">
            <h2 className="text-sm font-semibold text-amber-300 uppercase tracking-wider mb-4">Citation Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1.5 font-semibold uppercase tracking-wider">Citation Style</label>
                <select value={citationStyle} onChange={e => setCitationStyle(e.target.value)} className="w-full bg-gray-800/70 border border-gray-700/60 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500/70 focus:ring-1 focus:ring-amber-500/30 transition-all">
                  <option>APA</option><option>MLA</option><option>Chicago</option><option>Harvard</option><option>IEEE</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5 font-semibold uppercase tracking-wider">Source Type</label>
                <select value={sourceType} onChange={e => setSourceType(e.target.value)} className="w-full bg-gray-800/70 border border-gray-700/60 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500/70 focus:ring-1 focus:ring-amber-500/30 transition-all">
                  <option value="journal">Journal Article</option>
                  <option value="book">Book</option>
                  <option value="website">Website</option>
                  <option value="conference">Conference Paper</option>
                  <option value="thesis">Thesis/Dissertation</option>
                  <option value="report">Report</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5 font-semibold uppercase tracking-wider">Author(s)</label>
                <input value={author} onChange={e => setAuthor(e.target.value)} placeholder="e.g. Smith, J. A., & Doe, B." className="w-full bg-gray-800/70 border border-gray-700/60 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/70 focus:ring-1 focus:ring-amber-500/30 transition-all" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5 font-semibold uppercase tracking-wider">Year Published</label>
                <input value={year} onChange={e => setYear(e.target.value)} placeholder="e.g. 2024" className="w-full bg-gray-800/70 border border-gray-700/60 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/70 focus:ring-1 focus:ring-amber-500/30 transition-all" />
              </div>
            </div>
          </div>
          <div className="bg-gray-900/60 border border-gray-700/50 rounded-2xl p-5 backdrop-blur-sm">
            <h2 className="text-sm font-semibold text-amber-300 uppercase tracking-wider mb-4">Source Details</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1.5 font-semibold uppercase tracking-wider">Title</label>
                <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Full title of the work" className="w-full bg-gray-800/70 border border-gray-700/60 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/70 focus:ring-1 focus:ring-amber-500/30 transition-all" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5 font-semibold uppercase tracking-wider">Journal / Publisher</label>
                  <input value={journal} onChange={e => setJournal(e.target.value)} placeholder={sourceType === 'book' ? 'Publisher name' : 'Journal name'} className="w-full bg-gray-800/70 border border-gray-700/60 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/70 focus:ring-1 focus:ring-amber-500/30 transition-all" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5 font-semibold uppercase tracking-wider">Volume / Issue</label>
                  <input value={volume} onChange={e => setVolume(e.target.value)} placeholder="e.g. Vol. 12, Iss. 3" className="w-full bg-gray-800/70 border border-gray-700/60 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/70 focus:ring-1 focus:ring-amber-500/30 transition-all" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5 font-semibold uppercase tracking-wider">Pages</label>
                  <input value={pages} onChange={e => setPages(e.target.value)} placeholder="e.g. 45-67" className="w-full bg-gray-800/70 border border-gray-700/60 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/70 focus:ring-1 focus:ring-amber-500/30 transition-all" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5 font-semibold uppercase tracking-wider">DOI</label>
                  <input value={doi} onChange={e => setDoi(e.target.value)} placeholder="e.g. 10.1000/xyz123" className="w-full bg-gray-800/70 border border-gray-700/60 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/70 focus:ring-1 focus:ring-amber-500/30 transition-all" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs text-gray-400 mb-1.5 font-semibold uppercase tracking-wider">URL</label>
                  <input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://..." className="w-full bg-gray-800/70 border border-gray-700/60 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/70 focus:ring-1 focus:ring-amber-500/30 transition-all" />
                </div>
              </div>
            </div>
          </div>
          <button type="submit" disabled={loading || !author.trim() || !title.trim()} className="w-full bg-amber-600 hover:bg-amber-500 disabled:bg-amber-900 disabled:cursor-not-allowed text-white text-sm font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2">
            {loading ? <><span className="animate-spin">⟳</span> Formatting Citations...</> : <><>✦ Format Citations</></>}
          </button>
          {error && <div className="bg-red-900/20 border border-red-800/50 rounded-xl px-4 py-3 text-red-300 text-sm">{error}</div>}
        </form>
        {result && (
          <div className="mt-6 bg-gray-900/60 border border-gray-700/50 rounded-2xl p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-amber-300 uppercase tracking-wider">Formatted Citations</h3>
              <button onClick={() => navigator.clipboard.writeText(result)} className="text-xs text-gray-400 hover:text-white bg-gray-800/70 px-3 py-1.5 rounded-lg border border-gray-700/50">Copy</button>
            </div>
            <pre className="text-gray-300 text-sm whitespace-pre-wrap font-mono leading-relaxed bg-gray-950/60 rounded-xl p-4 border border-gray-800/50 overflow-auto max-h-[500px]">{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
