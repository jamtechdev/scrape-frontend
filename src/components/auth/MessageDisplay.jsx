"use client";

export default function MessageDisplay({ error, success }) {
  if (!error && !success) return null;

  return (
    <>
      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 text-red-300 rounded-lg text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-500/20 border border-green-500/30 text-green-300 rounded-lg text-sm">
          {success}
        </div>
      )}
    </>
  );
}

