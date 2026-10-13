import { title, heading, meta } from "../styles";
import { Link } from "../components/Link";
import { ResultsTable } from "../components/ResultsTable";
import organization from "../assets/lance-organization.webp";
import architecture from "../assets/lance-full.webp";

export function LancePage() {
  return (
    <>
      <Link href="/#work">Back</Link>
      <h1 className={title}>LANCE: learning enzyme kinetics</h1>
      <p className={meta}>
        Bach Pham, Kinjal Mondal &amp; Jeffery B. Klauda
        <br/>
        University of Maryland | Manuscript under mentor review | Not yet published
      </p>
      <p className="mb-5">
        Enzyme measurements are sparse and depend on experimental conditions. LANCE
        predicts <i>k</i>
        <sub>cat</sub>, <i>K</i>
        <sub>m</sub>, and <i>K</i>
        <sub>i</sub> with one shared architecture and three prediction heads.
      </p>
      <h2 className={heading}>One model, three predictions</h2>
      <figure className="my-7">
        <Link href={organization}>
          <img
            src={organization}
            width="1600"
            height="583"
            alt="Architectural organization: CatPred trains three separate task models; LANCE-7R shares protein and molecule representations, latent actions, and three prediction heads."
          />
        </Link>
        <figcaption className={meta}>
          Architectural organization: CatPred and LANCE-7R. Select to view
          it full size.
        </figcaption>
      </figure>
      <h2 className={heading}>The core idea of my architecture is to implement the JEPA-style objectives.</h2>
      <p className="mb-5">
        <strong>Joint-Embedding Predictive Architecture (JEPA)-style learning</strong>{" "}
        guides two latent routes with different roles.
        Molecule-conditioned cross-attention first connects molecular features
        with enzyme residue features. Two shared 64-dimensional action
        vectors, adapted for each task, then update separate binding and
        catalytic representations:
      </p>
      <ul className="mb-5 list-disc space-y-2 pl-6">
        <li>
          <strong>Reaction JEPA</strong> uses available products during training to help
          the catalytic route predict a product representation from the reactant
          representation rather than reconstructing the product.
        </li>
        <li>
          <strong>Binding JEPA</strong> uses a product-free target to guide the binding
          route toward a representation combining the molecule and enzyme interface.
        </li>
      </ul>
      <p className="mb-5">
        <strong>Products are not required at inference.</strong> LANCE-7R also adds a
        second stage with just <strong>406 fitted parameters</strong>. It retrieves
        stored training measurements for an exactly matching reactant, excluding
        the query's sequence-99 cluster, to adjust <i>k</i>
        <sub>cat</sub> predictions while leaving <i>K</i>
        <sub>m</sub> and <i>K</i>
        <sub>i</sub> unchanged. Without an eligible exact match, the original neural
        prediction is preserved. This gives turnover a selective
        correction without retraining the shared backbone.
      </p>
      <figure className="my-7">
        <Link href={architecture}>
          <img
            src={architecture}
            width="1800"
            height="890"
            loading="lazy"
            alt="Full LANCE-7R architecture: sequence and molecule encoders feed cross-attention and shared binding and catalytic actions; dashed JEPA targets are training-only. An exact-reactant label memory corrects only the kcat output."
          />
        </Link>
        <figcaption className={meta}>
          Full LANCE-7R architecture. Dashed paths are training-only supervision; the
          upper band is the kcat memory correction.
        </figcaption>
      </figure>
      <h2 className={heading}>LANCE-7R vs. CatPred</h2>
      <p className="mb-5">
        We retrained{" "}
        <Link newTab href="https://www.nature.com/articles/s41467-025-57215-9">CatPred</Link>{" "}
        v1.0.0 on the same CatPred-DB split
        using ten independent runs per task and evaluated both systems on exactly matched rows.
      </p>
      <p className="mb-5">
        LANCE-7R has favorable point estimates in{" "}
        <strong className="bg-highlight px-1 text-rust">18 of 18</strong> Heldout/OOD99
        comparisons and{" "}
        <strong className="bg-highlight px-1 text-rust">41 of 48</strong> comparisons
        across all supplied Heldout and sequence-OOD cohorts.
      </p>
      <p className="mb-5">
        On the 348-row turnover OOD99 cohort, <strong>R^2 improves from 0.323 to
        0.395</strong> and MAE falls from 1.024 to 0.979. On 1,193 held-out
        inhibition measurements, MAE falls from <strong>0.865 to 0.788</strong>.
        These results measure the complete system; they do not establish how much of the
        gain comes from either JEPA objective alone.
      </p>
      <ResultsTable />
      <p className={meta}>
        CatPred: mean of ten outer ensembles. LANCE-7R: one
        selected ten-member ensemble. R^2 and MAE use log10 targets;
        P1mag (within 10x) is the percentage with absolute log10 error below
        1. OOD labels are the supplied target-specific sequence-identity
        cohorts; Km and Ki have no supplied OOD20 rows. Counts summarize metric directions
        across nested cohorts, not statistical significance.
      </p>
      <div className="my-7">
        <Link href="/#work">Back</Link>
      </div>
    </>
  );
}
