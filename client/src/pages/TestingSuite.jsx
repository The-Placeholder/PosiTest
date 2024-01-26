import { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
// import socket from '../../utils/socket.js';

const TestingSuite = ({ setnavTitle }) => {
  setnavTitle('Testing Suite');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const iframeRef = useRef(null);

  useEffect(() => {
    if (socket) {
      socket.on('doc-change', (newCode) => {
        setCode(newCode);
      });

      return () => {
        socket.off('doc-change');
      };
    }
  }, []);

  async function handleEditorChange(value, event) {
    socket.emit('doc-change', value);
    setCode(value);
  }

  function executeCode(current_code) {
    setOutput('');
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    iframeRef.current = iframe;
    const iframeDocument =
      iframe.contentDocument || iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(`
      <html>
        <body>
          <script>
            try {
              const userCode = ${JSON.stringify(current_code)};
              const userFunction = new Function('console', userCode);
              let capturedConsoleOutput = '';
              const originalConsoleLog = console.log;
              console.log = (...args) => {
                capturedConsoleOutput += args.join(' ') + '\\n';
              };
              userFunction(console);
              console.log = originalConsoleLog;
              parent.postMessage({ output: capturedConsoleOutput }, '*');
            } catch (error) {
              parent.postMessage({ error: error.message }, '*');
            }
          </script>
        </body>
      </html>
    `);
    iframeDocument.close();
    window.addEventListener('message', handleMessage);
  }

  function handleMessage(event) {
    const { data } = event;
    if (data.output !== undefined) {
      setOutput(data.output);
    } else if (data.error !== undefined) {
      setOutput(`Error: ${data.error}`);
    }
    if (iframeRef.current) {
      iframeRef.current.parentNode.removeChild(iframeRef.current);
      iframeRef.current = null;
    }
    window.removeEventListener('message', handleMessage);
  }
  if (!socket) {
    return <p>Loading Socket</p>;
  }
  const TestingSuite = () => {
    return (
      <>
        <div className="ctn fixed flex flex-row flex-wrap w-full h-full justify-center py-6 pb-24 gap-4">
          <div className="ctn h-full w-3/12">
            <h1>Code Problem Explanation</h1>
          </div>
          <div className="flex flex-col w-8/12 gap-4">
            <div id="editor-ctn" className="ctn w-full h-2/3">
              <Editor
                defaultLanguage="javascript"
                theme="vs-dark"
                value={code}
                height="100%"
                width="100%"
                onChange={handleEditorChange}
              />
              <button
                onClick={() => {
                  executeCode(code);
                }}
              >
                Execute Code
              </button>
            </div>
            {/* end of editor-ctn */}

            <div className="ctn w-full h-1/3">
              <textarea value={output} readOnly />
            </div>
            {/* end of output */}
          </div>
        </div>
      </>
    );
  };
};
export default TestingSuite;
