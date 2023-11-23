import { useEffect, useState } from 'react';

const ProductNote = (props: any) => {
  const { getNoteByProduct, noteIndex, prevNote } = props;

  const [note, setNote] = useState(prevNote);

  useEffect(() => {
    setNote(prevNote);
  }, [prevNote]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = e.target;
    setNote(value);
  };

  useEffect(() => {
    getNoteByProduct(note, noteIndex);
  }, [note]);

  return (
    <div className="flex flex-col gap-2">
      <p className="text-secondary">Indicaciones especiales:</p>
      <textarea
        className="w-full h-14 resize-none p-2 outline-none border-[1px] focus:border-givvy_blue border-gray-400"
        placeholder="Escribe aquí..."
        value={note}
        onChange={handleChange}
      ></textarea>
    </div>
  );
};

export default ProductNote;
