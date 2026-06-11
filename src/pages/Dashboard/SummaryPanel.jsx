import React from "react";

const SummaryPanel = ({ title, items }) => {
  return (
    <div className="rounded-xl border border-default bg-[#282f35] p-5">
      <h3 className="text-lg font-semibold text-main mb-4">
        {title}
      </h3>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between border-b border-white/5 pb-2"
          >
            <span className="text-gray-400">
              {item.label}
            </span>

            <span className="font-semibold text-white">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummaryPanel;