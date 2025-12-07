export interface DropdownItem {
    heading: string;
    description: string;
    href: string; // URL to navigate to
}

// app/utlis/Interfaces.ts
export interface Profile {
    Username: string;
    Email: string;
    Phone?: string;
    Address?: string;
    Position?: string;
    "Nature of Business"?: string;
    "Subscription Expiry Date"?: string; // or Date if you convert it
}

export interface Project {
    projectId: string;
    projectName?: string;
    location?: string;
    capacity?: string;
    client?: string;
    clientHomeCounty?: string;
    projectPartnersStakeholders?: string;
    mainContractor?: string;
    estimatedBudget?: string;
    contractValue?: string;
    localSpending?: string;
    foreignSpending?: string;
    projectScope?: string;
    awardDate?: Date;
    projectStartUpDate?: Date;
    projectCompletionDate?: Date;
    projectStatus?: string;
    projectSchedule?: string;
    localContentPlans?: string;
    majorMilestones?: string[];
    projectOverview?: string;
    classification?: string;
    projectFinance?: string;
    businessOpportunities?: string;
    projectSize?: string;
    subContractors?: string;
    section?: string;

    // Client-side project manager details
    projectManagerNameClient?: string;
    projectManagerTelephoneClient?: string;
    projectManagerEmailClient?: string;
    projectCoordinatorNameClient?: string;
    projectCoordinatorTelephoneClient?: string;
    projectCoordinatorEmailClient?: string;
    projectProcurementManagerNameClient?: string;
    projectProcurementManagerTelephoneClient?: string;
    projectProcurementManagerEmailClient?: string;
    projectLocalContentManagerClient?: string;

    // Main contractor project manager details
    projectManagerNameMainContractor?: string;
    projectManagerTelephoneMainContractor?: string;
    projectManagerEmailMainContractor?: string;
    projectCoordinatorNameMainContractor?: string;
    projectCoordinatorTelephoneMainContractor?: string;
    projectCoordinatorEmailMainContractor?: string;
    projectProcurementManagerNameMainContractor?: string;
    projectProcurementManagerTelephoneMainContractor?: string;
    projectProcurementManagerEmailMainContractor?: string;
    projectLocalContentManagerMainContractor?: string;

    // Additional fields in schema
    subscribersEmails?: string[];
    viewCount?: number;

    // Timestamps
    createdAt?: Date;
    updatedAt?: Date;
}

// utils/ProjectTypes.ts

export interface DisplayProject {
    "Project ID"?: string;
    "Project Name"?: string;
    "Location"?: string;
    "Capacity"?: string;
    "Client"?: string;
    "Client Home Country"?: string;
    "Project Partners & Stakeholders"?: string;
    "Main Contractor"?: string;
    "Estimated Budget"?: string;
    "Contract Value"?: string;
    "Local Spend"?: string;
    "Foreign Spend"?: string;
    "Project Scope"?: string;
    "Award Date"?: string;
    "Project Start-up Date"?: string;
    "Project Completion Date"?: string;
    "Project Status"?: string;
    "Project Schedule"?: string;
    "Local Content Plans"?: string;
    "Major Milestones in the History of Project Development with Dates"?: string[];
    "Project Overview"?: string;
    "Classification"?: string;
    "Project Finance"?: string;
    "Business Opportunities"?: string;
    "Project Size"?: string;
    "Subcontractors"?: string;
    "Section"?: string;

    "Project Manager Name (Client)"?: string;
    "Project Manager Telephone (Client)"?: string;
    "Project Manager Email (Client)"?: string;
    "Project Coordinator Name (Client)"?: string;
    "Project Coordinator Telephone (Client)"?: string;
    "Project Coordinator Email (Client)"?: string;
    "Procurement Manager Name (Client)"?: string;
    "Procurement Manager Telephone (Client)"?: string;
    "Procurement Manager Email (Client)"?: string;
    "Project Local Content Manager(Client)"?: string;

    "Project Manager Name (Main Contractor)"?: string;
    "Project Manager Telephone (Main Contractor)"?: string;
    "Project Manager Email (Main Contractor)"?: string;
    "Project Coordinator Name (Main Contractor)"?: string;
    "Project Coordinator Telephone (Main Contractor)"?: string;
    "Project Coordinator Email (Main Contractor)"?: string;
    "Procurement Manager Name (Main Contractor)"?: string;
    "Procurement Manager Telephone (Main Contractor)"?: string;
    "Procurement Manager Email (Main Contractor)"?: string;
    "Project Local Content Manager (MainContractor)"?: string;

    "Created At"?: string;
    "Updated At"?: string;
    viewCount?: number; // optional, added if you track views
}

// types/EnergyData.ts
export interface EnergySubsection {
  id: number;
  title: string;
  details: string[];
  url?: string;
  benefits: string;
}
