export default function SlotButton({ time, available }) {
    return (
      <button
        className={`px-4 py-2 rounded-lg text-sm m-1
          ${available ? "bg-accent text-white" : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}
        disabled={!available}
      >
        {time}
      </button>
    );
  }
  