interface SheetConfigData {
	sheetName: string;
	columns: string;
  headers: string[] | null
}

interface SheetConfigMap {
	[key: string]: SheetConfigData;
}

const sheetConfigMap: SheetConfigMap = {
  "dog": {
    sheetName: "Sheet1",
    columns: "A1:D5",
    headers: null,
  },
  "plants": {
    sheetName: "Sheet2",
    columns: "A1:D5",
    headers: null,
  }
};

export default sheetConfigMap;