import faker from 'faker'
// import add from 'date-fns/add';

export default function getShippedDate(orderStatus) {
  const dateMark = new Date();
  const current = new Date(dateMark);
  dateMark.setDate(dateMark.getDate() + 10);

  // Cach 2:
  // const fiveDaysAfterCurrent = add(dateMark, { days: 10 });

  const shippedDate = orderStatus === 'Delivered' || orderStatus === 'Cancelled' ? faker.date.past() : faker.date.between(current, dateMark);
  // return shippedDate.toDateString().slice(4);
  return shippedDate;
}
