type ModalProps = {};

export default function Modal({}: ModalProps) {
  return (
    <div className="absolute top-0 left-0 flex items-center justify-center w-screen h-screen bg-black/70">
      <form className="flex flex-col gap-6 p-8 text-white rounded-lg bg-zinc-800">
        <label className="flex flex-col gap-2" htmlFor="price">
          price*
          <input type="number" name="price" id="price" />
        </label>
        <label className="flex flex-col gap-2" htmlFor="company">
          company*
          <select name="company" id="company">
            <option className="text-white bg-zinc-800" value="">
              --
            </option>
            <option className="text-white bg-zinc-800" value="netflix">
              Netflix
            </option>
            <option className="text-white bg-zinc-800" value="prime">
              Prime
            </option>
            <option className="text-white bg-zinc-800" value="gpt">
              Open Ai
            </option>
          </select>
        </label>
        <div className="flex items-center justify-center gap-4">
          <button type="button">cancel</button>
          <button type="submit">save</button>
        </div>
      </form>
    </div>
  );
}
