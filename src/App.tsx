import { useState, useEffect } from 'react';
import { 
  ArrowRightLeft, 
  Copy, 
  Download, 
  Trash2,
  AlertCircle
} from 'lucide-react';
import { convert } from './utils/converter';
import type { Format } from './utils/converter';
import './index.css';

function App() {
  const [inputFormat, setInputFormat] = useState<Format>('env');
  const [outputFormat, setOutputFormat] = useState<Format>('json');
  const [inputData, setInputData] = useState('');
  const [outputData, setOutputData] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    handleConvert(inputData, inputFormat, outputFormat);
  }, [inputData, inputFormat, outputFormat]);

  const handleConvert = (data: string, from: Format, to: Format) => {
    if (!data.trim()) {
      setOutputData('');
      setError(null);
      return;
    }
    
    try {
      const result = convert(data, from, to);
      setOutputData(result);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Conversion error');
      setOutputData('');
    }
  };

  const handleCopy = async () => {
    if (!outputData) return;
    try {
      await navigator.clipboard.writeText(outputData);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleDownload = () => {
    if (!outputData) return;
    const blob = new Blob([outputData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    
    let ext = '.txt';
    if (outputFormat === 'env' || outputFormat === 'azure') ext = '.env';
    if (outputFormat === 'json') ext = '.json';
    if (outputFormat === 'toml') ext = '.toml';
    
    a.download = `converted${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSwap = () => {
    const tempFormat = inputFormat;
    setInputFormat(outputFormat);
    setOutputFormat(tempFormat);
    setInputData(outputData);
  };

  return (
    <div className="app-container">
      <header>
        <div className="logo">
          <span className="logo-icon" style={{fontSize: '28px', marginRight: '8px'}}>⚡</span>
          <span><strong>Nocver</strong></span>
        </div>
        <div className="flex items-center gap-4">
          <a href="https://github.com/hirumzz" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted hover:text-white transition-colors" style={{textDecoration: 'none', color: 'var(--text-muted)'}}>
            <span>GitHub</span>
          </a>
        </div>
      </header>

      <main>
        <div className="hero-section">
          <h1 className="hero-title">
            Convert <span>Environment Files</span>
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>Transform .env, JSON, TOML, & Azure App Settings — entirely in your browser.</p>
        </div>

        <div className="glass-panel main-converter">
          
          <div className="format-selectors">
            <div className="selector-group">
              <span className="selector-label">Input Format</span>
              <div className="radio-group">
                {(['env', 'json', 'toml', 'azure'] as Format[]).map((fmt) => (
                  <label key={`in-${fmt}`} className="radio-label">
                    <input 
                      type="radio" 
                      name="inputFormat" 
                      value={fmt} 
                      checked={inputFormat === fmt}
                      onChange={(e) => setInputFormat(e.target.value as Format)}
                    />
                    <span>{fmt.toUpperCase()}</span>
                  </label>
                ))}
              </div>
            </div>

            <ArrowRightLeft className="arrow-icon" size={32} />

            <div className="selector-group">
              <span className="selector-label">Output Format</span>
              <div className="radio-group">
                {(['env', 'json', 'toml', 'azure'] as Format[]).map((fmt) => (
                  <label key={`out-${fmt}`} className="radio-label">
                    <input 
                      type="radio" 
                      name="outputFormat" 
                      value={fmt} 
                      checked={outputFormat === fmt}
                      onChange={(e) => setOutputFormat(e.target.value as Format)}
                    />
                    <span>{fmt.toUpperCase()}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {error && (
            <div className="error-banner">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          <div className="editors-grid">
            <div className="editor-pane">
              <div className="editor-header">
                <span className="editor-title">Input</span>
                <div className="editor-actions">
                  <button className="btn-icon" onClick={() => setInputData('')} title="Clear Input">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <textarea
                className="code-editor"
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
                placeholder="Paste your content here..."
                spellCheck={false}
              />
            </div>

            <div className="editor-pane">
              <div className="editor-header">
                <span className="editor-title">Output</span>
                <div className="editor-actions">
                  <button className="btn-icon" onClick={handleSwap} title="Swap Input/Output">
                    <ArrowRightLeft size={18} />
                  </button>
                  <button className="btn-icon" onClick={handleCopy} title={copied ? 'Copied!' : 'Copy to Clipboard'}>
                    {copied ? <span style={{fontSize: '0.75rem', color: 'var(--success)'}}>Copied!</span> : <Copy size={18} />}
                  </button>
                  <button className="btn-icon" onClick={handleDownload} title="Download File">
                    <Download size={18} />
                  </button>
                </div>
              </div>
              <textarea
                className="code-editor"
                value={outputData}
                readOnly
                placeholder="Converted output will appear here..."
                spellCheck={false}
              />
            </div>
          </div>
        </div>

        <div className="features">
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3 style={{marginBottom: '0.5rem', fontWeight: 600}}>100% Private</h3>
            <p style={{fontSize: '0.875rem', color: 'var(--text-muted)'}}>All conversions happen entirely in your browser. No data is sent to any server.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3 style={{marginBottom: '0.5rem', fontWeight: 600}}>Instant Conversion</h3>
            <p style={{fontSize: '0.875rem', color: 'var(--text-muted)'}}>Real-time conversion as you type. Instant feedback.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌐</div>
            <h3 style={{marginBottom: '0.5rem', fontWeight: 600}}>Works Offline</h3>
            <p style={{fontSize: '0.875rem', color: 'var(--text-muted)'}}>No internet required after loading the page.</p>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>{String.fromCharCode(169, 32, 50, 48, 50, 54, 32, 104, 105, 114, 117, 109, 122, 122, 45, 115, 105, 110, 100, 104, 117)}</p>
      </footer>
    </div>
  );
}

export default App;
