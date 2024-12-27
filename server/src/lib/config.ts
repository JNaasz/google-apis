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
    columns: "A1:Z100", // can adjust 100 to include more rows. If left as 'Z' it will default to Z995 or smth
    headers: null,
  },
  "plants": {
    sheetName: "Sheet2",
    columns: "A1:D5",
    headers: null,
  }
};

export default sheetConfigMap;