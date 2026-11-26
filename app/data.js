/* Indonesia in Numbers — data.js
   Single source of truth for every figure on the site. All figures are from
   the World Bank World Development Indicators (vintage 11 Nov 2026), BPS
   (Statistics Indonesia), UNDP, the UN World Population Prospects 2024, the
   CIA World Factbook, and Indonesia's Ministry of Energy and Mineral
   Resources. Each value carries its reference year and its source. Derived
   figures are labelled as derived. Nothing here is estimated or invented. */
var INDATA = {
  meta: {
    country: 'Indonesia',
    siteName: 'Indonesia in Numbers',
    latestYear: 2024,
    dataAsOf: 'November 2026',
    currency: 'Indonesian rupiah (IDR)'
  },
  years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  series: {
    gdpNominal: { label: 'GDP, nominal', unit: '$ billion', source: 'World Bank WDI (NY.GDP.MKTP.CD)',
      values: [860.9, 931.9, 1015.6, 1042.3, 1119.1, 1059.1, 1186.5, 1319.1, 1371.2, 1396.3] },
    gdpGrowth: { label: 'Real GDP growth', unit: '% per year', source: 'World Bank WDI (NY.GDP.MKTP.KD.ZG)',
      values: [4.88, 5.03, 5.07, 5.17, 5.02, -2.07, 3.70, 5.31, 5.05, 5.03] },
    population: { label: 'Population', unit: 'millions', source: 'World Bank WDI (SP.POP.TOTL)',
      values: [261.8, 264.6, 267.3, 270.0, 272.5, 274.8, 276.8, 278.8, 281.2, 283.5] },
    internet: { label: 'Internet users', unit: '% of population', source: 'World Bank WDI (IT.NET.USER.ZS)',
      values: [22.1, 25.4, 32.3, 39.9, 47.7, 53.7, 62.1, 66.5, 69.2, 72.8] },
    inflation: { label: 'Inflation (CPI)', unit: '% per year', source: 'World Bank WDI (FP.CPI.TOTL.ZG)',
      values: [6.36, 3.53, 3.81, 3.20, 3.03, 1.92, 1.56, 4.21, 3.67, 2.18] },
    gdpPerCapita: { label: 'GDP per capita', unit: 'US$', source: 'World Bank WDI (NY.GDP.PCAP.CD)',
      values: [3288, 3521, 3799, 3861, 4107, 3854, 4287, 4731, 4876, 4925] },
    lifeExpectancy: { label: 'Life expectancy at birth', unit: 'years', source: 'World Bank WDI (SP.DYN.LE00.IN)',
      values: [69.52, 69.73, 69.95, 70.08, 70.35, 68.82, 67.45, 70.93, 71.15, 71.29] },
    urban: { label: 'Urban population', unit: '% of total', source: 'World Bank WDI (SP.URB.TOTL.IN.ZS)',
      values: [53.2, 53.8, 54.5, 55.1, 55.7, 56.3, 56.9, 57.5, 58.1, 58.8] }
  },
  healthSpending: { label: 'Health spending', unit: '% of GDP', source: 'World Bank WDI (SH.XPD.CHEX.GD.ZS)',
    years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
    values: [2.92, 3.02, 2.90, 2.87, 2.88, 3.42, 3.71, 2.69, 2.70] },
  co2PerCapita: { label: 'CO2 emissions per capita', unit: 'tonnes', source: 'World Bank WDI mirrors (EN.ATM.CO2E.PC)',
    years: [2022, 2023, 2024], values: [2.72, 2.71, 2.87] },
  forestEndpoints: { label: 'Forest area', unit: '% of land area', source: 'World Bank WDI (AG.LND.FRST.ZS)',
    years: [2015, 2024], values: [50.61, 50.67] },
  enrolment: {
    label: 'Gross school enrolment', unit: '%', source: 'World Bank WDI (SE.PRM.ENRR / SE.SEC.ENRR)',
    years: [2015, 2024],
    primary: [108.0, 100.0], secondary: [87.8, 98.8]
  },
  sectors: { label: 'GDP by sector, 2024', unit: '% of GDP', source: 'World Bank WDI (NV.AGR / NV.IND / NV.SRV.TOTL.ZS)',
    rows: [
      { name: 'Services', value: 43.8 },
      { name: 'Industry', value: 39.3 },
      { name: 'Agriculture, forestry & fishing', value: 12.6 },
      { name: 'Taxes less subsidies (residual)', value: 4.3 }
    ] },
  ageGroups: { label: 'Population by age group, 2024', unit: '% of total', source: 'World Bank WDI (SP.POP.0014 / SP.POP.1564 / SP.POP.65UP.TO.ZS)',
    rows: [
      { name: '0–14 years', share: 24.6, millions: 69.7 },
      { name: '15–64 years', share: 68.1, millions: 193.1 },
      { name: '65+ years', share: 7.3, millions: 20.7 }
    ] },
  islands: { label: 'Population by island group, 2025', unit: '% of total', source: 'BPS, SUPAS 2025 (BRS No. 51/05/Th. XXIX)',
    rows: [
      { name: 'Java', millions: 158.41, share: 55.65 },
      { name: 'Sumatra', millions: 62.32, share: 21.89 },
      { name: 'Sulawesi', millions: 21.06, share: 7.40 },
      { name: 'Kalimantan', millions: 17.75, share: 6.23 },
      { name: 'Bali & Nusa Tenggara', millions: 15.95, share: 5.60 },
      { name: 'Maluku & Papua (residual, derived)', millions: 9.18, share: 3.23 }
    ] },
  provinces: { label: 'Provinces of Indonesia, 38', unit: 'people', source: 'Population: BPS, mid-year estimates 2025. HDI 2024: BPS (IPM 2024; provincial values as revised in the Nov 2025 release). Poverty Sep 2024: BPS, BRS. GRP per capita 2024: BPS (Seri 2010). See audit-log.md for the full verification trail.',
    rows: [
      { name: 'West Java', island: 'Java', capital: 'Bandung', pop: 50759000, hdi: 74.92, poverty: 7.08, gdppc: 59865 },
      { name: 'East Java', island: 'Java', capital: 'Surabaya', pop: 42089300, hdi: 75.35, poverty: 9.56, gdppc: 80856 },
      { name: 'Central Java', island: 'Java', capital: 'Semarang', pop: 38233900, hdi: 73.87, poverty: 9.58, gdppc: 50824 },
      { name: 'North Sumatra', island: 'Sumatra', capital: 'Medan', pop: 15785800, hdi: 75.76, poverty: 7.19, gdppc: 78310 },
      { name: 'Banten', island: 'Java', capital: 'Serang', pop: 12537400, hdi: 76.35, poverty: 5.70, gdppc: 74673 },
      { name: 'Jakarta', island: 'Java', capital: 'Jakarta', pop: 10678000, hdi: 84.15, poverty: 4.14, gdppc: 367687 },
      { name: 'South Sulawesi', island: 'Sulawesi', capital: 'Makassar', pop: 9563100, hdi: 75.18, poverty: 7.77, gdppc: 78748 },
      { name: 'Lampung', island: 'Sumatra', capital: 'Bandar Lampung', pop: 9522900, hdi: 73.13, poverty: 10.62, gdppc: 55009 },
      { name: 'South Sumatra', island: 'Sumatra', capital: 'Palembang', pop: 8928500, hdi: 73.84, poverty: 10.51, gdppc: 80663 },
      { name: 'Riau', island: 'Sumatra', capital: 'Pekanbaru', pop: 6811200, hdi: 75.67, poverty: 6.36, gdppc: 176385 },
      { name: 'West Sumatra', island: 'Sumatra', capital: 'Padang', pop: 5914300, hdi: 76.43, poverty: 5.42, gdppc: 59549 },
      { name: 'West Kalimantan', island: 'Kalimantan', capital: 'Pontianak', pop: 5766000, hdi: 71.19, poverty: 6.25, gdppc: 56984 },
      { name: 'East Nusa Tenggara', island: 'Bali & Nusa Tenggara', capital: 'Kupang', pop: 5742600, hdi: 69.14, poverty: 19.02, gdppc: 25837 },
      { name: 'West Nusa Tenggara', island: 'Bali & Nusa Tenggara', capital: 'Mataram', pop: 5731100, hdi: 73.10, poverty: 11.91, gdppc: 33667 },
      { name: 'Aceh', island: 'Sumatra', capital: 'Banda Aceh', pop: 5626000, hdi: 75.36, poverty: 12.64, gdppc: 45770 },
      { name: 'Bali', island: 'Bali & Nusa Tenggara', capital: 'Denpasar', pop: 4461300, hdi: 78.63, poverty: 3.80, gdppc: 72658 },
      { name: 'South Kalimantan', island: 'Kalimantan', capital: 'Banjarbaru', pop: 4323300, hdi: 75.19, poverty: 4.02, gdppc: 70577 },
      { name: 'East Kalimantan', island: 'Kalimantan', capital: 'Samarinda', pop: 4267600, hdi: 78.79, poverty: 5.51, gdppc: 208331 },
      { name: 'Yogyakarta', island: 'Java', capital: 'Yogyakarta', pop: 3781500, hdi: 81.62, poverty: 10.40, gdppc: 55039 },
      { name: 'Jambi', island: 'Sumatra', capital: 'Jambi', pop: 3768500, hdi: 74.36, poverty: 7.26, gdppc: 92786 },
      { name: 'Central Sulawesi', island: 'Sulawesi', capital: 'Palu', pop: 3156100, hdi: 72.24, poverty: 11.04, gdppc: 131643 },
      { name: 'Central Kalimantan', island: 'Kalimantan', capital: 'Palangka Raya', pop: 2845000, hdi: 74.28, poverty: 5.26, gdppc: 84730 },
      { name: 'Southeast Sulawesi', island: 'Sulawesi', capital: 'Kendari', pop: 2836700, hdi: 73.62, poverty: 10.63, gdppc: 72031 },
      { name: 'North Sulawesi', island: 'Sulawesi', capital: 'Manado', pop: 2721400, hdi: 75.68, poverty: 6.70, gdppc: 75235 },
      { name: 'Riau Islands', island: 'Sumatra', capital: 'Tanjung Pinang', pop: 2213500, hdi: 79.89, poverty: 4.78, gdppc: 172459 },
      { name: 'Bengkulu', island: 'Sumatra', capital: 'Bengkulu', pop: 2138000, hdi: 74.91, poverty: 12.52, gdppc: 52305 },
      { name: 'Maluku', island: 'Maluku & Papua', capital: 'Ambon', pop: 1970600, hdi: 73.40, poverty: 15.78, gdppc: 33652 },
      { name: 'Bangka Belitung', island: 'Sumatra', capital: 'Pangkal Pinang', pop: 1550800, hdi: 74.55, poverty: 5.08, gdppc: 75323 },
      { name: 'West Sulawesi', island: 'Sulawesi', capital: 'Mamuju', pop: 1525300, hdi: 70.46, poverty: 10.71, gdppc: 46654 },
      { name: 'Central Papua', island: 'Maluku & Papua', capital: 'Nabire', pop: 1492300, hdi: 60.25, poverty: 27.60, gdppc: 107566 },
      { name: 'Highland Papua', island: 'Maluku & Papua', capital: 'Wamena', pop: 1484900, hdi: 54.43, poverty: 29.66, gdppc: 19111 },
      { name: 'North Maluku', island: 'Maluku & Papua', capital: 'Sofifi', pop: 1373800, hdi: 71.84, poverty: 6.03, gdppc: 97262 },
      { name: 'Gorontalo', island: 'Sulawesi', capital: 'Gorontalo', pop: 1242200, hdi: 72.01, poverty: 13.87, gdppc: 47477 },
      { name: 'Papua', island: 'Maluku & Papua', capital: 'Jayapura', pop: 1073600, hdi: 73.83, poverty: 18.09, gdppc: 84305 },
      { name: 'North Kalimantan', island: 'Kalimantan', capital: 'Tanjung Selor', pop: 749400, hdi: 73.41, poverty: 5.38, gdppc: 208210 },
      { name: 'Southwest Papua', island: 'Maluku & Papua', capital: 'Sorong', pop: 636400, hdi: 69.65, poverty: 16.95, gdppc: 61624 },
      { name: 'West Papua', island: 'Maluku & Papua', capital: 'Manokwari', pop: 587600, hdi: 67.69, poverty: 21.09, gdppc: 139213 },
      { name: 'South Papua', island: 'Maluku & Papua', capital: 'Merauke', pop: 549700, hdi: 68.86, poverty: 19.35, gdppc: 64928 }
    ] },
  /* Population pyramid, UN World Population Prospects 2024 (medium variant,
     1 July 2024). Totals match the published figures exactly: 283,487,931
     people (male 142,407,916; female 141,080,015), median age 30.1. The
     45–49 band is DERIVED as the residual of the published sex totals (its
     source record was truncated in the UN data feed); all other bands are
     published values. Bands 80+ are grouped here; the split is in the note:
     80–84: 725,436 / 1,242,430; 85–89: 273,464 / 539,079; 90–94: 58,814 /
     139,798; 95–99: 6,662 / 18,905; 100+: 318 / 1,135 (male / female). */
  pyramid: { label: 'Population by age and sex, 2024', unit: 'people', source: 'UN World Population Prospects 2024 (medium variant, 1 July 2024)',
    total: 283487931, male: 142407916, female: 141080015, medianAge: 30.1,
    bands: [
      { label: '0–4', male: 11414146, female: 10808560 },
      { label: '5–9', male: 11855424, female: 11251375 },
      { label: '10–14', male: 12517801, female: 11884481 },
      { label: '15–19', male: 11968518, female: 11368416 },
      { label: '20–24', male: 11239481, female: 10690743 },
      { label: '25–29', male: 11273310, female: 10760395 },
      { label: '30–34', male: 10796007, female: 10304847 },
      { label: '35–39', male: 10601582, female: 10168733 },
      { label: '40–44', male: 10534164, female: 10219386 },
      { label: '45–49', male: 9610645, female: 9488309, derived: true },
      { label: '50–54', male: 8591960, female: 8652190 },
      { label: '55–59', male: 7331465, female: 7582241 },
      { label: '60–64', male: 5734472, female: 6176970 },
      { label: '65–69', male: 4036060, female: 4642214 },
      { label: '70–74', male: 2453421, female: 3091895 },
      { label: '75–79', male: 1384766, female: 2047913 },
      { label: '80+', male: 1064694, female: 1941347 }
    ] },
  /* CPI index, DERIVED by compounding the published annual CPI inflation
     rates (World Bank WDI, FP.CPI.TOTL.ZG): 2015 = 100, then each year
     multiplied by (1 + that year's inflation). Used only by the inflation
     calculator; the index itself is labelled derived wherever it appears. */
  cpiIndex: { label: 'Consumer price index (derived)', unit: 'index, 2015 = 100', source: 'Derived from annual CPI inflation rates, World Bank WDI (FP.CPI.TOTL.ZG)',
    years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
    values: [100.00, 103.53, 107.47, 110.91, 114.27, 116.47, 118.29, 123.27, 127.79, 130.57] },
  exports: { label: 'Top exports, 2024', unit: '$ billion', source: 'BPS / customs data',
    rows: [
      { name: 'Mineral fuels & oils', value: 55.52, share: 21.0, note: 'incl. coal $34.59B, petroleum gas $8.77B, lignite $8.25B' },
      { name: 'Animal & vegetable fats & oils', value: 26.82, share: 10.1, note: 'incl. palm oil $22.68B' },
      { name: 'Iron & steel', value: 25.80, share: 9.8, note: '' }
    ] },
  destinations: { label: 'Top export destinations, 2024', unit: 'share of goods exports', source: 'Customs data',
    rows: [
      { name: 'China', valueUsd: 68.0, share: 22.5 },
      { name: 'United States', valueUsd: null, share: 9.8 },
      { name: 'India', valueUsd: null, share: 8.1 }
    ] },
  energy: { label: 'Primary energy mix, 2024', unit: '% of primary energy', source: 'Ministry of Energy & Mineral Resources (ESDM)',
    rows: [
      { name: 'Coal', value: 40.37 },
      { name: 'Oil', value: 28.82 },
      { name: 'Natural gas', value: 16.17 },
      { name: 'New & renewable', value: 14.65 }
    ] },
  /* Full indicator table for the Data & Sources page. topic drives the filter buttons. */
  indicators: [
    { topic: 'Population', name: 'Population', value: '283,487,931', year: 2024, source: 'World Bank WDI (SP.POP.TOTL)' },
    { topic: 'Population', name: 'Population growth', value: '0.81% per year', year: 2024, source: 'World Bank WDI (SP.POP.GROW)' },
    { topic: 'Population', name: 'Median age', value: '30.1 years', year: 2024, source: 'UN World Population Prospects 2024' },
    { topic: 'Population', name: 'Fertility rate', value: '2.12 children per woman', year: 2024, source: 'World Bank WDI (SP.DYN.TFRT.IN)' },
    { topic: 'Population', name: 'Dependency ratio', value: '46.8', year: 2024, source: 'World Bank WDI (SP.POP.DPND)' },
    { topic: 'Population', name: 'Population density', value: '149 people per km²', year: 2024, source: 'World Bank WDI' },
    { topic: 'Population', name: 'Urban population', value: '58.8% of total', year: 2024, source: 'World Bank WDI (SP.URB.TOTL.IN.ZS)' },
    { topic: 'Population', name: 'Labour force', value: '143.1 million', year: 2024, source: 'CIA World Factbook' },
    { topic: 'Population', name: 'Islands (official count)', value: '17,508', year: null, source: 'CIA World Factbook; Law No. 9/1996' },
    { topic: 'Population', name: 'Provinces', value: '38', year: 2025, source: 'BPS, SUPAS 2025' },
    { topic: 'Population', name: 'Land area', value: '1,904,569 km²', year: 2024, source: 'CIA World Factbook' },
    { topic: 'Economy', name: 'GDP (nominal)', value: '$1,396.3 billion', year: 2024, source: 'World Bank WDI (NY.GDP.MKTP.CD)' },
    { topic: 'Economy', name: 'GDP per capita', value: '$4,925', year: 2024, source: 'World Bank WDI (NY.GDP.PCAP.CD)' },
    { topic: 'Economy', name: 'GDP per capita, PPP', value: '$16,472', year: 2024, source: 'World Bank WDI (NY.GDP.PCAP.PP.CD)' },
    { topic: 'Economy', name: 'Real GDP growth', value: '5.03%', year: 2024, source: 'World Bank WDI (NY.GDP.MKTP.KD.ZG); BPS' },
    { topic: 'Economy', name: 'Inflation (CPI)', value: '2.18%', year: 2024, source: 'World Bank WDI (FP.CPI.TOTL.ZG)' },
    { topic: 'Economy', name: 'Unemployment (open, BPS)', value: '4.91%', year: 2024, source: 'BPS (TPT), August 2024' },
    { topic: 'Economy', name: 'Unemployment (ILO modelled)', value: '3.30%', year: 2024, source: 'World Bank WDI (SL.UEM.TOTL.ZS) — methodology differs from BPS' },
    { topic: 'Economy', name: 'Rupiah, average per USD', value: '15,855', year: 2024, source: 'World Bank WDI (PA.NUS.FCRF)' },
    { topic: 'Economy', name: 'Gini index', value: '34.9', year: 2024, source: 'World Bank WDI (SI.POV.GINI)' },
    { topic: 'Economy', name: 'Human Development Index', value: '0.728', year: 2023, source: 'UNDP Human Development Report' },
    { topic: 'Health', name: 'Life expectancy at birth', value: '71.3 years', year: 2024, source: 'World Bank WDI (SP.DYN.LE00.IN)' },
    { topic: 'Health', name: 'Life expectancy, male', value: '69.2 years', year: 2024, source: 'World Bank WDI' },
    { topic: 'Health', name: 'Life expectancy, female', value: '73.4 years', year: 2024, source: 'World Bank WDI' },
    { topic: 'Health', name: 'Infant mortality', value: '17.7 per 1,000 live births', year: 2024, source: 'World Bank WDI (SH.DYN.MORT)' },
    { topic: 'Health', name: 'Health spending', value: '2.7% of GDP', year: 2023, source: 'World Bank WDI (SH.XPD.CHEX.GD.ZS)' },
    { topic: 'Education', name: 'Adult literacy (15+)', value: '96.0%', year: 2020, source: 'World Bank WDI (SE.ADT.LITR.ZS) — latest available' },
    { topic: 'Education', name: 'Primary school enrolment (gross)', value: '100.0%', year: 2024, source: 'World Bank WDI (SE.PRM.ENRR)' },
    { topic: 'Education', name: 'Secondary school enrolment (gross)', value: '98.8%', year: 2024, source: 'World Bank WDI (SE.SEC.ENRR)' },
    { topic: 'Environment', name: 'Forest area', value: '50.7% of land area', year: 2024, source: 'World Bank WDI (AG.LND.FRST.ZS)' },
    { topic: 'Environment', name: 'CO2 emissions per capita', value: '2.87 tonnes', year: 2024, source: 'World Bank WDI (EN.ATM.CO2E.PC, via mirrors)' },
    { topic: 'Environment', name: 'CO2 emissions, total', value: '812.2 million tonnes', year: 2024, source: 'World Bank WDI (via mirrors), excl. land use' },
    { topic: 'Environment', name: 'Renewable share of primary energy', value: '14.65%', year: 2024, source: 'Ministry of Energy & Mineral Resources (ESDM)' },
    { topic: 'Trade', name: 'Exports of goods', value: '$264.7 billion', year: 2024, source: 'BPS / customs data' },
    { topic: 'Trade', name: 'Exports of goods & services', value: '22.3% of GDP', year: 2024, source: 'World Bank WDI (NE.EXP.GNFS.ZS)' },
    { topic: 'Trade', name: 'Foreign tourist arrivals', value: '13.90 million (+19.05% yoy)', year: 2024, source: 'BPS, BRS No. 11/02/Th. XXVIII' },
    { topic: 'Trade', name: 'Largest export market (China)', value: '$68.0 billion (22.5%)', year: 2024, source: 'Customs data' },
    { topic: 'Trade', name: 'Top export: mineral fuels & oils', value: '$55.52 billion (21.0%)', year: 2024, source: 'BPS / customs data' },
    { topic: 'Trade', name: 'Top export: fats & oils (incl. palm oil)', value: '$26.82 billion (10.1%)', year: 2024, source: 'BPS / customs data' },
    { topic: 'Trade', name: 'Top export: iron & steel', value: '$25.80 billion (9.8%)', year: 2024, source: 'BPS / customs data' },
    { topic: 'Trade', name: 'Trade balance', value: '$31.04 billion surplus', year: 2024, source: 'BPS, BRS (exports $264.70bn, imports $233.66bn)' },
    { topic: 'Economy', name: 'GDP, PPP', value: '$4.67 trillion', year: 2024, source: 'World Bank WDI (NY.GDP.MKTP.PP.CD)' },
    { topic: 'Economy', name: 'Imports of goods & services', value: '20.5% of GDP', year: 2024, source: 'World Bank WDI (NE.IMP.GNFS.ZS)' },
    { topic: 'Economy', name: 'Inflation (CPI, BPS)', value: '1.57% (December, year on year)', year: 2024, source: 'BPS' },
    { topic: 'Society', name: 'Poverty rate', value: '8.57%', year: 2024, source: 'BPS, BRS No. 07/01/Th. XXVIII (September 2024)' },
    { topic: 'Society', name: 'Human Development Index (IPM)', value: '75.02', year: 2024, source: 'BPS (released 15 Nov 2024)' },
    { topic: 'Education', name: 'Tertiary enrolment (gross)', value: '44.9%', year: 2023, source: 'World Bank WDI (SE.TER.ENRR)' },
    { topic: 'Health', name: 'Maternal mortality', value: '140 per 100,000 live births', year: 2023, source: 'World Bank WDI (SH.STA.MMRT)' },
    { topic: 'Population', name: 'Mobile cellular subscriptions', value: '122.5 per 100 people', year: 2024, source: 'World Bank WDI (IT.CEL.SETS.P2)' },
    { topic: 'Population', name: 'Fixed broadband subscriptions', value: '4.92 per 100 people', year: 2024, source: 'World Bank WDI (IT.NET.BBND.P2)' }
  ]
};
