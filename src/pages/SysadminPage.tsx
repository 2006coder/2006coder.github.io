import { title, heading, meta } from "../styles";
import { Link } from "../components/Link";
import preview from "../assets/sysadmin/faraday-monitor-preview.webp";
import monitor from "../assets/sysadmin/faraday-monitor.webp";
import faraday from "../assets/sysadmin/faraday.webp";

export function SysadminPage() {
  return (
    <>
      <Link href="/#sysadmin">Back</Link>
      <h1 className={title}>Systems administration at Earlham</h1>
      <p className={meta}>Student systems administrator | February 2025-present</p>
      <p className="mb-5">
        I maintain <strong>Linux servers, scientific software, and dependencies</strong> that Earlham's
        STEM students use for courses and research. <strong>Faraday</strong> is the cluster I follow most closely:
        GPU workloads, Jupyter notebooks, and the environments that make them useful. My focus
        is software administration, with occasional work on other department machines.
      </p>
      <figure className="my-7">
        <Link href={monitor}>
          <img
            className="w-full"
            src={preview}
            width="1600"
            height="1108"
            alt="Faraday terminal monitoring view showing CPU activity, memory, disks, and running processes."
          />
        </Link>
        <figcaption className={meta}>
          A look at Faraday from my terminal. Select the image to view it at full
          resolution.
        </figcaption>
      </figure>
      <h2 className={heading}>Working environments for students</h2>
      <p className="mb-5">
        I set up separate <strong>PyTorch and TensorFlow Conda environments</strong> with <strong>CUDA 12.4</strong> support and
        registered them as <strong>Jupyter kernels</strong>. Students can choose the
        framework they need without putting conflicting dependencies in the same
        environment.
      </p>
      <p className="mb-5">
        I installed shared data-science packages, including pandas, SciPy, scikit-learn, plotting
        libraries, and notebook widgets. For TensorFlow, I <strong>pinned NumPy below 2.0</strong> to
        preserve GPU compatibility and documented the repair procedure. I also installed Python
        <strong>3.13 environments and modulefiles</strong> on Faraday and Pollock.
      </p>
      <h2 className={heading}>Certificates, storage, and maintenance</h2>
      <ul className="mb-5 list-disc space-y-3 pl-5">
        <li>
          <strong>Certificate renewal:</strong> renewed Faraday's TLS certificate in
          April 2025, then automated wildcard renewal with <strong>Certbot and the RFC 2136 DNS
          challenge</strong> in October. I configured authenticated DNS updates with <strong>BIND TSIG
          keys</strong> and tested renewal.
        </li>
        <li>
          <strong>Backup-server mounts:</strong> restored access to shared home
          directories on <strong>2 servers, Rossum and Dijkstra</strong>, by installing the missing <strong>NFS client</strong>
          {" "}package, configuring persistent mounts, and mounting the shared filesystem.
        </li>
        <li>
          <strong>Course and lab support:</strong> installed XFCE and Xorg on Faraday 5,
          completed lab-machine maintenance tasks, and maintained shared software
          environments.
        </li>
      </ul>
      <figure className="my-7">
        <Link href={faraday}>
          <img
            className="w-full"
            src={faraday}
            width="1326"
            height="938"
            loading="lazy"
            alt="GPU status check on Faraday showing two NVIDIA RTX A5000 GPUs and CUDA 12.4."
          />
        </Link>
        <figcaption className={meta}>
          Checking the GPUs available to the software environment.
        </figcaption>
      </figure>
      <h2 className={heading}>How I started</h2>
      <p className="mb-5">
        I trained from February through March 2025, learning the department's systems, Vim, and
        the Unix shell. My first setup project was a <strong>Debian 12
        server</strong>: manual networking, <strong>NFS mounts, Apache, Git, and SSH</strong>.
        Getting that first "Hello, World!" page online was a small but satisfying milestone.
      </p>
      <p className="mb-5">
        By April, I was handling certificate and Python-module tasks. Since
        then, I've kept learning through the practical details: a missing package, a
        mismatched path, or a dependency version that breaks GPU
        support.
      </p>
      <h2 className={heading}>A separate project: Earlham LibreChat</h2>
      <p className="mb-5">
        Alongside this work, I'm the primary maintainer of LibreChat for Earlham ITS and
        the System Administration team. That work covers the
        student-facing platform, model serving, and developer tools.
      </p>
      <p className="mb-5">
        <Link href="/librechat">
          Read about LibreChat for Earlham College ITS --&gt;
        </Link>
      </p>
      <div className="my-7">
        <Link href="/#sysadmin">Back</Link>
      </div>
    </>
  );
}
