"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatINR } from "@/lib/utils";
import { layoutAuthorityProfiles, LayoutAuthorityProfile } from "@/lib/calculators/layoutAuthorityProfiles";
import { LayoutAllocationDiagram } from "./LayoutAllocationDiagram";
import Link from "next/link";

interface PlotType {
  id: string;
  name: string;
  width: number;
  depth: number;
  mixPercent: number;
  enabled: boolean;
}

export const LayoutDevelopmentCalculator = () => {
  // 1. Inputs: Land Parcel Basics
  const [landSize, setLandSize] = useState(5); 
  const [unit, setUnit] = useState("acres"); 
  const [city, setCity] = useState("Bangalore");
  const [locality, setLocality] = useState("Devanahalli");
  const [surveyNumber, setSurveyNumber] = useState("");
  const [landType, setLandType] = useState("agricultural");
  const [titleStatus, setTitleStatus] = useState("clean_title");
  const [roadWidth, setRoadWidth] = useState(40);
  const [roadType, setRoadType] = useState("tar_road");
  const [terrain, setTerrain] = useState("flat");

  // 2. Authority & Presets
  const [selectedAuthority, setSelectedAuthority] = useState("bda_bbmp");
  const profile = layoutAuthorityProfiles[selectedAuthority] || layoutAuthorityProfiles.bda_bbmp;
  const [planningZone, setPlanningZone] = useState("residential");
  const [layoutType, setLayoutType] = useState("gated_community");
  const [reraApplicability, setReraApplicability] = useState("applicable");
  const [conversionRequired, setConversionRequired] = useState("yes");

  // 3. Editable Allocation Assumptions (Percentages)
  const [roadAlloc, setRoadAlloc] = useState(25);
  const [parkAlloc, setParkAlloc] = useState(10);
  const [caAlloc, setCaAlloc] = useState(5);
  const [utilityAlloc, setUtilityAlloc] = useState(3);
  const [bufferAlloc, setBufferAlloc] = useState(5);
  const [reservedAlloc, setReservedAlloc] = useState(2);
  const [developerRetainedAlloc, setDeveloperRetainedAlloc] = useState(5);
  const [targetSaleableAlloc, setTargetSaleableAlloc] = useState(45);

  const [isCustomEdited, setIsCustomEdited] = useState(false);

  // 4. Plot Mix Planning
  const [plotTypes, setPlotTypes] = useState<PlotType[]>([
    { id: "20x30", name: "20x30 Plot", width: 20, depth: 30, mixPercent: 20, enabled: true },
    { id: "30x40", name: "30x40 Plot", width: 30, depth: 40, mixPercent: 40, enabled: true },
    { id: "30x50", name: "30x50 Plot", width: 30, depth: 50, mixPercent: 20, enabled: true },
    { id: "40x60", name: "40x60 Plot", width: 40, depth: 60, mixPercent: 10, enabled: true },
    { id: "50x80", name: "50x80 Plot", width: 50, depth: 80, mixPercent: 5, enabled: true },
    { id: "custom1", name: "Custom Plot 1", width: 50, depth: 100, mixPercent: 5, enabled: true },
    { id: "custom2", name: "Custom Plot 2", width: 60, depth: 120, mixPercent: 0, enabled: false }
  ]);

  // 5. Cost Assumptions
  const [landAcquisitionRatePerAcre, setLandAcquisitionRatePerAcre] = useState(20000000); 
  const [stampDutyPercent, setStampDutyPercent] = useState(5.6);
  const [legalCost, setLegalCost] = useState(150000);
  const [brokeragePercent, setBrokeragePercent] = useState(2);
  const [holdingCostLumpSum, setHoldingCostLumpSum] = useState(1000000);

  const [conversionCostPerAcre, setConversionCostPerAcre] = useState(150000);
  const [layoutApprovalFeePerAcre, setLayoutApprovalFeePerAcre] = useState(250000);
  const [scrutinyFeeEstimate, setScrutinyFeeEstimate] = useState(25000);
  const [bettermentChargePerSqft, setBettermentChargePerSqft] = useState(200);
  const [reraRegistrationCostEstimate, setReraRegistrationCostEstimate] = useState(75000);
  const [khataEstimate, setKhataEstimate] = useState(20000);
  const [liaisonCost, setLiaisonCost] = useState(350000);

  const [roadRate, setRoadRate] = useState(150); 
  const [drainRate, setDrainRate] = useState(100); 
  const [waterSewageRate, setWaterSewageRate] = useState(80); 
  const [electricRate, setElectricRate] = useState(90); 
  const [streetlightRate, setStreetlightRate] = useState(40);
  const [securityRate, setSecurityRate] = useState(450000); 
  const [amenityLumpSum, setAmenityLumpSum] = useState(2500000); 
  const [signageLumpSum, setSignageLumpSum] = useState(500000);

  const [marketingBudget, setMarketingBudget] = useState(3000000); 
  const [salesOfficeLumpSum, setSalesOfficeLumpSum] = useState(1000000);
  const [launchEventLumpSum, setLaunchEventLumpSum] = useState(1500000);
  const [channelPartnerCommissionPercent, setChannelPartnerCommissionPercent] = useState(3);
  const [brochureCostLumpSum, setBrochureCostLumpSum] = useState(300000);

  const [interestRatePercent, setInterestRatePercent] = useState(12);
  const [projectDurationMonths, setProjectDurationMonths] = useState(24);
  const [escalationPercent, setEscalationPercent] = useState(3);
  const [contingencyPercent, setContingencyPercent] = useState(5);

  // 6. Revenue / GDV Assumptions
  const [conservativePricePerSqft, setConservativePricePerSqft] = useState(2200);
  const [basePricePerSqft, setBasePricePerSqft] = useState(2500);
  const [premiumPricePerSqft, setPremiumPricePerSqft] = useState(2800);
  const [sellRatePerSqft, setSellRatePerSqft] = useState(2500);
  const [expectedAbsorptionPercent, setExpectedAbsorptionPercent] = useState(90);
  const [discountProvisionPercent, setDiscountProvisionPercent] = useState(5);
  const [unsoldInventoryPercent, setUnsoldInventoryPercent] = useState(10);
  const [escalationAssumptionPercent, setEscalationAssumptionPercent] = useState(4);


  // 7. Checklist state
  const [checklistItems, setChecklistItems] = useState([
    { id: "mother_deed", name: "Mother deed / 30-year trace", status: "Pending" },
    { id: "rtc", name: "RTC/Pahani", status: "Pending" },
    { id: "mutation", name: "Mutation/MR", status: "Pending" },
    { id: "ec", name: "Encumbrance Certificate (EC)", status: "Pending" },
    { id: "tax_receipt", name: "Tax paid receipt", status: "Pending" },
    { id: "survey_sketch", name: "Survey sketch (Mojini 11E)", status: "Pending" },
    { id: "village_map", name: "Village map", status: "Pending" },
    { id: "conversion_order", name: "DC conversion order", status: "Pending" },
    { id: "zoning_confirmation", name: "Zoning confirmation", status: "Pending" },
    { id: "approach_road", name: "Approach road proof", status: "Pending" },
    { id: "layout_plan", name: "Layout plan", status: "Pending" },
    { id: "allocation_statement", name: "Road/park/CA allocation statement", status: "Pending" },
    { id: "local_approval", name: "Local planning approval", status: "Pending" },
    { id: "rera_app", name: "RERA applicability check", status: "Pending" },
    { id: "khata_path", name: "Khata/e-khata/e-Swathu path", status: "Pending" },
    { id: "utility_noc", name: "Utility NOCs", status: "Pending" },
    { id: "env_check", name: "Environmental/buffer check", status: "Pending" }
  ]);

  // 8. Risk items state
  const [risks, setRisks] = useState([
    { id: "title", name: "Title risk", status: "Low", reason: "30-year title audit clean", action: "Confirm partition deed sign-offs" },
    { id: "conversion", name: "Conversion risk", status: "Medium", reason: "Agricultural zone conversion in progress", action: "Liaise with DC desk" },
    { id: "approval", name: "Authority approval risk", status: "Medium", reason: "BDA layout plan approval queue", action: "Follow BDA Revised Master Plan" },
    { id: "access", name: "Access road risk", status: "Low", reason: "Approach road is 40 ft public tar road", action: "NOC from NH/SH if applicable" },
    { id: "compliance", name: "Allocation compliance risk", status: "Low", reason: "Meets exact regulatory presets", action: "Maintain park and road buffer margins" },
    { id: "buffer", name: "Buffer/environment risk", status: "Medium", reason: "Lake setback within 200m", action: "Strictly mark NGT buffer zones" },
    { id: "infra", name: "Infrastructure cost risk", status: "Low", reason: "Standard terrain and leveling", action: "Get fixed bids for road laying" },
    { id: "sales", name: "Market sales risk", status: "Low", reason: "High demand peripheral Devanahalli belt", action: "Position as premium gated layout" },
    { id: "finance", name: "Finance risk", status: "Medium", reason: "Working capital interest rate assumptions", action: "Secure equity commitment early" },
    { id: "delay", name: "Launch delay risk", status: "Medium", reason: "Liaison timeline unpredictability", action: "Build 6-month buffer in plans" }
  ]);

  // Load authority default assumptions
  useEffect(() => {
    if (selectedAuthority === "custom") return;
    const profile = layoutAuthorityProfiles[selectedAuthority];
    if (profile) {
      setRoadAlloc(profile.roadAllocationPercent);
      setParkAlloc(profile.parkOpenSpacePercent);
      setCaAlloc(profile.civicAmenityPercent);
      setUtilityAlloc(profile.utilityAreaPercent);
      setBufferAlloc(profile.drainageBufferPercent);
      setReservedAlloc(profile.reservedLandPercent);
      setTargetSaleableAlloc(profile.targetSaleableEfficiencyPercent);
      
      setConversionCostPerAcre(profile.landConversionCostPerAcre);
      setLayoutApprovalFeePerAcre(profile.approvalFeePerAcre);
      setBettermentChargePerSqft(profile.bettermentChargePerSqft);
      setContingencyPercent(profile.contingencyPercent);

      setIsCustomEdited(false);
    }
  }, [selectedAuthority]);

  // Conversions to Sq.Ft & Acres
  let totalSqft = 0;
  if (unit === "acres") totalSqft = landSize * 43560;
  else if (unit === "guntas") totalSqft = landSize * 1089;
  else if (unit === "cents") totalSqft = landSize * 43.56 * 10;
  else if (unit === "hectares") totalSqft = landSize * 107639;
  else totalSqft = landSize; 

  const landAcres = totalSqft / 43560;

  // Allocations Math
  const totalAllocPercent = roadAlloc + parkAlloc + caAlloc + utilityAlloc + bufferAlloc + reservedAlloc + developerRetainedAlloc;
  const saleablePercent = Math.max(0, 100 - totalAllocPercent);
  
  const saleableSqft = Math.round(totalSqft * (saleablePercent / 100));
  const nonSaleableSqft = totalSqft - saleableSqft;

  // Allocation Areas
  const roadSqft = totalSqft * (roadAlloc / 100);
  const parkSqft = totalSqft * (parkAlloc / 100);
  const caSqft = totalSqft * (caAlloc / 100);
  const utilitySqft = totalSqft * (utilityAlloc / 100);
  const bufferSqft = totalSqft * (bufferAlloc / 100);
  const reservedSqft = totalSqft * (reservedAlloc / 100);

  // Plot Yields count based on mix
  const totalMixSum = plotTypes.reduce((acc, p) => acc + (p.enabled ? p.mixPercent : 0), 0);

  const calculatedPlotCounts = plotTypes.map(plot => {
    if (!plot.enabled) return { ...plot, count: 0, areaConsumed: 0 };
    const plotSize = plot.width * plot.depth;
    const allocatedArea = saleableSqft * (plot.mixPercent / 100);
    const count = plotSize > 0 ? Math.floor(allocatedArea / plotSize) : 0;
    return {
      ...plot,
      count,
      areaConsumed: count * plotSize
    };
  });

  const totalPlots = calculatedPlotCounts.reduce((acc, p) => acc + p.count, 0);
  const totalAreaConsumed = calculatedPlotCounts.reduce((acc, p) => acc + p.areaConsumed, 0);
  const balanceSqft = Math.max(0, saleableSqft - totalAreaConsumed);
  const averagePlotSize = totalPlots > 0 ? Math.round(totalAreaConsumed / totalPlots) : 0;

  // Standard 30x40 Plot count reference
  const count30x40 = Math.floor(saleableSqft / 1200);

  // Cost calculations
  const landCost = landAcres * landAcquisitionRatePerAcre;
  const stampDutyCost = landCost * (stampDutyPercent / 100);
  const legalFees = legalCost;
  const brokerageCost = landCost * (brokeragePercent / 100);
  const totalLandAcquisitionCost = landCost + stampDutyCost + legalFees + brokerageCost + holdingCostLumpSum;

  const conversionCost = conversionRequired === "yes" ? landAcres * conversionCostPerAcre : 0;
  const approvalFees = landAcres * layoutApprovalFeePerAcre + totalSqft * bettermentChargePerSqft;
  const totalApprovalsAndDocs = Math.round(conversionCost + approvalFees + scrutinyFeeEstimate + reraRegistrationCostEstimate + khataEstimate + liaisonCost);

  const roadCostVal = roadSqft * roadRate;
  const drainCostVal = totalSqft * (drainRate / 100);
  const utilityLinesCost = totalSqft * ((waterSewageRate + electricRate + streetlightRate) / 100);
  const totalInfrastructure = Math.round(roadCostVal + drainCostVal + utilityLinesCost + securityRate + amenityLumpSum + signageLumpSum);

  // Revenue GDVs
  const grossTargetGDV = totalAreaConsumed * sellRatePerSqft;
  const gdvConservativeVal = totalAreaConsumed * conservativePricePerSqft;
  const gdvBaseVal = totalAreaConsumed * basePricePerSqft;
  const gdvPremiumVal = totalAreaConsumed * premiumPricePerSqft;

  const cpCommission = grossTargetGDV * (channelPartnerCommissionPercent / 100);
  const totalLaunchAndMarketing = marketingBudget + salesOfficeLumpSum + launchEventLumpSum + cpCommission + brochureCostLumpSum;

  const subtotalBeforeLaunch = totalLandAcquisitionCost + totalApprovalsAndDocs + totalInfrastructure;
  const contingencyAmount = Math.round(subtotalBeforeLaunch * (contingencyPercent / 100));
  
  const totalProjectCostTillLaunch = subtotalBeforeLaunch + totalLaunchAndMarketing + contingencyAmount;
  const investorCapitalRequired = Math.max(0, totalProjectCostTillLaunch);

  const discountVal = grossTargetGDV * (discountProvisionPercent / 100);
  const netRevenueAfterDiscount = grossTargetGDV - discountVal;

  const breakEvenRate = saleableSqft > 0 ? Math.round(totalProjectCostTillLaunch / saleableSqft) : 0;
  const launchViabilityScore = Math.max(10, Math.min(100, Math.round((grossTargetGDV / totalProjectCostTillLaunch) * 35)));

  // Calculate Overall Readiness & Feasibility Grade
  const verifiedChecklistCount = checklistItems.filter(item => item.status === "Verified").length;
  const checklistScore = Math.round((verifiedChecklistCount / checklistItems.length) * 60);

  const riskScore = risks.reduce((acc, r) => {
    if (r.status === "Low") return acc + 4;
    if (r.status === "Medium") return acc + 2;
    return acc;
  }, 0);

  const overallReadinessScore = Math.min(100, checklistScore + riskScore);
  
  const titleRisk = risks.find(r => r.id === "title")?.status || "Low";
  const accessRisk = risks.find(r => r.id === "access")?.status || "Low";

  let readinessGrade = "B";
  if (overallReadinessScore >= 80 && titleStatus === "clean_title") readinessGrade = "A";
  else if (overallReadinessScore < 45 || titleStatus !== "clean_title") readinessGrade = "D";

  // Handlers for Checklist and Risk dropdowns
  const handleChecklistStatusChange = (id: string, status: string) => {
    setChecklistItems(prev => prev.map(item => item.id === id ? { ...item, status } : item));
  };

  const handleRiskStatusChange = (id: string, status: string) => {
    setRisks(prev => prev.map(risk => risk.id === id ? { ...risk, status } : risk));
  };

  const handleRiskFieldChange = (id: string, field: "reason" | "action", value: string) => {
    setRisks(prev => prev.map(risk => risk.id === id ? { ...risk, [field]: value } : risk));
  };

  const handlePlotTypeChange = (id: string, field: keyof PlotType, value: any) => {
    setPlotTypes(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const normalizePlotMix = () => {
    const activePlots = plotTypes.filter(p => p.enabled);
    if (activePlots.length === 0) return;
    const equalShare = Math.floor(100 / activePlots.length);
    setPlotTypes(prev => prev.map(p => p.enabled ? { ...p, mixPercent: equalShare } : p));
  };

  const handleResetToProfile = () => {
    setSelectedAuthority(selectedAuthority); // trigger reload
    const profile = layoutAuthorityProfiles[selectedAuthority];
    if (profile) {
      setRoadAlloc(profile.roadAllocationPercent);
      setParkAlloc(profile.parkOpenSpacePercent);
      setCaAlloc(profile.civicAmenityPercent);
      setUtilityAlloc(profile.utilityAreaPercent);
      setBufferAlloc(profile.drainageBufferPercent);
      setReservedAlloc(profile.reservedLandPercent);
      setTargetSaleableAlloc(profile.targetSaleableEfficiencyPercent);
    }
  };

  const handleCopySummary = () => {
    const text = `MS Legacy Layout Feasibility Summary:\n\n` +
      `Land size: ${landSize} ${unit} (${totalSqft.toLocaleString()} Sq.Ft)\n` +
      `Authority selected: ${profile.authorityName || "Custom"}\n` +
      `Saleable area efficiency: ${saleablePercent}%\n` +
      `Saleable plotted area: ${saleableSqft.toLocaleString()} Sq.Ft\n` +
      `Estimated plot count (30x40): ${count30x40} sites\n` +
      `Estimated project cost till launch: ${formatINR(totalProjectCostTillLaunch)}\n` +
      `Break-even selling price: ${formatINR(breakEvenRate)} per Sq.Ft\n` +
      `Estimated GDV: ${formatINR(grossTargetGDV)}\n` +
      `Illustrative checklist score: ${overallReadinessScore}/100`;
    navigator.clipboard.writeText(text);
    alert("Feasibility summary copied to clipboard!");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCrmSync = () => {
    window.location.assign("/contact?interestType=layout_feasibility_review");
  };

  return (
    <div className="space-y-8 font-sans text-xs text-[#1f2a24]">
      <p role="status" className="max-w-6xl mx-auto p-4 bg-amber-50 text-amber-900 text-sm">Illustrative area and cost model. Authority defaults are editable assumptions. Plot geometry, setbacks, height, parking and approval eligibility require a coordinated architect review. Financing is excluded from these totals.</p>
      
      {/* Warnings & Validations */}
      {totalAllocPercent > 100 && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded max-w-[1440px] mx-auto text-center font-bold">
          ⚠ Warning: Total allocations ({totalAllocPercent}%) exceed 100% boundary. Please adjust values.
        </div>
      )}
      {totalMixSum !== 100 && (
        <div className="bg-amber-50 border border-amber-200 text-amber-700 p-4 rounded max-w-[1440px] mx-auto text-center font-bold">
          ⚠ Plot mix normalization required: Current sum of enabled mixes is {totalMixSum}%. Target is 100%.
        </div>
      )}

      {/* 1. Main Grid Columns (2/3 Form, 1/3 Sticky summary) */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-8 items-start max-w-[1440px] mx-auto px-6 lg:px-10">
        
        {/* Left Form Area (2/3 width) */}
        <div className="space-y-6">
          <Card className="p-6 bg-white border border-gold-elegant space-y-6">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-serif text-lg font-bold text-[#10291f]">A. Land Parcel Parameters</h3>
              {isCustomEdited && (
                <span className="bg-[#8b6e3a]/10 text-[#8b6e3a] border border-[#8b6e3a]/20 text-[9.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                  Custom Edited Model
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-[#5f6b63] uppercase">
                  Land Extent Size <span className="text-amber-700">*</span>
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number" min="0"
                    value={landSize}
                    onChange={(e) => setLandSize(Math.max(1, Number(e.target.value)))}
                    className="w-2/3 bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 font-bold text-[#1f2a24] focus:outline-none"
                  />
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-1/3 bg-white border border-slate-200 rounded px-2 py-2 font-bold text-[#1f2a24] focus:outline-none"
                  >
                    <option value="acres">Acres</option>
                    <option value="guntas">Guntas</option>
                    <option value="sq.ft">Sq.Ft</option>
                    <option value="cents">Cents</option>
                    <option value="hectares">Hectares</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-[#5f6b63] uppercase" htmlFor="layoutdevelopmentcalculator-field-1">Title & Ownership status</label>
                <select id="layoutdevelopmentcalculator-field-1"
                  value={titleStatus}
                  onChange={(e) => setTitleStatus(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded px-3 py-2 font-bold text-[#1f2a24] focus:outline-none"
                >
                  <option value="clean_title">Clean Title (Audited 30-yrs)</option>
                  <option value="under_verification">Verification Pending</option>
                  <option value="litigation_check">Civil litigation check required</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-[#5f6b63] uppercase" htmlFor="layoutdevelopmentcalculator-field-2">Approach Road Type</label>
                <select id="layoutdevelopmentcalculator-field-2"
                  value={roadType}
                  onChange={(e) => setRoadType(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded px-3 py-2 font-bold text-[#1f2a24] focus:outline-none"
                >
                  <option value="tar_road">Tar Public Road</option>
                  <option value="mud_road">Kutcha / mud road</option>
                  <option value="private_road">Private layout access road</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-[#5f6b63] uppercase" htmlFor="layoutdevelopmentcalculator-field-3">Approval Authority Profile</label>
                <select id="layoutdevelopmentcalculator-field-3"
                  value={selectedAuthority}
                  onChange={(e) => setSelectedAuthority(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded px-3 py-2 font-bold text-[#8b6e3a] focus:outline-none"
                >
                  <option value="bda_bbmp">BDA / GBA-BBMP Urban Planning</option>
                  <option value="bmrda">BMRDA Residential Layout</option>
                  <option value="gram_panchayat">Gram Panchayat / e-Swathu limits</option>
                  <option value="dtcp">DTCP / District Planning Authority</option>
                  <option value="custom">Custom Authority (Manual percentages)</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Editable Authority Assumptions Table (Phase 1 & 2) */}
          <Card className="p-6 bg-white border border-gold-elegant space-y-4 overflow-x-auto">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-serif text-sm font-bold text-[#10291f]">B. Saleable Area & Government Allocation Breakdown</h3>
              <Button onClick={handleResetToProfile} className="bg-slate-100 hover:bg-slate-200 text-[#1f2a24] font-bold text-[10px] py-1 px-3 h-auto">
                Reset to Authority Defaults
              </Button>
            </div>
            <table className="w-full text-left text-xs font-sans text-[#1f2a24] border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-[10px] text-[#5f6b63] font-bold uppercase tracking-wider">
                  <th className="py-2.5 px-3">Allocation Head</th>
                  <th className="py-2.5 px-3">Percentage (%)</th>
                  <th className="py-2.5 px-3">Area (sq.ft)</th>
                  <th className="py-2.5 px-3">Area (Acres)</th>
                  <th className="py-2.5 px-3">Verification Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-[#10291f]">Gross Land Area</td>
                  <td className="py-2.5 px-3 font-bold">100%</td>
                  <td className="py-2.5 px-3 font-bold">{totalSqft.toLocaleString()}</td>
                  <td className="py-2.5 px-3 font-bold">{landAcres.toFixed(3)}</td>
                  <td className="py-2.5 px-3 text-[#047857] font-bold">User Input</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3">Roads / Circulation %</td>
                  <td className="py-2.5 px-3">
                    <input
                      type="number" min="0"
                      value={roadAlloc}
                      onChange={(e) => { setRoadAlloc(Number(e.target.value)); setIsCustomEdited(true); }}
                      className="w-16 border rounded px-1.5 py-0.5 font-bold text-[#1f2a24]"
                    />
                  </td>
                  <td className="py-2.5 px-3">{Math.round(roadSqft).toLocaleString()}</td>
                  <td className="py-2.5 px-3">{(roadSqft / 43560).toFixed(3)}</td>
                  <td className="py-2.5 px-3 text-amber-700 font-bold">Editable Assumption</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3">Parks / Open space %</td>
                  <td className="py-2.5 px-3">
                    <input
                      type="number" min="0"
                      value={parkAlloc}
                      onChange={(e) => { setParkAlloc(Number(e.target.value)); setIsCustomEdited(true); }}
                      className="w-16 border rounded px-1.5 py-0.5 font-bold text-[#1f2a24]"
                    />
                  </td>
                  <td className="py-2.5 px-3">{Math.round(parkSqft).toLocaleString()}</td>
                  <td className="py-2.5 px-3">{(parkSqft / 43560).toFixed(3)}</td>
                  <td className="py-2.5 px-3 text-amber-700 font-bold">Editable Assumption</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3">Civic Amenities / CA %</td>
                  <td className="py-2.5 px-3">
                    <input
                      type="number" min="0"
                      value={caAlloc}
                      onChange={(e) => { setCaAlloc(Number(e.target.value)); setIsCustomEdited(true); }}
                      className="w-16 border rounded px-1.5 py-0.5 font-bold text-[#1f2a24]"
                    />
                  </td>
                  <td className="py-2.5 px-3">{Math.round(caSqft).toLocaleString()}</td>
                  <td className="py-2.5 px-3">{(caSqft / 43560).toFixed(3)}</td>
                  <td className="py-2.5 px-3 text-amber-700 font-bold">Editable Assumption</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3">Utilities / Services %</td>
                  <td className="py-2.5 px-3">
                    <input
                      type="number" min="0"
                      value={utilityAlloc}
                      onChange={(e) => { setUtilityAlloc(Number(e.target.value)); setIsCustomEdited(true); }}
                      className="w-16 border rounded px-1.5 py-0.5 font-bold text-[#1f2a24]"
                    />
                  </td>
                  <td className="py-2.5 px-3">{Math.round(utilitySqft).toLocaleString()}</td>
                  <td className="py-2.5 px-3">{(utilitySqft / 43560).toFixed(3)}</td>
                  <td className="py-2.5 px-3 text-amber-700 font-bold">Editable Assumption</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3">Drainage / Buffers %</td>
                  <td className="py-2.5 px-3">
                    <input
                      type="number" min="0"
                      value={bufferAlloc}
                      onChange={(e) => { setBufferAlloc(Number(e.target.value)); setIsCustomEdited(true); }}
                      className="w-16 border rounded px-1.5 py-0.5 font-bold text-[#1f2a24]"
                    />
                  </td>
                  <td className="py-2.5 px-3">{Math.round(bufferSqft).toLocaleString()}</td>
                  <td className="py-2.5 px-3">{(bufferSqft / 43560).toFixed(3)}</td>
                  <td className="py-2.5 px-3 text-amber-700 font-bold">Editable Assumption</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3">Reserved / Shape Loss %</td>
                  <td className="py-2.5 px-3">
                    <input
                      type="number" min="0"
                      value={reservedAlloc}
                      onChange={(e) => { setReservedAlloc(Number(e.target.value)); setIsCustomEdited(true); }}
                      className="w-16 border rounded px-1.5 py-0.5 font-bold text-[#1f2a24]"
                    />
                  </td>
                  <td className="py-2.5 px-3">{Math.round(reservedSqft).toLocaleString()}</td>
                  <td className="py-2.5 px-3">{(reservedSqft / 43560).toFixed(3)}</td>
                  <td className="py-2.5 px-3 text-amber-700 font-bold">Editable Assumption</td>
                </tr>
                <tr className="bg-slate-50 font-bold">
                  <td className="py-2.5 px-3 text-rose-700">Total Non-Saleable</td>
                  <td className="py-2.5 px-3">{totalAllocPercent}%</td>
                  <td className="py-2.5 px-3">{nonSaleableSqft.toLocaleString()}</td>
                  <td className="py-2.5 px-3">{(nonSaleableSqft / 43560).toFixed(3)}</td>
                  <td className="py-2.5 px-3 text-amber-700 font-bold">Calculated Sum</td>
                </tr>
                <tr className="bg-emerald-50/50 font-bold text-emerald-800">
                  <td className="py-2.5 px-3">Net Saleable Plotted Area</td>
                  <td className="py-2.5 px-3">{saleablePercent}%</td>
                  <td className="py-2.5 px-3">{saleableSqft.toLocaleString()}</td>
                  <td className="py-2.5 px-3">{(saleableSqft / 43560).toFixed(3)}</td>
                  <td className="py-2.5 px-3 text-[#047857]">Target Yield</td>
                </tr>
              </tbody>
            </table>
          </Card>

          {/* Plot Mix planning (Phase 3) */}
          <Card className="p-6 bg-white border border-gold-elegant space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-serif text-sm font-bold text-[#10291f]">C. Plot Yield & Adjustments</h3>
              <Button onClick={normalizePlotMix} className="bg-slate-100 hover:bg-slate-200 text-[#1f2a24] font-bold text-[10px] py-1 px-3 h-auto">
                Normalize plot mix to 100%
              </Button>
            </div>
            <div className="space-y-4">
              {plotTypes.map(plot => (
                <div key={plot.id} className="grid grid-cols-1 sm:grid-cols-6 gap-3 items-center border-b pb-3">
                  <div className="sm:col-span-2 flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={plot.enabled}
                      onChange={(e) => handlePlotTypeChange(plot.id, "enabled", e.target.checked)}
                      className="rounded"
                    />
                    <span className="font-bold text-[#1f2a24]">{plot.name}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[10px] text-[#5f6b63]">W:</span>
                    <input
                      type="number" min="0"
                      value={plot.width}
                      disabled={!plot.enabled}
                      onChange={(e) => handlePlotTypeChange(plot.id, "width", Number(e.target.value))}
                      className="w-12 border rounded px-1 text-center font-bold text-[#1f2a24] disabled:opacity-50"
                    />
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[10px] text-[#5f6b63]">D:</span>
                    <input
                      type="number" min="0"
                      value={plot.depth}
                      disabled={!plot.enabled}
                      onChange={(e) => handlePlotTypeChange(plot.id, "depth", Number(e.target.value))}
                      className="w-12 border rounded px-1 text-center font-bold text-[#1f2a24] disabled:opacity-50"
                    />
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[10px] text-[#5f6b63]">Mix%:</span>
                    <input
                      type="number" min="0"
                      value={plot.mixPercent}
                      disabled={!plot.enabled}
                      onChange={(e) => handlePlotTypeChange(plot.id, "mixPercent", Number(e.target.value))}
                      className="w-12 border rounded px-1 text-center font-bold text-[#1f2a24] disabled:opacity-50"
                    />
                  </div>
                  <div className="text-right font-bold text-[#047857]">
                    {plot.enabled ? `${calculatedPlotCounts.find(p => p.id === plot.id)?.count} sites` : "Disabled"}
                  </div>
                </div>
              ))}

              <div className="text-xs text-[#8b6e3a] font-bold pt-2 space-y-1">
                <div>Total Plots: {totalPlots} sites · Consumed Saleable: {totalAreaConsumed.toLocaleString()} sq.ft</div>
                <div>Balance Adjustment Area: {balanceSqft.toLocaleString()} sq.ft · Average size: {averagePlotSize} sq.ft</div>
              </div>
            </div>
          </Card>

          {/* Visual allocation diagram */}
          <LayoutAllocationDiagram
            authorityName={profile.authorityName || "Custom Planning"}
            totalSqft={totalSqft}
            saleableSqft={saleableSqft}
            roadSqft={roadSqft}
            parkSqft={parkSqft}
            caSqft={caSqft}
            utilitySqft={utilitySqft}
            bufferSqft={bufferSqft}
            reservedSqft={reservedSqft}
            totalPlots={count30x40}
            launchBudget={totalProjectCostTillLaunch}
          />

          {/* Editable Cost & Investor Assumptions (Phase 4) */}
          <Card className="p-6 bg-white border border-gold-elegant space-y-6">
            <h3 className="font-serif text-sm font-bold text-[#10291f] border-b pb-2">D. Editable Cost & Investor Assumptions</h3>
            
            <div className="space-y-4">
              <span className="font-bold text-[10px] text-[#5f6b63] uppercase block">D.1 Land Acquisition Costs</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="font-bold text-[#5f6b63]">Rate per Acre (₹):</span>
                  <input
                    type="number" min="0"
                    value={landAcquisitionRatePerAcre}
                    onChange={(e) => setLandAcquisitionRatePerAcre(Number(e.target.value))}
                    className="w-full border rounded p-1.5 font-bold text-[#1f2a24]"
                  />
                </div>
                <div className="space-y-1">
                  <span className="font-bold text-[#5f6b63]">Stamp Duty / Reg (%):</span>
                  <input
                    type="number" min="0"
                    value={stampDutyPercent}
                    onChange={(e) => setStampDutyPercent(Number(e.target.value))}
                    className="w-full border rounded p-1.5 font-bold text-[#1f2a24]"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-100">
              <span className="font-bold text-[10px] text-[#5f6b63] uppercase block">D.2 Approvals & DC conversions</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <span className="font-bold text-[#5f6b63]">Conversion Cost (₹/Acre):</span>
                  <input
                    type="number" min="0"
                    value={conversionCostPerAcre}
                    onChange={(e) => setConversionCostPerAcre(Number(e.target.value))}
                    className="w-full border rounded p-1.5 font-bold text-[#1f2a24]"
                  />
                </div>
                <div className="space-y-1">
                  <span className="font-bold text-[#5f6b63]">Betterment charge (₹/sqft):</span>
                  <input
                    type="number" min="0"
                    value={bettermentChargePerSqft}
                    onChange={(e) => setBettermentChargePerSqft(Number(e.target.value))}
                    className="w-full border rounded p-1.5 font-bold text-[#1f2a24]"
                  />
                </div>
                <div className="space-y-1">
                  <span className="font-bold text-[#5f6b63]">RERA Registration (₹):</span>
                  <input
                    type="number" min="0"
                    value={reraRegistrationCostEstimate}
                    onChange={(e) => setReraRegistrationCostEstimate(Number(e.target.value))}
                    className="w-full border rounded p-1.5 font-bold text-[#1f2a24]"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Editable Revenue Scenario (Phase 5) */}
          <Card className="p-6 bg-white border border-gold-elegant space-y-6">
            <h3 className="font-serif text-sm font-bold text-[#10291f] border-b pb-2">E. Editable Revenue Scenario</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <span className="font-bold text-[#5f6b63]">Conservative Selling Price (₹/sqft):</span>
                <input
                  type="number" min="0"
                  value={conservativePricePerSqft}
                  onChange={(e) => setConservativePricePerSqft(Number(e.target.value))}
                  className="w-full border rounded p-1.5 font-bold text-[#1f2a24]"
                />
              </div>
              <div className="space-y-1">
                <span className="font-bold text-[#5f6b63]">Base Selling Price (₹/sqft):</span>
                <input
                  type="number" min="0"
                  value={basePricePerSqft}
                  onChange={(e) => setBasePricePerSqft(Number(e.target.value))}
                  className="w-full border rounded p-1.5 font-bold text-[#1f2a24]"
                />
              </div>
              <div className="space-y-1">
                <span className="font-bold text-[#5f6b63]">Selected Target Price (₹/sqft):</span>
                <input
                  type="number" min="0"
                  value={sellRatePerSqft}
                  onChange={(e) => setSellRatePerSqft(Number(e.target.value))}
                  className="w-full border rounded p-1.5 font-bold text-emerald-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div className="bg-[#f8f5ef]/50 p-4 rounded space-y-1">
                <div className="flex justify-between font-bold">
                  <span>GDV Conservative Scenario:</span>
                  <span>{formatINR(gdvConservativeVal)}</span>
                </div>
                <div className="flex justify-between font-bold text-emerald-800">
                  <span>GDV Target Scenario:</span>
                  <span>{formatINR(grossTargetGDV)}</span>
                </div>
              </div>
              <div className="bg-[#f8f5ef]/50 p-4 rounded space-y-1">
                <div className="flex justify-between font-bold">
                  <span>GDV Premium Scenario:</span>
                  <span>{formatINR(gdvPremiumVal)}</span>
                </div>
                <div className="text-[10px] text-amber-700 font-bold block pt-1">
                  Planning scenario only — not guaranteed.
                </div>
              </div>
            </div>
          </Card>

          {/* Statutory Approval Checklist (Phase 8) */}
          <Card className="p-6 bg-white border border-gold-elegant space-y-4">
            <h3 className="font-serif text-sm font-bold text-[#10291f] border-b pb-2">F. Statutory Approval Checklist</h3>
            <div className="space-y-3 font-sans text-xs">
              {checklistItems.map(item => (
                <div key={item.id} className="flex justify-between items-center border-b pb-2">
                  <span className="font-medium text-[#1f2a24]">{item.name}</span>
                  <select
                    value={item.status}
                    onChange={(e) => handleChecklistStatusChange(item.id, e.target.value)}
                    className="border rounded px-2 py-1 font-bold text-[#1f2a24]"
                  >
                    <option value="Required">Required</option>
                    <option value="Pending">Pending</option>
                    <option value="Verified">Verified</option>
                    <option value="Not Applicable">Not Applicable</option>
                    <option value="Needs Legal Review">Needs Legal Review</option>
                  </select>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Sticky Column (1/3 width) */}
        <div className="space-y-6 lg:sticky lg:top-24">
          <Card className="p-6 bg-white border border-gold-elegant space-y-6 text-[#1f2a24] shadow-sm">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-[10px] text-[#5f6b63] font-bold uppercase tracking-wider block">ESTIMATED LAUNCH BUDGET</span>
              <h3 className="font-sans text-3xl font-bold text-[#10291f] mt-1">{formatINR(totalProjectCostTillLaunch)}</h3>
              <span className="text-[10px] text-[#4b5a50] font-bold uppercase tracking-wider mt-1 block">
                Break-even Rate: <span className="text-emerald-700">{formatINR(breakEvenRate)} / Sq.Ft</span>
              </span>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-[#5f6b63] font-medium">Land Acquisition Cost:</span>
                <span className="font-bold text-[#10291f]">{formatINR(landCost)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-[#5f6b63] font-medium">Saleable Plotted Area:</span>
                <span className="font-bold text-[#10291f]">{saleableSqft.toLocaleString()} Sq.Ft ({saleablePercent}%)</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-[#5f6b63] font-medium">Non-Saleable Area:</span>
                <span className="font-bold text-[#10291f]">{nonSaleableSqft.toLocaleString()} Sq.Ft</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-[#5f6b63] font-medium">Infrastructure setup cost:</span>
                <span className="font-bold text-[#10291f]">{formatINR(totalInfrastructure)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-[#5f6b63] font-medium">Approvals & DC conversions:</span>
                <span className="font-bold text-[#10291f]">{formatINR(totalApprovalsAndDocs)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-[#5f6b63] font-medium">Gross development value (GDV):</span>
                <span className="font-bold text-emerald-700">{formatINR(grossTargetGDV)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-[#5f6b63] font-medium">Total Cost Till Launch:</span>
                <span className="font-bold text-[#10291f]">{formatINR(totalProjectCostTillLaunch)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5f6b63] font-medium">Investor Capital Required:</span>
                <span className="font-bold text-emerald-700">{formatINR(investorCapitalRequired)}</span>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-100">
              <div className="grid grid-cols-3 gap-2">
                <Button onClick={handleCopySummary} className="bg-[#10291f] text-white font-bold text-[9px] py-2 px-2 h-auto border-none">
                  Copy Text
                </Button>
                <Button onClick={handlePrint} className="bg-[#10291f] text-white font-bold text-[9px] py-2 px-2 h-auto border-none">
                  Print
                </Button>
                <Button 
                  onClick={handleCrmSync}
                  className={`font-bold text-[9px] py-2 px-2 h-auto border-none ${
                    "bg-[#8b6e3a] text-white"
                  }`}
                >
                  Request review
                </Button>
              </div>
              <Link href="/contact?interestType=layout_feasibility_review" className="block pt-1">
                <Button className="w-full bg-gold-gradient text-[#10291f] font-bold text-xs py-3 border-none">
                  Request MS Legacy Layout Feasibility Review
                </Button>
              </Link>
            </div>
          </Card>

          {/* Risk scoring (Phase 9) */}
          <Card className="p-6 bg-white border border-gold-elegant space-y-4">
            <h3 className="font-serif text-sm font-bold text-[#10291f] border-b pb-2">G. Risk Scoring & Readiness</h3>
            <div className="space-y-4 font-sans text-xs">
              <div className="flex justify-between">
                <span>Feasibility Grade:</span>
                <span className="font-bold text-emerald-700 uppercase">Grade {readinessGrade}</span>
              </div>
              <div className="flex justify-between">
                <span>Readiness Score:</span>
                <span className="font-bold text-[#10291f]">{overallReadinessScore} / 100</span>
              </div>
              <div className="flex justify-between">
                <span>Title clearance risk:</span>
                <span className={`font-bold uppercase ${titleRisk === "Low" ? "text-[#047857]" : "text-rose-700"}`}>{titleRisk}</span>
              </div>

              {/* Editable Risk Dropdowns */}
              <div className="pt-2 border-t space-y-3">
                <span className="block font-bold text-[9px] text-[#5f6b63] uppercase">Editable Risk Registry</span>
                {risks.slice(0, 3).map(risk => (
                  <div key={risk.id} className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-[#1f2a24]">{risk.name}:</span>
                      <select
                        value={risk.status}
                        onChange={(e) => handleRiskStatusChange(risk.id, e.target.value)}
                        className="border rounded px-1.5 py-0.5 text-[#1f2a24]"
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </div>
                    <input
                      type="text"
                      value={risk.reason}
                      onChange={(e) => handleRiskFieldChange(risk.id, "reason", e.target.value)}
                      placeholder="Enter reason..."
                      className="w-full border rounded px-1.5 py-0.5 text-[10px]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

      </div>

      {/* Global Disclaimer */}
      <div className="bg-white border border-gold-elegant p-6 rounded text-[10px] text-[#5f6b63] leading-relaxed text-center max-w-[1440px] mx-auto">
        <span className="font-bold text-[#10291f] uppercase tracking-wide block mb-1">Feasibility Disclaimer</span>
        <p>
          This calculator provides planning estimates only. Layout approval rules, land allocation requirements, road widths, civic amenity requirements, park/open-space allocations, conversion rules, authority charges, RERA applicability, taxes, and development costs vary by jurisdiction, site condition, zoning, and current government notifications. All figures must be verified with the relevant authority, licensed planner, architect, legal advisor, and government records before any investor or project decision.
        </p>
      </div>

    </div>
  );
};
export default LayoutDevelopmentCalculator;
