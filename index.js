
document.querySelector('button').onclick = () => {
  // get values
  const Name = document.querySelector('.Name').value
  const Salary = document.querySelector('.Salary').value
  const Workday = document.querySelector('.Workday').value
  const Workhour = document.querySelector('.Workhour').value
  const Absent = document.querySelector('.Absent').value
  const OT = document.querySelector('.OT').value
  const Bonus = document.querySelector('.Bonus').value
  const Otherdeducation = document.querySelector('.Otherdeducation').value
  const Late = document.querySelector('.Late').value

  // asign values into tabls
  document.querySelector('.name').innerHTML = Name
  document.querySelector('.salary').innerHTML = Salary
  document.querySelector('.workday').innerHTML = Workday
  document.querySelector('.workhour').innerHTML = Workhour
  document.querySelector('.absent').innerHTML = Absent
  document.querySelector('.ot').innerHTML = OT
  document.querySelector('.bonus').innerHTML = Bonus
  document.querySelector('.otherdeducation').innerHTML = Otherdeducation
  document.querySelector('.late').innerHTML = Late
  document.querySelector('.networkingday').innerHTML = NetSalary(Salary, Workday, Absent).toFixed(2);
  document.querySelector('.otamount').innerHTML = OTAmount(Salary, Workday, Workhour, OT).toFixed(2);
  document.querySelector('.latededucation').innerHTML = DeductionAmount(Salary, Workday, Workhour, Late).toFixed(2);
  document.querySelector('.total').innerHTML = Total(Salary, Workday, Workhour, OT, Absent, Late, Bonus, Otherdeducation).toFixed(2);
  document.querySelector('.tax').innerHTML = TaxAmount(Salary, Workday, Workhour, OT, Absent, Late, Bonus, Otherdeducation).toFixed(2);
  document.querySelector('.finalsalary').innerHTML = FinalSalary(Salary, Workday, Workhour, OT, Absent, Late, Bonus, Otherdeducation).toFixed(2);


}


// A. Period Working day
function NetSalary(Salary, Workday, Absent) {
  let netsalary = (Salary / Workday) * (Workday - Absent)
  return netsalary
}

// B.OT Amount
function OTAmount(Salary, Workday, Workhour, OT) {
  let otamount = (((Salary / Workday) / Workhour) * (OT * 2))
  return otamount
}

// C. Deduction Amount 
function DeductionAmount(Salary, Workday, Workhour, Late) {
  let deductionamount = ((Salary / Workday) / Workhour) * (Late / 60)
  return deductionamount
}

// D. Total 
function Total(Salary, Workday, Workhour, OT, Absent, Late, Bonus, Otherdeducation) {
  const netsalary = NetSalary(Salary, Workday, Absent)
  const otamount = OTAmount(Salary, Workday, Workhour, OT)
  const deduction = DeductionAmount(Salary, Workday, Workhour, Late)
  const total = netsalary + otamount - deduction + Number(Bonus) - Number(Otherdeducation)
  return total
}

// E. Tax
function TaxAmount(Salary, Workday, Workhour, OT, Absent, Late, Bonus, Otherdeducation) {
  const taxamount = Total(Salary, Workday, Workhour, OT, Absent, Late, Bonus, Otherdeducation)
  if ((taxamount * 4000) < 1500000) {
    return 0
  } else if ((taxamount * 4000) < 2200000) {
    return taxamount * 0.05
  } else if ((taxamount * 4000) < 3500000) {
    return taxamount * 0.1
  } else {
    return taxamount * 0.15
  }

}

// F. Final Salary
function FinalSalary(Salary, Workday, Workhour, OT, Absent, Late, Bonus, Otherdeducation) {

  const taxamount = TaxAmount(Salary, Workday, Workhour, OT, Absent, Late, Bonus, Otherdeducation)
  const total = Total(Salary, Workday, Workhour, OT, Absent, Late, Bonus, Otherdeducation)
  const finalSalary = total - taxamount
  return finalSalary
}

