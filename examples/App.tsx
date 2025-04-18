'use client'

import { useEffect, useState } from 'react';
import { TimelineView } from '../src/lib/Timeline';

function App() {
  const [sparqlData, setSparqlData] = useState(null);

  const endpointUrl = 'https://query.wikidata.org/sparql';
  const sparqlQuery = `#Movies with Bud Spencer
SELECT ?item ?itemLabel (MIN(?date) AS ?firstReleased) ?_image
WHERE {
  ?item wdt:P161 wd:Q221074;
        wdt:P577 ?date
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],mul,en". }
  OPTIONAL { ?item wdt:P18 ?_image. }
} GROUP BY ?item ?itemLabel ?_image
ORDER BY (?date)`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(endpointUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/sparql-query',
            'Accept': 'application/json'
          },
          body: sparqlQuery
        });
        const data = await response.json();
        setSparqlData(data?.results.bindings);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [sparqlQuery]);

  return (
    <>
      {!sparqlData ?
        (<div>Loading...</div>)
        : (
          <TimelineView
            data={sparqlData}
            className='h-screen'
          />
        )}
    </>
  )
}

export default App
