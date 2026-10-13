import { results } from "../lance-results";

export function ResultsTable() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-muted">
        Bold indicates the better point estimate. n is the number of evaluated rows.
      </p>
      {[
        "R^2 | higher is better",
        "MAE | lower is better",
        "P1mag (%) | higher is better",
      ].map((label, index) => (
        <table
          key={label}
          className="w-full text-base tabular-nums sm:text-lg [&_th]:px-1 [&_th]:py-2 [&_td]:px-1 [&_td]:py-2"
        >
          <caption className="pb-3 text-left font-bold">{label}</caption>
          <thead className="border-y border-ink text-right">
            <tr>
              <th scope="col" className="text-left">
                Target / cohort
              </th>
              <th scope="col">CatPred</th>
              <th scope="col">LANCE-7R</th>
            </tr>
          </thead>
          <tbody className="text-right">
            {results.map((row) => {
              const metric = row.metrics[index];
              return (
                <tr
                  key={row.target + row.cohort}
                  className={
                    row.cohort === "Heldout"
                      ? "border-t border-ink bg-highlight"
                      : "border-t border-rule"
                  }
                >
                  <th scope="row" className="text-left font-normal">
                    {row.target} | {row.cohort}
                    <span className="block text-xs text-muted">
                      n = {row.n.toLocaleString("en-US")}
                    </span>
                  </th>
                  <td>
                    {metric.favorable ? (
                      metric.catpred
                    ) : (
                      <strong>{metric.catpred}</strong>
                    )}
                  </td>
                  <td>
                    {metric.favorable ? <strong>{metric.lance}</strong> : metric.lance}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ))}
    </div>
  );
}
