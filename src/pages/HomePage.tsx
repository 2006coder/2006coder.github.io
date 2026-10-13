import { title } from "../styles";
import { Link } from "../components/Link";
import { WorkPage } from "./WorkPage";

export function HomePage() {
  return <>
    <section id="hello" className="flex min-h-[calc(100svh-5.5rem)] flex-col items-center justify-center pt-8 pb-24 sm:min-h-[calc(100svh-8.5rem)] text-center">
      <h1 className="mb-7 text-[56px] leading-[1.05] tracking-tight sm:text-[88px]">
        Hello,<br/>I am Bach.
      </h1>
      <p className="leading-[1.7]">
        3rd year Computer Science major<br/>
        Physics minor, Math minor<br/>
        Earlham College | Class of 2028
      </p>
      <Link href="index.html#education" className="mt-6">Explore my background --&gt;</Link>
    </section>
    <section id="education" className="pb-8">
      <h2 className={title}>Education</h2>
      <p className="mb-5">
        <strong>Cumulative GPA: 3.98 / 4.00.</strong>
        <br/>
        Computer Science | Honors Program
      </p>
      <p className="mb-5">Selected completed classes, through spring 2026:</p>
      <ul className="mb-6 space-y-3 text-lg sm:text-2xl">
        {[
          ["Quantum Mechanics", "A"],
          ["Modern Physics", "A"],
          ["AI & Machine Learning", "A+"],
          ["Algorithms", "A+"],
          ["Data Structures", "A+"],
          ["Principles of Computer Organization", "A+"],
          ["Linear Algebra", "A+"],
          ["Multivariate Calculus (Calc 3)", "A"],
        ].map(([course, grade]) => (
          <li key={course} className="flex items-end gap-2">
            <span className="min-w-0 max-w-[80%]">{course}</span>
            <span aria-hidden="true" className="mb-2.5 min-w-3 flex-1 border-b border-dotted border-muted" />
            <span className="w-8 shrink-0 text-right font-bold">{grade}</span>
          </li>
        ))}
      </ul>
      <p className="mb-5">
        Selected fall 2026 courses: Differential Equations, Image Classification with ML, Networks
        &amp; Networking, and Principles of Chemistry.
      </p>
    </section>
    <WorkPage />
    <section id="skills" className="pt-16">
      <h2 className={title}>Skills</h2>
      <dl className="grid gap-8 sm:grid-cols-2">
        {[
          ["Deep Learning", "PyTorch, TensorFlow, Keras, Hugging Face"],
          ["Computer Vision", "OpenCV, MediaPipe, Nerfstudio, COLMAP"],
          ["Data Science", "NumPy, Pandas, Scikit-learn, Matplotlib, SageMath"],
          ["Development", "Python, JavaScript, React, C/C++"],
          ["Tools & Systems", "Git, Linux, Docker, CUDA, Slurm job scheduling (sbatch)"],
        ].map(([category, skills]) => (
          <div key={category}>
            <dt className="mb-2 font-bold text-rust">{category}</dt>
            <dd>{skills}</dd>
          </div>
        ))}
      </dl>
    </section>
  </>;
}
