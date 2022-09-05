const { masterFetcher } = require("./fetcher");
const qs = require("qs");

module.exports.getEmployees = (employeeIds = []) => {
  const currentUrl = qs.stringify(
    { pegawai_id: employeeIds },
    { arrayFormat: "brackets" }
  );

  const url = `/employees?${currentUrl}`;
  return masterFetcher.get(url).then((res) => res?.data);
};
