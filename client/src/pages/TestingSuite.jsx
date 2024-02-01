import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import socket from '../../utils/socket.js';
import ProblemExplanation from '../components/ProblemExplanation.jsx';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const TestingSuite = () => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const iframeRef = useRef(null);
  const navigate = useNavigate(null);

  useEffect(() => {
    socket.on('doc-change', (newCode) => {
      setCode(newCode);
    });

    setInterval(console.log(code));
    return () => {
      socket.off('doc-change');
    };
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
    toast.info('Code Executed');
  }

  // function to handle submitting answer

  const submitAnswer = async (problemId, userId, code) => {
    try {
      const res = await axios.post('/answers', {
        user_id: userId,
        problem_id: problemId,
        answer: code,
      });

      if (res.status !== 200) {
        throw new Error('failed to submit');
      }
      const data = res.data;
      console.log(data);
      toast.success('Answer submitted');
      navigate('/codesubmit');
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit');
    }
  };

  function handleMessage(event) {
    const { data } = event;
    if (data.output !== undefined) {
      setOutput(data.output);
    } else if (data.error !== undefined) {
      setOutput(`Error: ${data.error}`);
      toast.error('Code Execution Error');
    }
    if (iframeRef.current) {
      iframeRef.current.parentNode.removeChild(iframeRef.current);
      iframeRef.current = null;
    }
    window.removeEventListener('message', handleMessage);
  }

  return (
    <>
      <div className="ctn flex flex-row flex-wrap w-full h-screen justify-center py-6 pb-40 overflow-auto">
        <div className="ctn h-full w-3/12">
          <ProblemExplanation
            submitAnswer={submitAnswer}
            executeCode={executeCode}
            code={code}
          />
        </div>
        <div className="flex h-full flex-col w-8/12 gap-8 bg-g-editor">
          <div className="w-full flex flex-wrap justify-end h-2/3 p-3 ">
            <Editor
              defaultLanguage="javascript"
              theme="vs-dark"
              value={code}
              height="93%"
              width="100%"
              onChange={handleEditorChange}
            />
          </div>
          <div className="w-full h-1/3">
            {' '}
            <textarea
              value={output}
              name=""
              readOnly
              className="ctn w-full h-full outline-none p-8"
              placeholder="Console: >"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TestingSuite;
