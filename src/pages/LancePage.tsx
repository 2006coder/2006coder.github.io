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
        <strong className="bg-highlight px-1 text-rust">Bach Pham | First author</strong>
        <br/>
        With <strong className="bg-highlight px-1 text-rust">Professor Jeffery B. Klauda</strong>{" "}
        &amp; <strong className="bg-highlight px-1 text-rust">PhD student Kinjal Mondal</strong>
        <br/>
        <strong className="bg-highlight px-1 text-rust">Laboratory of Molecular and Thermodynamic Modeling</strong>
        <br/>
        <strong className="bg-highlight px-1 text-rust">University of Maryland</strong> | Revising for journal submission | Not yet published
      </p>
      <p className="mb-5">
        Enzyme measurements are sparse and depend on experimental conditions. LANCE
        predicts <i>k</i>
        <sub>cat</sub>, <i>K</i>
        <sub>m</sub>, and <i>K</i>
        <sub>i</sub> with one shared architecture and three prediction heads.
      </p>
      <p className="mb-5">
        <strong>October 2026:</strong>{" "}
        <strong className="bg-highlight px-1 text-rust">Professor Jeffery B. Klauda</strong>{" "}
        and <strong className="bg-highlight px-1 text-rust">PhD student Kinjal Mondal</strong>{" "}
        reviewed the manuscript and requested more ablation evidence. I am currently
        running <strong>12 controlled ablation experiments on UMD's Zaratan HPC
        cluster</strong> under energybio-eng. <strong>Results are pending.</strong>{" "}
        <Link href="#ablation-study">See the study design --&gt;</Link>
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
      <h2 className={heading}>Two JEPA objectives, shared latent actions</h2>
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
        I combine these two JEPA-style objectives with <strong>contrastive losses</strong>{" "}
        that align paired representations and <strong>SIGReg-style regularization</strong>{" "}
        that discourages representation collapse. Together with early
        molecule-conditioned cross-attention and task-adapted latent actions, these
        form the shared learning system for all three kinetic parameters.
      </p>
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
      <h2 className={heading}>Connecting molecular prediction to drug discovery</h2>
      <p className="mb-5">
        <strong>Inhibition constants connect enzyme modeling to inhibitor evaluation.</strong>{" "}
        LANCE predicts <i>K</i><sub>i</sub> alongside turnover and substrate kinetics
        from enzyme and molecular features. This makes the work relevant to the
        computational characterization of enzyme inhibitors in drug discovery.
      </p>
      <p className="mb-5">
        On <strong>1,193 held-out inhibition measurements</strong>, the complete
        system reduces log10 MAE by <strong className="bg-highlight px-1 text-rust">8.9%</strong>{" "}
        relative to retrained CatPred, from 0.865 to 0.788, and raises R^2 from
        <strong> 0.633 to 0.674</strong>. These are benchmark prediction results;
        prospective compound screening and experimental validation remain future work.
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
      <section id="ablation-study">
        <h2 className={heading}>Testing what drives the gains</h2>
        <p className="mb-5">
          A stronger complete model does not tell us which objectives help. My new
          study holds the <strong>architecture, parameter count, data protocol, and
          training schedule fixed</strong> while changing only the loss coefficients.
          Each condition uses two paired seeds and 150 epochs: <strong>12
          backbone training runs</strong> in total.
        </p>
        <ol className="mb-5 list-decimal space-y-2 pl-6">
          <li><strong>Kinetic supervision only:</strong> the full architecture with auxiliary losses disabled.</li>
          <li><strong>Binding JEPA:</strong> kinetic supervision plus the binding objective family.</li>
          <li><strong>Reaction JEPA:</strong> kinetic supervision plus the reaction objective family.</li>
          <li><strong>Both JEPA branches:</strong> tests their combined contribution and interaction.</li>
          <li><strong>Both branches + SIGReg:</strong> tests the representation regularizer.</li>
          <li><strong>Full loss recipe:</strong> tests the remaining auxiliary objectives as a group.</li>
        </ol>
        <p className="mb-5">
          I separated checkpoint selection, memory calibration, and final reporting
          into <strong>three groups disjoint by pooled 99% sequence cluster</strong>.
          Comparisons use the same report rows and paired seeds, with each kinetic
          target reported separately. Released test and OOD labels are not loaded
          by this study; the new report groups may still be sequence-similar to
          training data.
        </p>
        <p className="mb-5">
          The full-loss checkpoints also support <strong>three memory comparisons</strong>:
          no memory, a simple exact-label average, and learned retrieval. These reuse
          the same backbones, exclude neighbors in the query's target-specific 99%
          sequence cluster, and preserve the other two kinetic outputs.
        </p>
        <p className="mb-5">
          Local checks cover all six configurations, matching initial weights,
          finite gradients, small end-to-end runs, retrieval exclusions, and Slurm
          submission and resume behavior. These validate the implementation;
          <strong> the full study has no results to report yet</strong>. Two seeds
          provide an initial repeatability check. This study tests loss contributions,
          not whether the learned representations are physical binding or catalytic states.
        </p>
      </section>
      <div className="my-7">
        <Link href="/#work">Back</Link>
      </div>
    </>
  );
}
