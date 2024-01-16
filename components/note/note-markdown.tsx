import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Props = {
  markdown: string;
  width: 'full' | 'half';
};

export default function NoteMarkdown({ markdown, width }: Props) {
  return (
    <Markdown
      className={`markdown h-full ${
        width === 'full' ? 'w-full' : width === 'half' ? 'w-1/2' : 'w-full'
      } bg-white rounded-md ${width === 'half' ? 'hidden lg:block' : ''}`}
      remarkPlugins={[remarkGfm]}
    >
      {markdown}
    </Markdown>
  );
}
