import React from "react";
import { CommercialTerms } from "@/lib/types/legalDocuments";

interface CommercialTermsFormProps {
  documentType: string;
  terms?: CommercialTerms;
  onChange: (updatedTerms: Partial<CommercialTerms>) => void;
  isReadOnly?: boolean;
}

export default function CommercialTermsForm({
  documentType,
  terms = {
    considerationAmount: 0,
    advanceTokenAmount: 0,
    paymentMode: "bank_transfer",
    taxesResponsibility: "Buyer",
    registrationExpenseResponsibility: "Buyer"
  },
  onChange,
  isReadOnly = false
}: CommercialTermsFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    let val: any = value;
    if (type === "number") {
      val = value ? parseFloat(value) : 0;
    }
    onChange({ [name]: val });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    onChange({ [name]: checked });
  };

  const isRental = documentType.includes("rental") || documentType.includes("leave-and-license") || documentType.includes("lease");
  const isConstruction = documentType.includes("construction") || documentType.includes("jda") || documentType.includes("development") || documentType.includes("contractor");
  const isReferral = documentType.includes("referral") || documentType.includes("broker") || documentType.includes("cp") || documentType.includes("lead");
  const isGpaSpa = documentType === "gpa" || documentType === "spa";

  return (
    <div className="space-y-4 p-4 bg-slate-50 border border-slate-200 rounded-md">
      <h3 className="text-sm font-semibold text-[#10291f] border-b border-slate-200 pb-2">Commercial & Financial Terms</h3>
      
      {/* General Financials */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            {isRental ? "Security Deposit Amount" : "Agreement Consideration / Price"}
          </label>
          <input
            type="number"
            name="considerationAmount"
            value={terms.considerationAmount || ""}
            onChange={handleChange}
            disabled={isReadOnly}
            placeholder="e.g. 5000000"
            className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
          />
        </div>

        {!isRental && !isGpaSpa && (
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Advance / Token Amount</label>
            <input
              type="number"
              name="advanceTokenAmount"
              value={terms.advanceTokenAmount || ""}
              onChange={handleChange}
              disabled={isReadOnly}
              placeholder="e.g. 100000"
              className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
            />
          </div>
        )}

        {!isGpaSpa && (
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Primary Payment Mode</label>
            <select
              name="paymentMode"
              value={terms.paymentMode || "bank_transfer"}
              onChange={handleChange}
              disabled={isReadOnly}
              className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C] bg-white"
            >
              <option value="bank_transfer">Bank Transfer (NEFT/RTGS/IMPS)</option>
              <option value="cheque">Cheque</option>
              <option value="dd">Demand Draft (DD)</option>
              <option value="cash">Cash (Within statutory limits)</option>
              <option value="mixed">Mixed/Multiple Modes</option>
            </select>
          </div>
        )}

        {!isGpaSpa && !isReferral && (
          <>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Tax Responsibility</label>
              <input
                type="text"
                name="taxesResponsibility"
                value={terms.taxesResponsibility || ""}
                onChange={handleChange}
                disabled={isReadOnly}
                placeholder="e.g. Buyer pays TDS, Seller pays CGT"
                className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Stamp Duty & Registration Expense</label>
              <input
                type="text"
                name="registrationExpenseResponsibility"
                value={terms.registrationExpenseResponsibility || ""}
                onChange={handleChange}
                disabled={isReadOnly}
                placeholder="e.g. Borne entirely by Buyer"
                className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Target Possession / Handover Date</label>
              <input
                type="date"
                name="possessionDate"
                value={terms.possessionDate || ""}
                onChange={handleChange}
                disabled={isReadOnly}
                className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
              />
            </div>
          </>
        )}
      </div>

      {/* Conditional: Rental & Lease Fields */}
      {isRental && (
        <div className="border-t border-slate-200 pt-4 space-y-4">
          <h4 className="text-xs font-bold text-[#8A704C] uppercase tracking-wider">Rental Specific Parameters</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Monthly Rent Amount</label>
              <input
                type="number"
                name="monthlyRent"
                value={terms.monthlyRent || ""}
                onChange={handleChange}
                disabled={isReadOnly}
                placeholder="e.g. 25000"
                className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Lease Duration (Months)</label>
              <input
                type="number"
                name="leaseTermMonths"
                value={terms.leaseTermMonths || ""}
                onChange={handleChange}
                disabled={isReadOnly}
                placeholder="e.g. 11"
                className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Lock-in Period (Months)</label>
              <input
                type="number"
                name="lockInPeriodMonths"
                value={terms.lockInPeriodMonths || ""}
                onChange={handleChange}
                disabled={isReadOnly}
                placeholder="e.g. 6"
                className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Notice Period (Days)</label>
              <input
                type="number"
                name="noticePeriodDays"
                value={terms.noticePeriodDays || ""}
                onChange={handleChange}
                disabled={isReadOnly}
                placeholder="e.g. 30"
                className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Monthly Maintenance Charges</label>
              <input
                type="number"
                name="maintenanceCharges"
                value={terms.maintenanceCharges || ""}
                onChange={handleChange}
                disabled={isReadOnly}
                placeholder="e.g. 3500"
                className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Permitted Use</label>
              <input
                type="text"
                name="permittedUse"
                value={terms.permittedUse || ""}
                onChange={handleChange}
                disabled={isReadOnly}
                placeholder="e.g. Residential only"
                className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Renewal Terms / Rental Escalation</label>
              <input
                type="text"
                name="renewalTerms"
                value={terms.renewalTerms || ""}
                onChange={handleChange}
                disabled={isReadOnly}
                placeholder="e.g. Renewed at 5% escalation on base rent"
                className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Utility Bills Responsibility</label>
              <input
                type="text"
                name="utilitiesResponsibility"
                value={terms.utilitiesResponsibility || ""}
                onChange={handleChange}
                disabled={isReadOnly}
                placeholder="e.g. Lessee pays Electricity/Water, Lessor pays Property Tax"
                className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
              />
            </div>
          </div>
        </div>
      )}

      {/* Conditional: Construction & Contractor Fields */}
      {isConstruction && (
        <div className="border-t border-slate-200 pt-4 space-y-4">
          <h4 className="text-xs font-bold text-[#8A704C] uppercase tracking-wider">Construction Specific Parameters</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Cost Per Sq.Ft</label>
              <input
                type="number"
                name="costPerSqFt"
                value={terms.costPerSqFt || ""}
                onChange={handleChange}
                disabled={isReadOnly}
                placeholder="e.g. 1850"
                className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Timeline (Months)</label>
              <input
                type="number"
                name="timelineMonths"
                value={terms.timelineMonths || ""}
                onChange={handleChange}
                disabled={isReadOnly}
                placeholder="e.g. 12"
                className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Defect Liability Period</label>
              <input
                type="text"
                name="defectLiabilityPeriod"
                value={terms.defectLiabilityPeriod || ""}
                onChange={handleChange}
                disabled={isReadOnly}
                placeholder="e.g. 12 months from handover"
                className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2 py-1">
            <input
              type="checkbox"
              name="architectApprovalRequired"
              id="architectApprovalRequired"
              checked={terms.architectApprovalRequired || false}
              onChange={handleCheckboxChange}
              disabled={isReadOnly}
              className="h-4 w-4 border-slate-300 rounded text-[#8A704C] focus:ring-[#8A704C]"
            />
            <label htmlFor="architectApprovalRequired" className="text-xs font-bold text-slate-700">
              Architect / Engineer inspection required prior to milestone payment release
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Scope of Work Summary</label>
              <textarea
                name="scopeOfWork"
                rows={2}
                value={terms.scopeOfWork || ""}
                onChange={handleChange}
                disabled={isReadOnly}
                placeholder="Detailed description of structure, finishing, brickwork, slab casting details..."
                className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Materials Specification List</label>
              <textarea
                name="materialsSpecification"
                rows={2}
                value={terms.materialsSpecification || ""}
                onChange={handleChange}
                disabled={isReadOnly}
                placeholder="Cement brands, brick dimensions, electric wire thickness, tiling specifications..."
                className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
              />
            </div>
          </div>
        </div>
      )}

      {/* Conditional: Referral, Broker & Channel Partner Fields */}
      {isReferral && (
        <div className="border-t border-slate-200 pt-4 space-y-4">
          <h4 className="text-xs font-bold text-[#8A704C] uppercase tracking-wider">Referral & Commission Parameters</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Commission Percentage (%)</label>
              <input
                type="number"
                name="commissionPercentage"
                value={terms.commissionPercentage || ""}
                onChange={handleChange}
                disabled={isReadOnly}
                placeholder="e.g. 2.5"
                className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Commission Fixed Amount (if applicable)</label>
              <input
                type="number"
                name="commissionAmount"
                value={terms.commissionAmount || ""}
                onChange={handleChange}
                disabled={isReadOnly}
                placeholder="e.g. 50000"
                className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Payment Clearance Timeline (Days)</label>
              <input
                type="number"
                name="paymentTimelineDays"
                value={terms.paymentTimelineDays || ""}
                onChange={handleChange}
                disabled={isReadOnly}
                placeholder="e.g. 15"
                className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Commission Trigger Event</label>
              <input
                type="text"
                name="triggerEvent"
                value={terms.triggerEvent || ""}
                onChange={handleChange}
                disabled={isReadOnly}
                placeholder="e.g. Upon registration and full customer payout"
                className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Exclusivity and Non-Circumvention</label>
              <input
                type="text"
                name="exclusivityAndNonCircumvention"
                value={terms.exclusivityAndNonCircumvention || ""}
                onChange={handleChange}
                disabled={isReadOnly}
                placeholder="e.g. Standard non-circumvention applies"
                className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
              />
            </div>
          </div>
        </div>
      )}

      {/* Penalty & Refund Clauses */}
      {!isGpaSpa && (
        <div className="border-t border-slate-200 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Penalty / Default Clause</label>
            <textarea
              name="penaltyClause"
              rows={2}
              value={terms.penaltyClause || ""}
              onChange={handleChange}
              disabled={isReadOnly}
              placeholder="e.g. Defaulting party to compensate for actual losses; 18% per annum interest rate on late payments."
              className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Refund & Termination Clause</label>
            <textarea
              name="refundTerminationClause"
              rows={2}
              value={terms.refundTerminationClause || ""}
              onChange={handleChange}
              disabled={isReadOnly}
              placeholder="e.g. If title checks fail, advance token must be refunded in full within 15 working days."
              className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
            />
          </div>
        </div>
      )}
    </div>
  );
}
