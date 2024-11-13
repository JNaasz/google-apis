interface SheetConfigData {
	sheetName: string;
	columns: string;
}

interface SheetConfigMap {
	[key: string]: SheetConfigData;
}

const sheetConfigMap: SheetConfigMap = {
  "dog": {
    sheetName: "Sheet1",
    columns: "A1:D5",
  },
  "plants": {
    sheetName: "Sheet2",
    columns: "A1:D5",
  }
};

export default sheetConfigMap;