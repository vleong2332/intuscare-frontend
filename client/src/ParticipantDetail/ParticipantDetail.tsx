import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";

import { Card } from "../Card";
import { Diagnosis, ICD10SearchResponse } from "../types";
import { useEffect, useState } from "react";

export type State = {
  name: string;
  diagnosis: Diagnosis[]
}

export default function ParticipantDetail(): JSX.Element {
  const location = useLocation();
  const state: State = location.state;
  
  const navigate = useNavigate();

  const [codeLookup, setCodeLookup] = useState<Record<string, string | undefined>>({});

  // Look up the dx descriptions here instead of in the loader because can't access the state there.
  // TODO: Use something like react-query for more sophisticated loading and error-handling strategy.
  useEffect(() => {
    // TODO: A more sophisticated and optimized approach?
    state.diagnosis.forEach(async (dx) => {
      const response = await fetch(`https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search?terms=${dx.icdCode}&df=name`);
      const data: ICD10SearchResponse = await response.json();
      // Multiple results possible. Just take the first one for this exercise.
      setCodeLookup(prev => ({ ...prev, [dx.icdCode]: data[3][0][0] }))
    });
  }, [state.diagnosis])

  console.log("code lookup", codeLookup)

  return (
    <div className="flex flex-row">
      <div className="flex-[0_0_60px]">
        <Button variant="contained" size="large" onClick={() => navigate(-1)}>&lt;&nbsp;&nbsp;Back</Button>
      </div>
      <div className="flex-auto flex justify-center">
        <Card>
          <div className="w-[686px]">
            <Typography variant="h2">{state.name}</Typography>
            <hr />
            <Typography variant="body1" mt={2} color="GrayText">ICD Codes ({state.diagnosis.length})</Typography>
            <ul>
              {state.diagnosis.map((dx, index) => (
                // TODO: Using index because random dx can generate the same code.
                <li className="px-4 py-6 bg-gray-200 m-4 flex justify-between" key={index}>
                  <Typography variant="body1">{codeLookup[dx.icdCode] ?? "Looking up code..."}</Typography>
                  <Typography variant="body1" color="GrayText">{dx.icdCode}</Typography>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
      <div className="flex-[0_0_60px]"></div>
    </div>
  );
}
