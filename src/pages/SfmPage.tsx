import "katex/dist/katex.min.css";
import { title, heading, meta } from "../styles";
import { Link } from "../components/Link";
import plane from "../assets/robotics/epipolar-plane.svg";
import line from "../assets/robotics/epipolar-line.svg";

function Equation({
  children,
  display = false,
}: {
  children: string;
  display?: boolean;
}) {
  const html = { __html: children };
  return display ? (
    <div
      tabIndex={0}
      className="my-8 overflow-x-auto py-3 text-lg focus-visible:outline-2 focus-visible:outline-rust sm:text-xl [&_.katex-display]:m-0 [&_.katex-display]:text-left"
      dangerouslySetInnerHTML={html}
    />
  ) : (
    <span dangerouslySetInnerHTML={html} />
  );
}

export function SfmPage() {
  return (
    <article className="[&_p]:mb-5">
      <Link href="/#robotics">Back</Link>
      <h1 className={title}>
        From 2D Images to 3D Worlds: The Linear Algebra of Structure from Motion
      </h1>
      <p className={meta}>Bach Pham</p>
      <h2 className={heading}>Abstract</h2>
      <p>
        This paper explores the essence of Structure from Motion (SfM), a technique in
        computer vision that can reconstruct 3D scenes from some 2D images with good overlap. The paper
        aims to apply linear algebra, especially Singular Value Decomposition (SVD),
        to deeply explore the mathematics behind SfM. I focus mostly on
        the Fundamental Matrix and the Eight-Point Algorithm. Specifically, I
        demonstrate how geometric constraints are transformed into a homogeneous
        system of linear
        equations (<Equation>{String.raw`Ax = 0`}</Equation>) and prove why the
        Singular Value Decomposition provides the optimal solution to this
        problem.
      </p>
      <h2 className={heading}>Introduction: The Inverse Problem</h2>
      <p>
        Sometimes we only have a handful of images of a scene, but we really want to know what the
        whole scene looks like. People have thought of combining images to create panoramas using
        feature matching, but this is still just a larger image. We want to move from a flat 2D image to a 3D structure.
      </p>
      <p>
        In the 1970s, structure from motion was developed. It has been the
        ground to many modern techniques to reconstruct 3d scene,
        especially all kinds of Neural Radiance Field methods (NeRFs) and Gaussian
        Splatting.
      </p>
      <p>
        In rendering (forward problem), we project 3D coordinates onto a 2D
        plane, which causes the loss of depth information. On the other hand, Structure from Motion
        (SfM) tries to reverse this by using the parallax effect which is the relative motion of
        points between different viewpoints.
      </p>
      <p>
        A prominent implementation of this is Google Map. It has been using SfM all
        the time until 2023 when Google released the "immersive view" option on Google Maps which uses another technology built on 
        top of SfM: NeRF. The NeRF paper was released in 2020 by
        Ben Mildenhall, Pratul P. Srinivasan, Matthew Tancik, Jonathan T. Barron,
        Ravi Ramamoorthi, and Ren Ng. Later on in 2024, Google released a research paper
        about a hybrid technology (combining the high quality of NeRF and the
        ultra fast rendering of Gaussian Splatting): RadSplat
      </p>
      <p>The SfM pipeline generally consists of:</p>
      <ol className="mb-5 ml-6 space-y-3 list-decimal">
        <li>Feature Matching (SIFT) and Outlier Rejection (RANSAC).</li>
        <li>
          <strong>
            Estimating the Fundamental Matrix (
            <Equation>{String.raw`F`}</Equation>)
          </strong>{" "}
          (The focus of this paper).
        </li>
        <li>
          Estimating the Essential Matrix (<Equation>{String.raw`E`}</Equation>
          ).
        </li>
        <li>Triangulation and Bundle Adjustment.</li>
      </ol>
      <h2 className={heading}>Epipolar Geometry</h2>
      <p>
        Before we get to the Fundamental Matrix, we have to know what
        Epipolar geometry is.
      </p>
      <h3 className="mt-7 mb-4 text-[28px] font-bold leading-tight sm:text-[32px]">The Coplanarity Constraint</h3>
      <p>
        Consider a point <Equation>{String.raw`\bX`}</Equation> in 3D space
        viewed by two cameras centered at <Equation>{String.raw`\bC`}</Equation>{" "}
        and <Equation>{String.raw`\bC'`}</Equation>.
      </p>
      <ul className="mb-5 ml-6 space-y-3 list-disc">
        <li>
          Let <Equation>{String.raw`\bx`}</Equation> be the projection of{" "}
          <Equation>{String.raw`\bX`}</Equation> onto the first image.
        </li>
        <li>
          Let <Equation>{String.raw`\bx'`}</Equation> be the projection of{" "}
          <Equation>{String.raw`\bX`}</Equation> onto the second image.
        </li>
      </ul>
      <p>
        As illustrated in Figure 1, the points{" "}
        <Equation>{String.raw`\bC`}</Equation>,{" "}
        <Equation>{String.raw`\bC'`}</Equation>, and{" "}
        <Equation>{String.raw`\bX`}</Equation> form a triangle. Consequently,
        the vectors <Equation>{String.raw`\overrightarrow{\bC\bx}`}</Equation>,{" "}
        <Equation>{String.raw`\overrightarrow{\bC\bC'}`}</Equation>, and{" "}
        <Equation>{String.raw`\overrightarrow{\bC'\bx'}`}</Equation> must lie on
        the same plane, called the <strong>epipolar plane</strong>. And since
        they are on the same plane, their scalar triple product is zero:
      </p>
      <Equation
        display
      >{String.raw`\overrightarrow{\bC\bx} \cdot \left(\overrightarrow{\bC\bC'} \times \overrightarrow{\bC'\bx'}\right) = 0`}</Equation>
      <figure className="my-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <img
            src={plane}
            width="460"
            height="400"
            className="w-full"
            alt="Epipolar plane"
          />
          <img
            src={line}
            width="445"
            height="400"
            className="w-full"
            alt="Epipolar line"
          />
        </div>
        <figcaption className={meta}>Figure 1: Epipolar Geometry</figcaption>
      </figure>
      <h3 className="mt-7 mb-4 text-[28px] font-bold leading-tight sm:text-[32px]">Epipoles and Epipolar Lines</h3>
      <p>
        If we know a point <Equation>{String.raw`\bx`}</Equation> in the above
        image, we cannot determine its exact depth. However, the ray from{" "}
        <Equation>{String.raw`\bC`}</Equation> through{" "}
        <Equation>{String.raw`\bx`}</Equation> looks like a line when viewed
        from the second camera. This is the <strong>Epipolar Line</strong> (
        <Equation>{String.raw`\mathbf{l}'`}</Equation>
        ). The matching point <Equation>{String.raw`\bx'`}</Equation> must lie
        somewhere on this line. This constraint significantly reduces the search
        for matches because we just need to search on a line and do not need
        to search for the entire image anymore.
      </p>
      <h2 className={heading}>
        The Fundamental Matrix <Equation>{String.raw`F`}</Equation>
      </h2>
      <p>
        The Fundamental Matrix <Equation>{String.raw`F`}</Equation> is the
        algebraic representation of epipolar geometry. It is a{" "}
        <Equation>{String.raw`3 \times 3`}</Equation> matrix. The relationship
        between a point in image 1,{" "}
        <Equation>{String.raw`\mathbf{x}_i = [x_i, y_i, 1]^T`}</Equation>, and a
        point in image 2,{" "}
        <Equation>{String.raw`\mathbf{x}'_i = [x'_i, y'_i, 1]^T`}</Equation>, is
        given by the <strong>epipolar constraint</strong>:
      </p>
      <Equation
        display
      >{String.raw`\mathbf{x}'^T_i F \mathbf{x}_i = 0`}</Equation>
      <p>
        How does this connect to the three arrows in Figure 1? We started with
        two viewing rays and the line joining the cameras:
      </p>
      <Equation display>{String.raw`\overrightarrow{\bC\bx} \cdot
\left(\overrightarrow{\bC\bC'} \times \overrightarrow{\bC'\bx'}\right) = 0`}</Equation>
      <p>
        We will rewrite this same equation using pixel coordinates. Each step
        below replaces one part of the notation. We follow one matched point,
        so we leave out the subscript <Equation>{String.raw`i`}</Equation> for now.
      </p>
      <h3 className="mt-7 mb-4 text-[28px] font-bold leading-tight sm:text-[32px]">1. Connect the pixels to the three arrows</h3>
      <p>
        <strong>A pixel point and a viewing ray are different things.</strong>{" "}
        <Equation>{String.raw`\bx = [x,y,1]^T`}</Equation> stores a location in the
        image. The arrow <Equation>{String.raw`\overrightarrow{\bC\bx}`}</Equation>{" "}
        points from the camera through that location into the 3D scene.
      </p>
      <p>
        The camera's intrinsic matrix <Equation>{String.raw`K`}</Equation> describes
        how its focal lengths and principal point convert a ray direction into
        pixel coordinates. Its inverse converts a pixel point back into the
        direction of its viewing ray. In each camera's own coordinate frame:
      </p>
      <Equation display>{String.raw`\begin{aligned}
\hat{\bx} &= K^{-1}\bx \parallel \overrightarrow{\bC\bx} \\
\hat{\bx}' &= K'^{-1}\bx' \parallel \overrightarrow{\bC'\bx'}
\end{aligned}`}</Equation>
      <p>
        So <Equation>{String.raw`\hat{\bx}`}</Equation> gives the direction of
        the arrow from <Equation>{String.raw`\bC`}</Equation> through{" "}
        <Equation>{String.raw`\bx`}</Equation>, and{" "}
        <Equation>{String.raw`\hat{\bx}'`}</Equation> gives the direction of the
        arrow from <Equation>{String.raw`\bC'`}</Equation> through{" "}
        <Equation>{String.raw`\bx'`}</Equation>. These are the two viewing rays
        from Figure 1, each expressed using its own camera's axes.
      </p>
      <p>
        The <Equation>{String.raw`\parallel`}</Equation> symbol means the vectors
        lie along the same direction; their lengths can differ. These normalized
        image coordinates are not necessarily unit vectors, and they do not tell
        us the scene point's depth.
      </p>
      <p>
        <strong>Now describe all three arrows using camera 2's axes.</strong>{" "}
        The relative rotation <Equation>{String.raw`R`}</Equation> rotates directions
        from camera 1's axes into camera 2's. The translation{" "}
        <Equation>{String.raw`\mathbf{t}`}</Equation> is the position of camera 1's
        center in this second frame. Camera 2's center is at the origin.
      </p>
      <ul className="mb-5 ml-6 space-y-3 list-disc">
        <li>
          <strong>First viewing ray:</strong>{" "}
          <Equation>{String.raw`\overrightarrow{\bC\bx}`}</Equation> has direction{" "}
          <Equation>{String.raw`R\hat{\bx}`}</Equation>. This is the same ray
          direction as before, now expressed using camera 2's axes.
        </li>
        <li>
          <strong>Baseline:</strong>{" "}
          <Equation>{String.raw`\overrightarrow{\bC\bC'}`}</Equation> becomes{" "}
          <Equation>{String.raw`-\mathbf{t}`}</Equation>. Camera 1 is at{" "}
          <Equation>{String.raw`\mathbf{t}`}</Equation> and camera 2 is at zero,
          so this arrow points opposite to <Equation>{String.raw`\mathbf{t}`}</Equation>.
        </li>
        <li>
          <strong>Second viewing ray:</strong>{" "}
          <Equation>{String.raw`\overrightarrow{\bC'\bx'}`}</Equation> has direction{" "}
          <Equation>{String.raw`\hat{\bx}'`}</Equation>. It is already expressed
          in camera 2's axes.
        </li>
      </ul>
      <p>
        Substitute those three entries into the earlier equation. We can use
        ray directions because changing the arrows' nonzero lengths does not
        change whether the triple product is zero:
      </p>
      <Equation display>{String.raw`(R\hat{\bx}) \cdot
\bigl((-\mathbf{t}) \times \hat{\bx}'\bigr) = 0`}</Equation>
      <p>
        Next, move the second ray to the front. Reversing a cross product changes
        its sign, and cycling the three vectors in a scalar triple product leaves
        its value unchanged:
      </p>
      <Equation display>{String.raw`\begin{aligned}
0 &= (R\hat{\bx}) \cdot \bigl((-\mathbf{t}) \times \hat{\bx}'\bigr) \\
  &= (R\hat{\bx}) \cdot \bigl(\hat{\bx}' \times \mathbf{t}\bigr) \\
  &= \hat{\bx}' \cdot \bigl(\mathbf{t} \times R\hat{\bx}\bigr)
\end{aligned}`}</Equation>
      <p>
        We now have the second ray dotted with a normal to the plane containing
        the translation and first ray. This is still the original coplanarity condition.
      </p>
      <details className="my-8">
        <summary className="cursor-pointer font-bold">Check this using the rotation and translation equation</summary>
        <p className="mt-4">
          Let <Equation>{String.raw`\bX`}</Equation> and{" "}
          <Equation>{String.raw`\bX'`}</Equation> be the coordinates of the same
          scene point in the two camera frames. With the convention above:
        </p>
        <Equation display>{String.raw`\bX' = R\bX + \mathbf{t}`}</Equation>
        <p>
          A ray gives a direction but not the point's depth. For unknown depth
          scales <Equation>{String.raw`\lambda`}</Equation> and{" "}
          <Equation>{String.raw`\lambda'`}</Equation>, substitute:
        </p>
        <Equation display>{String.raw`\begin{gathered}
\bX = \lambda\hat{\bx}, \qquad \bX' = \lambda'\hat{\bx}' \\
\lambda'\hat{\bx}' = \lambda R\hat{\bx} + \mathbf{t}
\end{gathered}`}</Equation>
        <p>
          The second ray is a linear combination of the rotated first ray and
          the translation. All three therefore lie in one plane, exactly as
          the triple-product equation requires.
        </p>
      </details>
      <h3 className="mt-7 mb-4 text-[28px] font-bold leading-tight sm:text-[32px]">2. Group the camera motion into E</h3>
      <p>
        The next change is just algebra: replace the cross product with a matrix
        multiplication. For <Equation>{String.raw`\mathbf{t}=[t_1,t_2,t_3]^T`}</Equation>,
        define:
      </p>
      <Equation display>{String.raw`[\mathbf{t}]_\times =
\begin{bmatrix}
0 & -t_3 & t_2 \\
t_3 & 0 & -t_1 \\
-t_2 & t_1 & 0
\end{bmatrix}`}</Equation>
      <p>
        Multiplying by this matrix does the same thing as crossing with{" "}
        <Equation>{String.raw`\mathbf{t}`}</Equation>. In our equation:
      </p>
      <Equation display>{String.raw`\mathbf{t} \times (R\hat{\bx})
= [\mathbf{t}]_\times R\hat{\bx}`}</Equation>
      <p>
        A dot product can also be written as a transposed vector times a column.
        Make those two replacements, then give the middle pair of matrices the
        name <Equation>{String.raw`E`}</Equation>:
      </p>
      <Equation display>{String.raw`\begin{gathered}
\hat{\bx}'^T \underbrace{[\mathbf{t}]_\times R}_{E}\hat{\bx} = 0 \\
\hat{\bx}'^T E\hat{\bx} = 0
\end{gathered}`}</Equation>
      <p>
        This is the <strong>essential matrix</strong>. It contains the rotation
        and translation, and it acts on the normalized ray coordinates.
      </p>
      <h3 className="mt-7 mb-4 text-[28px] font-bold leading-tight sm:text-[32px]">3. Include the pixel conversion in F</h3>
      <p>
        We started with pixel matches, so put{" "}
        <Equation>{String.raw`\hat{\bx}=K^{-1}\bx`}</Equation> and{" "}
        <Equation>{String.raw`\hat{\bx}'=K'^{-1}\bx'`}</Equation> back into the
        equation we just obtained:
      </p>
      <Equation display>{String.raw`(K'^{-1}\bx')^T E(K^{-1}\bx) = 0`}</Equation>
      <p>
        Transposing a product reverses its order. This explains the inverse
        transpose on the left:
      </p>
      <Equation display>{String.raw`(K'^{-1}\bx')^T = \bx'^T K'^{-T}`}</Equation>
      <p>
        Now group everything between the two pixel points into one matrix,
        called <Equation>{String.raw`F`}</Equation>:
      </p>
      <Equation display>{String.raw`\begin{gathered}
\bx'^T \underbrace{K'^{-T} E K^{-1}}_{F}\bx = 0 \\
\bx'^T F\bx = 0
\end{gathered}`}</Equation>
      <p>
        <strong>This is the equation we wanted.</strong> The first equation used
        three arrows in 3D. The last equation uses two pixel points. Both say
        that the viewing rays and the baseline lie in one plane.
      </p>
      <ul className="mb-5 ml-6 space-y-3 list-disc">
        <li>
          <Equation>{String.raw`E=[\mathbf{t}]_\times R`}</Equation> groups the
          camera motion and works with normalized coordinates.
        </li>
        <li>
          <Equation>{String.raw`F=K'^{-T} E K^{-1}`}</Equation> also includes the
          pixel conversions, so it works directly with pixel coordinates.
        </li>
      </ul>
      <h3 className="mt-7 mb-4 text-[28px] font-bold leading-tight sm:text-[32px]">Where does the epipolar line fit?</h3>
      <p>
        Look at the final equation in two steps. First compute{" "}
        <Equation>{String.raw`F\bx`}</Equation>. Its three entries are the
        coefficients of the epipolar line in the second image:
      </p>
      <Equation display>{String.raw`\mathbf{l}' = F\bx = \begin{bmatrix} a \\ b \\ c \end{bmatrix}`}</Equation>
      <p>
        Then multiply by the matching pixel point. The result is exactly the
        familiar equation for a point lying on a line:
      </p>
      <Equation display>{String.raw`\bx'^T\mathbf{l}' = ax' + by' + c = 0`}</Equation>
      <p>
        We used camera motion to explain the form of <Equation>{String.raw`F`}</Equation>.
        In practice, we can estimate its entries from pixel matches without
        first knowing the motion or calibration. The next section turns each
        match into one equation in those nine unknown entries.
      </p>
      <h3 className="mt-7 mb-4 text-[28px] font-bold leading-tight sm:text-[32px]">
        Deriving the System of Equations (
        <Equation>{String.raw`A\mathbf{f}=0`}</Equation>)
      </h3>
      <p>
        To find <Equation>{String.raw`F`}</Equation>, we need to solve for its 9
        entries. We can write the matrix product explicitly for a single pair of points:
      </p>
      <Equation
        display
      >{String.raw`\begin{bmatrix} x'_i & y'_i & 1 \end{bmatrix} 
\begin{bmatrix} f_{11} & f_{12} & f_{13} \\ f_{21} & f_{22} & f_{23} \\ f_{31} & f_{32} & f_{33} \end{bmatrix} 
\begin{bmatrix} x_i \\ y_i \\ 1 \end{bmatrix} = 0`}</Equation>
      <p>
        First multiply the matrix by the column. Each row multiplies the column
        entry by entry, then adds the three products:
      </p>
      <Equation display>{String.raw`F\bx_i =
\begin{bmatrix}
f_{11}x_i + f_{12}y_i + f_{13} \\
f_{21}x_i + f_{22}y_i + f_{23} \\
f_{31}x_i + f_{32}y_i + f_{33}
\end{bmatrix}`}</Equation>
      <p>
        Now multiply by the row on the left. The first entry gets multiplied by
        <Equation>{String.raw`\,x'_i`}</Equation>, the second by{" "}
        <Equation>{String.raw`y'_i`}</Equation>, and the third by 1:
      </p>
      <Equation display>{String.raw`\begin{aligned}
x'_i(f_{11}x_i + f_{12}y_i + f_{13}) \\
{}+ y'_i(f_{21}x_i + f_{22}y_i + f_{23}) \\
{}+ (f_{31}x_i + f_{32}y_i + f_{33}) &= 0
\end{aligned}`}</Equation>
      <p>
        Distribute those multipliers to get nine terms, one for each entry of
        <Equation>{String.raw`\,F`}</Equation>. We order the unknowns column by column:
        <Equation>{String.raw`\,f_{11}, f_{21}, f_{31}`}</Equation> first, then the
        second column, then the third. Reordering a sum does not change its value:
      </p>
      <Equation
        display
      >{String.raw`\begin{aligned}
x_i x'_i f_{11} + x_i y'_i f_{21} + x_i f_{31} \\
{}+ y_i x'_i f_{12} + y_i y'_i f_{22} + y_i f_{32} \\
{}+ x'_i f_{13} + y'_i f_{23} + f_{33} &= 0
\end{aligned}`}</Equation>
      <p>
        The image coordinates are known; the nine entries of{" "}
        <Equation>{String.raw`F`}</Equation> are unknown. Collecting their
        coefficients gives one row of <Equation>{String.raw`A`}</Equation>:
      </p>
      <Equation display>{String.raw`\mathbf{a}_i^T =
\begin{bmatrix} x_i x'_i & x_i y'_i & x_i & y_i x'_i & y_i y'_i & y_i & x'_i & y'_i & 1 \end{bmatrix}`}</Equation>
      <details className="my-8">
        <summary className="cursor-pointer font-bold">Check the multiplication with numbers</summary>
        <p className="mt-4">
          Take the following matrix and points. This is an arithmetic check;
          the points were not chosen to satisfy the epipolar constraint.
        </p>
        <Equation display>{String.raw`\begin{gathered}
F = \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & 9 \end{bmatrix} \\
\bx = \begin{bmatrix} 2 \\ 3 \\ 1 \end{bmatrix}, \qquad
\bx' = \begin{bmatrix} 5 \\ 7 \\ 1 \end{bmatrix}
\end{gathered}`}</Equation>
        <p>Multiplying the matrix and vectors gives:</p>
        <Equation display>{String.raw`\begin{gathered}
F\bx = \begin{bmatrix} 11 \\ 29 \\ 47 \end{bmatrix} \\
\bx'^T F\bx = 5(11) + 7(29) + 47 = 305
\end{gathered}`}</Equation>
        <p>Using the nine terms in column order gives the same result:</p>
        <Equation display>{String.raw`\begin{aligned}
&10 + 56 + 14 \\
&{}+ 30 + 105 + 24 \\
&{}+ 15 + 42 + 9 = 305
\end{aligned}`}</Equation>
        <p>
          The two calculations agree. The nonzero result means this point pair
          does not satisfy this matrix's epipolar constraint.
        </p>
      </details>
      <p>
        If we have <Equation>{String.raw`m`}</Equation> correspondences (where{" "}
        <Equation>{String.raw`m \geq 8`}</Equation>
        ), we can stack these linear equations into a large matrix system. By
        defining a vector <Equation>{String.raw`\mathbf{f}`}</Equation> that
        contains the entries of the matrix <Equation>{String.raw`F`}</Equation>,
        we can rewrite the system as:
      </p>
      <Equation display>{String.raw`\begin{bmatrix} 
x_1 x'_1 & x_1 y'_1 & x_1 & y_1 x'_1 & y_1 y'_1 & y_1 & x'_1 & y'_1 & 1 \\
\vdots & \vdots & \vdots & \vdots & \vdots & \vdots & \vdots & \vdots & \vdots \\
x_m x'_m & x_m y'_m & x_m & y_m x'_m & y_m y'_m & y_m & x'_m & y'_m & 1 
\end{bmatrix}
\begin{bmatrix} f_{11} \\ f_{21} \\ f_{31} \\ f_{12} \\ f_{22} \\ f_{32} \\ f_{13} \\ f_{23} \\ f_{33} \end{bmatrix} 
= \mathbf{0}`}</Equation>
      <p>
        This can be written compactly as{" "}
        <Equation>{String.raw`A\mathbf{f} = 0`}</Equation>.
      </p>
      <p>
        Multiplying every entry of <Equation>{String.raw`F`}</Equation> by the same
        nonzero scale leaves the constraint unchanged. Its nine entries therefore
        have eight independent parameters before enforcing rank 2. The linear
        eight-point method needs at least eight independent equations from
        matches in a nondegenerate configuration.
      </p>
      <p>
        With exactly eight independent rows, the eight-by-nine matrix{" "}
        <Equation>{String.raw`A`}</Equation> has a nonzero null vector even when
        the image coordinates contain noise. With more noisy correspondences,
        an exact nonzero solution generally does not exist. We then find the{" "}
        <Equation>{String.raw`\mathbf{f}`}</Equation> that makes the result as
        close to zero as possible. We also fix the length of{" "}
        <Equation>{String.raw`\mathbf{f}`}</Equation> to 1 so the solution isn't
        just a vector of all zeros.
      </p>
      <Equation
        display
      >{String.raw`\min \| A\mathbf{f} \| \quad \text{subject to} \quad \| \mathbf{f} \| = 1`}</Equation>
      <h2 className={heading}>Mathematical Proof: Solving via SVD</h2>
      <p>
        The proof below uses <Equation>{String.raw`\mathbf{x}`}</Equation> for a
        generic unknown vector. In our application, that vector is{" "}
        <Equation>{String.raw`\mathbf{f}`}</Equation>, the nine entries of{" "}
        <Equation>{String.raw`F`}</Equation>, not an image point. The last column
        of the full <Equation>{String.raw`9 \times 9`}</Equation> matrix{" "}
        <Equation>{String.raw`V`}</Equation> gives the required direction. With
        exactly eight rows, we can append a zero row to{" "}
        <Equation>{String.raw`A`}</Equation> for the proof. This leaves the error
        norm unchanged and makes the ninth, zero singular value explicit.
      </p>
      <h3 className="mt-7 mb-4 text-[28px] font-bold leading-tight sm:text-[32px]">Understand SVD geometrically</h3>
      <p>
        We have already known that{" "}
        <Equation>{String.raw`A = U \Sigma V^T`}</Equation>. Geometrically,
        multiplying a vector <Equation>{String.raw`\mathbf{x}`}</Equation> by{" "}
        <Equation>{String.raw`A`}</Equation> happens in three steps:
      </p>
      <ol className="mb-5 ml-6 space-y-3 list-decimal">
        <li>
          <strong>
            Rotate (<Equation>{String.raw`V^T`}</Equation>
            ):
          </strong>{" "}
          The matrix <Equation>{String.raw`V^T`}</Equation> is orthogonal. It
          takes the input vector <Equation>{String.raw`\mathbf{x}`}</Equation>{" "}
          and rotates it to a new coordinate system.
        </li>
        <li>
          <strong>
            Stretch (<Equation>{String.raw`\Sigma`}</Equation>
            ):
          </strong>{" "}
          The matrix <Equation>{String.raw`\Sigma`}</Equation> is diagonal. It
          stretches the vector along the coordinate axes. The amount of
          stretching is determined by the singular values{" "}
          <Equation>{String.raw`\sigma_1 \geq \sigma_2 \geq \dots \geq \sigma_n \geq 0`}</Equation>
          . When there are more rows than columns, any extra zero rows of{" "}
          <Equation>{String.raw`\Sigma`}</Equation> are omitted from the stretching
          diagram below.
        </li>
        <li>
          <strong>
            Rotate (<Equation>{String.raw`U`}</Equation>
            ):
          </strong>{" "}
          The matrix <Equation>{String.raw`U`}</Equation> is orthogonal. It
          rotates the stretched vector one final time.
        </li>
      </ol>
      <p>
        We want the final result <Equation>{String.raw`A\mathbf{x}`}</Equation>{" "}
        to be as small as possible.
      </p>
      <h3 className="mt-7 mb-4 text-[28px] font-bold leading-tight sm:text-[32px]">Proof</h3>
      <p>
        <strong>
          Step 1: Ignore the Final Rotation (
          <Equation>{String.raw`U`}</Equation>)
        </strong>{" "}
        We have:
      </p>
      <Equation
        display
      >{String.raw`\| A\mathbf{x} \| = \| U \Sigma V^T \mathbf{x} \|`}</Equation>
      <p>
        The matrix <Equation>{String.raw`U`}</Equation> is orthogonal. A
        property of orthogonal matrices is that they act like rotation or reflection matrix.
        That means they change the direction of a vector but
        not the length. Therefore, for any vector{" "}
        <Equation>{String.raw`\mathbf{z}`}</Equation>,{" "}
        <Equation>{String.raw`\| U\mathbf{z} \| = \| \mathbf{z} \|`}</Equation>.
      </p>
      <Equation
        display
      >{String.raw`\| U (\Sigma V^T \mathbf{x}) \| = \| \Sigma V^T \mathbf{x} \|`}</Equation>
      <p>
        <strong>Step 2: Change Variables</strong>. Let's define a temporary
        vector <Equation>{String.raw`\mathbf{y} = V^T \mathbf{x}`}</Equation>.
        Since <Equation>{String.raw`V`}</Equation> is orthogonal,{" "}
        <Equation>{String.raw`V^T`}</Equation> is also orthogonal. This means{" "}
        <Equation>{String.raw`V^T`}</Equation> just rotates{" "}
        <Equation>{String.raw`\mathbf{x}`}</Equation>. Since we are constrained
        to unit vectors (<Equation>{String.raw`\| \mathbf{x} \| = 1`}</Equation>
        ), and rotation preserves length, our new vector{" "}
        <Equation>{String.raw`\mathbf{y}`}</Equation> is also a unit vector (
        <Equation>{String.raw`\| \mathbf{y} \| = 1`}</Equation>
        ).
      </p>
      <p>
        Our problem is now much simpler: Minimize{" "}
        <Equation>{String.raw`\| \Sigma \mathbf{y} \|`}</Equation>.
      </p>
      <p>
        <strong>
          Step 3: Analyze the Stretching (
          <Equation>{String.raw`\Sigma`}</Equation>)
        </strong>{" "}
      </p>
      <Equation display>{String.raw`\Sigma \mathbf{y} = 
\begin{bmatrix}
\sigma_1 & 0 & \dots & 0 \\
0 & \sigma_2 & \dots & 0 \\
\vdots & \vdots & \ddots & \vdots \\
0 & 0 & \dots & \sigma_n
\end{bmatrix}
\begin{bmatrix} y_1 \\ y_2 \\ \vdots \\ y_n \end{bmatrix}
=
\begin{bmatrix} \sigma_1 y_1 \\ \sigma_2 y_2 \\ \vdots \\ \sigma_n y_n \end{bmatrix}`}</Equation>
      <p>
        The squared length of this resulting vector is the sum of its squared
        components:
      </p>
      <Equation
        display
      >{String.raw`\| \Sigma \mathbf{y} \|^2 = (\sigma_1 y_1)^2 + (\sigma_2 y_2)^2 + \dots + (\sigma_n y_n)^2`}</Equation>
      <p>
        We want to make this sum as small as possible. We know the singular
        values are sorted in descending order:{" "}
        <Equation>{String.raw`\sigma_1`}</Equation> is the largest (maximum stretch) 
        and <Equation>{String.raw`\sigma_n`}</Equation> is the smallest
        (minimum stretch). We also know that{" "}
        <Equation>{String.raw`y_1^2 + y_2^2 + \dots + y_n^2 = 1`}</Equation>{" "}
        (because <Equation>{String.raw`\mathbf{y}`}</Equation> is a unit
        vector).
      </p>
      <p>
        To get the smallest total sum, we should put all of our weight into
        the term multiplied by the smallest number.
      </p>
      <ul className="mb-5 ml-6 space-y-3 list-disc">
        <li>
          If we choose <Equation>{String.raw`y_1=1`}</Equation>, the result is{" "}
          <Equation>{String.raw`\sigma_1^2`}</Equation> (The Maximum).
        </li>
        <li>
          If we choose <Equation>{String.raw`y_n=1`}</Equation>, the result is{" "}
          <Equation>{String.raw`\sigma_n^2`}</Equation> (The Minimum).
        </li>
      </ul>
      <p>
        Therefore, the optimal vector{" "}
        <Equation>{String.raw`\mathbf{y}`}</Equation> is all zeros, except for a
        1 in the last position:
      </p>
      <Equation
        display
      >{String.raw`\mathbf{y}_{optimal} = \begin{bmatrix} 0 & 0 & \dots & 1 \end{bmatrix}^T`}</Equation>
      <p>
        <strong>Step 4: Convert back to</strong>{" "}
        <Equation>{String.raw`\mathbf{x}`}</Equation>. 
        We found the best <Equation>{String.raw`\mathbf{y}`}</Equation>,
        but we need to find the original{" "}
        <Equation>{String.raw`\mathbf{x}`}</Equation>. We defined{" "}
        <Equation>{String.raw`\mathbf{y} = V^T \mathbf{x}`}</Equation>.
        Therefore, x is
      </p>
      <Equation display>{String.raw`\mathbf{x} = V \mathbf{y}`}</Equation>
      <Equation display>{String.raw`\mathbf{x} = 
\begin{bmatrix}
| & | & & | \\
\mathbf{v}_1 & \mathbf{v}_2 & \dots & \mathbf{v}_n \\
| & | & & |
\end{bmatrix}
\begin{bmatrix} 0 \\ 0 \\ \vdots \\ 1 \end{bmatrix}`}</Equation>
      <p>
        By the rules of matrix-vector multiplication, this operation selects the
        last column of the matrix <Equation>{String.raw`V`}</Equation>.
      </p>
      <p>
        <strong>Conclusion:</strong> The vector{" "}
        <Equation>{String.raw`\mathbf{x}`}</Equation> that minimizes the error
        is the last column of <Equation>{String.raw`V`}</Equation>.
      </p>
      <h2 className={heading}>Rank Enforcement</h2>
      <p>
        After using the theorem above, we have a solution for{" "}
        <Equation>{String.raw`\mathbf{f}`}</Equation> and reshape it into a{" "}
        <Equation>{String.raw`3 \times 3`}</Equation> matrix{" "}
        <Equation>{String.raw`F`}</Equation>. However, we have one problem.
      </p>
      <h3 className="mt-7 mb-4 text-[28px] font-bold leading-tight sm:text-[32px]">The Rank 2 Constraint</h3>
      <p>
        Return to the formula we derived from rotation and translation:
      </p>
      <Equation display>{String.raw`F = K'^{-T}[\mathbf{t}]_\times R K^{-1}`}</Equation>
      <p>
        For nonzero translation, crossing a vector parallel to{" "}
        <Equation>{String.raw`\mathbf{t}`}</Equation> with{" "}
        <Equation>{String.raw`\mathbf{t}`}</Equation> gives zero. No other
        direction maps to zero, so the cross-product matrix loses exactly one
        dimension and has rank 2. The rotation and intrinsic matrices are
        invertible, so multiplying by them preserves that rank:
      </p>
      <Equation display>{String.raw`\begin{gathered}
[\mathbf{t}]_\times\mathbf{t} = \mathbf{0} \\
\operatorname{rank}(F) = \operatorname{rank}([\mathbf{t}]_\times) = 2
\end{gathered}`}</Equation>
      <p>
        This is why one singular value must be zero. It comes from the camera
        geometry, not an arbitrary adjustment to the matrix. Pure rotation,
        with zero translation, is a degenerate case: there is no baseline to
        recover depth from parallax.
      </p>
      <p>
        However, because our input images have noise (pixels aren't perfect),
        the <Equation>{String.raw`F`}</Equation> we estimated from the point matches will
        likely be Rank 3 (Full Rank). It will satisfy the algebraic least squares, but it won't
        satisfy the strict geometry (the epipolar lines won't intersect
        perfectly at one point).
      </p>
      <h3 className="mt-7 mb-4 text-[28px] font-bold leading-tight sm:text-[32px]">The Eckart-Young-Mirsky Theorem</h3>
      <p>
        We need to find a new matrix <Equation>{String.raw`F'`}</Equation> that
        is Rank 2 but is as close as possible to our calculated{" "}
        <Equation>{String.raw`F`}</Equation>. The Eckart-Young-Mirsky theorem
        tells us exactly how to do this:
      </p>
      <ol className="mb-5 ml-6 space-y-3 list-decimal">
        <li>
          <strong>Decompose:</strong> Take the SVD of our noisy matrix{" "}
          <Equation>{String.raw`F`}</Equation>:{" "}
          <Equation>{String.raw`F = U \Sigma V^T`}</Equation>.
        </li>
        <li>
          <strong>
            Inspect <Equation>{String.raw`\Sigma`}</Equation>:
          </strong>{" "}
          The diagonal matrix will look like this:
          <Equation display>{String.raw`\Sigma = \operatorname{diag}(\sigma_1, \sigma_2, \sigma_3)`}</Equation>
          Because of
          noise, <Equation>{String.raw`\sigma_3`}</Equation> will be a small
          non-zero number (e.g., 0.005). This tiny number is what makes the
          matrix Rank 3.
        </li>
        <li>
          <strong>Truncate:</strong> We manually set the smallest singular value
          to zero.
          <Equation display>{String.raw`\Sigma' = \operatorname{diag}(\sigma_1, \sigma_2, 0)`}</Equation>
        </li>
        <li>
          <strong>Reconstruct:</strong> We multiply the matrices back together:{" "}
          <Equation>{String.raw`F' = U \Sigma' V^T`}</Equation>.
        </li>
      </ol>
      <p>
        This is our second use of SVD. The first finds the nine entries that best
        fit the linear equations. The second enforces the rank required by the
        camera geometry. If the cameras are calibrated, we can use the earlier
        relation with the corrected matrix <Equation>{String.raw`F'`}</Equation>{" "}
        to estimate the essential matrix:
      </p>
      <Equation display>{String.raw`\widehat E = K'^T F' K`}</Equation>
      <p>
        This result, <Equation>{String.raw`F'`}</Equation>, is the Fundamental
        Matrix used in Structure from Motion. Of course this is just the very basic idea.
        We then need to use RANSAC again for outlier rejection to find best F, then estimate the
        essential matrix, then the triangulation, then PnP, and a lot of optimizations.
        However, I will not include those in this paper because we only focus on the
        core math, not the programming aspect.
      </p>
      <h2 className={heading}>Conclusion</h2>
      <p>
        SfM is a very interesting application of Linear Algebra. The
        math behind is so beautiful, especially for the minimization problem. It is also very
        convenient when we can just decompose, force an entry in the diagonal matrix to be
        zero, and multiply everything back. After taking linear
        algebra course, I finally understand deeply what is
        happening behind the libraries I imported in my code.
      </p>
      <h2 className={heading}>References</h2>
      <p>
        [1] University of Maryland. (2022).{" "}
        <em>CMSC733 Project 3: Build your own SfM!</em> Retrieved from{" "}
        <Link className="break-all" href="https://cmsc733.github.io/2022/proj/p3/">
          https://cmsc733.github.io/2022/proj/p3/
        </Link>
      </p>
      <div className="my-7">
        <Link href="/#robotics">Back</Link>
      </div>
    </article>
  );
}
