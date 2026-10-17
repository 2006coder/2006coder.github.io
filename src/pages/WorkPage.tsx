import { title, meta } from "../styles";
import { Link } from "../components/Link";
import robot from "../assets/nyx-v.jpg";
import epipolarPlane from "../assets/robotics/epipolar-plane.svg";
import epipolarLine from "../assets/robotics/epipolar-line.svg";

export function WorkPage() {
  return (
    <section id="work" >
      <h2 className={title}>Work &amp; research</h2>
      <section id="publications" className="mb-9">
        <h2 className="mb-4 text-[32px] font-bold leading-tight wrap-break-word sm:text-[40px]">
          Publications &amp; latest manuscript
        </h2>
        <article className="py-10 sm:py-12">
          <h3 className="mb-4 text-[30px] font-bold leading-tight wrap-break-word sm:text-[38px]">
            <Link href="/lance">LANCE-7R: enzyme kinetics prediction</Link>
          </h3>
          <p className="mb-7 text-[22px] leading-relaxed sm:text-2xl">
            <strong className="bg-highlight px-1 text-rust">First author</strong>{" "}
            | 2026 | <strong className="bg-highlight px-1 text-rust">Revising for journal submission</strong>{" "}
            | Not yet published
          </p>
          <p className="mb-5">
            I developed a <strong>22.53M-parameter PyTorch backbone</strong> that combines
            frozen <strong>ESM++ protein language model features</strong> with RDKit
            molecular graphs encoded by a directed message-passing neural network
            (D-MPNN). One shared architecture predicts turnover, Michaelis, and
            inhibition constants.
          </p>
          <p className="mb-5">
            Molecule-conditioned cross-attention and shared latent actions connect
            <strong> two JEPA-style objectives for binding and reaction</strong>, with
            contrastive losses and SIGReg-style regularization. A <strong>406-parameter
            label-memory module</strong> selectively corrects turnover predictions.
            <strong> No reaction products are required at inference.</strong>
          </p>
          <p className="mb-5">
            I began this work full-time in summer 2026 and continue this fall with
            <strong className="bg-highlight px-1 text-rust">Professor Jeffery B. Klauda</strong>{" "}
            and <strong className="bg-highlight px-1 text-rust">PhD student Kinjal Mondal</strong>{" "}
            in the <strong className="bg-[#dce8cf] px-1 text-ink">Laboratory of Molecular and Thermodynamic Modeling</strong>{" "}
            at the <strong className="bg-highlight px-1 text-rust">University of Maryland</strong>.
          </p>
          <ul className="mb-6 list-disc space-y-4 pl-6">
            <li>Outperformed retrained{" "}
              <Link newTab href="https://www.nature.com/articles/s41467-025-57215-9">CatPred</Link>,
              published in <strong>Nature Communications (2025)</strong>, in{" "}
              <strong className="bg-highlight px-1 text-rust">18 of 18</strong>{" "}
              Heldout/OOD99 metric point estimates and{" "}
              <strong className="bg-highlight px-1 text-rust"> 41 of 48</strong>{" "}
              across all supplied cohorts.</li>
            <li>Turnover OOD99 <strong>R^2: 0.395 vs. CatPred's 0.323</strong>{" "}
              on the same 348 rows.</li>
            <li><strong>Drug-discovery relevance:</strong> predicting enzyme inhibition
              constants connects this work to inhibitor evaluation. On <strong>1,193
              held-out inhibition measurements</strong>, LANCE reduces log10 MAE from
              0.865 to 0.788, an <strong className="bg-highlight px-1 text-rust">8.9% reduction</strong>{" "}
              versus retrained CatPred.</li>
            <li><strong>Currently running 12 controlled ablation experiments</strong>{" "}
              on <strong>UMD's Zaratan HPC cluster</strong> under energybio-eng following
              mentor feedback. Six loss configurations and two paired seeds test which
              objectives contribute to the gains. <strong>Results are pending.</strong></li>
          </ul>
          <p>
            <Link href="/lance">More in-depth details</Link>
          </p>
        </article>
        <article id="acl-publication" className="py-10 sm:py-12">
          <h3 className="mb-4 text-[30px] font-bold leading-tight wrap-break-word sm:text-[38px]">
            <Link newTab href="https://ieeexplore.ieee.org/document/11668005">
              A Two-Stage AI System for Interpretable ACL Tear Screening in Connected
              Health Environments
            </Link>
          </h3>
          <p className="mt-5 mb-3 text-[28px] leading-snug sm:text-[34px]">
            <strong className="bg-highlight px-1 text-rust">IEEE/ACM CHASE 2026</strong>
          </p>
          <p className="mb-7 text-[22px] leading-relaxed sm:text-2xl">
            <strong className="bg-highlight px-1 text-rust">First author</strong> | <strong className="bg-highlight px-1 text-rust">PUBLISHED</strong>{" "}
            August 2026
          </p>
          <ul className="mb-6 list-disc space-y-4 pl-6">
            <li><strong>0.848 AUC versus 0.719 for the baseline</strong> on the
              paper's 30-patient held-out test set.</li>
            <li><strong>My contribution:</strong> a custom 2.5D ResNet50 classifier
              combining seven MRI slices, three input channels (intensity, Frangi
              vesselness, and local variance), and learned slice attention with max pooling.</li>
            <li>Presented at the <strong>University of Pittsburgh</strong>.</li>
          </ul>
          <p className="mb-3 break-words">
            <Link newTab href="https://ieeexplore.ieee.org/document/11668005">
              https://ieeexplore.ieee.org/document/11668005
            </Link>
          </p>
          <p className="break-words">
            <Link newTab href="https://doi.org/10.1109/CHASE69719.2026.00093">
              DOI: 10.1109/CHASE69719.2026.00093
            </Link>
          </p>
        </article>
        <article className="py-10 sm:py-12">
          <h3 className="mb-4 text-[30px] font-bold leading-tight wrap-break-word sm:text-[38px]">
            <Link newTab href="https://ieeexplore.ieee.org/document/11036288">
              Word Definitions from Large Language Models
            </Link>
          </h3>
          <p className="mt-5 mb-3 text-[28px] leading-snug sm:text-[34px]">
            <strong className="bg-highlight px-1 text-rust">IEEE ICSC 2025</strong>
          </p>
          <p className="mb-7 text-[22px] leading-relaxed sm:text-2xl">
            <strong className="bg-highlight px-1 text-rust">First author</strong> | <strong className="bg-highlight px-1 text-rust">PUBLISHED</strong>{" "}
            February 3, 2025
          </p>
          <ul className="mb-6 list-disc space-y-4 pl-6">
            <li>Compared ChatGPT-generated definitions with <strong>three published
              dictionaries</strong>, finding comparable accuracy.</li>
            <li>ChatGPT-based embedding definitions retained accuracy on
              <strong> rare words better than GloVe and FastText</strong>.</li>
          </ul>
          <p className="mb-3 break-words">
            <Link newTab href="https://ieeexplore.ieee.org/document/11036288">
              https://ieeexplore.ieee.org/document/11036288
            </Link>
          </p>
          <p className="mb-3 break-words">
            <Link newTab href="https://doi.org/10.1109/ICSC64641.2025.00028">
              DOI: 10.1109/ICSC64641.2025.00028
            </Link>
          </p>
          <p className="text-lg text-muted">Preprint first posted November 10, 2023</p>
        </article>
        <article className="py-10 sm:py-12">
          <h3 className="mb-4 text-[30px] font-bold leading-tight wrap-break-word sm:text-[38px]">
            <Link newTab href="https://ieeexplore.ieee.org/document/11036320">
              Prosody Analysis of Audiobooks
            </Link>
          </h3>
          <p className="mt-5 mb-3 text-[28px] leading-snug sm:text-[34px]">
            <strong className="bg-highlight px-1 text-rust">IEEE ICSC 2025</strong>
          </p>
          <p className="mb-7 text-[22px] leading-relaxed sm:text-2xl">
            Second author | <strong className="bg-highlight px-1 text-rust">PUBLISHED</strong>{" "}
            February 3, 2025
          </p>
          <ul className="mb-6 list-disc space-y-4 pl-6">
            <li><strong>93 aligned book-audiobook pairs</strong> to study how
              narrative text predicts pitch, volume, and speaking rate.</li>
            <li>Across 24 evaluation books, predictions correlated more closely
              with human narration than a commercial text-to-speech system for
              <strong> pitch in 22 books and volume in 23</strong>.</li>
          </ul>
          <p className="mb-3 break-words">
            <Link newTab href="https://ieeexplore.ieee.org/document/11036320">
              https://ieeexplore.ieee.org/document/11036320
            </Link>
          </p>
          <p className="mb-3 break-words">
            <Link newTab href="https://doi.org/10.1109/ICSC64641.2025.00036">
              DOI: 10.1109/ICSC64641.2025.00036
            </Link>
          </p>
          <p className="text-lg text-muted">Preprint first posted October 10, 2023</p>
        </article>
      </section>
      <article id="librechat" className="pt-16 pb-6">
        <h2 className="mb-4 text-[32px] font-bold leading-tight wrap-break-word sm:text-[40px]">
          LibreChat for Earlham College ITS
        </h2>
        <p className={meta}>
          Earlham ITS &amp; System Administration team | Primary maintainer
        </p>
        <p className="mb-5">
          I collaborate directly with Earlham ITS department to build and maintain{" "}
          <Link href="https://chat.cluster.earlham.edu">Earlham's chat platform</Link>,
          a custom LibreChat deployment in internal beta. As primary maintainer, I
          support about <strong>150 daily users</strong>, with Earlham SSO sign-in
          and occasional contributions from two teammates.
        </p>
        <ul className="mb-6 list-disc space-y-4 pl-6">
          <li><strong>Student tools:</strong> isolated coding workspaces and
            self-service API keys for Earlham-hosted models, with no laptop GPU required.</li>
          <li><strong>Local inference:</strong> migrated from Ollama to llama.cpp across two GPU nodes.</li>
          <li><strong>Operations:</strong> daily spending limits and tested backup recovery as usage grows.</li>
        </ul>
        <p className="mb-5">
          <Link href="/librechat">What I built, maintained, and learned --&gt;</Link>
        </p>
      </article>
      <article id="sysadmin" className="pt-16 pb-6">
        <h2 className="mb-4 text-[32px] font-bold leading-tight wrap-break-word sm:text-[40px]">
          Systems administration at Earlham
        </h2>
        <p className={meta}>Student systems administrator | February 2025-present</p>
        <p className="mb-5">
          I help keep Earlham's STEM computing infrastructure running: servers, research software,
          and the dependencies students need for coursework and research. My main focus is
          Faraday, maintaining GPU-ready environments, Jupyter access, certificates, and shared storage.
        </p>
        <p className="mb-5">
          <Link href="/sysadmin">Servers, software &amp; what I learned --&gt;</Link>
        </p>
      </article>
      <article id="teaching" className="pt-16 pb-6">
      <h2 className="mb-4 text-[32px] font-bold leading-tight wrap-break-word sm:text-[40px]">Tutoring &amp; teaching</h2>
      <p className="mb-5">Since September 2026, I've tutored:</p>
      <ul className="mb-5 list-disc space-y-2 pl-6">
        <li>Electromagnetism, Waves and Optics (PHYS 230)</li>
        <li>Electromagnetism, Waves and Optics (With Calculus) (PHYS 235)</li>
        <li>Calculus B</li>
      </ul>
      <p className="mb-5">
        In this Earlham campus job, I hold tutoring hours every
        Wednesday, 7-9 p.m. I've helped several students understand equations more clearly and apply
        them to course problems.
      </p>
      <p className="mb-5">
        My Calculus A TA position (teaching assistant) ended in May 2026. I chose to explore physics
        tutoring rather than continue as a TA.
      </p>
      </article>
      <article id="robotics" className="pt-16 pb-6">
        <h2 className="mb-4 text-[32px] font-bold leading-tight wrap-break-word sm:text-[40px]">
          From cameras to robot-ready scenes
        </h2>
        <p className={meta}>
          Perception and Robotics Group, UMD | Summer 2025
          <br/>
          With Yiannis Aloimonos and Pavan Mantripragada
        </p>
        <p className="mb-5">
          My work at UMD took me from pixel-level matrix operations to 3D reconstruction,
          Gaussian Splatting, and RLBench. I started by implementing Gaussian filters,
          image derivatives in the x and y directions, and edge detection from scratch,
          without image-processing libraries.
        </p>
        <p className="mb-5">
          A 3x3 fundamental matrix constrains a point's match in the second image to a line.
          My write-up derives this matrix from at least eight independent correspondences
          and explains two uses of SVD: finding a unit-length least-squares solution,
          then enforcing the rank-two constraint required by epipolar geometry.
        </p>
        <p className="mb-5">
          Understanding the linear algebra helped me see why each step in the
          reconstruction code was needed.
        </p>
        <p className="mb-5">
          <Link href="/sfm">Read my full SfM derivation and SVD proof</Link>
        </p>
        <figure className="my-7">
          <div className="grid gap-5 sm:grid-cols-2">
            <img src={epipolarPlane} width="460" height="400" loading="lazy"
              className="w-full"
              alt="The two camera centers C and C' and a scene point X define the epipolar plane." />
            <img src={epipolarLine} width="445" height="400" loading="lazy"
              className="w-full"
              alt="Possible scene points along the ray through x project onto the epipolar line l' in the second camera." />
          </div>
          <figcaption className={meta}>
            Epipolar geometry: a point in one image constrains its match in the
            other image to a line.
          </figcaption>
        </figure>
        <p className="mb-5">
          The practical connection: in my reconstruction experiments, standing still and
          rotating the camera did not provide enough parallax.
          Translation supplies the viewpoint change needed to recover
          depth. Understanding the geometry helped me explain why the capture setup
          mattered, beyond whether the code ran.
        </p>
      </article>
      <article id="nyx" className="pt-16 pb-6">
        <h2 className="mb-4 text-[32px] font-bold leading-tight wrap-break-word sm:text-[40px]">
          NYX-V quadruped
        </h2>
        <p className="mb-5">
          An ESP32 robot with a custom 3D-printed chassis. Its two cores handle
          Wi-Fi and inverse kinematics.
        </p>
        <figure className="my-7">
          <img
            className="w-full"
            src={robot}
            loading="lazy"
            width="480"
            height="270"
            alt="Bach's NYX-V quadruped robot with its printed frame, motors, and electronics."
          />
        </figure>
        <p className="mb-5">
          <Link href="https://www.youtube.com/watch?v=fpvw82l82EE">
            Watch the robot
          </Link>
        </p>
      </article>
      <article className="pt-16 pb-6">
        <h2 className="mb-4 text-[32px] font-bold leading-tight wrap-break-word sm:text-[40px]">
          Machine learning for knee MRI
        </h2>
        <p className={meta}>
          Earlham College &amp; University of Pittsburgh
          <br/>
          With Debanjali Banerjee and Fengyi Gao
        </p>
        <p className="mb-5">
          Multitask learning for ACL and meniscus tear classification and
          localization. I explored ResNet, CNN-LSTM, and transformer approaches using the MRNet
          dataset.
        </p>
      </article>
    </section>
  );
}
