export const calculateIssueAge = (createdOn) => {
  const createdDate = new Date(createdOn);
  const currentDate = new Date();
  const differenceInTime = currentDate - createdDate;
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
  return differenceInDays;
};

export const exportToCSV = (data, filename) => {
  const csvContent = "data:text/csv;charset=utf-8," 
    + Object.keys(data[0]).join(",") + "\n"
    + data.map(row => Object.values(row).join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};