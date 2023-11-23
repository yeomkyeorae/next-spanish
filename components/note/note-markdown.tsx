import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Props = {
  markdown: string;
};

export default function NoteMarkdown({ markdown }: Props) {
  return (
    <Markdown className='markdown w-full h-full bg-white rounded-md' remarkPlugins={[remarkGfm]}>
      {markdown}
    </Markdown>
  );
}
