import React, { useState } from 'react';
import '../assets/styles/components/Facets.scss'
import Slider from 'rc-slider';

type Facet = {
  name: string;
  values: string[];
};

type FacetSelection = {
  [facetName: string]: string[];
};

interface FacetsMenuProps {
  facets: Facet[];
  onSelectionChange: (selectedFacets: FacetSelection) => void; // Callback to return the selected facets
}

const FacetsMenu: React.FC<FacetsMenuProps> = ({ facets, onSelectionChange }) => {
  const [selectedFacets, setSelectedFacets] = useState<FacetSelection>({});
  const [range, setRange] =  useState<number[]>([0, 100]);

  const handleFacetChange = (facetName: string, value: string) => {
    setSelectedFacets((prevSelection) => {
      const currentSelection = prevSelection[facetName] || [];

      // Check if the value is already selected
      let updatedSelection;
      if (currentSelection.includes(value)) {
        updatedSelection = currentSelection.filter((v) => v !== value); // Remove value if it's already selected
      } else {
        updatedSelection = [...currentSelection, value]; // Add the value
      }

      const newSelection = {
        ...prevSelection,
        [facetName]: updatedSelection,
      };

      onSelectionChange(newSelection);
      return newSelection;
    });
  };

  return (
    <div className="facets-menu">
      {facets.map((facet) => (
        <div key={facet.name} className="facet-section">
          <h4>{facet.name}</h4>
          <ul>
            {facet.values.map((value) => (
              <li key={value}>
                <label>
                  <input
                    type="checkbox"
                    value={value}
                    checked={selectedFacets[facet.name]?.includes(value) || false}
                    onChange={() => handleFacetChange(facet.name, value)}
                  />
                  {value}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default FacetsMenu;
