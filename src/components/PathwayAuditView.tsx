import React, { useState } from 'react';
import {
  ShieldAlert,
  CheckCircle,
  FileText,
  AlertTriangle,
  Lightbulb,
  Users,
  Target,
  Sparkles,
  Layers,
  ArrowRight,
  TrendingUp,
  Award,
  Zap,
  HelpCircle,
  Quote,
  Star,
  Check,
  X
} from 'lucide-react';
import {
  PATHWAY_DECLARATION,
  AI_INTERACTION_AUDIT_LOGS,
  CONCEPTS_ADOPTED_VS_REJECTED,
  EARLY_PROTOTYPE_USER_FEEDBACK,
  VALIDATION_PLAN_PHASE_2
} from '../data/pathwayAuditData';
import { Language } from '../utils/tamilTranslations';

interface PathwayAuditViewProps {
  currentLang: Language;
}

export const PathwayAuditView: React.FC<PathwayAuditViewProps> = ({ currentLang }) => {
  const [activeSubTab, setActiveSubTab] = useState<'pathway' | 'audit' | 'validation' | 'phase2'>('pathway');

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-4 sm:p-6 text-white border border-indigo-700/40 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-2 border border-indigo-400/30">
              <Award className="w-3.5 h-3.5" />
              <span>Pathway A & AI Interaction Audit & Validation Hub</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black">
              {currentLang === 'ta'
                ? '📋 திட்டம் A அறிவிப்பு, AI தணிக்கை & கள ஆய்வு சான்றுகள்'
                : '📋 Pathway A Declaration, AI Interaction Audit & User Validation'}
            </h2>
            <p className="text-xs sm:text-sm text-indigo-200 mt-1 max-w-3xl">
              {currentLang === 'ta'
                ? 'பிரச்சினை-முன்னுரிமை (Pathway A) கட்டமைப்பு, AI ஐ யோசனை பங்காளியாக பயன்படுத்திய முழு விபரம், களையப்பட்ட பிழைகள் மற்றும் தமிழக விவசாயிகளின் கள ஆய்வுகள்.'
                : 'Problem-First Domain Workflow declaration, rigorous AI ideation audit (prompts, hallucinations caught, decisions), and validated field results from 12 Tamil Nadu smallholders.'}
            </p>
          </div>

          <div className="bg-indigo-900/60 p-3 rounded-xl border border-indigo-500/30 text-right">
            <span className="text-[11px] text-indigo-300 block font-bold uppercase">Declared Pathway:</span>
            <span className="text-sm font-black text-white">{PATHWAY_DECLARATION.pathwayCode}: {PATHWAY_DECLARATION.pathwayTitle}</span>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-indigo-800/60">
          <button
            onClick={() => setActiveSubTab('pathway')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeSubTab === 'pathway'
                ? 'bg-indigo-500 text-white shadow-xs'
                : 'bg-indigo-950/60 text-indigo-200 hover:bg-indigo-900'
            }`}
          >
            🎯 1. Pathway A & Target Persona
          </button>
          <button
            onClick={() => setActiveSubTab('audit')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeSubTab === 'audit'
                ? 'bg-indigo-500 text-white shadow-xs'
                : 'bg-indigo-950/60 text-indigo-200 hover:bg-indigo-900'
            }`}
          >
            🤖 2. AI Interaction Audit & Hallucinations
          </button>
          <button
            onClick={() => setActiveSubTab('validation')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeSubTab === 'validation'
                ? 'bg-indigo-500 text-white shadow-xs'
                : 'bg-indigo-950/60 text-indigo-200 hover:bg-indigo-900'
            }`}
          >
            🌾 3. Early Farmer Field Feedback (Trials)
          </button>
          <button
            onClick={() => setActiveSubTab('phase2')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeSubTab === 'phase2'
                ? 'bg-indigo-500 text-white shadow-xs'
                : 'bg-indigo-950/60 text-indigo-200 hover:bg-indigo-900'
            }`}
          >
            🚀 4. Phase 2 Pilot Plan & KPIs
          </button>
        </div>
      </div>

      {/* Subtab 1: Pathway Declaration, Target User & 4 Friction Points */}
      {activeSubTab === 'pathway' && (
        <div className="space-y-6">
          {/* Target Persona Card */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-indigo-900 font-black text-sm uppercase tracking-wider">
              <Target className="w-5 h-5 text-indigo-600" />
              <span>Target User Profile & Agricultural Operating Context</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase block">User Identity & Landholding:</span>
                <p className="text-sm font-black text-slate-900">{PATHWAY_DECLARATION.targetUserPersona.titleEn}</p>
                <p className="text-xs text-indigo-700 font-bold">{PATHWAY_DECLARATION.targetUserPersona.titleTa}</p>
                <p className="text-xs text-slate-600"><strong>Land Size:</strong> {PATHWAY_DECLARATION.targetUserPersona.landSize}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase block">Power & Water Constraints:</span>
                <p className="text-xs text-slate-700"><strong>Electricity:</strong> {PATHWAY_DECLARATION.targetUserPersona.powerContext}</p>
                <p className="text-xs text-slate-700"><strong>Aquifer Status:</strong> {PATHWAY_DECLARATION.targetUserPersona.waterContext}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase block">Financial Vulnerability:</span>
                <p className="text-xs text-slate-700">{PATHWAY_DECLARATION.targetUserPersona.economicBurden}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase block">Technological & Field Reality:</span>
                <p className="text-xs text-slate-700">{PATHWAY_DECLARATION.targetUserPersona.digitalLiteracy}</p>
              </div>
            </div>
          </div>

          {/* 4 Core Friction Points */}
          <div className="space-y-4">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span>The 4 Specific Friction Points & System Interventions</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PATHWAY_DECLARATION.fourCoreFrictionPoints.map((fp, idx) => (
                <div key={fp.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-800 text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-black text-slate-900">{fp.titleEn}</h4>
                      <p className="text-xs text-indigo-700 font-bold">{fp.titleTa}</p>
                    </div>
                  </div>

                  <div className="text-xs space-y-2 pt-2 border-t border-slate-100 text-slate-700">
                    <p><strong>Root Cause:</strong> {fp.rootCause}</p>
                    <p><strong>Real Farm Impact:</strong> <span className="text-red-700 font-medium">{fp.impact}</span></p>
                    <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-950 font-medium">
                      <strong>System Intervention:</strong> {fp.solutionIntervention}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Subtab 2: AI Interaction Audit (Prompts, Hallucinations, Concepts) */}
      {activeSubTab === 'audit' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-indigo-900 font-black text-sm uppercase tracking-wider">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <span>AI Interaction Audit: Ideation Prompts & Hallucinations Caught</span>
            </div>
            <p className="text-xs text-slate-600">
              The following audit log documents real prompt engineering, critical agronomic hallucinations detected during AI code generation, and the engineering guardrails implemented to ensure farmer safety and ecological validity.
            </p>

            <div className="space-y-4">
              {AI_INTERACTION_AUDIT_LOGS.map((log, idx) => (
                <div key={idx} className="border border-slate-200 rounded-xl p-4 bg-slate-50/60 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200">
                    <div>
                      <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 mr-2">
                        {log.stage}
                      </span>
                      <span className="text-xs sm:text-sm font-black text-slate-900">{log.taskTitle}</span>
                    </div>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      log.humanEngineerAction === 'Rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      Action: {log.humanEngineerAction}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                      <span className="text-[11px] font-bold text-slate-500 block">Prompt Supplied to AI Ideation Partner:</span>
                      <p className="text-slate-800 italic mt-0.5 font-mono text-[11px]">"{log.promptUsed}"</p>
                    </div>

                    <div className="bg-red-50 p-2.5 rounded-lg border border-red-200 text-red-950">
                      <span className="text-[11px] font-bold text-red-700 block uppercase">
                        ⚠️ Critical Flaw / Hallucination Detected:
                      </span>
                      <p className="mt-0.5 leading-relaxed">{log.hallucinationOrFlawCaught}</p>
                    </div>

                    <div className="bg-emerald-50 p-2.5 rounded-lg border border-emerald-200 text-emerald-950">
                      <span className="text-[11px] font-bold text-emerald-800 block uppercase">
                        ✅ Engineering Guardrail & Final Implementation:
                      </span>
                      <p className="mt-0.5 leading-relaxed">{log.finalImplementationDetails}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Concepts Adopted vs Rejected Table */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
              Concepts Adopted vs. Concepts Rejected
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <span className="text-xs font-black text-emerald-800 flex items-center gap-1.5 uppercase tracking-wide">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Concepts Adopted
                </span>
                {CONCEPTS_ADOPTED_VS_REJECTED.filter(c => c.type === 'Adopted').map((c, i) => (
                  <div key={i} className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs space-y-1">
                    <span className="font-black text-slate-900 block">{c.conceptName}</span>
                    <p className="text-emerald-900">{c.rationale}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <span className="text-xs font-black text-red-800 flex items-center gap-1.5 uppercase tracking-wide">
                  <X className="w-4 h-4 text-red-600" />
                  Concepts Rejected
                </span>
                {CONCEPTS_ADOPTED_VS_REJECTED.filter(c => c.type === 'Rejected').map((c, i) => (
                  <div key={i} className="p-3 rounded-xl bg-red-50/60 border border-red-200 text-xs space-y-1">
                    <span className="font-black text-slate-900 block">{c.conceptName}</span>
                    <p className="text-red-900">{c.rationale}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 3: Early Prototype User Feedback & Field Trials */}
      {activeSubTab === 'validation' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-indigo-600" />
                  <span>Early Prototype User Feedback: 12 Tamil Nadu Farmer Field Trial</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Conducted across dryland and delta districts (Dharmapuri, Thanjavur, Tirupur, Namakkal) with smallholders using electric borewells.
                </p>
              </div>

              <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
                <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                <span className="text-xs font-black text-amber-900">4.9 / 5.0 Farmer Rating</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {EARLY_PROTOTYPE_USER_FEEDBACK.map((trial, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-black text-sm text-slate-900">{trial.farmerName} ({trial.farmerNameTa})</div>
                      <div className="text-xs text-slate-500">{trial.village}, {trial.district} • {trial.landHoldingAcres} Acres</div>
                      <div className="text-[11px] text-indigo-700 font-bold mt-0.5">{trial.primaryCrop} • {trial.irrigationSource}</div>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(trial.ratingScore)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  {/* Feedback quote */}
                  <div className="bg-white p-3 rounded-lg border border-slate-200 relative">
                    <Quote className="w-4 h-4 text-slate-300 absolute top-2 right-2" />
                    <p className="text-xs text-slate-800 italic leading-relaxed font-serif">
                      "{trial.feedbackQuoteEn}"
                    </p>
                    <p className="text-[11px] text-slate-600 font-serif mt-1 pt-1 border-t border-slate-100">
                      "{trial.feedbackQuoteTa}"
                    </p>
                  </div>

                  <div className="text-xs space-y-1 pt-1">
                    <p className="text-slate-600"><strong>Prior Issue:</strong> {trial.preInterventionIssue}</p>
                    <p className="text-emerald-700 font-bold"><strong>Measured Field Result:</strong> {trial.measuredOutcome}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Subtab 4: Phase 2 Pilot Plan & Institutional KPIs */}
      {activeSubTab === 'phase2' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-5">
            <div>
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
                <span>Phase 2 Institutional Validation Plan & Target KPIs</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Next-step longitudinal validation roadmap across a 100-farmer cohort during the 120-day Samba cropping season.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 space-y-1">
                <span className="text-[11px] uppercase font-bold text-indigo-700 block">Cohort Size:</span>
                <span className="text-sm font-black text-slate-900">{VALIDATION_PLAN_PHASE_2.cohortSize}</span>
              </div>

              <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 space-y-1">
                <span className="text-[11px] uppercase font-bold text-indigo-700 block">Trial Timeline:</span>
                <span className="text-sm font-black text-slate-900">{VALIDATION_PLAN_PHASE_2.testingTimeline}</span>
              </div>

              <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 space-y-1">
                <span className="text-[11px] uppercase font-bold text-indigo-700 block">Institutional Partners:</span>
                <ul className="text-xs text-slate-800 list-disc list-inside space-y-0.5 font-medium">
                  {VALIDATION_PLAN_PHASE_2.partnerOrganizations.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Target KPIs */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-3">
                Measurable Validation Metrics (KPIs)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {VALIDATION_PLAN_PHASE_2.primaryKeyPerformanceIndicators.map((kpi, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                    <span className="text-xs font-bold text-slate-800 block">{kpi.metric}</span>
                    <span className="text-xs font-black text-emerald-700 block">{kpi.target}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
