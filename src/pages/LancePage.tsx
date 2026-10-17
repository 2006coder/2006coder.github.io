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
        <strong className="bg-[#dce8cf] px-1 text-ink">Laboratory of Molecular and Thermodynamic Modeling</strong>
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
      <h2 className={heading}>From protein sequences and SMILES to shared features</h2>
      <ul className="mb-5 list-disc space-y-4 pl-6">
        <li>
          <strong>Frozen ESM++ protein features.</strong> I cache residue embeddings
          from the <strong>600M-parameter ESM Cambrian model</strong> through ESM++. Each residue has
          <strong> 1,152 features, projected to 512 dimensions</strong> in the learned backbone.
          The protein language model stays frozen, so training reuses its features
          without backpropagating through 600M parameters.
        </li>
        <li>
          <strong>RDKit graphs and a D-MPNN.</strong> RDKit converts molecular SMILES
          into atom-bond graphs. I adapted CatPred's directed message-passing encoder
          to produce 300-dimensional atom states, then project them to 512 dimensions.
          Reactants, substrates, inhibitors, and training-only products share the
          same encoder weights.
        </li>
        <li>
          <strong>Early molecule-conditioned cross-attention.</strong> Four query tokens
          derived from the molecule attend to enzyme residues through <strong>8 attention
          heads</strong>. A learned task gate controls how much this interaction changes the
          global enzyme representation, before the kinetic prediction heads.
        </li>
      </ul>
      <h2 className={heading}>Two JEPA objectives, shared latent actions</h2>
      <p className="mb-5">
        <strong>Joint-Embedding Predictive Architecture (JEPA)-style learning</strong>{" "}
        guides two latent routes with different roles.
        Two shared <strong>64-dimensional action vectors</strong> combine enzyme-interface and
        molecule features. A shared residual adapter uses task embeddings to adjust
        the actions for each endpoint, then projects them to update separate binding
        and catalytic representations:
      </p>
      <ul className="mb-5 list-disc space-y-2 pl-6">
        <li>
          <strong>Reaction JEPA</strong> predicts a latent displacement from a
          stop-gradient reactant anchor toward a stop-gradient product target.
          Smooth-L1 and in-batch contrastive losses supervise the predicted state
          and displacement. Products supply training targets, not inference inputs;
          rows without products still receive kinetic supervision.
        </li>
        <li>
          <strong>Binding JEPA</strong> trains on Michaelis and inhibition examples
          using a stop-gradient target formed from the molecule and enzyme-interface
          states. It provides product-free self-consistency supervision, rather than
          a measured enzyme-ligand complex or an experimentally validated binding state.
        </li>
      </ul>
      <p className="mb-5">
        <strong>SIGReg-style regularization</strong> matches randomly projected
        representation distributions to a standard Gaussian to discourage collapse.
        A separate squared-cosine penalty discourages the two action vectors from
        becoming copies. These objectives guide the representations; the pending
        ablations test how much they contribute to prediction quality.
      </p>
      <h2 className={heading}>Training the predictor</h2>
      <p className="mb-5">
        The <strong>22.53M-parameter Python/PyTorch backbone</strong> uses
        <strong> CUDA BF16 mixed precision</strong>. That parameter count excludes
        the frozen 600M protein feature extractor. Three <strong>heteroscedastic
        regression heads</strong> predict a mean and log variance using
        <strong> beta-weighted Gaussian negative log likelihood</strong>.
        Temperature and pH enter with missing-value flags, so an absent measurement
        is distinguishable from zero.
      </p>
      <ul className="mb-5 list-disc space-y-3 pl-6">
        <li><strong>Task-balanced batches of 256:</strong> approximately 86 turnover,
          85 Michaelis, and 85 inhibition examples per batch.</li>
        <li><strong>AdamW and gradient clipping:</strong> a 3-epoch learning-rate
          warm-up, up to 150 epochs, and early-stopping patience of 20.</li>
        <li><strong>Two-stage fitting:</strong> train the shared backbone first, then
          freeze it and fit the 406-parameter retriever for 20 epochs.</li>
        <li><strong>10-member ensemble:</strong> reported predictions average
          independently trained seed models, each sharing its encoders across all 3 tasks.</li>
      </ul>
      <h2 className={heading}>A 406-parameter memory correction</h2>
      <p className="mb-5">
        LANCE-7R freezes the backbone and fits a small retrieval module. An eligible
        exact-reactant match gates whether memory can adjust <i>k</i>
        <sub>cat</sub> predictions while leaving <i>K</i>
        <sub>m</sub> and <i>K</i>
        <sub>i</sub> unchanged. Without an eligible exact match, the original neural
        prediction is preserved.
      </p>
      <p className="mb-5">
        A <strong>learned diagonal metric</strong> ranks 64-dimensional protein keys by cosine
        similarity, after <strong>excluding the query's target-specific 99% sequence cluster</strong>.
        A temperature-weighted average of <strong>up to 8 eligible labels</strong> and a bounded
        residual MLP form the correction. The residual also receives approximate
        different-reactant neighbor statistics: exact matching controls eligibility,
        but the correction is not based exclusively on exact-match neighbors.
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
      <p className={meta}>
        Heldout/OOD99 scores informed architecture development, so these are
        development-benchmark comparisons rather than untouched confirmation.
        Target-specific sequence OOD also does not rule out exposure through another
        kinetic task in the shared model.
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
          backbone training runs</strong> in total, submitted through <strong>Slurm</strong>
          {" "}on UMD's Zaratan HPC cluster.
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
