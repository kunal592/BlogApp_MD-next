
'use client'
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeBlock from './CodeBlock';

export default function MarkdownRenderer({ content }) {
    const components = {
        code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
                <CodeBlock language={match[1]} code={String(children).replace(/\n$/, '')} {...props} />
            ) : (
                <code className={className} {...props}>
                    {children}
                </code>
            );
        },
        table({ children }) {
            return (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">{children}</table>
                </div>
            );
        },
        thead({ children }) {
            return <thead className="bg-gray-50 dark:bg-neutral-800">{children}</thead>;
        },
        th({ children }) {
            return <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{children}</th>;
        },
        tbody({ children }) {
            return <tbody className="bg-white dark:bg-neutral-900 divide-y divide-gray-200 dark:divide-gray-700">{children}</tbody>;
        },
        tr({ children }) {
            return <tr>{children}</tr>;
        },
        td({ children }) {
            return <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{children}</td>;
        },
    };

    return (
        <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
                {content}
            </ReactMarkdown>
        </div>
    );
}
