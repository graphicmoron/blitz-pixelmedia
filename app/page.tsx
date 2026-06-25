export default function Home() {
  return (
    <div>

      <div className="container border mx-auto p-4 sm:p-6 md:p-8 lg:p-10 grid grid-cols-3">

        <div>
          <p>Font: Bricolage Grotesque</p>
          <h1 className="text-3xl font-bold text-orangish-red font-bricolage">Bricolage Grotesque</h1>

        </div>

        <div>
          <p>Font: Univers</p>

          <p className="text-3xl font-univers font-light">Univers Light (Weight 300)</p>
          <p className="text-3xl font-univers font-normal">Univers Regular (Weight 400)</p>
          <p className="text-3xl font-univers font-bold">Univers Bold (Weight 700)</p>
        </div>

        <div>

          <p>Font: Canela Deck</p>
          <h1 className="text-3xl font-canela font-thin">Canela Thin</h1>
          <h1 className="text-3xl font-canela font-normal">Canela Normal</h1>
          <h1 className="text-3xl font-canela font-normal italic">Canela Normal Italic</h1>
          <h1 className="text-3xl font-canela font-bold ">Canela Bold</h1>
          <h1 className="text-3xl font-canela font-bold italic">Canela Bold Italic</h1>
          <h1 className="text-3xl font-canela font-black">Canela Black</h1>
          <h1 className="text-3xl font-canela font-black italic">Canela Black Italic</h1>
        </div>
      </div>
    </div>
  );
}
