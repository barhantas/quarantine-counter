import moment from "moment";

export const utilizeStartDate = (startDate) => {
  const now = moment();
  const utilized = moment(startDate)
    .hour(now.hour())
    .minute(now.minute())
    .second(now.second())
    .millisecond(now.millisecond());

    return utilized;
};
