// Bangladesh Humanitarian Portal Comprehensive Topic-Based Dataset

export const BANGLADESH_DIVISIONS = [
  'Sylhet Division',
  'Chattogram Division',
  'Rangpur Division',
  'Rajshahi Division',
  'Mymensingh Division',
  'Dhaka Division',
  'Barishal Division',
  'Khulna Division'
];

export const BANGLADESH_DISTRICTS = [
  // Sylhet Division
  { id: 'dist-1', name: 'Sylhet', division: 'Sylhet Division', affected: '450,000', funded: '৳ 34.5 Million', status: 'Critical', waterLevel: '2.1m Above Danger' },
  { id: 'dist-2', name: 'Sunamganj', division: 'Sylhet Division', affected: '380,000', funded: '৳ 28.2 Million', status: 'Critical', waterLevel: '1.9m Above Danger' },
  { id: 'dist-3', name: 'Moulvibazar', division: 'Sylhet Division', affected: '160,000', funded: '৳ 12.4 Million', status: 'High Risk', waterLevel: '1.2m Above Danger' },
  { id: 'dist-4', name: 'Habiganj', division: 'Sylhet Division', affected: '120,000', funded: '৳ 9.8 Million', status: 'High Risk', waterLevel: '0.8m Above Danger' },

  // Chattogram Division
  { id: 'dist-5', name: 'Feni', division: 'Chattogram Division', affected: '210,000', funded: '৳ 19.8 Million', status: 'Critical', waterLevel: '1.6m Above Danger' },
  { id: 'dist-6', name: 'Noakhali', division: 'Chattogram Division', affected: '180,000', funded: '৳ 14.5 Million', status: 'High Risk', waterLevel: '1.1m Above Danger' },
  { id: 'dist-7', name: 'Cox\'s Bazar', division: 'Chattogram Division', affected: '140,000', funded: '৳ 16.4 Million', status: 'Moderate', waterLevel: 'Signal 7 Alert' },
  { id: 'dist-8', name: 'Bandarban', division: 'Chattogram Division', affected: '45,000', funded: '৳ 6.8 Million', status: 'Moderate', waterLevel: 'Landslide Alert' },
  { id: 'dist-9', name: 'Rangamati', division: 'Chattogram Division', affected: '35,000', funded: '৳ 5.2 Million', status: 'Moderate', waterLevel: 'Hill Saturation' },
  { id: 'dist-10', name: 'Chattogram Sadar', division: 'Chattogram Division', affected: '110,000', funded: '৳ 11.2 Million', status: 'Moderate', waterLevel: 'Waterlogging' },

  // Rangpur Division
  { id: 'dist-11', name: 'Kurigram', division: 'Rangpur Division', affected: '160,000', funded: '৳ 12.1 Million', status: 'Critical', waterLevel: '1.4m Above Danger' },
  { id: 'dist-12', name: 'Gaibandha', division: 'Rangpur Division', affected: '125,000', funded: '৳ 10.5 Million', status: 'High Risk', waterLevel: '1.0m Above Danger' },
  { id: 'dist-13', name: 'Lalmonirhat', division: 'Rangpur Division', affected: '85,000', funded: '৳ 7.4 Million', status: 'Moderate', waterLevel: '0.6m Above Danger' },
  { id: 'dist-14', name: 'Nilphamari', division: 'Rangpur Division', affected: '65,000', funded: '৳ 5.8 Million', status: 'Moderate', waterLevel: 'Normal' },

  // Rajshahi Division
  { id: 'dist-15', name: 'Sirajganj', division: 'Rajshahi Division', affected: '145,000', funded: '৳ 11.8 Million', status: 'High Risk', waterLevel: '1.2m Above Danger' },
  { id: 'dist-16', name: 'Bogura', division: 'Rajshahi Division', affected: '90,000', funded: '৳ 8.2 Million', status: 'Moderate', waterLevel: '0.7m Above Danger' },
  { id: 'dist-17', name: 'Pabna', division: 'Rajshahi Division', affected: '70,000', funded: '৳ 6.1 Million', status: 'Moderate', waterLevel: 'Normal' },

  // Mymensingh Division
  { id: 'dist-18', name: 'Netrokona', division: 'Mymensingh Division', affected: '95,000', funded: '৳ 8.5 Million', status: 'High Risk', waterLevel: '1.1m Above Danger' },
  { id: 'dist-19', name: 'Sherpur', division: 'Mymensingh Division', affected: '60,000', funded: '৳ 5.4 Million', status: 'Moderate', waterLevel: '0.5m Above Danger' },
  { id: 'dist-20', name: 'Jamalpur', division: 'Mymensingh Division', affected: '110,000', funded: '৳ 9.2 Million', status: 'High Risk', waterLevel: '0.9m Above Danger' },

  // Dhaka Division
  { id: 'dist-21', name: 'Tangail', division: 'Dhaka Division', affected: '55,000', funded: '৳ 4.8 Million', status: 'Moderate', waterLevel: 'Normal' },
  { id: 'dist-22', name: 'Munshiganj', division: 'Dhaka Division', affected: '40,000', funded: '৳ 3.9 Million', status: 'Moderate', waterLevel: 'Normal' },

  // Barishal Division
  { id: 'dist-23', name: 'Bhola', division: 'Barishal Division', affected: '80,000', funded: '৳ 7.1 Million', status: 'High Risk', waterLevel: 'High Tide Warning' },
  { id: 'dist-24', name: 'Patuakhali', division: 'Barishal Division', affected: '65,000', funded: '৳ 5.9 Million', status: 'Moderate', waterLevel: 'Storm Surge' },

  // Khulna Division
  { id: 'dist-25', name: 'Satkhira', division: 'Khulna Division', affected: '75,000', funded: '৳ 6.4 Million', status: 'Moderate', waterLevel: 'Salinity Surge' },
  { id: 'dist-26', name: 'Bagerhat', division: 'Khulna Division', affected: '50,000', funded: '৳ 4.5 Million', status: 'Moderate', waterLevel: 'Embankment Alert' }
];

export const BANGLADESH_DISASTERS = [
  {
    id: 'dis-1',
    type: 'Flash Floods',
    title: 'Sylhet & Sunamganj Flash Floods 2026',
    district: 'Sylhet & Sunamganj',
    division: 'Sylhet Division',
    date: '16 Aug 2026',
    status: 'Red Alert (L3)',
    glide: 'FL-2026-BGD-001',
    affectedPeople: '450,000 displaced',
    sheltersActive: '340 Centers',
    description: 'Catastrophic flash flooding caused by unprecedented upstream rainfall across India-Bangladesh borders, submerging 65% of rural union parishads in Sylhet division.',
    image: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?q=80&w=800&auto=format&fit=crop',
    authenticNews: [
      { source: 'The Daily Star', headline: 'Surma-Kushiyara Flows 2.1m Above Danger Level in Kanaighat', time: '2 hours ago', url: 'https://www.thedailystar.net' },
      { source: 'UNICEF BD Press Bulletin', headline: '450,000 Displaced in Sylhet: 1.2M Water Purification Tablets Deployed', time: '5 hours ago', url: 'https://www.unicef.org/bangladesh' },
      { source: 'BWDB Hydrological Report', headline: 'Northeastern Border Rivers Forecasted to Peak in Next 48 Hours', time: 'Today', url: 'http://www.ffwc.gov.bd' }
    ]
  },
  {
    id: 'dis-2',
    type: 'Flash Floods',
    title: 'Feni & Noakhali Sudden Inundation',
    district: 'Feni & Noakhali',
    division: 'Chattogram Division',
    date: '14 Aug 2026',
    status: 'Severe Warning',
    glide: 'FL-2026-BGD-002',
    affectedPeople: '280,000 affected',
    sheltersActive: '210 Centers',
    description: 'Embankment canal breaches triggered fast-moving water surges into residential villages, leaving thousands cut off from drinking water and road networks.',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop',
    authenticNews: [
      { source: 'Prothom Alo English', headline: 'Parshuram & Chhagalnaiya Inundated as Muhuri River Embankments Collapse', time: '3 hours ago', url: 'https://en.prothomalo.com' },
      { source: 'BDRCS Field Dispatch', headline: 'Emergency Speedboat Rescue Teams Operating Across Marooned Noakhali Villages', time: '6 hours ago', url: 'https://bdrcs.org' }
    ]
  },
  {
    id: 'dis-3',
    type: 'Cyclones & Storms',
    title: 'Cox\'s Bazar Coastal Cyclone Warning',
    district: 'Cox\'s Bazar & Teknaf',
    division: 'Chattogram Division',
    date: '12 Aug 2026',
    status: 'Signal 7 Alert',
    glide: 'TC-2026-BGD-003',
    affectedPeople: '190,000 vulnerable',
    sheltersActive: '180 Centers',
    description: 'Deep depression over the Bay of Bengal generating high storm surges and high tide warnings across Teknaf, Ukhiya, and Cox\'s Bazar coastal belt.',
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop',
    authenticNews: [
      { source: 'BMD Weather Bulletin #14', headline: 'Maritime Ports Advised to Hoist Local Cautionary Signal 7', time: '1 hour ago', url: 'http://bmd.gov.bd' },
      { source: 'Reuters South Asia', headline: 'Coastal Evacuations Underway in Cox\'s Bazar as Bay Depression Intensifies', time: '4 hours ago', url: 'https://www.reuters.com' }
    ]
  },
  {
    id: 'dis-4',
    type: 'River Embankment Breaches',
    title: 'Kurigram Teesta River Embankment Breach',
    district: 'Kurigram & Gaibandha',
    division: 'Rangpur Division',
    date: '10 Aug 2026',
    status: 'High Risk',
    glide: 'ER-2026-BGD-004',
    affectedPeople: '160,000 char dwellers',
    sheltersActive: '120 Centers',
    description: 'Surging water flow in Teesta and Jamuna rivers destroyed agricultural crops and submerged riverine char islands across northern districts.',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop',
    authenticNews: [
      { source: 'The Financial Express', headline: 'Teesta Barrage Gates Opened: 160,000 Char Dwellers Marooned in Kurigram', time: 'Yesterday', url: 'https://thefinancialexpress.com.bd' },
      { source: 'MoDMR Press Release', headline: '500 Metric Tons Rice & BDT 2.5M Emergency Cash Relief Sanctioned for Rangpur', time: '2 days ago', url: 'https://modmr.gov.bd' }
    ]
  },
  {
    id: 'dis-5',
    type: 'Landslides',
    title: 'Bandarban Hill Tracts Landslides',
    district: 'Bandarban & Rangamati',
    division: 'Chattogram Division',
    date: '08 Aug 2026',
    status: 'Ongoing Rescue',
    glide: 'LS-2026-BGD-005',
    affectedPeople: '45,000 residents',
    sheltersActive: '85 Centers',
    description: 'Continuous hillside soil saturation caused mudslides blocking mountain roads and threatening vulnerable indigenous hill communities.',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop',
    authenticNews: [
      { source: 'Dhaka Tribune', headline: 'Bandarban-Chittagong Highway Blocked by Massive Hill Mudslide', time: '1 day ago', url: 'https://www.dhakatribune.com' },
      { source: 'Fire Service & Civil Defence', headline: 'Heavy Equipment Deployed to Clear Debris in Rangamati Mountain Slopes', time: '2 days ago', url: 'http://fireservice.gov.bd' }
    ]
  }
];

export const BANGLADESH_TOPICS = [
  { id: 'top-1', title: 'Floods & Hydrology', count: '142 Reports', icon: 'Flame', desc: 'Monsoon flash floods, river embankment breaches, and char inundation monitoring.' },
  { id: 'top-2', title: 'Health & Hygiene (WASH)', count: '98 Reports', icon: 'Droplets', desc: 'Water purification, mobile clinics, oral rehydration saline, and diarrhea prevention.' },
  { id: 'top-3', title: 'Food Security & Rations', count: '115 Reports', icon: 'FileText', desc: 'Dry food packets, rice grain sanctions, fortified nutrition, and livestock feed.' },
  { id: 'top-4', title: 'Emergency Shelter', count: '76 Reports', icon: 'Layers', desc: 'Primary school shelter centers, tarpaulins, sandbag slope stabilization, and cash aid.' },
  { id: 'top-5', title: 'Emergency Appeals', count: '54 Appeals', icon: 'AlertTriangle', desc: 'BDRCS, IFRC, and international donor funding appeals for Bangladesh disaster response.' },
  { id: 'top-6', title: 'Agricultural Relief', count: '62 Reports', icon: 'FileText', desc: 'Paddy crop inundation assessments, seed packet distribution, and livestock fodder.' },
  { id: 'top-7', title: 'Women & Child Protection', count: '48 Reports', icon: 'ShieldCheck', desc: 'Dignity kit distribution, child-friendly spaces, and safe shelter protocols.' }
];

export const BANGLADESH_ARTICLES = [
  {
    id: 'art-1',
    title: 'Sylhet & Sunamganj Torrential Rain Triggers Severe Flash Floods, Over 450,000 People Displaced',
    excerpt: 'Torrential monsoon downpours have breached river embankments across northeastern Bangladesh. UNICEF and local relief teams have deployed clean water purification tablets, dignity kits, and high-energy biscuits to affected unions.',
    fullContent: `
      <p>NORTHEASTERN BANGLADESH — Continuous torrential downpours over the past 72 hours have triggered catastrophic flash flooding across the Sylhet and Sunamganj districts, submerging over 65% of rural union councils and leaving an estimated 450,000 people temporarily displaced.</p>
      <p>Main transportation arterial routes connecting Sylhet to Sunamganj remain inundated under 3 to 4 feet of fast-moving flood waters, complicating initial search-and-rescue efforts. Emergency humanitarian responders from UNICEF, Bangladesh Red Crescent Society (BDRCS), and local government units are utilizing motorized rescue boats to navigate submerged road networks.</p>
      <h3>Immediate Relief Priorities in Sylhet Division</h3>
      <ul>
        <li><strong>Safe Water & Hygiene:</strong> Distribution of over 500,000 water purification tablets and mobile purification units to prevent cholera outbreaks in Sunamganj Sadar, Chhatak, and Dowarabazar.</li>
        <li><strong>Food Security:</strong> Deployment of high-energy biscuits and dry food packages targeting isolated households in remote char areas.</li>
        <li><strong>Emergency Shelter:</strong> Safe temporary relocation of displaced families to 340 converted primary schools equipped with emergency medical kits.</li>
      </ul>
      <p>Humanitarian agencies are urging prompt aid contributions to prevent compounding health crises as river water levels fluctuate over the coming days.</p>
    `,
    category: 'Situation Reports',
    topic: 'Floods & Hydrology',
    division: 'Sylhet Division',
    district: 'Sylhet & Sunamganj',
    source: 'UNICEF Bangladesh',
    date: '16 Aug 2026',
    isAlert: true,
    views: '14.2k',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?q=80&w=800&auto=format&fit=crop',
    pdfSize: '2.4 MB'
  },
  {
    id: 'art-2',
    title: 'BDRCS & IFRC Launch BDT 150 Million Emergency Appeal as Flood Waters Surge in Feni & Noakhali',
    excerpt: 'The Bangladesh Red Crescent Society (BDRCS) and IFRC have initiated a nationwide disaster response appeal to support immediate shelter repair kits, medical supplies, and cash assistance for 120,000 vulnerable families.',
    fullContent: `
      <p>DHAKA / FENI — The Bangladesh Red Crescent Society (BDRCS) alongside IFRC has issued a national emergency appeal for BDT 150 Million to expand humanitarian response operations in southern-eastern Bangladesh.</p>
      <p>The funding will directly assist 120,000 affected families across Feni, Noakhali, and Chattogram. Priority interventions include multi-purpose cash grants, emergency water treatment plants, and community hygiene triage posts.</p>
      <p>"The speed at which floodwaters breached embankment canal walls caught thousands of families off guard. Emergency cash transfers are vital so families can purchase medicine and basic food items locally," stated the BDRCS Disaster Management Director.</p>
    `,
    category: 'Emergency Appeals',
    topic: 'Emergency Appeals',
    division: 'Chattogram Division',
    district: 'Feni & Noakhali',
    source: 'BDRCS / IFRC',
    date: '15 Aug 2026',
    isAlert: true,
    views: '11.8k',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop',
    pdfSize: '1.8 MB'
  },
  {
    id: 'art-3',
    title: 'BWDB Alert: Jamuna & Teesta River Water Levels Cross Danger Mark in Kurigram & Gaibandha',
    excerpt: 'The Bangladesh Water Development Board (BWDB) has issued a high alert for northern river basins. Embankment protection units are reinforcing vulnerable riverbanks in Kurigram and Gaibandha.',
    fullContent: `
      <p>KURIGRAM — According to the Flood Forecasting and Warning Centre (FFWC), the Jamuna River is flowing 45 cm above the danger level at Chilmari point in Kurigram. Inundation of low-lying agricultural char lands has affected thousands of farming households.</p>
      <p>Local administration units have opened 120 flood shelter centers across Chilmari, Nageshwari, and Bhurungamari upazilas, providing dry food rations, cattle fodder, and emergency medical supplies.</p>
    `,
    category: 'Situation Reports',
    topic: 'Floods & Hydrology',
    division: 'Rangpur Division',
    district: 'Kurigram & Gaibandha',
    source: 'BWDB Warning Centre',
    date: '15 Aug 2026',
    isAlert: true,
    views: '9.8k',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop',
    pdfSize: '3.1 MB'
  },
  {
    id: 'art-4',
    title: 'WHO & DGHS Deploy 50 Mobile Medical Teams to Counter Waterborne Diseases in Submerged Unions',
    excerpt: 'The World Health Organization and DGHS have dispatched emergency medical rapid response teams to establish mobile health clinics and distribute oral rehydration salts across 8 flood-hit districts.',
    fullContent: `
      <p>DHAKA — To prevent post-flood disease transmission, the Directorate General of Health Services (DGHS) with WHO support has deployed 50 mobile medical surveillance units across northern and eastern union councils.</p>
      <p>Teams are equipped with water testing kits, intravenous fluids, oral rehydration powder (ORS), and anti-diarrheal medication. Early warning epidemiology surveillance is actively monitoring for acute watery diarrhea (AWD) clusters.</p>
    `,
    category: 'Health Surveillance',
    topic: 'Health & Hygiene (WASH)',
    division: 'Sylhet Division',
    district: 'Sylhet, Feni & Kurigram',
    source: 'WHO Bangladesh',
    date: '14 Aug 2026',
    isAlert: false,
    views: '9.5k',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800&auto=format&fit=crop',
    pdfSize: '1.2 MB'
  },
  {
    id: 'art-5',
    title: 'WFP Emergency Air & Boat Rations Reach 85,000 Cut-off Families in Remote Char Areas',
    excerpt: 'Speedboats and heavy transport vehicles delivered dry food rations and nutrient-dense porridge mix to remote char areas in Sirajganj and Bogura where road access remains completely submerged.',
    fullContent: `
      <p>SIRAJGANJ — World Food Programme (WFP) logistics teams have established water relief corridors into cut-off char unions in Sirajganj and Bogura districts. Over 85,000 households received fortified food packages containing rice, lentils, fortified oil, and salt.</p>
    `,
    category: 'Food Distribution',
    topic: 'Food Security & Rations',
    division: 'Rajshahi Division',
    district: 'Sirajganj & Bogura',
    source: 'WFP Bangladesh',
    date: '14 Aug 2026',
    isAlert: false,
    views: '7.1k',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?q=80&w=600&auto=format&fit=crop',
    pdfSize: '1.5 MB'
  },
  {
    id: 'art-6',
    title: 'BRAC Mobilizes 3,500 Field Volunteers Delivering Emergency Cash & Water Tablets in Netrokona',
    excerpt: 'Grassroots BRAC volunteers are providing cooked meals, dignity kits for women, and medical triage points in community schools repurposed as emergency flood centers.',
    fullContent: `
      <p>NETROKONA — BRAC field workers and community volunteers have reached over 50,000 families in submerged northern unions. Emergency response kits containing water purification tablets, saline, and oral rehydration powder were distributed directly to submerged homesteads.</p>
    `,
    category: 'Situation Reports',
    topic: 'Health & Hygiene (WASH)',
    division: 'Mymensingh Division',
    district: 'Netrokona & Sherpur',
    source: 'BRAC Relief',
    date: '13 Aug 2026',
    isAlert: false,
    views: '6.2k',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=600&auto=format&fit=crop',
    pdfSize: '1.1 MB'
  },
  {
    id: 'art-7',
    title: 'UNHCR & RRRC Reinforce Slope Stabilization & Shelter Tarpaulins in Cox\'s Bazar Relief Zones',
    excerpt: 'Heavy monsoonal rains have heightened landslide risks across hilly shelter zones in Cox\'s Bazar district. UNHCR and RRRC have activated emergency slope stabilization protocols.',
    fullContent: `
      <p>COX'S BAZAR — Over 14,000 heavy-duty plastic tarpaulins, bamboo reinforced poles, and sandbags have been distributed to families whose shelters were damaged by monsoon rainwater runoff. Engineering units are clearing drainage blockages.</p>
    `,
    category: 'Shelter Assessments',
    topic: 'Emergency Shelter',
    division: 'Chattogram Division',
    district: 'Cox\'s Bazar',
    source: 'UNHCR Bangladesh',
    date: '13 Aug 2026',
    isAlert: false,
    views: '8.4k',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=600&auto=format&fit=crop',
    pdfSize: '2.9 MB'
  },
  {
    id: 'art-8',
    title: 'Ministry of Disaster Management Allocates 5,000 Metric Tons of Rice for Flood Response Centers',
    excerpt: 'The Ministry of Disaster Management and Relief (MoDMR) has sanctioned emergency relief funds and food grain allocation across 12 flood-affected districts in Bangladesh.',
    fullContent: `
      <p>DHAKA — State Minister for Disaster Management announced an emergency allocation of 5,000 metric tons of rice alongside BDT 20 Million in cash assistance to support district disaster management committees (DDMC) in conducting relief operations.</p>
    `,
    category: 'Situation Reports',
    topic: 'Food Security & Rations',
    division: 'Dhaka Division',
    district: 'All BD Districts',
    source: 'MoDMR Bangladesh',
    date: '12 Aug 2026',
    isAlert: true,
    views: '12.5k',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?q=80&w=800&auto=format&fit=crop',
    pdfSize: '1.4 MB'
  },
  {
    id: 'art-wiki-1',
    title: 'Wikipedia Analysis: Geographical & Hydrological Foundations of Floods in Bangladesh',
    excerpt: 'Situated on the Ganges-Brahmaputra-Meghna (GBM) Delta, 83% of Bangladesh consists of floodplains. 80% of river streamflow enters from upstream countries, causing catastrophic annual inundation.',
    fullContent: `
      <h2>Geographical & Hydrological Vulnerability Analysis</h2>
      <p>Bangladesh, situated on the Brahmaputra and Ganges Delta, is an extraordinarily low-lying nation. Over 83% of its total landmass consists of fertile floodplains, with large regions lying less than 5 meters above mean sea level.</p>
      
      <h3>Upstream Hydro-Basin Catchment Dynamics</h3>
      <p>A critical hydrological reality of Bangladesh is that only 20% of its total river streamflow is generated by internal rainfall. The remaining 80% flows into the country from vast international catchment basins in India, Nepal, Bhutan, and China (Tibet) through three major river systems: the Ganges, the Brahmaputra-Jamuna, and the Meghna.</p>
      
      <h3>Key Geographical Drivers of Flooding</h3>
      <ul>
        <li><strong>Low Elevation:</strong> Terrain under 5 meters above sea level amplifies drainage congestion and slows runoff.</li>
        <li><strong>Convectional & Relief Monsoonal Rainfall:</strong> Heavy monsoon precipitation combined with snowmelt from the Himalayas surges downstream between June and September.</li>
        <li><strong>River Confluence Synchronization:</strong> When peak water flows of the Ganges, Jamuna, and Meghna coincide within 3 days, massive nationwide megafloods occur (as seen in 1988 and 1998).</li>
      </ul>
    `,
    category: 'Wikipedia Archive',
    topic: 'Floods & Hydrology',
    division: 'All BD Divisions',
    district: 'GBM River Delta',
    source: 'Wikipedia Encyclopedia',
    date: 'Wikipedia Reference',
    isAlert: true,
    views: '24.5k',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?q=80&w=800&auto=format&fit=crop',
    pdfSize: '3.8 MB'
  },
  {
    id: 'art-wiki-2',
    title: 'Wikipedia Special Report: Detailed Case Studies of the Catastrophic 1988 & 1998 Megafloods',
    excerpt: 'The 1988 flood submerged 60% of Bangladesh, while the 1998 "Flood of the Century" inundated over 75% of the nation, displacing 30 million people and destroying 700,000 hectares of crops.',
    fullContent: `
      <h2>Comprehensive Analysis of Historic Megafloods (1988 & 1998)</h2>
      
      <h3>The Catastrophic 1988 Flood</h3>
      <p>Occurring between August and September 1988, this flood submerged 82,000 square kilometers (about 61% of the country). Dhaka capital city was severely affected for 15 to 20 days. The return period was estimated at 50 to 100 years. Synchronized peak flows of the major rivers within 3 days escalated devastation.</p>
      
      <h3>The 1998 "Flood of the Century"</h3>
      <p>The 1998 flood remains one of the most prolonged and destructive in recorded history, lasting over 65 days between July and September 1998:</p>
      <ul>
        <li><strong>Inundated Area:</strong> Over 75% of the total landmass submerged, including half of Dhaka city.</li>
        <li><strong>Displacement & Mortality:</strong> 30 million people made homeless; official death toll reached over 1,050.</li>
        <li><strong>Agricultural Impact:</strong> 700,000 hectares of crops destroyed, leading to severe food insecurity.</li>
        <li><strong>Economic Losses:</strong> Over 400 major factories closed, resulting in a 20% contraction in national industrial output.</li>
      </ul>
    `,
    category: 'Wikipedia Archive',
    topic: 'Floods & Hydrology',
    division: 'All BD Divisions',
    district: 'National Scope',
    source: 'Wikipedia Historical Archive',
    date: 'Wikipedia Reference',
    isAlert: true,
    views: '32.1k',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop',
    pdfSize: '4.2 MB'
  },
  {
    id: 'art-wiki-3',
    title: 'Wikipedia Analysis: Recent Floods (2017 Haor Basin, 2024 Feni Inundation & 2026 Coastal Surge)',
    excerpt: 'Analysis of recent flood events from unpredicted early April Haor flash floods in 2017, severe 2024 flash floods affecting 5.8M in Feni/Noakhali, to 2026 Chittagong-Cox\'s Bazar flash floods.',
    fullContent: `
      <h2>Recent Flooding Trends & Climate Variability (2017 - 2026)</h2>
      
      <h3>2017 Haor Basin Flash Floods</h3>
      <p>In April 2017, early unpredicted torrential rain flooded the northeastern Haor wetlands, destroying pre-harvest Boro crops. Sentinel-1 SAR satellite imagery revealed that flood inundation increased from 2.01% in April to 7.01% during the catastrophic August monsoon surge.</p>
      
      <h3>2024 Eastern Bangladesh Inundation</h3>
      <p>In August 2024, fast-moving flash floods devastated Feni, Noakhali, Comilla, and Lakshmipur districts. Over 5.8 million people were severely affected as water levels breached embankments, cutting off key national highways.</p>
      
      <h3>2026 Chittagong & Cox's Bazar Flash Floods</h3>
      <p>In July 2026, heavy rainfall triggered severe flash floods and hillside landslides in southeastern districts, resulting in displacement of over a million residents and emergency shelter activations.</p>
    `,
    category: 'Wikipedia Archive',
    topic: 'Floods & Hydrology',
    division: 'Sylhet & Chattogram',
    district: 'Feni, Noakhali & Cox\'s Bazar',
    source: 'Wikipedia Climate Reports',
    date: 'Wikipedia Reference',
    isAlert: true,
    views: '19.8k',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop',
    pdfSize: '2.7 MB'
  },
  {
    id: 'art-wiki-4',
    title: 'Wikipedia Study: Agricultural Silt Benefits vs Devastating Infrastructure Destruction',
    excerpt: 'While small-scale seasonal flooding is required to deposit fertile alluvial sediment and naturally irrigate rice paddies, extreme climate-driven floods cause catastrophic economic loss.',
    fullContent: `
      <h2>Ecological & Agricultural Dual Dynamics of Floods</h2>
      
      <h3>The Essential Benefits of Small-Scale Flooding</h3>
      <p>Small-scale monsoon flooding is crucial for Bangladesh's agrarian economy:</p>
      <ul>
        <li><strong>Alluvial Silt Deposition:</strong> Floodwaters carry rich mineral sediments from the Himalayas, naturally fertilizing rice paddies without artificial chemical fertilizers.</li>
        <li><strong>Soil Salinity Removal:</strong> Flooding flushes out salt deposits accumulated through high evaporation rates in coastal agricultural soils.</li>
        <li><strong>Natural Irrigation:</strong> Monsoonal flooding replaces costly, energy-intensive artificial groundwater pumping for paddy cultivation.</li>
      </ul>
      
      <h3>The Destructive Reality of Extreme Events</h3>
      <p>When floods breach danger thresholds, benefits turn into severe economic destruction. Soil-and-turf earthen embankments built by local farmers easily collapse under high water velocity, destroying roads, bridges, schools, and homesteads.</p>
    `,
    category: 'Wikipedia Archive',
    topic: 'Agricultural Relief',
    division: 'All BD Divisions',
    district: 'Agricultural Belt',
    source: 'Wikipedia Agricultural Research',
    date: 'Wikipedia Reference',
    isAlert: false,
    views: '15.4k',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop',
    pdfSize: '2.1 MB'
  }
];

export const BANGLADESH_MOST_READ = [
  {
    id: 'bd-mr-1',
    title: 'BWDB Flood Assessment Report #4: 450,000 Displaced in Sylhet',
    views: '14.2k views',
    date: '16 Aug 2026',
    source: 'UNICEF BD'
  },
  {
    id: 'bd-mr-2',
    title: 'BDRCS Emergency Relief Appeal: Cash Grants & Water Purification',
    views: '11.8k views',
    date: '15 Aug 2026',
    source: 'BDRCS'
  },
  {
    id: 'bd-mr-3',
    title: 'DGHS Health Guidelines on Cholera Prevention in Flood Shelters',
    views: '9.5k views',
    date: '14 Aug 2026',
    source: 'WHO / DGHS'
  },
  {
    id: 'bd-mr-4',
    title: 'FTS Ledger: BDT 145 Million Public Donations Recorded',
    views: '8.1k views',
    date: '15 Aug 2026',
    source: 'MoDMR'
  },
  {
    id: 'bd-mr-5',
    title: 'BWDB Hydrological Outlook: River Water Levels across 64 Districts',
    views: '6.9k views',
    date: '13 Aug 2026',
    source: 'BWDB'
  }
];

export const BANGLADESH_JOBS = [
  {
    id: 'job-1',
    category: 'Field Relief & Logistics',
    title: 'Emergency Field Relief Coordinator',
    organization: 'UNICEF Bangladesh',
    location: 'Sylhet Sadar, Sylhet',
    type: 'Full-time / Emergency Deployment',
    salary: 'BDT 85,000 - 110,000 / month',
    deadline: '24 Aug 2026',
    description: 'Coordinate field distribution of water purification units, hygiene kits, and emergency nutrition packs across flood-affected union parishads in Sylhet & Sunamganj.',
    requirements: ['3+ years in humanitarian field response', 'Fluent in Bangla & Sylheti dialect', 'Bachelor in Disaster Management or Social Sciences']
  },
  {
    id: 'job-2',
    category: 'WASH & Water Engineering',
    title: 'WASH Specialist & Mobile Water Technician',
    organization: 'BDRCS (Bangladesh Red Crescent)',
    location: 'Feni Sadar & Parshuram, Feni',
    type: 'Contract / Rapid Response',
    salary: 'BDT 75,000 - 95,000 / month',
    deadline: '22 Aug 2026',
    description: 'Oversee installation and maintenance of mobile water treatment plants and solar purification kits in submerged unions.',
    requirements: ['Civil/Environmental Engineering background', 'Experience with water purification chemistry', 'Willingness to travel by boat']
  },
  {
    id: 'job-3',
    category: 'Medical & Nursing',
    title: 'Disaster Health Surveillance Nurse',
    organization: 'WHO / DGHS Bangladesh',
    location: 'Kurigram Sadar & Chilmari',
    type: 'Full-time',
    salary: 'BDT 65,000 - 80,000 / month',
    deadline: '26 Aug 2026',
    description: 'Operate mobile health clinics delivering oral rehydration salts, antibiotics, and waterborne disease monitoring.',
    requirements: ['Diploma/BSc in Nursing', 'Registration with Bangladesh Nursing Council', 'Field emergency triage skills']
  },
  {
    id: 'job-4',
    category: 'GIS & Disaster Analytics',
    title: 'GIS & Satellite Mapping Analyst (Disasters)',
    organization: 'Flood Forecasting Centre (BWDB)',
    location: 'Dhaka HQ (with field trips)',
    type: 'Full-time',
    salary: 'BDT 90,000 - 120,000 / month',
    deadline: '30 Aug 2026',
    description: 'Analyze Sentinel-2 and MODIS satellite imagery to generate real-time flood inundation maps across 64 districts.',
    requirements: ['Degree in GIS/Remote Sensing or Geography', 'Proficiency in QGIS/ArcGIS & Python', 'Experience with hydrological data']
  }
];

export const AUTHENTIC_BD_TRAINING_CENTERS = [
  {
    id: 'tc-1',
    name: 'Bangladesh Red Crescent Society (BDRCS) National Training Center',
    acronym: 'BDRCS Training Dept',
    location: '684-686 Bara Moghbazar, Dhaka & 64 District Units',
    focusArea: 'First Aid, Search & Rescue, Flood Triage, International Humanitarian Law (IHL)',
    affiliation: 'IFRC & Ministry of Disaster Management & Relief (MoDMR)',
    website: 'https://bdrcs.org/training',
    badge: 'Official Red Cross/Red Crescent Center',
    details: 'Primary national provider of certified First Aid, Disaster Response, Water Safety, and Search & Rescue training for emergency volunteers and humanitarian professionals in Bangladesh.'
  },
  {
    id: 'tc-2',
    name: 'NIRAPAD (Network for Information, Response, & Preparedness Activities on Disaster)',
    acronym: 'NIRAPAD Secretariat',
    location: 'Banani, Dhaka, Bangladesh',
    focusArea: 'Disaster Risk Management (DRM), Module Development, Capacity Building',
    affiliation: 'Disaster Management Network Bangladesh',
    website: 'https://nirapad.org.bd',
    badge: 'National Humanitarian Knowledge Network',
    details: 'Leading humanitarian knowledge network in Bangladesh developing standardized training modules, manuals, and DRM capacity building workshops for NGOs and humanitarian actors.'
  },
  {
    id: 'tc-3',
    name: 'BIPSOT (Bangladesh Institute of Peace Support Operation Training)',
    acronym: 'BIPSOT HADR Wing',
    location: 'Rajendrapur Cantonment, Gazipur, Bangladesh',
    focusArea: 'Humanitarian Assistance & Disaster Relief (HADR), Civil-Military Coordination',
    affiliation: 'Armed Forces Division & UN Peacekeeping Training Network',
    website: 'https://bipsot.net',
    badge: 'Armed Forces & UN HADR Institution',
    details: 'Premier military and civilian training institute specializing in complex humanitarian emergency response, HADR operations, and international crisis management.'
  },
  {
    id: 'tc-4',
    name: 'Cyclone Preparedness Programme (CPP) Training Division',
    acronym: 'CPP HQ & Coastal Hubs',
    location: 'Disaster Management Bhaban, Mohakhali, Dhaka & Coastal Field Centers',
    focusArea: 'Signal 1-10 Warning Protocols, Flag System, Shelter Evacuation, Megaphone Signaling',
    affiliation: 'Joint Initiative of MoDMR & BDRCS',
    website: 'http://cpp.gov.bd',
    badge: 'Government & BDRCS Joint Program',
    details: 'Trains over 76,000 coastal volunteers across Bangladesh in early weather warning signal dissemination, evacuation protocols, and emergency shelter protection.'
  },
  {
    id: 'tc-5',
    name: 'BRAC Humanitarian Crisis Management Programme (HCMP)',
    acronym: 'BRAC HCMP Learning Center',
    location: 'Cox\'s Bazar, Ukhiya & Regional Field Centers',
    focusArea: 'Community Resilience, Emergency WASH, Psychological First Aid, Displacement Support',
    affiliation: 'BRAC International & UN Partner Network',
    website: 'https://www.brac.net',
    badge: 'Global Humanitarian Actor',
    details: 'Conducts large-scale field training for relief personnel, WASH engineers, and frontline responders managing flood and displacement emergencies.'
  },
  {
    id: 'tc-6',
    name: 'National Institute of Local Government (NILG)',
    acronym: 'NILG Disaster Unit',
    location: 'Agargaon, Sher-e-Bangla Nagar, Dhaka',
    focusArea: 'Union & Ward Disaster Management Committee (UDMC/WDMC) Capacity Building',
    affiliation: 'Ministry of Local Government, Rural Development & Co-operatives (LGRD)',
    website: 'http://nilg.gov.bd',
    badge: 'State Local Governance Institute',
    details: 'Trains elected representatives, Union Parishad chairmen, and local government officials on disaster risk governance, emergency budget allocation, and relief distribution.'
  }
];

export const BANGLADESH_TRAINING = [
  {
    id: 'tr-1',
    category: 'Volunteer Response Certification',
    title: 'BDRCS Community Volunteer Disaster Response Certification',
    provider: 'Bangladesh Red Crescent Society (BDRCS)',
    location: 'Sylhet & Sunamganj Field Center',
    duration: '3 Days Intensive (20-22 Aug 2026)',
    seats: '45 Seats Remaining',
    fee: 'Free / Sponsored',
    description: 'Hands-on practical training covering emergency boat navigation, flood shelter management, search & rescue protocols, and first aid.',
    syllabus: ['Day 1: Flood Risk Triage & Water Safety', 'Day 2: Water Purification & Hygiene Distribution', 'Day 3: Emergency Shelter Administration']
  },
  {
    id: 'tr-2',
    category: 'WASH & Water Testing',
    title: 'WASH in Emergencies & Water Quality Testing Workshop',
    provider: 'UNICEF & DPHE Bangladesh',
    location: 'Dhaka & Online Hybrid',
    duration: '2 Days (25-26 Aug 2026)',
    seats: '60 Seats Remaining',
    fee: 'Free for Relief Workers',
    description: 'Technical workshop on testing water contamination, operating solar purification pumps, and managing sanitation in crowded flood centers.',
    syllabus: ['Day 1: Microbiological Water Testing Kits', 'Day 2: Solar Pump Operations & Halogen Dosing']
  },
  {
    id: 'tr-3',
    category: 'CPP Cyclone Warning Protocol',
    title: 'Cyclone & Flood Early Warning Protocol (CPP Standard)',
    provider: 'Cyclone Preparedness Programme (CPP)',
    location: 'Cox\'s Bazar Training Center',
    duration: '4 Days (28-31 Aug 2026)',
    seats: '30 Seats Remaining',
    fee: 'Free',
    description: 'Comprehensive certification on flag signals, mega-phone announcements, evacuation procedures, and vulnerable group protection during monsoons.',
    syllabus: ['Module 1: Signal 1-10 Weather Warning Protocols', 'Module 2: Coastal Shelter Evacuation', 'Module 3: Women & Child Protection']
  },
  {
    id: 'tr-4',
    category: 'Disaster Risk Management (DRM)',
    title: 'NIRAPAD Disaster Risk Management (DRM) Professional Masterclass',
    provider: 'NIRAPAD Network Bangladesh',
    location: 'Banani, Dhaka / Online Hybrid',
    duration: '5 Days (01-05 Sept 2026)',
    seats: '25 Seats Remaining',
    fee: 'Free for NGO Responders',
    description: 'Standardized DRM framework masterclass covering multi-hazard risk assessment, emergency response plan design, and climate adaptation.',
    syllabus: ['Module 1: Community Risk Assessment (CRA)', 'Module 2: Emergency Response Planning', 'Module 3: Post-Disaster Damage Needs Assessment (DNCA)']
  },
  {
    id: 'tr-5',
    category: 'HADR & Civil-Military Coordination',
    title: 'BIPSOT Humanitarian Assistance & Disaster Relief (HADR) Course',
    provider: 'BIPSOT Cantonment Institute',
    location: 'Rajendrapur Cantonment, Gazipur',
    duration: '1 Week Intensive (10-17 Sept 2026)',
    seats: '20 Seats Remaining',
    fee: 'Government Sponsored',
    description: 'Specialized training for civil-military coordination in complex flood rescue operations, aerial logistics, and medical evacuation.',
    syllabus: ['Module 1: Joint Rescue Command Structure', 'Module 2: Air Mobility & Boat Evacuations', 'Module 3: Field Hospital Triage']
  },
  {
    id: 'tr-6',
    category: 'Local Governance & Relief',
    title: 'NILG Union Parishad Disaster Committee (UDMC) Capacity Workshop',
    provider: 'National Institute of Local Government (NILG)',
    location: 'Agargaon, Dhaka HQ',
    duration: '2 Days (15-16 Sept 2026)',
    seats: '50 Seats Remaining',
    fee: 'Government Sponsored',
    description: 'Empowering local government leaders and Union Parishad members to manage emergency relief funds, NID verification, and fair aid allocation.',
    syllabus: ['Day 1: Emergency Relief Allocation Laws', 'Day 2: Citizen Ledger Transparency & Audit']
  }
];


// Wikipedia Historical Flood Damage & Frequency Dataset (1954 - 2026)
export const HISTORIC_FLOOD_STATS = [
  { year: '1954', inundatedArea: '36,800 km²', pctCountry: '25.6%', deaths: '1,120', returnPeriod: '10 Years', keyDamage: 'Severe crop inundation across Brahmaputra basin.' },
  { year: '1955', inundatedArea: '50,500 km²', pctCountry: '35.2%', deaths: '850', returnPeriod: '15 Years', keyDamage: 'Widespread loss of jute and Aman paddy crops.' },
  { year: '1974', inundatedArea: '52,600 km²', pctCountry: '36.6%', deaths: '2,000+', returnPeriod: '20 Years', keyDamage: 'Post-independence severe monsoon flood & famine.' },
  { year: '1987', inundatedArea: '57,300 km²', pctCountry: '39.9%', deaths: '1,657', returnPeriod: '30-70 Years', keyDamage: '40% land flooded; severe damage west of Brahmaputra.' },
  { year: '1988', inundatedArea: '82,000 km²', pctCountry: '61.1%', deaths: '2,373', returnPeriod: '50-100 Years', keyDamage: 'Dhaka capital submerged for 20 days; 45M affected.' },
  { year: '1998', inundatedArea: '100,000+ km²', pctCountry: '75.0%', deaths: '1,050', returnPeriod: '100+ Years', keyDamage: 'Flood of the Century; 30M homeless, 700k ha crop destroyed.' },
  { year: '2004', inundatedArea: '56,000 km²', pctCountry: '38.0%', deaths: '750', returnPeriod: '20 Years', keyDamage: 'Two-thirds country under water; major infrastructure damage.' },
  { year: '2007', inundatedArea: '62,000 km²', pctCountry: '42.0%', deaths: '1,110', returnPeriod: '25 Years', keyDamage: '252 villages inundated across 40 districts.' },
  { year: '2017', inundatedArea: '10,360 km² (SAR)', pctCountry: '7.0%', deaths: '140+', returnPeriod: '15 Years', keyDamage: 'April Haor flash floods & August monsoon floods.' },
  { year: '2024', inundatedArea: '22,500 km²', pctCountry: '15.3%', deaths: '71', returnPeriod: '30 Years', keyDamage: 'Eastern Bangladesh flash floods (Feni, Noakhali, Comilla).' },
  { year: '2026', inundatedArea: '18,200 km²', pctCountry: '12.4%', deaths: '51', returnPeriod: '20 Years', keyDamage: 'Chittagong-Cox\'s Bazar flash floods & coastal mudslides.' }
];

// Wikipedia Flood Hydrology & Research Reference Compendium
export const WIKIPEDIA_FLOOD_COMPENDIUM = {
  title: 'Floods in Bangladesh: Comprehensive Wikipedia Hydrological & Historical Analysis',
  sourceUrl: 'https://en.wikipedia.org/wiki/Floods_in_Bangladesh',
  lastUpdated: 'August 2026 Archive',
  overview: `
    Bangladesh, situated on the Ganges-Brahmaputra-Meghna (GBM) Delta, is one of the most flood-prone nations in the world. 
    Over 83% of the landmass consists of flat floodplains, and vast areas sit less than 5 meters above mean sea level. 
    Critically, only 20% of river streamflow originates within Bangladesh; 80% flows in from international catchments in India, Nepal, Bhutan, and Tibet.
  `,
  types: [
    { title: 'Flash Floods', description: 'Sudden high-velocity torrents occurring in northeastern/eastern hilly areas (Sylhet, Sunamganj, Chittagong Hill Tracts) due to intense upstream rainfall.' },
    { title: 'Monsoon River Floods', description: 'Seasonal inundation from major rivers (Jamuna, Ganges, Meghna) occurring between June and September during the peak monsoon season.' },
    { title: 'Rain-Fed Drainage Floods', description: 'Localized flooding caused by heavy convective rainfall combined with severe urban and rural drainage congestion.' },
    { title: 'Coastal Tidal Surges', description: 'Cyclone-driven tidal surges in the Bay of Bengal breaching low-lying coastal embankments in Satkhira, Khulna, Bhola, and Barguna.' }
  ],
  benefitsVsDamages: {
    benefits: 'Small-scale natural flooding deposits nutrient-rich alluvial silt across fields, fertilizing agricultural soil, recharging groundwater, and diluting soil salinity.',
    damages: 'Extreme floods cause widespread loss of human life, destruction of soil-and-turf earthen embankments, crop inundation, waterborne disease outbreaks, and severe economic contraction.'
  },
  preparation: [
    { title: 'Community-Based Preparedness (CPP)', detail: 'Local disaster management committees use multi-channel warning systems (flag signals, megaphones, radio) to evacuate vulnerable populations.' },
    { title: 'Flood Shelter Suitability Mapping', detail: 'GIS multi-criteria assessment maps safe shelter zones elevated above 100-year flood levels across 64 districts.' },
    { title: 'Embankment Reinforcement', detail: 'Transitioning from temporary soil-and-turf bunds built by local farmers to concrete-reinforced permanent river defense walls.' },
    { title: 'Satellite Inundation Monitoring', detail: 'Utilizing Sentinel-1 SAR and MODIS satellite imagery for real-time flood extent mapping and damage evaluation.' }
  ],
  climateVariability: `
    Global climate change and El Niño / La Niña cycles are shifting traditional monsoon patterns in Bangladesh. 
    Increasing sea-surface temperatures in the Bay of Bengal trigger more frequent intense depressions, resulting in sudden unpredicted early-monsoon flash floods (such as the April 2017 Haor floods) and rapid river overflows.
  `
};

// Wikipedia Historical Disasters in Bangladesh by Death Toll Dataset
export const WIKIPEDIA_DISASTERS_BY_DEATH_TOLL = [
  {
    name: '1970 Bhola Cyclone',
    type: 'Tropical Cyclone & Surge',
    location: 'Bhola, Patuakhali, Noakhali, Chittagong',
    deathToll: '500,000+',
    date: '12 November 1970',
    notes: 'Deadliest tropical cyclone in recorded world history. Storm surge reached 10+ meters, submerging coastal islands.',
    category: 'Cyclones & Storms',
    citation: 'Wikipedia / NOAA World Disaster Records'
  },
  {
    name: '1897 Great Bengal Cyclone',
    type: 'Tropical Cyclone',
    location: 'Bengal Estuary, Chittagong, Barisal',
    deathToll: '200,000+',
    date: '24 October 1897',
    notes: 'A 12.2-meter (40 ft) tidal surge hit the Meghna estuary, causing widespread famine, epidemics, and property destruction.',
    category: 'Cyclones & Storms',
    citation: 'Wikipedia / India Meteorological Department'
  },
  {
    name: '1876 Great Backerganj Cyclone',
    type: 'Tropical Cyclone',
    location: 'Backerganj (Barisal / Bhola Coast)',
    deathToll: '200,000',
    date: '31 October 1876',
    notes: 'Half of the victims drowned in the surge; another 100,000 perished from post-cyclone famine and cholera.',
    category: 'Cyclones & Storms',
    citation: 'Wikipedia / Imperial Gazetteer Records'
  },
  {
    name: '1991 Bangladesh Cyclone (Marian)',
    type: 'Category 5 Cyclone',
    location: 'Chittagong, Cox\'s Bazar, Noakhali, Bhola',
    deathToll: '138,866',
    date: '29 April 1991',
    notes: 'Wind speeds reached 260 km/h with a 6-meter storm surge. Left 10 million homeless and destroyed 100,000+ livestock.',
    category: 'Cyclones & Storms',
    citation: 'Wikipedia / BWDB Official Disaster Report'
  },
  {
    name: '1974 Bangladesh Famine & Floods',
    type: 'Monsoon Flood & Famine',
    location: 'Brahmaputra Basin & Nationwide',
    deathToll: '2,000+ (Floods) / 27,000+ (Famine)',
    date: 'May - October 1974',
    notes: 'Massive monsoon flooding submerged 36.6% of Bangladesh, destroying seasonal paddy crops.',
    category: 'Monsoon Floods',
    citation: 'Wikipedia / International Food Policy Research Institute'
  },
  {
    name: '2013 Rana Plaza Collapse',
    type: 'Structural Failure',
    location: 'Savar Upazila, Dhaka District',
    deathToll: '1,134',
    date: '24 April 2013',
    notes: 'Deadliest structural failure disaster in modern history. Over 2,500 injured garment workers rescued. (The Guardian / ILO Report)',
    category: 'Structural Failures',
    citation: 'The Guardian / ILO Official Report'
  },
  {
    name: '1988 Catastrophic Megaflood',
    type: 'Monsoon River Flood',
    location: 'Nationwide (60% Submerged)',
    deathToll: '2,373',
    date: 'August - September 1988',
    notes: 'Dhaka capital submerged for 20 days. Over 45 million people affected; return period estimated at 50-100 years.',
    category: 'Monsoon Floods',
    citation: 'Wikipedia / Bangladesh Water Development Board'
  },
  {
    name: '1998 Flood of the Century',
    type: 'Monsoon Mega-Flood',
    location: 'Nationwide (75% Submerged)',
    deathToll: '1,050',
    date: 'July - September 1998',
    notes: 'Prolonged 65-day megaflood. Made 30 million people homeless and destroyed 700,000 hectares of crops.',
    category: 'Monsoon Floods',
    citation: 'Wikipedia / Disaster Management Bureau'
  },
  {
    name: '1986 MV Shamia Ferry Disaster',
    type: 'Maritime Disaster',
    location: 'Meghna River (Near Chandpur)',
    deathToll: '600',
    date: '25 May 1986',
    notes: 'Overloaded double-decker ferry capsized during a sudden nor\'wester squall in the Meghna River. (The Daily Star Report)',
    category: 'Maritime Disasters',
    citation: 'The Daily Star / Reuters Disaster Archive'
  },
  {
    name: '2002 MV Salahuddin-2 Ferry Crash',
    type: 'Maritime Disaster',
    location: 'Meghna River',
    deathToll: '450+',
    date: '3 May 2002',
    notes: 'Passenger ferry sank in deep waters of the Meghna River during stormy monsoon weather. (Reuters Maritime Archive)',
    category: 'Maritime Disasters',
    citation: 'Reuters Maritime Chronology'
  },
  {
    name: '2007 Cyclone Sidr',
    type: 'Category 5 Cyclone',
    location: 'Barguna, Patuakhali, Sundarbans Coast',
    deathToll: '3,447 (Official) / 10,000+ (Est)',
    date: '15 November 2007',
    notes: 'Devastating Category 5 cyclone struck southern coast with 5-meter surges, wrecking Sundarbans mangrove buffer.',
    category: 'Cyclones & Storms',
    citation: 'Wikipedia / Red Cross Red Crescent Appeal'
  },
  {
    name: '2009 Cyclone Aila',
    type: 'Severe Cyclonic Storm',
    location: 'Satkhira, Khulna, Coastal Chars',
    deathToll: '190+',
    date: '25 May 2009',
    notes: 'Breached coastal embankments causing long-term saline inundation of 200,000 homes in southwestern coastal districts.',
    category: 'Cyclones & Storms',
    citation: 'Wikipedia / Ministry of Disaster Management'
  },
  {
    name: '1984 Biman Airlines Fokker Crash',
    type: 'Aviation Accident',
    location: 'Near Dhaka Shahjalal Airport',
    deathToll: '49',
    date: '5 August 1984',
    notes: 'Fokker F27 plane crashed into a swamp near Dhaka airport while attempting to land in heavy rain. (New York Times Archive)',
    category: 'Aviation Accidents',
    citation: 'The New York Times / Reuters Aviation Report'
  }
];




