import { useEffect, useRef, useState } from 'react';
import { Play, RotateCcw, Trash2, Save, FileCode, ChevronRight, ChevronDown, AlertCircle } from 'lucide-react';
import { usePyodideStore, starterSnippets } from '../stores/usePyodideStore';

declare global {
  interface Window {
    loadPyodide: any;
  }
}

export default function PracticeConsole() {
  const {
    pyodide,
    isLoading,
    isReady,
    isRunning,
    error,
    currentCode,
    output,
    savedScripts,
    setPyodide,
    setLoading,
    setReady,
    setRunning,
    setError,
    setCurrentCode,
    addOutput,
    clearOutput,
    saveScript,
    loadScript,
    deleteScript,
    saveDraft,
    loadDraft,
    clearEditor,
    resetEnvironment
  } = usePyodideStore();
  
  const [showSnippets, setShowSnippets] = useState(true);
  const [showSaved, setShowSaved] = useState(true);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [scriptName, setScriptName] = useState('');
  const outputRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLTextAreaElement>(null);
  
  // Auto-save draft every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentCode) {
        saveDraft();
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [currentCode, saveDraft]);
  
  // Load draft on mount
  useEffect(() => {
    loadDraft();
  }, []);
  
  // Initialize Pyodide
  useEffect(() => {
    if (!pyodide && !isLoading && !isReady) {
      initializePyodide();
    }
  }, []);
  
  // Auto-scroll output
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);
  
  const initializePyodide = async () => {
    setLoading(true);
    setError(null);
    addOutput('🔄 Loading Python environment...');
    
    try {
      // Load Pyodide script
      if (!window.loadPyodide) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.0/full/pyodide.js';
        script.async = true;
        document.body.appendChild(script);
        
        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
        });
      }
      
      addOutput('📦 Initializing Python runtime...');
      const pyodideInstance = await window.loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.0/full/'
      });
      
      // Load packages
      addOutput('📚 Loading NumPy and Pandas...');
      await pyodideInstance.loadPackage(['numpy', 'pandas']);
      
      // Redirect stdout
      pyodideInstance.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
      `);
      
      setPyodide(pyodideInstance);
      setReady(true);
      setLoading(false);
      addOutput('✅ Python environment ready!');
      addOutput('💡 Try running some code or load a starter snippet.');
      addOutput('');
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
      addOutput(`❌ Error loading Python: ${err.message}`);
    }
  };
  
  const runCode = async () => {
    if (!pyodide || !isReady || isRunning) return;
    
    setRunning(true);
    setError(null);
    addOutput('>>> Running code...');
    addOutput('');
    
    try {
      // Clear previous stdout
      pyodide.runPython('sys.stdout = StringIO()');
      
      // Run user code
      const result = await pyodide.runPythonAsync(currentCode);
      
      // Get stdout
      const stdout = pyodide.runPython('sys.stdout.getvalue()');
      if (stdout) {
        addOutput(stdout);
      }
      
      // Show return value if not None
      if (result !== undefined && result !== null) {
        addOutput(`\n→ ${result}`);
      }
      
      addOutput('');
      addOutput('✅ Execution complete');
      addOutput('');
    } catch (err: any) {
      const errorMsg = err.message || String(err);
      addOutput(`\n❌ Error:\n${errorMsg}`);
      addOutput('');
      setError(errorMsg);
    } finally {
      setRunning(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runCode();
    }
    
    // Tab key for indentation
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = editorRef.current;
      if (!textarea) return;
      
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue = currentCode.substring(0, start) + '    ' + currentCode.substring(end);
      setCurrentCode(newValue);
      
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
  };
  
  const loadSnippet = (code: string) => {
    if (currentCode && !confirm('Replace current code with this snippet?')) {
      return;
    }
    setCurrentCode(code);
    clearOutput();
  };
  
  const handleSaveScript = () => {
    if (!scriptName.trim()) return;
    saveScript(scriptName);
    setScriptName('');
    setSaveDialogOpen(false);
  };
  
  const handleReset = async () => {
    if (!confirm('Reset Python environment? This will clear all variables and reload packages.')) {
      return;
    }
    await resetEnvironment();
    await initializePyodide();
  };
  
  return (
    <div className="h-screen flex flex-col bg-gray-900">
      {/* Warning Banner */}
      <div className="bg-amber-900 border-b border-amber-700 px-6 py-3 flex items-start gap-3">
        <AlertCircle size={20} className="text-amber-300 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-amber-100">
          <strong>In-browser Python console</strong> — Perfect for practicing syntax, data structures, algorithms, and math with NumPy/Pandas. 
          <strong className="ml-1">Cannot make API calls</strong> (Claude, OpenAI) or access file system due to browser security. 
          For Phases 3-8, 10, and 12, use your local VS Code setup.
        </p>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Snippets */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Starter Snippets</h3>
            
            <button
              onClick={() => setShowSnippets(!showSnippets)}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-200 mb-2"
            >
              {showSnippets ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              <span>Examples ({starterSnippets.length})</span>
            </button>
            
            {showSnippets && (
              <div className="space-y-1 ml-4">
                {starterSnippets.map((snippet) => (
                  <button
                    key={snippet.id}
                    onClick={() => loadSnippet(snippet.code)}
                    className="w-full text-left px-3 py-2 rounded text-sm text-gray-300 hover:bg-gray-700 transition-colors"
                  >
                    <div className="font-medium">{snippet.title}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{snippet.phase}</div>
                  </button>
                ))}
              </div>
            )}
            
            <div className="mt-6">
              <button
                onClick={() => setShowSaved(!showSaved)}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-200 mb-2"
              >
                {showSaved ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                <span>Saved Scripts ({savedScripts.length})</span>
              </button>
              
              {showSaved && savedScripts.length > 0 && (
                <div className="space-y-1 ml-4">
                  {savedScripts.map((script) => (
                    <div
                      key={script.id}
                      className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700 group"
                    >
                      <button
                        onClick={() => loadScript(script.id)}
                        className="flex-1 text-left text-sm text-gray-300"
                      >
                        <div className="font-medium">{script.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {new Date(script.timestamp).toLocaleDateString()}
                        </div>
                      </button>
                      <button
                        onClick={() => deleteScript(script.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-900 rounded transition-opacity"
                      >
                        <Trash2 size={14} className="text-red-400" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              {showSaved && savedScripts.length === 0 && (
                <p className="text-xs text-gray-500 ml-4">No saved scripts yet</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Center - Editor and Output */}
        <div className="flex-1 flex flex-col">
          {/* Toolbar */}
          <div className="bg-gray-800 border-b border-gray-700 px-4 py-3 flex items-center gap-3">
            <button
              onClick={runCode}
              disabled={!isReady || isRunning}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
            >
              <Play size={16} />
              {isRunning ? 'Running...' : 'Run'}
            </button>
            
            <button
              onClick={clearEditor}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors"
            >
              <FileCode size={16} />
              Clear Editor
            </button>
            
            <button
              onClick={() => setSaveDialogOpen(true)}
              disabled={!currentCode}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed transition-colors"
            >
              <Save size={16} />
              Save
            </button>
            
            <button
              onClick={handleReset}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed transition-colors ml-auto"
            >
              <RotateCcw size={16} />
              Reset Environment
            </button>
            
            <div className="flex items-center gap-2 px-3 py-1 rounded text-sm">
              {isLoading && <span className="text-yellow-400">⏳ Loading...</span>}
              {isReady && !isRunning && <span className="text-green-400">✓ Ready</span>}
              {isRunning && <span className="text-blue-400">▶ Running</span>}
              {error && <span className="text-red-400">✗ Error</span>}
            </div>
          </div>
          
          {/* Split Pane */}
          <div className="flex-1 flex overflow-hidden">
            {/* Code Editor */}
            <div className="flex-1 flex flex-col border-r border-gray-700">
              <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
                <h3 className="text-sm font-semibold text-gray-300">Code Editor</h3>
                <p className="text-xs text-gray-500 mt-1">Press Ctrl+Enter (Cmd+Enter) to run</p>
              </div>
              <textarea
                ref={editorRef}
                value={currentCode}
                onChange={(e) => setCurrentCode(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="# Write your Python code here...\nprint('Hello, World!')"
                className="flex-1 bg-gray-900 text-gray-100 font-mono text-sm p-4 resize-none focus:outline-none"
                spellCheck={false}
              />
            </div>
            
            {/* Output Console */}
            <div className="w-2/5 flex flex-col bg-gray-950">
              <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-300">Output</h3>
                <button
                  onClick={clearOutput}
                  className="text-xs text-gray-400 hover:text-gray-200 transition-colors"
                >
                  Clear
                </button>
              </div>
              <div
                ref={outputRef}
                className="flex-1 overflow-y-auto p-4 font-mono text-sm text-gray-300 whitespace-pre-wrap"
              >
                {output.length === 0 ? (
                  <p className="text-gray-600">Output will appear here...</p>
                ) : (
                  output.map((line, i) => (
                    <div
                      key={i}
                      className={line.startsWith('❌') ? 'text-red-400' : line.startsWith('✅') ? 'text-green-400' : ''}
                    >
                      {line}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Save Dialog */}
      {saveDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold text-gray-100 mb-4">Save Script</h3>
            <input
              type="text"
              value={scriptName}
              onChange={(e) => setScriptName(e.target.value)}
              placeholder="Enter script name..."
              className="w-full px-3 py-2 bg-gray-900 text-gray-100 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 mb-4"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && handleSaveScript()}
            />
            <div className="flex gap-3">
              <button
                onClick={handleSaveScript}
                disabled={!scriptName.trim()}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setSaveDialogOpen(false);
                  setScriptName('');
                }}
                className="flex-1 px-4 py-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Made with Bob
