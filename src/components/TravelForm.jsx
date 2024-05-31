import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stations } from '../utils/Dummydata';
import './TravelForm.css';

const TravelForm = () => {
    const locations = useState(Stations)[0];
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState('');
    const [filteredSources, setFilteredSources] = useState([]);
    const [filteredDestinations, setFilteredDestinations] = useState([]);
    const [selectedSource, setSelectedSource] = useState(null);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const navigate = useNavigate();

    const handleSourceChange = (e) => {
        const value = e.target.value;
        setSource(value);
        if (value) {
            setFilteredSources(locations.filter((loc) => loc.name.toLowerCase().includes(value.toLowerCase())));
        } else {
            setFilteredSources([]);
        }
    };

    const handleDestinationChange = (e) => {
        const value = e.target.value;
        setDestination(value);
        if (value) {
            setFilteredDestinations(locations.filter((loc) => loc.name.toLowerCase().includes(value.toLowerCase())));
        } else {
            setFilteredDestinations([]);
        }
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handleSourceSelect = (source) => {
        setSelectedSource(source);
        setSource(source.name);
        setFilteredSources([]);
    };

    const handleDestinationSelect = (destination) => {
        setSelectedDestination(destination);
        setDestination(destination.name);
        setFilteredDestinations([]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedSource && selectedDestination && date) {
            const [yyyy, mm, dd] = date.split('-');

            navigate(`/train/${selectedSource.code}/${selectedDestination.code}/${dd}/${mm}/${yyyy}`, { state: { source: selectedSource, destination: selectedDestination, dd, mm, yyyy } });

        } else {
            alert('Please select source, destination, and date properly.');
        }
    };

    return (
        <div>

            <form onSubmit={handleSubmit} className="travel-form">
                <h1 >Train Enquiry</h1>
                <div className="form-group">
                    <label>Source:</label>
                    <input type="text" value={source} onChange={handleSourceChange} />
                    {filteredSources.length > 0 && (
                        <ul className="autocomplete-list">
                            {filteredSources.map((loc, index) => (
                                <li key={index} onClick={() => handleSourceSelect(loc)}>{loc.name}</li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="form-group">
                    <label>Destination:</label>
                    <input type="text" value={destination} onChange={handleDestinationChange} />
                    {filteredDestinations.length > 0 && (
                        <ul className="autocomplete-list">
                            {filteredDestinations.map((loc, index) => (
                                <li key={index} onClick={() => handleDestinationSelect(loc)}>{loc.name}</li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="form-group">
                    <label>Date of Traveling:</label>
                    <input type="date" value={date} onChange={handleDateChange} min={new Date().toISOString().split('T')[0]} />
                </div>
                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
    );
};



export default TravelForm;
