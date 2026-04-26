# SolarSense Analytics Proposal

## Overview
SolarSense Analytics is a diagnostic platform for small solar cooperatives and other operators who only have access to daily production totals rather than hourly telemetry. The goal is to turn spreadsheet-based reporting into a repeatable workflow that estimates expected yield, detects sustained underperformance, and produces practical health reports for follow-up.

This proposal is based on the constraints captured in `spec.md`:

- data arrives in batches rather than as real-time streams
- multiple arrays or roofs need to be analyzed in parallel
- nearby arrays often share similar weather context
- uploads may contain daily output, cloud attenuation, and solar strength data
- hourly data is unavailable, so the product must focus on daily statistical diagnostics

## Problem Statement
Small cooperatives often manage solar assets with ad hoc spreadsheets. That creates several issues:

- operational data is cumbersome to consolidate across multiple arrays
- it is hard to separate weather effects from actual equipment faults
- daily totals are too coarse for traditional inverter-style monitoring tools
- long-term degradation trends are easy to miss until losses become material

The platform addresses that gap by creating a modeled baseline for expected output and comparing actual generation against that baseline over time.

## Core Workflow
The proposed system has three main stages:

1. Ingest daily batch data from spreadsheet uploads or later API integrations.
2. Estimate expected output using clear-sky radiation, satellite-informed weather context, and array configuration.
3. Run deviation analysis to classify likely fault conditions and produce a health report.

## Inputs

### Required data
- daily output per array or meter
- site and array metadata such as tilt, angle, capacity, and location

### Optional or derived data
- solar strength data from uploads
- cloud attenuation values
- external radiation or satellite context
- historical performance baselines from prior uploads

## Processing Logic

### 1. Data normalization
Incoming spreadsheet data is standardized into comparable daily time series. Because arrays are analyzed in parallel, the ingestion layer should keep array identity, site grouping, and date alignment intact.

### 2. Expected-output model
The first model estimates what each array should have produced on each day:

- start from a clear-sky radiation baseline for the site and day of year
- adjust for observed or inferred weather attenuation
- factor in array geometry and hardware characteristics
- optionally simulate longer historical distributions using multi-year climate data

This creates an expected daily yield curve even when hourly measurements do not exist.

### 3. Fault and degradation detection
The second model compares actual output against expected output and looks for patterns such as:

- sudden persistent drops that may indicate string failure
- site-specific underperformance compared with peer arrays in similar weather
- slow downward trends consistent with degradation or fouling
- anomalies that merit validation but remain below a high-confidence threshold

Outputs should be probabilistic rather than absolute.

## Expected Outputs
The user-facing system should produce alerts and reports such as:

- likely fault type
- affected array or string
- date or date range when the issue emerged
- confidence score
- summary of observed deviation
- guidance that manual technical inspection is required before any physical intervention

Example output:

> Fault type `string underperformance` detected on `Array 4 / String B` from `2026-04-17` with confidence `0.88`.

## Interface Proposal

### Cooperative dashboard
This interface is designed for non-technical stakeholders.

- site overview with health states across arrays
- upload center for monthly `.xlsx` files
- degradation summaries over long time periods
- plain-language alerts and recommended follow-up actions

### Model workbench
This interface is designed for analysts and developers.

- editable array and inverter assumptions
- tuning controls for cloud attenuation and statistical thresholds
- expected-versus-actual comparison views
- validation tooling to compare model outputs with recorded feedback

## Product Boundaries

### What this product is good at
- sustained fault detection using daily aggregate data
- comparative analysis across arrays with similar environmental context
- long-term health monitoring and degradation reporting
- replacing spreadsheet-heavy manual review with a structured workflow

### What this product is not proving directly
- minute-by-minute behavior
- transient shading events with high precision
- definitive physical root cause without inspection

That distinction should remain visible throughout the product and documentation.

## Safety and Trust
All detections should be framed as analytical estimates, not definitive proof. The documentation and UI should explicitly state that:

- outputs are based on modeled expectations and statistical comparison
- false positives and ambiguous cases are possible, especially with coarse daily data
- on-site technical inspection is required before hardware changes or disconnections

## Delivery Artifacts
This mockup package includes:

- a static JavaScript website in `index.html`, `styles.css`, and `app.js`
- Mermaid source diagrams in `docs/diagrams`
- rendered PNG diagram assets in `docs/diagrams/rendered`

## Suggested MVP Scope

### Phase 1
- spreadsheet upload flow
- daily data normalization
- baseline expected-output model
- simple alert and reporting UI

### Phase 2
- direct API ingestion from metering systems
- better validation workflows
- richer fault taxonomy

### Phase 3
- predictive modeling for degradation versus weather separation
- confidence calibration from growing historical datasets
