import React, { useState } from "react";
import "./ManageFee.css";
const ManageFee = () => {
  const [locations, setLocations] = useState({});
  const [newLocation, setNewLocation] = useState("");
  const [newState, setNewState] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  // Add a new location
  const handleAddLocation = () => {
    if (newLocation.trim() !== "" && !locations[newLocation]) {
      setLocations((prev) => ({
        ...prev,
        [newLocation]: {},
      }));
      setNewLocation("");
    }
  };

  // Add a state and price under the selected location
  const handleAddState = () => {
    if (
      selectedLocation &&
      newState.trim() !== "" &&
      newPrice.trim() !== "" &&
      !locations[selectedLocation][newState]
    ) {
      setLocations((prev) => ({
        ...prev,
        [selectedLocation]: {
          ...prev[selectedLocation],
          [newState]: newPrice,
        },
      }));
      setNewState("");
      setNewPrice("");
    }
  };

  return (
    <div className="delivery">
      <div className="p-4 delivery-form shadow">
        <div className="head">Manage Locations, States, and Prices</div>

        {/* Add Location */}
        <div className="mb-4">
          <label className="block mb-2">Add Location:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter location name"
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
          />
          <button
            className="btn btn-primary mt-2"
            onClick={handleAddLocation}
            disabled={!newLocation.trim()}
          >
            Add Location
          </button>
        </div>

        {/* Add State and Price */}
        {Object.keys(locations).length > 0 && (
          <div className="mb-4">
            <label className="block mb-2">Select Location:</label>
            <select
              className="form-select"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="">-- Select Location --</option>
              {Object.keys(locations).map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>

            <label className="block mb-2">Add State:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter state name"
              value={newState}
              onChange={(e) => setNewState(e.target.value)}
            />

            <label className="block mb-2">Add Price:</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter price"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
            />

            <button
              className="btn btn-primary"
              onClick={handleAddState}
              disabled={
                !selectedLocation || !newState.trim() || !newPrice.trim()
              }
            >
              Add State and Price
            </button>
            <br />
            <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={handleAddState}
            >
              Show all location
            </button>

            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">
                      Location Data
                    </h1>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    {Object.keys(locations).length > 0 && (
                      <div>
                        <ul>
                          {Object.keys(locations).map((location) => (
                            <li key={location} className="mb-4">
                              <div className="">{location}</div>
                              <ul className="ml-4">
                                {Object.keys(locations[location]).map(
                                  (state) => (
                                    <li key={state}>
                                      {state}: ${locations[location][state]}
                                    </li>
                                  )
                                )}
                              </ul>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="button" class="btn btn-warning">
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Display Locations, States, and Prices */}
      </div>
    </div>
  );
};

export default ManageFee;
