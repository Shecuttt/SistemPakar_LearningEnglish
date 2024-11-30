import React from "react";

export default function Soal() {
    return (
        <div className="w-1/2 flex flex-col space-y-6">
            <div className="bg-black/5 shadow-sm backdrop-blur-lg rounded-xl p-6">
                {/* soal sekarang dari jumlah soal */}
                <p className="text-xs text-white mb-3">soal 1 dari ...</p>

                {/* teks  soal */}
                <p className="text-white font-medium text-lg">Soal</p>
            </div>

            {/* opsi jawaban */}
            <div className="bg-black/5 shadow-sm backdrop-blur-lg rounded-xl p-4 flex flex-col">
                <button className="p-2 text-white hover:bg-white/10 rounded-lg">
                    Ya
                </button>
                <button className="p-2 text-white hover:bg-white/10 rounded-lg">
                    Tidak
                </button>
            </div>

            {/* result / hasilnya disini */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 text-center hidden">
                <h2 className="text-2xl text-gray-100">Hasil Diagnosis</h2>
                <div className="p-4">
                    <h3 className="text-xl font-semibold">Result</h3>
                    <p className="mt-3">Explanation</p>
                </div>
                <button className="p-2 text-white hover:bg-white/10">
                    Restart
                </button>
            </div>
        </div>
    );
}
