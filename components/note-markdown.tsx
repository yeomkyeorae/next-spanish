import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Props = {
  markdown: string;
};

export default function NoteMarkdown({ markdown }: Props) {
  return (
    <Markdown className='markdown' remarkPlugins={[remarkGfm]}>
      {markdown}
    </Markdown>
  );
}
