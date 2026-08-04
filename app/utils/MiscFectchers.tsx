
const baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL || "";


interface SocialLink {
    platform: string;
    url: string;
}

export async function getSocialLinks() {
    try {
        const res = await fetch(`${baseUrl}/api/terms_socials/social_links`, {
            credentials: "include",
        });
        
        if (!res.ok) throw new Error("Failed to fetch social links");
        
        const data = await res.json();

        if (data.success && Array.isArray(data.links)) {
            const mapped: Record<string, string> = {};
            data.links.forEach((link: SocialLink) => {
                mapped[link.platform] = link.url;
            });
            return { socialLinks: mapped, phones: data.phones ?? [] };
        }
    } catch (err) {
        console.error("Error fetching social links:", err);
    }
    return { socialLinks: {}, phones: [] }; // 🛡 Safe fallback
}

export const energyDataSubSections = [
  {
    "id": 1,
    "title": "Exploration Data",
    "details": [
      "Unlock Nigeria's hydrocarbon potential with our comprehensive exploration data, featuring:",
      "Seismic surveys and 2D/3D seismic data",
      "Well discoveries and exploration well data",
      "Basin analysis and petroleum system studies",
      "Play and prospect identification",
      "Exploration activities and upcoming projects"
    ],
    "benefits": "Stay ahead of the curve with our exploration data, empowering informed decisions on acreage acquisition, farm-ins, and exploration strategies."
  },
  {
    "id": 2,
    "title": "Drilling Data",
    "details": [
      "Optimize drilling operations with insights into:",
      "Well completions and drilling schedules",
      "Rig utilization and performance metrics",
      "Drilling costs and expenditure",
      "Wellbore data and subsurface information",
      "Drilling technologies and best practices"
    ],
    "benefits": "Our drilling data helps operators, contractors, and service companies optimize drilling efficiency, reduce costs, and improve well outcomes."
  },
  {
    "id": 3,
    "title": "Rig Count",
    "details": [
      "Stay up-to-date with Nigeria's active rig count, indicating:",
      "Exploration and production activity levels",
      "Rig types and configurations",
      "Rig operators and contractors",
      "Rig locations and movements",
      "Rig utilization rates"
    ],
    "benefits": "Our rig count data provides insights into Nigeria's drilling activity, helping stakeholders track industry trends and make informed decisions."
  },
  {
    "id": 4,
    "title": "Well Count",
    "details": [
      "Explore Nigeria's well inventory, highlighting:",
      "Total well count and well types",
      "Well locations and field distribution",
      "Well status and production profiles",
      "Well operators and ownership",
      "Well performance metrics"
    ],
    "benefits": "Our well count data provides a comprehensive understanding of Nigeria's producing and non-producing wells, informing field development and exploration strategies."
  },
  {
    "id": 5,
    "title": "Oil Production Data",
    "details": [
      "Track Nigeria's oil production trends, including:",
      "Output volumes and production rates",
      "Major producing fields and operators",
      "Export statistics and crude oil quality",
      "Production forecasts and projections",
      "OPEC quota and compliance data"
    ],
    "benefits": "Our oil production data provides critical insights into Nigeria's oil industry, helping stakeholders navigate market trends and opportunities."
  },
  {
    "id": 6,
    "title": "Gas Production Data",
    "details": [
      "Monitor gas production volumes, utilization rates, and key gas fields driving Nigeria's gas sector growth:",
      "Gas production and processing capacities",
      "Gas fields and operators",
      "Gas sales agreements and contracts",
      "LNG and pipeline export data",
      "Gas utilization trends and forecasts"
    ],
    "benefits": "Our gas production data supports informed decisions on gas monetization, infrastructure development, and market opportunities."
  },
  {
    "id": 7,
    "title": "Oil Refining Data",
    "details": [
      "Analyze capacity and utilization data for Nigeria's refineries, plus import/export trends for refined products:",
      "Refinery capacities and configurations",
      "Refined product imports and exports",
      "Refining margins and economics",
      "Maintenance schedules and turnaround plans"
    ],
    "benefits": "Our oil refining data provides insights into Nigeria's refining landscape, informing investment decisions and market analysis."
  },
  {
    "id": 8,
    "title": "Gas Utilisation Data",
    "details": [
      "Discover how Nigeria's gas production is utilized:",
      "Power generation and gas-fired power plants",
      "Industrial consumption and gas-based industries",
      "LNG exports and gas monetization",
      "Pipeline exports and regional trade",
      "Gas flaring and waste reduction initiatives"
    ],
    "benefits": "Our gas utilization data highlights opportunities for gas monetization, infrastructure development, and market growth."
  },
  {
    "id": 9,
    "title": "Gas Flare Data",
    "details": [
      "Track progress on reducing gas flaring, key flare sites, and environmental impact metrics:",
      "Gas flaring volumes and rates",
      "Flare reduction initiatives and projects",
      "Environmental impact assessments",
      "Regulatory frameworks and compliance",
      "Best practices and technology solutions"
    ],
    "benefits": "Our gas flare data supports stakeholders in understanding Nigeria's gas flaring landscape and opportunities for reduction and utilization."
  },
  {
    "id": 10,
    "title": "Safety Data",
    "details": [
      "Ensure operational excellence with industry safety performance metrics:",
      "Incident rates and lost time injury frequency",
      "Process safety events and major incidents",
      "HSE compliance and regulatory frameworks",
      "Safety management systems and best practices",
      "Training and competency development"
    ],
    "benefits": "Our safety data provides insights into Nigeria's oil and gas industry safety performance, informing risk management and operational strategies."
  },
  {
    "id": 11,
    "title": "Local Content Data",
    "details": [
      "Promote local participation and economic growth with data on:",
      "Nigerian company involvement and participation",
      "Local content requirements and regulations",
      "Job creation and employment metrics",
      "Capacity building and skills development",
      "Local content initiatives and success stories"
    ],
    "benefits": "Our local content data supports stakeholders in understanding Nigeria's local content landscape and opportunities for growth."
  },
  {
    "id": 12,
    "title": "Energy Transition Data",
    "details": [
      "Navigate Nigeria's energy future with insights into:",
      "Renewables and low-carbon energy investments",
      "Decarbonization efforts and climate change initiatives",
      "Energy efficiency and conservation measures",
      "Policy and regulatory frameworks",
      "Industry trends and market opportunities"
    ],
    "benefits": "Our energy transition data provides a comprehensive understanding of Nigeria's energy transition landscape, informing strategic decisions and investments."
  },
  {
    "id": 13,
    "title": "Oil and Gas Blocks",
    "details": [
      "Explore Nigeria's acreage, licensing rounds, and key blocks under development:",
      "Block boundaries and coordinates",
      "License holders and operators",
      "Work programs and commitments",
      "Exploration and production activities",
      "Bid rounds and opportunities"
    ],
    "benefits": "Our oil and gas block data supports stakeholders in understanding Nigeria's upstream landscape and opportunities for investment."
  },
  {
    "id": 14,
    "title": "Oil and Gas Fields",
    "details": [
      "Profile major producing fields, operators, production rates, and reserves:",
      "Field locations and boundaries",
      "Production profiles and decline curves",
      "Operator and ownership structures",
      "Reserves and resource estimates",
      "Field development plans and projects"
    ],
    "benefits": "Our oil and gas field data provides critical insights into Nigeria's producing assets, informing field development and investment strategies."
  },
  {
    "id": 15,
    "title": "Vessels/FPSO Count",
    "details": [
      "Track floating production units operating offshore Nigeria, supporting deepwater projects:",
      "Vessel types and configurations",
      "Operator and ownership structures",
      "Field locations and production profiles",
      "FPSO specifications and capacities",
      "Maintenance schedules and activities"
    ],
    "benefits": "Our vessel/FPSO data supports stakeholders in understanding Nigeria's deepwater landscape and opportunities for investment."
  },
  {
    "id": 16,
    "title": "Environmental Data",
    "details": [
      "Monitor emissions, waste management, and environmental impact metrics for oil and gas operations:",
      "Greenhouse gas emissions and intensity",
      "Waste management and disposal practices",
      "Environmental impact assessments",
      "Regulatory frameworks and compliance",
      "Best practices and technology solutions",
      "Oil spill and remediation"
    ],
    "benefits": "Our environmental data provides insights into Nigeria's oil and gas industry environmental performance, informing sustainability strategies and risk management."
  },
  {
    "id": 17,
    "title": "Research and Development Data",
    "details": [
      "Foster innovation with insights into technology adoption and R&D investments in Nigeria's energy sector:",
      "R&D expenditure and funding",
      "Technology trends and emerging solutions",
      "Collaboration and partnership opportunities",
      "Innovation hubs and startup ecosystems",
      "Best practices and lessons learned"
    ],
    "benefits": "Our R&D data supports stakeholders in understanding Nigeria's innovation landscape and opportunities for growth."
  },
  {
    "id": 18,
    "title": "Industry Budget",
    "details": [
      "Analyze capital expenditure, operating costs, and budget allocations across Nigeria's oil and gas value chain:",
      "Budget breakdowns and forecasts",
      "Operating costs and efficiency metrics",
      "Capital expenditure and investment trends",
      "Project economics and feasibility studies",
      "Regulatory frameworks and fiscal terms"
    ],
    "benefits": "Our industry budget data provides critical insights into Nigeria's oil and gas industry economics, informing investment decisions and market analysis."
  },
  {
    id: 19,
    title: "Crude Oil Price",
    details: [
      "Get latest prices, historical charts, and trends.",
    ],
    url: "https://www.oilcrudeprice.com",
    benefits: "Stay updated with market trends and pricing for crude oil.",
  },
];


