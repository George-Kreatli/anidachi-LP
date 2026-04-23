import { Check, X, Minus } from "lucide-react";

interface CompareRow {
  feature: string;
  anidachi: "yes" | "no" | "partial" | string;
  teleparty: "yes" | "no" | "partial" | string;
  crunchyrollParty: "yes" | "no" | "partial" | string;
  discord: "yes" | "no" | "partial" | string;
}

const rows: CompareRow[] = [
  {
    feature: "Crunchyroll sync",
    anidachi: "yes",
    teleparty: "yes",
    crunchyrollParty: "yes",
    discord: "partial",
  },
  {
    feature: "Asynchronous watching",
    anidachi: "yes",
    teleparty: "no",
    crunchyrollParty: "no",
    discord: "no",
  },
  {
    feature: "Auto anime detection",
    anidachi: "yes",
    teleparty: "no",
    crunchyrollParty: "no",
    discord: "no",
  },
  {
    feature: "Real-time chat",
    anidachi: "yes",
    teleparty: "yes",
    crunchyrollParty: "yes",
    discord: "yes",
  },
  {
    feature: "Watch history tracking",
    anidachi: "yes",
    teleparty: "no",
    crunchyrollParty: "no",
    discord: "no",
  },
  {
    feature: "Episode progress per user",
    anidachi: "yes",
    teleparty: "no",
    crunchyrollParty: "no",
    discord: "no",
  },
  {
    feature: "Free tier available",
    anidachi: "no",
    teleparty: "yes",
    crunchyrollParty: "yes",
    discord: "yes",
  },
  {
    feature: "No account required for extension",
    anidachi: "no",
    teleparty: "yes",
    crunchyrollParty: "yes",
    discord: "no",
  },
];

function CellIcon({ value }: { value: string }) {
  if (value === "yes")
    return <Check className="h-5 w-5 text-green-600 mx-auto" aria-label="Yes" />;
  if (value === "no")
    return <X className="h-5 w-5 text-red-400 mx-auto" aria-label="No" />;
  if (value === "partial")
    return <Minus className="h-5 w-5 text-amber-500 mx-auto" aria-label="Partial" />;
  return <span className="text-sm text-gray-600">{value}</span>;
}

export function CompareTable() {
  return (
    <section id="compare" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How AniDachi Compares
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how AniDachi stacks up against other ways to watch anime
            with friends.
          </p>
        </div>
        <div className="max-w-4xl mx-auto overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">
                  Feature
                </th>
                <th className="py-3 px-4 font-semibold text-purple-700 bg-purple-50 rounded-t-lg">
                  AniDachi
                </th>
                <th className="py-3 px-4 font-semibold text-gray-700">
                  Teleparty
                </th>
                <th className="py-3 px-4 font-semibold text-gray-700">
                  CR Party
                </th>
                <th className="py-3 px-4 font-semibold text-gray-700">
                  Discord
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={i}
                  className={`border-b border-gray-100 ${
                    i % 2 === 0 ? "" : "bg-gray-50/50"
                  }`}
                >
                  <td className="py-3 px-4 text-gray-800 font-medium">
                    {row.feature}
                  </td>
                  <td className="py-3 px-4 text-center bg-purple-50/50">
                    <CellIcon value={row.anidachi} />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <CellIcon value={row.teleparty} />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <CellIcon value={row.crunchyrollParty} />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <CellIcon value={row.discord} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
