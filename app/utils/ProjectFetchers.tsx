import { Project } from "./Interfaces";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL + "/api";

export function filterEmptyValues(project: Partial<Project>) {
    return Object.entries(project)
        .filter(([key, value]) =>
            key !== '_id' &&
            key !== 'subscribersEmails' &&
            key !== 'favUsersEmails' &&
            key !== '__v' &&
            value !== null &&
            value !== '' &&
            value !== undefined
        )
        .reduce((acc, [key, value]) => {
            acc[key as keyof Project] = value;
            return acc;
        }, {} as Record<keyof Project, any>);
}



export const fieldMappings: Partial<Record<keyof Project, string>> = {
    projectId: "Project ID",
    projectName: "Project Name",
    location: "Location",
    capacity: "Capacity",
    client: "Client",
    clientHomeCounty: "Client Home Country",
    projectPartnersStakeholders: "Project Partners & Stakeholders",
    mainContractor: "Main Contractor",
    estimatedBudget: "Estimated Budget",
    contractValue: "Contract Value",
    localSpending: "Local Spend",
    foreignSpending: "Foreign Spend",
    projectScope: "Project Scope",
    awardDate: "Award Date",
    projectStartUpDate: "Project Start-up Date",
    projectCompletionDate: "Project Completion Date",
    projectStatus: "Project Status",
    projectSchedule: "Project Schedule",
    localContentPlans: "Local Content Plans",
    majorMilestones: "Major Milestones in the History of Project Development with Dates",
    projectOverview: "Project Overview",
    classification: "Classification",
    projectFinance: "Project Finance",
    businessOpportunities: 'Business Opportunities',
    projectSize: 'Project Size',
    subContractors: "Subcontractors",
    section: "Section",

    projectManagerNameClient: "Project Manager Name (Client)",
    projectManagerTelephoneClient: "Project Manager Telephone (Client)",
    projectManagerEmailClient: "Project Manager Email (Client)",
    projectCoordinatorNameClient: "Project Coordinator Name (Client)",
    projectCoordinatorTelephoneClient: "Project Coordinator Telephone (Client)",
    projectCoordinatorEmailClient: "Project Coordinator Email (Client)",
    projectProcurementManagerNameClient: "Procurement Manager Name (Client)",
    projectProcurementManagerTelephoneClient: "Procurement Manager Telephone (Client)",
    projectProcurementManagerEmailClient: "Procurement Manager Email (Client)",
    projectLocalContentManagerClient: "Project Local Content Manager(Client)",

    projectManagerNameMainContractor: "Project Manager Name (Main Contractor)",
    projectManagerTelephoneMainContractor: "Project Manager Telephone (Main Contractor)",
    projectManagerEmailMainContractor: "Project Manager Email (Main Contractor)",
    projectCoordinatorNameMainContractor: "Project Coordinator Name (Main Contractor)",
    projectCoordinatorTelephoneMainContractor: "Project Coordinator Telephone (Main Contractor)",
    projectCoordinatorEmailMainContractor: "Project Coordinator Email (Main Contractor)",
    projectProcurementManagerNameMainContractor: "Procurement Manager Name (Main Contractor)",
    projectProcurementManagerTelephoneMainContractor: "Procurement Manager Telephone (Main Contractor)",
    projectProcurementManagerEmailMainContractor: "Procurement Manager Email (Main Contractor)",
    projectLocalContentManagerMainContractor: "Project Local Content Manager (MainContractor)",
    createdAt: "Created At",
    updatedAt: "Updated At",
};

export const Fetchprojects = async () => {

    try {
        const response = await fetch(`${baseUrl}/projects`, {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: { subscription: boolean; projects: Project[] } = await response.json();

        if (data.subscription) {
            const cleanedProjects = data.projects.map((project: Partial<Project>) => {
                const filtered = filterEmptyValues(project);
                const renamed: Record<string, any> = {};

                for (const [key, displayKey] of Object.entries(fieldMappings)) {
                    const projectKey = key as keyof Project;
                    if (filtered.hasOwnProperty(projectKey)) {
                        renamed[displayKey] = filtered[projectKey];
                    }
                }

                return renamed;
            });

            return {
                subscription: true,
                projects: cleanedProjects
            };
        } else {
            return { subscription: false }
        }


    } catch (error) {
        console.error('Failed to fetch projects:', error);
        return [];
    }
};

// export function SectionCheckBoxes() {
//     const {
//         upstreamChecked, setUpstreamChecked,
//         midstreamChecked, setMidstreamChecked,
//         downstreamChecked, setDownstreamChecked,
//         serviceCompaniesChecked, setServiceCompaniesChecked,
//         oemManufacturersChecked, setOemManufacturersChecked,
//         allChecked, setAllChecked,
//         projectSize, setProjectSize 
//     } = useContext(HomepageContext);

//     useEffect(() => {
//         if (allChecked) {
//             setUpstreamChecked(false);
//             setMidstreamChecked(false);
//             setDownstreamChecked(false);
//             setServiceCompaniesChecked(false);
//             setOemManufacturersChecked(false);
//         }
//     }, [allChecked]);

//     useEffect(() => {
//         if (
//             upstreamChecked || midstreamChecked ||
//             downstreamChecked || serviceCompaniesChecked ||
//             oemManufacturersChecked
//         ) {
//             if (allChecked) setAllChecked(false);
//         }
//     }, [
//         upstreamChecked, midstreamChecked,
//         downstreamChecked, serviceCompaniesChecked,
//         oemManufacturersChecked
//     ]);


//     return (
//         <div className="d-flex justify-content-evenly align-items-center my-auto section-checkboxes" style={{ height: 'fit-content', width: '100%' }}>
//             <div className="form-check">
//                 <label htmlFor="allProjects" className="form-check-label  me-3">
//                     <input type="checkbox" id="allProjects" className="form-check-input" checked={allChecked} onChange={() => setAllChecked(!allChecked)} />
//                     All</label>
//             </div>

//             <div className="form-check">
//                 <label htmlFor="upstream" className="form-check-label  me-3">
//                     <input type="checkbox" id="upstream" className="form-check-input" checked={upstreamChecked} onChange={() => setUpstreamChecked(!upstreamChecked)} />
//                     Upstream</label>
//             </div>

//             <div className="form-check">
//                 <label htmlFor="midstream" className="form-check-label  me-3">
//                     <input type="checkbox" id="midstream" className="form-check-input" checked={midstreamChecked} onChange={() => setMidstreamChecked(!midstreamChecked)} />
//                     Midstream</label>
//             </div>

//             <div className="form-check">
//                 <label htmlFor="downstream" className="form-check-label  me-3">
//                     <input type="checkbox" id="downstream" className="form-check-input" checked={downstreamChecked} onChange={() => setDownstreamChecked(!downstreamChecked)} />
//                     Downstream</label>
//             </div>

//             <div className="form-check">
//                 <label htmlFor="serviceCompanies" className="form-check-label  me-3" style={{ whiteSpace: 'nowrap' }}>
//                     <input type="checkbox" id="serviceCompanies" className="form-check-input" checked={serviceCompaniesChecked} onChange={() => setServiceCompaniesChecked(!serviceCompaniesChecked)} />
//                     Service Companies</label>
//             </div>

//             <div className="form-check">
//                 <label htmlFor="oemManufacturers" className="form-check-label " style={{ whiteSpace: 'nowrap' }}>
//                     <input type="checkbox" id="oemManufacturers" className="form-check-input" checked={oemManufacturersChecked} onChange={() => setOemManufacturersChecked(!oemManufacturersChecked)} />
//                     OEM / Manufacturers</label>
//             </div>

//             <div className="form-group d-flex align-items-center color-background-dark text-light px-1" style={{ borderRadius: '4px', whiteSpace: 'nowrap' }}>
//                 <label htmlFor="projectSize" className=" fw-bold me-2">Project Size:</label>
//                 <select
//                     id="projectsize_select"
//                     value={projectSize}
//                     onChange={e => setProjectSize(e.target.value)}
//                     className="form-select py-0 px-1"
//                     style={{ display: "inline-block", width: "140px", height: "1rem", borderRadius: '4px', fontSize: '0.65rem' }}
//                 >
//                     <option value="all">All</option>
//                     <option value="whole project">Whole Project</option>
//                     <option value="package">Package</option>
//                 </select>
//             </div>
//         </div>
//     )
// }

export async function updateProjectViewCount(projectId: string) {
    try {
        const response = await fetch(`${baseUrl}/projects/view`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ projectId })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.viewCount
    } catch (error) {
        console.error("Error updating view count:", error);
    }
}

export async function handleFavouriteToggle(projectId: string, checked: boolean) {
    const payload = {
        projectId: projectId,
        favourite: checked
    };

    try {
        const response = await fetch(`${baseUrl}/projects/favourites`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            credentials: "include"
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to save favourite status");
        }
        return data.favProjects
    } catch (error) {
        console.error("Error saving favourite:", error);
    }
}

export async function handleSubscribeToggle(projectId: string, checked: boolean) {
    const payload = {
        projectId: projectId,
        subscribed: checked
    };

    try {
        const response = await fetch(`${baseUrl}/projects/newsletter`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            credentials: "include"
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to save favourite status");
        }
        return data.subscribed
    } catch (error) {
        console.error("Error saving favourite:", error);
    }
}
export async function fetchFavProjects() {;
    try {
        const response = await fetch(`${baseUrl}/projects/getUserfavourites`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to save favourite status");
        }

        return data
    } catch (error) {
        console.error("Error saving favourite:", error);
    }
}

export async function fetchSubscribedProjects() {
    try {
        const response = await fetch(`${baseUrl}/projects/getUserSubscribed`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to save favourite status");
        }

        return data
    } catch (error) {
        console.error("Error saving favourite:", error);
    }
}