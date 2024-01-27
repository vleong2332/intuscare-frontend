// For this exercise, just put non-component type defs here. Can organize later.

export type Participant = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: "MALE" | "FEMALE" | "NON-BINARY";
  phoneNumber: number;
  patientNotes: string;
  diagnoses: Diagnosis[];
};

export type Diagnosis = {
  icdCode: string;
  timestamp: number;
};

export type ParticipantDetailPageState = {
  name: string;
  diagnosis: Diagnosis[];
};

/**
 * [0] - The total number of results on the server, which can be more than the number of results returned. This reported total number of results may also be significantly less than the actual number of results and is limited to 10,000, which may significantly improve the service response time.
 * [1] - An array of codes for the returned items. (This is the field specified with the cf query parameter above.)
 * [2] - A hash of the "extra" data requested via the "ef" query parameter above. The keys on the hash are the fields (or their requested aliases) named in the "ef" parameter, and the value for a field is an array of that field's values in the same order as the returned codes.
 * [3] - An array, with one element for each returned code, where each element is an array of the display strings specified with the "df" query parameter.
 *
 * Example: Searching for "https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search?terms=F21&df=name" yields this response:
 * [
    1,
    ["F21"],
    null,
    [
      ["Schizotypal disorder"]
    ]
]
 */
export type ICD10SearchResponse = [number, string[], string | null, [string?, string?][]]
