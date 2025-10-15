
'use client'
import { useState } from 'react'
import { Check, Clipboard } from 'lucide-react'

export default function CodeBlock({ children, ...props }) {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = () => {
    if (children && typeof children[0] === 'object' && children[0].props && children[0].props.children) {
      const code = children[0].props.children[0]
      navigator.clipboard.writeText(code).then(() => {
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
      })
    }
  }

  return (
    <div className="relative">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1.5 rounded-md bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
        aria-label="Copy code"
      >
        {isCopied ? <Check className="w-4 h-4" /> : <Clipboard className="w-4 h-4" />}
      </button>
      <pre {...props}>{children}</pre>
    </div>
  )
}
