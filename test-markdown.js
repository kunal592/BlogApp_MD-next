
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function TestMarkdown() {
  const markdown = `# Hello, world!\n\nThis is a test of the react-markdown library.\n\n**This text should be bold.**\n\n*This text should be italic.*\n\nHere's a list:\n\n- Item 1\n- Item 2\n- Item 3\n`;

  return (
    <div>
      <h1>Markdown Test</h1>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </div>
  );
}
