export const prepareSearchFormData = (formData) => {
  const {
    inn,
    limit,
    tonality,
    startDate,
    endDate,
    maxFullness,
    inBusinessNews,
    onlyMainRole,
    onlyWithRiskFactors,
    excludeTechNews,
    excludeAnnouncements,
    excludeDigests,
  } = formData;

  const preparedData = {
    issueDateInterval: {
      startDate: new Date(startDate).toISOString().split('T')[0],
      endDate: new Date(endDate).toISOString().split('T')[0],
    },
    searchContext: {
      targetSearchEntitiesContext: {
        targetSearchEntities: [
          {
            type: "company",
            sparkId: null,
            entityId: null,
            inn: inn,
            maxFullness: maxFullness,
            inBusinessNews: inBusinessNews,
          },
        ],
        onlyMainRole: onlyMainRole,
        tonality: tonality.value,
        onlyWithRiskFactors: onlyWithRiskFactors,
        riskFactors: {
          and: [],
          or: [],
          not: [],
        },
        themes: {
          and: [],
          or: [],
          not: [],
        },
      },
      themesFilter: {
        and: [],
        or: [],
        not: [],
      },
    },
    searchArea: {
      includedSources: [],
      excludedSources: [],
      includedSourceGroups: [],
      excludedSourceGroups: [],
    },
    attributeFilters: {
      excludeTechNews: excludeTechNews,
      excludeAnnouncements: excludeAnnouncements,
      excludeDigests: excludeDigests,
    },
    similarMode: "duplicates",
    limit: limit,
    sortType: "sourceInfluence",
    sortDirectionType: "desc",
    intervalType: "month",
    histogramTypes: ["totalDocuments", "riskFactors"],
  };

  return preparedData;
};
