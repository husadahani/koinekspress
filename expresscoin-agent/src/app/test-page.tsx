'use client';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-fedex-purple to-fedex-light flex items-center justify-center">
      <div className="card w-96 bg-base-100 shadow-2xl">
        <div className="card-body items-center text-center">
          <div className="w-20 h-20 bg-fedex-purple rounded-full flex items-center justify-center mb-4">
            <span className="text-3xl text-white">🚚</span>
          </div>
          <h2 className="card-title text-2xl font-bold text-fedex-purple">Test Page</h2>
          <p className="text-gray-600 mb-6">Jika Anda melihat halaman ini dengan styling yang benar, maka CSS sudah berfungsi!</p>
          <button className="btn btn-primary bg-fedex-purple hover:bg-fedex-dark border-none w-full">
            Test Button
          </button>
        </div>
      </div>
    </div>
  );
}