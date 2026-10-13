import { title, heading, meta } from "../styles";
import { Link } from "../components/Link";
import librechat from "../assets/sysadmin/librechat.webp";

export function LibreChatPage() {
  return (
    <>
      <Link href="/#librechat">Back</Link>
      <h1 className={title}>LibreChat for Earlham College ITS</h1>
      <p className={meta}>
        Earlham ITS &amp; System Administration team | Primary
        maintainer | Fall 2025-present
      </p>
      <p className="mb-5">
        I collaborate directly with Earlham ITS department and the System Administration team to build Earlham's chat platform, 
        a custom LibreChat deployment for students. As its primary maintainer, I develop features and run the service, with
        occasional contributions from two teammates. My work gives students
        access to online and Earlham-hosted models, isolated coding workspaces, and API
        keys for their own tools without needing a GPU on their laptop.
      </p>
      <p className="mb-5">
        <Link href="https://chat.cluster.earlham.edu">chat.cluster.earlham.edu</Link> is
        an <strong>internal beta for Earlham students</strong>, requires Earlham SSO, and has about <strong>150 daily users</strong>. 
        Students are sharing it with each other and usage is growing gradually.
        A move to a domain such as chat.earlham.edu or
        ai.earlham.edu is expected when the platform is publicly
        announced (neither is the current address).
      </p>
      <figure className="my-7">
        <Link href={librechat}>
          <img
            src={librechat}
            width="1800"
            height="1089"
            alt="Earlham LibreChat with a local model selected."
          />
        </Link>
        <figcaption className={meta}>
          The student interface in September 2026, before the local inference migration.
        </figcaption>
      </figure>

      <h2 className={heading}>Local models students can use in their own tools</h2>
      <p className="mb-5">
        I built the <strong>Local model API keys</strong> page in LibreChat's account
        menu. Students can create a key, choose allowed models and an expiry, rename
        it, or revoke it. The compute runs on Earlham clusters, so their laptop
        doesn't need a GPU.
      </p>
      <p className="mb-5">
        I added an administrator CLI, OpenCode configuration, and a desktop
        setup video. My supervisor, Porter Libby, and other users tested the key
        workflow and gave positive feedback on how easy it was to
        create and manage keys. Use from an external machine was
        also confirmed.
      </p>
      <p className="mb-5">
        The system allows ten keys per user, with 300 requests per
        minute and four concurrent requests per key. Secrets are shown once;
        ownership records contain safe metadata instead of full keys. I added origin
        checks, browser security headers, and server-side ownership enforcement.
      </p>

      <h2 className={heading}>Workspaces, files, and smaller patches</h2>
      <p className="mb-5">
        On <strong>May 31, 2026</strong>, I added sandboxed workspaces for model-written
        commands and code. My work included file operations, project scanning,
        CodeGraph, upload import, and authenticated downloads and
        HTML previews.
      </p>
      <p className="mb-5">
        I isolated users with separate filesystem identities and restricted the runner with no
        network, a read-only root filesystem, resource limits, and a
        120-second command timeout. Workspaces have 15 GiB quotas, usage warnings, and
        24-hour cleanup. Existing PyTorch and TensorFlow
        environments are mounted read-only, and project scans exclude .env files.
      </p>
      <p className="mb-5">
        In September, I adopted upstream workspace support where applicable and
        reduced custom patching, retaining the isolated runner and file controls described in my
        deployment notes.
      </p>
      <ul className="mb-5 list-disc space-y-3 pl-5">
        <li>
          <strong>Uploads:</strong> fixed a configuration issue in workspace import and
          verified it with a roughly 35 MB video.
        </li>
        <li>
          <strong>Private files:</strong> tested owner downloads and rejection of
          anonymous and other-user access.
        </li>
        <li>
          <strong>PDFs:</strong> added layout-aware extraction with anymd and
          scanned-document OCR with Tesseract inside private workspaces, then removed
          the older parser patch.
        </li>
      </ul>

      <h2 className={heading}>Making local inference fit the machines</h2>
      <p className="mb-5">
        After Porter told me about additional compute nodes and GPUs in August, I made a
        major inference update in September. I migrated from Ollama to native{" "}
        <strong>llama.cpp</strong> and removed redundant inference services. On{" "}
        <strong>October 9</strong>, I updated llama.cpp again.
      </p>
      <ul className="mb-5 list-disc space-y-3 pl-5">
        <li>
          <strong>Loading:</strong> staged GGUF models and vision projectors on each
          node's local disk, preloaded Gemma 4 26B at startup, and kept loaded models
          warm between requests.
        </li>
        <li>
          <strong>Routing:</strong> ran separate servers on f4 and f5, each using two
          A5000 GPUs. Requests are balanced across replicas and retried when a replica
          fails. Each node keeps one model loaded; the router waits for active requests
          to finish before unloading an idle model to make room.
        </li>
        <li>
          <strong>Memory:</strong> kept model layers in VRAM. For the two 80B models, I
          moved q8 context caches to RAM and used a 48%/52% GPU split to leave room for
          compute buffers. Larger models use one concurrent slot; others use two.
        </li>
        <li>
          <strong>Conversation overhead:</strong> used LFM 2.5 8B for local chat titles
          and enabled native context compaction to reduce processing of accumulated
          history.
        </li>
      </ul>
      <p className="mb-5">
        This work taught me to consider model weights, context caches, and concurrency
        together. A model loading successfully is only the first check; it also needs room to
        answer.
      </p>

      <h2 className={heading}>Upgrades I can recover from</h2>
      <p className="mb-5">
        I upgraded LibreChat to 0.8.8-rc4 and removed obsolete compatibility patches.
        After backing up MongoDB, I resolved a unique-message-index failure by removing{" "}
        <strong>27 stale unfinished duplicates</strong> while preserving completed
        messages.
      </p>
      <p className="mb-5">
        I created a core backup covering databases, user files,
        images, and deployment configuration, and tested database
        recovery in isolated containers. In
        September, I reduced the main runtime patch from{" "}
        <strong>688 to 582 lines</strong> at that stage and checked attachment behavior
        across <strong>3,712 cases</strong>.
      </p>
      <p className="mb-5">
        I also maintain the $3 per-user daily online-model budget and pricing
        logic, configured a shared coding team with restrictions on
        expensive child models, and migrated four private agents to the newer
        permissions system. I replaced failing search with Firecrawl
        while preserving web fetch, and documented scoped deployment, verification, and
        rollback procedures.
      </p>

      <p className="my-7">
        <Link href="/sysadmin">My broader systems administration work --&gt;</Link>
      </p>
      <div className="my-7">
        <Link href="/#librechat">Back</Link>
      </div>
    </>
  );
}
