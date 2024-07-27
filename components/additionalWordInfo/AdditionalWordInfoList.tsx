interface Props {
  data: { type: string; spanish: string }[];
}

export default function AdditionWordInfoList({ data }: Props) {
  return (
    <ul className='w-full flex flex-col items-center gap-1'>
      {data.map((item, index) => {
        return (
          <li key={index} className='flex w-4/5 gap-1'>
            <div className='border-2 border-black w-1/5 p-1'>{item.type}</div>
            <div className='border-2 border-black w-4/5 p-1'>{item.spanish}</div>
          </li>
        );
      })}
    </ul>
  );
}
