"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatINR } from "@/lib/utils";
import { apartmentAuthorityProfiles, ApartmentAuthorityProfile } from "@/lib/calculators/apartmentAuthorityProfiles";
import { ApartmentFeasibilityDiagram } from "./ApartmentFeasibilityDiagram";
import Link from "next/link";

interface UnitMixRow {
  id: string;
  name: string;
  sizeSqft: number;
  mixPercent: number;
  sellPricePerSqft: number;
  enabled: boolean;
}

export const ApartmentDevelopmentCalculator = () => {
  // 1. Inputs: Land Parcel Basics
  const [landSize, setLandSize] = useState(1); // default 1 acre
  const [unit, setUnit] = useState("acres");
  const [city, setCity] = useState("Bangalore");
  const [locality, setLocality] = useState("Whitefield");
  const [surveyNumber, setSurveyNumber] = useState("");
  const [zoneType, setZoneType] = useState("residential");
  const [roadWidth, setRoadWidth] = useState(40);
  const [conversionRequired, setConversionRequired] = useState("yes");
  const [titleStatus, setTitleStatus] = useState("clean_title");
  const [approachRoadStatus, setApproachRoadStatus] = useState("verified");
  const [terrain, setTerrain] = useState("flat");
  const [projectType, setProjectType] = useState("premium_apartment");

  // 2. Authority & Presets
  const [selectedAuthority, setSelectedAuthority] = useState("bda_bbmp");
  const [isCustomEdited, setIsCustomEdited] = useState(false);

  // 3. Editable Planning Assumptions (FAR & Ground Coverage)
  const [baseFAR, setBaseFAR] = useState(1.75);
  const [premiumFAR, setPremiumFAR] = useState(0.5);
  const [tdrFAR, setTdrFAR] = useState(0.5);
  const [groundCoveragePercent, setGroundCoveragePercent] = useState(45);
  
  const [openSpacePercent, setOpenSpacePercent] = useState(25);
  const [drivewayCirculationPercent, setDrivewayCirculationPercent] = useState(15);
  const [commonAreaLoadingPercent, setCommonAreaLoadingPercent] = useState(25);
  const [saleableEfficiencyPercent, setSaleableEfficiencyPercent] = useState(75);

  // 4. Apartment Unit Mix Planning
  const [unitMix, setUnitMix] = useState<UnitMixRow[]>([
    { id: "studio", name: "Studio Apartment", sizeSqft: 500, mixPercent: 10, sellPricePerSqft: 6000, enabled: true },
    { id: "1bhk", name: "1 BHK", sizeSqft: 750, mixPercent: 15, sellPricePerSqft: 6500, enabled: true },
    { id: "2bhk", name: "2 BHK", sizeSqft: 1100, mixPercent: 40, sellPricePerSqft: 7000, enabled: true },
    { id: "2.5bhk", name: "2.5 BHK", sizeSqft: 1350, mixPercent: 10, sellPricePerSqft: 7000, enabled: true },
    { id: "3bhk", name: "3 BHK", sizeSqft: 1650, mixPercent: 20, sellPricePerSqft: 7500, enabled: true },
    { id: "4bhk", name: "4 BHK / Penthouse", sizeSqft: 2800, mixPercent: 5, sellPricePerSqft: 8500, enabled: true }
  ]);

  // 5. Cost Assumptions
  const [landAcquisitionRatePerAcre, setLandAcquisitionRatePerAcre] = useState(40000000); // 4 Crores per acre
  const [stampDutyPercent, setStampDutyPercent] = useState(5.6);
  const [legalCost, setLegalCost] = useState(200000);
  const [conversionCost, setConversionCost] = useState(200000);
  
  const [civilConstructionRate, setCivilConstructionRate] = useState(2200); // per sq ft
  const [basementCostRate, setBasementCostRate] = useState(1800); // per sq ft
  const [mepRate, setMepRate] = useState(300);
  const [architectFeePercent, setArchitectFeePercent] = useState(2.5);
  const [structuralFee, setStructuralFee] = useState(150000);
  const [marketingBudget, setMarketingBudget] = useState(5000000);
  const [interestRatePercent, setInterestRatePercent] = useState(12);
  const [projectDurationMonths, setProjectDurationMonths] = useState(36);
  const [contingencyPercent, setContingencyPercent] = useState(5);

  // 6. Revenue & GDV Inputs
  const [discountProvisionPercent, setDiscountProvisionPercent] = useState(5);
  const [channelPartnerCommissionPercent, setChannelPartnerCommissionPercent] = useState(3);


  // 7. Checklist state
  const [checklistItems, setChecklistItems] = useState([
    { id: "mother_deed", name: "Mother deed / 30-year trace", status: "Pending" },
    { id: "rtc", name: "RTC/Pahani check", status: "Pending" },
    { id: "mutation", name: "Mutation order extract", status: "Pending" },
    { id: "ec", name: "Encumbrance Certificate (EC)", status: "Pending" },
    { id: "tax_receipt", name: "Tax paid receipt", status: "Pending" },
    { id: "survey_sketch", name: "Survey sketch (Mojini 11E)", status: "Pending" },
    { id: "conversion_order", name: "DC conversion order", status: "Pending" },
    { id: "zoning_confirmation", name: "Zoning confirmation", status: "Pending" },
    { id: "building_sanction", name: "Building plan sanction", status: "Pending" },
    { id: "fire_noc", name: "Fire NOC clearance", status: "Required" },
    { id: "rera_reg", name: "RERA registration certificate", status: "Pending" },
    { id: "water_noc", name: "BWSSB water NOC", status: "Pending" }
  ]);

  // 8. Risk items state
  const [risks, setRisks] = useState([
    { id: "title", name: "Title risk", status: "Low", reason: "Title evidence has not been independently reviewed", action: "Execute release deeds where needed" },
    { id: "conversion", name: "Conversion risk", status: "Medium", reason: "Zoning conversion in process", action: "Secure Taluk board clearance" },
    { id: "zoning", name: "Zoning FAR risk", status: "Medium", reason: "Maximum FAR depends on final road width", action: "Verify road buffer width physically" },
    { id: "parking", name: "Parking design risk", status: "Low", reason: "Basement design accommodates required slots", action: "Obtain structural check" },
    { id: "noc", name: "Fire & Height NOC risk", status: "Medium", reason: "NOC required for height above 15m", action: "Coordinate submissions early" },
    { id: "cost", name: "Construction cost risk", status: "Medium", reason: "MEP and steel price fluctuations", action: "Secure fixed civil contractor contracts" }
  ]);

  // Profile selection effect
  useEffect(() => {
    if (selectedAuthority === "custom") return;
    const profile = apartmentAuthorityProfiles[selectedAuthority];
    if (profile) {
      setBaseFAR(profile.baseFAR);
      setPremiumFAR(profile.premiumFAR);
      setTdrFAR(profile.tdrFAR);
      setGroundCoveragePercent(profile.groundCoveragePercent);
      setOpenSpacePercent(profile.openSpacePercent);
      setDrivewayCirculationPercent(profile.drivewayCirculationPercent);
      setCommonAreaLoadingPercent(profile.commonAreaLoadingPercent);
      setSaleableEfficiencyPercent(profile.saleableEfficiencyPercent);
      
      setConversionCost(profile.conversionCostEstimate);
      setContingencyPercent(profile.contingencyPercent);
      setArchitectFeePercent(profile.architectFeePercent);
      setStructuralFee(profile.structuralConsultantFee);

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

  // FAR Potential Math
  const profile = apartmentAuthorityProfiles[selectedAuthority] || apartmentAuthorityProfiles.bda_bbmp;
  const requestedFAR = baseFAR + premiumFAR + tdrFAR;
  const totalFARUsed = Math.max(0, Math.min(requestedFAR, profile.maxPermissibleFAR));
  const permissibleBuiltUpSqft = totalSqft * totalFARUsed;
  
  // Ground coverage and basement Math
  const groundCoverageSqft = totalSqft * (groundCoveragePercent / 100);
  const openSpaceSqft = totalSqft * (openSpacePercent / 100);

  // Saleable & Common Area Math
  const saleableSqft = permissibleBuiltUpSqft * (saleableEfficiencyPercent / 100);
  const commonAreaSqft = permissibleBuiltUpSqft - saleableSqft;

  // Unit Mix calculations
  const totalMixSum = unitMix.reduce((acc, u) => acc + (u.enabled ? u.mixPercent : 0), 0);

  const calculatedUnits = unitMix.map(row => {
    if (!row.enabled) return { ...row, count: 0, areaConsumed: 0 };
    const allocatedArea = saleableSqft * (row.mixPercent / 100);
    const count = row.sizeSqft > 0 ? Math.floor(allocatedArea / row.sizeSqft) : 0;
    return {
      ...row,
      count,
      areaConsumed: count * row.sizeSqft
    };
  });

  const totalUnitsVal = calculatedUnits.reduce((acc, u) => acc + u.count, 0);
  const totalAreaConsumed = calculatedUnits.reduce((acc, u) => acc + u.areaConsumed, 0);
  const balanceSqft = Math.max(0, saleableSqft - totalAreaConsumed);

  // Parking Math
  const carParksRequired = Math.ceil(totalUnitsVal * profile.carParkingPerUnit);
  const visitorParks = Math.ceil(carParksRequired * (profile.visitorParkingPercent / 100));
  const totalCarParks = carParksRequired + visitorParks;
  const parkingSqftRequired = totalCarParks * profile.parkingAreaPerCarSqft;

  // Cost calculations
  const landPurchaseCost = landAcres * landAcquisitionRatePerAcre;
  const stampDutyCost = landPurchaseCost * (stampDutyPercent / 100);
  const totalLandCost = landPurchaseCost + stampDutyCost + legalCost;

  const conversionCostVal = conversionRequired === "yes" ? landAcres * conversionCost : 0;
  const totalApprovalsCost = conversionCostVal + profile.approvalFeeEstimate + profile.planSanctionEstimate + profile.fireNocEstimate + profile.reraRegistrationEstimate;

  const civilCost = permissibleBuiltUpSqft * civilConstructionRate;
  const basementCost = parkingSqftRequired * basementCostRate;
  const mepCost = permissibleBuiltUpSqft * mepRate;
  const totalConstructionCost = civilCost + basementCost + mepCost + amenityLumpSum;

  const architectFee = civilCost * (architectFeePercent / 100);
  const totalProfessionalFees = architectFee + structuralFee + profile.liaisonSubmissionCost;

  const subtotalBeforeLaunch = totalLandCost + totalApprovalsCost + totalConstructionCost + totalProfessionalFees;
  const contingencyAmount = Math.round(subtotalBeforeLaunch * (contingencyPercent / 100));

  const totalProjectCostTillLaunch = subtotalBeforeLaunch + marketingBudget + contingencyAmount;
  const investorCapitalRequired = Math.max(0, totalProjectCostTillLaunch);

  // Revenue Projections
  const weightedSellingRate = totalUnitsVal > 0 
    ? calculatedUnits.reduce((acc, u) => acc + (u.count * u.sizeSqft * u.sellPricePerSqft), 0) / totalAreaConsumed
    : 6500;

  const grossGDV = calculatedUnits.reduce((sum, row) => sum + row.areaConsumed * row.sellPricePerSqft, 0);
  const breakEvenRate = saleableSqft > 0 ? Math.round(totalProjectCostTillLaunch / saleableSqft) : 0;
  
  const discountVal = grossGDV * (discountProvisionPercent / 100);
  const cpCommission = grossGDV * (channelPartnerCommissionPercent / 100);
  const netRevenue = grossGDV - discountVal - cpCommission;

  // Overall Score & Grade
  const verifiedChecklistCount = checklistItems.filter(item => item.status === "Verified").length;
  const checklistScore = Math.round((verifiedChecklistCount / checklistItems.length) * 60);

  const riskScore = risks.reduce((acc, r) => {
    if (r.status === "Low") return acc + 6;
    if (r.status === "Medium") return acc + 3;
    return acc;
  }, 0);

  const overallReadinessScore = Math.min(100, checklistScore + riskScore);
  
  let readinessGrade = "B";
  if (overallReadinessScore >= 80 && titleStatus === "clean_title") readinessGrade = "A";
  else if (overallReadinessScore < 45 || titleStatus !== "clean_title") readinessGrade = "D";

  // Handlers
  const handleChecklistStatusChange = (id: string, status: string) => {
    setChecklistItems(prev => prev.map(item => item.id === id ? { ...item, status } : item));
  };

  const handleRiskStatusChange = (id: string, status: string) => {
    setRisks(prev => prev.map(risk => risk.id === id ? { ...risk, status } : risk));
  };

  const handleRiskFieldChange = (id: string, field: "reason" | "action", value: string) => {
    setRisks(prev => prev.map(risk => risk.id === id ? { ...risk, [field]: value } : risk));
  };

  const handleUnitMixChange = (id: string, field: keyof UnitMixRow, value: any) => {
    setUnitMix(prev => prev.map(u => u.id === id ? { ...u, [field]: value } : u));
  };

  const normalizeUnitMix = () => {
    const activeUnits = unitMix.filter(u => u.enabled);
    if (activeUnits.length === 0) return;
    const equalShare = Math.floor(100 / activeUnits.length);
    setUnitMix(prev => prev.map(u => u.enabled ? { ...u, mixPercent: equalShare } : u));
  };

  const handleResetToProfile = () => {
    setSelectedAuthority(selectedAuthority);
    const profile = apartmentAuthorityProfiles[selectedAuthority];
    if (profile) {
      setBaseFAR(profile.baseFAR);
      setPremiumFAR(profile.premiumFAR);
      setTdrFAR(profile.tdrFAR);
      setGroundCoveragePercent(profile.groundCoveragePercent);
      setOpenSpacePercent(profile.openSpacePercent);
      setDrivewayCirculationPercent(profile.drivewayCirculationPercent);
      setCommonAreaLoadingPercent(profile.commonAreaLoadingPercent);
      setSaleableEfficiencyPercent(profile.saleableEfficiencyPercent);
      setIsCustomEdited(false);
    }
  };

  const handleCopySummary = () => {
    const text = `MS Legacy Apartment Feasibility Summary:\n\n` +
      `Land size: ${landSize} ${unit} (${totalSqft.toLocaleString()} Sq.Ft)\n` +
      `Authority selected: ${profile.authorityName || "Custom"}\n` +
      `FAR Used: ${totalFARUsed} (Base: ${baseFAR}, Premium: ${premiumFAR}, TDR: ${tdrFAR})\n` +
      `Theoretical FAR Capacity (preset cap applied): ${permissibleBuiltUpSqft.toLocaleString()} Sq.Ft\n` +
      `Net Saleable Apartment Area: ${saleableSqft.toLocaleString()} Sq.Ft\n` +
      `Estimated units count: ${totalUnitsVal} units\n` +
      `Estimated project cost till launch: ${formatINR(totalProjectCostTillLaunch)}\n` +
      `Break-even selling price: ${formatINR(breakEvenRate)} per Sq.Ft\n` +
      `Estimated GDV: ${formatINR(grossGDV)}\n` +
      `Illustrative checklist score: ${overallReadinessScore}/100`;
    navigator.clipboard.writeText(text);
    alert("Feasibility summary copied to clipboard!");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCrmSync = () => {
    window.location.assign("/contact?interestType=apartment_feasibility_review");
  };

  return (
    <div className="space-y-8 font-sans text-xs text-[#1f2a24]">
      <p role="status" className="max-w-6xl mx-auto p-4 bg-amber-50 text-amber-900 text-sm">Illustrative area and cost model. Authority defaults are editable assumptions. Plot geometry, setbacks, height, parking and approval eligibility require a coordinated architect review. Financing is excluded from these totals.</p>
      {/* Warnings & Validations */}
      {totalMixSum !== 100 && (
        <div className="bg-amber-50 border border-amber-200 text-amber-700 p-4 rounded max-w-[1440px] mx-auto text-center font-bold">
          ⚠ Unit mix normalization required: Current sum of enabled mixes is {totalMixSum}%. Target is 100%.
        </div>
      )}

      {/* Main Grid Columns */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-8 items-start max-w-[1440px] mx-auto px-6 lg:px-10">
        
        {/* Left Form Area (2/3 width) */}
        <div className="space-y-6">
          <Card className="p-6 bg-white border border-gold-elegant space-y-6">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-serif text-lg font-bold text-[#10291f]">A. Land & Authority Parameters</h3>
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
                    onChange={(e) => setLandSize(Math.max(0.1, Number(e.target.value)))}
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
                    <option value="hectares">Hectares</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-[#5f6b63] uppercase" htmlFor="apartmentdevelopmentcalculator-field-1">Approval Authority Profile</label>
                <select id="apartmentdevelopmentcalculator-field-1"
                  value={selectedAuthority}
                  onChange={(e) => setSelectedAuthority(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded px-3 py-2 font-bold text-[#8b6e3a] focus:outline-none"
                >
                  <option value="bda_bbmp">BDA / GBA-BBMP Urban Apartment</option>
                  <option value="bmrda">BMRDA Outskirts Apartment</option>
                  <option value="gram_panchayat">Gram Panchayat / e-Swathu limits</option>
                  <option value="dtcp">DTCP / District Planning Authority</option>
                  <option value="custom">Custom Authority (Manual FAR / FSI)</option>
                </select>
              </div>
            </div>
          </Card>

          {/* FAR, Built-up Area & Saleable Area */}
          <Card className="p-6 bg-white border border-gold-elegant space-y-6">
            <h3 className="font-serif text-sm font-bold text-[#10291f] border-b pb-2">B. FAR, Built-up Area & Saleable Area</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-[#5f6b63] uppercase" htmlFor="apartmentdevelopmentcalculator-field-2">Base FAR</label>
                <input id="apartmentdevelopmentcalculator-field-2"
                  type="number" min="0"
                  value={baseFAR}
                  disabled={selectedAuthority !== "custom"}
                  onChange={(e) => { setBaseFAR(Number(e.target.value)); setIsCustomEdited(true); }}
                  className="w-full border rounded px-3 py-2 font-bold text-[#1f2a24] disabled:opacity-75"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-[#5f6b63] uppercase" htmlFor="apartmentdevelopmentcalculator-field-3">Premium FAR</label>
                <input id="apartmentdevelopmentcalculator-field-3"
                  type="number" min="0"
                  value={premiumFAR}
                  disabled={selectedAuthority !== "custom"}
                  onChange={(e) => { setPremiumFAR(Number(e.target.value)); setIsCustomEdited(true); }}
                  className="w-full border rounded px-3 py-2 font-bold text-[#1f2a24] disabled:opacity-75"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-[#5f6b63] uppercase" htmlFor="apartmentdevelopmentcalculator-field-4">TDR FAR</label>
                <input id="apartmentdevelopmentcalculator-field-4"
                  type="number" min="0"
                  value={tdrFAR}
                  disabled={selectedAuthority !== "custom"}
                  onChange={(e) => { setTdrFAR(Number(e.target.value)); setIsCustomEdited(true); }}
                  className="w-full border rounded px-3 py-2 font-bold text-[#1f2a24] disabled:opacity-75"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-[#5f6b63] uppercase" htmlFor="apartmentdevelopmentcalculator-field-5">Ground Coverage %</label>
                <input id="apartmentdevelopmentcalculator-field-5"
                  type="number" min="0"
                  value={groundCoveragePercent}
                  disabled={selectedAuthority !== "custom"}
                  onChange={(e) => { setGroundCoveragePercent(Number(e.target.value)); setIsCustomEdited(true); }}
                  className="w-full border rounded px-3 py-2 font-bold text-[#1f2a24] disabled:opacity-75"
                />
              </div>
            </div>

            <div className="bg-[#f8f5ef]/50 p-4 rounded space-y-2.5 border border-slate-100">
              <div className="flex justify-between">
                <span>Total FAR Used:</span>
                <span className="font-bold text-[#10291f]">{totalFARUsed}</span>
              </div>
              <div className="flex justify-between">
                <span>Theoretical FAR Capacity (preset cap applied):</span>
                <span className="font-bold text-[#10291f]">{permissibleBuiltUpSqft.toLocaleString()} sq.ft</span>
              </div>
              <div className="flex justify-between text-emerald-800 font-bold">
                <span>Net Saleable Apartment Area ({saleableEfficiencyPercent}%):</span>
                <span>{saleableSqft.toLocaleString()} sq.ft</span>
              </div>
            </div>
          </Card>

          {/* Apartment Unit Mix Planning */}
          <Card className="p-6 bg-white border border-gold-elegant space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-serif text-sm font-bold text-[#10291f]">C. Apartment Unit Mix & Inventory</h3>
              <Button onClick={normalizeUnitMix} className="bg-slate-100 hover:bg-slate-200 text-[#1f2a24] font-bold text-[10px] py-1 px-3 h-auto">
                Normalize mix to 100%
              </Button>
            </div>
            
            <div className="space-y-4">
              {unitMix.map(row => (
                <div key={row.id} className="grid grid-cols-1 sm:grid-cols-6 gap-3 items-center border-b pb-3">
                  <div className="sm:col-span-2 flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={row.enabled}
                      onChange={(e) => handleUnitMixChange(row.id, "enabled", e.target.checked)}
                      className="rounded"
                    />
                    <span className="font-bold text-[#1f2a24]">{row.name}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[10px] text-[#5f6b63]">Size:</span>
                    <input
                      type="number" min="0"
                      value={row.sizeSqft}
                      disabled={!row.enabled}
                      onChange={(e) => handleUnitMixChange(row.id, "sizeSqft", Number(e.target.value))}
                      className="w-16 border rounded px-1.5 py-0.5 text-center font-bold text-[#1f2a24] disabled:opacity-50"
                    />
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[10px] text-[#5f6b63]">Mix%:</span>
                    <input
                      type="number" min="0"
                      value={row.mixPercent}
                      disabled={!row.enabled}
                      onChange={(e) => handleUnitMixChange(row.id, "mixPercent", Number(e.target.value))}
                      className="w-12 border rounded px-1 text-center font-bold text-[#1f2a24] disabled:opacity-50"
                    />
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[10px] text-[#5f6b63]">Price:</span>
                    <input
                      type="number" min="0"
                      value={row.sellPricePerSqft}
                      disabled={!row.enabled}
                      onChange={(e) => handleUnitMixChange(row.id, "sellPricePerSqft", Number(e.target.value))}
                      className="w-16 border rounded px-1 text-center font-bold text-[#1f2a24] disabled:opacity-50"
                    />
                  </div>
                  <div className="text-right font-bold text-[#047857]">
                    {row.enabled ? `${calculatedUnits.find(u => u.id === row.id)?.count} units` : "Disabled"}
                  </div>
                </div>
              ))}

              <div className="text-xs text-[#8b6e3a] font-bold pt-2 space-y-1">
                <div>Total Units: {totalUnitsVal} units · Balance adjustment space: {balanceSqft.toLocaleString()} sq.ft</div>
                <div>Weighted Avg Selling Price: {formatINR(weightedSellingRate)} per sq.ft</div>
              </div>
            </div>
          </Card>

          {/* Visual Massing / Area Diagram */}
          <ApartmentFeasibilityDiagram
            authorityName={profile.authorityName}
            totalLandSqft={totalSqft}
            builtUpSqft={permissibleBuiltUpSqft}
            saleableSqft={saleableSqft}
            groundCoverageSqft={groundCoverageSqft}
            openSpaceSqft={openSpaceSqft}
            parkingSqft={parkingSqftRequired}
            totalUnits={totalUnitsVal}
            contingencyPercent={contingencyPercent}
          />
        </div>

        {/* Right Sticky Column (1/3 width) */}
        <div className="space-y-6 lg:sticky lg:top-24">
          <Card className="p-6 bg-white border border-gold-elegant space-y-6 text-[#1f2a24] shadow-sm">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-[10px] text-[#5f6b63] font-bold uppercase tracking-wider block">ESTIMATED APARTMENT LAUNCH BUDGET</span>
              <h3 className="font-serif text-3xl font-bold text-[#10291f] mt-1">{formatINR(totalProjectCostTillLaunch)}</h3>
              <span className="text-[10px] text-[#4b5a50] font-bold uppercase tracking-wider mt-1 block">
                Break-even Rate: <span className="text-emerald-700">{formatINR(breakEvenRate)} / Sq.Ft</span>
              </span>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-[#5f6b63] font-medium">Land & stamp duty:</span>
                <span className="font-bold text-[#10291f]">{formatINR(totalLandCost)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-[#5f6b63] font-medium">Built-up potential:</span>
                <span className="font-bold text-[#10291f]">{Math.round(permissibleBuiltUpSqft).toLocaleString()} Sq.Ft</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-[#5f6b63] font-medium">Net saleable area:</span>
                <span className="font-bold text-[#10291f]">{Math.round(saleableSqft).toLocaleString()} Sq.Ft ({saleableEfficiencyPercent}%)</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-[#5f6b63] font-medium">Lifts & services construction:</span>
                <span className="font-bold text-[#10291f]">{formatINR(totalConstructionCost)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-[#5f6b63] font-medium">Approvals NOCs:</span>
                <span className="font-bold text-[#10291f]">{formatINR(totalApprovalsCost)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-[#5f6b63] font-medium">Gross Target GDV:</span>
                <span className="font-bold text-emerald-700">{formatINR(grossGDV)}</span>
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
              <Link href="/contact?interestType=apartment_feasibility_review" className="block pt-1">
                <Button className="w-full bg-gold-gradient text-[#10291f] font-bold text-xs py-3 border-none">
                  Request MS Legacy Apartment Feasibility Review
                </Button>
              </Link>
            </div>
          </Card>

          {/* Risk scoring */}
          <Card className="p-6 bg-white border border-gold-elegant space-y-4">
            <h3 className="font-serif text-sm font-bold text-[#10291f] border-b pb-2">E. Risk Scoring & Readiness</h3>
            <div className="space-y-3 font-sans text-xs">
              <div className="flex justify-between">
                <span>Feasibility Grade:</span>
                <span className="font-bold text-emerald-700 uppercase">Grade {readinessGrade}</span>
              </div>
              <div className="flex justify-between">
                <span>Readiness Score:</span>
                <span className="font-bold text-[#10291f]">{overallReadinessScore} / 100</span>
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
          This calculator provides planning estimates only. FAR/FSI, setbacks, ground coverage, parking norms, open-space requirements, fire requirements, NOCs, approval charges, RERA applicability, taxes, and construction costs vary by jurisdiction, zoning, road width, plot size, building height, design, current government notifications, and authority review. All figures must be verified with the relevant authority, licensed architect, structural engineer, legal advisor, and government records before any investor or project decision.
        </p>
      </div>

    </div>
  );
};
export default ApartmentDevelopmentCalculator;
const amenityLumpSum = 3000000;
