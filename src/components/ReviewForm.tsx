export default function ReviewModalForm() {
  return (
    <div className="min-h-screen bg-[#0b1118] flex items-center justify-center p-4 text-white">
      <div className="w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl bg-[#47576b] border border-[#5b6a7c]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#3c4a5c]">
          <div className="flex items-center gap-6">
            <button className="bg-[#617086] px-6 py-3 rounded-md font-bold tracking-wide hover:opacity-90 transition">
              BACK
            </button>

            <h1 className="text-4xl font-bold">I watched...</h1>
          </div>

          <button className="text-5xl opacity-60 hover:opacity-100 transition">
            ×
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col lg:flex-row gap-6">
          {/* Poster */}
          <div className="w-full lg:w-[180px] shrink-0">
            <img
              src="https://image.tmdb.org/t/p/w500/9TGHDvWrqKBzwDxDodHYXEmOE6J.jpg"
              alt="movie"
              className="w-full rounded-lg shadow-xl"
            />
          </div>

          {/* Form Content */}
          <div className="flex-1 space-y-8">
            {/* Title */}
            <div>
              <h2 className="text-3xl font-bold flex items-center gap-3">
                The Ax
                <span className="text-gray-300 text-2xl font-normal">2005</span>
              </h2>
            </div>

            {/* Checkboxes */}
            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-20">
              <label className="flex items-center gap-4 text-2xl cursor-pointer">
                <input type="checkbox" className="w-7 h-7" defaultChecked />
                Watched on
                <span className="bg-[#374558] px-4 py-1 rounded-md text-xl">
                  13 May 2026
                </span>
              </label>

              <label className="flex items-center gap-4 text-2xl cursor-pointer">
                <input type="checkbox" className="w-7 h-7" />
                I've watched this before
              </label>
            </div>

            {/* Review */}
            <div>
              <textarea
                placeholder="Add a review..."
                className="w-full h-40 rounded-lg bg-[#c8d4e2] text-black placeholder:text-gray-500 p-4 text-lg resize-none outline-none"
              />
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Tags */}
              <div className="space-y-3">
                <div className="flex gap-4 items-center flex-wrap">
                  <h3 className="text-3xl font-semibold">Tags</h3>

                  <p className="text-gray-200 text-lg">
                    Press Tab to complete, Enter to create
                  </p>
                </div>

                <input
                  type="text"
                  placeholder="eg. netflix"
                  className="w-full rounded-md bg-[#c8d4e2] text-black placeholder:text-gray-500 p-4 text-xl outline-none"
                />
              </div>

              {/* Rating */}
              <div className="space-y-4">
                <div className="flex items-center gap-5">
                  <h3 className="text-3xl font-semibold">Rating</h3>

                  <p className="text-2xl text-gray-200">0 out of 5</p>
                </div>

                <div className="flex gap-2 text-6xl text-[#1d2835]">
                  <span>☆</span>
                  <span>☆</span>
                  <span>☆</span>
                  <span>☆</span>
                  <span>☆</span>
                </div>
              </div>

              {/* Like */}
              <div className="space-y-4">
                <h3 className="text-3xl font-semibold">Like</h3>

                <button className="text-7xl text-[#1d2835] hover:text-red-500 transition">
                  ♡
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#324154] px-10 py-8 flex justify-end">
          <button className="bg-green-500 hover:bg-green-600 transition px-8 py-3 rounded-full text-xl font-bold shadow-lg">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
