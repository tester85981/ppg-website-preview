# PPG Financial Model book

November 23, 2026. Internal planning only. Nothing here is copy for a prospect.

## Purpose and operating boundary

This is PPG's central revenue planning model: a deal engine, the live deal book, a probability-weighted portfolio, a structure library, an origination funnel and the market facts that bound them. It estimates fees on incremental contribution. It does not report signed revenue, accounting profit, collected cash or a valuation of the firm.

No mandate is signed in the dated snapshot. No fee terms are agreed. The actual Straub splits, current Garage volume, company prices, contribution margins and independently achievable outcomes remain unknown. Every fee depends on a baseline agreed in writing, measurable contribution and compliant execution.

App source: /home/hatch/workspace/ppg-financial-model/
Intended published URL: https://tester85981.github.io/ppg-website-preview/ppg-model/
Publication status and tested build evidence belong in BUILD-REPORT.md, not in this assumptions record.

## How Ryan uses it

1. Start with Deal engine. Select a live company and a scenario. Replace the channel split first, then volume, price and margin as client records arrive. Input edits commit on blur or Enter; sliders update immediately. Invalid values revert to the last valid value. Integer partner counts and quarter lag normalize down to whole numbers.
2. Inspect the chain, persistence and sensitivity grid. Scenario tiles remain the original reference triplet even while the working case changes. Garage also retains the original 30% base as an explicitly superseded comparison alongside its revised central case.
3. Open Live deal book. Set mutually exclusive Garage branch probabilities and a mandate probability. Branch probabilities must sum to 100%; an invalid sum pauses Garage and portfolio expected values. Change bundle partners without adding a standalone deal twice.
4. Open Portfolio. Left Coast probabilities are independent planning placeholders; Garage pulls from its tree. Add only genuinely separate planning opportunities. The path-to-$1M calculator is separate from the live book. Set the fee mix, paid-outcome rate, signing pace and conversion rate deliberately.
5. Use Structures to evaluate alternative agreements. Each is an independent sandbox; it does not silently update the portfolio. Choose 1 structure or separate scopes before treating its value as additive.
6. Use Funnel for new-contact cohorts through 2027. Edit all 5 stage rates in each low, central and high case. Set earning lag; compare signed mandates with fees earned. Existing opportunities are excluded.
7. Check Market context and counsel gates before treating a modeled opportunity as executable. Download this book and export a dated JSON assumptions snapshot before a decision. Changes are saved only in the current browser; clearing browser data removes them. JSON export is an audit copy, not an import workflow. Reset all explicitly restores defaults after confirmation.

## Labels and precision

Sourced: the named public source or PPG record states the item. A Sourced historical number is not a guarantee of its current value. Estimate: a reasoned planning figure with its basis stated. Hypothesis: an unconfirmed assumption about terms, attribution, probability, future volume or execution. Outputs inherit the weakest input label, ordered Sourced, Estimate, Hypothesis. User edits to sourced or estimated figures become Hypothesis. All forward revenue outputs in this book are Hypothesis.

The engine uses full precision and rounds only displayed dollar amounts. Garage central year 1 is exactly $13,900.64 before display rounding; the 3-year total is $33,361.536. Thus the required displayed results are $13,901 and $33,362. Do not multiply rounded intermediate barrels or fees and expect identical totals.

## Layer 1: the deal engine

The universal fee definition is:

PPG fee = PPG share × max(0, realized contribution with PPG − agreed baseline contribution without PPG).

The planning proxy is:

- At-risk units = volume × channel share.
- At-risk revenue = at-risk units × revenue per unit.
- At-risk contribution = at-risk revenue × contribution margin.
- Incremental contribution = max(0, at-risk contribution × share preserved or created).
- Year 1 fee = incremental contribution × PPG share.
- Year 2 fee = year 1 fee × year 2 persistence.
- Year 3 fee = year 1 fee × year 3 persistence.
- 3-year total = year 1 fee × (1 + year 2 persistence + year 3 persistence).

Default persistence is 80% and 60% (Hypothesis), a 2.4 multiplier. This is not a contracted term. The preserved share represents only the difference from the client's own alternative, not the entire revenue retained. A real measurement must replace that proxy with collected, attributable contribution and the agreed counterfactual.

The sensitivity grid substitutes channel shares of 10%, 15%, 20%, 30%, 40% and 50%, and PPG shares of 20%, 25% and 30%, keeping all other working inputs unchanged. Grid coordinates are Hypothesis planning probes. Multiplicative inputs scale the fee proportionately; persistence affects only later years.

## Layer 2: live deals and complete input register

The table values below are the default assumptions, not the current browser's saved edits.

### Left Coast Brewing

Tommy Hadjis. Conversation held. No mandate signed, no terms agreed, Straub volume not yet known.

| Input | Conservative | Base | Upside | Label | Named source or reasoning |
| --- | --- | --- | --- | --- | --- |
| Annual volume | 10,000 barrels | 10,000 barrels | 10,000 barrels | Sourced | Public sources put Left Coast at roughly 10,000 barrels a year, as carried in the Left Coast deal projection workbook (tommy-deal-projection-2026-11-21.xlsx). |
| Share of volume through Straub (at risk) | 15% | 30% | 45% | Estimate | Straub is Left Coast’s Orange County route; the split is unknown until Tommy confirms it. The single biggest unknown. |
| Wholesale revenue per barrel | $230 | $260 | $290 | Estimate | Typical craft wholesale value per barrel equivalent. Not company-specific; the real keg, can and bottle mix is not public. |
| Contribution margin | 25% | 32% | 40% | Estimate | Brewery contribution margin after production and delivery costs. A craft-industry estimate, not the company’s books. |
| Share of at-risk profit preserved or created | 30% | 50% | 70% | Hypothesis | The slice of at-risk profit that would be lost without PPG and is kept or created with it. This is realized contribution with PPG minus the agreed baseline without PPG. Only a measured baseline can settle it. |
| PPG share of the increment | 20% | 25% | 30% | Hypothesis | The 20% to 30% band in the pilot design (Left Coast pilot decision packet, November 21, 2026). Not agreed pricing; 25% is the point Ryan is ready to agree in writing against a measured baseline. |
| Persistence, year 2 | 80% | 80% | 80% | Hypothesis | If the pilot term runs 3 years, the increment persists at 80% in year 2. |
| Persistence, year 3 | 60% | 60% | 60% | Hypothesis | And at 60% in year 3. Together: every 3-year total is 2.4 times its year 1 fee at the defaults. |

| Scenario | Year 1 | Year 2 | Year 3 | Total 3 years | Label |
| --- | --- | --- | --- | --- | --- |
| Conservative | $5,175 | $4,140 | $3,105 | $12,420 | Hypothesis |
| Base | $31,200 | $24,960 | $18,720 | $74,880 | Hypothesis |
| Upside | $109,620 | $87,696 | $65,772 | $263,088 | Hypothesis |

### Garage Brewing

Lou Kashmere. Lou replied by phone November 23, 2026; callback owed. No mandate, no terms, books never seen.

| Input | Conservative | Revised central | Original base | Upside | Label | Named source or reasoning |
| --- | --- | --- | --- | --- | --- | --- |
| Annual volume | 6,683 barrels | 6,683 barrels | 6,683 barrels | 6,683 barrels | Sourced | Brewers Association production survey via Brewbound, June 5, 2023: 6,683 barrels in 2022, No. 1 brewpub in the Pacific Region. No newer figure was identified in the verification sweep, November 23, 2026. |
| Share of volume through Straub (at risk) | 15% | 20% | 30% | 45% | Estimate | Revised planning range 15% to 20%, central case 20% (deal thesis, November 23, 2026): the Brewers Association brewpub classification implies at least 25% sold on site, and Lou’s taproom weight and self-distribution history argue for the low end. |
| Wholesale revenue per barrel | $230 | $260 | $260 | $290 | Estimate | Typical craft wholesale value per barrel equivalent. Not company-specific; the real keg, can and bottle mix is not public. |
| Contribution margin | 25% | 32% | 32% | 40% | Estimate | Brewery contribution margin after production and delivery costs. A craft-industry estimate, not the company’s books. |
| Share of at-risk profit preserved or created | 30% | 50% | 50% | 70% | Hypothesis | The slice of at-risk profit that would be lost without PPG and is kept or created with it. This is realized contribution with PPG minus the agreed baseline without PPG. Only a measured baseline can settle it. |
| PPG share of the increment | 20% | 25% | 25% | 30% | Hypothesis | The 20% to 30% band in the pilot design (Left Coast pilot decision packet, November 21, 2026). Not agreed pricing; 25% is the point Ryan is ready to agree in writing against a measured baseline. |
| Persistence, year 2 | 80% | 80% | 80% | 80% | Hypothesis | If the pilot term runs 3 years, the increment persists at 80% in year 2. |
| Persistence, year 3 | 60% | 60% | 60% | 60% | Hypothesis | And at 60% in year 3. Together: every 3-year total is 2.4 times its year 1 fee at the defaults. |

| Scenario | Year 1 | Year 2 | Year 3 | Total 3 years | Label |
| --- | --- | --- | --- | --- | --- |
| Conservative | $3,458 | $2,767 | $2,075 | $8,300 | Hypothesis |
| Revised central | $13,901 | $11,121 | $8,340 | $33,362 | Hypothesis |
| Original base | $20,851 | $16,681 | $12,511 | $50,042 | Hypothesis |
| Upside | $73,259 | $58,607 | $43,955 | $175,822 | Hypothesis |

### Garage expected value

Source: thesis-synthesis.md, section 5. All probabilities and conditional fees: Hypothesis. Success is conditional on a signed mandate and that branch. The branches are exclusive alternatives, not independent events.

| Branch | Probability | Success given mandate | Fee if successful | Weighted contribution |
| --- | --- | --- | --- | --- |
| A: AB One selects Garage and Lou consents | 45% | 50% | $3,000 | $675 |
| B: not selected, or terms Lou rejects; standalone placement | 40% | 60% | $13,901 | $3,336 |
| C: not selected; placement runs as a portfolio bundle | 15% | 45% | $34,701 | $2,342 |

Mandate probability: 40% (Hypothesis). Subtotal conditional on mandate: $6,353.4468. Multiply by 40% to obtain $2,541.37872 expected year 1, displayed $2,541. Apply 2.4 to obtain $6,099.308928 over 3 years, displayed $6,099.

Probability of a positive fee = mandate probability × sum(branch probability × branch success probability for branches with positive conditional fees). At defaults: 0.40 × (0.45 × 0.50 + 0.40 × 0.60 + 0.15 × 0.45) = 0.213. Probability of $0 = 1 − 0.213 = 78.7%. A successful branch with a $0 fee is still a $0 outcome.

Branch A conditional fee is $3,000 (Hypothesis). Branch B is linked to Garage's current standalone engine fee. Branch C is linked to the current bundle. The thesis's 3-year tree applies persistence to Branch A too; recurrence is uncontracted. Do not apply that treatment to an explicitly 1-time allowance. The consent mini-model below does not recur its cash.

### Bundle discrepancy

Anchor volume = 6,683 × 20% = 1,336.6 barrels. Additional partners default to 2, each with 1,000 barrels at risk (Hypothesis; partner sizes unknown). Fee per barrel = $260 × 32% × 50% × 25% = $10.40 (Hypothesis).

- 2 partners: (1,336.6 + 2 × 1,000) × $10.40 = $34,700.64 year 1; $83,281.536 over 3 years. Display: $34,701 / $83,282.
- 3 partners: (1,336.6 + 3 × 1,000) × $10.40 = $45,100.64 year 1; $108,241.536 over 3 years. Display: $45,101 / $108,242.

The thesis synthesis and published Lou report state $44,101 / $105,842 for 3 partners. Those are sourced quotations of the record, not the adopted calculated result. The record also calls Garage plus 2 partners 4,337 barrels; the correct rounded total is 3,337. The app displays the computed amounts and keeps the discrepancy visible. No source file was changed.

## Layer 3: portfolio and path to $1M

Live portfolio expected year 1 = sum of each deal's probability-weighted fee. Left Coast uses fee × mandate probability × success given mandate. Defaults are 40% and 60% (Hypothesis placeholders), producing $7,488 expected year 1 and $17,971.20 over 3 years. Garage contributes its branch-tree expected values, not a second standalone fee. Default live portfolio: $10,029.37872 year 1 and $24,070.508928 over 3 years, displayed $10,029 and $24,071 (Hypothesis).

Added planning opportunities default to $20,000 fee if paid, 40% mandate probability, 50% success given mandate, 80% and 60% persistence. All are Hypothesis placeholders. Default added-row EV is $4,000 / $9,600. Names are user-entered labels, not claims that a real mandate exists.

Expected values may be summed without independence. The app does not report a portfolio probability of $0 because both live deals share Straub exposure. The pure portfolioEV helper returns a product-based all-zero probability for independent test cases only; that independence assumption is not asserted for the live book.

Path assumptions (all Hypothesis):

| Parameter | Default | Reasoning |
| --- | --- | --- |
| target | 1000000 | Editable planning target, persistence, pace or conversion assumption |
| avgFee1 | 22551 | Rounded midpoint of $31,200 and $13,900.64; an illustrative mix |
| paidRate | 0.5325 | Garage conditional paid-outcome probability before mandate gate; borrowed as a portfolio illustration, not observed |
| y2 | 0.8 | Editable planning target, persistence, pace or conversion assumption |
| y3 | 0.6 | Editable planning target, persistence, pace or conversion assumption |
| dealsPerYear | 5 | Editable planning target, persistence, pace or conversion assumption |
| funnelRate | 0.01 | Editable planning target, persistence, pace or conversion assumption |

Path formulas:

- Conditional 3-year value = average year 1 fee × (1 + year 2 persistence + year 3 persistence).
- Weighted value per signed mandate = conditional value × paid-outcome probability given signature. Do not apply the mandate probability again after counting signed mandates.
- Mandates if all pay = ceiling(target / conditional value).
- Expected-value mandates required = ceiling(target / weighted value).
- Signing years = required mandates / signed mandates per year.
- First touches required = ceiling(required mandates / touch-to-signature rate).

At zero fee or zero paid-outcome rate, the weighted target is unreachable. At zero signing pace or conversion, the corresponding time or touch requirement has no finite answer. The target is expected cumulative revenue, not a success guarantee. Signing years exclude launch and payment delays; the last cohort needs its full operating term after launch.

3 hand spot checks, all Hypothesis:

1. $22,551 × 2.4 = $54,122.40. $1,000,000 / $54,122.40 = 18.4766, so 19 if all pay. × 53.25% gives $28,820.178; $1,000,000 / $28,820.178 = 34.6979, so 35 signed mandates. At 5 per year: 7 signing years. At 1% touch-to-signature: 3,500 touches.
2. $31,200 × 2.4 = $74,880. At 100% paid: $1,000,000 / $74,880 = 13.3547, so 14 signed mandates.
3. $13,901 × 2.4 = $33,362.40. × 53.25% gives $17,765.478; $1,000,000 / $17,765.478 = 56.2889, so 57 signed mandates. Without payment weighting: 29.974, so 30. This illustration deliberately uses the editable rounded fee $13,901; the live engine retains $13,900.64.

## Layer 4: structure library and full parameter register

Framework: Jay Abraham, Partner or Perish. Principle names and slide references are Sourced. Their application to Garage and all structure outputs are Hypothesis. Structure calculations are independent sandboxes. A structure is not automatically another paying deal. Placement and Prepared Garage illustrate the same successful placement; the bundle contains the anchor. Consent's cash is 1-time. Never add these alternative forms together.

### Prepared Garage

Principle: Power Parthenon Strategy, slide 37 to 41 (Sourced).

Build the bench before selection. Place if needed; earn nothing on an unchanged AB One offer. Values below are the successful placement branch, not an additional deal.

Formula: Placement engine; standby has no separate guaranteed fee.

What must be true: Written baseline, a viable channel share and at least 3 willing wholesalers. Counsel clears the mandate and the 24-month standby clause.

Default output: $13,901 year 1; $33,362 over 3 years (Hypothesis).

| Input | Default | Label | Source or basis |
| --- | --- | --- | --- |
| Annual volume | 6,683 barrels | Sourced | Brewers Association production survey via Brewbound, June 5, 2023: 6,683 barrels in 2022, No. 1 brewpub in the Pacific Region. No newer figure was identified in the verification sweep, November 23, 2026. |
| Share of volume through Straub (at risk) | 20% | Estimate | Revised planning range 15% to 20%, central case 20% (deal thesis, November 23, 2026): the Brewers Association brewpub classification implies at least 25% sold on site, and Lou’s taproom weight and self-distribution history argue for the low end. |
| Wholesale revenue per barrel | $260 | Estimate | Typical craft wholesale value per barrel equivalent. Not company-specific; the real keg, can and bottle mix is not public. |
| Contribution margin | 32% | Estimate | Brewery contribution margin after production and delivery costs. A craft-industry estimate, not the company’s books. |
| Share of at-risk profit preserved or created | 50% | Hypothesis | The slice of at-risk profit that would be lost without PPG and is kept or created with it. This is realized contribution with PPG minus the agreed baseline without PPG. Only a measured baseline can settle it. |
| PPG share of the increment | 25% | Hypothesis | The 20% to 30% band in the pilot design (Left Coast pilot decision packet, November 21, 2026). Not agreed pricing; 25% is the point Ryan is ready to agree in writing against a measured baseline. |
| Persistence, year 2 | 80% | Hypothesis | If the pilot term runs 3 years, the increment persists at 80% in year 2. |
| Persistence, year 3 | 60% | Hypothesis | And at 60% in year 3. Together: every 3-year total is 2.4 times its year 1 fee at the defaults. |

### Competitive placement

Principle: Acquire Distribution Networks, slide 19 (Sourced).

Protect or create contribution above the client’s own alternative.

Formula: Volume × channel share × price × margin × incremental share × PPG share.

What must be true: A signed mandate, lawful placement rights and an independent wholesaler offering a measured improvement.

Default output: $13,901 year 1; $33,362 over 3 years (Hypothesis).

| Input | Default | Label | Source or basis |
| --- | --- | --- | --- |
| Annual volume | 6,683 barrels | Sourced | Brewers Association production survey via Brewbound, June 5, 2023: 6,683 barrels in 2022, No. 1 brewpub in the Pacific Region. No newer figure was identified in the verification sweep, November 23, 2026. |
| Share of volume through Straub (at risk) | 20% | Estimate | Revised planning range 15% to 20%, central case 20% (deal thesis, November 23, 2026): the Brewers Association brewpub classification implies at least 25% sold on site, and Lou’s taproom weight and self-distribution history argue for the low end. |
| Wholesale revenue per barrel | $260 | Estimate | Typical craft wholesale value per barrel equivalent. Not company-specific; the real keg, can and bottle mix is not public. |
| Contribution margin | 32% | Estimate | Brewery contribution margin after production and delivery costs. A craft-industry estimate, not the company’s books. |
| Share of at-risk profit preserved or created | 50% | Hypothesis | The slice of at-risk profit that would be lost without PPG and is kept or created with it. This is realized contribution with PPG minus the agreed baseline without PPG. Only a measured baseline can settle it. |
| PPG share of the increment | 25% | Hypothesis | The 20% to 30% band in the pilot design (Left Coast pilot decision packet, November 21, 2026). Not agreed pricing; 25% is the point Ryan is ready to agree in writing against a measured baseline. |
| Persistence, year 2 | 80% | Hypothesis | If the pilot term runs 3 years, the increment persists at 80% in year 2. |
| Persistence, year 3 | 60% | Hypothesis | And at 60% in year 3. Together: every 3-year total is 2.4 times its year 1 fee at the defaults. |

### Orphan portfolio bundle / syndicate

Principle: Competitor Partnerships, slide 35 (Sourced).

Combine route volume without combining competitors’ pricing or customer information.

Formula: (Anchor barrels + partners × partner barrels) × price × margin × incremental share × PPG share.

What must be true: At least 2 willing independent partners; separate mandates and baselines; counsel supervises information sharing. Garage never depends on the bundle.

Default output: $34,701 year 1; $83,282 over 3 years (Hypothesis).

| Input | Default | Label | Source or basis |
| --- | --- | --- | --- |
| Garage barrels at risk | 1,336.6 barrels | Hypothesis | Planning illustration from the Garage thesis synthesis, section 6; no agreed terms. |
| Additional partners | 2 | Hypothesis | Planning illustration from the Garage thesis synthesis, section 6; no agreed terms. |
| Barrels per partner | 1,000 barrels | Hypothesis | Planning illustration from the Garage thesis synthesis, section 6; no agreed terms. |
| Revenue per barrel | $260 | Hypothesis | Planning illustration from the Garage thesis synthesis, section 6; no agreed terms. |
| Contribution margin | 32% | Hypothesis | Planning illustration from the Garage thesis synthesis, section 6; no agreed terms. |
| Incremental share | 50% | Hypothesis | Planning illustration from the Garage thesis synthesis, section 6; no agreed terms. |
| PPG share | 25% | Hypothesis | Planning illustration from the Garage thesis synthesis, section 6; no agreed terms. |
| Year 2 persistence | 80% | Hypothesis | Planning illustration from the Garage thesis synthesis, section 6; no agreed terms. |
| Year 3 persistence | 60% | Hypothesis | Planning illustration from the Garage thesis synthesis, section 6; no agreed terms. |

### Consent-for-value review

Principle: Core Competency Consulting, slide 22 (Sourced).

Measure improvement over the first written offer. The illustration is 1-time value, not recurring revenue.

Formula: max(0, measured improvement) × PPG share; 3-year total equals year 1.

What must be true: Counsel reviews the existing agreement and section 25000.9. No withholding or delaying consent for leverage.

Default output: $4,500 year 1; $4,500 over 3 years (Hypothesis).

| Input | Default | Label | Source or basis |
| --- | --- | --- | --- |
| Measured 1-time improvement | $18,000 | Hypothesis | Planning illustration from the Garage thesis synthesis, section 6; no agreed terms. |
| PPG share | 25% | Hypothesis | Planning illustration from the Garage thesis synthesis, section 6; no agreed terms. |

### Host-beneficiary programme

Principle: Host - Beneficiary, slide 15 (Sourced).

Help licensed venues serve local beer. Contribution per barrel includes the delivery spread after costs.

Formula: Hosts × barrels per week × active weeks × contribution per barrel × PPG share.

What must be true: Suitably licensed hosts, lawful co-marketing approved by counsel, delivery capacity and genuinely new accounts.

Default output: $7,700 year 1; $18,480 over 3 years (Hypothesis).

| Input | Default | Label | Source or basis |
| --- | --- | --- | --- |
| Licensed hosts | 20 | Hypothesis | Planning illustration from the Garage thesis synthesis, section 6; no agreed terms. |
| Barrels per host per week | 0.25 barrels | Hypothesis | Planning illustration from the Garage thesis synthesis, section 6; no agreed terms. |
| Active weeks | 50 | Hypothesis | Planning illustration from the Garage thesis synthesis, section 6; no agreed terms. |
| Incremental contribution per barrel | $123.2 | Hypothesis | Planning illustration from the Garage thesis synthesis, section 6; no agreed terms. |
| PPG share | 25% | Hypothesis | Planning illustration from the Garage thesis synthesis, section 6; no agreed terms. |
| Year 2 persistence | 80% | Hypothesis | Planning illustration from the Garage thesis synthesis, section 6; no agreed terms. |
| Year 3 persistence | 60% | Hypothesis | Planning illustration from the Garage thesis synthesis, section 6; no agreed terms. |

### Capacity / contract-brewing reclamation

Principle: Reclamation, slide 23 (Sourced).

Use verified idle capacity to supply another brand’s demand.

Formula: max(0, barrels × contribution per barrel − setup costs) × PPG share in year 1; setup is not repeated.

What must be true: Verified fermenter and cellar headroom, at least 3 buyers and incremental costs fully counted. Brewhouse size does not prove spare capacity.

Default output: $12,000 year 1; $28,800 over 3 years (Hypothesis).

| Input | Default | Label | Source or basis |
| --- | --- | --- | --- |
| Contract barrels | 600 barrels | Hypothesis | Planning illustration from the Garage thesis synthesis, section 6; no agreed terms. |
| Contribution per barrel | $80 | Hypothesis | Planning illustration from the Garage thesis synthesis, section 6; no agreed terms. |
| 1-time setup costs | $0 | Hypothesis | Planning illustration from the Garage thesis synthesis, section 6; no agreed terms. |
| PPG share | 25% | Hypothesis | Planning illustration from the Garage thesis synthesis, section 6; no agreed terms. |
| Year 2 persistence | 80% | Hypothesis | Planning illustration from the Garage thesis synthesis, section 6; no agreed terms. |
| Year 3 persistence | 60% | Hypothesis | Planning illustration from the Garage thesis synthesis, section 6; no agreed terms. |

### Route-sharing joint venture

Principle: Joint Ventures / Co-branding, slide 13 (Sourced).

Share route economics with a qualified operator. Held in reserve, with no verified current arrangement.

Formula: max(0, incremental route contribution) × PPG share.

What must be true: Current Las Vegas route verified, compatible operators and California / Nevada counsel approval.

Default output: $15,000 year 1; $36,000 over 3 years (Hypothesis).

| Input | Default | Label | Source or basis |
| --- | --- | --- | --- |
| Incremental route contribution | $60,000 | Hypothesis | Planning illustration from the Garage thesis synthesis, section 6; no agreed terms. |
| PPG share | 25% | Hypothesis | Planning illustration from the Garage thesis synthesis, section 6; no agreed terms. |
| Year 2 persistence | 80% | Hypothesis | Planning illustration from the Garage thesis synthesis, section 6; no agreed terms. |
| Year 3 persistence | 60% | Hypothesis | Planning illustration from the Garage thesis synthesis, section 6; no agreed terms. |

### Garage-as-distributor

Principle: New Products/Markets, slide 24 (Sourced).

Distribute partner brands. Capital requirements and operating capacity are unknown.

Formula: Partner barrels × net contribution per barrel × PPG share.

What must be true: Wholesaler license, trucks, cold storage, working capital and willing partner brands. Lowest feasibility; a business build after the transition.

Default output: $10,000 year 1; $24,000 over 3 years (Hypothesis).

| Input | Default | Label | Source or basis |
| --- | --- | --- | --- |
| Partner barrels | 1,000 barrels | Hypothesis | Planning illustration from the Garage thesis synthesis, section 6; no agreed terms. |
| Net contribution per barrel | $40 | Hypothesis | Planning illustration from the Garage thesis synthesis, section 6; no agreed terms. |
| PPG share | 25% | Hypothesis | Planning illustration from the Garage thesis synthesis, section 6; no agreed terms. |
| Year 2 persistence | 80% | Hypothesis | Planning illustration from the Garage thesis synthesis, section 6; no agreed terms. |
| Year 3 persistence | 60% | Hypothesis | Planning illustration from the Garage thesis synthesis, section 6; no agreed terms. |

For capacity: year 1 = max(0, barrels × contribution per barrel − setup) × PPG share. Later years = barrels × contribution × PPG share × their persistence. Setup is charged only in year 1. No loss carryforward is modeled. For consent, 3-year total equals year 1. Other recurring structures use year 1 × (1 + year 2 persistence + year 3 persistence). Host contribution per barrel is $30,800 / 250 = $123.20, an inclusive-delivery contribution hypothesis. Consent's $18,000 is a back-solved illustration of the thesis's $4,500 upper fee, not a measured improvement. Route-sharing's $60,000 likewise supports the thesis's $15,000 illustration, not verified route profit.

## Layer 5: funnel register and quarterly timing

Historical snapshot (Sourced: PPG record book as carried in the settled November 23 brief):

| Stage | Count |
| --- | --- |
| Screened | 140 |
| Verified | 7 |
| Sent | 10 |
| Replies | 2 |
| Conversations | 2 |
| Booked | 0 |
| Qualified | 0 |
| Signed | 0 |

These are cumulative operational counts, not a single cohort. Do not infer stage conversion rates from these mismatched denominators. The earlier KPI packet contains older counts; the settled brief's dated snapshot controls this build.

Approved cadence (Sourced: settled brief): 15 verified contacts per week; 12 to 15 first touches per week; LinkedIn live December 1, 2026. The model uses the midpoint 13.5 touches and assumes continuation through 2027 (Hypothesis). It does not add a separate LinkedIn volume stream.

Every forward conversion is an editable Hypothesis:

| Case | Reply | Conversation | Booked | Qualified | Signed |
| --- | --- | --- | --- | --- | --- |
| low | 3% | 50% | 50% | 50% | 25% |
| central | 8% | 60% | 60% | 60% | 35% |
| high | 15% | 70% | 70% | 70% | 45% |

| Cadence / economics input | Default | Label / basis |
| --- | --- | --- |
| verifiedPerWeek | 15 | Hypothesis; forward continuation, timing or economics assumption. Approved baseline cadence named above. |
| touchesPerWeek | 13.5 | Hypothesis; forward continuation, timing or economics assumption. Approved baseline cadence named above. |
| avgFee1 | 22551 | Hypothesis; forward continuation, timing or economics assumption. Approved baseline cadence named above. |
| paidRate | 0.5325 | Hypothesis; forward continuation, timing or economics assumption. Approved baseline cadence named above. |
| lagQuarters | 1 | Hypothesis; forward continuation, timing or economics assumption. Approved baseline cadence named above. |
| y2 | 0.8 | Hypothesis; forward continuation, timing or economics assumption. Approved baseline cadence named above. |
| y3 | 0.6 | Hypothesis; forward continuation, timing or economics assumption. Approved baseline cadence named above. |

Quarter weeks: December 2026 = 31 / 7; Q1 2027 = 90 / 7; Q2 = 91 / 7; Q3 and Q4 = 92 / 7 (calendar arithmetic; Sourced calendar dates).

- First touches = min(verified per week, touches per week) × quarter weeks.
- Full conversion = reply × conversation × booked × qualified × signed rates.
- Expected signatures = first touches × full conversion. Fractional signatures express an average, not partial agreements.
- Expected annual value of a signed cohort = expected signatures × average fee if paid × paid-outcome probability.
- A cohort first earns after lagQuarters (default 1). For quarter age 0 to 3 after lag, allocate annual expected value / 4 per quarter; ages 4 to 7 multiply by year 2 persistence; ages 8 to 11 multiply by year 3 persistence; all other ages earn 0.
- Quarter revenue is the sum across active cohorts. This is a discrete timing approximation, not a daily accrual or cash collection model. It assumes a full earning quarter when a cohort activates.
- Range is the minimum and maximum of the 3 edited scenarios at that quarter, not a statistical confidence interval. Case labels do not enforce order if the user edits rates across each other.

Default central forecast, all outputs Hypothesis:

| Quarter | Touches | Expected signatures | Fees earned |
| --- | --- | --- | --- |
| Q4 2026 | 59.786 | 0.361584 | $0 |
| Q1 2027 | 173.571 | 1.049760 | $1,086 |
| Q2 2027 | 175.500 | 1.061424 | $4,237 |
| Q3 2027 | 177.429 | 1.073088 | $7,424 |
| Q4 2027 | 177.429 | 1.073088 | $10,645 |

Central total: 4.618944 expected signatures and $23,391 fees earned through Q4 2027 (Hypothesis). Annual full-conversion assumption is 0.6048%. Existing live book value is excluded from this future-contact forecast.

## Layer 6: market facts and source register

The following are Sourced records as of the settled November 23, 2026 snapshot, not a new live verification. Verification-sweep.md wins over conflicting advisor claims. Any legal execution requires current counsel confirmation.

- Straub / AB One: announcement November 13, 2026; expected close early 2027; selected brands only; supplier consent required; no published selection list or process in the record. Source: Garage thesis and published Lou report, citing transaction and trade coverage.
- Hemp THC beverages: federal cap effective December 11, 2026 in the settled record. Minnesota written counsel confirmation is a hard gate before any hemp mandate. Source: settled brief and verified thesis record.
- Thesis decisions: Straub live; hemp pursue 15/18; Kroger park 13/18; QXO park 11/18; LP SmartSide park 10/18; Advance Auto Parts killed. Scores are recorded internal judgments, not success probabilities. Source: settled brief; updated thesis record supersedes earlier scan scores.
- Target size: roughly $2M to $50M. Billion-dollar companies are signals only. Source: thesis factory size rule and settled brief.
- Sunset Distributing: successor to Stone, Classic and Scout Southern California operations. Inland Empire coverage confirmed in substance; exact own-site county list unresolved. Coast Beverage: parts of Riverside County documented, Temecula-specific coverage unconfirmed. Guardian Distributors of So Cal: published Riverside and San Bernardino coverage. Source: verification sweep sections 2 and 3, company sites and trade coverage.
- Karl Strauss: opened Temecula November 5, 2013. The record calls it a 12-year incumbent; use the dated opening as the controlling fact, never describe it as a new arrival. Source: verification sweep section 1. The model does not silently reinterpret the settled historical description.
- CA BPC section 25000.9 restrains the manufacturer on unreasonable withholding of consent to covered wholesaler-business ownership transfers. Application depends on transaction and agreement. Source: verification sweep section 4 and the statute. No withholding-as-stalling recommendation.

Required source files read for the build:

1. files/tommy-deal-projection-2026-11-21.xlsx, sheet “Left Coast projection”, including inputs, scenario outputs and sensitivity grid.
2. files/garage-deal-model-report-2026-11-23.md, original scenarios and source metadata.
3. hidden_files/lou-deal-thesis/thesis-synthesis.md, revised central case, sections 5 and 6 economics and legal gates.
4. hidden_files/lou-deal-thesis/verification-sweep.md, controlling fact corrections.
5. files/lou-deal-thesis-report-2026-11-23.md, published thesis and source discrepancy.
6. files/left-coast-pilot-decision-packet-2026-11-21.md, pilot share band and mandate-first terms.
7. files/left-coast-mandate-draft-2026-11-21.md, counterfactual measurement and unagreed term blanks.
8. files/pilot-baseline-template-2026-11-21.md, capture from client records, written confirmation, exclusions and lock rule.
9. hidden_files/lou-deal-thesis/packet/partner-or-perish.pdf, Abraham framework and slide references.
10. /home/hatch/workspace/lou-deal-dashboard/, design tokens and Vite/React build pattern. Outputs unchanged.
11. hidden_files/ppg-financial-model/brief.md, settled snapshot, cadence and delivery requirements; BUILD-STATE.md, takeover discrepancy record.

Paths beginning files/ and hidden_files/ are relative to /home/hatch/workspace/goals/first-1m-in-ppg-revenue/. The complete original research remains in these files; this book is an assumptions ledger and implementation guide.

## Limitations that matter

The weakest information is precisely what drives the fee: actual channel split, current volume, margin and the client's alternative without PPG. Garage's volume is a 2022 fact held flat by assumption. Probability inputs are judgments, not calibrated empirical frequencies. A signed mandate does not guarantee measurable improvement, successful collection or legal feasibility. Bundle partners and their sizes are unknown. Capacity, licenses and many current route details are unverified. No statistical confidence intervals are claimed.

The firm bears time and execution costs even on $0 outcomes. Revenue is before PPG costs and tax; there is no cash balance, expense budget or discounted value. Future supply and conversions are held constant within each case. Seasonality, sales-cycle distributions, hiring limits and exact invoice timing are not modeled. The shared Straub event can move both live deals together.

The model is a planning instrument for deciding what to learn and which mandate to pursue. Client records and written agreements must replace assumptions before billing.
