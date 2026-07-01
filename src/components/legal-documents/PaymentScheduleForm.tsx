import React from "react";
import { PaymentScheduleItem } from "@/lib/types/legalDocuments";

interface PaymentScheduleFormProps {
  schedule: PaymentScheduleItem[];
  totalConsideration: number;
  onChange: (updatedSchedule: PaymentScheduleItem[]) => void;
  isReadOnly?: boolean;
}

export default function PaymentScheduleForm({
  schedule = [],
  totalConsideration,
  onChange,
  isReadOnly = false
}: PaymentScheduleFormProps) {
  
  const handleAddItem = () => {
    const newItem: PaymentScheduleItem = {
      id: `milestone-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      milestoneName: "",
      paymentAmount: 0,
      percentageAmount: 0,
      status: "pending"
    };
    onChange([...schedule, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    onChange(schedule.filter(item => item.id !== id));
  };

  const handleItemChange = (id: string, field: keyof PaymentScheduleItem, value: any) => {
    const updated = schedule.map(item => {
      if (item.id === id) {
        let updatedItem = { ...item, [field]: value };
        
        // If amount changed, auto-calculate percentage if totalConsideration > 0
        if (field === "paymentAmount" && totalConsideration > 0) {
          updatedItem.percentageAmount = Math.round((value / totalConsideration) * 100 * 100) / 100;
        }
        
        // If percentage changed, auto-calculate amount
        if (field === "percentageAmount" && totalConsideration > 0) {
          updatedItem.paymentAmount = Math.round((value / 100) * totalConsideration);
        }

        return updatedItem;
      }
      return item;
    });
    onChange(updated);
  };

  const sumPayments = schedule.reduce((sum, item) => sum + (item.paymentAmount || 0), 0);
  const remainingAmount = totalConsideration - sumPayments;
  const isBalanced = sumPayments === totalConsideration;

  return (
    <div className="space-y-4 p-4 bg-slate-50 border border-slate-200 rounded-md">
      <div className="flex justify-between items-center border-b border-slate-200 pb-2">
        <h3 className="text-sm font-semibold text-[#10291f]">Dynamic Payment Milestones</h3>
        {!isReadOnly && (
          <button
            type="button"
            onClick={handleAddItem}
            className="text-[10px] bg-[#8A704C] hover:bg-[#725a3a] text-white px-2.5 py-1 rounded font-bold transition-colors"
          >
            + Add Milestone
          </button>
        )}
      </div>

      {schedule.length === 0 ? (
        <div className="text-center py-6 text-xs text-slate-400 font-medium">
          No custom milestones defined yet. Standard payment clauses will apply.
        </div>
      ) : (
        <div className="space-y-2">
          {schedule.map((item, idx) => (
            <div key={item.id} className="flex flex-col md:flex-row md:items-center gap-3 bg-white p-3 border border-slate-100 rounded">
              <span className="text-xs font-bold text-[#8A704C] md:w-6">{idx + 1}.</span>
              
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Milestone Description (e.g. Plinth Level Casting)"
                  value={item.milestoneName}
                  onChange={(e) => handleItemChange(item.id, "milestoneName", e.target.value)}
                  disabled={isReadOnly}
                  className="w-full text-xs p-1.5 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
                />
              </div>

              <div className="w-full md:w-28 flex items-center space-x-1">
                <span className="text-[10px] text-slate-400 font-bold">%</span>
                <input
                  type="number"
                  placeholder="Percent"
                  value={item.percentageAmount || ""}
                  onChange={(e) => handleItemChange(item.id, "percentageAmount", e.target.value ? parseFloat(e.target.value) : 0)}
                  disabled={isReadOnly}
                  className="w-full text-xs p-1.5 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
                />
              </div>

              <div className="w-full md:w-40 flex items-center space-x-1">
                <span className="text-[10px] text-slate-400 font-bold">₹</span>
                <input
                  type="number"
                  placeholder="Amount"
                  value={item.paymentAmount || ""}
                  onChange={(e) => handleItemChange(item.id, "paymentAmount", e.target.value ? parseFloat(e.target.value) : 0)}
                  disabled={isReadOnly}
                  className="w-full text-xs p-1.5 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
                />
              </div>

              <div className="w-full md:w-32">
                <select
                  value={item.status}
                  onChange={(e) => handleItemChange(item.id, "status", e.target.value)}
                  disabled={isReadOnly}
                  className="w-full text-xs p-1.5 border border-slate-200 rounded bg-white focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>

              {!isReadOnly && (
                <button
                  type="button"
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-500 hover:text-red-700 text-xs px-2 py-1"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Balancing Report */}
      {totalConsideration > 0 && (
        <div className="mt-4 p-3 bg-white border border-slate-100 rounded flex justify-between items-center text-xs">
          <div className="space-y-1">
            <div>
              <span className="text-slate-500">Total Price:</span>{" "}
              <span className="font-bold text-slate-800">₹{totalConsideration.toLocaleString("en-IN")}</span>
            </div>
            <div>
              <span className="text-slate-500">Milestones Sum:</span>{" "}
              <span className={`font-bold ${isBalanced ? "text-green-600" : "text-amber-600"}`}>
                ₹{sumPayments.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
          <div>
            {isBalanced ? (
              <span className="bg-green-50 text-green-700 text-[10px] px-2 py-1 rounded-full font-bold">
                ✓ Fully Balanced (100%)
              </span>
            ) : (
              <span className="bg-amber-50 text-amber-700 text-[10px] px-2 py-1 rounded-full font-bold">
                ⚠️ Unbalanced: ₹{remainingAmount.toLocaleString("en-IN")} {remainingAmount > 0 ? "Remaining" : "Over-allocated"}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
