import Typography from "@mui/material/Typography";

import { Card } from "../Card";
import { Participant } from "../types";

export type Sort = {
  column: string;
  direction: "asc" | "desc";
}

export const initialSortDirection: Sort["direction"] = "asc";

export type Column<T> = {
  name: string;
  cell: (entry: T) => string;
  flexBasis?: number;
  onSortChange?: (sort: Sort) => void;
};

type ListProps<T extends Record<string, any>> = {
  participants?: Participant[];
  columns: Column<T>[];
  data: (T & { key: string, onClick?: () => void })[];
  sort?: Sort;
};

export default function List<T extends Record<string, any>>(props: ListProps<T>): JSX.Element {
  const { columns, data, sort } = props;

  return (
    <Card>
      <div className="flex flex-row mx-4 mb-1">
        {columns.map(col => (
          <button
            key={col.name}
            className={`flex items-center ${typeof col.flexBasis === "number" ? `flex-0` : "flex-auto"}`}
            style={typeof col.flexBasis === "number" ? { flexBasis: col.flexBasis } : undefined}
            onClick={() => col.onSortChange && col.onSortChange({
              column: col.name,
              direction: col.name !== sort?.column ? initialSortDirection : sort.direction === "asc" ? "desc" : "asc"  })
            }
          >
            <Typography variant="body1" color="GrayText">{col.name}</Typography>
            {col.name === sort?.column && (
              <img
                className="ml-1"
                src={`/assets/orderFilter_${sort.direction === "asc" ? "Down" : "Up"}.png`}
                alt={sort.direction ? "Chevron pointing up" : "Chevron pointing down"}
              />
            )}
          </button>
        ))}
      </div>
      <hr />
      <ul>
        {data.map(row => (
          <li className="my-3" key={row.key}>
            <Card onClick={row.onClick}>
              <div className="flex flex-row">
                {columns.map(col => (
                  <div
                    key={col.name}
                    className={typeof col.flexBasis === "number" ? `flex-0` : "flex-auto"}
                    style={typeof col.flexBasis === "number" ? { flexBasis: col.flexBasis } : undefined}
                  >
                    <Typography variant="body1">{col.cell(row)}</Typography>
                  </div>
                ))}
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </Card>
  );
}
