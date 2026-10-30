'use client';

import React from 'react';

export interface WorkflowStepData {
  number: string;
  title: string;
  description: string;
}

interface WorkflowStepProps {
  step: WorkflowStepData;
  index: number;
}

/**
 * A single step row in the left sticky panel.
 * GSAP handles all opacity / scale transitions via refs in the parent.
 */
export default function WorkflowStep({ step, index }: WorkflowStepProps) {
  return (
    <div
      className="workflow-step"
      data-step={index}
      aria-current={index === 0 ? 'step' : undefined}
    >
      {/* ── Spine: dot + connector line — rendered for every step, including
             the last, so the line fills all the way through on scroll
             completion instead of stopping one dot short. ── */}
      <div className="step-spine">
        <div className={`step-dot ${index === 0 ? 'active' : ''}`} data-dot={index} />
        <div className="step-connector" data-connector={index}>
          <div className="step-connector-fill" data-fill={index} />
        </div>
      </div>

      {/* ── Text content ── */}
      <div className="step-content">
        <div className="step-number" data-step-number={index}>
          {step.number}
        </div>
        <h3 className="step-title" data-step-title={index}>
          {step.title}
        </h3>
        <p className="step-description" data-step-desc={index}>
          {step.description}
        </p>
      </div>
    </div>
  );
}
