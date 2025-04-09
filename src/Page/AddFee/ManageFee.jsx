import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ManageFee.css";

const BASE_URL = "http://localhost:5000";

const ManageFee = () => {
  const [locations, setLocations] = useState({});
  const [selectedLocation, setSelectedLocation] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newLocationPrice, setNewLocationPrice] = useState("");
  const [newState, setNewState] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [openStates, setOpenStates] = useState({}); // <-- track open state

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/countries`);
        const locationsData = response.data.reduce((acc, location) => {
          acc[location.country] = {
            price: location.price,
            states: location.states,
          };
          return acc;
        }, {});
        setLocations(locationsData);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  const toggleOpenStates = (country) => {
    setOpenStates((prev) => ({
      ...prev,
      [country]: !prev[country],
    }));
  };

  const handleAddLocation = async () => {
    if (newLocation.trim() && newLocationPrice.trim()) {
      try {
        const response = await axios.post(`${BASE_URL}/countries`, {
          country: newLocation,
          price: parseFloat(newLocationPrice),
        });

        setLocations((prev) => ({
          ...prev,
          [response.data.country]: {
            price: response.data.price,
            states: {},
          },
        }));

        setNewLocation("");
        setNewLocationPrice("");
      } catch (error) {
        console.error("Error adding country:", error);
      }
    }
  };

  const handleAddState = async () => {
    if (selectedLocation && newState.trim() && newPrice.trim()) {
      try {
        const response = await axios.put(
          `${BASE_URL}/countries/${selectedLocation}/states`,
          {
            state: newState,
            price: parseFloat(newPrice),
          }
        );

        const updatedStates = response.data.states;

        setLocations((prev) => ({
          ...prev,
          [selectedLocation]: {
            ...prev[selectedLocation],
            states: updatedStates,
          },
        }));

        setNewState("");
        setNewPrice("");
      } catch (error) {
        console.error("Error adding/updating state:", error);
      }
    }
  };

  const handleDeleteLocation = async (country) => {
    try {
      await axios.delete(`${BASE_URL}/countries/${country}`);
      const updatedLocations = { ...locations };
      delete updatedLocations[country];
      setLocations(updatedLocations);
      setOpenStates((prev) => {
        const newOpen = { ...prev };
        delete newOpen[country];
        return newOpen;
      });

      if (selectedLocation === country) {
        setSelectedLocation("");
      }
    } catch (error) {
      console.error("Error deleting country:", error);
    }
  };

  const handleDeleteState = async (country, state) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/countries/${country}/states/${state}`
      );

      const updatedStates = response.data.location.states;

      setLocations((prev) => ({
        ...prev,
        [country]: {
          ...prev[country],
          states: updatedStates,
        },
      }));
    } catch (error) {
      console.error("Error deleting state:", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="head">Manage Delivery Fees</div>

      {/* Add Country */}
      <div className="country-body">
        <div className="head"> Add New Country</div>
        <div className="">
          <input
            type="text"
            placeholder="Country"
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            className="form-control"
          />
          <input
            type="number"
            placeholder="Country Fee"
            value={newLocationPrice}
            onChange={(e) => setNewLocationPrice(e.target.value)}
            className="form-control mt-3"
          />
          <button onClick={handleAddLocation} className="btn btn-primary mt-3">
            Add Country
          </button>
        </div>
      </div>

      {/* Country List */}
      <div className="grid gap-4">
        {Object.entries(locations).map(([country, data]) => (
          <div
            key={country}
            className={`border rounded-lg p-4 shadow-sm ${
              selectedLocation === country
                ? "bg-blue-50 border-blue-400"
                : "bg-white"
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="country-name">{country}</h4>
                <p className="country-fee">Fee: ${data.price}</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setSelectedLocation(country)}
                  className="btn btn-primary ms-2"
                >
                  Select
                </button>

                <button
                  onClick={() => handleDeleteLocation(country)}
                  className="btn btn-danger ms-2"
                >
                  Delete
                </button>
                <button
                  onClick={() => toggleOpenStates(country)}
                  className="btn btn-secondary ms-2"
                >
                  {openStates[country] ? "Collapse States" : "Show States"}
                </button>
              </div>
            </div>

            {/* Collapsible State List */}
            {openStates[country] && (
              <div className="mt-3">
                <h5 className="head2">States:</h5>
                {data.states && Object.entries(data.states).length > 0 ? (
                  <ul className="space-y-1 pl-4 text-sm text-gray-700">
                    {Object.entries(data.states).map(([state, price]) => (
                      <li key={state} className="list">
                        <span>
                          {state}: ${price}
                        </span>
                        <button
                          onClick={() => handleDeleteState(country, state)}
                          className="btn btn-danger ms-2"
                        >
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500 pl-4">
                    No states added yet.
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add/Edit State Form */}
      {selectedLocation && (
        <div className="bg-white shadow-md rounded-lg p-4 mt-6">
          <h4 className="head">
            ✍ Add/Edit State for:{" "}
            <span className="text-blue-600">{selectedLocation}</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="State"
              value={newState}
              onChange={(e) => setNewState(e.target.value)}
              className="form-control"
            />
            <input
              type="number"
              placeholder="State Fee"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              className="form-control mt-3"
            />
            <button onClick={handleAddState} className="btn btn-success mt-3">
              Add/Edit State
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageFee;
