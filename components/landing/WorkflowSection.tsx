'use client';

import React, { useRef } from 'react';
import WorkflowStep, { type WorkflowStepData } from './WorkflowStep';
import ArtworkSlider from './ArtworkSlider';
import type { FrameSequenceHandle } from './FrameSequenceCanvas';
import { useWorkflowAnimation } from '@/hooks/useWorkflowAnimation';
import '@/styles/workflow.css';

/* ─── Step data ─────────────────────────────────────────────────────────── */
const STEPS: WorkflowStepData[] = [
  {
    number: '01',
    title: 'Describe your problem',
    description:
      'Tell us what’s broken, slow, or missing — no technical spec required. We dig into the real problem, uncovering hidden constraints, user needs, and business goals before any code is written.',
  },
  {
    number: '02',
    title: 'Build your system',
    description:
      'We transform your problem into a working system with a disciplined engineering process — clean architecture, thoroughly tested, and production-ready.',
  },
  {
    number: '03',
    title: 'Use your system',
    description:
      'Launch it and put it to work. We stand behind every release with proactive monitoring and continuous improvements as your needs grow.',
  },
];

/* ─── WorkflowSection ──────────────────────────────────────────────────── */

/**
 * Premium Apple / Linear-style horizontal storytelling section.
 *
 * Desktop: Pinned section, left panel sticks with step progress,
 *          right artwork track moves horizontally as user scrolls.
 *
 * Tablet / Mobile: Vertical stack with fade transitions, no pin.
 */
export default function WorkflowSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  // Slide indices with a scroll-scrubbed image-sequence canvas (3 steps,
  // Collaborate removed): 0 = Describe your problem, 1 = Build your
  // system, 2 = Use your system.
  const understandSeqRef = useRef<FrameSequenceHandle>(null);
  const executeSeqRef = useRef<FrameSequenceHandle>(null);
  const deliverSeqRef = useRef<FrameSequenceHandle>(null);

  useWorkflowAnimation({
    sectionRef,
    trackRef,
    overlayRef,
    stepCount: STEPS.length,
    onStepProgress: (stepIndex, progress) => {
      if (stepIndex === 0) understandSeqRef.current?.setProgress(progress);
      if (stepIndex === 1) executeSeqRef.current?.setProgress(progress);
      if (stepIndex === 2) deliverSeqRef.current?.setProgress(progress);
    },
  });

  const stepTitles = STEPS.map((s) => s.title);

  return (
    <section
      id="workflow"
      ref={sectionRef}
      className="workflow-section"
      aria-label="Our Workflow"
    >
      {/* ── Entry fade overlay: matches Solutions' white bg, fades out once
             the section first scrolls into view — masks the pin-spacer
             blank gap without animating the section itself ── */}
      <div ref={overlayRef} className="workflow-entry-overlay" aria-hidden="true" />

      {/* ── Ambient radial gradient blobs ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '40%',
          height: '50%',
          background:
            'radial-gradient(ellipse at 30% 30%, rgba(37,99,235,0.06) 0%, transparent 60%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '35%',
          height: '45%',
          background:
            'radial-gradient(ellipse at 70% 70%, rgba(59,130,246,0.05) 0%, transparent 60%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* ── Two-column grid ── */}
      <div className="workflow-inner">
        {/* Mobile-only label — shown above the artwork (hidden on desktop) */}
        <span className="workflow-label workflow-label--mobile" aria-hidden="true">
          How we work
        </span>

        {/* ── LEFT: sticky step navigator ── */}
        <div className="workflow-left" aria-label="Workflow steps">
          <span className="workflow-label workflow-label--desktop">How we work</span>

          <div className="workflow-steps" role="list">
            {STEPS.map((step, i) => (
              <WorkflowStep key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>

        {/* ── RIGHT: artwork slider ── */}
        <div className="workflow-right" aria-label="Workflow artwork">
          <ArtworkSlider
            ref={trackRef}
            stepTitles={stepTitles}
            sequenceRefs={{ 0: understandSeqRef, 1: executeSeqRef, 2: deliverSeqRef }}
          />
        </div>
      </div>
    </section>
  );
}
