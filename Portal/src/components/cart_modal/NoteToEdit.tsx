import { useEffect, useState } from 'react';

const NoteToEdit = (props: any) => {
  const { prevNote, getUserNoteUpdated } = props;

  const [note, setNote] = useState(prevNote);

  useEffect(() => {
    getUserNoteUpdated(note);
  }, [note]);

  return (
    <div className="card w-full">
      <div className="py-2 px-4 flex justify-between bg-givvy_blue text-white rounded-t-lg">
        <p className="font-bold">Instrucciones especiales</p>
      </div>
      <div className="w-full flex justify-center py-5">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          name="instrucciones"
          placeholder="Escribe aquí..."
          className="w-11/12 h-36 resize-none border-[1px] p-2 outline-none focus:border-givvy_blue"
        ></textarea>
      </div>
    </div>
  );
};

export default NoteToEdit;
