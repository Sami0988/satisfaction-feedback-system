const data = {
  departments: [
    {
      id: "1",
      name: "Human Resources",
      code: "HR",
      description: "Handles recruitment, employee relations, and benefits.",
      parent_id: null
    },
    {
      id: "2",
      name: "IT Department",
      code: "IT",
      description: "Manages all technology infrastructure and software.",
      parent_id: null
    },
    {
      id: "3",
      name: "Finance",
      code: "FIN",
      description: "Handles budgeting, accounting, and payroll.",
      parent_id: null
    }
  ],
  services: [
    {
      id: "1",
      name: "Employee Onboarding",
      department_id: "1",
      description: "Manage the onboarding process for new employees."
    },
    {
      id: "2",
      name: "Payroll Management",
      department_id: "3",
      description: "Calculate salaries, deductions, and bonuses."
    },
    {
      id: "3",
      name: "Network Support",
      department_id: "2",
      description: "Provide technical support and maintain the network infrastructure."
    },
    {
      id: "4",
      name: "Recruitment",
      department_id: "1",
      description: "Manage hiring and interview process for new employees."
    },
    {
      id: "5",
      name: "Software Deployment",
      department_id: "2",
      description: "Deploy and maintain internal software applications."
    }
  ]
};

export default data;
