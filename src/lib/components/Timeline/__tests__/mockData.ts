export const validTimelineData = [
  {
    film: {
      type: "uri",
      value: "http://www.wikidata.org/entity/Q47703"
    },
    title: {
      type: "literal",
      value: "The Godfather",
      "xml:lang": "en"
    },
    countries: {
      type: "literal",
      value: "Italy|United States"
    },
    genres: {
      type: "literal",
      value: "film based on a novel|crime drama film|gangster film|thriller film|epic film|crime film|crime thriller film|historical film|drama film|historical drama film"
    },
    description: {
      type: "literal",
      value: "1972 film by Francis Ford Coppola",
      "xml:lang": "en"
    },
    sitelinks: {
      datatype: "http://www.w3.org/2001/XMLSchema#int",
      type: "literal",
      value: "129"
    },
    releaseDateValue: {
      datatype: "http://www.w3.org/2001/XMLSchema#dateTime",
      type: "literal",
      value: "1972-10-18T00:00:00Z"
    }
  }
];

export const validTimelineDataCompact = [
  {
    film: {
      type: "uri",
      value: "http://www.wikidata.org/entity/Q1480733"
    },
    title: {
      type: "literal",
      value: "My Best Friend's Birthday",
      "xml:lang": "en"
    },
    releaseDate: {
      datatype: "http://www.w3.org/2001/XMLSchema#dateTime",
      type: "literal",
      value: "1987-01-01T00:00:00Z"
    }
  },
  {
    film: {
      type: "uri",
      value: "http://www.wikidata.org/entity/Q72962"
    },
    title: {
      type: "literal",
      value: "Reservoir Dogs",
      "xml:lang": "en"
    },
    releaseDate: {
      datatype: "http://www.w3.org/2001/XMLSchema#dateTime",
      type: "literal",
      value: "1992-09-10T00:00:00Z"
    }
  },
];

export const invalidTimelineData = [
  {
    country: {
      type: "uri",
      value: "http://www.wikidata.org/entity/Q148"
    },
    country_name: {
      type: "literal",
      value: "People's Republic of China",
      "xml:lang": "en"
    },
    mountain: {
      type: "uri",
      value: "http://www.wikidata.org/entity/Q513"
    },
    mountain_name: {
      type: "literal",
      value: "Mount Everest",
      "xml:lang": "en"
    },
    max_height: {
      datatype: "http://www.w3.org/2001/XMLSchema#decimal",
      type: "literal",
      value: "8850"
    }
  }
];
