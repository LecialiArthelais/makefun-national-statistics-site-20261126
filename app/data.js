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
  provinces: { label: 'Largest provinces by population, 2026', unit: 'millions', source: 'BPS, Statistik Indonesia 2026 (population projections)',
    rows: [
      { name: 'West Java', value: 51.16 },
      { name: 'East Java', value: 42.35 },
      { name: 'Central Java', value: 38.57 },
      { name: 'North Sumatra', value: 15.98 },
      { name: 'Banten', value: 12.64 }
    ] },
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
    { topic: 'Trade', name: 'Top export: iron & steel', value: '$25.80 billion (9.8%)', year: 2024, source: 'BPS / customs data' }
  ]
};
