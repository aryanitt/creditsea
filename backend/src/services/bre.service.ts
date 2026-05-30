import { EmploymentType } from '../models/application.model';

interface BREInput {
  dob: Date;
  monthlySalary: number;
  employmentType: EmploymentType;
  pan: string;
}

interface BREResult {
  passed: boolean;
  reason?: string;
}

export const runBRE = (input: BREInput): BREResult => {
  const { dob, monthlySalary, employmentType, pan } = input;

  // 1. Age Rule: Age >= 23 and Age <= 50
  const age = calculateAge(dob);
  if (age < 23 || age > 50) {
    return { passed: false, reason: 'Applicant age must be between 23 and 50' };
  }

  // 2. Salary Rule: Monthly Salary >= 25000
  if (monthlySalary < 25000) {
    return { passed: false, reason: 'Monthly salary must be at least ₹25,000' };
  }

  // 3. Employment Rule: != UNEMPLOYED
  if (employmentType === EmploymentType.UNEMPLOYED) {
    return { passed: false, reason: 'Employment type not eligible' };
  }

  // 4. PAN Validation Rule: Regex [A-Z]{5}[0-9]{4}[A-Z]{1}
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  if (!panRegex.test(pan)) {
    return { passed: false, reason: 'Invalid PAN' };
  }

  return { passed: true };
};

const calculateAge = (dob: Date): number => {
  const diffMs = Date.now() - new Date(dob).getTime();
  const ageDt = new Date(diffMs);
  return Math.abs(ageDt.getUTCFullYear() - 1970);
};
