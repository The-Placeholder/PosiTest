import { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
// import socket from '../../utils/socket.js';

const TestingSuite = () => {
  return (
    <>
      <div className="ctn fixed flex flex-row flex-wrap w-full h-full justify-center py-6 pb-24 gap-4">
        <div className="ctn h-full w-3/12">
          <h1>Code Problem Explanation</h1>
        </div>
        <div className="flex flex-col w-8/12 gap-4">
          <div className="ctn w-full h-2/3">code editor</div>
          <div className="ctn w-full h-1/3">console</div>
        </div>
      </div>
    </>
  );
};

export default TestingSuite;
