import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Props = {
  markdown: string;
};

export default function NoteMarkdown({ markdown }: Props) {
  return (
    <Markdown className='markdown w-72 h-72 border-2 border-black' remarkPlugins={[remarkGfm]}>
      {markdown}
    </Markdown>
  );
}
