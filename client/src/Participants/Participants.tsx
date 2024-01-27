import { useMemo, useState } from "react";
import { Typography } from "@mui/material";
import { useLoaderData, useNavigate } from "react-router-dom";

import { List, initialSortDirection } from "../List";
import type { Column, Sort } from "../List";
import { ParticipantDetailPageState } from "../types";

import { loader } from "./loader";

export default function Participant(): JSX.Element {
  // TODO: Consider react-router-typesafe?
  const { participants } = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const [sort, setSort] = useState<Sort>({ column: "ICD Codes", direction: initialSortDirection});

  const navigate = useNavigate();

  const data = useMemo(() => {
    return participants.map((ppt, index) => {
      const detailPageState: ParticipantDetailPageState = {
        name: `${ppt.firstName} ${ppt.lastName}`,
        diagnosis: ppt.diagnoses
      };

      return {
        ...ppt,
        key: ppt.firstName+ppt.lastName+ppt.dateOfBirth,
        // Use index because record has no id.
        onClick: () => navigate(`/ppts/${index}`, { state: detailPageState }),
      }
    })
  }, [navigate, participants]);

  const sortedData = useMemo(() => {
    return data.sort((a, b) => {
      if (sort.column === "Participant Name") {
        const aName = `${a.firstName} ${a.lastName}`;
        const bName = `${b.firstName} ${b.lastName}`;
        return (aName.localeCompare(bName)) * (sort.direction === "asc" ? -1 : 1) 
      }
      if (sort.column === "ICD Codes") {
        const aLength = a.diagnoses.length;
        const bLength = b.diagnoses.length;
        return (aLength - bLength) * (sort.direction === "asc" ? -1 : 1)
      }
      return 0;
    })
  }, [data, sort.column, sort.direction]);

  const columns: Column<typeof data[number]>[] = useMemo(() => [
    {
      name: "Participant Name",
      cell: (ppt) => `${ppt.firstName} ${ppt.lastName}`,
      onSortChange: setSort
    },
    {
      name: "ICD Codes",
      cell: (ppt) => ppt.diagnoses.length.toString(),
      flexBasis: 280,
      onSortChange: setSort
    }
  ], []);

  return (
    <div>
      <Typography variant="h2" mb={4} color="">Participants</Typography>
      <List data={sortedData} columns={columns} sort={sort}/>
    </div>
  );
}
