export default function EditDoctor({ open, doctor, onClose, onSave }) {
    if (!open || !doctor) return null;
  
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl w-[420px]">
          <h2 className="text-lg font-bold mb-4">Update Doctor</h2>
  
          {[
            ["full_name", "Full Name"],
            ["specialization", "Specialization"],
            ["experience_years", "Experience Years"],
            ["consultation_fee", "Consultation Fee"],
          ].map(([key, label]) => (
            <input
              key={key}
              defaultValue={doctor[key]}
              placeholder={label}
              className="border p-2 w-full mb-3"
              onChange={(e) =>
                onSave((prev) => ({ ...prev, [key]: e.target.value }))
              }
            />
          ))}
  
          <div className="flex justify-end gap-2 mt-4">
            <button onClick={onClose} className="px-4 py-2 border rounded">
              Cancel
            </button>
            <button
              onClick={() => onSave("submit")}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
  